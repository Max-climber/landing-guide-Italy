import { useTranslation } from 'react-i18next'
import { getArticlePath } from '../../data/blog/index.js'
import { resolveBlogCategory } from '../../data/blog/resolveBlogLocale.js'
import { isEnglishLocale } from '../../utils/isEnglishLocale.js'

const formatDate = (iso, lang) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(isEnglishLocale(lang) ? 'en-GB' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const BlogCard = ({ article, eagerImage = false }) => {
  const { t, i18n } = useTranslation()
  const category = resolveBlogCategory(article.category, i18n.language)
  const categoryHref = category?.path || '/blog/'
  const excerpt = article.excerpt || article.lead || article.metaDescription || ''

  return (
    <article className="blog-card group flex h-full flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
      <a href={getArticlePath(article.slug)} className="block overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-warm">
          <img
            src={article.heroImage}
            alt={article.heroAlt || article.h1}
            width={article.heroWidth || 1200}
            height={article.heroHeight || 750}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading={eagerImage ? 'eager' : 'lazy'}
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 400px"
          />
        </div>
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <a
          href={categoryHref}
          className="mb-2 inline-block w-fit font-sans text-[11px] uppercase tracking-[0.1em] text-text-light transition-colors hover:text-text-main"
        >
          {article.categoryLabel || category?.label}
        </a>
        <h2 className="mb-2 font-serif text-[22px] leading-snug text-text-main sm:text-[24px]" style={{ fontWeight: 500 }}>
          <a
            href={getArticlePath(article.slug)}
            className="text-inherit no-underline transition-colors hover:text-text-main/80"
          >
            {article.h1}
          </a>
        </h2>
        <p className="mb-4 line-clamp-3 flex-1 font-sans text-sm leading-7 text-text-light">{excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] text-[#999]">
          <time dateTime={article.updatedAt || article.publishedAt}>
            {formatDate(article.updatedAt || article.publishedAt, i18n.language)}
          </time>
          {article.readingMinutes ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{t('blogPage.minRead', { n: article.readingMinutes })}</span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default BlogCard
