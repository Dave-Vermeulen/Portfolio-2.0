import { useTypewriter } from '../../hooks/useTypewriter.js';
import styles from './Home.module.css';

const STRINGS = [
  'Full-Stack Developer',
  'TypeScript · React · Next.js',
  'Contract-first, MVC-minded',
  'Zod schemas · Drizzle · Postgres',
  'QA turned developer',
  'Co-founder at GO2TECH Africa',
  'Father, husband, Capetonian 🇿🇦',
];

export default function Type() {
  const text = useTypewriter(STRINGS);
  return (
    <span aria-live="polite" className={styles.typewriterLive}>
      {text}
      <span className={styles.typewriterCursor} aria-hidden="true">
        |
      </span>
    </span>
  );
}
