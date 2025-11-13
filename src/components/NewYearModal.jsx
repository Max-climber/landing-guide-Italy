import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const NewYearModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const [showCloseButton, setShowCloseButton] = useState(false)
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Крестик появляется через 3 секунды после открытия
      const timer = setTimeout(() => {
        setShowCloseButton(true)
        setCanClose(true)
      }, 3000)
      
      // Закрытие по Escape только после 3 секунд
      const handleEscape = (e) => {
        if (e.key === 'Escape' && canClose) {
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
      setCanClose(false)
    }
  }, [isOpen, onClose, canClose])

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
            className="fixed inset-0 bg-gradient-to-br from-premium-navy/95 via-premium-darkBlue/90 to-premium-navy/95 backdrop-blur-md z-[100]"
            onClick={canClose ? onClose : undefined}
            style={{ cursor: canClose ? 'pointer' : 'default' }}
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
            <div className="relative bg-gradient-to-br from-white via-premium-lightGold/20 to-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden border-2 border-premium-gold/30">
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
                    onClick={canClose ? onClose : undefined}
                    disabled={!canClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-premium-gold/20 hover:bg-premium-gold/30 rounded-full transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={canClose ? { scale: 1.1, rotate: 90 } : {}}
                    whileTap={canClose ? { scale: 0.9 } : {}}
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
                {/* Иконка подарочной коробки */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-24 h-24 relative">
                    <svg
                      viewBox="0 0 120 120"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Основа коробки */}
                      <path
                        d="M30 70 L90 70 L85 100 L35 100 Z"
                        fill="url(#modalBoxGradient1)"
                      />
                      <path
                        d="M25 50 L95 50 L90 70 L30 70 Z"
                        fill="url(#modalBoxGradient2)"
                      />
                      
                      {/* Лента */}
                      <rect x="20" y="58" width="80" height="8" fill="url(#modalRibbonGradient)" />
                      <rect x="56" y="45" width="8" height="30" fill="url(#modalRibbonGradient)" />
                      
                      {/* Бант */}
                      <path d="M45 50 L50 58 L45 66 L40 58 Z" fill="url(#modalBowGradient)" />
                      <path d="M75 50 L80 58 L75 66 L70 58 Z" fill="url(#modalBowGradient)" />
                      <motion.rect
                        x="56"
                        y="55"
                        width="8"
                        height="8"
                        fill="url(#modalBowCenterGradient)"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      />
                      
                      <defs>
                        <linearGradient id="modalBoxGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B4513" />
                          <stop offset="50%" stopColor="#A0522D" />
                          <stop offset="100%" stopColor="#8B4513" />
                        </linearGradient>
                        <linearGradient id="modalBoxGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#A0522D" />
                          <stop offset="50%" stopColor="#CD853F" />
                          <stop offset="100%" stopColor="#A0522D" />
                        </linearGradient>
                        <linearGradient id="modalRibbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="50%" stopColor="#F4E4BC" />
                          <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                        <linearGradient id="modalBowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="50%" stopColor="#FFD700" />
                          <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                        <radialGradient id="modalBowCenterGradient" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="#FFD700" />
                          <stop offset="100%" stopColor="#D4AF37" />
                        </radialGradient>
                      </defs>
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
                  className="text-center text-premium-navy text-base sm:text-lg mb-6 leading-relaxed"
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

