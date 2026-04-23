import { BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import styles from './Projects.module.css';

/**
 * @param {{
 *   img: string,
 *   title: string,
 *   description: string,
 *   tags?: string[],
 *   ghLink?: string,
 *   demoLink?: string,
 * }} props
 */
export default function ProjectCards({ img, title, description, tags = [], ghLink, demoLink }) {
  return (
    <article className={styles.card}>
      <img
        src={img}
        alt={`${title} screenshot`}
        loading="lazy"
        width="640"
        height="400"
        className={styles.cardImg}
      />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {tags.length > 0 && (
          <ul className={styles.tags} aria-label="Technologies">
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        <p className={styles.cardText}>{description}</p>
        <div className={styles.actions}>
          {ghLink && (
            <a
              href={ghLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
              aria-label={`${title} source on GitHub`}
            >
              <BsGithub aria-hidden="true" /> GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
              aria-label={`${title} live demo`}
            >
              <CgWebsite aria-hidden="true" /> Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
