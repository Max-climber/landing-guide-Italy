import { useTranslation } from 'react-i18next'
import { getListPath } from '../../data/blog/index.js'

const BlogPagination = ({ category = null, page, totalPages }) => {
  const { t } = useTranslation()

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label={t('blogPage.paginationAria')} className="blog-pagination mt-12 flex flex-col items-center gap-4">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 ? (
          <li>
            <a
              href={getListPath({ category, page: page - 1 })}
              rel="prev"
              className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-border-soft px-3 font-sans text-sm text-text-main no-underline transition-colors hover:border-text-main hover:bg-bg-warm"
            >
              ←
            </a>
          </li>
        ) : null}
        {pages.map((p) => (
          <li key={p}>
            <a
              href={getListPath({ category, page: p })}
              aria-current={p === page ? 'page' : undefined}
              className={`inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border px-3 font-sans text-sm no-underline transition-colors ${
                p === page
                  ? 'border-text-main bg-text-main text-white'
                  : 'border-border-soft text-text-main hover:border-text-main hover:bg-bg-warm'
              }`}
            >
              {p}
            </a>
          </li>
        ))}
        {page < totalPages ? (
          <li>
            <a
              href={getListPath({ category, page: page + 1 })}
              rel="next"
              className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-border-soft px-3 font-sans text-sm text-text-main no-underline transition-colors hover:border-text-main hover:bg-bg-warm"
            >
              →
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default BlogPagination
