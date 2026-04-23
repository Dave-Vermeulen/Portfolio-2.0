import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useTheme } from '../hooks/useTheme.js';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={styles.toggle}
    >
      {isDark ? <BsSun aria-hidden="true" /> : <BsMoonStars aria-hidden="true" />}
    </button>
  );
}
