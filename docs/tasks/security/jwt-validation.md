---
sidebar_position: 4
description: Configure JWT validation for your routes
---

# JWT Validation

FastGateway supports JWT (JSON Web Token) validation to secure your APIs.

## JWT Settings

| Setting | Description |
|---------|-------------|
| **issuer** | Expected token issuer (iss claim) |
| **jwksUrl** | URL to fetch JSON Web Key Set |
| **audiences** | Expected token audiences (aud claim) |

## Configuration Example

JWT is configured as a flat object on the route:

```yaml
jwt:
  issuer: "https://auth.example.com"
  jwksUrl: "https://auth.example.com/.well-known/jwks.json"
  audiences:
    - "api.example.com"
    - "https://api.example.com"
```

## Claims to Headers

Extract JWT claims and forward them as headers to backends:

```yaml
jwt:
  issuer: "https://auth.example.com"
  jwksUrl: "https://auth.example.com/.well-known/jwks.json"
  audiences:
    - "api.example.com"
  claimToHeaders:
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
