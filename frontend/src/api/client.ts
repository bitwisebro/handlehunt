/**
 * API client for HandleHunt
 * Calls the backend worker: GET /check?username=<name>
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
 * Checks username availability across platforms via the backend worker.
 */
export async function checkUsername(username: string): Promise<CheckResponse> {
  const clean = username.trim();
  if (!clean) {
    return { username: "", results: [] };
  }

  const res = await fetch(`${API_BASE}/check?username=${encodeURIComponent(clean)}`);

  if (!res.ok) {
    throw new Error(`Worker responded with ${res.status}`);
  }

  const data = await res.json();

  return {
    username: data.username || clean,
    results: (data.results ?? []).map((r: any) => {
      const isBool = typeof r.available === "boolean";
      const errorMsg =
        r.error ||
        (typeof r.available === "object"
          ? r.available?.error?.explanation || r.available?.error?.reason || "Check failed"
          : !isBool
          ? "Check failed"
          : undefined);
      return {
        platform: r.platform,
        available: isBool ? r.available : false,
        error: errorMsg,
      };
    }),
  };
}
