import { useEffect, useState } from 'react';
import { theme } from '../theme';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    setEnabled(!mq.matches && !coarse.matches);

    const onMotion = () => setEnabled(!mq.matches && !coarse.matches);
    mq.addEventListener('change', onMotion);
    return () => mq.removeEventListener('change', onMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="xg-scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 1200,
        pointerEvents: 'none',
        background: 'rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: theme.accent,
          transformOrigin: 'left center',
          transition: 'width 0.12s linear',
        }}
      />
    </div>
  );
}
