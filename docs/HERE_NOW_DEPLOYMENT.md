# here.now Setup and Deployment

here.now is used for quick static hosting of demo assets, static frontend builds, reports, and hackathon artifacts.

## Install skill

If npm is available:

```bash
npx skills add heredotnow/skill --skill here-now -g
```

If npm is not available:

```bash
curl -fsSL https://here.now/install.sh | bash
```

Security-conscious alternative:

```bash
curl -fsSL https://here.now/install.sh -o /tmp/here-now-install.sh
less /tmp/here-now-install.sh
bash /tmp/here-now-install.sh
```

## Optional permanent hosting

Anonymous sites expire after 24 hours. For permanent sites, set an API key:

```bash
export HERENOW_API_KEY="your_here_now_key"
```

Never commit this value.

## Publish static build/report

```bash
~/.claude/skills/here-now/scripts/publish.sh ./apps/web/out --client autoheal-browser-agent
~/.claude/skills/here-now/scripts/publish.sh ./playwright-report --client autoheal-browser-agent
```

## Do not publish

Do not publish `.env`, API keys, local databases, browser cookies/storage state, or secret files.
