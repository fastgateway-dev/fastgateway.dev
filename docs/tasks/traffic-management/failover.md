---
sidebar_position: 4
description: Configure primary and fallback backends for automatic failover
---

# Failover

Failover ensures high availability by routing traffic to healthy backends when primary backends become unavailable.

## Primary/Fallback Configuration

Define multiple backends with priorities:

```yaml
backends:
  - name: "primary"
    url: "http://api-primary.default.svc.cluster.local:8080"
    weight: 100
  - name: "fallback"
    url: "http://api-fallback.default.svc.cluster.local:8080"
    weight: 0
```

## Health Checks for Automatic Failover

Enable health checks to automatically detect and remove unhealthy backends:

```yaml
defaultTrafficPolicy:
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
