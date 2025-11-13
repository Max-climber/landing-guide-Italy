import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const NewYearGift = ({ onClick }) => {
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
      className="fixed bottom-20 right-20 sm:bottom-24 sm:right-24 z-50 cursor-pointer"
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
          rotate: [0, -3, 3, -3, 3, 0],
          y: [0, -8, 8, -8, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* Подарочная коробка */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Сияющие частицы вокруг */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={20 + i * 12}
                cy={15 + (i % 3) * 8}
                r="2.5"
                fill="#D4AF37"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Основа коробки - нижняя часть */}
            <motion.path
              d="M30 70 L90 70 L85 100 L35 100 Z"
              fill="url(#boxGradient1)"
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Верхняя часть коробки */}
            <motion.path
              d="M25 50 L95 50 L90 70 L30 70 Z"
              fill="url(#boxGradient2)"
              animate={{
                opacity: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            />
            
            {/* Лента горизонтальная */}
            <motion.rect
              x="20"
              y="58"
              width="80"
              height="8"
              fill="url(#ribbonGradient)"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Лента вертикальная */}
            <motion.rect
              x="56"
              y="45"
              width="8"
              height="30"
              fill="url(#ribbonGradient)"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Бант - левая часть */}
            <motion.path
              d="M45 50 L50 58 L45 66 L40 58 Z"
              fill="url(#bowGradient)"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Бант - правая часть */}
            <motion.path
              d="M75 50 L80 58 L75 66 L70 58 Z"
              fill="url(#bowGradient)"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Центральная часть банта */}
            <motion.rect
              x="56"
              y="55"
              width="8"
              height="8"
              fill="url(#bowCenterGradient)"
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
            
            {/* Блестки на коробке */}
            <motion.circle
              cx="40"
              cy="60"
              r="1.5"
              fill="#F4E4BC"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.circle
              cx="80"
              cy="65"
              r="1.5"
              fill="#F4E4BC"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
            
            {/* Градиенты */}
            <defs>
              <linearGradient id="boxGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B4513" />
                <stop offset="50%" stopColor="#A0522D" />
                <stop offset="100%" stopColor="#8B4513" />
              </linearGradient>
              <linearGradient id="boxGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A0522D" />
                <stop offset="50%" stopColor="#CD853F" />
                <stop offset="100%" stopColor="#A0522D" />
              </linearGradient>
              <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F4E4BC" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <linearGradient id="bowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <radialGradient id="bowCenterGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </radialGradient>
            </defs>
          </svg>

          {/* Дополнительное сияние вокруг коробки */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                '0 0 25px rgba(212, 175, 55, 0.7)',
                '0 0 50px rgba(212, 175, 55, 0.9)',
                '0 0 25px rgba(212, 175, 55, 0.7)',
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
    </motion.div>
  )
}

export default NewYearGift

