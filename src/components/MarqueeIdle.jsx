import { useEffect } from 'react';

/**
 * MarqueeIdle — stops the auto-scrolling strips while they are off-screen.
 *
 * The marquees (`.xdge-marquee`, `.xdge-footer-marquee`) are `animation:
 * xdge-marquee … linear infinite` plus a standing `will-change: transform`. That
 * combination never stops: the footer strip sits at the bottom of every page and
 * keeps a promoted compositor layer alive and a compositor animation ticking for
 * the whole session — including while the visitor is thousands of pixels away and
 * cannot see it.
 *
 * CSS alone cannot express "pause when out of view", so an IntersectionObserver
 * toggles `.xg-mq-idle`, which pauses the animation and releases `will-change`.
 * The 200px margin means a strip is already running by the time it is on screen,
 * so there is no visible start-up.
 *
 * Note this is hygiene, not a measured fix: scrolling the Insights ↔ footer region
 * up and down was measured at median 16.7ms with 1 frame over 17ms in 480 and zero
 * long tasks, i.e. already smooth in that harness. Two forever-composited layers
 * for invisible content are still worth not paying for, particularly on hardware
 * with less GPU memory headroom than the test machine.
 */
const MARQUEES = '.xdge-marquee, .xdge-footer-marquee';

export function MarqueeIdle() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('xg-mq-idle', !entry.isIntersecting);
        }
      },
      { rootMargin: '200px 0px 200px 0px' }
    );

    // Observing an already-observed element is a no-op, so this is safe to re-run.
    const observeAll = () => {
      for (const el of document.querySelectorAll(MARQUEES)) io.observe(el);
    };
    observeAll();

    // Route changes and lazy chunks bring new strips in; the footer persists but
    // the section ones mount and unmount with their page.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
