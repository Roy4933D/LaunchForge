# Deploy Ready Starter

A minimal full-stack starter you can rename and push to GitHub.

## Stack
- Frontend: React + Vite
- API: Node.js + Express
- Database: PostgreSQL (Docker Compose)
- Containerized local setup
- GitHub Actions CI workflow

## Run locally
1. Install Docker Desktop and Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Run:

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
API health: http://localhost:4000/api/health

## Deploy
- Push this project to your GitHub repository.
- Deploy the API and PostgreSQL database to a hosting provider such as Render or Railway.
- Deploy `frontend/` as a static site. Set `VITE_API_URL` to the deployed API base URL.
- Set API environment variables using the hosting provider's secret/environment settings. Never commit `.env`.

This is a starter scaffold, not a provider-specific deployment that is already live. Configure hosting services and secrets in your own accounts.
