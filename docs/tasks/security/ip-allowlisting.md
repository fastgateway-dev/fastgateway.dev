---
sidebar_position: 2
description: Configure IP-based access control using allowlisting
---

# IP Allowlisting

FastGateway supports IP-based access control in two modes: General and Client. You pick the mode with the **Security Mode** toggle at the top of the route builder's **Security** tab.

## General Mode

In **General (Recommended)** mode, IP rules are defined directly on the route and apply to all traffic.

1. In the route builder, open the **Security** tab and keep **General** mode.
2. Expand **IP Allowlisting** and check **Enable IP Allowlisting**.
3. Under **Allowed CIDRs**, type a CIDR range and click **Add**. Repeat for each range.
4. Submit the route for approval. Once approved, the change deploys.

Requests from any address outside the allowlist receive `403 Forbidden`.

## Client Mode

In **Client-Based** mode, each client has its own IP allowlist. You attach clients to the route and traffic is validated against the CIDR entries configured on each client. A client's IPs are managed as individual CIDR entries on the client (see [Client Management](./client-management)) rather than entered on the route. Route-level IP allowlisting is not used in client mode.

## CIDR Notation

| Format | Description |
|--------|-------------|
| `10.0.0.1/32` | Single IP address |
| `10.0.0.0/24` | 256 addresses (10.0.0.0 - 10.0.0.255) |
| `10.0.0.0/16` | 65,536 addresses |
| `10.0.0.0/8` | 16 million addresses |

## Mode Selection

- Use **General mode** for simple, route-wide IP restrictions.
- Use **Client mode** when different clients need different IP allowlists.
- General and Client modes are mutually exclusive on a route.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
