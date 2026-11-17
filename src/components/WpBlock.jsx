import { useEffect, useRef } from 'react';

/**
 * Renders one block of the WordPress homepage and starts its own scripts.
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

export function WpBlock({ html, reveal = true, theme, label }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) activate(ref.current);
  }, [html]);

  return (
    <div data-section-theme={theme || undefined} className="xg-wp-block">
      <section
        ref={ref}
        className="xg-wp-section"
        data-screen-label={label}
        data-no-reveal={reveal ? undefined : ''}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
