---
sidebar_position: 2
description: Rewrite URL paths using prefix replacement or full path replacement
---

# URL Rewrite

FastGateway can rewrite the request path and hostname before forwarding to a
backend. You configure this in the route builder, with no YAML to write.

URL rewrite applies to **Forward to Backend** routes. It is not available for
HTTP Redirect, Direct Response, or gRPC routes.

## Where to configure

In the route builder, open the **Traffic** tab and expand the **URL Rewrite**
section. There are two independent toggles.

### Rewrite Path

Check **Rewrite Path**, then choose a **Rewrite Type**:

- **Replace Prefix Match** replaces only the matched path prefix, then set **New
  Prefix** (for example `/v2`). This rewrites `/api/v1/users` to `/v2/users` when
  the route matches the prefix `/api/v1`. Prefix replacement only works when the
  route's path match type is Prefix.
- **Replace Full Path** replaces the entire path, then set **New Path** (for
  example `/new/path`).

### Rewrite Hostname

Check **Rewrite Hostname**, then set **New Hostname** (for example
`api.internal.example.com`). This changes the Host header sent to the backend.

A live preview shows the before and after URL as you type. Save the route when done.

## Rewrite Types

| Type | Description |
|------|-------------|
| **Replace Prefix Match** | Replaces the matched prefix portion (Prefix path match only) |
| **Replace Full Path** | Replaces the entire path |

## Use Cases

- Version migration: rewrite `/v1` to `/v2`
- Path normalization: strip API gateway prefixes
- Backend routing: map external paths to internal endpoints

After saving, the change goes through the approval workflow and is then deployed.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
