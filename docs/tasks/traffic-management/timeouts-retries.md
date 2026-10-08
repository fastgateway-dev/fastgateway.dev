---
sidebar_position: 6
description: Configure request timeouts and retry policies for resilient services
---

# Timeouts and Retries

Configure timeouts and retries to handle transient failures and keep service communication reliable. Both live in the **Backend Traffic Policy** section of the **Traffic** tab in the route builder.

## Timeouts

Enable **Timeouts** and set the durations you need. Durations use a number plus a unit, for example `500ms`, `5s`, `1m`, or `1h`.

| Setting | Description |
|---------|-------------|
| **Connect Timeout** | Time to establish a TCP connection to the backend |
| **Request Timeout** | Total time to process the request and return a response |
| **Connection Idle Timeout** | Time a connection can be idle before being closed |
| **Max Connection Duration** | Maximum lifetime of a connection regardless of activity |
| **Max Stream Duration** | Maximum duration of a single HTTP/2 or gRPC stream |

## Retries

Enable **Retries** and set the **Number of Retries** (defaults to 2). Under **HTTP Status Codes**, list the response codes that should be retried, for example `500, 502, 503`. Under **Retry On**, select the trigger conditions.

## Retry Conditions

| Condition | Description |
|-----------|-------------|
| **5xx** | Retry on any 5xx response code |
| **Gateway Error** | Retry on 502, 503, or 504 response codes |
| **Connection Failure** | Retry when the connection to the backend fails |
| **Retriable Status Codes** | Retry when the response matches the configured HTTP status codes |
| **Connection Reset** | Retry when the connection is reset by the backend |
| **Reset Before Request** | Retry when the connection is reset before the request is sent |
| **Retriable 4xx** | Retry on retriable 4xx response codes, such as 409 |

## Best Practices

- Keep the per-attempt timeout shorter than the total request timeout
- Use exponential backoff (handled automatically)
- Limit retries for non-idempotent requests
- Combine with circuit breakers to prevent cascade failures

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
