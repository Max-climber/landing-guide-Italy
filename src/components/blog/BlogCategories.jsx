import { useTranslation } from 'react-i18next'
import { getListPath } from '../../data/blog/index.js'
import { resolveBlogCategories } from '../../data/blog/resolveBlogLocale.js'

const BlogCategories = ({ activeCategory = null }) => {
  const { t, i18n } = useTranslation()
  const categories = resolveBlogCategories(i18n.language)

  const items = [
    { slug: null, label: t('blogPage.allArticles'), path: getListPath({ category: null, page: 1 }) },
    ...Object.values(categories).map((cat) => ({
      slug: cat.slug,
      label: cat.label,
      path: cat.path,
    })),
  ]

  return (
    <nav aria-label={t('blogPage.categoriesAria')} className="blog-categories">
      <ul className="flex flex-wrap gap-2 sm:gap-3">
        {items.map((item) => {
          const isActive = activeCategory === item.slug || (!activeCategory && !item.slug)
          return (
            <li key={item.slug || 'all'}>
              <a
                href={item.path}
                className={`inline-flex rounded-full border px-4 py-2 font-sans text-[12px] uppercase tracking-[0.08em] no-underline transition-all duration-200 sm:text-[13px] ${
                  isActive
                    ? 'border-text-main bg-text-main text-white'
                    : 'border-border-soft bg-bg-card text-text-main hover:border-text-main/40 hover:bg-bg-warm'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlogCategories
