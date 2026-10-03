---
sidebar_position: 1
description: Configure path, header, method, query parameter, and gRPC routing rules
---

# Configure Routing

FastGateway supports various routing rules to direct traffic to backends.

## Path Matching

| Type | Description |
|------|-------------|
| **Exact** | Matches the exact path |
| **Prefix** | Matches paths starting with value |
| **Regex** | Matches paths using regular expressions |

## Header Matching

Match requests based on header values:

```yaml
matches:
  - headers:
      - name: "X-Version"
        value: "v2"
```

## Method Matching

Route based on HTTP methods:

```yaml
matches:
  - method: "POST"
```

## Query Parameter Matching

Match on query string parameters:

```yaml
matches:
  - queryParams:
      - name: "version"
        value: "beta"
```

## gRPC Routes

For gRPC traffic, use service and method matching:

```yaml
protocol: grpc
matches:
  - grpcService: "myapp.UserService"
    grpcMethod: "GetUser"
```

gRPC routes deploy as GRPCRoute CRD and support service-only matching (all methods) or service+method for specific endpoints.
