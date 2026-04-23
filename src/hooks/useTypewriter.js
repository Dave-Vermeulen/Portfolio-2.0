import { useEffect, useState } from 'react';

/**
 * Tiny typewriter. Cycles through an array of strings: types each char, pauses,
 * deletes, moves to the next. Zero dependencies; replaces the 40 kB
 * `typewriter-effect` package with ~30 lines.
 *
 * @param {string[]} strings
 * @param {{ typeSpeed?: number, deleteSpeed?: number, pauseMs?: number }} [opts]
 * @returns {string} the current visible text
 */
export function useTypewriter(strings, opts = {}) {
  const { typeSpeed = 65, deleteSpeed = 35, pauseMs = 1600 } = opts;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!strings.length) return undefined;
    const full = strings[index % strings.length];

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % strings.length);
      return undefined;
    }

    const t = setTimeout(
      () => {
        setText((cur) => (deleting ? cur.slice(0, -1) : full.slice(0, cur.length + 1)));
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, strings, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
