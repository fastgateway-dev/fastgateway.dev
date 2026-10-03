# fastgateway.dev

The documentation, blog, and landing page for [FastGateway](https://github.com/fastgateway-dev) —
an open-source, UI-driven platform for managing Kubernetes Gateway API resources.

Built with [Docusaurus](https://docusaurus.io/). Hosted free on **GitHub Pages** at
<https://fastgateway.dev>.

## Local development

Requires Node.js >= 20.

```bash
npm ci       # install dependencies
npm start    # dev server with hot reload
```

## Build

```bash
npm run build   # static output in ./build
npm run serve   # preview the production build locally
```

## Deployment

Deployment is fully automated. Every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to GitHub Pages. There is no manual deploy step.

The custom domain is pinned by [`static/CNAME`](static/CNAME). To serve the site
on a fresh repository, enable Pages with **Settings → Pages → Source: GitHub
Actions**, then point DNS for the apex domain at GitHub Pages:

```
A     fastgateway.dev   185.199.108.153
A     fastgateway.dev   185.199.109.153
A     fastgateway.dev   185.199.110.153
A     fastgateway.dev   185.199.111.153
```

## SEO

- `sitemap.xml` — auto-generated at build (with `lastmod`)
- `static/robots.txt` — allows all crawlers, references the sitemap
- `llms.txt` + `llms-full.txt` — generated at build by `docusaurus-plugin-llms`
