---
sidebar_position: 5
description: Configure OpenID Connect (OIDC) authentication for your routes
---

# OIDC Integration

FastGateway supports OIDC authentication for browser-based applications. OIDC is only available in **General mode**.

## OIDC Settings

| Setting | Description |
|---------|-------------|
| **provider** | OIDC provider discovery URL |
| **clientID** | OAuth client ID |
| **clientSecret** | OAuth client secret |
| **scopes** | OAuth scopes to request |
| **cookieDomain** | Domain for session cookies |

## Configuration Example

```yaml
securityMode: "general"
oidcAuth:
  provider: "https://auth.example.com"
  clientID: "your-client-id"
  clientSecret: "your-client-secret"
  scopes:
    - "openid"
    - "profile"
    - "email"
  cookieDomain: ".example.com"
```

## Supported Providers

| Provider | Discovery URL Format |
|----------|---------------------|
| **Auth0** | `https://your-tenant.auth0.com` |
| **Okta** | `https://your-org.okta.com` |
| **Azure AD** | `https://login.microsoftonline.com/{tenant}/v2.0` |
| **Google** | `https://accounts.google.com` |
| **Keycloak** | `https://keycloak.example.com/realms/{realm}` |

## Auth0 Example

```yaml
oidcAuth:
  provider: "https://myapp.auth0.com"
  clientID: "abc123"
  clientSecret: "secret-from-auth0"
  scopes:
    - "openid"
    - "profile"
  cookieDomain: ".myapp.com"
```

## Important Notes

- OIDC is only available in **General mode** (not Client mode)
- Requires browser-based flow (redirects for authentication)
- Session state is managed via cookies
- Configure callback URLs in your OIDC provider
