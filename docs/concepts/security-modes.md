---
sidebar_position: 7
title: Security Modes
description: General vs Client security approaches
---

# Security Modes

FastGateway offers two mutually exclusive security modes for protecting routes: General and Client mode.

![The Security tab of the route builder — pick General or Client-Based mode, then configure CORS, IP allowlisting, API keys, JWT, OIDC, and external authorization](/img/ui-route-security.jpg)

## Mode Comparison

| Feature | General Mode | Client Mode |
|---------|--------------|-------------|
| IP Filtering | Route-level allowlist | Per-client IPs |
| API Keys | Route-level keys | Per-client keys |
| JWT Validation | Route-level | Per-client (via attachments) |
| mTLS | Not supported | Per-client (via attachments) |
| OIDC Authentication | Supported | Not supported |
| Granularity | All consumers same rules | Per-consumer rules |

## General Mode

Applies security policies at the route level:

```mermaid
flowchart LR
    R["Request"] --> P["<b>Route SecurityPolicy</b><br/>IP: 10.0.0.0/8<br/>JWT: required"] --> B["Backend"]

    classDef policy fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    classDef plain fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px,color:#334155;
    class P policy;
    class R,B plain;
```

**Best for**: Public APIs, internal services with uniform access requirements.

## Client Mode

Applies security policies per client attachment:

```mermaid
flowchart LR
    CA["<b>Client A</b><br/>IP: 1.2.3"] --> PA["<b>Attachment Policy</b><br/>API Key: abc123"]
    CB["<b>Client B</b><br/>IP: 4.5.6"] --> PB["<b>Attachment Policy</b><br/>API Key: xyz789"]
    PA --> R["<b>Route</b>"]
    PB --> R

    classDef policy fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    classDef client fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px,color:#334155;
    class PA,PB policy;
    class CA,CB,R client;
```

**Best for**: Partner APIs, multi-tenant platforms, differentiated access.

## Important Notes

- Modes are **mutually exclusive** per route
- Cannot mix General and Client security on the same route
- Route-level JWT is only available in General mode; in Client mode, JWT and mTLS are configured per client via client attachments
- OIDC is only available in General mode
