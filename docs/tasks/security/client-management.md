---
sidebar_position: 6
description: Create and manage clients for per-client security controls
---

# Client Management

Clients enable per-client security controls including IP allowlisting, API keys, JWT, mTLS, and header authentication. Clients are global: you manage them from the top-level **Clients** navigation, and then attach them to routes.

## Creating Clients

1. Open **Clients** in the top navigation and click **Create Client**.
2. Fill in the fields:
   - **Client Name** (required).
   - **Description** (optional).
   - **Owner Team** (required): the team that owns and manages this client.
   - **Contact Name** and **Contact Email** (optional).
3. Click **Create Client**.

IP addresses and API keys are not set at creation. You add them afterwards from the client's detail page, which has tabs for **IP Addresses**, **Header & Method Rules**, **API Key**, **JWT**, **mTLS**, and **Attached Routes**.

## Managing IP Addresses

On the client's **IP Addresses** tab, add each allowed range as an individual CIDR entry. Each entry has a CIDR value and an optional description. Add as many entries as you need.

## Managing API Keys

On the client's **API Key** tab, click to generate a key. The key is generated server-side, prefixed `fg_live_`, and shown only once with the warning *Copy this key now. It won't be shown again.* It is stored hashed and can never be retrieved later. Regenerating a key replaces the existing one.

Clients route to the gateway using the `x-client-id` header (set to the client ID) alongside the API key header, for example:

```bash
curl -H "x-client-id: <client-id>" -H "x-api-key: YOUR_API_KEY" https://your-api.example.com
```

## JWT and mTLS

A client can also carry its own JWT and mTLS configuration, set on the client's **JWT** and **mTLS** tabs. These are enforced only when the matching security feature is enabled on the route attachment.

## Attaching Clients to Routes

You attach a client to a route to enable client-based security. You can do this from the route builder's **Clients** tab (with the route's **Security Mode** set to **Client-Based**) or from the client's **Attached Routes** tab.

When attaching, pick the client and check which **Security Features** to enforce: **IP Allowlist**, **API Key**, **JWT**, **Mutual TLS**, and **Header & Method Auth**. A feature can only be enabled if the client has it configured. When more than one is enabled, the client must pass all enabled checks (AND logic). You can also set optional per-client rate limiting on the attachment.

## Approval Workflow

Client attachments go through the unified multi-stage approval. An attachment request generates an approval with one or more stages that must be approved in order before the attachment becomes active.

**Rules:**

- The submitter cannot approve their own attachment.
- Stages must be approved sequentially.
- The attachment becomes active only after all stages are approved.

## Cross-Team Attachments

Attaching a client to a route owned by a different team requires approval from the relevant team as part of the multi-stage flow. A member of that team must approve the stage scoped to them before the attachment activates.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
