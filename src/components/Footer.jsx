import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer bg-bg-base py-20 px-5 pt-[80px] pb-10">
      <div className="footer-container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-5" style={{ boxSizing: 'border-box' }}>
        <div className="footer-brand mb-10">
          <div className="footer-logo font-serif text-[26px] text-text-main mb-3" style={{ fontWeight: '500' }}>
            La Vacanza Bianca
          </div>
          <p className="footer-desc font-sans text-sm text-[#555] leading-[1.6]">
            {t('footer.description')}
          </p>
        </div>

        <div className="social-links flex gap-5 mt-[30px]">
          <a
            href="https://www.instagram.com/la_vacanza_bianca"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="Instagram"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="text-text-main">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" fill="none" strokeWidth="1.5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" fill="none" strokeWidth="1.5"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </a>
          <a
            href="https://t.me/la_vacanza_bianca"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="Telegram"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="text-text-main">
              <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" fill="none" strokeWidth="1.5"/>
            </svg>
          </a>
          <a
            href="https://wa.me/393331430647"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="WhatsApp"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="text-text-main">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" fill="none" strokeWidth="1.5"/>
            </svg>
          </a>
        </div>

        <div className="footer-bottom flex justify-between font-sans text-xs text-[#999] border-t border-black/6 pt-5 mt-10">
          <span>© La Vacanza Bianca, {currentYear}</span>
          <span>Italy</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
