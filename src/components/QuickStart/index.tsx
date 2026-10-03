import React from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const steps = [
  {
    label: 'Add Helm Repository',
    code: `helm repo add fastgateway https://charts.fastgateway.dev/releases
helm repo update`,
  },
  {
    label: 'Install FastGateway',
    code: `helm install fastgateway fastgateway/fastgateway \\
  -n fastgateway-system \\
  --create-namespace`,
  },
  {
    label: 'Access the Console',
    code: `kubectl port-forward svc/fastgateway-frontend 3001:3001 \\
  -n fastgateway-system

# Open http://localhost:3001
# Default username: admin`,
  },
];

export default function QuickStart(): JSX.Element {
  return (
    <section className={styles.quickstart}>
      <div className={styles.quickstartContainer}>
        <p className={styles.sectionLabel}>Get Started</p>
        <h2 className={styles.sectionTitle}>Up and running in minutes</h2>
        <p className={styles.sectionSubtitle}>
          Deploy FastGateway to your Kubernetes cluster with Helm.
          Requires Kubernetes 1.24+ and Envoy Gateway.
        </p>
        <div className={styles.stepsContainer}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>{idx + 1}</span>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock language="bash">{step.code}</CodeBlock>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.links}>
          <Link
            to="/docs/getting-started/installation"
            className={styles.linkPrimary}
          >
            <span>Read the full installation guide</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
