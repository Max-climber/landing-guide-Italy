/**
 * Маршруты сайта.
 * INDEXABLE — в sitemap, index, follow.
 * STUB — заглушки noindex, follow (не в sitemap).
 * Синхронизировать с {@link ../public/.htaccess} и {@link ./pages/routes.jsx}.
 */
import { getBlogIndexablePaths, getBlogServedPaths } from './data/blog/index.js'

const CORE_INDEXABLE_ROUTE_PATHS = [
  '/',
  '/italy',
  '/switzerland',
  '/switzerland/st-moritz',
  '/alps/gornolyzhnye-tury',
  '/italy/tury-ozero-como',
  '/italy/tury-como-venezia',
  '/italy/tury-liniya-vershin-dolomity',
  '/italy/tury-arhitektura-sever-italii',
  '/italy/tury-riviera-liguria',
]

export const BLOG_INDEXABLE_PATHS = getBlogIndexablePaths()
export const BLOG_SERVED_PATHS = getBlogServedPaths()

export const INDEXABLE_ROUTE_PATHS = [...CORE_INDEXABLE_ROUTE_PATHS, ...BLOG_INDEXABLE_PATHS]

/** Заглушки «в разработке»: 200 OK, noindex, не в sitemap. */
export const STUB_ROUTE_PATHS = ['/france']

/** Все URL, которым Apache отдаёт index.html (SPA). */
export const SERVED_SPA_ROUTE_PATHS = [
  ...CORE_INDEXABLE_ROUTE_PATHS,
  ...STUB_ROUTE_PATHS,
  ...BLOG_SERVED_PATHS,
]

/** @deprecated Используйте INDEXABLE_ROUTE_PATHS */
export const ACTIVE_ROUTE_PATHS = INDEXABLE_ROUTE_PATHS

export function normalizePathname(pathname) {
  return (pathname || '/').replace(/\/+$/, '') || '/'
}

export function isIndexableRoute(pathname) {
  return INDEXABLE_ROUTE_PATHS.includes(normalizePathname(pathname))
}

export function isServedSpaRoute(pathname) {
  return SERVED_SPA_ROUTE_PATHS.includes(normalizePathname(pathname))
}

export function isStubRoute(pathname) {
  return STUB_ROUTE_PATHS.includes(normalizePathname(pathname))
}
