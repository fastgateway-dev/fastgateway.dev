---
sidebar_position: 2
description: Split traffic between backends for canary and blue-green deployments
---

# Traffic Splitting

Traffic splitting enables gradual rollouts, canary deployments, and blue-green releases by distributing requests across multiple backends.

## Use Cases

- **Canary Deployments**: Send a small percentage to a new version
- **Blue-Green**: Switch between production environments
- **A/B Testing**: Route traffic to different variants

## Weighted Backends

In the route builder, open the **Traffic** tab and set the **Route Type** to **Forward to Backend**. Under **Backend Services**, add two or more backends. For each backend, keep the **Role** set to **Primary** and set its **Weight** between 0 and 100. The weights across primary backends should total 100%.

For example, add `api-v1` with **Weight** `90` and `api-v2` with **Weight** `10`:
- 90% of traffic goes to stable (v1)
- 10% of traffic goes to canary (v2)

Each backend can be a **Kubernetes Service** (select the namespace, service, and port) or an **External Service**. For an external backend, set the **Backend Type** to **External Service**, choose the **Address Type** (**FQDN** or **IP Address**), and enter the **Address** and **Port**.

## Gradual Rollout Strategy

1. Start with 1-5% to the canary
2. Monitor error rates and latency
3. Increase the weight incrementally (10%, 25%, 50%)
4. Complete the rollout at 100%

Enable **Health Checks** in the **Backend Traffic Policy** section to automatically remove unhealthy backends from rotation.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
