import { lazy, Suspense } from 'react';
import aboutAvatar from '../../Assets/about.webp';
import AboutCard from './AboutCard.jsx';
import Techstack from './Techstack.jsx';
import Timeline from './Timeline.jsx';
import Testimonials from './Testimonials.jsx';
import Toolstack from './Toolstack.jsx';
import styles from './About.module.css';

// GitHub calendar pulls in ~30 kB + a network fetch — lazy-load so the rest of
// /about is cheap, and users who don't scroll never pay for it.
const Github = lazy(() => import('./Github.jsx'));

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.introText}>
            <h1 className={styles.title}>
              Know Who <strong className={styles.accent}>I&apos;am</strong>
            </h1>
            <AboutCard />
          </div>
          <div className={styles.introImg}>
            <img
              src={aboutAvatar}
              alt="Illustration of a laptop with a glowing screen"
              loading="lazy"
              decoding="async"
              width="500"
              height="345"
              className={styles.image}
            />
          </div>
        </div>

        <Timeline />

        <h2 className={styles.heading}>
          Professional <strong className={styles.accent}>Skillset</strong>
        </h2>
        <Techstack />

        <h2 className={styles.heading}>
          <strong className={styles.accent}>Tools</strong> I use
        </h2>
        <Toolstack />

        <Testimonials />

        <Suspense fallback={null}>
          <Github />
        </Suspense>
      </div>
    </section>
  );
}
