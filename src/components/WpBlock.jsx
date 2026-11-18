import { useLayoutEffect, useRef } from 'react';
import { animate, inView, scroll } from 'framer-motion';

/** Boldz expo-out — long travel, slow settle. */
const EASE = [0.16, 1, 0.3, 1];
const RISE = 120;
const RISE_CARD = 160;
const RISE_MOBILE = 48;
const DURATION_MOBILE = 1.35;

/**
 * Prefer whole blocks. Anything inside <details> / reviews carousel
 * is skipped so dropdowns and slides are never left at opacity 0.
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

function is3dFlipCard(el) {
  if (el.querySelector?.('.xd-card-inner, [class*="card-inner"], [class*="card-back"]')) {
    return true;
  }
  const style = getComputedStyle(el);
  return style.perspective !== 'none' || style.transformStyle === 'preserve-3d';
}

function isMobileMotion() {
  return window.matchMedia('(max-width: 900px), (hover: none)').matches;
}

function collectUnits(root) {
  return [...root.querySelectorAll(UNIT)].filter((el) => {
    if (el.closest('[data-no-motion]')) return false;
    if (el.closest('details')) return false;
    // Reviews carousel owns its own slide motion — Framer breaks it on iOS.
    if (el.closest('#xdge-reviews-2026, .xr-scroller, .xr-slide')) return false;
    // Portrait keeps CSS position (no translate). Grades band stays still.
    if (el.closest('.xd-portrait, .xd-equation, .xd-values, .xd-lower')) return false;
    if (el.tagName === 'IMG' && el.closest('a, button, [class*="icon"], summary, .xd-portrait')) {
      return false;
    }
    const parentUnit = el.parentElement && el.parentElement.closest(UNIT);
    if (parentUnit && root.contains(parentUnit)) return false;
    return true;
  });
}

function armAccordions(root) {
  root.querySelectorAll('details').forEach((details) => {
    details.setAttribute('data-no-motion', '');

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

/** Desktop: scroll-linked Boldz rise. Mobile/iOS: simpler inView (Safari
 *  scroll-timeline linking is flaky and leaves things popping / stuck). */
function armFramer(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const mobile = isMobileMotion();
  const nodes = collectUnits(root);

  if (mobile) {
    const stops = nodes.map((el, i) => {
      const flip = is3dFlipCard(el);
      const clipped = isClippedByAncestor(el, root);
      const rise = flip || clipped ? 0 : RISE_MOBILE;

      el.style.opacity = '0';
      if (rise) el.style.transform = `translate3d(0, ${rise}px, 0)`;
      el.style.willChange = rise ? 'transform, opacity' : 'opacity';

      let played = false;
      return inView(
        el,
        () => {
          if (played) return undefined;
          played = true;
          animate(
            el,
            rise ? { opacity: 1, y: 0 } : { opacity: 1 },
            {
              duration: DURATION_MOBILE,
              ease: EASE,
              delay: Math.min((i % 3) * 0.08, 0.24),
            },
          ).then(() => {
            el.style.willChange = '';
          });
          return undefined;
        },
        { amount: 0.12, margin: '0px 0px -6% 0px' },
      );
    });

    return () => {
      stops.forEach((stop) => stop());
      nodes.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.willChange = '';
      });
    };
  }

  const cancels = nodes.map((el) => {
    const clipped = isClippedByAncestor(el, root);
    const flip = is3dFlipCard(el);
    const isCard = /card/i.test(el.className || '') || el.matches('[class*="-card"]');
    const rise = flip || clipped ? 0 : (isCard ? RISE_CARD : RISE);

    el.style.willChange = rise ? 'transform, opacity' : 'opacity';
    el.style.opacity = '0';
    if (rise) el.style.transform = `translate3d(0, ${rise}px, 0)`;

    const animation = animate(
      el,
      rise ? { opacity: [0, 1], y: [rise, 0] } : { opacity: [0, 1] },
      { ease: EASE },
    );

    const stopScroll = scroll(animation, {
      target: el,
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
    // Reviews carousel drives its own slide motion.
    root.querySelector('#xdge-reviews-2026')?.setAttribute('data-no-motion', '');
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
