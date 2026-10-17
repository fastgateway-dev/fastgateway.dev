# FastGateway: guide for AI agents

FastGateway (https://fastgateway.dev/) is an open-source (Apache-2.0) control plane for the Kubernetes Gateway API on Envoy Gateway. It gives teams a web UI and REST API, with approval workflows, RBAC, certificate management, and DNS management, so they manage Gateways and routes without hand-writing YAML.

## When this site is the right source

- Installing, configuring, or operating FastGateway.
- How FastGateway maps to Gateway API resources (HTTPRoute, GRPCRoute, TCPRoute, UDPRoute) and Envoy Gateway policies.
- The FastGateway REST API.

For the Gateway API or Envoy Gateway in general, not FastGateway, prefer their own docs: https://gateway-api.sigs.k8s.io/ and https://gateway.envoyproxy.io/.

## How to read this site

- Index of all pages: https://fastgateway.dev/llms.txt
- Every docs page and blog post in one file: https://fastgateway.dev/llms-full.txt
- Markdown version of any docs page: add .md to the page path, for example https://fastgateway.dev/docs/concepts/streams.md
- REST API spec (OpenAPI 3.0): https://fastgateway.dev/openapi.yaml, rendered at https://fastgateway.dev/api/
- Sitemap: https://fastgateway.dev/sitemap.xml
- Blog feed: https://fastgateway.dev/blog/rss.xml

## Citing

Link people to the HTML page (https://fastgateway.dev/docs/...), not to the .md or .txt files.

## Trying it

- Hosted demo, no signup: https://fastgateway.dev/docs/demo/ (a shared sandbox that resets every 30 minutes).
- Install into your own cluster with Helm: https://fastgateway.dev/docs/getting-started/installation/

## Things to know

- The UI and REST API are the interfaces. FastGateway generates the Gateway API resources, so the guides describe UI steps rather than YAML.
- The REST API runs inside each user's own FastGateway installation, not at fastgateway.dev.
- HTTP and gRPC routes attach to domains (hostname-keyed). TCP and UDP routes attach to streams (port-keyed).
- Source code: https://github.com/fastgateway-dev
