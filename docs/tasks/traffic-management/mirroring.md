---
sidebar_position: 5
description: Mirror traffic to shadow backends for testing without impacting production
---

# Traffic Mirroring

Traffic mirroring (shadowing) copies production traffic to test backends, allowing you to validate changes without affecting users.

## Use Cases

- Test new backend versions with real traffic
- Validate performance under production load
- Debug issues with production request patterns
- Compare responses between versions

## Mirror Configuration

Add one or more mirror destinations to the route. Every request matched by the
route is mirrored to each destination:

```yaml
mirrors:
  - type: kubernetes
    service: "shadow-backend"
    namespace: "default"
    port: 8080
```

Mirror destinations are Kubernetes services. There is no sampling percentage —
all matched traffic is mirrored.

## Important Notes

- Every matched request is mirrored (no percentage/sampling)
- Mirrored requests are fire-and-forget
- Responses from mirror backend are ignored
- Original request latency is not affected
- Mirror backend errors don't impact users
