---
sidebar_position: 5
description: Mirror traffic to shadow backends for testing without impacting production
---

# Traffic Mirroring

Traffic mirroring (shadowing) copies production traffic to a test backend, so you can validate changes without affecting users.

## Use Cases

- Test new backend versions with real traffic
- Validate performance under production load
- Debug issues with production request patterns
- Compare responses between versions

## Configure Mirroring

In the route builder, open the **Traffic** tab and set the **Route Type** to **Forward to Backend**. Find the **Request Mirroring** section and click **Add Mirror**. Select the Kubernetes **namespace**, **service**, and **port** for the mirror destination.

Add more than one mirror to send copies to several destinations. Mirror destinations are Kubernetes services. There is no sampling percentage, so every request matched by the route is mirrored.

## Important Notes

- Every matched request is mirrored (no percentage or sampling)
- Mirrored requests are fire-and-forget
- Responses from the mirror backend are discarded
- Original request latency is not affected
- Mirror backend errors do not impact users

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
