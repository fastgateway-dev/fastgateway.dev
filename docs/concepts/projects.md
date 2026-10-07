---
sidebar_position: 2
title: Projects
description: Multi-cluster management through projects
---

# Projects

A project is a connection to a Kubernetes cluster where Envoy Gateway is installed. Each project contains:

- **Cluster connection**: Kubernetes API server endpoint and credentials
- **Domain templates**: Reusable Gateway configurations
- **Domains**: Active Gateway resources
- **Routes**: HTTPRoute and GRPCRoute configurations

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

| Role | Capabilities |
|------|--------------|
| Platform Admin | Create/delete projects, manage all settings |
| Project Admin | Manage domains, templates, and routes within project |
| Team Member | Submit routes for approval, view configurations |

Projects provide the foundation for organizing your API gateway infrastructure across multiple Kubernetes environments.
