---
sidebar_position: 6
description: Configure request timeouts and retry policies for resilient services
---

# Timeouts and Retries

Configure timeouts and retries to handle transient failures and ensure reliable service communication.

## Timeout Configuration

```yaml
backendTrafficPolicy:
  timeout:
    tcp:
      connectTimeout: "10s"
    http:
      connectionIdleTimeout: "60s"
      maxConnectionDuration: "300s"
      requestTimeout: "30s"
```

| Setting | Description |
|---------|-------------|
| **connectTimeout** | Time to establish connection |
| **requestTimeout** | Maximum time for complete request |
| **connectionIdleTimeout** | Idle connection timeout |

## Retry Policy

```yaml
backendTrafficPolicy:
  retry:
    numRetries: 2
    perRetryPolicy:
      timeout: "5s"
    retryOn:
      triggers:
        - "5xx"
        - "connect-failure"
        - "reset"
      httpStatusCodes:
        - 503
```

`numRetries` defaults to `2` if not set. The per-attempt timeout lives under
`perRetryPolicy.timeout`. `retryOn` is an object with a `triggers` list (Envoy
retry conditions) and an optional `httpStatusCodes` list.

## Retry Conditions

| Condition | Description |
|-----------|-------------|
| **5xx** | Retry on 5xx server errors |
| **connect-failure** | Retry on connection failures |
| **reset** | Retry on connection resets |
| **retriable-4xx** | Retry on retriable 4xx errors |

## Best Practices

- Set the per-attempt timeout (`perRetryPolicy.timeout`) shorter than the total timeout
- Use exponential backoff (handled automatically)
- Limit retries for non-idempotent requests
- Combine with circuit breakers to prevent cascade failures
