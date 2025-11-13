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
        {/* Лыжник */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28">
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Сияющие снежинки вокруг */}
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={15 + i * 14}
                cy={10 + (i % 2) * 5}
                r="2"
                fill="#D4AF37"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}

            {/* Лыжи */}
            <motion.path
              d="M20 100 L25 95 L75 95 L80 100 Z"
              fill="url(#skiGradient)"
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Левая лыжа */}
            <motion.path
              d="M25 95 L30 90 L35 95 L30 100 Z"
              fill="#FFFFFF"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Правая лыжа */}
            <motion.path
              d="M65 95 L70 90 L75 95 L70 100 Z"
              fill="#FFFFFF"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Ботинки */}
            <motion.ellipse
              cx="30"
              cy="95"
              rx="8"
              ry="5"
              fill="url(#bootGradient)"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.ellipse
              cx="70"
              cy="95"
              rx="8"
              ry="5"
              fill="url(#bootGradient)"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            />
            
            {/* Ноги */}
            <motion.rect
              x="28"
              y="75"
              width="4"
              height="20"
              fill="url(#legGradient)"
              animate={{
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.rect
              x="68"
              y="75"
              width="4"
              height="20"
              fill="url(#legGradient)"
              animate={{
                rotate: [0, -2, 0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Тело/куртка */}
            <motion.path
              d="M35 50 L65 50 L68 75 L32 75 Z"
              fill="url(#jacketGradient)"
              animate={{
                opacity: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Рукава */}
            <motion.path
              d="M35 50 L30 45 L28 60 L32 65 Z"
              fill="url(#jacketGradient)"
            />
            <motion.path
              d="M65 50 L70 45 L72 60 L68 65 Z"
              fill="url(#jacketGradient)"
            />
            
            {/* Левая рука с палкой */}
            <motion.g
              animate={{
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.line
                x1="30"
                y1="45"
                x2="20"
                y2="70"
                stroke="url(#poleGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                cx="20"
                cy="70"
                r="3"
                fill="#D4AF37"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.g>
            
            {/* Правая рука с палкой */}
            <motion.g
              animate={{
                rotate: [0, -10, 0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <motion.line
                x1="70"
                y1="45"
                x2="80"
                y2="70"
                stroke="url(#poleGradient)"
                strokeWidth="2"
                strokeLinecap="round"
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
              <motion.circle
                cx="80"
                cy="70"
                r="3"
                fill="#D4AF37"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.g>
            
            {/* Голова */}
            <motion.circle
              cx="50"
              cy="35"
              r="12"
              fill="url(#headGradient)"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Шлем/шапка */}
            <motion.path
              d="M38 30 Q50 25 62 30 Q50 20 38 30"
              fill="url(#helmetGradient)"
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Помпон на шапке */}
            <motion.circle
              cx="50"
              cy="28"
              r="4"
              fill="#D4AF37"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Градиенты */}
            <defs>
              <linearGradient id="skiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E3A5F" />
                <stop offset="50%" stopColor="#0A1929" />
                <stop offset="100%" stopColor="#1E3A5F" />
              </linearGradient>
              <linearGradient id="bootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2C3E50" />
                <stop offset="50%" stopColor="#0A1929" />
                <stop offset="100%" stopColor="#2C3E50" />
              </linearGradient>
              <linearGradient id="legGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E3A5F" />
                <stop offset="100%" stopColor="#0A1929" />
              </linearGradient>
              <linearGradient id="jacketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F4E4BC" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <linearGradient id="poleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8941F" />
              </linearGradient>
              <radialGradient id="headGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#F4E4BC" />
                <stop offset="100%" stopColor="#D4AF37" />
              </radialGradient>
              <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0A1929" />
                <stop offset="50%" stopColor="#1E3A5F" />
                <stop offset="100%" stopColor="#0A1929" />
              </linearGradient>
            </defs>
          </svg>

          {/* Дополнительное сияние вокруг лыжника */}
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

