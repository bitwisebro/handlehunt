/**
 * API client for HandleHunt
 * Supports:
 * 1. New Worker Endpoint: GET /check?username=<name> (when deployed)
 * 2. Legacy Worker Endpoint: GET / (returns cached Reddit token, then client verifies GitHub & Reddit)
 * 3. Graceful fallback on network or API failures
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "https://handlehunt-manager.bitwisebro.workers.dev";

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
 * Direct client-side verification fallback (GitHub 404 check + Reddit token check)
 */
async function fallbackDirectCheck(username: string, token?: string): Promise<CheckResponse> {
  const [githubResult, redditResult] = await Promise.all([
    checkGithubDirect(username),
    checkRedditDirect(username, token),
  ]);

  return {
    username,
    results: [githubResult, redditResult],
  };
}

async function checkGithubDirect(username: string): Promise<PlatformResult> {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return {
      platform: "GitHub",
      available: res.status === 404,
    };
  } catch (err: any) {
    return {
      platform: "GitHub",
      available: false,
      error: err.message || "Failed to reach GitHub",
    };
  }
}

async function checkRedditDirect(username: string, token?: string): Promise<PlatformResult> {
  try {
    let authToken = token;

    // If no token supplied, try fetching from manager worker
    if (!authToken) {
      const tokenRes = await fetch(API_BASE);
      if (tokenRes.ok) {
        const tokenData = await tokenRes.json().catch(() => ({}));
        authToken = tokenData.token;
      }
    }

    if (!authToken) {
      return {
        platform: "Reddit",
        available: false,
        error: "Reddit token unavailable",
      };
    }

    const res = await fetch(
      `https://oauth.reddit.com/api/username_available?user=${encodeURIComponent(username)}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "User-Agent": "handleHunt/2.0 by u/Lost_Access_401",
        },
      }
    );

    if (res.ok) {
      const isAvailable = await res.json();
      return {
        platform: "Reddit",
        available: Boolean(isAvailable),
      };
    }

    return {
      platform: "Reddit",
      available: false,
      error: `Reddit API responded with ${res.status}`,
    };
  } catch (err: any) {
    return {
      platform: "Reddit",
      available: false,
      error: err.message || "Failed to reach Reddit",
    };
  }
}

/**
 * Checks username availability across platforms.
 * Resilient to worker version differences.
 */
export async function checkUsername(username: string): Promise<CheckResponse> {
  const clean = username.trim();
  if (!clean) {
    return { username: "", results: [] };
  }

  try {
    // Attempt worker endpoint
    const res = await fetch(`${API_BASE}/check?username=${encodeURIComponent(clean)}`);
    if (res.ok) {
      const data = await res.json().catch(() => null);

      // If new worker format with results array
      if (data && Array.isArray(data.results)) {
        return data;
      }

      // If legacy worker returns { token: "..." }
      if (data && typeof data.token === "string") {
        return await fallbackDirectCheck(clean, data.token);
      }
    }
  } catch (err) {
    console.warn("Worker call failed, falling back to direct check:", err);
  }

  // Fallback to direct client checking
  return fallbackDirectCheck(clean);
}
