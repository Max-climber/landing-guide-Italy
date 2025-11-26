import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-color3 text-white py-8 sm:py-12">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-oswald font-bold text-color1 mb-3 sm:mb-4">
              La Vacanza Bianca
            </h3>
            <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-oswald font-semibold text-color1 mb-3 sm:mb-4 text-base sm:text-lg">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-color1 transition-colors"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-white/80 hover:text-color1 transition-colors"
                >
                  {t('nav.programs')}
                </a>
              </li>
              <li>
                <a
                  href="#resorts"
                  className="text-white/80 hover:text-color1 transition-colors"
                >
                  {t('nav.resorts')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-color1 transition-colors"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-oswald font-semibold text-color1 mb-3 sm:mb-4 text-base sm:text-lg">{t('footer.contacts')}</h4>
            <ul className="space-y-2 text-sm sm:text-base text-white/80">
              <li>{t('footer.email')} artarxi@gmail.com</li>
              <li>{t('footer.phone')} +39 333 143 0647</li>
              <li className="flex space-x-4 mt-4">
                <a
                  href="https://wa.me/393331430647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-color1 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 sm:pt-8 text-center text-white/60">
          <p className="text-xs sm:text-sm">&copy; {currentYear} La Vacanza Bianca. {t('footer.rights')}</p>
          <p className="text-xs mt-2 opacity-50">
            <a target="_blank" href="https://icons8.com/icon/kLORTzuNOM2d/wrapped-gift" className="hover:text-color1 transition-colors">
              Wrapped Gift
            </a> icon by <a target="_blank" href="https://icons8.com" className="hover:text-color1 transition-colors">Icons8</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

