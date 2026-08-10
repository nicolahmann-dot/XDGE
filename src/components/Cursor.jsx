import { useEffect, useRef } from 'react';

const SIZE = 24;
const INTERACTIVE = 'a, button, [role="button"], [data-cursor="grow"], input, textarea, select';

export function Cursor() {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!fine.matches || reduced.matches) return undefined;

    document.documentElement.classList.add('xg-custom-cursor');

    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return undefined;

    let currentScale = 1;

    const setScale = (s) => {
      if (s !== currentScale) {
        currentScale = s;
        inner.style.transform = `scale(${s})`;
      }
    };

    const move = (e) => {
      wrap.style.transform = `translate3d(${e.clientX - SIZE / 2}px, ${e.clientY - SIZE / 2}px, 0)`;
    };

    const isInteractive = (target) => !!(target && target.closest && target.closest(INTERACTIVE));

    let hovering = false;
    let pressed = false;

    const updateScale = () => {
      setScale(pressed ? 0.8 : hovering ? 1.8 : 1);
    };

    const over = (e) => { if (isInteractive(e.target)) { hovering = true; updateScale(); } };
    const out = (e) => { if (isInteractive(e.target)) { hovering = false; updateScale(); } };
    const down = () => { pressed = true; updateScale(); };
    const up = () => { pressed = false; updateScale(); };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);

    return () => {
      document.documentElement.classList.remove('xg-custom-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="xg-cursor-wrap"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform',
      }}
    >
      <div
        ref={innerRef}
        className="xdge-cursor"
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid rgba(255,255,255,0.6)',
          transform: 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
    </div>
  );
}
