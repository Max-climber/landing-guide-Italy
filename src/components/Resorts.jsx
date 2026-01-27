import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ImageModal from './ImageModal'
import ContactModal from './ContactModal'

const Resorts = () => {
  const { t } = useTranslation()

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [modalImage, setModalImage] = useState({ isOpen: false, images: [], index: 0, resortName: '' })
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [touchStart, setTouchStart] = useState({})
  const [touchEnd, setTouchEnd] = useState({})

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const getResortData = (key) => ({
    name: t(`resorts.resorts.${key}.name`),
    nameEn: t(`resorts.resorts.${key}.nameEn`),
    region: t(`resorts.resorts.${key}.region`),
    description: t(`resorts.resorts.${key}.description`),
    trails: t(`resorts.resorts.${key}.trails`),
    elevation: t(`resorts.resorts.${key}.elevation`),
    difficulty: t(`resorts.resorts.${key}.difficulty`),
    airportDistance: t(`resorts.resorts.${key}.airportDistance`),
    airportFrom: t(`resorts.resorts.${key}.airportFrom`),
    distance: t(`resorts.resorts.${key}.distance`),
    highlights: t(`resorts.resorts.${key}.highlights`, { returnObjects: true }),
  })

  const getResortImages = (resortFolder) => {
    // Для новых изображений из папки "Изображения по курортам"
    const imageMap = {
      'piani-di-bobbio': ['Заставка.jpg', '2.jpg', '3.jpg', '4.jpg'],
      'sankt-moritz': ['Заставка.jpg', '2.jpg', '3.jpg', '4.jpg'],
      'valmalenco': ['Заствака.jpg', '2.jpg', '3.jpg', '4.jpg'], // Опечатка в оригинале
    }
    
    if (imageMap[resortFolder]) {
      return imageMap[resortFolder].map(img => `/images/resorts/${resortFolder}/${img}`)
    }
    
    // Fallback для других курортов
    const imageCounts = {
      'madesimo': 4,
      'bivio': 3,
      'aprica': 6,
      'livigno': 6,
    }
    
    const count = imageCounts[resortFolder] || 0
    const images = []
    for (let i = 1; i <= count; i++) {
        if (resortFolder === 'livigno' && i === 2) {
          images.push(`/images/resorts/${resortFolder}/${i}.webp`)
        } else {
          images.push(`/images/resorts/${resortFolder}/${i}.jpg`)
        }
      }
    return images
  }

  const handleImageClick = (resortName, resortFolder, imageIndex = 0) => {
    const images = getResortImages(resortFolder)
    setModalImage({
      isOpen: true,
      images,
      index: imageIndex,
      resortName,
    })
  }


  const handleCarouselPrev = (e, resortId, images, currentIndex) => {
    if (e) e.stopPropagation()
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentImageIndex({ ...currentImageIndex, [resortId]: prevIndex })
  }

  const handleCarouselNext = (e, resortId, images, currentIndex) => {
    if (e) e.stopPropagation()
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentImageIndex({ ...currentImageIndex, [resortId]: nextIndex })
  }

  // Обработка свайпа для мобильных устройств
  const minSwipeDistance = 50

  const onTouchStart = (e, resortId) => {
    setTouchEnd({ ...touchEnd, [resortId]: null })
    setTouchStart({ ...touchStart, [resortId]: e.targetTouches[0].clientX })
  }

  const onTouchMove = (e, resortId) => {
    setTouchEnd({ ...touchEnd, [resortId]: e.targetTouches[0].clientX })
  }

  const onTouchEnd = (resortId, images, currentIndex) => {
    if (!touchStart[resortId] || !touchEnd[resortId]) return
    
    const distance = touchStart[resortId] - touchEnd[resortId]
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleCarouselNext(null, resortId, images, currentIndex)
    } else if (isRightSwipe) {
      handleCarouselPrev(null, resortId, images, currentIndex)
    }
  }

  // Только три курорта из HTML дизайна
  const resorts = [
    {
      id: 1,
      ...getResortData('pianiDiBobbio'),
      folder: 'piani-di-bobbio',
    },
    {
      id: 2,
      ...getResortData('valmalenco'),
      folder: 'valmalenco',
    },
    {
      id: 3,
      ...getResortData('sanktMoritz'),
      folder: 'sankt-moritz',
    },
  ]

  return (
    <>
      <section
        id="resorts"
        className="section-block resorts py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-5 text-center bg-bg-base"
    >
        <h2 className="section-header-title font-serif text-[42px] text-text-main mb-5 tracking-[0.02em]" style={{ fontWeight: '300' }}>
            {t('resorts.title')}
          </h2>
        <p className="section-header-desc text-lg font-sans text-text-light mb-[40px] sm:mb-[50px] md:mb-[60px]" style={{ fontWeight: '300' }}>
            {t('resorts.subtitle')}
          </p>
        
        <div className="resorts-grid flex justify-center gap-[30px] max-w-[1200px] mx-auto flex-wrap px-4 sm:px-6 md:px-6 lg:px-8 xl:px-5" style={{ boxSizing: 'border-box' }}>
          {resorts.map((resort) => {
            const images = getResortImages(resort.folder)
            const currentIndex = currentImageIndex[resort.id] || 0
            const currentImage = images[currentIndex] || images[0] || '/images/resorts/piani-di-bobbio/1.jpg'
            
            return (
              <div
                key={resort.id}
                className="resort-card bg-bg-card border border-border-soft rounded-xl w-[350px] min-w-[350px] max-w-[350px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-transform duration-300 flex flex-col text-left hover:-translate-y-1 flex-shrink-0 group"
                style={{ boxSizing: 'border-box' }}
              >
                <div 
                  className="resort-img-box h-[240px] w-full overflow-hidden relative touch-pan-y"
                  onTouchStart={(e) => onTouchStart(e, resort.id)}
                  onTouchMove={(e) => onTouchMove(e, resort.id)}
                  onTouchEnd={() => onTouchEnd(resort.id, images, currentIndex)}
                  style={{ touchAction: 'pan-y pinch-zoom' }}
                >
                  <img
                    src={currentImage}
                    alt={resort.name}
                    className="resort-img w-full h-full object-cover transition-transform duration-300 cursor-pointer select-none"
                    onClick={() => handleImageClick(resort.name, resort.folder, currentIndex)}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    onError={(e) => {
                      e.target.src = '/images/resorts/piani-di-bobbio/1.jpg'
                    }}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handleCarouselPrev(e, resort.id, images, currentIndex)}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                          (isMobile || isTablet) ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Previous image"
                        style={{ pointerEvents: (isMobile || isTablet) ? 'auto' : 'auto' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleCarouselNext(e, resort.id, images, currentIndex)}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                          (isMobile || isTablet) ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Next image"
                        style={{ pointerEvents: (isMobile || isTablet) ? 'auto' : 'auto' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {/* Индикаторы для мобильных */}
                      {(isMobile || isTablet) && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                          {images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
<<<<<<< HEAD
                </div>
                
                <div className="resort-content p-[30px] flex-grow flex flex-col">
                  <div className="resort-title text-[28px] font-serif mb-1 text-text-main" style={{ fontWeight: '300' }}>
                    {resort.nameEn || resort.name}
                  </div>
                  <div className="resort-subtitle text-[22px] font-serif text-text-main mb-[15px]" style={{ fontWeight: '400' }}>
                    {resort.region}
                  </div>
                  <div className="resort-desc font-sans text-[15px] text-text-light leading-[1.6] mb-5" style={{ fontWeight: '400' }}>
                    {resort.description}
                  </div>
                  
                  <div className="resort-stats grid grid-cols-2 gap-[15px] mb-5 font-sans text-xs text-text-main">
                    {/* Геолокация */}
                    <div className="stat-item flex flex-col items-start">
                      <div className="stat-icon-wrapper mb-2">
                        <img 
                          src="/images/infographics/resort-distance.png" 
                          alt="Расстояние" 
                          className="w-6 h-6 object-contain"
                          style={{ mixBlendMode: 'multiply' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="stat-value font-semibold text-[13px] mb-1 uppercase" style={{ fontWeight: '600' }}>
                        {resort.distance}
                      </div>
                      <div className="stat-label text-[11px] text-text-light leading-[1.4]" style={{ fontWeight: '400' }}>
                        Расстояние от аэропорта {resort.airportFrom}
                      </div>
=======

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-premium-gray/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">📍</span>
                        <span className="text-xs text-premium-darkGray font-medium">{t('resorts.distanceFromAirport')}</span>
                      </div>
                      <p className="text-premium-navy font-bold text-xs">{resort.distance}</p>
>>>>>>> 033120d62b2d23478db4a5acc4631cdf9622de9f
                    </div>
                    
                    {/* Горы */}
                    <div className="stat-item flex flex-col items-start">
                      <div className="stat-icon-wrapper mb-2">
                        <img 
                          src="/images/infographics/resort-altitude.png" 
                          alt="Высота" 
                          className="w-6 h-6 object-contain"
                          style={{ mixBlendMode: 'multiply' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="stat-value font-semibold text-[13px] mb-1 uppercase" style={{ fontWeight: '600' }}>
                        {resort.elevation}
                      </div>
                      <div className="stat-label text-[11px] text-text-light leading-[1.4]" style={{ fontWeight: '400' }}>
                        Высота курорта
                      </div>
                    </div>
                    
                    {/* Лыжник */}
                    <div className="stat-item flex flex-col items-start">
                      <div className="stat-icon-wrapper mb-2">
                        <img 
                          src="/images/infographics/resort-level.png" 
                          alt="Уровень" 
                          className="w-6 h-6 object-contain"
                          style={{ mixBlendMode: 'multiply' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="stat-value font-semibold text-[13px] mb-1 uppercase" style={{ fontWeight: '600' }}>
                        {resort.difficulty}
                      </div>
                      <div className="stat-label text-[11px] text-text-light leading-[1.4]" style={{ fontWeight: '400' }}>
                        Уровень катания
                      </div>
                    </div>
<<<<<<< HEAD
                    
                    {/* Линейка */}
                    <div className="stat-item flex flex-col items-start">
                      <div className="stat-icon-wrapper mb-2">
                        <img 
                          src="/images/infographics/resort-pistes.png" 
                          alt="Трассы" 
                          className="w-6 h-6 object-contain"
                          style={{ mixBlendMode: 'multiply' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="stat-value font-semibold text-[13px] mb-1 uppercase" style={{ fontWeight: '600' }}>
                        {resort.trails}
                      </div>
                      <div className="stat-label text-[11px] text-text-light leading-[1.4]" style={{ fontWeight: '400' }}>
                        Общая протяженность трасс
                      </div>
                    </div>
                  </div>

                  <div className="resort-features mb-[25px] text-left bg-[#F9F9F9] p-[15px] rounded-lg">
                    <div className="features-title font-semibold text-[13px] uppercase mb-[10px] font-sans text-text-main">
                      {t('resorts.features')}
                    </div>
                    <ul className="p-0 m-0 list-none">
                      {resort.highlights && resort.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="font-sans text-xs mb-1.5 pl-5 relative leading-[1.4] text-text-light"
                          style={{ fontWeight: '400' }}
                        >
                          <span className="absolute left-0 text-text-main" style={{ fontWeight: 'bold' }}>✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

=======
                    <div className="bg-premium-gray/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">📏</span>
                        <span className="text-xs text-premium-darkGray font-medium">{t('resorts.trails')}</span>
                      </div>
                      <p className="text-premium-navy font-bold text-sm">{resort.trails}</p>
                    </div>
                  </div>

>>>>>>> 033120d62b2d23478db4a5acc4631cdf9622de9f
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="btn w-full px-[30px] py-4 mt-5 font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5"
                    style={{ fontWeight: '500' }}
                  >
                    {t('resorts.selectTourButton')}
                  </button>
                </div>
              </div>
<<<<<<< HEAD
            )
          })}
=======
            ))}
            
            {/* Кнопка "Больше курортов" */}
            <div className="mt-6">
              <button
                onClick={() => setShowAllResorts(true)}
                className="w-full px-6 py-4 bg-color3 text-color1 rounded-lg font-oswald font-bold text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors shadow-lg"
              >
                {t('resorts.moreResorts')}
              </button>
            </div>
          </>
        ) : (
          // Десктопный вид или все курорты на мобилке
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8`}>
          {resorts.map((resort, index) => (
            <div
              key={resort.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all relative flex flex-col ${
                resort.discount ? 'ring-4 ring-premium-gold ring-opacity-50' : ''
              } ${resort.isFeatured ? 'border-2 border-premium-gold' : ''} ${
                  index === resorts.length - 1 && resorts.length % 3 === 1 && !isMobile ? 'lg:col-start-2' : ''
              }`}
            >
                {/* Discount Badge */}
              {resort.discount && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-color3 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-none font-oswald font-bold text-sm sm:text-lg uppercase tracking-wider shadow-lg">
                  {t('resorts.discount', { value: resort.discount })}
                </div>
              )}

              {/* Featured Badge */}
              {resort.isFeatured && !resort.discount && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-color2 text-color1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-none font-oswald font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg">
                  {t('resorts.recommended')}
                </div>
              )}

              {/* На мобилке показываем только заголовок и кнопку, на десктопе - все */}
              {isMobile ? (
                <>
                  <div className="relative h-32 overflow-hidden">
                    <div className="relative w-full h-full">
                      <ResortImageCarousel
                        images={getResortImages(resort.folder, resort.image, resort.imageOrder)}
                        resortName={resort.name}
                        isMobile={isMobile}
                        onImageClick={(imageIndex) =>
                          handleImageClick(resort.id, resort.name, resort.folder, resort.image, resort.imageOrder, imageIndex)
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/20 via-transparent to-transparent pointer-events-none z-10" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-oswald font-bold text-premium-navy mb-0.5">
                      {resort.name}
                    </h3>
                    <p className="text-premium-darkGray text-xs font-medium mb-3">{resort.region}</p>
                    <button
                      onClick={() => setSelectedResort(selectedResort === resort.id ? null : resort.id)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-color2 text-color1 rounded-lg font-semibold text-sm hover:bg-color2/80 transition-colors"
                    >
                      <span>{selectedResort === resort.id ? t('resorts.hideFeatures') : t('resorts.showFeatures')}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${selectedResort === resort.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {selectedResort === resort.id && (
                      <div className="mt-3 pt-3 border-t-2 border-premium-gray">
                        <p className="text-premium-darkGray mb-3 leading-relaxed text-xs">
                          {resort.description}
                        </p>
                        {resort.url && (
                          <a
                            href={resort.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-color1 hover:text-premium-navy font-semibold mb-3 transition-colors"
                          >
                            <span>{t('resorts.learnMore')}</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-premium-gray/30 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-lg">📍</span>
                              <span className="text-xs text-premium-darkGray font-medium">{t('resorts.distanceFromAirport')}</span>
                            </div>
                            <p className="text-premium-navy font-bold text-xs">{resort.distance}</p>
                          </div>
                          <div className="bg-premium-gray/30 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-lg">⛰️</span>
                              <span className="text-xs text-premium-darkGray font-medium">{t('resorts.elevation')}</span>
                            </div>
                            <p className="text-premium-navy font-bold text-xs">{resort.elevation}</p>
                          </div>
                          <div className="bg-premium-gray/30 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-lg">🎿</span>
                              <span className="text-xs text-premium-darkGray font-medium">{t('resorts.level')}</span>
                            </div>
                            <p className="text-premium-navy font-bold text-xs">{resort.difficulty}</p>
                          </div>
                          <div className="bg-premium-gray/30 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-lg">📏</span>
                              <span className="text-xs text-premium-darkGray font-medium">{t('resorts.trails')}</span>
                            </div>
                            <p className="text-premium-navy font-bold text-xs">{resort.trails}</p>
                          </div>
                        </div>
                        <h4 className="text-base font-oswald font-bold text-premium-navy mb-2">
                          {t('resorts.features')}
                        </h4>
                        <ul className="space-y-1.5">
                          {resort.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-color1 text-sm mt-0.5">✓</span>
                              <span className="text-xs text-premium-darkGray leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <div className="relative w-full h-full">
                      <ResortImageCarousel
                        images={getResortImages(resort.folder, resort.image, resort.imageOrder)}
                        resortName={resort.name}
                        isMobile={isMobile}
                        onImageClick={(imageIndex) =>
                          handleImageClick(resort.id, resort.name, resort.folder, resort.image, resort.imageOrder, imageIndex)
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/20 via-transparent to-transparent pointer-events-none z-10" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl sm:text-3xl font-oswald font-bold text-premium-navy mb-1">
                      {resort.name}
                    </h3>
                    <p className="text-premium-darkGray text-sm sm:text-base font-medium mb-4 sm:mb-6">{resort.region}</p>
                    <p className="text-premium-darkGray mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
                      {resort.description}
                    </p>
                    
                    {resort.url && (
                      <a
                        href={resort.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm sm:text-base text-color1 hover:text-premium-navy font-semibold mb-4 sm:mb-6 transition-colors"
                      >
                        <span>{t('resorts.learnMore')}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}

                    <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-premium-gray/30 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-xl sm:text-2xl">📍</span>
                          <span className="text-xs text-premium-darkGray font-medium">{t('resorts.distanceFromAirport')}</span>
                        </div>
                        <p className="text-premium-navy font-bold text-xs sm:text-sm">{resort.distance}</p>
                      </div>
                      <div className="bg-premium-gray/30 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-xl sm:text-2xl">⛰️</span>
                          <span className="text-xs text-premium-darkGray font-medium">{t('resorts.elevation')}</span>
                        </div>
                        <p className="text-premium-navy font-bold text-sm sm:text-base">{resort.elevation}</p>
                      </div>
                      <div className="bg-premium-gray/30 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-xl sm:text-2xl">🎿</span>
                          <span className="text-xs text-premium-darkGray font-medium">{t('resorts.level')}</span>
                        </div>
                        <p className="text-premium-navy font-bold text-xs sm:text-sm">{resort.difficulty}</p>
                      </div>
                      <div className="bg-premium-gray/30 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-xl sm:text-2xl">📏</span>
                          <span className="text-xs text-premium-darkGray font-medium">{t('resorts.trails')}</span>
                        </div>
                        <p className="text-premium-navy font-bold text-sm sm:text-base">{resort.trails}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedResort(selectedResort === resort.id ? null : resort.id)}
                      className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-color2 text-color1 rounded-lg font-semibold text-sm sm:text-base hover:bg-color2/80 transition-colors mt-auto"
                    >
                      <span>{selectedResort === resort.id ? t('resorts.hideFeatures') : t('resorts.showFeatures')}</span>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${selectedResort === resort.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {selectedResort === resort.id && (
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-premium-gray">
                        <h4 className="text-lg sm:text-xl font-oswald font-bold text-premium-navy mb-3 sm:mb-4">
                          {t('resorts.features')}
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {resort.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 sm:gap-3"
                            >
                              <span className="text-color1 text-lg sm:text-xl mt-0.5">✓</span>
                              <span className="text-base sm:text-lg text-premium-darkGray leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
>>>>>>> 033120d62b2d23478db4a5acc4631cdf9622de9f
        </div>
      </section>

      <ImageModal
        isOpen={modalImage.isOpen}
        onClose={() => setModalImage({ ...modalImage, isOpen: false })}
        images={modalImage.images}
        initialIndex={modalImage.index}
        resortName={modalImage.resortName}
      />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  )
}

export default Resorts
