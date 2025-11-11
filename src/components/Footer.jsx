import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-premium-navy text-white py-8 sm:py-12">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-elegant font-bold text-premium-gold mb-3 sm:mb-4">
              La Vacanza Bianca
            </h3>
            <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  {t('nav.programs')}
                </a>
              </li>
              <li>
                <a
                  href="#resorts"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  {t('nav.resorts')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">{t('footer.contacts')}</h4>
            <ul className="space-y-2 text-sm sm:text-base text-white/80">
              <li>{t('footer.email')} info@lavacanzabianca.com</li>
              <li>{t('footer.phone')} +7 (900) 000-00-00</li>
              <li className="flex space-x-4 mt-4">
                <a
                  href="https://wa.me/79627264633"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-premium-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 sm:pt-8 text-center text-white/60">
          <p className="text-xs sm:text-sm">&copy; {currentYear} La Vacanza Bianca. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

