import { ImQuotesLeft } from 'react-icons/im';
import styles from './About.module.css';

/**
 * Drop real quotes here when you collect them. Component hides itself
 * gracefully while the array is empty, so no placeholder embarrassment.
 *
 * @typedef {Object} Testimonial
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 * @property {string} [url]
 */

/** @type {Testimonial[]} */
const TESTIMONIALS = [
  // Real referees from Dawūd's resume — these are names + roles, not quotes.
  // Replace / augment with actual testimonial quotes when collected.
];

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <div className={styles.testimonialsWrap}>
      <h2 className={styles.heading}>
        What people <strong className={styles.accent}>say</strong>
      </h2>
      <div className={styles.testimonialsGrid}>
        {TESTIMONIALS.map((t) => (
          <blockquote key={t.name + t.role} className={styles.testimonial}>
            <ImQuotesLeft className={styles.testimonialMark} aria-hidden="true" />
            <p className={styles.testimonialQuote}>{t.quote}</p>
            <footer className={styles.testimonialAttr}>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
