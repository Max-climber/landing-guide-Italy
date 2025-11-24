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
        {/* Подарочная коробка от Icons8 */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28" style={{ perspective: '1000px' }}>
          {/* Сияющие частицы вокруг */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 10}%`,
                top: `${5 + (i % 3) * 5}%`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#D4AF37',
              }}
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

          {/* Объемная вибрация с 3D эффектом */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 5, -5, 3, -3, 0],
              rotateY: [0, -5, 5, -3, 3, 0],
              rotateZ: [0, 2, -2, 1, -1, 0],
              scale: [1, 1.05, 0.98, 1.03, 0.99, 1],
              y: [0, -8, 8, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Вариант 1: Используем большее изображение для лучшего качества */}
            <img
              src="https://img.icons8.com/emoji/96/wrapped-gift.png"
              alt="wrapped-gift"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))',
                imageRendering: 'crisp-edges', // Улучшает качество на ретине
              }}
            />
            {/* Альтернативные варианты (закомментированы):
              Вариант 2: SVG подарок (более четкий, но требует создания SVG)
              Вариант 3: Локальное изображение высокого разрешения (нужно добавить в public/)
              Вариант 4: Использовать иконку из другого источника с лучшим качеством
            */}
          </motion.div>

          {/* Дополнительное сияние вокруг подарка */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              borderRadius: '12px',
            }}
            animate={{
              boxShadow: [
                '0 0 25px rgba(212, 175, 55, 0.7)',
                '0 0 50px rgba(212, 175, 55, 0.9)',
                '0 0 30px rgba(212, 175, 55, 0.8)',
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

