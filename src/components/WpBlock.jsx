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
  // Only real flip faces — not programme `.xp-card-inner` wrappers.
  if (el.querySelector?.('.xd-card-inner, [class*="card-back"]')) {
    return true;
  }
  const style = getComputedStyle(el);
  return style.perspective !== 'none' || style.transformStyle === 'preserve-3d';
}

function isMobileMotion() {
  return window.matchMedia('(max-width: 900px), (hover: none)').matches;
}

function collectUnits(root) {
  const mobile = isMobileMotion();

  return [...root.querySelectorAll(UNIT)].filter((el) => {
    if (el.closest('[data-no-motion]')) return false;
    if (el.closest('details')) return false;
    // Reviews carousel owns its own slide motion — Framer breaks it on iOS.
    if (el.closest('#xdge-reviews-2026, .xr-scroller, .xr-slide')) return false;
    // Portrait keeps CSS position. Grades band stays still.
    if (el.closest('.xd-portrait, .xd-equation, .xd-values, .xd-lower')) return false;
    // Programme section owns its CSS scroll-rise (header + cards).
    if (el.closest('#xdge-next-step-programmes')) return false;
    if (el.tagName === 'IMG' && el.closest('a, button, [class*="icon"], summary, .xd-portrait')) {
      return false;
    }
    // Mobile distinctive top is handled by armDistinctiveMobileTop().
    if (mobile && el.closest('#xdge-distinctive')) return false;
    const parentUnit = el.parentElement && el.parentElement.closest(UNIT);
    if (parentUnit && root.contains(parentUnit)) return false;
    return true;
  });
}

/** Mobile-only: staggered rise on distinctive top copy (not Grades band / portrait). */
function armDistinctiveMobileTop(root) {
  if (!isMobileMotion()) return () => {};

  const copy = root.querySelector('#xdge-distinctive .xd-hero-copy');
  if (!copy || copy.closest('[data-no-motion]')) return () => {};

  const parts = [
    copy.querySelector('.xd-top-eyebrow'),
    copy.querySelector('.xd-hero-heading'),
    copy.querySelector('.xd-pathways'),
    copy.querySelector('.xd-hero-description'),
    copy.querySelector('.xd-button'),
  ].filter(Boolean);

  if (!parts.length) return () => {};

  parts.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 40px, 0)';
    el.style.willChange = 'transform, opacity';
  });

  let played = false;
  const stopInView = inView(
    copy,
    () => {
      if (played) return undefined;
      played = true;

      parts.forEach((el, i) => {
        animate(
          el,
          { opacity: 1, y: 0 },
          {
            duration: 0.95,
            ease: EASE,
            delay: 0.08 + i * 0.1,
          },
        ).then(() => {
          el.style.willChange = '';
        });
      });

      return undefined;
    },
    { amount: 0.08, margin: '0px 0px -4% 0px' },
  );

  return () => {
    stopInView();
    parts.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
    });
  };
}

/** Programme cards — CSS scroll rise (works on mobile + desktop). */
function armProgrammeCards(root) {
  const section = root.querySelector('#xdge-next-step-programmes');
  if (!section) return () => {};

  const cards = [...section.querySelectorAll('.xp-card')];
  const headerBits = [
    section.querySelector('.xp-eyebrow'),
    section.querySelector('.xp-title'),
    section.querySelector('.xp-subtitle'),
  ].filter(Boolean);

  const targets = [...headerBits, ...cards];
  if (!targets.length) return () => {};

  targets.forEach((el, i) => {
    el.classList.add('xp-scroll-rise');
    el.style.setProperty('--xp-rise-delay', `${i * 0.12}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('xp-scroll-rise-in');
        } else if (entry.boundingClientRect.top > 0) {
          // Scrolled back above — allow replay on the way down again.
          entry.target.classList.remove('xp-scroll-rise-in');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  targets.forEach((el) => io.observe(el));

  return () => {
    io.disconnect();
    targets.forEach((el) => {
      el.classList.remove('xp-scroll-rise', 'xp-scroll-rise-in');
      el.style.removeProperty('--xp-rise-delay');
    });
  };
}

/** Grades + Why it matters — scroll-linked rise (replays with scroll, no hover). */
function armDistinctiveLower(root) {
  const lower = root.querySelector('#xdge-distinctive .xd-lower');
  if (!lower) return () => {};

  const parts = [
    lower.querySelector('.xd-equation'),
    lower.querySelector('.xd-lower-content'),
  ].filter(Boolean);

  if (!parts.length) return () => {};

  const rise = isMobileMotion() ? 48 : 80;

  const cancels = parts.map((el, i) => {
    el.style.willChange = 'transform, opacity';
    el.style.opacity = '0';
    el.style.transform = `translate3d(0, ${rise}px, 0)`;

    const animation = animate(
      el,
      { opacity: [0, 1], y: [rise, 0] },
      { ease: EASE },
    );

    // Tied to scroll progress — reverse on scroll up, replay on scroll down.
    const stopScroll = scroll(animation, {
      target: lower,
      offset: i === 0
        ? ['start end', 'start 28%']
        : ['start 92%', 'start 22%'],
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
  const stopDistinctiveTop = armDistinctiveMobileTop(root);
  const stopDistinctiveLower = armDistinctiveLower(root);
  const stopProgrammeCards = armProgrammeCards(root);

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
      stopDistinctiveTop();
      stopDistinctiveLower();
      stopProgrammeCards();
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
    // Longer scroll range for cards so rise is readable, not snappy.
    const rise = flip || clipped ? 0 : (isCard ? RISE_CARD : RISE);
    const offset = isCard
      ? ['start end', 'start 42%']
      : ['start end', 'start 22%'];

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
      offset,
    });

    return () => {
      stopScroll();
      animation.stop();
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
    };
  });

  return () => {
    stopDistinctiveTop();
    stopDistinctiveLower();
    stopProgrammeCards();
    cancels.forEach((cancel) => cancel());
  };
}

export function WpBlock({ html, reveal = true, theme, label }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    // Allow reviews carousel script to re-bind after React remounts HTML.
    root.querySelector('#xdge-reviews-2026')?.removeAttribute('data-ready');
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
