import { useState, useRef } from 'react'

/**
 * Компонент карусели изображений для карточек курортов
 * 
 * @param {Array} images - Массив путей к изображениям
 * @param {string} resortName - Название курорта (для alt текста)
 * @param {boolean} isMobile - Флаг мобильного устройства
 * @param {Function} onImageClick - Callback при клике на изображение (работает на всех устройствах)
 */
const ResortImageCarousel = ({ images, resortName, isMobile, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartRef = useRef(null)
  const touchEndRef = useRef(null)
  const touchTimeRef = useRef(null)
  const carouselRef = useRef(null)

  // Минимальное расстояние для свайпа (в пикселях)
  const minSwipeDistance = 50
  // Максимальное время для тапа (в миллисекундах)
  const maxTapTime = 300

  // Обработка начала касания
  const onTouchStart = (e) => {
    const touch = e.touches[0]
    touchStartRef.current = touch.clientX
    touchEndRef.current = null
    touchTimeRef.current = Date.now()
  }

  // Обработка движения касания
  const onTouchMove = (e) => {
    if (touchStartRef.current !== null) {
      touchEndRef.current = e.touches[0].clientX
    }
  }

  // Обработка окончания касания
  const onTouchEnd = () => {
    if (touchStartRef.current === null) return

    const touchTime = Date.now() - touchTimeRef.current
    const startX = touchStartRef.current
    const endX = touchEndRef.current

    // Если не было движения - это клик
    if (endX === null) {
      if (touchTime < maxTapTime) {
        onImageClick?.(currentIndex)
      }
      touchStartRef.current = null
      touchTimeRef.current = null
      return
    }

    const distance = Math.abs(startX - endX)
    const isSwipe = distance > minSwipeDistance

    if (isSwipe) {
      // Это свайп - переключаем изображение
      const isLeftSwipe = startX - endX > minSwipeDistance
      const isRightSwipe = endX - startX > minSwipeDistance

      if (isLeftSwipe) {
        goToNext()
      } else if (isRightSwipe) {
        goToPrevious()
      }
    } else if (touchTime < maxTapTime) {
      // Это короткий тап - открываем модальное окно
      onImageClick?.(currentIndex)
    }

    touchStartRef.current = null
    touchEndRef.current = null
    touchTimeRef.current = null
  }

  // Переход к следующему изображению
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Переход к предыдущему изображению
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Переход к конкретному изображению
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }


  // Если изображений нет, показываем placeholder
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-full bg-premium-gray flex items-center justify-center">
        <p className="text-premium-darkGray text-sm">Нет изображений</p>
      </div>
    )
  }

  // Если только одно изображение, показываем его без навигации
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full">
        <img
          src={images[0]}
          alt={resortName}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onImageClick?.(0)}
        />
      </div>
    )
  }

  // Обработка клика на изображение (для десктопа)
  const handleImageClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onImageClick?.(currentIndex)
  }

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-full overflow-hidden group"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Контейнер изображений */}
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`${resortName} - фото ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer select-none"
          onClick={handleImageClick}
          draggable="false"
        />
      </div>

      {/* Стрелки навигации */}
      {/* На десктопе: появляются при наведении */}
      {/* На мобилке: всегда видны */}
      {images.length > 1 && (isMobile || isHovered) && (
        <>
          {/* Стрелка влево (предыдущее) */}
          <button
            onClick={goToPrevious}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-premium-navy rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 ${
              isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } hover:scale-110 active:scale-95`}
            aria-label="Предыдущее изображение"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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

          {/* Стрелка вправо (следующее) */}
          <button
            onClick={goToNext}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-premium-navy rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 ${
              isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } hover:scale-110 active:scale-95`}
            aria-label="Следующее изображение"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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

      {/* Индикаторы (точки) внизу */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-white w-8 h-2 sm:h-3'
                  : 'bg-white/50 w-2 h-2 sm:h-3 sm:w-3 hover:bg-white/75'
              }`}
              aria-label={`Перейти к изображению ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default ResortImageCarousel

