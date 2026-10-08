---
sidebar_position: 4
description: Configure primary and fallback backends for automatic failover
---

# Failover

Failover ensures high availability by routing traffic to healthy backends when primary backends become unavailable.

## Primary/Fallback Configuration

Mark a backend as a fallback with `fallback: true`. Fallback backends receive
traffic only when the primary (non-fallback) backends are unhealthy:

```yaml
backends:
  - type: kubernetes
    service: "api-primary"
    namespace: "default"
    port: 8080
  - type: kubernetes
    service: "api-fallback"
    namespace: "default"
    port: 8080
    fallback: true
```

The `fallback` flag is a dedicated boolean on the backend. Weights are ignored
for fallback backends.

## Health Checks for Automatic Failover

Enable health checks to automatically detect and remove unhealthy backends:

```yaml
backendTrafficPolicy:
  healthCheck:
    active:
      type: "HTTP"
      http:
        path: "/health"
        expectedStatuses:
          - 200
      interval: "10s"
      timeout: "5s"
      unhealthyThreshold: 3
      healthyThreshold: 2
```

## How Failover Works

1. Health checks run at configured intervals
2. Backend marked unhealthy after `unhealthyThreshold` failures
3. Traffic automatically routes to healthy backends
4. Backend restored after `healthyThreshold` successes

Combine with circuit breakers for comprehensive resilience.
