# Setup Guide

## Prerequisites

- Node.js 20+
- pnpm
- Git

## Steps

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm playwright:install
pnpm dev
```

## Open apps

- Web: http://localhost:3000
- API: http://localhost:4000/health
- Demo site: http://localhost:5000

## Push to GitHub

```bash
git init -b main
git add .
git commit -m "Initial AutoHeal Browser Agent repo"
git remote add origin https://github.com/YOUR_USERNAME/autoheal-browser-agent.git
git push -u origin main
```
