import { site } from '../config/site';

let loaded = false;

export function initAnalytics() {
  const id = site.analyticsId;
  if (!id || loaded || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
  loaded = true;
}

export function trackPageView(path) {
  if (!site.analyticsId || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!site.analyticsId || !window.gtag) return;
  window.gtag('event', name, params);
}
