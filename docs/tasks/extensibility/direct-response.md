---
sidebar_position: 4
description: Return static responses without backend forwarding for health checks and maintenance pages
---

# Direct Response

FastGateway can return static responses directly without forwarding to backends.

Direct response is a route type selected on the Traffic tab
(`routeType: directResponse`), not a Gateway-API filter. The `body` is an object
(`type: Inline` or `ValueRef`), and `contentType` sets the `Content-Type` header
directly.

## Basic Direct Response

Return a simple response:

```yaml
routeType: directResponse
directResponse:
  statusCode: 200
  contentType: "text/plain"
  body:
    type: "Inline"
    inline: "OK"
```

## Health Check Endpoint

Create a health check endpoint:

```yaml
matches:
  - path:
      type: "Exact"
      value: "/health"
routeType: directResponse
directResponse:
  statusCode: 200
  contentType: "application/json"
  body:
    type: "Inline"
    inline: '{"status": "healthy"}'
```

## Maintenance Page

Return a maintenance response:

```yaml
routeType: directResponse
directResponse:
  statusCode: 503
  contentType: "application/json"
  body:
    type: "Inline"
    inline: '{"error": "Service temporarily unavailable for maintenance"}'
```

## Custom Error Pages

Block specific paths with custom responses:

```yaml
matches:
  - path:
      type: "Prefix"
      value: "/admin"
routeType: directResponse
directResponse:
  statusCode: 403
  contentType: "application/json"
  body:
    type: "Inline"
    inline: '{"error": "Forbidden"}'
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
- Set the response `Content-Type` directly with the `contentType` field
- Inline bodies are limited to 4096 bytes
- Useful for synthetic endpoints that don't need backend logic
