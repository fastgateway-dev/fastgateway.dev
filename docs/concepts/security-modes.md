---
sidebar_position: 7
title: Security Modes
description: General vs Client security approaches
---

# Security Modes

FastGateway offers two mutually exclusive security modes for protecting routes: General and Client mode.

## Mode Comparison

| Feature | General Mode | Client Mode |
|---------|--------------|-------------|
| IP Filtering | Route-level allowlist | Per-client IPs |
| API Keys | Route-level keys | Per-client keys |
| JWT Validation | Supported | Not supported |
| OIDC Authentication | Supported | Not supported |
| Granularity | All consumers same rules | Per-consumer rules |

## General Mode

Applies security policies at the route level:

```
┌───────┐     ┌────────────────────┐     ┌─────────┐
│Request│ ──▶ │ Route SecurityPolicy│ ──▶ │ Backend │
└───────┘     │ - IP: 10.0.0.0/8   │     └─────────┘
              │ - JWT: required     │
              └────────────────────┘
```

**Best for**: Public APIs, internal services with uniform access requirements.

## Client Mode

Applies security policies per client attachment:

```
┌──────────┐     ┌────────────────────┐     ┌─────────┐
│ Client A │ ──▶ │ Attachment Policy  │ ──▶ │         │
│ IP: 1.2.3│     │ - API Key: abc123  │     │  Route  │
└──────────┘     └────────────────────┘     │         │
┌──────────┐     ┌────────────────────┐     │         │
│ Client B │ ──▶ │ Attachment Policy  │ ──▶ │         │
│ IP: 4.5.6│     │ - API Key: xyz789  │     └─────────┘
└──────────┘     └────────────────────┘
```

**Best for**: Partner APIs, multi-tenant platforms, differentiated access.

## Important Notes

- Modes are **mutually exclusive** per route
- Cannot mix General and Client security on the same route
- OIDC is only available in General mode
