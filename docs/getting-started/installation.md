---
sidebar_position: 1
title: Installation
description: Step-by-step guide to install FastGateway on Kubernetes with Helm, including Envoy Gateway setup and PostgreSQL configuration.
---

# Installation

This guide walks you through installing FastGateway in your Kubernetes cluster.

## Prerequisites

Before installing FastGateway, ensure you have the following:

- **Kubernetes** version 1.24 or later
- **kubectl** configured to communicate with your cluster
- **Helm 3** installed on your local machine
- **Envoy Gateway** installed in your cluster
- **PostgreSQL** database
- **external-dns** installed in your cluster — *optional*, only needed if you plan to enable [DNS management](../concepts/dns-management)

### Install Envoy Gateway

FastGateway uses Envoy Gateway as the underlying data plane. Install it with the Backend extension API enabled:

```yaml title="envoy-gateway-values.yaml"
envoyGateway:
  extensionApis:
    enableBackend: true
```

```bash
helm install eg oci://docker.io/envoyproxy/gateway-helm \
  --version v1.7.0 \
  --namespace envoy-gateway-system \
  --create-namespace \
  -f envoy-gateway-values.yaml
```

Wait for Envoy Gateway to be ready:

```bash
kubectl wait --timeout=5m -n envoy-gateway-system \
  deployment/envoy-gateway --for=condition=Available
```

:::note Redis for Rate Limiting
If you plan to use rate limiting, Envoy Gateway requires a Redis backend. Add the following to your Envoy Gateway values:

```yaml
envoyGateway:
  extensionApis:
    enableBackend: true
  rateLimit:
    backend:
      type: Redis
      redis:
        url: "<redis-host>:6379"
```
:::

### PostgreSQL Database

FastGateway requires a PostgreSQL database. We recommend managing your own database.

You can use any PostgreSQL provider:
- Self-managed PostgreSQL on Kubernetes (e.g., CloudNativePG, Zalando Postgres Operator)
- Cloud-managed databases (e.g., AWS RDS, GCP Cloud SQL, Azure Database for PostgreSQL)
- Any PostgreSQL 14+ compatible database

Create a Kubernetes secret with your database credentials:

```bash
kubectl create namespace fastgateway-system

kubectl create secret generic fastgateway-database \
  --from-literal=username=<db-username> \
  --from-literal=password=<db-password> \
  --from-literal=database=<db-name> \
  -n fastgateway-system
```

:::tip
For quick testing, the Helm chart includes an internal PostgreSQL option (`database.type: internal`) that deploys a single-replica PostgreSQL StatefulSet. This is **not recommended for production** — use an externally managed database instead.
:::

### FastGateway Secrets

FastGateway requires a Kubernetes secret containing the following keys:

- **`jwt-secret`** — Used to sign and verify JWT tokens for user sessions
- **`encryption-key`** — Used to encrypt sensitive data at rest
- **`admin-password`** — The initial password for the default admin user

Create the secret:

```bash
kubectl create secret generic fastgateway-secrets \
  --from-literal=jwt-secret=$(openssl rand -base64 32) \
  --from-literal=encryption-key=$(openssl rand -base64 32) \
  --from-literal=admin-password=<your-admin-password> \
  -n fastgateway-system
```

### external-dns (Optional)

If you plan to enable [DNS management](../concepts/dns-management) (`dns.enabled=true` in the Helm chart), install [external-dns](https://github.com/kubernetes-sigs/external-dns) in your cluster first. FastGateway never calls a DNS provider's API itself — it writes `DNSEndpoint` custom resources, and external-dns reconciles them against your provider.

Install external-dns configured to read `DNSEndpoint` resources and to use the Secret FastGateway renders (`fgw-externaldns-credentials` in `fastgateway-system`):

```bash
helm install external-dns external-dns/external-dns \
  --namespace fastgateway-system \
  --set provider=<cloudflare|aws|google|azure> \
  --set extraArgs[0]="--source=crd" \
  --set extraArgs[1]="--policy=sync" \
  --set extraArgs[2]="--txt-owner-id=fastgateway"
```

| Flag | Purpose |
|------|---------|
| `--source=crd` | Read records from `DNSEndpoint` custom resources instead of Ingress/Service |
| `--policy=sync` | Create, update, and remove records to match FastGateway's `DNSEndpoint` resources |
| `--txt-owner-id=fastgateway` | Scope external-dns to the records it owns in the zone |
| `--provider=<cloudflare\|aws\|google\|azure>` | The DNS provider matching your active FastGateway DNS credential |

See [DNS Management](../concepts/dns-management) for the four supported providers, their credential fields, and how to set the active credential. This is only required if you enable DNS management — it is not needed for a standard FastGateway installation.

## Install FastGateway

Add the FastGateway Helm repository:

```bash
helm repo add fastgateway https://charts.fastgateway.dev/releases
helm repo update
```

Install FastGateway with your external database:

```bash
helm install fastgateway fastgateway/fastgateway \
  --namespace fastgateway-system \
  --set secrets.existingSecret=fastgateway-secrets \
  --set database.type=external \
  --set database.external.host=<postgres-host> \
  --set database.external.port=5432 \
  --set database.external.existingSecret=fastgateway-database
```

Or for quick testing with the internal database:

```bash
helm install fastgateway fastgateway/fastgateway \
  --namespace fastgateway-system \
  --set secrets.existingSecret=fastgateway-secrets
```

## Verify Installation

Check that all FastGateway pods are running:

```bash
kubectl get pods -n fastgateway-system
```

You should see output similar to:

```
NAME                                    READY   STATUS    RESTARTS   AGE
fastgateway-backend-xxx-xxx             1/1     Running   0          1m
fastgateway-frontend-xxx-xxx            1/1     Running   0          1m
```

## Next Steps

Once all pods are running, proceed to [Accessing the UI](./accessing-ui) to start using FastGateway.
