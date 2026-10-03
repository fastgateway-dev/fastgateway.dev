---
sidebar_position: 3
description: Configure API key authentication for your routes
---

# API Key Authentication

FastGateway supports API key authentication via the `x-api-key` header.

## General Mode

In general mode, a single API key protects the entire route.

```yaml
apiKeyAuth:
  apiKey: "your-secret-api-key"
```

Requests must include the API key header:

```bash
curl -H "x-api-key: your-secret-api-key" https://api.example.com/endpoint
```

## Client Mode

In client mode, each client has its own API key. Multiple clients can access the same route with different keys.

```yaml
# Client definition
client:
  name: "mobile-app"
  apiKey: "client-specific-api-key"
```

## Configuration Example

```yaml
securityMode: "general"
apiKeyAuth:
  apiKey: "sk_live_abc123xyz789"
```

## Best Practices

| Practice | Description |
|----------|-------------|
| **Rotate regularly** | Change API keys periodically |
| **Use strong keys** | Generate cryptographically secure keys |
| **Separate environments** | Use different keys for dev/staging/prod |
| **Monitor usage** | Track API key usage for anomalies |

## Mode Selection

- Use **General mode** for internal services or simple authentication
- Use **Client mode** when multiple consumers need individual keys for tracking and revocation
