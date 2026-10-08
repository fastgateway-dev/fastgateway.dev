---
sidebar_position: 3
description: Configure load balancing algorithms for distributing traffic
---

# Load Balancing

FastGateway distributes traffic across backend endpoints using a load balancing algorithm you choose in the route builder.

## Configure

In the route builder, open the **Traffic** tab and expand the **Backend Traffic Policy** section. Under **Load Balancer**, pick an algorithm. When you leave it unset, Envoy Gateway defaults to Least Request.

## Algorithms

| Algorithm | Description |
|-----------|-------------|
| **Round Robin** | Distributes requests evenly across all backends in order |
| **Least Request** | Sends requests to the backend with the fewest active requests |
| **Random** | Distributes requests randomly across backends |
| **Consistent Hash** | Routes requests to the same backend based on a hash key |

## Consistent Hash Options

When you select **Consistent Hash**, choose how the hash key is derived. This maintains session affinity so the same client reaches the same backend.

| Type | Description |
|------|-------------|
| **Source IP** | Hash based on the client IP address |
| **Header** | Hash based on a specific HTTP header value |
| **Cookie** | Hash based on a specific cookie value |

For **Header**, enter the header name to hash on. For **Cookie**, enter the cookie name and an optional TTL.

Consistent hashing is useful for stateful applications and caching efficiency.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
