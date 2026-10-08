---
sidebar_position: 3
description: Configure HTTP redirects with path, scheme, and host modifications
---

# Redirect

FastGateway can return an HTTP redirect so clients are sent to a different URL
without any backend processing. You configure this in the route builder, with no
YAML to write.

## Where to configure

In the route builder, open the **Traffic** tab. Under **Route Type & Backend**,
set **Route Type** to **HTTP Redirect**. A **Redirect Configuration** section
appears with these fields:

- **Scheme** sets the target scheme: **No change**, **HTTPS**, or **HTTP**. Use
  HTTPS to force an HTTP-to-HTTPS redirect.
- **Status Code** selects the redirect code (see below).
- **Hostname** sets the target host. Leave empty to keep the original hostname.
- **Port** sets the target port. Leave empty to use the default port for the scheme.
- **Rewrite Path** (optional) replaces the path. Choose **Replace Prefix Match**
  with a new prefix, or **Replace Full Path** with a new full path.

A live preview shows the resulting redirect URL. Save the route when done.

## Status Codes

Only 301 and 302 are available. The dropdown starts on 301.

| Code | Label | Description |
|------|-------|-------------|
| **301** | Permanent Redirect | Cacheable, permanent move |
| **302** | Temporary Redirect | Not cached, temporary move |

## Use Cases

- HTTP to HTTPS migration
- Domain consolidation
- API version deprecation
- URL shortening

After saving, the change goes through the approval workflow and is then deployed.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
