---
sidebar_position: 5
description: Configure OpenID Connect (OIDC) authentication for your routes
---

# OIDC Integration

FastGateway supports OIDC authentication for browser-based applications. OIDC is only available in **General mode**.

## OIDC Settings

| Setting | Description |
|---------|-------------|
| **issuer** | OIDC provider discovery URL (issuer) |
| **clientId** | OAuth client ID |
| **clientSecretName** | Kubernetes Secret holding the OAuth client secret |
| **redirectURL** | OAuth callback URL |
| **logoutPath** | Path that triggers logout |
| **scopes** | OAuth scopes to request |
| **cookieDomain** | Domain for session cookies |

## Configuration Example

The client secret is never inline; it references a Kubernetes Secret by name.

```yaml
securityMode: "general"
oidc:
  issuer: "https://auth.example.com"
  clientId: "your-client-id"
  clientSecretName: "oidc-client-secret"
  redirectURL: "https://app.example.com/oauth2/callback"
  scopes:
    - "openid"
    - "profile"
    - "email"
  cookieDomain: ".example.com"
```

## Supported Providers

| Provider | Issuer URL Format |
|----------|---------------------|
| **Auth0** | `https://your-tenant.auth0.com` |
| **Okta** | `https://your-org.okta.com` |
| **Azure AD** | `https://login.microsoftonline.com/{tenant}/v2.0` |
| **Google** | `https://accounts.google.com` |
| **Keycloak** | `https://keycloak.example.com/realms/{realm}` |

## Auth0 Example

```yaml
oidc:
  issuer: "https://myapp.auth0.com"
  clientId: "abc123"
  clientSecretName: "auth0-client-secret"
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
