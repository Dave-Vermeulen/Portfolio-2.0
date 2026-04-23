import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AiFillStar,
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';
import { CgFileDocument, CgGitFork } from 'react-icons/cg';
import logo from '../Assets/logo.webp';
import ThemeToggle from './ThemeToggle.jsx';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', Icon: AiOutlineHome, end: true },
  { to: '/about', label: 'About', Icon: AiOutlineUser },
  { to: '/project', label: 'Projects', Icon: AiOutlineFundProjectionScreen },
  { to: '/resume', label: 'Resume', Icon: CgFileDocument },
  { to: '/contact', label: 'Contact', Icon: AiOutlineMail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Primary">
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} onClick={closeMenu} aria-label="Home">
          <img
            src={logo}
            alt="Dawūd Vermeulen logo"
            width="40"
            height="22"
            className={styles.logo}
          />
        </NavLink>

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /> <span /> <span />
        </button>

        <ul id="primary-menu" className={`${styles.menu} ${open ? styles.menuOpen : ''}`}>
          {NAV_ITEMS.map(({ to, label, Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                <Icon aria-hidden="true" /> <span>{label}</span>
              </NavLink>
            </li>
          ))}
          <li className={styles.themeToggleWrap}>
            <ThemeToggle />
          </li>
          <li>
            <a
              href="https://github.com/Dave-Vermeulen"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fork}
              aria-label="GitHub profile"
            >
              <CgGitFork aria-hidden="true" /> <AiFillStar aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
