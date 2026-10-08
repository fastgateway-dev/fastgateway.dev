---
sidebar_position: 5
description: Test service resilience by injecting delays and aborts
---

# Fault Injection

FastGateway can inject faults into a route to test how your service handles
latency and errors. You configure this in the route builder, with no YAML to write.
It is part of the backend traffic policy, not a separate filter.

:::warning Non-Production Only
Fault injection should only be used in testing and staging environments. Never
enable fault injection in production.
:::

## Where to configure

Fault injection applies to **Forward to Backend** routes. In the route builder,
open the **Traffic** tab and expand the **Fault Injection** section, then check
**Enable Fault Injection**. You can enable delay, abort, or both.

### Delay Injection

Check **Enable Delay Injection**, then set:

- **Fixed Delay**: the latency to add, as a duration (for example `2s` or `500ms`).
- **Percentage**: the share of requests to delay, from 0 to 100. Defaults to 100.

### Abort Injection

Check **Enable Abort Injection**, then set:

- **Error Type**: **HTTP** or **gRPC**.
- **HTTP Status Code** (for HTTP) or **gRPC Status Code** (for gRPC): the error to return.
- **Percentage**: the share of requests to abort, from 0 to 100. Defaults to 100.

Save the route when done.

## Configuration Options

| Option | Description |
|--------|-------------|
| **Fixed Delay** | Duration of the injected delay (for example `5s`) |
| **HTTP Status Code** | HTTP status returned for aborts (for example `503`) |
| **Percentage** | Share of requests affected, 0 to 100 |

## Testing Scenarios

- **Circuit breaker testing**: inject 503 errors to trigger circuit breakers
- **Timeout validation**: inject delays longer than configured timeouts
- **Retry logic testing**: inject intermittent failures
- **Graceful degradation**: verify fallback behavior under failures

## Best Practices

- Start with low percentages (1 to 5 percent)
- Use a specific route match to target specific endpoints
- Monitor metrics during fault injection tests
- Document expected behavior before testing

After saving, the change goes through the approval workflow and is then deployed.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
