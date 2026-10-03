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
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your-password"}'
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

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
| GET | `/api/v1/projects/:id` | Get project by ID |
| PUT | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |
| GET | `/api/v1/projects/:id/members` | List project members |
| POST | `/api/v1/projects/:id/members` | Add member to project |
| DELETE | `/api/v1/projects/:id/members/:userId` | Remove member from project |

## Domains Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:projectId/domains` | List all domains in project |
| POST | `/api/v1/projects/:projectId/domains` | Create a new domain |
| GET | `/api/v1/projects/:projectId/domains/:id` | Get domain by ID |
| PUT | `/api/v1/projects/:projectId/domains/:id` | Update domain |
| DELETE | `/api/v1/projects/:projectId/domains/:id` | Delete domain |

## Routes Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:projectId/domains/:domainId/routes` | List all routes in domain |
| POST | `/api/v1/projects/:projectId/domains/:domainId/routes` | Create a new route |
| GET | `/api/v1/projects/:projectId/domains/:domainId/routes/:id` | Get route by ID |
| PUT | `/api/v1/projects/:projectId/domains/:domainId/routes/:id` | Update route |
| DELETE | `/api/v1/projects/:projectId/domains/:domainId/routes/:id` | Delete route |
| POST | `/api/v1/projects/:projectId/domains/:domainId/routes/:id/deploy` | Deploy route to Kubernetes |

## Clients Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/:projectId/clients` | List all clients in project |
| POST | `/api/v1/projects/:projectId/clients` | Create a new client |
| GET | `/api/v1/projects/:projectId/clients/:id` | Get client by ID |
| PUT | `/api/v1/projects/:projectId/clients/:id` | Update client |
| DELETE | `/api/v1/projects/:projectId/clients/:id` | Delete client |
| POST | `/api/v1/clients/attach` | Create client attachment request |
| GET | `/api/v1/clients/:clientId/attachments` | List client attachments |

## Approvals Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/approvals` | List all pending approvals |
| GET | `/api/v1/approvals/:id` | Get approval by ID |
| POST | `/api/v1/approvals/:id/approve-team` | Approve as team member |
| POST | `/api/v1/approvals/:id/approve-approver` | Approve as designated approver |
| POST | `/api/v1/approvals/:id/reject` | Reject approval request |

## Users Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | List all users |
| POST | `/api/v1/users` | Create a new user |
| GET | `/api/v1/users/:id` | Get user by ID |
| PUT | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Delete user |

## Response Formats

### Success Response

```json
{
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
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
| `limit` | Items per page | 20 |
| `sort` | Sort field | `created_at` |
| `order` | Sort order (`asc` or `desc`) | `desc` |

Example:

```bash
curl -X GET "http://localhost:8080/api/v1/projects?page=1&limit=10&sort=name&order=asc" \
  -H "Authorization: Bearer <token>"
```
