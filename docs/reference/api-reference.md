---
sidebar_position: 1
description: Complete REST API documentation for FastGateway backend services
---

# API Reference

This document provides comprehensive documentation for the FastGateway REST API endpoints.

## Authentication

All API endpoints (except `/api/v1/auth/login`) require authentication using JWT Bearer tokens.

### Request Header

```
Authorization: Bearer <your-jwt-token>
```

### Obtaining a Token

```bash
curl -X POST http://localhost:8081/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your-password"}'
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-01-01T00:00:00Z",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com",
    "role": "owner"
  }
}
```

System roles are `owner` and `user`. Use the `accessToken` as the Bearer token; the `refreshToken` can be exchanged for a new access token via `POST /api/v1/auth/refresh`.

## Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Authenticate user and get JWT token |
| POST | `/api/v1/auth/logout` | Invalidate current session |
| GET | `/api/v1/auth/me` | Get current user profile |
| PUT | `/api/v1/auth/password` | Change current user password |

## Projects Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | List all projects |
| POST | `/api/v1/projects` | Create a new project |
| GET | `/api/v1/projects/:projectId` | Get project by ID |
| PATCH | `/api/v1/projects/:projectId` | Update project |
| DELETE | `/api/v1/projects/:projectId` | Delete project |
| GET | `/api/v1/projects/:projectId/members` | List project members (unique users across the project's assigned teams) |
| GET | `/api/v1/projects/:projectId/teams` | List teams assigned to the project |
| POST | `/api/v1/projects/:projectId/teams` | Assign a team to the project |
| DELETE | `/api/v1/projects/:projectId/teams/:teamId` | Remove a team from the project |
| GET | `/api/v1/projects/:projectId/admins` | List project admins |
| POST | `/api/v1/projects/:projectId/admins` | Add a project admin |
| DELETE | `/api/v1/projects/:projectId/admins/:userId` | Remove a project admin |

Project access is not granted by adding individual members. Instead, assign a team to the project (members of that team inherit access) or add a user as a project admin.

## Domains Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:projectId/domains` | List all domains in project |
| POST | `/api/v1/projects/:projectId/domains` | Create a new domain |
| GET | `/api/v1/projects/:projectId/domains/:domainId` | Get domain by ID |
| PATCH | `/api/v1/projects/:projectId/domains/:domainId` | Update domain |
| DELETE | `/api/v1/projects/:projectId/domains/:domainId` | Delete domain |

## Routes Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:projectId/domains/:domainId/routes` | List all routes in domain |
| POST | `/api/v1/projects/:projectId/domains/:domainId/routes` | Create a new route |
| GET | `/api/v1/projects/:projectId/domains/:domainId/routes/:routeId` | Get route by ID |
| PUT | `/api/v1/projects/:projectId/domains/:domainId/routes/:routeId` | Update route |
| DELETE | `/api/v1/projects/:projectId/domains/:domainId/routes/:routeId` | Delete route |
| POST | `/api/v1/projects/:projectId/domains/:domainId/routes/:routeId/deploy` | Deploy route to Kubernetes |

## Clients Endpoints

Clients are global resources (not scoped to a project).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/clients` | List all clients |
| POST | `/api/v1/clients` | Create a new client |
| GET | `/api/v1/clients/:clientId` | Get client by ID |
| PATCH | `/api/v1/clients/:clientId` | Update client |
| DELETE | `/api/v1/clients/:clientId` | Delete client |
| GET | `/api/v1/clients/:clientId/routes` | List routes attached to the client |
| POST | `/api/v1/clients/:clientId/routes/attach` | Attach the client to a route |

## Approvals Endpoints

Approvals are project-scoped and multi-stage. Each approval progresses through one or more stages, and callers approve or reject a specific stage.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:projectId/approvals` | List approvals in the project |
| GET | `/api/v1/projects/:projectId/approvals/:approvalId` | Get approval by ID |
| POST | `/api/v1/projects/:projectId/approvals/:approvalId/stages/:stageId/approve` | Approve a specific stage |
| POST | `/api/v1/projects/:projectId/approvals/:approvalId/stages/:stageId/reject` | Reject a specific stage |

## Users Endpoints (Owner Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | List all users |
| POST | `/api/v1/users` | Create a new user |
| GET | `/api/v1/users/:userId` | Get user by ID |
| PATCH | `/api/v1/users/:userId` | Update user |
| DELETE | `/api/v1/users/:userId` | Delete user |

## Response Formats

### Success Response

Handlers return the requested object directly (or an array for list endpoints) — there is no wrapper envelope. For example, fetching a single project returns the project object itself:

```json
{
  "id": "uuid",
  "name": "my-project",
  "connectionType": "api_token"
}
```

### Error Response

Errors returned by the API handlers use a simple shape:

```json
{
  "error": "Error message"
}
```

The OpenAPI specification documents the error body as an `Error` schema with `code` and `message` fields:

```json
{
  "code": "ERROR_CODE",
  "message": "Error message"
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

## Pagination

List endpoints support pagination with query parameters:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `page` | Page number (1-based) | 1 |
| `limit` | Items per page (minimum 1, maximum 100) | 20 |

Example:

```bash
curl -X GET "http://localhost:8081/api/v1/projects?page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```
