import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ArticleToc = ({ headings }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  if (!headings?.length || headings.length < 3) return null

  return (
    <nav aria-label={t('blogPage.tocAria')} className="article-toc mb-8 rounded-xl border border-border-soft bg-bg-card">
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left font-sans text-sm font-medium text-text-main sm:px-6 sm:py-5 md:pointer-events-none md:cursor-default"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{t('blogPage.toc')}</span>
        <span className="md:hidden" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <ol
        className={`article-toc__list border-t border-border-soft px-5 py-4 sm:px-6 sm:py-5 md:!block ${
          open ? 'block' : 'hidden md:block'
        }`}
      >
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${h.id}`}
              className="block py-1.5 font-sans text-sm leading-snug text-text-light no-underline transition-colors hover:text-text-main"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default ArticleToc
