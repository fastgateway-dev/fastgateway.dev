---
sidebar_position: 4
description: Configure primary and fallback backends for automatic failover
---

# Failover

Failover ensures high availability by routing traffic to a fallback backend when the primary backends become unavailable.

## Primary and Fallback Backends

In the route builder, open the **Traffic** tab and set the **Route Type** to **Forward to Backend**. Under **Backend Services**, add your primary backend and leave its **Role** set to **Primary**. Add another backend and set its **Role** to **Fallback**.

A fallback backend receives traffic only when all primary backends are unhealthy. Its weight is set to 0 automatically, so weights do not apply to it. Fallback requires passive health checks to be enabled so the gateway can detect when primaries are unhealthy.

## Health Checks

Expand the **Backend Traffic Policy** section and enable **Health Checks** so the gateway can detect and route around unhealthy backends.

- **Active** health checks probe the backend on an interval. For HTTP, set the probe **Path**, the **Expected Status Codes**, the check **Interval**, and the **Timeout**.
- **Passive** health checks observe live traffic and remove a backend after a number of **Consecutive Gateway Errors** or **Consecutive 5xx Errors**. Passive checks are what drive failover to a fallback backend.

## How Failover Works

1. Health checks run against each backend
2. A backend is marked unhealthy after the configured error threshold
3. Traffic shifts to healthy backends, or to the fallback backend when all primaries are unhealthy
4. The backend is restored once it is healthy again

Combine this with circuit breakers for comprehensive resilience.

The REST API equivalent is documented in the [API Reference](/docs/reference/api-reference).
