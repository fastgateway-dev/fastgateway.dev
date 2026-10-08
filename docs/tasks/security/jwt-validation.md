---
sidebar_position: 4
description: Configure JWT validation for your routes
---

# JWT Validation

FastGateway supports JWT (JSON Web Token) validation to secure your APIs. Tokens are read from the `Authorization: Bearer <token>` header.

## Configure in the UI

1. In the route builder, open the **Security** tab and keep **General** mode.
2. Expand **JWT Validation** and check **Enable JWT Validation**.
3. Fill in the fields below:
   - **Issuer**: the expected `iss` claim, matching your identity provider.
   - **JWKS URL**: where the provider publishes its public keys.
   - **Audiences** (optional): type an audience and click **Add**. Repeat for each one. If set, the token must contain one of these.
4. Submit the route for approval. Once approved, the change deploys.

## JWT Settings

| Field | Description |
|---------|-------------|
| **Issuer** | Expected token issuer (iss claim) |
| **JWKS URL** | URL to fetch the JSON Web Key Set |
| **Audiences** | Expected token audiences (aud claim), optional |

## Claims to Headers

JWT claims can be forwarded to your backend as request headers (for example `sub` to `X-User-ID`). This mapping is part of the route's JWT policy. See the [API Reference](/docs/reference/api-reference) for the claim-to-header fields.

## Request Example

```bash
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  https://api.example.com/protected
```

## Validation Process

1. Extract the token from the `Authorization: Bearer <token>` header.
2. Validate the signature using the JWKS.
3. Verify the issuer matches the configured value.
4. Verify the audience includes a configured value (when audiences are set).
5. Check token expiration (exp claim).
6. Forward configured claims as headers.

## Client Mode

In **Client-Based** mode, JWT is configured per client on the client's **JWT** tab, then enabled when you attach the client to the route. See [Client Management](./client-management).
