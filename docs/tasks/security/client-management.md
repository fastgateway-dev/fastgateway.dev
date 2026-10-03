---
sidebar_position: 6
description: Create and manage clients for per-client security controls
---

# Client Management

Clients enable per-client security controls including IP allowlisting and API key authentication.

## Creating Clients

Create a client with optional IP addresses and API key:

```yaml
client:
  name: "partner-api"
  description: "Partner API integration"
  team: "platform-team"
  ipAddresses:
    - "203.0.113.0/24"
    - "198.51.100.10/32"
  apiKey: "pk_partner_abc123"
```

## Managing IP Addresses

Add or update IP addresses for a client:

```yaml
client:
  name: "partner-api"
  ipAddresses:
    - "203.0.113.0/24"
    - "198.51.100.0/24"
    - "10.0.0.0/8"
```

## Managing API Keys

Set or rotate a client's API key:

```yaml
client:
  name: "partner-api"
  apiKey: "pk_partner_newkey456"
```

## Attaching Clients to Routes

Attach a client to a route to enable client mode security:

```yaml
attachment:
  client: "partner-api"
  route: "api-route"
```

## Dual Approval Workflow

Client attachments require dual approval for security:

| Step | Actor | Action |
|------|-------|--------|
| 1 | Submitter | Creates attachment request |
| 2 | Team Member | Approves with `approve-team` |
| 3 | Approver | Approves with `approve-approver` |

**Rules:**
- Submitter cannot approve their own attachment
- For cross-team attachments, team approval must come from a member of the client's team
- Both approvals required before attachment is active

## Cross-Team Attachments

When attaching a client to a route owned by a different team:

1. Submitter creates attachment request
2. Member of the **client's team** provides team approval
3. Route approver provides final approval
