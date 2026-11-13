# HandleHunt — Frontend

The web interface for [HandleHunt](../README.md), a fast and clean username availability checker across multiple platforms.

Built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## Quick Links

- [Root Repository README](../README.md)
- [Backend Documentation](../backend/README.md)
- **Live Demo:** [https://bitwisebro.github.io/handlehunt](https://bitwisebro.github.io/handlehunt)

---

## Features

- Real-time username availability queries across platforms (GitHub, Reddit).
- Strict boolean error sanitization (clearly distinguishes "Available", "Taken", and "Check failed").
- Direct link to available/taken profile handles.
- Fully responsive dark-themed UI built with Tailwind CSS.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or v20+ recommended)
- `npm` (comes with Node.js)

### Installation

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables

The frontend communicates with the HandleHunt Cloudflare Worker backend.

| Variable | Description | Default (Production) | Local Dev Value |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend API worker | `https://handlehunt-manager.bitwisebro.workers.dev` | `http://localhost:8787` |

### Setting Up Local Environment

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Inside `.env.local`:
```env
VITE_API_URL=http://localhost:8787
```

> **Note:** `.env.local` is ignored by git. If `VITE_API_URL` is omitted, the frontend automatically defaults to the production worker.

---

## Available Commands

Run these commands inside the `frontend/` directory:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server on [http://localhost:5173](http://localhost:5173) |
| `npm run build` | Compiles TypeScript and builds the production bundle into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm test` | Runs the test suite in watch mode with Vitest |
| `npx vitest run` | Runs all Vitest tests once (CI mode) |
| `npm run test:coverage` | Generates a test coverage report |

---

## Deployment

Frontend deployment is **automated via GitHub Actions**:

- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Any push to the `main` branch touching `frontend/**` or `.github/workflows/deploy.yml`.
- **Target:** Deployed to **GitHub Pages** at `https://bitwisebro.github.io/handlehunt`.

To trigger a manual deployment:
1. Go to your GitHub repository $\rightarrow$ **Actions** tab.
2. Select **Deploy Frontend to GitHub Pages**.
3. Click **Run workflow** on the `main` branch.
