---
sidebar_position: 4
description: Common issues and solutions for FastGateway deployment and operation
---

# Troubleshooting

This guide covers common issues you may encounter when setting up and using FastGateway.

## Connection Issues

### "Connection refused" to Backend API

**Symptoms:**
- Frontend shows network errors
- `curl` to backend returns "Connection refused"

**Solutions:**

1. **Docker networking issue** - When running frontend and backend in separate containers:

   ```bash
   # Instead of localhost, use host.docker.internal on macOS/Windows
   NEXT_PUBLIC_API_URL=http://host.docker.internal:8081
   ```

2. **Backend not running** - Check if the backend container is running:

   ```bash
   docker ps | grep fastgateway-backend
   ```

3. **Port conflict** - Verify the port is not already in use:

   ```bash
   lsof -i :8081
   ```

4. **Firewall blocking** - Check firewall rules:

   ```bash
   # macOS
   sudo pfctl -s rules | grep 8081

   # Linux
   sudo iptables -L -n | grep 8081
   ```

### Database Connection Failed

**Symptoms:**
- Backend fails to start
- Logs show "connection refused" to PostgreSQL

**Solutions:**

1. **PostgreSQL not running:**

   ```bash
   # Check PostgreSQL status
   docker ps | grep postgres

   # Start PostgreSQL if using Docker Compose
   docker-compose up -d postgres
   ```

2. **Incorrect database settings** - The connection string is built from discrete variables. Verify they point at your PostgreSQL instance:

   ```bash
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=fastgateway
   DATABASE_PASSWORD=fastgateway
   DATABASE_NAME=fastgateway
   DATABASE_SSLMODE=disable
   ```

3. **Database does not exist:**

   ```bash
   # Connect to PostgreSQL and create database
   psql -h localhost -U postgres
   CREATE DATABASE fastgateway;
   ```

## Authentication Issues

### "Unauthorized" Error (401)

**Symptoms:**
- API returns 401 status code
- Frontend redirects to login page unexpectedly

**Solutions:**

1. **Token expired** - JWT tokens expire after a set period. Re-login to get a new token:

   ```bash
   curl -X POST http://localhost:8081/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "your-password"}'
   ```

2. **Invalid JWT_SECRET** - If the JWT_SECRET was changed, all existing tokens become invalid. Users must re-login.

3. **Token not included** - Ensure the Authorization header is set:

   ```bash
   curl -H "Authorization: Bearer <your-token>" http://localhost:8081/api/v1/projects
   ```

### UI Login Issues

**Symptoms:**
- Cannot login through the web interface
- Login form shows error messages

**Solutions:**

1. **CORS not configured** - Add frontend URL to allowed origins:

   ```bash
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```

2. **Wrong credentials** - The default admin is seeded automatically from the `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_EMAIL` environment variables when the server first starts (via `SeedDefaultAdmin`), using the defaults `admin` / `admin123` / `admin@fastgateway.local` when unset. Database migrations run automatically on startup, so there is no separate migrate step for this.

   Seeding only happens when the admin user does not yet exist. If the admin was already created, changing `ADMIN_PASSWORD` has no effect — change the password through the application instead:

   ```bash
   # While logged in, change your own password via the API
   curl -X PUT http://localhost:8081/api/v1/auth/password \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"currentPassword": "old-password", "newPassword": "new-password"}'
   ```

   An Owner can also update another user's password via `PATCH /api/v1/users/{userId}`. (The standalone migration CLI lives at `cmd/migrate` and only runs `up`/`down` — it does not manage admin credentials.)

3. **Browser cache** - Clear browser cookies and local storage, then try again.

## Kubernetes Issues

### "Envoy Gateway not found"

**Symptoms:**
- Route deployment fails
- Error mentions missing Gateway or GatewayClass

**Solutions:**

