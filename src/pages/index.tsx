import React from 'react';
import Layout from '@theme/Layout';
import HomepageHero from '@site/src/components/HomepageHero';
import TrustBadges from '@site/src/components/TrustBadges';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ProductShowcase from '@site/src/components/ProductShowcase';
import Capabilities from '@site/src/components/Capabilities';
import RouteBuilder from '@site/src/components/RouteBuilder';
import QuickStart from '@site/src/components/QuickStart';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Gateway API Management Simplified"
      description="UI-driven platform for managing Kubernetes Gateway API resources with approval workflows, multi-cluster support, and enterprise security.">
      <HomepageHero />
      <TrustBadges />
      <main>
        <HomepageFeatures />
        <ProductShowcase />
        <Capabilities />
        <RouteBuilder />
        <QuickStart />
      </main>
    </Layout>
  );
}
