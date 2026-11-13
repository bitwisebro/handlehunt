/**
 * API client for the HandleHunt Cloudflare Worker.
 * All platform checks go through the worker — no direct external API calls from the browser.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "https://handlehunt-manager.tatyavinchu.workers.dev";

export interface PlatformResult {
  platform: string;
  available: boolean;
  error?: string;
}

export interface CheckResponse {
  username: string;
  results: PlatformResult[];
}

/**
 * Checks username availability across all supported platforms.
 */
export async function checkUsername(username: string): Promise<CheckResponse> {
  const res = await fetch(`${API_BASE}/check?username=${encodeURIComponent(username)}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).error ?? `API request failed (${res.status})`);
  }

  return res.json();
}

