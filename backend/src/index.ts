/**
 * HandleHunt API Worker
 *
 * Endpoints:
 *   GET /check?username=<name>  — checks availability on all supported platforms
 *   GET /token                  — (internal) returns the cached Reddit token
 *
 * Scheduled:
 *   Refreshes the Reddit OAuth token every 55 minutes via cron trigger.
 */

export interface Env {
	handlehunt_secrets: KVNamespace;
	REDDIT_CLIENT_ID: string;
	REDDIT_CLIENT_SECRET: string;
	REDDIT_USERNAME: string;
	REDDIT_PASSWORD: string;
	ALLOWED_ORIGIN: string;
	GITHUB_TOKEN?: string;
}

interface PlatformResult {
	platform: string;
	available: boolean;
	error?: string;
}

const USER_AGENT = (username?: string) =>
	`handleHunt/2.0${username ? ` by ${username}` : ""}`;

/** CORS headers helper */
function corsHeaders(env: Env): Record<string, string> {
	return {
		"Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	};
}

/** JSON response helper */
function jsonResponse(body: unknown, status: number, env: Env): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			"Cache-Control": "no-transform",
			...corsHeaders(env),
		},
	});
}

// ─── Platform Checkers ───────────────────────────────────────────────

async function checkGithub(username: string, env?: Env): Promise<PlatformResult> {
		// If a GitHub token is configured, use the authenticated REST API (5,000 req/hr)
		if (env?.GITHUB_TOKEN) {
			try {
				const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
					headers: {
						"User-Agent": "handleHunt/2.0",
						Accept: "application/vnd.github.v3+json",
						Authorization: `Bearer ${env.GITHUB_TOKEN}`,
					},
				});

					if (res.status === 404) {
						return { platform: "GitHub", available: true };
					}
					if (res.status === 200) {
						return { platform: "GitHub", available: false };
					}
					// If unexpected error on authenticated call, fall through to web check
				} catch {
					// Fall through to web check on network error
				}
			}

		// Fast default: Single HEAD request to github.com/<username> (~100ms, 0 byte body, no rate limit)
		return checkGithubFallback(username);
	}

/**
 * Fallback: HEAD request to github.com/<username> profile page.
 * Not subject to the REST API rate limit.
 * Returns 404 if the user doesn't exist, 200 if taken.
 */
async function checkGithubFallback(username: string): Promise<PlatformResult> {
		try {
			const res = await fetch(`https://github.com/${encodeURIComponent(username)}`, {
				method: "HEAD",
				headers: {
					"User-Agent": "handleHunt/2.0",
				},
				redirect: "manual",
			});

			if (res.status === 404) {
				return { platform: "GitHub", available: true };
			}
			if (res.status === 200 || (res.status >= 300 && res.status < 400)) {
				return { platform: "GitHub", available: false };
			}

			return { platform: "GitHub", available: false, error: `GitHub profile check returned ${res.status}` };
		} catch (err: any) {
			return { platform: "GitHub", available: false, error: err.message || "Failed to reach GitHub" };
		}
	}

	async function checkReddit(username: string, env: Env): Promise<PlatformResult> {
		try {
			let token = await env.handlehunt_secrets.get("redditToken");
			if (!token) {
				const refreshRes = await refreshRedditToken(env);
				if (refreshRes.ok) {
					const data: any = await refreshRes.json();
					if (typeof data?.access_token === "string") {
						token = data.access_token;
						await env.handlehunt_secrets.put("redditToken", data.access_token);
					}
				}
			}

			if (!token) {
				return { platform: "Reddit", available: false, error: "Reddit token not available" };
			}

			let res = await fetch(
				`https://oauth.reddit.com/api/username_available?user=${encodeURIComponent(username)}`,
				{
					headers: {
						"User-Agent": USER_AGENT(env.REDDIT_USERNAME),
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// If unauthorized (token expired), refresh token and retry
			if (res.status === 401) {
				const refreshRes = await refreshRedditToken(env);
				if (refreshRes.ok) {
					const data: any = await refreshRes.json();
					if (typeof data?.access_token === "string") {
						token = data.access_token;
						await env.handlehunt_secrets.put("redditToken", data.access_token);
					}
					res = await fetch(
						`https://oauth.reddit.com/api/username_available?user=${encodeURIComponent(username)}`,
						{
							headers: {
								"User-Agent": USER_AGENT(env.REDDIT_USERNAME),
								Authorization: `Bearer ${token}`,
							},
						}
					);
				}
			}

			if (!res.ok) {
				const errorData: any = await res.json().catch(() => null);
				const errorMsg =
					errorData?.error?.explanation ||
					errorData?.error?.reason ||
					`Reddit API responded with ${res.status}`;
				return { platform: "Reddit", available: false, error: errorMsg };
			}

			const data: any = await res.json();
			return { platform: "Reddit", available: typeof data === "boolean" ? data : Boolean(data) };
		} catch (err: any) {
			return { platform: "Reddit", available: false, error: err.message };
		}
	}

	// ─── Token Refresh ───────────────────────────────────────────────────

	async function refreshRedditToken(env: Env): Promise<Response> {
		const credentials = btoa(`${env.REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`);
		const body = new URLSearchParams({
			username: env.REDDIT_USERNAME,
			password: env.REDDIT_PASSWORD,
			grant_type: "password",
		});

		const res = await fetch("https://www.reddit.com/api/v1/access_token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": USER_AGENT(env.REDDIT_USERNAME),
				Authorization: `Basic ${credentials}`,
			},
			body: body.toString(),
		});

		return res;
	}

	// ─── Router ──────────────────────────────────────────────────────────

	async function handleRequest(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Handle CORS preflight
		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: {
					...corsHeaders(env),
					"Cache-Control": "no-transform",
				},
			});
		}

		// GET /check?username=<name>
		if (url.pathname === "/check" && request.method === "GET") {
			const username = url.searchParams.get("username");
			if (!username || !username.trim()) {
				return jsonResponse({ error: "Missing 'username' query parameter" }, 400, env);
			}

			const [github, reddit] = await Promise.all([
				checkGithub(username, env),
				checkReddit(username, env),
			]);

			return jsonResponse({ username, results: [github, reddit] }, 200, env);
		}

		// GET /token
		if (url.pathname === "/token" && request.method === "GET") {
			const token = await env.handlehunt_secrets.get("redditToken");
			if (!token) {
				return jsonResponse({ error: "Token not found" }, 404, env);
			}
			return jsonResponse({ token }, 200, env);
		}

		// GET /health
		if (url.pathname === "/health") {
			return jsonResponse({ status: "ok" }, 200, env);
		}

		return jsonResponse({ error: "Not found" }, 404, env);
	}

	// ─── Worker Export ───────────────────────────────────────────────────

	export default {
		async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
			return handleRequest(request, env);
		},

		async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
			console.log(`Cron trigger fired at ${event.cron}`);
			const res = await refreshRedditToken(env);
			const data: any = await res.json();

			if (!res.ok) {
				console.error(`Failed to refresh Reddit token: ${res.status}`, data);
				return;
			}

			await env.handlehunt_secrets.put("redditToken", data.access_token);
			console.log("Reddit token refreshed successfully");
		},
	};
