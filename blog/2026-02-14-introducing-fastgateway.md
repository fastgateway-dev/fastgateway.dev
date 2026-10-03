---
slug: introducing-fastgateway
title: Introducing FastGateway
authors: [zufardhiyaulhaq]
tags: [announcement, release]
---

We're excited to announce FastGateway, a UI-driven platform for managing Kubernetes Gateway API resources.

<!-- truncate -->

## Why FastGateway?

Managing Kubernetes Gateway API resources traditionally requires writing YAML manifests. FastGateway provides a web-based interface for teams who need quick iterations, visual feedback, approval workflows, and multi-cluster management.

## Key Features

### Visual Route Management
Create and manage HTTPRoutes and GRPCRoutes through an intuitive UI without writing YAML.

### Approval Workflows
All route changes go through approval. Team members submit, approvers review, then routes are deployed.

### Multi-Cluster Support
Connect multiple Kubernetes clusters as projects and manage them from a single interface.

### Enterprise Security
Configure IP allowlisting, API key authentication, JWT validation, and OIDC integration.

## Getting Started

```bash
helm repo add fastgateway https://charts.fastgateway.dev/releases
helm install fastgateway fastgateway/fastgateway -n fastgateway-system --create-namespace
```

Check out our [documentation](/docs/getting-started/installation) to learn more.

## What's Next?

We're actively working on additional gateway controller support (Istio, Kong), enhanced observability, and more security features.

Stay tuned!
