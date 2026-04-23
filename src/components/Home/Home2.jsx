import Tilt from 'react-parallax-tilt';
import { AiFillGithub, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import myImg from '../../Assets/avatar.svg';
import styles from './Home.module.css';

const SOCIALS = [
  { href: 'https://github.com/Dave-Vermeulen', label: 'GitHub', Icon: AiFillGithub },
  { href: 'https://x.com/davevermeul9', label: 'X (Twitter)', Icon: AiOutlineTwitter },
  {
    href: 'https://www.linkedin.com/in/dawud-vermeulen-99a94170/',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
  },
  { href: 'https://www.instagram.com/dave_his_slave/', label: 'Instagram', Icon: AiFillInstagram },
];

export default function Home2() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutGrid}>
        <div className={styles.aboutText}>
          <h2 className={styles.aboutTitle}>
            ALLOW ME TO <span className={styles.accent}>INTRODUCE</span> MYSELF
          </h2>
          <p className={styles.aboutBody}>
            Developer based in Cape Town with a background in{' '}
            <b className={styles.accent}>QA, IT support and operations</b>. I joined{' '}
            <b className={styles.accent}>Tech Genius</b> as a tester, built their automated testing
            infrastructure from the ground up, and was promoted to developer{' '}
            <b className={styles.accent}>seven months later</b>.
            <br />
            <br />I now work full-stack on a production{' '}
            <b className={styles.accent}>TypeScript Next.js application</b> — backend tRPC routers,
            CouchDB and PouchDB data layers, Zod input schemas, and React frontends with MUI and
            React Hook Form. Turborepo monorepo, Docker builds, NextAuth role-based access.
            <br />
            <br />
            Personal preference:{' '}
            <i>
              <b className={styles.accent}>contract-first, MVC-minded</b>
            </i>{' '}
            — Zod schemas as the contract, Drizzle + Postgres underneath, TypeScript types derived
            end-to-end. One source of truth; the compiler catches drift.
            <br />
            <br />
            Outside work I co-founded <b className={styles.accent}>GO2TECH Africa</b>{' '}
            (WhatsApp-first business automation for African SMEs) and run a{' '}
            <b className={styles.accent}>free coding programme</b> for young people in Wynberg. Open
            to mid-level roles — remote, hybrid, or on-site.
          </p>
        </div>
        <div className={styles.avatar}>
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={false}>
            <img
              src={myImg}
              alt="Avatar of Dawūd Vermeulen in a royal blue hoodie"
              width="350"
              height="350"
              className={styles.avatarImg}
            />
          </Tilt>
        </div>
      </div>

      <div className={styles.findMe}>
        <h2>FIND ME ON</h2>
        <p>
          Feel free to <span className={styles.accent}>connect</span> with me
        </p>
        <ul className={styles.socials}>
          {SOCIALS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialIcon}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
