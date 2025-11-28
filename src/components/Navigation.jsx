import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Navigation = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.programs'), href: '#programs' },
    { name: t('nav.resorts'), href: '#resorts' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-color2 backdrop-blur-md shadow-lg">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          <a
            className="flex items-center flex-shrink-0 min-w-0 h-full"
            href="#"
            aria-label="La Vacanza Bianca"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img
              src="/logo.jpg"
              alt="La Vacanza Bianca"
              className="h-full w-auto object-contain block"
              loading="lazy"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-shrink-0">
            {navItems
              .filter((item) => item.href !== '#contact')
              .map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-color1 hover:text-white transition-colors duration-300 font-oswald font-semibold text-base uppercase tracking-wide border border-transparent hover:border-white/40 rounded-none"
                >
                  {item.name}
                </button>
              ))}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
            <a
              href="#contact"
              onClick={() => scrollToSection('#contact')}
              className="px-6 py-2 bg-color1 text-color3 rounded-none font-oswald font-semibold uppercase tracking-wider hover:bg-color1/90 transition-colors ml-2"
            >
              {t('nav.connect')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-premium-navy/98 backdrop-blur-md border-t border-white/10 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 px-4 text-color1 hover:text-white hover:bg-white/5 transition-colors rounded-lg mx-2 font-semibold"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-white/20 mx-2">
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
            </div>
            <a
              href="#contact"
              onClick={() => scrollToSection('#contact')}
              className="block mx-2 mt-2 px-4 py-3 bg-color1 text-color3 rounded-none font-oswald font-semibold text-center uppercase tracking-wider hover:bg-color1/90 transition-colors"
            >
              {t('nav.connect')}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

