import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const NewYearModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const [showCloseButton, setShowCloseButton] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Крестик появляется через 2 секунды после открытия
      const timer = setTimeout(() => {
        setShowCloseButton(true)
      }, 2000)
      
      // Закрытие по Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      window.addEventListener('keydown', handleEscape)
      
      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleEscape)
      }
    } else {
      setShowCloseButton(false)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.5
            }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-gradient-to-br from-premium-navy via-premium-darkBlue to-premium-navy rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Сияющие частицы */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-premium-gold rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Градиентные полосы */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-premium-gold to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>

              {/* Крестик для закрытия */}
              <AnimatePresence>
                {showCloseButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-premium-gold/20 hover:bg-premium-gold/30 rounded-full transition-colors group"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6 text-premium-gold group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Контент */}
              <div className="relative z-10 p-6 sm:p-8">
                {/* Иконка подарка/елочки */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-24 h-24 relative">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                      <rect x="47" y="70" width="6" height="15" fill="#8B4513" />
                      
                      {/* Украшения */}
                      <circle cx="45" cy="30" r="2" fill="#D4AF37" />
                      <circle cx="55" cy="45" r="2" fill="#FF6B6B" />
                      <circle cx="40" cy="55" r="2" fill="#4ECDC4" />
                      <circle cx="60" cy="60" r="2" fill="#D4AF37" />
                      
                      {/* Звезда */}
                      <motion.path
                        d="M50 10 L52 5 L50 8 L48 5 Z"
                        fill="#D4AF37"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Заголовок */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-elegant font-bold text-center mb-4 text-gradient bg-gradient-to-r from-premium-gold via-premium-lightGold to-premium-gold bg-clip-text text-transparent"
                >
                  {t('newYear.title')}
                </motion.h2>

                {/* Скидка */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="text-center mb-6"
                >
                  <div className="inline-block relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="text-6xl sm:text-7xl font-bold text-premium-gold drop-shadow-lg"
                    >
                      15%
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 text-2xl"
                      animate={{
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      🎉
                    </motion.div>
                  </div>
                </motion.div>

                {/* Описание */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-white/90 text-base sm:text-lg mb-6 leading-relaxed"
                >
                  {t('newYear.description')}
                </motion.p>

                {/* Дополнительная информация */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-premium-gold/10 border border-premium-gold/30 rounded-xl p-4 mb-6"
                >
                  <p className="text-center text-premium-lightGold text-sm sm:text-base font-semibold">
                    {t('newYear.deadline')}
                  </p>
                </motion.div>

                {/* Кнопка действия */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  onClick={() => {
                    const element = document.querySelector('#contact')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                      setTimeout(onClose, 500)
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-premium-gold to-premium-lightGold text-premium-navy font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  {t('newYear.cta')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NewYearModal

