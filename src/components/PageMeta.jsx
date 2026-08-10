import { usePageMeta } from '../hooks/usePageMeta';

/** Sets document title, meta tags, and tracks page views on route change. */
export function PageMeta() {
  usePageMeta();
  return null;
}
