import { useLayoutEffect, useRef } from 'react';
import { animate, inView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const UNIT = 'h1, h2, h3, h4, p, li, article, blockquote, img';

/**
 * Style tags apply through innerHTML. Script tags do not, so they are
 * recreated after mount. Font stylesheets are moved to <head>.
 */
function activate(root) {
  root.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.href;
    if (!href || document.querySelector(`link[data-wp-font="${href}"]`)) return;
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    el.dataset.wpFont = href;
    document.head.appendChild(el);
  });

  root.querySelectorAll('script').forEach((old) => {
    const script = document.createElement('script');
    script.text = old.textContent;
    old.replaceWith(script);
  });
}

function armFramer(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const nodes = [...root.querySelectorAll(UNIT)].filter((el) => {
    const parentUnit = el.parentElement && el.parentElement.closest(UNIT);
    return !(parentUnit && root.contains(parentUnit));
  });

  const stops = nodes.map((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    let played = false;
    return inView(el, () => {
      if (played) return undefined;
      played = true;
      animate(el, { opacity: 1, y: 0 }, { duration: 0.85, ease: EASE });
      return undefined;
    }, { amount: 0.15 });
  });

  return () => stops.forEach((stop) => stop());
}

export function WpBlock({ html, reveal = true, theme, label }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    activate(root);
    if (!reveal) return undefined;
    return armFramer(root);
  }, [html, reveal]);

  return (
    <div data-section-theme={theme || undefined} className="xg-wp-block">
      <section
        ref={ref}
        className="xg-wp-section"
        data-screen-label={label}
        data-no-reveal=""
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
