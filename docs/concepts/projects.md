---
sidebar_position: 2
title: Projects
description: Multi-cluster management through projects
---

# Projects

A project is a connection to a Kubernetes cluster where Envoy Gateway is installed. Each project contains:

- **Cluster connection**: Kubernetes API server endpoint and credentials
- **Gateway templates**: Reusable Gateway configuration profiles for domains and streams
- **Domains**: Hostname-keyed Gateway resources for HTTP and gRPC
- **Streams**: Port-keyed Gateway resources for TCP and UDP
- **Routes**: HTTPRoute, GRPCRoute, TCPRoute, and UDPRoute configurations

![The Projects list in FastGateway, showing a connected Kubernetes cluster with its domain and route counts](/img/ui-projects.jpg)

## Multi-Cluster Management

You can manage multiple Kubernetes clusters simultaneously:

| Use Case | Example |
|----------|---------|
| Environment separation | Development, staging, production clusters |
| Regional deployment | US-East, EU-West, APAC clusters |
| Team isolation | Platform team, application team clusters |

## Security

Project credentials are stored securely:

- Kubernetes tokens are encrypted at rest in PostgreSQL
- Tokens are never exposed through the API
- Connection validation before saving

## Project Administration

Access is controlled at two levels.

**System roles** apply globally:

| Role | Capabilities |
|------|--------------|
| `owner` | Full access across all projects and system settings |
| `user` | Access governed by team assignments and project-admin grants |

**Project-level access** is granted by assigning teams to a project with one or more permission presets, which map to 24 granular permissions:

| Preset | Capabilities |
|--------|--------------|
| Viewer | Read-only access to routes, clients, and domains |
| Editor | Create and edit routes, clients, and domains |
| Approver | Review and approve routes and client attachments |
| Admin | Full project permissions |

Users can also be given explicit **project-admin** assignments for direct administrative access to a specific project.

Projects provide the foundation for organizing your API gateway infrastructure across multiple Kubernetes environments.
