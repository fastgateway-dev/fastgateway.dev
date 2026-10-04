import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FastGateway',
  tagline: 'Gateway API Management. Simplified.',
  favicon: 'img/favicon.ico',
  url: 'https://fastgateway.dev',
  baseUrl: '/',
  organizationName: 'fastgateway-dev',
  projectName: 'fastgateway.dev',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
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
      },
    ],
  ],
  themes: [
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
        url: 'https://fastgateway.dev',
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
        url: 'https://fastgateway.dev',
        logo: 'https://fastgateway.dev/img/logo.png',
        sameAs: ['https://github.com/fastgateway-dev'],
      }),
    },
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true,
    },
    image: 'img/fastgateway-social-card.png',
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
        {to: '/api/', label: 'API Reference', position: 'left'},
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
