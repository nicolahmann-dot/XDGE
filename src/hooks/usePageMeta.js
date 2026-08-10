import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultMeta, routeMeta, site } from '../config/site';
import { trackPageView } from '../utils/analytics';

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageMeta(override = {}) {
  const { pathname } = useLocation();
  const base = routeMeta[pathname] || {};
  const title = override.title || base.title || defaultMeta.title;
  const description = override.description || base.description || defaultMeta.description;
  const ogImage = override.ogImage || base.ogImage || defaultMeta.ogImage;
  const canonical = `${site.domain}${pathname === '/' ? '' : pathname}`;

  useEffect(() => {
    document.title = title;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${site.domain}${ogImage}`);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${site.domain}${ogImage}`);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    trackPageView(pathname);
  }, [title, description, ogImage, canonical, pathname]);
}
