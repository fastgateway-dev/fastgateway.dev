---
sidebar_position: 5
title: Routes
description: Traffic routing rules and backend configuration
---

# Routes

Routes define how traffic flows from domains to backend services, supporting both HTTP and gRPC protocols through Kubernetes Gateway API resources.

## Route Types

| Type | Resource | Use Case |
|------|----------|----------|
| HTTP | HTTPRoute | REST APIs, web applications |
| gRPC | GRPCRoute | gRPC services |

## Matching Rules

Routes match incoming requests using:

| Match Type | HTTP | gRPC |
|------------|------|------|
| Path | `/api/v1/*` | N/A |
| Method | `GET`, `POST` | N/A |
| Headers | `X-Version: v2` | `X-Version: v2` |
| Query Parameters | `?debug=true` | N/A |
| Service/Method | N/A | `myservice/MyMethod` |

## Backend Configuration

Each route specifies one or more backends:

```yaml
backends:
  - name: api-service
    namespace: production
    port: 8080
    weight: 100
```

## Approval Workflow

Routes follow a controlled deployment process:

```mermaid
flowchart LR
    A["Submit"] --> B["Approve"] --> C["Deploy"]

    classDef step fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    class A,B,C step;
```

| Status | Description |
|--------|-------------|
| Pending | Awaiting approval |
| Approved | Ready for deployment |
| Deployed | Active in Kubernetes |
| Rejected | Approval denied |

## Traffic Features

Routes support advanced traffic management:

- **Timeouts**: Request and backend timeouts
- **Retries**: Automatic retry with backoff
- **Rate Limiting**: Request throttling
- **Circuit Breaker**: Failure protection
