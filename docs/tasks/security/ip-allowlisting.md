---
sidebar_position: 2
description: Configure IP-based access control using allowlisting
---

# IP Allowlisting

FastGateway supports IP-based access control in two modes: General and Client.

## General Mode

In general mode, IP rules are defined directly on the route and apply to all traffic.

```yaml
authorization:
  allowedCIDRs:
    - "10.0.0.0/8"
    - "192.168.1.0/24"
    - "203.0.113.50/32"
```

Alternatively, provide `ipAllowlist` entries, each with an optional description:

```yaml
ipAllowlist:
  - cidr: "10.0.0.0/8"
    description: "Corporate network"
  - cidr: "203.0.113.50/32"
    description: "Office gateway"
```

## Client Mode

In client mode, each client has its own IP allowlist. Clients are attached to
routes and traffic is validated against their specific CIDR entries. A client's
IPs are managed as individual CIDR entries (see
[Client Management](./client-management)) rather than an inline list on the route.

## CIDR Notation

| Format | Description |
|--------|-------------|
| `10.0.0.1/32` | Single IP address |
| `10.0.0.0/24` | 256 addresses (10.0.0.0 - 10.0.0.255) |
| `10.0.0.0/16` | 65,536 addresses |
| `10.0.0.0/8` | 16 million addresses |

## Mode Selection

- Use **General mode** for simple, route-wide IP restrictions
- Use **Client mode** when different clients need different IP allowlists
- General and Client modes are mutually exclusive on a route