1. **Install Envoy Gateway:**

   ```bash
   # Install using Helm (FastGateway targets Envoy Gateway v1.8, which ships the
   # newer CRDs FastGateway relies on, e.g. Backend and EnvoyExtensionPolicy)
   helm install eg oci://docker.io/envoyproxy/gateway-helm \
     --version v1.8.4 \
     -n envoy-gateway-system \
     --create-namespace
   ```

2. **Verify installation:**

   ```bash
   kubectl get gatewayclass
   kubectl get gateway -A
   ```

3. **Check Envoy Gateway pods:**

   ```bash
   kubectl get pods -n envoy-gateway-system
   ```

### Routes Not Working

**Symptoms:**
- Routes deployed successfully but traffic not routing
- 404 errors when accessing the route

**Solutions:**

1. **Check Gateway status:**

   ```bash
   kubectl get gateway -A
   kubectl describe gateway <gateway-name> -n <namespace>
   ```

2. **Check HTTPRoute status:**

   ```bash
   kubectl get httproute -A
   kubectl describe httproute <route-name> -n <namespace>
   ```

3. **Verify parentRefs** - HTTPRoute must reference an existing Gateway:

   ```bash
   kubectl get httproute <route-name> -n <namespace> -o yaml | grep -A5 parentRefs
   ```

4. **Check backend service:**

   ```bash
   # Verify the backend service exists and has endpoints
   kubectl get svc <service-name> -n <namespace>
   kubectl get endpoints <service-name> -n <namespace>
   ```

5. **Check SecurityPolicy** - If authentication is configured, verify the policy:

   ```bash
   kubectl get securitypolicy -A
   kubectl describe securitypolicy <policy-name> -n <namespace>
   ```

### RBAC Permission Denied

**Symptoms:**
- "Forbidden" errors when deploying routes
- Backend logs show authorization errors

**Solutions:**

1. **Verify ServiceAccount:**

   ```bash
   kubectl get serviceaccount fastgateway -n fastgateway
   ```

2. **Check ClusterRoleBinding:**

   ```bash
   kubectl get clusterrolebinding fastgateway
   kubectl describe clusterrolebinding fastgateway
   ```

3. **Test permissions:**

   ```bash
   kubectl auth can-i create httproutes.gateway.networking.k8s.io \
     --as=system:serviceaccount:fastgateway:fastgateway
   ```

4. **Reapply RBAC** - See [RBAC Configuration](./rbac-configuration.md) for the complete manifest.

## Frontend Issues

### Blank Page or JavaScript Errors

**Symptoms:**
- White screen in browser
- Console shows JavaScript errors

**Solutions:**

1. **Check NEXT_PUBLIC_API_URL:**

   ```bash
   # Must be set at build time for Next.js
   NEXT_PUBLIC_API_URL=http://localhost:8081 npm run build
   ```

2. **Clear build cache:**

   ```bash
   rm -rf .next
   npm run build
   ```

3. **Check browser console** - Press F12 and look at the Console tab for errors.

### API Requests Failing in Production

**Symptoms:**
- Works in development, fails in production
- Mixed content or CORS errors

**Solutions:**

1. **Use HTTPS in production:**

   ```bash
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

2. **Configure CORS properly:**

   ```bash
   CORS_ALLOWED_ORIGINS=https://app.example.com
   ```

## Debugging Tips

### Enable Debug Logging

Backend:

```bash
LOG_LEVEL=debug ./backend
```

### View Container Logs

```bash
# Backend logs
docker logs fastgateway-backend -f

# Frontend logs
docker logs fastgateway-frontend -f
```

### Check Kubernetes Events

```bash
kubectl get events -n <namespace> --sort-by='.lastTimestamp'
```

### Test API Connectivity

```bash
# Test backend health
curl http://localhost:8081/health

# Test with authentication
curl -H "Authorization: Bearer <token>" http://localhost:8081/api/v1/projects
```

## Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/fastgateway/fastgateway/issues) for similar problems
2. Search the documentation for relevant configuration
3. Open a new issue with:
   - FastGateway version
   - Kubernetes version
   - Envoy Gateway version
   - Error messages and logs
   - Steps to reproduce
