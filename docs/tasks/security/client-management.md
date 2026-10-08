---
sidebar_position: 6
description: Create and manage clients for per-client security controls
---

# Client Management

Clients enable per-client security controls including IP allowlisting and API key authentication.

## Creating Clients

Create a client with its core attributes. IP addresses and API keys are not set
inline at creation — they are managed separately afterwards (see below):

```yaml
client:
  name: "partner-api"
  description: "Partner API integration"
  team: "platform-team"
```

## Managing IP Addresses

A client's IPs are managed as individual CIDR entries, each added separately
(`POST /clients/{clientId}/ips`), with an optional description:

```yaml
# Add a CIDR entry to the client
cidr: "203.0.113.0/24"
description: "Partner office network"
```

## Managing API Keys

A client's API key is generated server-side (`POST /clients/{clientId}/api-key`).
The plaintext key is returned only once (prefix `fg_live_`) and is stored hashed —
it is never set or retrieved inline. Regenerating replaces the existing key.

```yaml
# Response from generating a client API key (shown only once)
apiKey: "fg_live_aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2u"
prefix: "fg_live_aB3c"
headerName: "x-api-key"
```

## Attaching Clients to Routes

Attach a client to a route to enable client mode security:

```yaml
attachment:
  client: "partner-api"
  route: "api-route"
```

## Approval Workflow

Client attachments use the unified multi-stage approval system. An attachment
request generates an approval with one or more stages that must be approved in
order. Each stage approval is submitted via
`POST /projects/{projectId}/client-approvals/{approvalId}/stages/{stageId}/approve`
(or the corresponding `/reject`).

Each stage is defined by a required permission and a team scope (`any`,
`other_team`, or `submitter_team`), and can require more than one approver.

**Rules:**
- Submitter cannot approve their own attachment
- Stages must be approved sequentially
- The attachment becomes active only after all stages are approved

## Cross-Team Attachments

When attaching a client to a route owned by a different team, configure a stage
scoped to the client's team so that a member of that team must approve before the
attachment is activated.
