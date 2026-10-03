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
   NEXT_PUBLIC_API_URL=http://host.docker.internal:8080
   ```

2. **Backend not running** - Check if the backend container is running:

   ```bash
   docker ps | grep fastgateway-backend
   ```

3. **Port conflict** - Verify the port is not already in use:

   ```bash
   lsof -i :8080
   ```

4. **Firewall blocking** - Check firewall rules:

   ```bash
   # macOS
   sudo pfctl -s rules | grep 8080

   # Linux
   sudo iptables -L -n | grep 8080
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

2. **Incorrect DATABASE_URL** - Verify the connection string format:

   ```bash
   # Correct format
   DATABASE_URL=postgres://user:password@host:5432/database?sslmode=disable
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
   curl -X POST http://localhost:8080/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "your-password"}'
   ```

2. **Invalid JWT_SECRET** - If the JWT_SECRET was changed, all existing tokens become invalid. Users must re-login.

3. **Token not included** - Ensure the Authorization header is set:

   ```bash
   curl -H "Authorization: Bearer <your-token>" http://localhost:8080/api/v1/projects
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

2. **Wrong credentials** - Reset admin password:

   ```bash
   # Re-run database migrations with new admin credentials
   ADMIN_PASSWORD=newpassword ./backend migrate
   ```

3. **Browser cache** - Clear browser cookies and local storage, then try again.

## Kubernetes Issues

### "Envoy Gateway not found"

**Symptoms:**
- Route deployment fails
- Error mentions missing Gateway or GatewayClass

**Solutions:**

1. **Install Envoy Gateway:**

   ```bash
   # Install using Helm
   helm install eg oci://docker.io/envoyproxy/gateway-helm \
     --version v1.0.0 \
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
   NEXT_PUBLIC_API_URL=http://localhost:8080 npm run build
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
curl http://localhost:8080/health

# Test with authentication
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/v1/projects
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
