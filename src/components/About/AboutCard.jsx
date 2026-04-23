import { ImPointRight } from 'react-icons/im';
import styles from './About.module.css';

const WINS = [
  'Promoted from Software Tester to Developer at Tech Genius in 7 months',
  'Built a Playwright E2E suite from zero to 60+ automated test cases',
  'Co-founded GO2TECH Africa — WhatsApp-first automation for African SMEs',
  'Run a free daily coding programme for ages 6–25 at The Open Mosque, Wynberg',
];

const ACTIVITIES = [
  'Raising a tiny human with my wife',
  'Trail running solo in the Cape mountains',
  'Keeping my connection with Allah ﷻ',
  'The beach — sun, a good book, dips in the Atlantic',
  'Writing on Normally 🍋 about Clojure, ADHD and faith',
];

export default function AboutCard() {
  return (
    <article className={styles.card}>
      <blockquote className={styles.quote}>
        <p>
          Hi, I&apos;m <span className={styles.accent}>Dawūd Vermeulen</span> — a full-stack
          developer based in <span className={styles.accent}>Cape Town, South Africa</span>. I came
          up through QA, IT support and operations before pivoting into dev full-time.
        </p>
        <p>
          I ship on a production{' '}
          <span className={styles.accent}>TypeScript · Next.js · tRPC · CouchDB</span> stack at Tech
          Genius, write Zod input schemas, and maintain the Playwright E2E suite I built during my
          QA days. Personal projects lean into{' '}
          <span className={styles.accent}>TS + Postgres + Drizzle + Zod + React</span> — I like my
          compile-time errors loud and my runtime surprises quiet.
        </p>
        <p>
          Philosophy: <span className={styles.accent}>MVC with a contract-first paradigm</span>. The
          schema (Zod, Drizzle) is the source of truth; types fall out of it; the compiler tells me
          when I break the contract. Simple, boring, reliable.
        </p>

        <p className={styles.quoteText}>Recent wins:</p>
        <ul className={styles.activities}>
          {WINS.map((w) => (
            <li key={w}>
              <ImPointRight aria-hidden="true" /> {w}
            </li>
          ))}
        </ul>

        <p>Apart from code, some things I love:</p>
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
