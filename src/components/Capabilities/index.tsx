import React from 'react';
import styles from './styles.module.css';

type Capability = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  screenshot?: string;
  screenshotAlt?: string;
  reversed?: boolean;
};

const capabilities: Capability[] = [
  {
    title: 'Traffic Management',
    subtitle: 'Route traffic with precision',
    description:
      'Configure HTTP and gRPC routing rules through an intuitive interface. Define matching, splitting, mirroring, and resilience policies without writing YAML.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    items: [
      'Path, header, method, and query parameter matching',
      'gRPC service and method routing',
      'Traffic splitting for canary and blue-green deployments',
      'Load balancing (RoundRobin, Random, LeastRequest, ConsistentHash)',
      'Failover with primary and fallback backends',
      'Request mirroring for shadow traffic',
      'Circuit breaker, retries, and timeouts',
      'Rate limiting with per-client selectors',
    ],
    screenshot: '/img/traffic-management.webp',
    reversed: false,
  },
  {
    title: 'Security',
    subtitle: 'Defense in depth, built in',
    description:
      'Apply layered security policies per domain, per route, or per client. From WAF rules to SSO integration — all managed visually.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    items: [
      'WAF with Coraza (block/detect modes, anomaly scoring)',
      'SSO/OIDC login with domain and email restrictions',
      'External authorization (HTTP and gRPC)',
      'API key and JWT authentication',
      'mTLS with CA certificates and SAN validation',
      'IP allowlisting (direct and via clients)',
      'CORS configuration',
      'Per-client security policies',
    ],
    screenshot: '/img/security.webp',
    reversed: true,
  },
  {
    title: 'Certificate Management',
    subtitle: 'TLS and mTLS identities, issued for you',
    description:
      'Issue and manage TLS certificates from a platform CA — server certificates for your domains and client certificates for mutual TLS — backed by cert-manager, with approval workflows and full visibility.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    items: [
      'Managed server certificates issued from a private CA and attached to domains',
      'Client (mTLS) certificates bound to clients for mutual TLS',
      'Managed-key or caller-supplied CSR mode (the private key never leaves the client)',
      'Self-signed CA and ACME issuers, including DNS-01 via DNS provider credentials',
      'cert-manager-backed issuance with automatic renewal',
      'Approval-gated issuance and single-use, user-bound key export',
      'Per-project and fleet-wide certificate visibility and status',
    ],
    screenshot: '/img/certificate.png',
    reversed: false,
  },
  {
    title: 'DNS Management',
    subtitle: 'Records that follow your domains',
    description:
      'Register a hosted zone with your DNS provider and FastGateway creates and manages a DNS record for every domain automatically — pointed at the gateway, with no manual record-keeping or separate tooling.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    items: [
      'Hosted zones for Cloudflare, Google Cloud DNS, and AWS Route 53',
      'Automatic DNS record creation when a domain is created',
      "Records target the gateway's external address (A / AAAA / CNAME)",
      'Live per-record status — Pending, Syncing, Ready',
      'Refresh, edit, or delete managed records from the UI',
      'Project-wide view of every record FastGateway manages',
    ],
    screenshot: '/img/dns.png',
    reversed: true,
  },
  {
    title: 'Extensibility',
    subtitle: 'Customize every request',
    description:
      'Transform requests and responses with built-in policies or write custom logic with Lua and WebAssembly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    items: [
      'Lua scripting (inline or external reference)',
      'WebAssembly modules (HTTP or container image)',
      'Request/response header modification',
      'URL rewriting and HTTP redirects',
      'Fault injection for chaos testing',
      'Compression (Gzip, Brotli, Zstd)',
      'Response overrides and direct responses',
      'Request buffering and connection tuning',
    ],
    screenshot: '/img/extensibility.webp',
    reversed: false,
  },
  {
    title: 'Users, Teams & Governance',
    subtitle: 'Control at every level',
    description:
      'Manage users and teams, organize resources by project, assign custom permission presets, and enforce approval workflows with full audit trails.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    items: [
      'User management with role assignment and enable/disable',
      'Team management with email invitations',
      'Custom RBAC with permission presets per team',
      'Multi-stage approval workflows for routes and clients',
      'Audit logging with export and retention policies',
      'Project and domain tagging with custom labels',
      'SSO/OIDC for team onboarding',
    ],
    screenshot: '/img/audit-log.webp',
    reversed: true,
  },
  {
    title: 'Route History & Rollback',
    subtitle: 'Never lose a configuration',
    description:
      'Track every change to your routes with full version history. Compare revisions side by side and roll back to any previous version with a single click.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        <polyline points="12 7 12 12 16 14" />
      </svg>
    ),
    items: [
      'Full version history for every route change',
      'Side-by-side revision comparison',
      'One-click rollback to any previous version',
      'Change attribution with user and timestamp',
      'Rollback protection with approval workflow integration',
    ],
    screenshot: '/img/history-management-route.webp',
    reversed: false,
  },
  {
    title: 'AI-Powered Intelligence',
    subtitle: 'AI that understands your gateway',
    description:
      'Generate routes from natural language, get AI-powered security reviews of your configurations, and use contextual chat for guidance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.45 2.1-1.17 2.83L12 12l-2.83-3.17A4 4 0 0 1 12 2z" />
        <path d="M12 12l2.83 3.17A4 4 0 1 1 8 18a4 4 0 0 1 1.17-2.83L12 12z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    items: [
      'AI route generation from natural language',
      'AI security and configuration review',
      'Contextual AI chat for route and domain guidance',
      'Support for major AI providers or self-managed models',
      'Manifest import with AI-assisted validation',
    ],
    screenshot: '/img/ai-review.webp',
    reversed: true,
  },
  {
    title: 'Multi-Cluster & API',
    subtitle: 'Scale across clusters',
    description:
      'Manage gateway configurations across multiple Kubernetes clusters from a single interface. Automate through API tokens and integrate with your internal developer platform.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    items: [
      'Manage multiple Kubernetes clusters',
      'Project-based multi-tenancy',
      'Personal API tokens with expiration tracking',
      'Domain templates for reusable gateway configs',
      'TLS termination, passthrough, and HTTP/3 support',
    ],
    screenshot: '/img/multi-cluster.webp',
    reversed: false,
  },
];

