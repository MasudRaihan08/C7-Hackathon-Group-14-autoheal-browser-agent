# API Reference

## Health

```http
GET /health
```

## Projects

```http
GET /api/projects
POST /api/projects
POST /api/projects/:id/discover-flows
```

## Flows

```http
GET /api/flows/:id
POST /api/flows/:id/generate-script
```

## Runs

```http
POST /api/runs/flow/:flowId
GET /api/runs/:id
POST /api/runs/:runId/repair
```
