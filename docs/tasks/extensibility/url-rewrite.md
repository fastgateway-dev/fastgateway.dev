---
sidebar_position: 2
description: Rewrite URL paths using prefix replacement or full path replacement
---

# URL Rewrite

FastGateway supports URL rewriting to modify the request path before forwarding
to backends. `urlRewrite` is a top-level setting on the route (configured on the
Traffic tab).

## Path Prefix Replacement

Replace a path prefix with a different value:

```yaml
urlRewrite:
  path:
    type: "ReplacePrefixMatch"
    replacePrefixMatch: "/v2"
```

This rewrites `/api/v1/users` to `/v2/users` when matched with prefix `/api/v1`.

## Full Path Replacement

Replace the entire path:

```yaml
urlRewrite:
  path:
    type: "ReplaceFullPath"
    replaceFullPath: "/new-endpoint"
```

## Hostname Rewrite

Optionally rewrite the Host header:

```yaml
urlRewrite:
  hostname: "internal-service.local"
  path:
    type: "ReplacePrefixMatch"
    replacePrefixMatch: "/"
```

## Rewrite Types

| Type | Description |
|------|-------------|
| **ReplacePrefixMatch** | Replaces the matched prefix portion |
| **ReplaceFullPath** | Replaces the entire path |

## Use Cases

- Version migration: rewrite `/v1` to `/v2`
- Path normalization: strip API gateway prefixes
- Backend routing: map external paths to internal endpoints
