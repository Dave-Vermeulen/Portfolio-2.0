import styles from './Preloader.module.css';

/**
 * Lightweight preloader: full-screen scrim with a spinning ring.
 * Hides itself when `loading` is false.
 *
 * @param {{ loading: boolean }} props
 */
export default function Preloader({ loading }) {
  return (
    <div
      className={`${styles.preloader} ${loading ? '' : styles.hidden}`}
      aria-hidden={!loading}
      role="status"
    >
      <div className={styles.ring} aria-label="Loading" />
    </div>
  );
}
