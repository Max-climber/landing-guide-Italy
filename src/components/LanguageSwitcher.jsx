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
        <svg className="w-5 h-5" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="a">
              <path fillOpacity=".7" d="M-85.3 0h682.6v512h-682.6z"/>
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="translate(80) scale(.94)">
            <g strokeWidth="1pt">
              <path fill="#006" d="M-256 0H768v512H-256z"/>
              <path fill="#fff" d="m-256 0 582 512M768 0L186 512" stroke="#fff" strokeWidth="80.5"/>
              <path fill="#fff" d="m170 0h512v512H170zM-256 170h1024v172H-256z" stroke="#fff" strokeWidth="80.5"/>
              <path fill="#c00" d="m-256 204 582 512M768 204L186 716" stroke="#c00" strokeWidth="53.7"/>
              <path fill="#c00" d="m170 0h512v512H170zM-256 170h1024v172H-256z"/>
            </g>
          </g>
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
        <span className="text-white font-medium text-sm hidden sm:inline">
          {currentLanguage.code.toUpperCase()}
        </span>
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
          className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50"
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
                  className="w-5 h-5 text-premium-gold"
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

