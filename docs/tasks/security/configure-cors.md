---
sidebar_position: 1
description: Configure Cross-Origin Resource Sharing (CORS) settings for your routes
---

# Configure CORS

FastGateway supports CORS configuration to control cross-origin requests to your APIs.

![The Security tab of the route builder, where CORS Configuration sits alongside IP allowlisting, API key, JWT, and OIDC](/img/ui-route-security.jpg)

## CORS Settings

| Setting | Description |
|---------|-------------|
| **allowOrigins** | Origins allowed to access the resource |
| **allowMethods** | HTTP methods allowed for cross-origin requests |
| **allowHeaders** | Headers that can be used in the request |
| **exposeHeaders** | Headers exposed to the browser |
| **maxAge** | How long preflight results can be cached (seconds) |
| **allowCredentials** | Whether credentials are allowed |

## Configuration Example

```yaml
cors:
  allowOrigins:
    - "https://example.com"
    - "https://*.example.com"
  allowMethods:
    - "GET"
    - "POST"
    - "PUT"
    - "DELETE"
  allowHeaders:
    - "Content-Type"
    - "Authorization"
    - "X-Request-ID"
  exposeHeaders:
    - "X-Request-ID"
    - "X-Response-Time"
  maxAge: 3600
  allowCredentials: true
```

## Wildcard Origins

Use `*` to allow all origins (not recommended for production with credentials):

```yaml
cors:
  allowOrigins:
    - "*"
  allowMethods:
    - "GET"
    - "POST"
  allowCredentials: false
```

Note: When `allowCredentials` is `true`, you cannot use `*` for `allowOrigins`.
