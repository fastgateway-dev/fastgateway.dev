import React from 'react';
import styles from './styles.module.css';

export default function Architecture(): JSX.Element {
  return (
    <section className={styles.architecture}>
      <div className={styles.architectureContainer}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionSubtitle}>
          FastGateway abstracts Kubernetes Gateway API complexity into an intuitive UI
        </p>

        <div className={styles.diagram}>
          <div className={styles.box}>
            <div className={styles.boxTitle}>Browser UI</div>
            <div className={styles.boxSubtitle}>Next.js</div>
          </div>
          <span className={styles.arrow}>→</span>
          <div className={styles.box}>
            <div className={styles.boxTitle}>FastGateway</div>
            <div className={styles.boxSubtitle}>Go Backend</div>
          </div>
          <span className={styles.arrow}>→</span>
          <div className={styles.box}>
            <div className={styles.boxTitle}>Kubernetes</div>
            <div className={styles.boxSubtitle}>API Server</div>
          </div>
          <span className={styles.arrow}>→</span>
          <div className={styles.box}>
            <div className={styles.boxTitle}>Envoy Gateway</div>
            <div className={styles.boxSubtitle}>Data Plane</div>
          </div>
        </div>

        <div className={styles.dbConnection}>
          <span className={styles.dbArrow}>↓</span>
          <div className={styles.box}>
            <div className={styles.boxTitle}>PostgreSQL</div>
            <div className={styles.boxSubtitle}>State & Config</div>
          </div>
        </div>
      </div>
    </section>
  );
}
