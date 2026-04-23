import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  // Tell crawlers not to index arbitrary 404 URLs.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.message}>
          This page is <span className={styles.accent}>lost in space</span>.
        </h2>
        <p className={styles.sub}>
          The page you&apos;re looking for doesn&apos;t exist — or maybe it drifted off into the
          void between stars. Either way, let&apos;s get you back on course.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.btn}>
            🏠 Back home
          </Link>
          <Link to="/project" className={`${styles.btn} ${styles.btnGhost}`}>
            👀 See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
