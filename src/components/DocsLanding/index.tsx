import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Section = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const sections: Section[] = [
  {
    title: 'Getting Started',
    description:
      'Install FastGateway with Helm, access the UI, and create your first route.',
    href: '/docs/getting-started/installation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    title: 'Concepts',
    description:
      'Projects, domains, routes, clients, and how FastGateway models the Gateway API.',
    href: '/docs/concepts/projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Traffic Management',
    description:
      'Routing, traffic splitting, load balancing, failover, retries, and rate limiting.',
    href: '/docs/tasks/traffic-management/configure-routing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Security',
    description:
      'WAF, CORS, API keys, JWT, mTLS, OIDC, IP allowlisting, and per-client policies.',
    href: '/docs/tasks/security/configure-cors',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Extensibility',
    description:
      'Header transforms, URL rewrites, redirects, fault injection, and domain settings.',
    href: '/docs/tasks/extensibility/header-modification',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Reference',
    description:
      'REST API reference, RBAC configuration, environment variables, and troubleshooting.',
    href: '/docs/reference/api-reference',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    title: 'API Reference',
    description:
      'Explore and try the full FastGateway REST API interactively.',
    href: '/api/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

export default function DocsLanding(): JSX.Element {
  return (
    <div className={styles.landing}>
      <h1 className={styles.pageTitle}>Documentation</h1>
      <p className={styles.intro}>
        FastGateway is a UI-driven platform for managing Kubernetes Gateway API
        resources — create and manage Gateways, routes, and traffic policies
        through a UI and REST API instead of hand-writing manifests, with teams,
        approvals, and an audit trail on top. These guides walk through the whole
        flow, from installing FastGateway to securing and extending your gateways.
      </p>
      <div className={styles.grid}>
        {sections.map((section) => (
          <Link key={section.title} to={section.href} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{section.icon}</span>
              <h3 className={styles.cardTitle}>{section.title}</h3>
            </div>
            <p className={styles.cardDesc}>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
