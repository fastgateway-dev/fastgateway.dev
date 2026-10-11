import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Traffic Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    description:
      'HTTP, gRPC, and Layer-4 TCP/UDP routing, traffic splitting, load balancing, circuit breakers, retries, and rate limiting.',
    link: '/docs/tasks/traffic-management/configure-routing',
  },
  {
    title: 'Security',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description:
      'WAF, SSO/OIDC, external authorization, JWT, mTLS, API keys, and per-client security policies.',
    link: '/docs/tasks/security/configure-cors',
  },
  {
    title: 'Certificate Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    description:
      'Issue TLS server and client (mTLS) certificates from a platform CA — cert-manager-backed, with self-signed and ACME issuers, approvals, and automatic renewal.',
    link: '/docs/getting-started/installation',
  },
  {
    title: 'DNS Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    description:
      'Automatic DNS records for every domain via Cloudflare, Google Cloud DNS, and Route 53 — managed from hosted zones.',
    link: '/docs/concepts/dns-management',
  },
  {
    title: 'Extensibility',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    description:
      'Lua scripting, WebAssembly modules, header transforms, URL rewriting, and fault injection.',
    link: '/docs/tasks/extensibility/header-modification',
  },
  {
    title: 'Users, Teams & Governance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    description:
      'User and team management, custom RBAC with permission presets, multi-stage approval workflows, and full audit logging.',
    link: '/docs/concepts/approval-workflow',
  },
  {
    title: 'AI-Powered',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.45 2.1-1.17 2.83L12 12l-2.83-3.17A4 4 0 0 1 12 2z" />
        <path d="M12 12l2.83 3.17A4 4 0 1 1 8 18a4 4 0 0 1 1.17-2.83L12 12z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    description:
      'AI route generation from natural language, security reviews, and contextual chat for configuration guidance.',
    link: '/docs/getting-started/installation',
  },
  {
    title: 'Multi-Cluster',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    description:
      'Manage multiple Kubernetes clusters from a single control plane, with project-based isolation across environments.',
    link: '/docs/concepts/projects',
  },
  {
    title: 'API',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description:
      'A full REST API and personal access tokens for automation and integration with your internal developer platform.',
    link: '/docs/reference/api-reference',
  },
];

function Feature({title, icon, description, link}: FeatureItem) {
  return (
    <Link to={link} className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
      <span className={styles.featureLink}>
        Learn more
        <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z" />
        </svg>
      </span>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContainer}>
        <p className={styles.sectionLabel}>Features</p>
        <h2 className={styles.sectionTitle}>
          Everything you need to manage<br />Gateway API at scale
        </h2>
        <p className={styles.sectionSubtitle}>
          Build, secure, and extend your gateway infrastructure with a platform designed for teams.
        </p>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
