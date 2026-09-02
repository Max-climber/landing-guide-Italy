/**
 * Пути для статического пререндера (Sprinthost / Apache).
 * Indexable — в sitemap; stub — noindex, но HTML нужен роботам без JS.
 */
import { INDEXABLE_ROUTE_PATHS, STUB_ROUTE_PATHS } from './activeRoutes.js'

export function getPrerenderPaths() {
  return [...INDEXABLE_ROUTE_PATHS, ...STUB_ROUTE_PATHS]
}
