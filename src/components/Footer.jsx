import { AiFillGithub, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';

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

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>Designed &amp; built by Dawūd Vermeulen</p>
        <p className={styles.copyright}>© {year} DV</p>
        <ul className={styles.socials}>
          {SOCIALS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialLink}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
