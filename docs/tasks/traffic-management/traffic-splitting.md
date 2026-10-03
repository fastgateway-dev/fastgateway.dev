---
sidebar_position: 2
description: Split traffic between backends for canary and blue-green deployments
---

# Traffic Splitting

Traffic splitting enables gradual rollouts, canary deployments, and blue-green releases by distributing requests across multiple backends.

## Use Cases

- **Canary Deployments**: Send small percentage to new version
- **Blue-Green**: Switch between production environments
- **A/B Testing**: Route traffic to different variants

## Weighted Backends

Configure multiple backends with weight distribution:

```yaml
backends:
  - name: "stable"
    url: "http://api-v1.default.svc.cluster.local:8080"
    weight: 90
  - name: "canary"
    url: "http://api-v2.default.svc.cluster.local:8080"
    weight: 10
```

Weights are relative values. In this example:
- 90% of traffic goes to stable (v1)
- 10% of traffic goes to canary (v2)

## Gradual Rollout Strategy

1. Start with 1-5% to canary
2. Monitor error rates and latency
3. Increase weight incrementally (10%, 25%, 50%)
4. Complete rollout at 100%

Combine with health checks to automatically remove unhealthy backends from rotation.
