import { useLayoutEffect, useRef } from 'react';
import { animate, inView, scroll } from 'framer-motion';

/** Boldz expo-out — long travel, slow settle. */
const EASE = [0.16, 1, 0.3, 1];
const RISE = 92;
const RISE_CARD = 112;
const RISE_MOBILE = 38;
const DURATION_MOBILE = 1.7;

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
  '[class*="expect-item"]',
  '[class*="thin-item"]',
  'h1', 'h2', 'h3', 'h4',
  'p', 'li', 'blockquote',
  'img',
  'figure',
  '[class*="button"]',
  '[class*="eyebrow"]',
  '[class*="cta"]',
  '[class*="explore"]',
  '[class*="subtitle"]',
  '[class*="subheading"]',
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

/** Width-only: touch laptops must still get desktop scroll-linked motion. */
function isMobileMotion() {
  return window.matchMedia('(max-width: 900px)').matches;
}

function collectUnits(root) {
  const mobile = isMobileMotion();

  return [...root.querySelectorAll(UNIT)].filter((el) => {
    if (el.closest('[data-no-motion]')) return false;
    if (el.closest('details')) return false;
    // Reviews slides/scroller own horizontal motion — Framer breaks them.
    // Intro/nav get a dedicated scroll rise via armReviewsEntrance().
    if (el.closest('.xr-scroller, .xr-slide')) return false;
    if (el.closest('#xdge-reviews-2026')) return false;
    // Portrait keeps CSS position.
    if (el.closest('.xd-portrait')) return false;
    // Grades band + programmes use dedicated handlers.
    if (el.closest('.xd-equation, .xd-values, .xd-lower')) return false;
    if (el.closest('#xdge-next-step-programmes')) return false;
    // Major grids + section intros use CSS cascade rises (armSectionCascades).
    if (el.matches(
      '.xl-feature, .xl-eyebrow-wrap, .xl-heading, .xl-editorial, .xdge-card, .xdge-heading-group, .xdge-experience-card, .xdge-experience-eyebrow, .xdge-experience-title, .xdge-experience-subtitle, .xe-card, .xe-eyebrow, .xe-heading-row, .xe-principle, .xe-intro, .xu-dimension, .xu-eyebrow, .xu-heading, .xu-method-statements, .xd-card, .xd-heading-area, .xd-editorial, .xdge-thin-item, .xn-card, .xn-eyebrow, .xn-heading, .xn-intro',
    )) return false;
    if (el.closest(
      '#xdge-site-footer .xdge-footer-top, #xdge-site-footer .xdge-footer-middle, #xdge-what-luxury .xl-editorial, #xdge-who-final .xdge-heading-group, #xdge-editorial .xe-intro, #xdge-experience-v2 .xe-principle, #xdge-deliverables .xd-heading-area, #xdge-deliverables .xd-editorial',
    )) {
      return false;
    }
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

/** Mobile-only: staggered rise on distinctive top copy. */
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
    el.style.transform = 'translate3d(0, 36px, 0)';
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
            duration: 1.35,
            ease: EASE,
            delay: 0.08 + i * 0.11,
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

/** Who Are We accordion rows — staggered scroll rise (open/close stays native). */
function armWhoAboutOptions(root) {
  const list = root.querySelector('#xdge-unified-experience .xu-about-list');
  if (!list) return () => {};

  const items = [...list.querySelectorAll('.xu-about-item')];
  if (!items.length) return () => {};

  items.forEach((el, i) => {
    el.classList.add('xu-about-rise');
    el.style.setProperty('--xu-about-delay', `${0.08 + i * 0.12}s`);
  });

  const listIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((el) => el.classList.add('xu-about-rise-in'));
        } else if (entry.boundingClientRect.top > 0) {
          items.forEach((el) => el.classList.remove('xu-about-rise-in'));
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
  );
  listIo.observe(list);

  return () => {
    listIo.disconnect();
    items.forEach((el) => {
      el.classList.remove('xu-about-rise', 'xu-about-rise-in');
      el.style.removeProperty('--xu-about-delay');
    });
  };
}

/** Find Your XDGE editorial pathway cards — staggered scroll rise. */
function armEditorialCards(root) {
  const grid = root.querySelector('#xdge-editorial .xe-grid');
  if (!grid) return () => {};

  const cards = [...grid.querySelectorAll('.xe-card')];
  if (!cards.length) return () => {};

  cards.forEach((el, i) => {
    el.classList.add('xe-card-rise');
    el.style.setProperty('--xe-card-delay', `${0.08 + i * 0.15}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cards.forEach((el) => el.classList.add('xe-card-rise-in'));
        } else if (entry.boundingClientRect.top > 0) {
          cards.forEach((el) => el.classList.remove('xe-card-rise-in'));
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  );
  io.observe(grid);

  return () => {
    io.disconnect();
    cards.forEach((el) => {
      el.classList.remove('xe-card-rise', 'xe-card-rise-in');
      el.style.removeProperty('--xe-card-delay');
    });
  };
}

/** What to Expect option cards — each card rises when IT enters view. */
function armWhatToExpectOptions(root) {
  const section = root.querySelector('#xdge-unified-experience .xu-expect');
  if (!section) return () => {};

  const items = [...section.querySelectorAll('.xu-expect-item')];
  if (!items.length) return () => {};

  // Observe the card grids (not the tall parent) so rise isn't spent off-screen.
  const grids = [
    section.querySelector('.xu-expect-priority'),
    section.querySelector('.xu-expect-grid'),
  ].filter(Boolean);

  items.forEach((el, i) => {
    el.classList.add('xu-expect-rise');
    // Left/right column cascade: 0,1 then 2,3 then 4,5
    const row = Math.floor(i / 2);
    const col = i % 2;
    el.style.setProperty('--xu-expect-delay', `${0.05 + row * 0.12 + col * 0.08}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const cards = [...entry.target.querySelectorAll('.xu-expect-item')];
        if (entry.isIntersecting) {
          cards.forEach((el) => el.classList.add('xu-expect-rise-in'));
        } else if (entry.boundingClientRect.top > 0) {
          cards.forEach((el) => el.classList.remove('xu-expect-rise-in'));
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
  );

  (grids.length ? grids : [section]).forEach((el) => io.observe(el));

  return () => {
    io.disconnect();
    items.forEach((el) => {
      el.classList.remove('xu-expect-rise', 'xu-expect-rise-in');
      el.style.removeProperty('--xu-expect-delay');
    });
  };
}

/** Reviews section — scroll entrance for intro/nav/stage; slides stay untouched. */
function armReviewsEntrance(root) {
  const section = root.querySelector('#xdge-reviews-2026');
  if (!section) return () => {};

  const targets = [
    section.querySelector('.xr-intro-left'),
    section.querySelector('.xr-heading'),
    section.querySelector('.xr-nav'),
    section.querySelector('.xr-scroller'),
  ].filter(Boolean);

  if (!targets.length) return () => {};

  targets.forEach((el, i) => {
    el.classList.add('xr-scroll-rise');
    el.style.setProperty('--xr-rise-delay', `${i * 0.12}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('xr-scroll-rise-in');
          // Unlock the 3-card stagger on the active slide.
          section.classList.add('xr-section-in');
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('xr-scroll-rise-in');
          if (entry.target.matches('.xr-scroller')) {
            section.classList.remove('xr-section-in');
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
  );

  targets.forEach((el) => io.observe(el));

  return () => {
    io.disconnect();
    section.classList.remove('xr-section-in');
    targets.forEach((el) => {
      el.classList.remove('xr-scroll-rise', 'xr-scroll-rise-in');
      el.style.removeProperty('--xr-rise-delay');
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
    el.style.setProperty('--xp-rise-delay', `${i * 0.15}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('xp-scroll-rise-in');
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('xp-scroll-rise-in');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
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

/**
 * Reliable CSS rise for major homepage grids that need a clear cascade
 * (Who / What features / Experience / Editorial / Next / Method dims).
 * Homepage-only — armed from WpBlock.
 */
function armSectionCascades(root) {
  const groups = [
    // Section intros (clear entrance before grids).
    ['#xdge-what-luxury .xl-eyebrow-wrap, #xdge-what-luxury .xl-heading, #xdge-what-luxury .xl-editorial', 0.13],
    ['#xdge-who-final .xdge-heading-group', 0.11],
    ['#xdge-experience .xdge-experience-eyebrow, #xdge-experience .xdge-experience-title, #xdge-experience .xdge-experience-subtitle', 0.11],
    ['#xdge-experience-v2 .xe-eyebrow, #xdge-experience-v2 .xe-heading-row, #xdge-experience-v2 .xe-principle', 0.11],
    ['#xdge-unified-experience .xu-eyebrow, #xdge-unified-experience .xu-heading, #xdge-unified-experience .xu-method-statements', 0.11],
    ['#xdge-deliverables .xd-heading-area, #xdge-deliverables .xd-editorial', 0.11],
    ['#xdge-editorial .xe-intro', 0.11],
    ['#xdge-next-step .xn-eyebrow, #xdge-next-step .xn-heading, #xdge-next-step .xn-intro', 0.11],
    // Card / feature grids
    ['#xdge-what-luxury .xl-feature', 0.11],
    ['#xdge-who-final .xdge-card', 0.13],
    ['#xdge-experience .xdge-experience-card', 0.13],
    ['#xdge-experience-v2 .xe-card', 0.13],
    ['#xdge-unified-experience .xu-dimension', 0.11],
    ['#xdge-unified-experience .xu-about-title, #xdge-unified-experience .xu-about-photo', 0.13],
    ['#xdge-unified-experience .xu-expect-eyebrow, #xdge-unified-experience .xu-expect-heading', 0.11],
    ['#xdge-next-step .xn-card', 0.13],
    ['#xdge-deliverables .xd-card', 0.11],
    ['#xdge-site-footer .xdge-footer-top > *, #xdge-site-footer .xdge-footer-middle > *', 0.11],
    ['.xdge-thin-strip .xdge-thin-item', 0.09],
  ];

  const cleanups = [];

  groups.forEach(([selector, step]) => {
    const nodes = [...root.querySelectorAll(selector)];
    if (!nodes.length) return;

    nodes.forEach((el, i) => {
      // Flip cards: fade only — translate fights 3D.
      if (is3dFlipCard(el)) {
        el.classList.add('xg-home-fade');
      } else {
        el.classList.add('xg-home-rise');
      }
      el.style.setProperty('--xg-rise-delay', `${i * step}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-in');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );

    nodes.forEach((el) => io.observe(el));
    cleanups.push(() => {
      io.disconnect();
      nodes.forEach((el) => {
        el.classList.remove('xg-home-rise', 'xg-home-fade', 'is-in');
        el.style.removeProperty('--xg-rise-delay');
      });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Distinctive hero — right-side values (“Built Around…” / “Driven By…”). */
function armDistinctiveValues(root) {
  const values = root.querySelector('#xdge-distinctive .xd-values');
  if (!values) return () => {};

  const parts = [
    ...values.querySelectorAll('.xd-value, .xd-value-rule'),
  ];
  const targets = parts.length ? parts : [values];

  targets.forEach((el, i) => {
    el.classList.add('xd-values-rise');
    el.style.setProperty('--xd-values-delay', `${0.1 + i * 0.14}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          targets.forEach((el) => el.classList.add('xd-values-rise-in'));
        } else if (entry.boundingClientRect.top > 0) {
          targets.forEach((el) => el.classList.remove('xd-values-rise-in'));
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  );
  io.observe(values);

  return () => {
    io.disconnect();
    targets.forEach((el) => {
      el.classList.remove('xd-values-rise', 'xd-values-rise-in');
      el.style.removeProperty('--xd-values-delay');
    });
  };
}

/** Grades + Why it matters — scroll-linked rise. */
function armDistinctiveLower(root) {
  const lower = root.querySelector('#xdge-distinctive .xd-lower');
  if (!lower) return () => {};

  const parts = [
    lower.querySelector('.xd-equation'),
    lower.querySelector('.xd-lower-content'),
  ].filter(Boolean);

  if (!parts.length) return () => {};

  const rise = isMobileMotion() ? 44 : 72;

  const cancels = parts.map((el, i) => {
    el.style.willChange = 'transform, opacity';
    el.style.opacity = '0';
    el.style.transform = `translate3d(0, ${rise}px, 0)`;

    const animation = animate(
      el,
      { opacity: [0, 1], y: [rise, 0] },
      { ease: EASE },
    );

    const stopScroll = scroll(animation, {
      target: lower,
      offset: i === 0
        ? ['start end', 'start 36%']
        : ['start 90%', 'start 28%'],
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

/** Desktop: scroll-linked Boldz rise. Mobile: longer inView settle. */
function armFramer(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const mobile = isMobileMotion();
  const nodes = collectUnits(root);
  const stopDistinctiveTop = armDistinctiveMobileTop(root);
  const stopDistinctiveValues = armDistinctiveValues(root);
  const stopDistinctiveLower = armDistinctiveLower(root);
  const stopProgrammeCards = armProgrammeCards(root);
  const stopReviewsEntrance = armReviewsEntrance(root);
  const stopWhoAbout = armWhoAboutOptions(root);
  const stopWhatExpect = armWhatToExpectOptions(root);
  const stopEditorialCards = armEditorialCards(root);
  const stopCascades = armSectionCascades(root);

  // Cascade targets are handled by CSS IO — drop duplicates from Framer list.
  const cascadeSet = new Set(
    root.querySelectorAll('.xg-home-rise, .xg-home-fade, .xp-scroll-rise'),
  );
  const framerNodes = nodes.filter((el) => !cascadeSet.has(el) && !el.closest('.xg-home-rise, .xg-home-fade, .xp-scroll-rise'));

  if (mobile) {
    const stops = framerNodes.map((el, i) => {
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
              delay: Math.min((i % 4) * 0.11, 0.33),
            },
          ).then(() => {
            el.style.willChange = '';
          });
          return undefined;
        },
        { amount: 0.1, margin: '0px 0px -5% 0px' },
      );
    });

    return () => {
      stopDistinctiveTop();
      stopDistinctiveValues();
      stopDistinctiveLower();
      stopProgrammeCards();
      stopReviewsEntrance();
      stopWhoAbout();
      stopWhatExpect();
      stopEditorialCards();
      stopCascades();
      stops.forEach((stop) => stop());
      framerNodes.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.willChange = '';
      });
    };
  }

  const cancels = framerNodes.map((el) => {
    const clipped = isClippedByAncestor(el, root);
    const flip = is3dFlipCard(el);
    const isCard = /card/i.test(el.className || '') || el.matches('[class*="-card"]');
    const rise = flip || clipped ? 0 : (isCard ? RISE_CARD : RISE);
    const offset = isCard
      ? ['start end', 'start 44%']
      : ['start end', 'start 32%'];

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
    stopDistinctiveValues();
    stopDistinctiveLower();
    stopProgrammeCards();
    stopReviewsEntrance();
    stopWhoAbout();
    stopWhatExpect();
    stopEditorialCards();
    stopCascades();
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
    // Keep Framer off slide guts only — scroller marked so collectUnits skips it.
    root.querySelector('#xdge-reviews-2026 .xr-scroller')?.setAttribute('data-no-motion', '');
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
