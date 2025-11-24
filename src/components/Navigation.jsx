import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Navigation = ({ scrollY }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsScrolled(scrollY > 50)
  }, [scrollY])

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
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-color2 backdrop-blur-md shadow-lg"
    >
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 flex-shrink-0 min-w-0"
          >
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-elegant font-bold text-color1 whitespace-nowrap overflow-hidden text-ellipsis">
              La Vacanza Bianca
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-black hover:text-color1 transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
            <motion.a
              href="#contact"
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-color1 text-color3 rounded-none font-oswald font-semibold uppercase tracking-wider hover:bg-color1/90 transition-colors ml-2"
            >
              {t('nav.connect')}
            </motion.a>
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-premium-navy/98 backdrop-blur-md border-t border-white/10 pb-4 space-y-1"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 px-4 text-white hover:text-color1 hover:bg-white/5 transition-colors rounded-lg mx-2"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-white/20 mx-2">
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
            </div>
            <motion.a
              href="#contact"
              onClick={() => scrollToSection('#contact')}
              className="block mx-2 mt-2 px-4 py-3 bg-color1 text-color3 rounded-none font-oswald font-semibold text-center uppercase tracking-wider hover:bg-color1/90 transition-colors"
            >
              {t('nav.connect')}
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation

