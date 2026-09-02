import { BLOG_CATEGORY_SLUGS } from '../data/blog/categories.js'
import { BLOG_ARTICLES_BY_SLUG } from '../data/blog/articles/index.js'

/**
 * Разбор pathname блога.
 * @returns {{ type: 'list', category: string|null, page: number } | { type: 'article', slug: string } | null}
 */
export function parseBlogPath(pathname) {
  const path = (pathname || '').replace(/\/+$/, '') || '/'
  if (!path.startsWith('/blog')) return null
  if (path === '/blog') return { type: 'list', category: null, page: 1 }

  const rest = path.slice('/blog'.length)
  if (!rest || rest === '/') return { type: 'list', category: null, page: 1 }

  const segments = rest.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  if (!segments.length) return { type: 'list', category: null, page: 1 }

  if (segments[0] === 'page') {
    const page = Number.parseInt(segments[1], 10)
    if (!page || page < 2) return null
    return { type: 'list', category: null, page }
  }

  if (BLOG_CATEGORY_SLUGS.includes(segments[0])) {
    const category = segments[0]
    if (segments.length === 1) return { type: 'list', category, page: 1 }
    if (segments[1] === 'page') {
      const page = Number.parseInt(segments[2], 10)
      if (!page || page < 2) return null
      return { type: 'list', category, page }
    }
    return null
  }

  if (segments.length === 1) {
    const article = BLOG_ARTICLES_BY_SLUG[segments[0]]
    if (!article || article.status !== 'published') return null
    return { type: 'article', slug: segments[0] }
  }

  return null
}

export function isBlogPath(pathname) {
  return parseBlogPath(pathname) !== null
}
