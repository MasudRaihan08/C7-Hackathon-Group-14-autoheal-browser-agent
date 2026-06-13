# AutoHeal Browser Agent

AI-powered self-healing browser automation platform for hackathons and QA teams.

## What it does

AutoHeal Browser Agent helps teams automate browser journeys and reduce test maintenance.

It can:

- Discover key website flows such as login, search, checkout, and form submission
- Generate Playwright scripts from discovered flows
- Execute scripts and collect logs, screenshots, traces, and videos
- Diagnose failed browser runs using AI-style reasoning
- Repair common selector failures automatically
- Rerun repaired scripts
- Optionally compare screenshots for UI regression monitoring

## Architecture

```text
User
 ↓
Next.js Dashboard
 ↓
Node.js API
 ↓
Agent Orchestrator
 ↓
Playwright Runner
 ↓
Artifacts: screenshots, videos, traces, logs
```

## Agents

| Agent | Responsibility |
|---|---|
| Flow Discovery Agent | Finds important user journeys on a website |
| Script Generator Agent | Creates Playwright tests |
| Execution Agent | Runs tests and saves artifacts |
| Error Diagnosis Agent | Explains why a run failed |
| Adaptive Repair Agent | Repairs broken selectors and reruns |
| Regression Monitor Agent | Compares screenshots against baselines |

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Node.js
- Express
- TypeScript
- Playwright
- Prisma
- SQLite
- Socket.IO
- GitHub Actions

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm dev
```

Open:

```text
http://localhost:3000
```

API runs at:

```text
http://localhost:4000
```

Demo site runs at:

```text
http://localhost:5000
```

## Demo Script

1. Start the app.
2. Create a project with URL `http://localhost:5000`.
3. Click **Discover Flows**.
4. Generate a login script.
5. Run the script.
6. Break the demo site's login button selector.
7. Run again and watch AutoHeal diagnose and repair it.

## Useful Commands

```bash
pnpm dev              # Run web, API, and demo site
pnpm build            # Build all packages/apps
pnpm test             # Run tests
pnpm lint             # Lint project
pnpm db:push          # Push Prisma schema to SQLite
pnpm playwright:install
```

## Environment Variables

See `.env.example`.

## Folder Structure

```text
autoheal-browser-agent/
├── apps/
│   ├── web/          # Next.js frontend dashboard
│   ├── api/          # Express backend and agents
│   └── demo-site/    # Local website for hackathon demo
├── packages/
│   ├── shared/       # Shared TypeScript types
│   └── playwright-runner/
├── generated-tests/  # Generated Playwright specs
├── artifacts/        # Runtime artifacts
├── prisma/           # Database schema
└── .github/workflows # CI workflows
```

## Safety Note

Do not commit `.env`, API keys, passwords, cookies, browser storage state, or production credentials.

## License

MIT
