import React from 'react';
import styles from './styles.module.css';

export default function TrustBadges(): JSX.Element {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <p className={styles.trustTitle}>Powered by</p>
        <div className={styles.badges}>
          <img
            src="/img/envoy-gateway-logo.svg"
            alt="Envoy Gateway"
            className={styles.badgeLogo}
          />
          <img
            src="/img/gateway-api-logo.webp"
            alt="Kubernetes Gateway API"
            className={styles.badgeLogo}
            width={454}
            height={126}
          />
        </div>
      </div>
    </section>
  );
}
