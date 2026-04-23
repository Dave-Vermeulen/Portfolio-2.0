import { HiOutlineExternalLink } from 'react-icons/hi';
import styles from './Home.module.css';

/**
 * Most recent blog posts from Normally 🍋 (equalsto.me).
 * Swap this array when you publish something new; or wire to an RSS endpoint later.
 */
const LATEST_POSTS = [
  { title: 'The 5 Year Old Servant!', date: '2025-06-22', tags: ['Parenting', 'SLAA'] },
  {
    title: 'Functional First!',
    date: '2025-06-21',
    tags: ['Functional', 'Clojure', 'OOP'],
  },
  { title: 'Oh Hello There Clojure!', date: '2025-06-20', tags: ['Clojure', 'Lisp'] },
];

const BLOG_URL = 'https://equalsto.me/';

export default function BlogCard() {
  return (
    <section className={styles.blog} aria-labelledby="blog-heading">
      <h2 id="blog-heading" className={styles.blogHeading}>
        Latest from <span className={styles.accent}>Normally 🍋</span>
      </h2>
      <p className={styles.blogSub}>
        Accounts of a human being&apos;s spiritual experience — Clojure, faith and ADHD.
      </p>
      <ul className={styles.blogList}>
        {LATEST_POSTS.map((post) => (
          <li key={post.title} className={styles.blogItem}>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.blogLink}
            >
              <div>
                <div className={styles.blogTitle}>{post.title}</div>
                <div className={styles.blogMeta}>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-ZA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.blogTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <HiOutlineExternalLink aria-hidden="true" className={styles.blogExternal} />
            </a>
          </li>
        ))}
      </ul>
      <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className={styles.blogCta}>
        Read all posts &rarr;
      </a>
    </section>
  );
}
