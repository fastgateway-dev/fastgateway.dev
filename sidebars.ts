import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'index',
    'demo',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/compatibility-matrix',
        'getting-started/accessing-ui',
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/projects',
        'concepts/domain-templates',
        'concepts/domains',
        'concepts/certificates',
        'concepts/dns-management',
        'concepts/routes',
        'concepts/streams',
        'concepts/clients',
        'concepts/security-modes',
        'concepts/approval-workflow',
      ],
    },
    {
      type: 'category',
      label: 'Tasks',
      items: [
        {
          type: 'category',
          label: 'Traffic Management',
          items: [
            'tasks/traffic-management/configure-routing',
            'tasks/traffic-management/traffic-splitting',
            'tasks/traffic-management/load-balancing',
            'tasks/traffic-management/failover',
            'tasks/traffic-management/mirroring',
            'tasks/traffic-management/timeouts-retries',
            'tasks/traffic-management/rate-limiting',
            'tasks/traffic-management/tcp-udp-routing',
          ],
        },
        {
          type: 'category',
          label: 'Security',
          items: [
            'tasks/security/configure-cors',
            'tasks/security/ip-allowlisting',
            'tasks/security/api-key-auth',
            'tasks/security/jwt-validation',
            'tasks/security/oidc-integration',
            'tasks/security/client-management',
          ],
        },
        {
          type: 'category',
          label: 'Extensibility',
          items: [
            'tasks/extensibility/header-modification',
            'tasks/extensibility/url-rewrite',
            'tasks/extensibility/redirect',
            'tasks/extensibility/direct-response',
            'tasks/extensibility/fault-injection',
            'tasks/extensibility/domain-settings',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api-reference',
        'reference/rbac-configuration',
        'reference/troubleshooting',
      ],
    },
    {
      type: 'link',
      label: 'API Reference',
      href: '/api/',
    },
  ],
};

export default sidebars;