function CapabilitySection({
  title,
  subtitle,
  description,
  icon,
  items,
  screenshot,
  screenshotAlt,
  reversed,
}: Capability) {
  return (
    <div className={`${styles.capabilitySection} ${reversed ? styles.reversed : ''}`}>
      <div className={styles.capabilityContent}>
        <div className={styles.capabilityIcon}>{icon}</div>
        <h3 className={styles.capabilityTitle}>{title}</h3>
        <p className={styles.capabilitySubtitle}>{subtitle}</p>
        <p className={styles.capabilityDescription}>{description}</p>
        <ul className={styles.capabilityList}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.capabilityVisual}>
        {screenshot ? (
          <img
            src={screenshot}
            alt={screenshotAlt || `${title} screenshot`}
            className={styles.screenshot}
            loading="lazy"
          />
        ) : (
          <div className={styles.screenshotPlaceholder}>
            <div className={styles.placeholderIcon}>{icon}</div>
            <span className={styles.placeholderText}>Screenshot coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Capabilities(): JSX.Element {
  return (
    <section className={styles.capabilities}>
      <div className={styles.capabilitiesContainer}>
        <p className={styles.sectionLabel}>Capabilities</p>
        <h2 className={styles.sectionTitle}>Built for teams that<br />take their gateway seriously</h2>
        <p className={styles.sectionSubtitle}>
          Deep-dive into each capability with detailed configuration options
        </p>
        <div className={styles.capabilitySections}>
          {capabilities.map((cap, idx) => (
            <CapabilitySection key={idx} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
