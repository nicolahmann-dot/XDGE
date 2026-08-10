import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { PageLoaderShell } from './PageLoader';

/**
 * Page wrapper — scrolls to top on route change and fades in the new page.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className="xg-page"
      key={pathname}
      style={{ animation: 'xg-page-fadein 1s cubic-bezier(0.22, 1, 0.36, 1) backwards' }}
    >
      <Suspense fallback={<PageLoaderShell />}>
        {outlet}
      </Suspense>
    </div>
  );
}
