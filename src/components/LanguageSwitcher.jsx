import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Используем SVG флаги вместо эмодзи для совместимости с Windows
  const FlagIcon = ({ country, size = 'w-6 h-6' }) => {
    if (country === 'ru') {
      return (
        <svg className={size} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="160" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#0039a6"/>
          <rect y="320" width="640" height="160" fill="#d52b1e"/>
        </svg>
      )
    }
    if (country === 'en') {
      return (
        <svg className={size} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer transition-transform"
      >
        <FlagIcon country={currentLanguage.code} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 flex gap-2 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl p-2 z-50"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1 rounded transition-all ${
                i18n.language === lang.code
                  ? 'ring-2 ring-color1'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <FlagIcon country={lang.code} size="w-6 h-6" />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default LanguageSwitcher

