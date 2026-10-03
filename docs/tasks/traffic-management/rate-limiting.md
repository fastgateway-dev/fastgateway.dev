---
sidebar_position: 7
description: Configure rate limiting to protect backends from excessive traffic
---

# Rate Limiting

Rate limiting protects backends from excessive traffic by limiting request rates per client or globally.

## Prerequisites

Rate limiting requires:
- **Redis**: Backend storage for rate limit counters
- **Envoy Gateway Rate Limit Service**: Deployed and configured

## Configuration

```yaml
defaultTrafficPolicy:
  rateLimit:
    global:
      rules:
        - limit:
            requests: 100
            unit: "Minute"
          clientSelectors:
            - sourceCIDR: "0.0.0.0/0"
```

## Selectors

Rate limit by different criteria:

| Selector | Description |
|----------|-------------|
| **sourceCIDR** | Client IP address range |
| **headers** | Request header values |
| **remoteAddress** | Remote client address |

### Header-based Rate Limiting

```yaml
clientSelectors:
  - headers:
      - name: "X-API-Key"
        type: "Distinct"
```

## Rate Limit Response

When limits are exceeded, clients receive:
- **Status Code**: 429 Too Many Requests
- **Headers**: Rate limit information

## Units

| Unit | Description |
|------|-------------|
| **Second** | Requests per second |
| **Minute** | Requests per minute |
| **Hour** | Requests per hour |
