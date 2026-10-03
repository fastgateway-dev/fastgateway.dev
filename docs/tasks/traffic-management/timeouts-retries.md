---
sidebar_position: 6
description: Configure request timeouts and retry policies for resilient services
---

# Timeouts and Retries

Configure timeouts and retries to handle transient failures and ensure reliable service communication.

## Timeout Configuration

```yaml
defaultTrafficPolicy:
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
defaultTrafficPolicy:
  retry:
    numRetries: 3
    perTryTimeout: "5s"
    retryOn:
      - "5xx"
      - "connect-failure"
      - "reset"
```

## Retry Conditions

| Condition | Description |
|-----------|-------------|
| **5xx** | Retry on 5xx server errors |
| **connect-failure** | Retry on connection failures |
| **reset** | Retry on connection resets |
| **retriable-4xx** | Retry on retriable 4xx errors |

## Best Practices

- Set `perTryTimeout` shorter than total timeout
- Use exponential backoff (handled automatically)
- Limit retries for non-idempotent requests
- Combine with circuit breakers to prevent cascade failures
