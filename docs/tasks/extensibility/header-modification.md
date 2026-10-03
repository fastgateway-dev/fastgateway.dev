---
sidebar_position: 1
description: Modify request and response headers using set, add, and remove operations
---

# Header Modification

FastGateway supports modifying HTTP headers on both requests and responses using filters.

## Request Header Modification

Modify headers before forwarding to backend:

```yaml
filters:
  - type: "RequestHeaderModifier"
    requestHeaderModifier:
      set:
        - name: "X-Custom-Header"
          value: "custom-value"
      add:
        - name: "X-Request-ID"
          value: "%REQ_ID%"
      remove:
        - "X-Internal-Header"
```

## Response Header Modification

Modify headers in the response to clients:

```yaml
filters:
  - type: "ResponseHeaderModifier"
    responseHeaderModifier:
      set:
        - name: "X-Frame-Options"
          value: "DENY"
      add:
        - name: "X-Response-Time"
          value: "%RESPONSE_TIME%"
      remove:
        - "Server"
```

## Operations

| Operation | Description |
|-----------|-------------|
| **set** | Sets header value, replacing any existing value |
| **add** | Adds header value, preserving existing values |
| **remove** | Removes header completely |

## Common Use Cases

- Add tracing headers (X-Request-ID, X-Trace-ID)
- Remove sensitive headers (Server, X-Powered-By)
- Set security headers (X-Frame-Options, X-Content-Type-Options)
- Add authentication context headers
