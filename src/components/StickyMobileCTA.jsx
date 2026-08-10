import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HIDE_ON = ['/apply', '/contact'];

export function StickyMobileCTA() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (HIDE_ON.includes(pathname)) {
      setVisible(false);
      return undefined;
    }

    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (HIDE_ON.includes(pathname)) return null;

  return (
    <div
      className={`xg-sticky-cta${visible ? ' is-visible' : ''}`}
      aria-hidden={!visible}
    >
      <Link to="/apply" data-cursor="grow" className="xg-sticky-cta-btn xg-sticky-cta-btn-primary">
        Apply
      </Link>
      <Link to="/contact" data-cursor="grow" className="xg-sticky-cta-btn xg-sticky-cta-btn-secondary">
        Contact
      </Link>
    </div>
  );
}
