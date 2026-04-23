import styles from './Stars.module.css';

/**
 * Pure-CSS animated starfield. Three layered shadow grids drift at different speeds
 * to fake parallax depth. No JS, no canvas, no dependencies.
 */
export default function Stars() {
  return (
    <div className={styles.sky} aria-hidden="true">
      <div className={styles.layer1} />
      <div className={styles.layer2} />
      <div className={styles.layer3} />
    </div>
  );
}
