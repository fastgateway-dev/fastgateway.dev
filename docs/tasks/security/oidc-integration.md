---
sidebar_position: 5
description: Configure OpenID Connect (OIDC) authentication for your routes
---

# OIDC Integration

FastGateway supports OIDC authentication for browser-based applications. OIDC is only available in **General** mode.

## Configure in the UI

The OAuth client secret is never typed into FastGateway. You create a Kubernetes Secret yourself and reference it by name.

1. Create a Kubernetes Secret holding the OAuth client secret.
2. In the route builder, open the **Security** tab and keep **General** mode.
3. Expand **OIDC / SSO Login** and check **Enable OIDC / SSO Login**.
4. Fill in the fields below:
   - **Issuer URL**: the OIDC provider discovery URL.
   - **Client ID**: your OAuth client ID.
   - **Client Secret Name (K8s Secret)**: the name of the Secret you created.
   - **Redirect URL**: the OAuth callback URL, matching the one registered with your provider.
   - **Logout Path**: the path that triggers logout.
   - **Scopes**: type a scope and click **Add**. Repeat for each one. `openid` is required.
   - **Cookie Domain** (optional): set this for cross-subdomain SSO.
5. Submit the route for approval. Once approved, the change deploys.

## OIDC Settings

| Field | Description |
|---------|-------------|
| **Issuer URL** | OIDC provider discovery URL |
| **Client ID** | OAuth client ID |
| **Client Secret Name (K8s Secret)** | Kubernetes Secret holding the OAuth client secret |
| **Redirect URL** | OAuth callback URL |
| **Logout Path** | Path that triggers logout |
| **Scopes** | OAuth scopes to request |
| **Cookie Domain** | Domain for session cookies (optional) |

## Supported Providers

| Provider | Issuer URL Format |
|----------|---------------------|
| **Auth0** | `https://your-tenant.auth0.com` |
| **Okta** | `https://your-org.okta.com` |
| **Azure AD** | `https://login.microsoftonline.com/{tenant}/v2.0` |
| **Google** | `https://accounts.google.com` |
| **Keycloak** | `https://keycloak.example.com/realms/{realm}` |

## Important Notes

- OIDC is only available in **General** mode (not Client mode).
- It requires a browser-based flow, redirecting users to the identity provider.
- Session state is managed via cookies.
- Configure the callback URL in your OIDC provider to match the **Redirect URL**.
- For API-to-API authentication, use [JWT Validation](./jwt-validation) instead.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
