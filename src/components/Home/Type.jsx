import Typewriter from 'typewriter-effect';

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
  return (
    <Typewriter options={{ strings: STRINGS, autoStart: true, loop: true, deleteSpeed: 50 }} />
  );
}
