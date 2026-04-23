import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCards.jsx';
import { ALL_TAGS, PROJECTS } from '../../data/projects.js';
import styles from './Projects.module.css';

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = useMemo(
    () => (activeTag === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeTag))),
    [activeTag]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          My Recent <strong className={styles.accent}>Works</strong>
        </h1>
        <p className={styles.intro}>
          A mix of client work, learning exercises and tools I built for humans I know.
        </p>

        <div className={styles.filters} role="tablist" aria-label="Filter projects by tag">
          {['All', ...ALL_TAGS].map((tag) => (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={activeTag === tag}
              className={`${styles.filter} ${activeTag === tag ? styles.filterActive : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className={styles.intro}>No projects with this tag yet.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProjectCard key={p.slug} {...p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
