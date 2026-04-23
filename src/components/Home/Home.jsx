import homeLogo from '../../Assets/home-main.svg';
import Type from './Type.jsx';
import Home2 from './Home2.jsx';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.container}>
          <div className={styles.text}>
            <h1 className={styles.heading}>
              Hello World!{' '}
              <span className={styles.wave} role="img" aria-label="waving hand">
                👋
              </span>
            </h1>
            <h2 className={styles.headingName}>
              I&apos;m <strong className={styles.accent}>Dawūd Vermeulen</strong>
              <br />
              <span
                role="img"
                aria-label="surf, avocado, South Africa, prayer beads, mosque, family"
              >
                🌊🥑🇿🇦📿🕌👨‍👩‍👧
              </span>
            </h2>
            <div className={styles.typewriter}>
              <Type />
            </div>
          </div>
          <div className={styles.imageWrap}>
            <img
              src={homeLogo}
              alt="Illustration of a developer at work"
              width="450"
              height="450"
              className={styles.image}
            />
          </div>
        </div>
      </section>
      <Home2 />
    </>
  );
}
