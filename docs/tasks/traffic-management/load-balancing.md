---
sidebar_position: 3
description: Configure load balancing algorithms for distributing traffic
---

# Load Balancing

FastGateway supports multiple load balancing algorithms through Default Traffic Policy.

## Algorithms

| Algorithm | Description |
|-----------|-------------|
| **Round Robin** | Distributes requests sequentially (default) |
| **Least Request** | Routes to backend with fewest active requests |
| **Random** | Randomly selects a backend |
| **Consistent Hash** | Routes same clients to same backends |

## Configuration Example

```yaml
defaultTrafficPolicy:
  loadBalancer:
    type: "ConsistentHash"
    consistentHash:
      type: "Header"
      header:
        name: "X-User-ID"
```

## Consistent Hash Options

Maintain session affinity using:

| Type | Description |
|------|-------------|
| **Header** | Hash based on request header value |
| **Cookie** | Hash based on cookie value |
| **SourceIP** | Hash based on client IP address |

```yaml
consistentHash:
  type: "Cookie"
  cookie:
    name: "session_id"
    ttl: "3600s"
```

Consistent hashing ensures the same client reaches the same backend, useful for stateful applications and caching efficiency.
