---
sidebar_position: 1
description: Modify request and response headers using set, add, and remove operations
---

# Header Modification

FastGateway can add, overwrite, or strip HTTP headers on both requests and
responses. You configure this in the route builder, with no YAML to write.

## Where to configure

In the route builder, open the **Traffic** tab and expand the **Header Modifiers**
section. It has two groups:

- **Request Headers** change headers before the request is forwarded to the backend.
- **Response Headers** change headers on the response sent back to the client.

Click **Add** in either group to create a row. Each row has three parts:

1. An operation: **Set**, **Add**, or **Remove**.
2. The header name (for example `X-Custom-Header`).
3. The header value (hidden for **Remove**, since the header is just dropped).

Add as many rows as you need, then save the route.

## Operations

| Operation | Description |
|-----------|-------------|
| **Set** | Sets the header value, overwriting any existing value |
| **Add** | Adds the header value, appending to any existing values |
| **Remove** | Removes the header completely |

## Common Use Cases

- Add tracing headers (X-Request-ID, X-Trace-ID)
- Remove sensitive headers (Server, X-Powered-By)
- Set security headers (X-Frame-Options, X-Content-Type-Options)
- Add authentication context headers

After saving, the change goes through the approval workflow and is then deployed.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
