import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Используем SVG флаги вместо эмодзи для совместимости с Windows
  const FlagIcon = ({ country }) => {
    if (country === 'ru') {
      return (
        <svg className="w-5 h-5" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="160" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#0039a6"/>
          <rect y="320" width="640" height="160" fill="#d52b1e"/>
        </svg>
      )
    }
    if (country === 'en') {
      return (
        <svg className="w-5 h-5" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="3"/>
          <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2"/>
          <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="4"/>
          <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="2.5"/>
        </svg>
      )
    }
    return null
  }

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
  ]

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
      >
        <FlagIcon country={currentLanguage.code} />
        <motion.svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-50"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                i18n.language === lang.code
                  ? 'bg-premium-gold/20 text-premium-navy font-semibold'
                  : 'text-premium-navy hover:bg-premium-gray/20'
              }`}
            >
              <FlagIcon country={lang.code} />
              <span className="flex-1">{lang.name}</span>
              {i18n.language === lang.code && (
                <motion.svg
                  className="w-5 h-5 text-color1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default LanguageSwitcher

