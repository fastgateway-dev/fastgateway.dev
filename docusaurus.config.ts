import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Intro of /llms.txt (also served as /llms.md and /index.md, see postbuild in
// package.json). Keep the facts here true; agents quote them.
const LLMS_INTRO = `FastGateway is an open-source (Apache-2.0) control plane for the Kubernetes Gateway API on Envoy Gateway. Teams manage Gateways, routes, security policies, TLS certificates, and DNS records through a web UI and REST API, with approval workflows and RBAC, instead of hand-writing YAML.

Key facts:

- Self-hosted: installs into your Kubernetes cluster with Helm. The REST API runs inside your installation.
- Routing: HTTP and gRPC routes on domains (hostname-keyed), TCP and UDP routes on streams (port-keyed).
- Generates Gateway API resources (HTTPRoute, GRPCRoute, TCPRoute, UDPRoute) and Envoy Gateway policies.
- Certificate management with self-signed and ACME issuers (cert-manager), and DNS management for Cloudflare, AWS Route 53, and Google Cloud DNS.
- Live demo, no signup: https://fastgateway.dev/docs/demo/
- Source code: https://github.com/fastgateway-dev
- REST API spec (OpenAPI 3.0): https://fastgateway.dev/openapi.yaml

For AI agents: each link below is the markdown version of a docs page. Cite the HTML page (the same URL without .md) when pointing people to the docs. All docs in one file: https://fastgateway.dev/llms-full.txt. More guidance: https://fastgateway.dev/agents.md`;

const LLMS_FULL_INTRO = `FastGateway is an open-source (Apache-2.0) control plane for the Kubernetes Gateway API on Envoy Gateway, with a web UI, REST API, approval workflows, and RBAC. This file contains the full text of every FastGateway docs page and blog post. Index: https://fastgateway.dev/llms.txt. REST API spec: https://fastgateway.dev/openapi.yaml`;

const config: Config = {
  title: 'FastGateway',
  tagline: 'Gateway API Management. Simplified.',
  favicon: 'img/favicon.ico',
  url: 'https://fastgateway.dev',
  baseUrl: '/',
  // GitHub Pages serves every page as <path>/index.html and 301s <path> to
  // <path>/, so canonical, sitemap, and internal links must carry the slash.
  trailingSlash: true,
  organizationName: 'fastgateway-dev',
  projectName: 'fastgateway.dev',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    mermaid: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/fastgateway-dev/fastgateway.dev/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
          // Search UI and blog listing pages have no content of their own.
          ignorePatterns: [
            '/search',
            '/search/**',
            '/blog/tags',
            '/blog/tags/**',
            '/blog/archive',
            '/blog/archive/**',
            '/blog/authors',
            '/blog/authors/**',
            '/blog/page/**',
          ],
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        // Interactive API reference (Redoc). The spec is a committed copy of
        // backend-v2's docs/openapi/openapi.yaml — refresh it with
        // `make openapi.sync`. Also downloadable at /openapi.yaml.
        specs: [
          {
            id: 'fastgateway-api',
            spec: 'static/openapi.yaml',
            route: '/api/',
          },
        ],
        theme: {
          primaryColor: '#2563eb',
        },
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        docsDir: 'docs',
        includeBlog: true,
        title: 'FastGateway',
        description:
          'UI-driven platform for managing Kubernetes Gateway API resources with approval workflows, multi-cluster support, and enterprise security.',
        rootContent: LLMS_INTRO,
        fullRootContent: LLMS_FULL_INTRO,
        // Writes a raw-markdown twin of every page at <path>.md and points
        // llms.txt at those twins. DocItem/BlogPostPage Metadata wrappers in
        // src/theme advertise each twin with <link rel="alternate">.
        generateMarkdownFiles: true,
        excludeImports: true,
        removeDuplicateHeadings: true,
        // Keep <Step number title src alt> tags in the twins: the step title
        // and screenshot live in props, which the plugin would otherwise drop.
        preserveComponents: ['Step'],
        // The docs landing page is a React component with no markdown body;
        // its twin would be empty. Its markdown alternate is /llms.md instead
        // (see src/theme/DocItem/Metadata).
        ignoreFiles: ['docs/index.mdx'],
        includeOrder: [
          'docs/demo.md*',
          'docs/getting-started/installation.md*',
          'docs/getting-started/**',
          'docs/concepts/projects.md*',
          'docs/concepts/**',
          'docs/tasks/**',
          'docs/reference/**',
          'blog/**',
        ],
      },
    ],
  ],
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap';document.head.appendChild(l)})()`,
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'FastGateway',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Kubernetes',
        description: 'UI-driven platform for managing Kubernetes Gateway API resources with approval workflows, multi-cluster support, and enterprise security.',
        url: 'https://fastgateway.dev/',
        license: 'https://www.apache.org/licenses/LICENSE-2.0',
        installUrl: 'https://fastgateway.dev/docs/getting-started/installation/',
        softwareHelp: {'@type': 'CreativeWork', url: 'https://fastgateway.dev/docs/'},
        sameAs: ['https://github.com/fastgateway-dev'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'FastGateway',
        url: 'https://fastgateway.dev/',
        logo: 'https://fastgateway.dev/img/logo.png',
        sameAs: ['https://github.com/fastgateway-dev', 'https://x.com/fastgatewaydev'],
      }),
    },
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true,
    },
    image: 'img/fastgateway-social-card.png',
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      options: {
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      },
    },
    navbar: {
      title: 'FastGateway',
      logo: {
        alt: 'FastGateway Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://x.com/fastgatewaydev',
          position: 'right',
          className: 'header-x-link',
          'aria-label': 'X (Twitter)',
        },
        {
          href: 'https://github.com/fastgateway-dev',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
