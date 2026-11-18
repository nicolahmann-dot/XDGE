import { useLayoutEffect, useRef } from 'react';
import { animate, scroll } from 'framer-motion';

/** Boldz expo-out — long travel, slow settle. */
const EASE = [0.16, 1, 0.3, 1];
const RISE = 120;
const RISE_CARD = 160;

/**
 * Prefer whole blocks. Anything inside <details> is skipped so dropdown
 * copy is never left at opacity 0.
 */
const UNIT = [
  'article',
  'header',
  '[class*="-card"]',
  '[class*="feature"]',
  '[class*="pathway"]',
  '[class*="dimension"]',
  '[class*="value"]',
  'h1', 'h2', 'h3', 'h4',
  'p', 'li', 'blockquote',
  'img',
  '[class*="button"]',
  '[class*="eyebrow"]',
  '[class*="cta"]',
  'figure',
].join(', ');

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

function isClippedByAncestor(el, root) {
  let node = el.parentElement;
  while (node && node !== root) {
    const { overflow, overflowY, overflowX } = getComputedStyle(node);
    if (/hidden|clip|auto|scroll/.test(`${overflow} ${overflowY} ${overflowX}`)) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}

/** 3D flip cards break if we also put translateY on them — the back face
 *  leaks as a black slab beside the grid. Fade only for those. */
function is3dFlipCard(el) {
  if (el.querySelector?.('.xd-card-inner, [class*="card-inner"], [class*="card-back"]')) {
    return true;
  }
  const style = getComputedStyle(el);
  return style.perspective !== 'none' || style.transformStyle === 'preserve-3d';
}

function collectUnits(root) {
  return [...root.querySelectorAll(UNIT)].filter((el) => {
    if (el.closest('[data-no-motion]')) return false;
    if (el.closest('details')) return false;
    if (el.tagName === 'IMG' && el.closest('a, button, [class*="icon"], summary')) return false;
    const parentUnit = el.parentElement && el.parentElement.closest(UNIT);
    if (parentUnit && root.contains(parentUnit)) return false;
    return true;
  });
}

/**
 * Wrap dropdown bodies for CSS grid height animation.
 * Native <details open> still controls state — no preventDefault fighting.
 */
function armAccordions(root) {
  root.querySelectorAll('details').forEach((details) => {
    details.setAttribute('data-no-motion', '');

    // Clear any leftover Framer inline styles that hide the answers.
    details.querySelectorAll('p, h3, .xu-about-answer, .xu-about-label').forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
    });

    if (details.querySelector(':scope > .xg-details-panel')) return;

    const summary = details.querySelector('summary');
    if (!summary) return;

    const panel = document.createElement('div');
    panel.className = 'xg-details-panel';
    const inner = document.createElement('div');
    inner.className = 'xg-details-panel-inner';

    [...details.childNodes].forEach((node) => {
      if (node === summary) return;
      inner.appendChild(node);
    });

    panel.appendChild(inner);
    details.appendChild(panel);
  });

  return () => {};
}

function armFramer(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const nodes = collectUnits(root);
  const cancels = nodes.map((el) => {
    const clipped = isClippedByAncestor(el, root);
    const flip = is3dFlipCard(el);
    const isCard = /card/i.test(el.className || '') || el.matches('[class*="-card"]');
    // Never translate 3D flip cards — rotateY + translateY leaks the black back.
    const rise = flip || clipped ? 0 : (isCard ? RISE_CARD : RISE);

    el.style.willChange = rise ? 'transform, opacity' : 'opacity';
    el.style.opacity = '0';
    if (rise) el.style.transform = `translate3d(0, ${rise}px, 0)`;

    // Progress follows scroll — long offset window = slow fluid rise,
    // not a quick pop when the element crosses the fold.
    const animation = animate(
      el,
      rise ? { opacity: [0, 1], y: [rise, 0] } : { opacity: [0, 1] },
      { ease: EASE },
    );

    const stopScroll = scroll(animation, {
      target: el,
      // Starts at bottom of viewport, finishes near the top third.
      // That travel distance keeps the move Boldz-slow.
      offset: ['start end', 'start 18%'],
    });

    return () => {
      stopScroll();
      animation.stop();
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
    };
  });

  return () => cancels.forEach((cancel) => cancel());
}

export function WpBlock({ html, reveal = true, theme, label }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    activate(root);
    const stopAccordions = armAccordions(root);
    const stopFramer = reveal ? armFramer(root) : () => {};
    return () => {
      stopAccordions();
      stopFramer();
    };
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
