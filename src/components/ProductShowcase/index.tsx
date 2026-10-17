import React from 'react';
import styles from './styles.module.css';

export default function ProductShowcase(): React.JSX.Element {
  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src="/img/route-list.webp"
            alt="FastGateway route management interface"
            className={styles.screenshot}
            width={1280}
            height={721}
          />
          <div className={styles.fadeBottom} />
        </div>
      </div>
    </section>
  );
}
