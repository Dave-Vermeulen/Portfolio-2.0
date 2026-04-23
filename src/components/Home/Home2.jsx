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
            I fell in love with problem solving at a young age, this coupled with a knack for
            breaking things has set me up to be a builder. I am a passionate Full Stack Developer
            eager to make a positive impact on the world.
            <br />
            <br />I am fluent in classics like{' '}
            <i>
              <b className={styles.accent}>Java, JavaScript and Python.</b>
            </i>
            <br />
            <br />
            My field of interest is building innovative{' '}
            <i>
              <b className={styles.accent}>tech solutions and products</b>
            </i>{' '}
            — a lover of user stories and following a progressive roadmap, picking the right tools
            to <b className={styles.accent}>get the job done</b>.
            <br />
            <br />
            Whenever possible, I also apply my passion for developing products with{' '}
            <b className={styles.accent}>Node.js</b> and modern JavaScript libraries and frameworks
            like <b className={styles.accent}>React.js and Next.js</b>.
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
