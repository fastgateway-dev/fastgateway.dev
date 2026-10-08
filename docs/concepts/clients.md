---
sidebar_position: 6
title: Clients
description: API consumers and their access credentials
---

# Clients

Clients represent API consumers in FastGateway, providing identity management for access control through IP addresses, API keys, JWT, and mTLS.

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
| JWT | Per-client JWT validation (issuer, JWKS, audiences, claims) |
| mTLS | Per-client mutual TLS using a CA and SAN/certificate identity |

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
Header: x-api-key
```

### JWT
```
Issuer: https://issuer.example.com
JWKS URL: https://issuer.example.com/.well-known/jwks.json
Audiences: [api.example.com]
```

### mTLS
```
CA: client-ca
SAN: spiffe://example.com/client
```

Requests are routed to a client using a separate client ID header (`x-client-id`), independent of the authentication method.

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
