import { theme } from '../theme';

export function PageLoader() {
  return (
    <div className="xg-page-loader" role="status" aria-label="Loading page">
      <div className="xg-page-loader-inner">
        <img
          src="/assets/New Logo/Artboard 3.png"
          alt=""
          decoding="async"
          className="xg-page-loader-logo"
        />
        <div className="xg-page-loader-bar" aria-hidden="true">
          <div className="xg-page-loader-bar-fill" />
        </div>
      </div>
      <span className="xg-sr-only">Loading…</span>
    </div>
  );
}

export function PageLoaderShell() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PageLoader />
    </div>
  );
}
