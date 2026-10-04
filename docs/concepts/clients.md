---
sidebar_position: 6
title: Clients
description: API consumers and their access credentials
---

# Clients

Clients represent API consumers in FastGateway, providing identity management for access control through IP addresses and API keys.

## What is a Client?

A client is an entity that consumes your APIs, such as:

- External partner applications
- Internal microservices
- Mobile applications
- Third-party integrations

## Client Properties

| Property | Description |
|----------|-------------|
| Name | Human-readable identifier |
| Team | Owning team responsible for the client |
| IP Addresses | Allowed source IPs for IP-based filtering |
| API Keys | Secret keys for API key authentication |

## Client Credentials

### IP Addresses
```
Allowed IPs:
- 192.168.1.0/24
- 10.0.0.5
```

### API Keys
```
API Key: fg_live_abc123...
Header: X-API-Key
```

## Client Attachments

Clients connect to routes through attachments, which:

- Link a client to a specific route
- Enable client-specific security policies
- Require approval before activation

```mermaid
flowchart LR
    A["<b>Client</b>"] --> B["<b>Attachment</b>"] --> C["<b>Route</b>"]

    classDef node fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    class A,B,C node;
```

## Team Ownership

Each client belongs to a team:

- Team members manage client credentials
- Cross-team attachments require dual approval
- Client deletion removes all attachments

Clients provide the foundation for the Client security mode, enabling per-consumer access control.
