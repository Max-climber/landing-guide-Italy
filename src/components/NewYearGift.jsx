import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const NewYearGift = ({ onClick }) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  // Появление через 5 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Сияющий эффект вокруг подарка */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Вибрирующая анимация */}
      <motion.div
        animate={{
          rotate: [0, -5, 5, -5, 5, 0],
          y: [0, -10, 10, -10, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* Елочка/Подарок */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          {/* Елочка SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Сияющие звездочки вокруг */}
            <motion.circle
              cx="20"
              cy="20"
              r="3"
              fill="#D4AF37"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.circle
              cx="80"
              cy="30"
              r="2.5"
              fill="#D4AF37"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            <motion.circle
              cx="15"
              cy="70"
              r="2"
              fill="#D4AF37"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 1,
              }}
            />

            {/* Елочка */}
            <path
              d="M50 10 L60 35 L50 30 L40 35 Z"
              fill="#2D5016"
              stroke="#1A3A0A"
              strokeWidth="1"
            />
            <path
              d="M50 25 L65 50 L50 45 L35 50 Z"
              fill="#2D5016"
              stroke="#1A3A0A"
              strokeWidth="1"
            />
            <path
              d="M50 40 L70 70 L50 65 L30 70 Z"
              fill="#2D5016"
              stroke="#1A3A0A"
              strokeWidth="1"
            />
            
            {/* Ствол */}
            <rect x="47" y="70" width="6" height="15" fill="#8B4513" />
            
            {/* Украшения на елочке */}
            <circle cx="45" cy="30" r="2" fill="#D4AF37" />
            <circle cx="55" cy="45" r="2" fill="#FF6B6B" />
            <circle cx="40" cy="55" r="2" fill="#4ECDC4" />
            <circle cx="60" cy="60" r="2" fill="#D4AF37" />
            <circle cx="50" cy="50" r="2" fill="#FF6B6B" />
            
            {/* Звезда на верхушке */}
            <motion.path
              d="M50 10 L52 5 L50 8 L48 5 Z"
              fill="#D4AF37"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>

          {/* Дополнительное сияние */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 20px rgba(212, 175, 55, 0.6)',
                '0 0 40px rgba(212, 175, 55, 0.8)',
                '0 0 20px rgba(212, 175, 55, 0.6)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      {/* Текст "Нажми!" */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        animate={{
          y: [0, -5, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-xs sm:text-sm font-bold text-premium-gold bg-premium-navy/90 px-2 py-1 rounded-full shadow-lg">
          🎁 {t('newYear.clickMe')}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default NewYearGift

