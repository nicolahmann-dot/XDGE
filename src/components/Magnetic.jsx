import { useRef, useEffect, useState } from 'react';

const STRENGTH = 0.28;

export function Magnetic({ children, as = 'span', style, ...rest }) {
  const Tag = as;
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(fine.matches && !reduced.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const reset = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', reset);
    };
  }, [enabled]);

  return (
    <Tag
      ref={ref}
      style={{
        display: 'inline-flex',
        transition: enabled ? 'transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
