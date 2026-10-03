import React from 'react';
import styles from './styles.module.css';

export default function RouteBuilder(): JSX.Element {
  return (
    <section className={styles.routeBuilder}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Free Tool</span>
          </div>
          <h2 className={styles.title}>
            Build Gateway API routes visually
          </h2>
          <p className={styles.description}>
            Don't want to deploy the full platform? Use our free Route Builder to
            design Kubernetes Gateway API resources through a visual interface and
            export valid YAML — no installation, no sign-up.
          </p>
          <ul className={styles.featureList}>
            <li>Build HTTPRoute, Gateway, and GatewayClass resources visually</li>
            <li>Configure path matching, header routing, and traffic splitting</li>
            <li>Export ready-to-apply YAML for any Gateway API implementation</li>
          </ul>
          <a
            href="https://routebuilder.fastgateway.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}>
            Open Route Builder
            <svg
              className={styles.ctaArrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
        <div className={styles.preview}>
          <div className={styles.previewWindow}>
            <div className={styles.windowBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.windowUrl}>routebuilder.fastgateway.dev</span>
            </div>
            <div className={styles.windowBody}>
              <div className={styles.mockRoute}>
                <div className={styles.mockLabel}>HTTPRoute</div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>path:</span>
                  <span className={styles.mockValue}>/api/v1/*</span>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>backend:</span>
                  <span className={styles.mockValue}>my-service:8080</span>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>weight:</span>
                  <span className={styles.mockValue}>100</span>
                </div>
              </div>
              <div className={styles.mockYaml}>
                <code>apiVersion: gateway.networking.k8s.io/v1</code>
                <code>kind: HTTPRoute</code>
                <code>metadata:</code>
                <code>  name: my-route</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
