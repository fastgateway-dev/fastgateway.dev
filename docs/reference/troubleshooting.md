---
sidebar_position: 3
description: Common issues and solutions for running FastGateway on Kubernetes
---

# Troubleshooting

Common issues when running FastGateway on Kubernetes.

## Deployment

### Backend pod won't start

Symptoms: the FastGateway backend pod is `CrashLoopBackOff` or never becomes Ready.

1. Check the logs:

   ```bash
   kubectl logs -n fastgateway deploy/fastgateway-backend
   ```

2. Database unreachable. The backend builds its PostgreSQL connection from the `DATABASE_*` settings in its Helm values (or secret). Confirm the database is reachable from the cluster and the credentials are correct. Migrations run automatically on startup, so no separate migrate step is needed.

3. First-run admin. The default admin is seeded on first startup from `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_EMAIL` (defaults `admin` / `admin123` / `admin@fastgateway.local`). Seeding only happens when the admin does not yet exist.

## Authentication

### "Unauthorized" (401)

1. Token expired. Sign in again to get a new token.
2. JWT secret changed. Rotating the JWT secret invalidates all existing tokens, so everyone must re-login.
3. Missing header. API requests need an `Authorization: Bearer <token>` header.

### Can't change the admin password

The admin is seeded once from the `ADMIN_*` settings, so changing `ADMIN_PASSWORD` afterward has no effect. Change it in the application instead: from the UI, or via `PUT /api/v1/auth/password` with `currentPassword` and `newPassword`. An Owner can reset another user with `PATCH /api/v1/users/{userId}`.

## Kubernetes

### "Envoy Gateway not found"

Route deployment fails with a missing Gateway or GatewayClass.

1. Install Envoy Gateway. FastGateway targets Envoy Gateway v1.8, which ships the CRDs it relies on (e.g. `Backend` and `EnvoyExtensionPolicy`):

   ```bash
   helm install eg oci://docker.io/envoyproxy/gateway-helm \
     --version v1.8.4 \
     -n envoy-gateway-system \
     --create-namespace
   ```

2. Verify the install:

   ```bash
   kubectl get gatewayclass
   kubectl get gateway -A
   kubectl get pods -n envoy-gateway-system
   ```

### Routes not working

A route shows as deployed but traffic returns 404.

1. Check the Gateway and HTTPRoute:

   ```bash
   kubectl get gateway -A
   kubectl get httproute -A
   kubectl describe httproute <route-name> -n <namespace>
   ```

2. Confirm the backend service has endpoints:

   ```bash
   kubectl get endpoints <service-name> -n <namespace>
   ```

3. If the route has authentication, check its SecurityPolicy:

   ```bash
   kubectl get securitypolicy -A
   ```

### "Forbidden" / RBAC denied

Deploying routes fails with authorization errors.

1. Check the ServiceAccount and ClusterRoleBinding:

   ```bash
   kubectl get serviceaccount fastgateway -n fastgateway
   kubectl get clusterrolebinding fastgateway
   ```

2. Test a specific permission:

   ```bash
   kubectl auth can-i create httproutes.gateway.networking.k8s.io \
     --as=system:serviceaccount:fastgateway:fastgateway
   ```

3. Reapply the ClusterRole. See [RBAC Configuration](./rbac-configuration.md) for the complete manifest.

## Debugging

```bash
# Backend logs
kubectl logs -n fastgateway deploy/fastgateway-backend -f

# Cluster events in a namespace
kubectl get events -n <namespace> --sort-by='.lastTimestamp'

# Health check (via port-forward)
kubectl port-forward -n fastgateway deploy/fastgateway-backend 8081:8081
curl http://localhost:8081/health
```

For more detail, set `LOG_LEVEL=debug` on the backend deployment.

## Getting help

If you're still stuck:

1. Check [GitHub Issues](https://github.com/fastgateway-dev/fastgateway/issues) for similar problems.
2. Open a new issue with your FastGateway version, Kubernetes version, Envoy Gateway version, the error messages and logs, and steps to reproduce.
