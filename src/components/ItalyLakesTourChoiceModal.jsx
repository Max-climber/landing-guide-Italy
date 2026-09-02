import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const HREF_COMO_GARDA = '/italy/tury-ozero-como/'
const HREF_COMO_VENICE = '/italy/tury-como-venezia/'
const IMG_LAKE_COMO_GARDA = '/images/Italy-page/tours/tours-Lakes.webp'
const IMG_COMO_VENICE = '/images/Italy-page/tours/tours-from-Como-to-Venezia.webp'

/**
 * Выбор тура по озёрам (Комо / Гарда) с главной Италии.
 * @param {{ isOpen: boolean, onClose: () => void, onBeforeTourNavigate: (href: string) => void }} props
 */
const ItalyLakesTourChoiceModal = ({ isOpen, onClose, onBeforeTourNavigate }) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const lakeComoGarda = t('italyPage.tours.lakeComoGarda', { returnObjects: true }) || {}
  const comoVenice = t('italyPage.tours.comoVenice', { returnObjects: true }) || {}

  const handleLinkClick = (href) => () => {
    onBeforeTourNavigate(href)
    onClose()
  }

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-[92] flex items-start justify-center overflow-y-auto p-3 pb-8 pt-6 sm:p-6 sm:pt-8"
      style={{ top: 'var(--site-header-height, 88px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="italy-lakes-modal-title"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />
      <div
        className="relative z-10 my-auto w-full max-w-[960px] max-h-[min(calc(100dvh-var(--site-header-height,88px)-3rem),90vh)] overflow-y-auto overscroll-contain rounded-2xl border border-border-soft bg-bg-card p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-text-main transition-colors hover:bg-bg-warm sm:right-4 sm:top-4"
          aria-label={t('italyPage.lakesModal.closeAria')}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2
          id="italy-lakes-modal-title"
          className="section-title mb-6 pr-10 pt-1 !text-left !text-[clamp(22px,4vw,30px)] sm:mb-8"
        >
          {t('italyPage.lakesModal.title')}
        </h2>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <li className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-base">
            <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg-warm">
              <img
                src={IMG_LAKE_COMO_GARDA}
                alt={typeof lakeComoGarda.title === 'string' ? lakeComoGarda.title : ''}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="mb-2 whitespace-pre-line font-serif text-[clamp(18px,2.2vw,22px)] leading-snug text-text-main" style={{ fontWeight: 300 }}>
                {lakeComoGarda.title}
              </h3>
              <p className="mb-4 flex-1 whitespace-pre-line text-sm leading-6 text-text-light">{lakeComoGarda.route}</p>
              <a
                href={HREF_COMO_GARDA}
                onClick={handleLinkClick(HREF_COMO_GARDA)}
                className="mt-auto inline-flex w-full min-h-[44px] items-center justify-center rounded-[40px] border border-text-main px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
              >
                {t('italyPage.moreDetails')}
              </a>
            </div>
          </li>
          <li className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-base">
            <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg-warm">
              <img
                src={IMG_COMO_VENICE}
                alt={typeof comoVenice.title === 'string' ? comoVenice.title : ''}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="mb-2 whitespace-pre-line font-serif text-[clamp(18px,2.2vw,22px)] leading-snug text-text-main" style={{ fontWeight: 300 }}>
                {comoVenice.title}
              </h3>
              <p className="mb-4 flex-1 whitespace-pre-line text-sm leading-6 text-text-light">{comoVenice.route}</p>
              <a
                href={HREF_COMO_VENICE}
                onClick={handleLinkClick(HREF_COMO_VENICE)}
                className="mt-auto inline-flex w-full min-h-[44px] items-center justify-center rounded-[40px] border border-text-main px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
              >
                {t('italyPage.moreDetails')}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ItalyLakesTourChoiceModal
