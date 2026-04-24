import { useEffect, useRef } from 'react';

/**
 * Attaches a page-wide mouse tracker to the returned ref. The element tilts in
 * 3-D to "look at" the cursor no matter where it is on the page.
 *
 * Implementation notes:
 *  - Uses `requestAnimationFrame` with lerp for smooth 60fps motion.
 *  - Writes directly to `element.style.transform` — no React re-renders.
 *  - Respects `prefers-reduced-motion`: opts out entirely.
 *  - Cleans up listener + rAF on unmount.
 *
 * @param {{ maxDeg?: number, smoothness?: number }} [opts]
 * @returns {import('react').MutableRefObject<HTMLElement | null>}
 */
export function useMouseTilt({ maxDeg = 14, smoothness = 0.09 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let running = true;
    let raf = 0;

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      if (!running) return;
      current.x += (target.x - current.x) * smoothness;
      current.y += (target.y - current.y) * smoothness;
      const ry = current.x * maxDeg;
      const rx = -current.y * maxDeg * 0.55;
      el.style.transform = `perspective(1100px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      if (el) el.style.transform = '';
    };
  }, [maxDeg, smoothness]);

  return ref;
}
