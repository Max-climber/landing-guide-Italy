import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  // SVG флаги: русский и английский
  const FlagIcon = ({ country, size = 'w-6 h-6', active = false }) => {
    const baseClass = `${size} transition-opacity ${active ? 'opacity-100 ring-1 ring-offset-1 ring-text-main rounded-sm' : 'opacity-60 hover:opacity-100'}`
    if (country === 'ru') {
      return (
        <svg className={baseClass} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="160" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#0039a6"/>
          <rect y="320" width="640" height="160" fill="#d52b1e"/>
        </svg>
      )
    }
    if (country === 'en') {
      return (
        <svg className={baseClass} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
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

  const currentLang = i18n.language === 'en' ? 'en' : 'ru'

  const setLanguage = (lang) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex items-center gap-2" style={{ zIndex: 10 }}>
      <motion.button
        onClick={setLanguage('ru')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer transition-transform p-0.5 rounded-sm"
        aria-label="Русский"
      >
        <FlagIcon country="ru" active={currentLang === 'ru'} />
      </motion.button>
      <motion.button
        onClick={setLanguage('en')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer transition-transform p-0.5 rounded-sm"
        aria-label="English"
      >
        <FlagIcon country="en" active={currentLang === 'en'} />
      </motion.button>
    </div>
  )
}

export default LanguageSwitcher

