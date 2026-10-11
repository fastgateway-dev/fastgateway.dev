---
sidebar_position: 8
description: Expose a TCP or UDP service by creating a stream and an L4 route
---

# Create a TCP/UDP Route

TCP and UDP services are exposed through [streams](../../concepts/streams.md), not domains. A stream is a port-keyed Gateway, and an L4 route maps one of its listener ports to in-cluster Kubernetes Service backends. This page walks through exposing a TCP or UDP service end to end.

## 1. Create a Stream

Open the project's **Streams** section and click **Create New Stream**.

| Field | Description |
|-------|-------------|
| Gateway Template | A template with the Stream capability enabled. Supplies the GatewayClass and EnvoyProxy. Immutable after creation |
| Name | Lowercase DNS-label name, for example `postgres` |
| Deployment Namespace | Kubernetes namespace for the stream's Gateway and route resources |

If no stream-enabled Gateway Template is listed, enable the Stream capability on a Gateway Template first.

On create, FastGateway provisions the stream's Gateway and a load balancer address. The address appears on the stream detail page before you add any route.

## 2. Add an L4 Route

On the stream detail page, click **Add L4 Route**.

1. Set a **Name**, pick an **Owner Team**, and choose the **Protocol**, TCP or UDP.
2. Enter the **Listener Port**, the port the load balancer exposes this route on. A port can be used once per protocol, so `tcp:53` and `udp:53` can coexist but two `tcp:5432` routes cannot. The form checks for a collision live as you type, and the backend rejects a conflicting port on submit.
3. Add one or more **Backends**. Each backend is an in-cluster Kubernetes Service, set by namespace, service, and port. Add a **Weight** (0 to 100) to split traffic across multiple backends.

Protocol, name, and owner team are fixed once the route is created. Listener port and backends remain editable.

## 3. Set the Backend Traffic Policy (optional)

The **Advanced** section offers the Layer-4 policy subset that applies to the chosen protocol.

| Policy | TCP | UDP |
|--------|-----|-----|
| Load balancing (RoundRobin, Random, LeastRequest) | Yes | Yes |
| Circuit breaker (max connections, max requests per connection) | Yes | No |
| Active TCP health check (interval, timeout, thresholds) | Yes | No |

UDP routes support load balancing only.

## 4. Submit, Approve, Deploy

L4 routes follow the same [approval workflow](../../concepts/approval-workflow.md) as HTTP routes. Submit the route, have it approved, then deploy it. Once deployed, the route is active and clients connect to the stream's load balancer address on the listener port.

## Limits

L4 routing is for non-HTTP services and leaves out Layer-7 features:

- Backends are in-cluster Kubernetes Services only. External FQDN or IP backends are not supported.
- No TLS termination and no TLS passthrough.
- No path, header, method, or query matching, filters, redirects, rewrites, CORS, WAF, rate limiting, or retries.

See [Streams](../../concepts/streams.md) for the full model and [Routes](../../concepts/routes.md) for how L4 routes relate to HTTP and gRPC routes.
