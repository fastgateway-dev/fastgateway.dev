---
sidebar_position: 8
title: Approval Workflow
description: Unified multi-stage approval process for routes and client attachments
---

# Approval Workflow

FastGateway implements a **unified multi-stage approval system** for all change requests. Both route changes and client attachments go through the same approval pipeline with configurable stages.

## Unified Approval Flow

```mermaid
flowchart TD
    E["<b>Entity Change</b><br/>Route create / update / delete<br/>Client attachment attach / detach"]
    E --> S1["<b>Stage 1</b><br/>Approval"]
    S1 -->|approve| S2["<b>Stage 2</b><br/>Approval"]
    S2 -->|approve| SN["<b>Stage N</b><br/>Approval"]
    S1 -->|reject| RJ["REJECTED"]
    S2 -->|reject| RJ
    SN -->|reject| RJ
    SN -->|all approved| AP["<b>APPROVED</b>"]
    AP --> DP["<b>Deploy</b><br/>Routes only"]
    DP --> AC["<b>ACTIVE</b>"]

    classDef stage fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    classDef bad fill:#fef2f2,stroke:#ef4444,stroke-width:1.5px,color:#7f1d1d;
    classDef good fill:#f0fdf4,stroke:#16a34a,stroke-width:1.5px,color:#14532d;
    classDef plain fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px,color:#334155;
    class E plain;
    class S1,S2,SN stage;
    class RJ bad;
    class AP,AC good;
    class DP plain;
```

## Approval Entities

The unified system handles two entity types:

| Entity Type | Actions | Default Stages |
|-------------|---------|----------------|
| **Route** | create, update, delete | 1 stage: `route.approve` permission |
| **Client Attachment** | attach, detach | 2 stages: cross-team approval |

## Route Statuses

| Status | Description |
|--------|-------------|
| `pending_create` | New route submitted, awaiting approval |
| `pending_update` | Route update submitted, awaiting approval |
| `pending_delete` | Route deletion submitted, awaiting approval |
| `approved` | All approval stages passed, ready for deployment |
| `pending_deploy` | Approved and awaiting deployment to Kubernetes |
| `active` | Deployed and running in Kubernetes |
| `rejected` | Approval denied with reason |

## Attachment Statuses

| Status | Description |
|--------|-------------|
| `pending_attach` | New attachment submitted, awaiting approval |
| `pending_detach` | Detachment requested, awaiting approval |
| `approved` | All approval stages passed |
| `active` | Attachment is live (route deployed with this client) |
| `rejected` | Approval denied |
| `removed` | Attachment has been detached |

## Approval Stages

Each approval consists of one or more **stages** that must be completed sequentially:

```mermaid
flowchart LR
    S1["<b>Stage 1</b><br/>required_perm: route.approve<br/>team_scope: any"]
    S2["<b>Stage 2</b><br/>required_perm: client.approve<br/>team_scope: other_team"]
    SN["<b>Stage N</b><br/>…"]
    S1 --> S2 --> SN

    classDef stage fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e293b;
    classDef plain fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px,color:#334155;
    class S1,S2 stage;
    class SN plain;
```

### Stage Configuration

Each stage has:

| Field | Description |
|-------|-------------|
| `order` | Sequential order (1, 2, 3...) |
| `required_permission` | Permission needed to approve (e.g., `route.approve`) |
| `team_scope` | Which team(s) can approve |

### Team Scope Values

| Scope | Description |
|-------|-------------|
| `any` | Any user with the required permission in the project |
| `other_team` | User must be from a different team than the submitter |
| `submitter_team` | User must be from the submitter's team |

## Default Approval Policies

When a project is created, these default policies are seeded:

### Route approvals (single stage)

Route changes need one approval from any user with the `route.approve` permission (team scope `any`).

### Client attachment approvals (two stages)

Client attachments need two sequential approvals:

1. A member from a different team than the submitter approves (team scope `other_team`), for cross-team validation.
2. Any user with `client.approve` finalizes the request (team scope `any`).

## Approval Rules

### Submitter Constraint

**Users cannot approve their own submissions**, even if they have the required permission. This ensures separation of duties.

### Sequential Approval

Stages must be approved in order. Stage N cannot be approved until all stages 1 through N-1 are approved.

### Rejection Behavior

- **Any rejection fails the entire approval** — the overall status becomes `rejected`
- Remaining pending stages stay as-is (not auto-rejected)
- A rejected request must be re-submitted as a new request

### Owner Bypass

System owners (role: `owner`) can approve any stage regardless of team restrictions, but still cannot self-approve.

## Permission Matrix

| Action | Viewer | Editor | Approver | Admin | Owner |
|--------|--------|--------|----------|-------|-------|
| Submit route change | - | ✓ | - | ✓ | ✓ |
| Approve route (others') | - | - | ✓ | ✓ | ✓ |
| Approve own route | - | - | - | - | - |
| Deploy approved route | - | ✓ | ✓ | ✓ | ✓ |
| Submit attachment | - | ✓ | - | ✓ | ✓ |
| Approve attachment (others') | - | - | ✓ | ✓ | ✓ |
| Approve own attachment | - | - | - | - | - |

## API Endpoints

### List Approvals

```
GET /api/v1/projects/:projectId/approvals?status=pending&entityType=route
```

Filters:
- `status`: `pending`, `approved`, `rejected`
- `entityType`: `route`, `client_attachment`

### Approve a Stage

```
POST /api/v1/projects/:projectId/approvals/:approvalId/stages/:stageId/approve
```

### Reject a Stage

```
POST /api/v1/projects/:projectId/approvals/:approvalId/stages/:stageId/reject
Body: { "comment": "Reason for rejection" }
```

## Benefits

- **Unified workflow**: Single approval system for all entity types
- **Configurable stages**: Projects can customize approval requirements
- **Cross-team validation**: Client attachments require multi-team approval
- **Audit trail**: Full history of submissions, approvals, and rejections
- **Separation of duties**: Submitters cannot self-approve
- **Permission-based**: Fine-grained control over who can approve what
