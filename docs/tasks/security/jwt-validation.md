---
sidebar_position: 4
description: Configure JWT validation for your routes
---

# JWT Validation

FastGateway supports JWT (JSON Web Token) validation to secure your APIs.

## JWT Provider Settings

| Setting | Description |
|---------|-------------|
| **issuer** | Expected token issuer (iss claim) |
| **remoteJWKS** | URL to fetch JSON Web Key Set |
| **audiences** | Expected token audiences (aud claim) |

## Configuration Example

```yaml
jwtAuth:
  providers:
    - name: "auth-provider"
      issuer: "https://auth.example.com"
      remoteJWKS: "https://auth.example.com/.well-known/jwks.json"
      audiences:
        - "api.example.com"
        - "https://api.example.com"
```

## Claims to Headers

Extract JWT claims and forward them as headers to backends:

```yaml
jwtAuth:
  providers:
    - name: "auth-provider"
      issuer: "https://auth.example.com"
      remoteJWKS: "https://auth.example.com/.well-known/jwks.json"
      audiences:
        - "api.example.com"
      claimsToHeaders:
        - claim: "sub"
          header: "X-User-ID"
        - claim: "email"
          header: "X-User-Email"
        - claim: "roles"
          header: "X-User-Roles"
```

## Request Example

```bash
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  https://api.example.com/protected
```

## Validation Process

1. Extract token from `Authorization: Bearer <token>` header
2. Validate signature using JWKS
3. Verify issuer matches configured value
4. Verify audience includes configured value
5. Check token expiration (exp claim)
6. Forward configured claims as headers
