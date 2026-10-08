---
sidebar_position: 6
description: Configure gateway-level settings including keepalive, connection limits, timeouts, HTTP/3, and TLS
---

# Domain Settings

FastGateway supports gateway-level domain settings for connection management and protocol configuration.

## TCP Keepalive

Configure TCP keepalive to detect dead connections:

```yaml
domainSettings:
  clientConnection:
    tcpKeepalive:
      probes: 3
      idleTime: "60s"
      interval: "10s"
```

| Setting | Description |
|---------|-------------|
| **probes** | Number of keepalive probes before closing |
| **idleTime** | Time before sending first keepalive probe |
| **interval** | Interval between keepalive probes |

## Connection Limits

Limit concurrent connections. `connectionLimit` is an object whose numeric field
is `maxConnections`; `bufferLimit` sits alongside it under `clientConnection`:

```yaml
domainSettings:
  clientConnection:
    connectionLimit:
      maxConnections: 10000
    bufferLimit: "32Ki"
```

## Timeouts

Configure request and idle timeouts under `timeout.http`:

```yaml
domainSettings:
  timeout:
    http:
      requestReceivedTimeout: "30s"
      idleTimeout: "300s"
```

| Setting | Description |
|---------|-------------|
| **requestReceivedTimeout** | Time to receive complete request headers |
| **idleTimeout** | Idle connection timeout |

## HTTP/3 Support

Enable HTTP/3 (QUIC):

```yaml
domainSettings:
  http3:
    enabled: true
```

## TLS Settings

Configure TLS options:

```yaml
domainSettings:
  tls:
    minVersion: "TLSv1.2"
    maxVersion: "TLSv1.3"
    ciphers:
      - "ECDHE-ECDSA-AES256-GCM-SHA384"
      - "ECDHE-RSA-AES256-GCM-SHA384"
    ecdhCurves:
      - "X25519"
      - "P-256"
```

TLS settings support `minVersion`, `maxVersion`, `ciphers`, `ecdhCurves`, and
`signatureAlgorithms`.

## Complete Example

```yaml
domainSettings:
  clientConnection:
    tcpKeepalive:
      probes: 3
      idleTime: "60s"
      interval: "10s"
    connectionLimit:
      maxConnections: 10000
  timeout:
    http:
      requestReceivedTimeout: "30s"
      idleTimeout: "300s"
  http3:
    enabled: true
  tls:
    minVersion: "TLSv1.2"
```

## Notes

- Domain settings apply at the gateway/listener level
- TCP keepalive helps with load balancer health checks
- Connection limits prevent resource exhaustion
- HTTP/3 requires TLS to be configured
