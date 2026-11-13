# HandleHunt — Backend (Cloudflare Worker)

Serverless API backend for [HandleHunt](../README.md), hosted on **Cloudflare Workers**.

It provides high-performance username availability checks across platforms and handles Reddit OAuth token lifecycle management (caching in Cloudflare KV and auto-refreshing via cron triggers).

---

## Quick Links

- [Root Repository README](../README.md)
- [Frontend Documentation](../frontend/README.md)
- **Production Endpoint:** `https://handlehunt-manager.bitwisebro.workers.dev`

---

## Architecture & Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/check?username=<name>` | Checks username availability on GitHub and Reddit in parallel. |
| `GET` | `/token` | Returns the cached Reddit bearer token from KV. |
| `GET` | `/health` | Health-check endpoint (`{"status": "ok"}`). |
| `OPTIONS` | `*` | Handles CORS preflight headers with `Cache-Control: no-transform`. |
| `Scheduled` | Cron (`*/55 * * * *`) | Background cron trigger refreshing the Reddit OAuth token every 55 minutes. |

### How Checks Work

1. **GitHub Check**:
   - Executes a lightweight `HEAD` request to `https://github.com/<username>`.
   - Returns `available: true` on `404 Not Found`, and `available: false` on `200 OK` or redirect.
   - Bypasses GitHub REST API unauthenticated rate limits (60 req/hr).
   - If an optional `GITHUB_TOKEN` secret is configured, it queries the authenticated REST API (`5,000 req/hr`).
2. **Reddit Check**:
   - Queries `https://oauth.reddit.com/api/username_available?user=<username>`.
   - Uses the cached bearer token from Cloudflare KV (`handlehunt_secrets`).
   - Automatically refreshes the OAuth token and retries if a `401 Unauthorized` occurs.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or v20+)
- [Cloudflare Account](https://dash.cloudflare.com/) and [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Installation

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Log in to Cloudflare (one-time setup for deployments):
   ```bash
   npx wrangler login
   ```

---

## Environment Variables & Secrets

The worker requires credentials to authenticate with Reddit's API and configure CORS permissions.

| Variable Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `REDDIT_CLIENT_ID` | Secret | **Yes** | 14-char Client ID of your Reddit "script" app from [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps). |
| `REDDIT_CLIENT_SECRET` | Secret | **Yes** | Client secret string of your Reddit script app. |
| `REDDIT_USERNAME` | Secret / Var | **Yes** | Reddit account username (without `u/` prefix). |
| `REDDIT_PASSWORD` | Secret | **Yes** | Reddit account password. |
| `ALLOWED_ORIGIN` | Secret / Var | **Yes** | Allowed CORS origin (e.g. `https://bitwisebro.github.io` or `*`). |
| `GITHUB_TOKEN` | Secret | No | (Optional) GitHub Personal Access Token for authenticated REST API calls. |

---

### Local Development Setup (`.env`)

For local testing with `wrangler dev`, create a `.env` file inside `backend/`:

```bash
# backend/.env
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
ALLOWED_ORIGIN=*
```

> **Note:** `.env` is gitignored and is **only** read by `npx wrangler dev`. Cloudflare does **not** upload `.env` when deploying.

---

### Production Setup (Cloudflare Secrets)

To configure secrets for the deployed worker:

#### Option A: Via Cloudflare Dashboard (Recommended)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) $\rightarrow$ **Workers & Pages**.
2. Select your worker (`handlehunt-manager`).
3. Navigate to **Settings** $\rightarrow$ **Variables and Secrets**.
4. Add each secret (`REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`, `ALLOWED_ORIGIN`).
5. Click **Save and Deploy**.

#### Option B: Via Wrangler CLI
Run from the `backend/` directory:
```bash
npx wrangler secret put REDDIT_CLIENT_ID
npx wrangler secret put REDDIT_CLIENT_SECRET
npx wrangler secret put REDDIT_USERNAME
npx wrangler secret put REDDIT_PASSWORD
npx wrangler secret put ALLOWED_ORIGIN
```
Wrangler will prompt you to securely paste each value.

---

### KV Namespace (`handlehunt_secrets`)

The worker uses Cloudflare KV to store and share the cached Reddit OAuth token (`redditToken`).

The binding is configured in `wrangler.toml`:
```toml
kv_namespaces = [
  { binding = "handlehunt_secrets", id = "<your_kv_namespace_id>" }
]
```

To create a new KV namespace if setting up from scratch:
```bash
npx wrangler kv namespace create handlehunt_secrets
```
Copy the returned ID into your `wrangler.toml`.

---

## Available Commands

Run these commands inside the `backend/` directory:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local worker dev server on [http://localhost:8787](http://localhost:8787) |
| `npm run deploy` | Deploys the worker to Cloudflare Workers production |
| `npx tsc --noEmit` | Runs TypeScript type checking without emitting files |
| `npm run cf-typegen` | Regenerates Cloudflare Worker binding types |

