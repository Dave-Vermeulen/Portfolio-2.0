import { ImPointRight } from 'react-icons/im';
import styles from './About.module.css';

const ACTIVITIES = [
  'Playing with my daughter',
  'Trail running solo in the mountains',
  'Connecting with Allah SWT',
  'The beach — laying in the sun, a good read, and dips in the ocean',
];

export default function AboutCard() {
  return (
    <article className={styles.card}>
      <blockquote className={styles.quote}>
        <p>
          Hi everyone, I am <span className={styles.accent}>Dawūd Vermeulen</span> from{' '}
          <span className={styles.accent}>Cape Town, South Africa.</span>
          <br />
          I am currently employed as a developer at g0g0&apos;s X roads.
          <br />I have pivoted my career from IT Business Operations to Software Development. The
          journey of self-taught development has been a long and rewarding one. With a thirst for
          learning and solving problems I am always looking to get my hands dirty.
        </p>
        <p>Apart from coding, some other activities that I love to do!</p>

        <ul className={styles.activities}>
          {ACTIVITIES.map((a) => (
            <li key={a}>
              <ImPointRight aria-hidden="true" /> {a}
            </li>
          ))}
        </ul>

        <p className={styles.quoteText}>
          &quot;How did it get so late so soon? It&apos;s night before it&apos;s afternoon. December
          is here before it&apos;s June. My goodness how the time has flewn. How did it get so late
          so soon?&quot;
        </p>
        <footer className={styles.cite}>— Dr. Seuss</footer>
      </blockquote>
    </article>
  );
}
