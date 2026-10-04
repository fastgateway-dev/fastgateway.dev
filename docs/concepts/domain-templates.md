---
sidebar_position: 3
title: Domain Templates
description: Reusable Gateway configuration templates
---

# Domain Templates

Domain templates define reusable Gateway settings that domains can inherit, ensuring consistent configuration across your API infrastructure.

## Template Properties

| Property | Description | Options |
|----------|-------------|---------|
| Exposure Type | Network accessibility | `public` (internet-facing), `internal` (cluster-only) |
| Port | Listener port number | Any valid port (typically 80, 443, 8080) |
| TLS Policy | Certificate handling | `terminate`, `passthrough`, `none` |
| Annotations | Custom metadata | Key-value pairs for load balancer configuration |

## How Templates Work

```mermaid
flowchart TD
    T["<b>Domain Template</b><br/>exposure: public<br/>port: 443<br/>tls: terminate"]
    T -->|inherits| A["<b>Domain A</b><br/>api.com"]
    T -->|inherits| B["<b>Domain B</b><br/>app.com"]

    classDef template fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    classDef domain fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px,color:#334155;
    class T template;
    class A,B domain;
```

## Common Template Patterns

| Template Name | Use Case |
|---------------|----------|
| Public HTTPS | Internet APIs with TLS termination |
| Internal HTTP | Cluster-internal services |
| Public Passthrough | mTLS or custom certificate handling |

## Benefits

- **Consistency**: All domains using a template share the same baseline configuration
- **Efficiency**: Update the template to change all associated domains
- **Compliance**: Enforce organizational standards through template policies

Templates reduce configuration drift and simplify domain management at scale.
