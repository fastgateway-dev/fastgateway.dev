---
sidebar_position: 4
description: Return static responses without backend forwarding for health checks and maintenance pages
---

# Direct Response

FastGateway can return static responses directly without forwarding to backends.

## Basic Direct Response

Return a simple response:

```yaml
filters:
  - type: "DirectResponse"
    directResponse:
      statusCode: 200
      body: "OK"
```

## Health Check Endpoint

Create a health check endpoint:

```yaml
matches:
  - path:
      type: "Exact"
      value: "/health"
filters:
  - type: "DirectResponse"
    directResponse:
      statusCode: 200
      body: '{"status": "healthy"}'
```

## Maintenance Page

Return a maintenance response:

```yaml
filters:
  - type: "DirectResponse"
    directResponse:
      statusCode: 503
      body: '{"error": "Service temporarily unavailable for maintenance"}'
```

## Custom Error Pages

Block specific paths with custom responses:

```yaml
matches:
  - path:
      type: "Prefix"
      value: "/admin"
filters:
  - type: "DirectResponse"
    directResponse:
      statusCode: 403
      body: '{"error": "Forbidden"}'
```

## Use Cases

| Scenario | Status Code |
|----------|-------------|
| Health checks | 200 |
| Readiness probes | 200 |
| Maintenance mode | 503 |
| Blocked paths | 403 |
| Not found pages | 404 |

## Notes

- No backend is contacted when DirectResponse is used
- Combine with header modification for proper Content-Type
- Useful for synthetic endpoints that don't need backend logic
