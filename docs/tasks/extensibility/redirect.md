---
sidebar_position: 3
description: Configure HTTP redirects with path, scheme, and host modifications
---

# Redirect

FastGateway supports HTTP redirects to route clients to different URLs without backend processing.

## Basic Redirect

Redirect to a different path:

```yaml
filters:
  - type: "RequestRedirect"
    requestRedirect:
      path:
        type: "ReplaceFullPath"
        replaceFullPath: "/new-location"
      statusCode: 301
```

## Scheme Redirect (HTTP to HTTPS)

Force HTTPS:

```yaml
filters:
  - type: "RequestRedirect"
    requestRedirect:
      scheme: "https"
      statusCode: 301
```

## Host Redirect

Redirect to a different host:

```yaml
filters:
  - type: "RequestRedirect"
    requestRedirect:
      hostname: "new-domain.com"
      statusCode: 302
```

## Full Redirect Example

Combine multiple redirect options:

```yaml
filters:
  - type: "RequestRedirect"
    requestRedirect:
      scheme: "https"
      hostname: "api.example.com"
      path:
        type: "ReplacePrefixMatch"
        replacePrefixMatch: "/v2"
      port: 443
      statusCode: 308
```

## Status Codes

| Code | Description |
|------|-------------|
| **301** | Permanent redirect (cacheable) |
| **302** | Temporary redirect (not cached) |
| **307** | Temporary redirect (preserves method) |
| **308** | Permanent redirect (preserves method) |

## Use Cases

- HTTP to HTTPS migration
- Domain consolidation
- API version deprecation
- URL shortening
