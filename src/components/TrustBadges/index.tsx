import React from 'react';
import styles from './styles.module.css';

type Badge = {
  src: string;
  alt: string;
  href: string;
  width?: number;
  height?: number;
};

const badges: Badge[] = [
  {
    src: '/img/envoy-gateway-logo.svg',
    alt: 'Envoy Gateway',
    href: 'https://gateway.envoyproxy.io/',
  },
  {
    src: '/img/gateway-api-logo.webp',
    alt: 'Kubernetes Gateway API',
    href: 'https://gateway-api.sigs.k8s.io/',
    width: 454,
    height: 126,
  },
  {
    src: '/img/coraza-logo.png',
    alt: 'OWASP Coraza',
    href: 'https://www.coraza.io/',
    width: 1250,
    height: 309,
  },
  {
    src: '/img/cert-manager-logo.svg',
    alt: 'cert-manager',
    href: 'https://cert-manager.io/',
  },
];

export default function TrustBadges(): JSX.Element {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <p className={styles.trustTitle}>Powered by</p>
        <div className={styles.badges}>
          {badges.map((badge) => (
            <a
              key={badge.alt}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.badgeLink}
              aria-label={badge.alt}
            >
              <img
                src={badge.src}
                alt={badge.alt}
                className={styles.badgeLogo}
                width={badge.width}
                height={badge.height}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
