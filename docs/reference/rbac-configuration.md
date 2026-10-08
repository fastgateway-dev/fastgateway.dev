---
sidebar_position: 2
description: Kubernetes RBAC configuration for FastGateway backend service
---

# RBAC Configuration

FastGateway backend requires specific Kubernetes RBAC permissions to manage Envoy Gateway resources. This document provides the necessary configuration.

## Complete RBAC Manifest

Create a file named `fastgateway-rbac.yaml` with the following content:

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: fastgateway
  namespace: fastgateway
---
apiVersion: v1
kind: Secret
metadata:
  name: fastgateway-token
  namespace: fastgateway
  annotations:
    kubernetes.io/service-account.name: fastgateway
type: kubernetes.io/service-account-token
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fastgateway
rules:
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["services"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["gateways"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["gatewayclasses"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["httproutes"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["grpcroutes"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["referencegrants"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["securitypolicies"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["backendtrafficpolicies"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["clienttrafficpolicies"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["envoyproxies"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["envoyextensionpolicies"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["backends"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.envoyproxy.io"]
    resources: ["httproutefilters"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: fastgateway
subjects:
  - kind: ServiceAccount
    name: fastgateway
    namespace: fastgateway
roleRef:
  kind: ClusterRole
  name: fastgateway
  apiGroup: rbac.authorization.k8s.io
```

## Apply the Configuration

```bash
# Create the namespace first
kubectl create namespace fastgateway

# Apply the RBAC configuration
kubectl apply -f fastgateway-rbac.yaml
```

## Permissions Reference

| API Group | Resource | Permissions | Purpose |
|-----------|----------|-------------|---------|
| `""` (core) | namespaces | get, list, watch, create, update, patch, delete | Manage project namespaces |
| `""` (core) | services | get, list, watch, create, update, patch, delete | Manage backend services |
| `""` (core) | secrets | get, list, watch, create, update, patch, delete | Store TLS certificates and API keys |
| `""` (core) | configmaps | get, list, watch, create, update, patch, delete | Store direct-response bodies and related config data |
| `gateway.networking.k8s.io` | gateways | get, list, watch, create, update, patch, delete | Manage Gateway resources |
| `gateway.networking.k8s.io` | gatewayclasses | get, list, watch, create, update, patch, delete | Manage GatewayClass resources |
| `gateway.networking.k8s.io` | httproutes | get, list, watch, create, update, patch, delete | Manage HTTP routing rules |
| `gateway.networking.k8s.io` | grpcroutes | get, list, watch, create, update, patch, delete | Manage gRPC routing rules |
| `gateway.networking.k8s.io` | referencegrants | get, list, watch, create, update, patch, delete | Allow cross-namespace references for routing |
| `gateway.envoyproxy.io` | securitypolicies | get, list, watch, create, update, patch, delete | Manage authentication and authorization |
| `gateway.envoyproxy.io` | backendtrafficpolicies | get, list, watch, create, update, patch, delete | Manage backend traffic policies (rate limiting, retries, etc.) |
| `gateway.envoyproxy.io` | clienttrafficpolicies | get, list, watch, create, update, patch, delete | Manage client traffic policies |
| `gateway.envoyproxy.io` | envoyproxies | get, list, watch, create, update, patch, delete | Manage EnvoyProxy configuration for gateways |
| `gateway.envoyproxy.io` | envoyextensionpolicies | get, list, watch, create, update, patch, delete | Manage Lua/Wasm extension policies (including WAF) |
| `gateway.envoyproxy.io` | backends | get, list, watch, create, update, patch, delete | Manage Envoy Gateway Backend resources |
| `gateway.envoyproxy.io` | httproutefilters | get, list, watch, create, update, patch, delete | Manage HTTPRouteFilter resources |

## Retrieving the Service Account Token

To get the token for the FastGateway service account:

```bash
kubectl get secret fastgateway-token -n fastgateway -o jsonpath='{.data.token}' | base64 -d
```

This token is provided per project when configuring the cluster connection (connection type `api_token`) through the FastGateway UI or API — it is stored encrypted in the database. There is no backend environment variable for it. When FastGateway runs inside the target cluster, you can instead use the `in_cluster` connection type, which relies on the pod's mounted service account token rather than a token you supply manually.

## Verifying Permissions

Test that the service account has the correct permissions:

```bash
# Check if the service account can list HTTPRoutes
kubectl auth can-i list httproutes.gateway.networking.k8s.io \
  --as=system:serviceaccount:fastgateway:fastgateway

# Check if the service account can create SecurityPolicies
kubectl auth can-i create securitypolicies.gateway.envoyproxy.io \
  --as=system:serviceaccount:fastgateway:fastgateway
```

Both commands should return `yes` if configured correctly.

## Namespace-Scoped Alternative

If you prefer namespace-scoped permissions instead of cluster-wide access, replace the `ClusterRole` and `ClusterRoleBinding` with `Role` and `RoleBinding`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: fastgateway
  namespace: your-namespace
rules:
  # Same rules as ClusterRole
  ...
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: fastgateway
  namespace: your-namespace
subjects:
  - kind: ServiceAccount
    name: fastgateway
    namespace: fastgateway
roleRef:
  kind: Role
  name: fastgateway
  apiGroup: rbac.authorization.k8s.io
```

Note: You will need to create a Role and RoleBinding in each namespace where FastGateway needs to manage resources.
