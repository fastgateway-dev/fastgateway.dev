---
sidebar_position: 7
description: Configure rate limiting to protect backends from excessive traffic
---

# Rate Limiting

Rate limiting protects backends from excessive traffic by limiting request rates per client or globally.

## Prerequisites

Rate limiting requires:
- **Redis**: Backend storage for rate limit counters
- **Envoy Gateway Rate Limit Service**: Deployed and configured

The route builder flags whether rate limiting is available for your project.

## Configure

In the route builder, open the **Traffic** tab and expand the **Backend Traffic Policy** section. Under **Rate Limiting**, turn on **Enable Rate Limiting**, then set **Requests** to the allowed count and **Per** to the time window, for example `100` requests per `Minute`.

## Units

| Unit | Description |
|------|-------------|
| **Second** | Requests per second |
| **Minute** | Requests per minute |
| **Hour** | Requests per hour |
| **Day** | Requests per day |

## Client Selectors

By default the limit applies to all matched traffic. To scope it, click **Show Client Selectors (Advanced)** and **Add Selector**. Multiple selectors are OR'd together.

| Selector | Description |
|----------|-------------|
| **Headers** | Match a header by **Name** and optional **Value**, with **Type** **Exact** or **Distinct** |
| **Source CIDR** | Match a client IP or CIDR range, with **Type** **Exact** or **Distinct** |
| **Path Match** | Match a request path, with **Type** **Exact**, **PathPrefix**, or **RegularExpression** |
| **HTTP Methods** | Match one or more methods, for example `GET, POST, PUT` |

Use **Distinct** to apply a separate limit to each unique value, for example a per-API-key limit via a **Distinct** header selector on `X-API-Key`.

## Rate Limit Response

When limits are exceeded, clients receive:
- **Status Code**: 429 Too Many Requests
- **Headers**: Rate limit information

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
