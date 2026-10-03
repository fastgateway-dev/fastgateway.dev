---
sidebar_position: 5
description: Test service resilience by injecting delays and aborts
---

# Fault Injection

FastGateway supports fault injection to test service resilience and failure handling.

:::warning Non-Production Only
Fault injection should only be used in testing and staging environments. Never enable fault injection in production.
:::

## Delay Injection

Inject latency to test timeout handling:

```yaml
filters:
  - type: "HTTPFaultInjection"
    faultInjection:
      delay:
        fixedDelay: "5s"
        percentage: 50
```

This adds a 5-second delay to 50% of requests.

## Abort Injection

Inject errors to test failure handling:

```yaml
filters:
  - type: "HTTPFaultInjection"
    faultInjection:
      abort:
        httpStatus: 503
        percentage: 10
```

This returns a 503 error for 10% of requests.

## Combined Fault Injection

Inject both delays and aborts:

```yaml
filters:
  - type: "HTTPFaultInjection"
    faultInjection:
      delay:
        fixedDelay: "2s"
        percentage: 30
      abort:
        httpStatus: 500
        percentage: 5
```

## Configuration Options

| Option | Description |
|--------|-------------|
| **fixedDelay** | Duration of injected delay |
| **httpStatus** | HTTP status code for aborts |
| **percentage** | Percentage of requests affected (0-100) |

## Testing Scenarios

- **Circuit breaker testing**: Inject 503 errors to trigger circuit breakers
- **Timeout validation**: Inject delays longer than configured timeouts
- **Retry logic testing**: Inject intermittent failures
- **Graceful degradation**: Verify fallback behavior under failures

## Best Practices

- Start with low percentages (1-5%)
- Use specific route matches to target specific endpoints
- Monitor metrics during fault injection tests
- Document expected behavior before testing
