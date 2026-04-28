import { useTranslation } from 'react-i18next'

const INSTAGRAM_URL =
  'https://www.instagram.com/it.tours.mountains.transfer?igsh=MWF6bHR1M3k4YzJpag=='
const PHONE_E164 = '+393520014647'
const PHONE_DISPLAY = '+39 352 001 4647'
const EMAIL = 'mail@vacanzabianca.ru'

const Footer = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const colTitle = 'font-serif text-[18px] text-text-main mb-4 tracking-[0.03em]'
  const linkClass = 'block font-sans text-sm text-text-light leading-7 no-underline transition-colors hover:text-text-main'
  const muted = 'block font-sans text-sm text-[#aaa] leading-7'

  return (
    <footer className="footer border-t border-black/6 bg-bg-base px-4 pb-10 pt-16 sm:px-6 md:px-8 lg:px-[50px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <div className={colTitle} style={{ fontWeight: 500 }}>
              {t('footer.colTours')}
            </div>
            <a href="/italy/" className={linkClass}>
              {t('footer.italyLink')}
            </a>
            <span className={muted}>
              {t('footer.switzerland')} — {t('footer.soon')}
            </span>
            <span className={muted}>
              {t('footer.alpsLink')} — {t('footer.soon')}
            </span>
          </div>

          <div>
            <div className={colTitle} style={{ fontWeight: 500 }}>
              {t('footer.colInfo')}
            </div>
            <a href="/#about-us" className={linkClass}>
              {t('footer.aboutAnchor')}
            </a>
            <span className={muted}>
              {t('footer.blog')} — {t('footer.soon')}
            </span>
            <a href="/#reviews" className={linkClass}>
              {t('footer.reviewsAnchor')}
            </a>
            <a href="/#faq" className={linkClass}>
              {t('footer.faqAnchor')}
            </a>
          </div>

          <div>
            <div className={colTitle} style={{ fontWeight: 500 }}>
              {t('footer.contacts')}
            </div>
            <a href={`tel:${PHONE_E164}`} className={`${linkClass} text-text-main`}>
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
            </a>
            <div className="mt-5 flex gap-5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex text-text-main" title="Instagram">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" fill="none" strokeWidth="1.5" />
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              <a
                href="https://t.me/la_vacanza_bianca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-text-main"
                title="Telegram"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" fill="none" strokeWidth="1.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/393520014647"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-text-main"
                title="WhatsApp"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/6 pt-6 font-sans text-xs leading-6 text-[#999]">
          © La Vacanza Bianca, {year}. {t('footer.rights')} | {t('footer.privacy')}
        </div>
      </div>
    </footer>
  )
}

export default Footer
