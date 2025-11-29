import { useState, useEffect } from 'react'

/**
 * Модальное окно для просмотра изображения в полном размере
 * Работает на всех устройствах (мобильные, планшеты, десктоп)
 * 
 * @param {boolean} isOpen - Открыто ли модальное окно
 * @param {Function} onClose - Callback для закрытия
 * @param {Array} images - Массив путей к изображениям
 * @param {number} initialIndex - Начальный индекс изображения
 * @param {string} resortName - Название курорта
 */
const ImageModal = ({ isOpen, onClose, images, initialIndex = 0, resortName }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Обновление индекса при изменении initialIndex
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex, isOpen])

  // Обработка клавиатуры (ESC для закрытия, стрелки для навигации)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length])

  // Обработка начала касания
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  // Обработка движения касания
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  // Обработка окончания касания (свайп)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Переход к следующему изображению
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Переход к предыдущему изображению
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0 || !isOpen) return null

  return (
    <>
      {/* Затемненный фон */}
      <div
        className="fixed inset-0 bg-black/95 z-50"
        onClick={onClose}
      />

      {/* Контент модального окна */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
        style={{ 
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-3xl overflow-hidden bg-black/70 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            width: '90vw',
            maxWidth: '90vw',
            height: 'auto',
            maxHeight: '90vh',
            aspectRatio: '16/9'
          }}
        >
          {/* Изображение фиксированного размера */}
          <div className="relative w-full h-full">
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${resortName} - фото ${currentIndex + 1}`}
              className="w-full h-full object-contain"
              style={{ display: 'block' }}
            />
          </div>

              {/* Стрелки навигации */}
              {images.length > 1 && (
                <>
                  {/* Стрелка влево */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Предыдущее изображение"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Стрелка вправо */}
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Следующее изображение"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
        </div>
      </div>
    </>
  )
}

export default ImageModal

