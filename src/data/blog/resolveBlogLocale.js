import { isEnglishLocale } from '../../utils/isEnglishLocale.js'
import { BLOG_CATEGORIES } from './categories.js'
import { BLOG_CATEGORIES_EN } from './categories.en.js'
import { BLOG_INDEX_META } from './config.js'
import { BLOG_INDEX_META_EN } from './config.en.js'
import { BLOG_ARTICLES_EN_BY_SLUG } from './articles/index.js'

export function resolveBlogIndexMeta(lang) {
  return isEnglishLocale(lang) ? BLOG_INDEX_META_EN : BLOG_INDEX_META
}

export function resolveBlogCategories(lang) {
  return isEnglishLocale(lang) ? BLOG_CATEGORIES_EN : BLOG_CATEGORIES
}

export function resolveBlogCategory(slug, lang) {
  const categories = resolveBlogCategories(lang)
  return categories[slug] || null
}

export function localizeArticle(article, lang) {
  if (!article) return null
  if (!isEnglishLocale(lang)) return article
  return BLOG_ARTICLES_EN_BY_SLUG[article.slug] || article
}

export function formatBlogPageTitle(base, page, lang) {
  if (page <= 1) return base
  return isEnglishLocale(lang) ? `${base} – page ${page}` : `${base} – страница ${page}`
}
