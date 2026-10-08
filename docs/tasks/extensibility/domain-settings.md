---
sidebar_position: 6
description: Configure domain-level settings including keepalive, connection limits, timeouts, HTTP/3, and TLS
---

# Domain Settings

Domain settings apply to every route on a domain. They are not part of the route
builder. Open a domain, then open its **Settings** tab. You configure everything
in the UI, with no YAML to write.

The Settings tab groups options under **Client Settings**. Expand the sections
below to configure them.

## Client Connection

### TCP Keepalive

Check **TCP Keepalive** to detect dead connections, then set:

| Field | Description |
|-------|-------------|
| **Probes** | Number of keepalive probes before the connection is dropped |
| **Idle Time** | Time a connection must be idle before probes begin (for example `60s`) |
| **Interval** | Time between probes (for example `10s`) |

### PROXY Protocol

Check **PROXY Protocol** to preserve the original client IP when an upstream load
balancer sends PROXY protocol headers. Only enable this if your load balancer
actually sends them.

### Connection Limits

Limit concurrent connections and buffering:

| Field | Description |
|-------|-------------|
| **Max Connections** | Maximum concurrent connections |
| **Close Delay** | Grace period before closing rejected connections |
| **Max Connection Duration** | Maximum time a connection can stay open |
| **Max Requests/Connection** | Maximum requests per connection |
| **Buffer Limit** | Maximum buffer size per connection (for example `32Ki`, `1Mi`) |

## Client IP Detection

Set **Detection Method** to control how the real client IP is found when behind
load balancers or CDNs:

- **None** uses the L4 source IP.
- **X-Forwarded-For header** reads the IP from `X-Forwarded-For`. Set **Number of
  Trusted Hops** (1 to 10) to match how many proxies sit in front of the gateway.
- **Custom header** reads the IP from a header you name (for example
  `CF-Connecting-IP`). Optionally check **Fail closed** to reject requests when
  the header is missing.

## Client Timeout

| Field | Description |
|-------|-------------|
| **Request Received Timeout** | Time to receive complete request headers (for example `30s`) |
| **HTTP Idle Timeout** | Idle connection timeout (for example `60s`) |

## Protocol

Check **Enable HTTP/3 (QUIC)** to turn on HTTP/3. This requires UDP listeners and
QUIC-capable clients, and TLS must be configured.

## TLS Settings

Pick a **Security Profile**:

- **Modern**: TLS 1.3 only.
- **Intermediate (Recommended)**: TLS 1.2 and up with a strong cipher set.
- **Compatible**: TLS 1.0 and up for legacy clients (weaker security).
- **Custom**: set the values yourself.

With **Custom**, you set **Min TLS Version**, **Max TLS Version**, and
**Cipher Suites** (comma-separated).

| TLS Version | Notes |
|-------------|-------|
| **TLS 1.3** | Strongest, used by the Modern profile |
| **TLS 1.2** | Recommended minimum |
| **TLS 1.1** | Deprecated |
| **TLS 1.0** | Deprecated, legacy only |

## Mutual TLS (Client Certificates)

Toggle **Enable mTLS** to require client certificates. When enabled you set:

- **Certificate Validation Mode**: **Optional** (clients may present a certificate)
  or **Required** (all clients must present a valid certificate).
- **CA Certificates**: add the CA certificates used to verify client certificates.
- Optional SAN and certificate hash whitelists to restrict which client
  certificates are accepted.

After saving, changes go through the approval workflow and are then deployed.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
