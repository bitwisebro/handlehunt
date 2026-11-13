# HandleHunt

> Instant, multi-platform username availability checker.

**HandleHunt** allows creators, developers, and founders to instantly verify if their desired handle or username is available across multiple online platforms without manual checking.

- 🌐 **Live Website:** [https://bitwisebro.github.io/handlehunt](https://bitwisebro.github.io/handlehunt)
- ⚡ **Backend API:** [https://handlehunt-manager.bitwisebro.workers.dev](https://handlehunt-manager.bitwisebro.workers.dev)

---

## Architecture

The project is structured as a lightweight monorepo containing two decoupled services:

```text
handlehunt/
├── frontend/               # React + Vite + Tailwind CSS Single-Page App
│   ├── src/                # UI components, layout, API client
│   ├── .env.example        # Frontend environment variables template
│   └── README.md           # Detailed frontend documentation
│
├── backend/                # Cloudflare Worker serverless API
│   ├── src/index.ts        # Fast username checks & token refresh logic
│   ├── wrangler.toml       # Cloudflare Worker configuration & KV bindings
│   └── README.md           # Detailed backend documentation
│
└── .github/workflows/
    └── deploy.yml          # Automated GitHub Pages CI/CD workflow
```

### Module Documentation
- 📱 [**Frontend Documentation**](frontend/README.md) — UI architecture, commands, Vite configuration, and client setup.
- ⚙️ [**Backend Documentation**](backend/README.md) — Cloudflare Worker endpoints, KV storage, Reddit OAuth setup, and deployment instructions.

---

## Features

- **Multi-Platform Availability Checking**: Checks availability across **GitHub**, **Reddit**, and **Instagram** simultaneously.
- **Ultra-Fast & Rate-Limit Resilient**:
  - **GitHub**: Performs zero-body `HEAD` requests directly against public profiles, avoiding the restrictive 60 req/hr unauthenticated REST API limit.
  - **Reddit**: Manages OAuth2 tokens using Cloudflare KV storage with automatic 55-minute cron refreshes and auto-recovery on 401 Unauthorized responses.
  - **Instagram**: Checks public profile availability with customized browser request headers and redirect handling.
- **Clean Error Separation**: Explicitly differentiates between "Available", "Taken", and "Check failed" with detailed status reporting.
- **Serverless & Free-Tier Hosted**:
  - Frontend hosted on **GitHub Pages**.
  - Backend hosted on **Cloudflare Workers**.

---

## Local Development Quickstart

To run the entire application locally with the frontend connected to your local backend:

### 1. Clone the Repository
```bash
git clone https://github.com/bitwisebro/handlehunt.git
cd handlehunt
```

### 2. Start the Backend Worker
In a new terminal:
```bash
cd backend
npm install

# Create your local .env with your Reddit credentials:
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
ALLOWED_ORIGIN=*
EOF

# Start Wrangler dev server (listens on http://localhost:8787)
npm run dev
```

### 3. Start the Frontend
In a second terminal:
```bash
cd frontend
npm install

# Point frontend to your local backend:
cp .env.example .env.local

# Start the Vite development server (opens at http://localhost:5173)
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to test username lookups locally!

---

## Environment Variables Summary

### Frontend (`frontend/.env.local`)
| Variable | Required | Description | Default |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | No | Base URL of the API worker. | `https://handlehunt-manager.bitwisebro.workers.dev` |

### Backend (`backend/.env` for dev / Cloudflare Secrets for prod)
| Variable | Required | Description |
| :--- | :--- | :--- |
| `REDDIT_CLIENT_ID` | **Yes** | 14-char Client ID of your Reddit "script" app ([reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)). |
| `REDDIT_CLIENT_SECRET` | **Yes** | Client secret string of your Reddit script app. |
| `REDDIT_USERNAME` | **Yes** | Reddit username (without `u/` prefix). |
| `REDDIT_PASSWORD` | **Yes** | Reddit account password. |
| `ALLOWED_ORIGIN` | **Yes** | Allowed CORS origin (e.g. `https://bitwisebro.github.io` or `*`). |
| `GITHUB_TOKEN` | No | *(Optional)* GitHub Personal Access Token for 5,000 req/hr API limit. |

*For complete instructions on setting production secrets, refer to the [Backend README](backend/README.md).*

---

## Common Commands

| Task | Location | Command |
| :--- | :--- | :--- |
| Start Frontend Dev Server | `frontend/` | `npm run dev` |
| Build Frontend Bundle | `frontend/` | `npm run build` |
| Run Frontend Tests | `frontend/` | `npx vitest run` |
| Start Backend Worker Locally | `backend/` | `npm run dev` |
| Check Backend Types | `backend/` | `npx tsc --noEmit` |
| Deploy Backend Worker | `backend/` | `npm run deploy` |

---

## Deployment

### Frontend (GitHub Pages)
Frontend deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`). Any push to `main` modifying `frontend/**` triggers a build and deploys to **GitHub Pages**.

### Backend (Cloudflare Workers)
Backend deployments are triggered via Wrangler:
```bash
cd backend
npx wrangler deploy
```

---

## Tech Stack

- **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Vitest](https://vitest.dev/)
- **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/), Cloudflare KV, [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **CI/CD**: GitHub Actions, GitHub Pages

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "feat: add amazing feature"`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request against `main`.

---

## License

This project is licensed under the [MIT License](LICENSE).
