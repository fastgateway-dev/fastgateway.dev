---
sidebar_position: 9
title: DNS Management
description: Automatic DNS records for domains via external-dns
---

# DNS Management

FastGateway can manage a DNS record for each domain, pointing its hostname at the gateway's external address. FastGateway never talks to a DNS provider's API directly — it writes a [`DNSEndpoint`](https://github.com/kubernetes-sigs/external-dns/blob/master/docs/contributing/crd-source.md) custom resource, and [external-dns](https://github.com/kubernetes-sigs/external-dns) — running separately in your cluster — reads that resource and creates the record with your provider.

## What It Does

For a domain with DNS management enabled, FastGateway maintains **one managed DNS record**:

- The record's hostname is the domain's hostname (e.g., `api.example.com`).
- The record's target is the gateway's external address (the Gateway's `status.addresses`), as an `A`/`AAAA` record for an IP or a `CNAME` for a hostname-based load balancer.
- FastGateway writes a `DNSEndpoint` resource describing the record; it does not call Cloudflare, Route53, Google Cloud DNS, or Azure DNS directly.
- external-dns watches `DNSEndpoint` resources and reconciles them against your DNS provider.

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Domain   │ ──▶ │  DNSEndpoint │ ──▶ │ external-dns │ ──▶ │ DNS Provider │
│ (Gateway)│     │   (FastGW)   │     │  (separate)  │     │  (Cloudflare,│
└──────────┘     └──────────────┘     └──────────────┘     │ Route53, ...)│
                                                              └──────────────┘
```

## Enabling DNS Management

DNS management is opt-in and requires two things:

1. **Enable it in the Helm chart** when installing or upgrading FastGateway:

   ```bash
   helm upgrade --install fastgateway fastgateway/fastgateway \
     --namespace fastgateway-system \
     --set dns.enabled=true \
     # ...your other --set flags
   ```

   This grants the FastGateway backend the RBAC it needs to manage `DNSEndpoint` resources.

2. **Install external-dns** in your cluster as a prerequisite, pointed at the Secret FastGateway renders. FastGateway writes provider credentials into a Secret named **`fgw-externaldns-credentials`** in the **`fastgateway-system`** namespace; external-dns must be configured to read from CRD sources and use that Secret:

   ```bash
   helm install external-dns external-dns/external-dns \
     --namespace fastgateway-system \
     --set provider=cloudflare \
     --set extraArgs[0]="--source=crd" \
     --set extraArgs[1]="--policy=sync" \
     --set extraArgs[2]="--txt-owner-id=fastgateway" \
     --set env[0].name=CF_API_TOKEN \
     --set-string env[0].valueFrom.secretKeyRef.name=fgw-externaldns-credentials \
     --set-string env[0].valueFrom.secretKeyRef.key=apiToken
   ```

   The exact environment/credential mapping depends on the provider — see [Setting the Active Credential](#setting-the-active-credential) below for each provider's secret keys. The required external-dns flags are the same regardless of provider:

   | Flag | Why |
   |------|-----|
   | `--source=crd` | Reads records from `DNSEndpoint` custom resources instead of Ingress/Service objects |
   | `--policy=sync` | Creates, updates, and removes records to match the `DNSEndpoint` resources |
   | `--txt-owner-id=fastgateway` | Tags records external-dns owns so it doesn't touch unrelated records in the same zone |
   | `--provider=<cloudflare\|aws\|google\|azure>` | Selects the DNS provider plugin matching your active credential |

See [Installation: external-dns (Optional)](../getting-started/installation#external-dns-optional) for the full prerequisite checklist.

## Setting the Active Credential

Before any domain can get a managed DNS record, an **owner** must configure a DNS provider credential and mark it active. FastGateway supports one active credential per cluster in v1.

1. Go to **DNS Credentials** and create a credential for your provider.
2. Mark that credential **active** in DNS settings — this is the credential FastGateway uses for every domain's DNS record, and it's the credential whose values are rendered into the `fgw-externaldns-credentials` Secret.

FastGateway supports four providers, each with its own credential fields:

| Provider | `--provider` flag | Credential fields |
|----------|-------------------|--------------------|
| Cloudflare | `cloudflare` | `apiToken` |
| AWS Route 53 | `aws` | `accessKeyId`, `secretAccessKey` |
| Google Cloud DNS | `google` | `serviceAccountKey` (JSON), `project` |
| Azure DNS | `azure` | `tenantId`, `subscriptionId`, `resourceGroup`, `clientId`, `clientSecret` |

:::note One credential per cluster
Only one DNS provider credential can be active at a time. All domains in the cluster that have DNS management enabled share that single active credential — switching the active credential changes where new and existing records are reconciled.
:::

## Auto-Create at Domain Creation

When creating a domain, you can opt in to automatic DNS record creation with a toggle on the create wizard (off by default). When enabled, FastGateway creates the managed DNS record for the domain's hostname as soon as the domain is created, using the active credential — you don't need a separate step afterward. You can still review, edit, or remove the record later from the domain's settings.

## Record Status

Each managed DNS record reports one of four statuses:

| Status | Meaning |
|--------|---------|
| **Pending** | Waiting for the gateway to have an external address; no `DNSEndpoint` has been submitted yet |
| **Syncing** | A `DNSEndpoint` has been submitted to the cluster |
| **Ready** | external-dns has picked up the record (the `DNSEndpoint` has been submitted to external-dns) |
| **Error** | The record couldn't be created or reconciled — see the status message for details |

:::tip Ready means "submitted," not "verified in your DNS zone"
**Ready** reflects that the `DNSEndpoint` was accepted and handed to external-dns, not that FastGateway has confirmed the record resolves at your DNS provider. Propagation to the live DNS zone happens on external-dns's own sync interval.
:::

## v1 Limitations

- **One provider credential per cluster.** All domains share the single active DNS credential; there is no per-domain or per-project credential selection yet.
- **FastGateway's own domains only.** DNS management only creates records for domains FastGateway manages (its Gateway resources) — it does not manage unrelated DNS records in your zone.
- **Non-default namespaces may stay Pending.** Domains whose Gateway resources live outside the namespace FastGateway watches for address status may not resolve a gateway address, and their DNS record will remain in **Pending** until that's available.
