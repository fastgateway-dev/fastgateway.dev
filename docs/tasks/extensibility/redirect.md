---
sidebar_position: 3
description: Configure HTTP redirects with path, scheme, and host modifications
---

# Redirect

FastGateway supports HTTP redirects to route clients to different URLs without backend processing.

Redirect is a route type selected on the Traffic tab (`routeType: redirect`), not
a Gateway-API filter. The redirect options live under the `redirect` object.

## Basic Redirect

Redirect to a different path:

```yaml
routeType: redirect
redirect:
  path:
    type: "ReplaceFullPath"
    replaceFullPath: "/new-location"
  statusCode: 301
```

## Scheme Redirect (HTTP to HTTPS)

Force HTTPS:

```yaml
routeType: redirect
redirect:
  scheme: "https"
  statusCode: 301
```

## Host Redirect

Redirect to a different host:

```yaml
routeType: redirect
redirect:
  hostname: "new-domain.com"
  statusCode: 302
```

## Full Redirect Example

Combine multiple redirect options:

```yaml
routeType: redirect
redirect:
  scheme: "https"
  hostname: "api.example.com"
  path:
    type: "ReplacePrefixMatch"
    replacePrefixMatch: "/v2"
  port: 443
  statusCode: 302
```

## Status Codes

Only `301` and `302` are supported (`302` is the default).

| Code | Description |
|------|-------------|
| **301** | Permanent redirect (cacheable) |
| **302** | Temporary redirect (not cached, default) |

## Use Cases

- HTTP to HTTPS migration
- Domain consolidation
- API version deprecation
- URL shortening
