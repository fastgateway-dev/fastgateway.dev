---
sidebar_position: 4
description: Return static responses without backend forwarding for health checks and maintenance pages
---

# Direct Response

FastGateway can return a static response directly, without forwarding to any
backend. You configure this in the route builder, with no YAML to write.

## Where to configure

In the route builder, open the **Traffic** tab. Under **Route Type & Backend**,
set **Route Type** to **Direct Response**. A **Direct Response Configuration**
section appears with these fields:

- **Status Code** (required): the HTTP status to return, from 100 to 599.
- **Content Type**: the `Content-Type` header to send. Choose from `text/plain`,
  `text/html`, `application/json`, or `application/xml`.
- **Response Body** (optional): the inline body text. The builder shows a live
  byte count. The body cannot exceed 4096 bytes.

Save the route when done.

## Common Status Codes

| Scenario | Status Code |
|----------|-------------|
| Health checks | 200 |
| Readiness probes | 200 |
| Maintenance mode | 503 |
| Blocked paths | 403 |
| Not found pages | 404 |

To target a specific path (for example `/health` or `/admin`), set the route's
path match on the **Matching** step, then use Direct Response on the Traffic tab.

## Notes

- No backend is contacted when Direct Response is used.
- The `Content-Type` header is set directly from the Content Type field.
- The inline body is limited to 4096 bytes.
- Useful for synthetic endpoints that do not need backend logic.

After saving, the change goes through the approval workflow and is then deployed.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
