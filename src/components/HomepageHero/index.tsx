import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HomepageHero(): JSX.Element {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.heroLabel}>Gateway API Management Platform</p>
        <h1 className={styles.heroTitle}>
          Manage Gateway API<br />
          <span className={styles.heroTitleAccent}>without the YAML</span>
        </h1>
        <p className={styles.heroSubtitle}>
          The UI-driven platform for managing Kubernetes Gateway API resources
          with approval workflows, AI-powered reviews, and enterprise security.
        </p>
        <div className={styles.buttons}>
          <Link
            className={`${styles.button} ${styles.buttonPrimary}`}
            to="/docs/getting-started/installation">
            Get Started
          </Link>
          <Link
            className={`${styles.button} ${styles.buttonSecondary}`}
            href="https://github.com/fastgateway-dev">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
