/**
 * URL для sitemap.xml — только активные страницы.
 * @see ./activeRoutes.js
 */
import { INDEXABLE_ROUTE_PATHS } from './activeRoutes.js'

/** Абсолютный URL с завершающим слэшем (кроме домена). */
export function toSitemapLoc(origin, pathname) {
  const base = origin.replace(/\/+$/, '')
  if (pathname === '/' || pathname === '') return `${base}/`
  const withSlash = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${withSlash.replace(/\/+$/, '')}/`
}

/** Список pathname для sitemap.xml */
export function getSitemapPathnames() {
  const list = [...INDEXABLE_ROUTE_PATHS]
  list.sort((a, b) => {
    if (a === '/') return -1
    if (b === '/') return 1
    return a.localeCompare(b)
  })
  return list
}
