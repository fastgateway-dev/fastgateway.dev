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

## RequestMirror Configuration

Configure mirroring in route filters:

```yaml
filters:
  - type: "RequestMirror"
    requestMirror:
      backendRef:
        name: "shadow-backend"
        port: 8080
      fraction: 100
```

## Mirror Percentage

Control the percentage of traffic to mirror:

| Fraction | Description |
|----------|-------------|
| **100** | Mirror all requests (100%) |
| **50** | Mirror half of requests |
| **10** | Mirror 10% of requests |

## Important Notes

- Mirrored requests are fire-and-forget
- Responses from mirror backend are ignored
- Original request latency is not affected
- Mirror backend errors don't impact users

Start with low percentages and increase gradually to avoid overwhelming test backends.
