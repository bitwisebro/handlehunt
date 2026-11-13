// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// Type helper for Request in Cloudflare test environment
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('HandleHunt API Worker', () => {
	it('responds with 200 and status ok on /health', async () => {
		const request = new IncomingRequest('http://example.com/health');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = (await response.json()) as any;
		expect(body).toEqual({ status: 'ok' });
	});

	it('handles CORS preflight OPTIONS request with 204', async () => {
		const request = new IncomingRequest('http://example.com/check', {
			method: 'OPTIONS',
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(204);
		expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeTruthy();
	});

	it('returns 400 when username is missing on /check', async () => {
		const request = new IncomingRequest('http://example.com/check');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(400);
		const body = (await response.json()) as any;
		expect(body.error).toBe("Missing 'username' query parameter");
	});

	it('returns 400 when username is empty whitespace on /check', async () => {
		const request = new IncomingRequest('http://example.com/check?username=  ');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(400);
		const body = (await response.json()) as any;
		expect(body.error).toBe("Missing 'username' query parameter");
	});

	it('returns 200 with platform results array when checking a valid username', async () => {
		// Seed KV token for Reddit check
		await env.handlehunt_secrets.put('redditToken', 'mock-token-xyz');

		const request = new IncomingRequest('http://example.com/check?username=testuser');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = (await response.json()) as any;
		expect(body.username).toBe('testuser');
		expect(Array.isArray(body.results)).toBe(true);
		expect(body.results.length).toBe(2);

		const platforms = body.results.map((r: any) => r.platform);
		expect(platforms).toContain('GitHub');
		expect(platforms).toContain('Reddit');
	});

	it('returns 404 for unknown endpoints', async () => {
		const request = new IncomingRequest('http://example.com/unknown-endpoint');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(404);
		const body = (await response.json()) as any;
		expect(body.error).toBe('Not found');
	});
});
