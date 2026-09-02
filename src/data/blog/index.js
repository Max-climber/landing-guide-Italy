import { BLOG_CATEGORIES, BLOG_CATEGORY_SLUGS } from './categories.js'
import { BLOG_INDEX_META, BLOG_ORIGIN, BLOG_POSTS_PER_PAGE } from './config.js'
import { BLOG_ARTICLES, BLOG_ARTICLES_BY_SLUG } from './articles/index.js'
import { localizeArticle } from './resolveBlogLocale.js'

export { BLOG_CATEGORIES, BLOG_CATEGORY_SLUGS, BLOG_INDEX_META, BLOG_ORIGIN, BLOG_POSTS_PER_PAGE }
export { BLOG_ARTICLES, BLOG_ARTICLES_BY_SLUG }

export function getPublishedArticles(lang) {
  return BLOG_ARTICLES.filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map((a) => localizeArticle(a, lang))
}

export function getArticleBySlug(slug, lang) {
  const article = BLOG_ARTICLES_BY_SLUG[slug]
  if (!article || article.status !== 'published') return null
  return localizeArticle(article, lang)
}

export function getArticlesByCategory(categorySlug, lang) {
  if (!categorySlug) return getPublishedArticles(lang)
  return getPublishedArticles(lang).filter((a) => a.category === categorySlug)
}

export function paginateArticles(articles, page = 1) {
  const total = articles.length
  const totalPages = Math.max(1, Math.ceil(total / BLOG_POSTS_PER_PAGE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * BLOG_POSTS_PER_PAGE
  return {
    items: articles.slice(start, start + BLOG_POSTS_PER_PAGE),
    page: safePage,
    totalPages,
    total,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  }
}

export function getArticlePath(slug) {
  return `/blog/${slug}/`
}

export function getArticleCanonical(slug) {
  return `${BLOG_ORIGIN}/blog/${slug}/`
}

export function getListCanonical({ category = null, page = 1 } = {}) {
  if (!category && page <= 1) return `${BLOG_ORIGIN}/blog/`
  if (!category) return `${BLOG_ORIGIN}/blog/page/${page}/`
  if (page <= 1) return `${BLOG_ORIGIN}/blog/${category}/`
  return `${BLOG_ORIGIN}/blog/${category}/page/${page}/`
}

export function getListPath({ category = null, page = 1 } = {}) {
  if (!category && page <= 1) return '/blog/'
  if (!category) return `/blog/page/${page}/`
  if (page <= 1) return `/blog/${category}/`
  return `/blog/${category}/page/${page}/`
}

export function getRelatedArticles(article, limit = 3, lang) {
  const manual = (article.relatedSlugs || [])
    .map((slug) => getArticleBySlug(slug, lang))
    .filter(Boolean)
    .filter((a) => a.slug !== article.slug)

  if (manual.length >= limit) return manual.slice(0, limit)

  const fallback = getPublishedArticles(lang).filter(
    (a) => a.slug !== article.slug && a.category === article.category && !manual.some((m) => m.slug === a.slug),
  )

  return [...manual, ...fallback].slice(0, limit)
}

/** Пути для sitemap: только опубликованные и индексируемые URL. */
export function getBlogIndexablePaths() {
  const paths = ['/blog']

  for (const slug of BLOG_CATEGORY_SLUGS) {
    const cat = BLOG_CATEGORIES[slug]
    const hasArticles = getArticlesByCategory(slug).length > 0
    if (cat.indexable && hasArticles) {
      paths.push(`/blog/${slug}`)
    }
  }

  const allArticles = getPublishedArticles()
  const allPages = Math.ceil(allArticles.length / BLOG_POSTS_PER_PAGE)
  for (let p = 2; p <= allPages; p += 1) {
    paths.push(`/blog/page/${p}`)
  }

  for (const slug of BLOG_CATEGORY_SLUGS) {
    const cat = BLOG_CATEGORIES[slug]
    if (!cat.indexable) continue
    const catArticles = getArticlesByCategory(slug)
    const catPages = Math.ceil(catArticles.length / BLOG_POSTS_PER_PAGE)
    for (let p = 2; p <= catPages; p += 1) {
      paths.push(`/blog/${slug}/page/${p}`)
    }
  }

  for (const article of allArticles) {
    paths.push(`/blog/${article.slug}`)
  }

  return paths
}

/** Все blog URL для Apache whitelist (включая noindex-категории). */
export function getBlogServedPaths() {
  const paths = getBlogIndexablePaths()

  for (const slug of BLOG_CATEGORY_SLUGS) {
    const catPath = `/blog/${slug}`
    if (!paths.includes(catPath)) paths.push(catPath)
    const catArticles = getArticlesByCategory(slug)
    const catPages = Math.ceil(catArticles.length / BLOG_POSTS_PER_PAGE)
    for (let p = 2; p <= catPages; p += 1) {
      const pagePath = `/blog/${slug}/page/${p}`
      if (!paths.includes(pagePath)) paths.push(pagePath)
    }
  }

  return paths
}

export function estimateReadingMinutes(blocks) {
  const text = (blocks || [])
    .map((b) => {
      if (b.html) return b.html.replace(/<[^>]+>/g, ' ')
      if (b.text) return b.text
      if (b.items) return b.items.join(' ')
      if (b.rows) return b.rows.flat().join(' ')
      return ''
    })
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
