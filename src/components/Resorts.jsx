import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import ImageModal from './ImageModal'
import ContactModal from './ContactModal'

const Resorts = () => {
  const { t } = useTranslation()

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [modalImage, setModalImage] = useState({ isOpen: false, images: [], index: 0, resortName: '' })
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const swiperRefs = useRef({})
  const [activeSlideIndex, setActiveSlideIndex] = useState({})

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
        
        <div className="resorts-grid flex justify-center gap-[30px] max-w-[1200px] mx-auto flex-wrap" style={{ boxSizing: 'border-box', width: '100%' }}>
          {resorts.map((resort) => {
            const images = getResortImages(resort.folder)
            
            return (
              <div
                key={resort.id}
                className="resort-card bg-bg-card border border-border-soft rounded-xl w-[350px] min-w-[350px] max-w-[350px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-transform duration-300 flex flex-col text-left hover:-translate-y-1 flex-shrink-0 group"
                style={{ boxSizing: 'border-box' }}
              >
                <div className="resort-img-box h-[240px] w-full overflow-hidden relative group">
                  {images.length > 1 ? (
                    <>
                      <Swiper
                        modules={[]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        onSwiper={(swiper) => {
                          swiperRefs.current[resort.id] = swiper
                          setActiveSlideIndex({ ...activeSlideIndex, [resort.id]: 0 })
                        }}
                        onSlideChange={(swiper) => {
                          setActiveSlideIndex({ ...activeSlideIndex, [resort.id]: swiper.realIndex })
                        }}
                        className="h-full w-full"
                        style={{ touchAction: 'pan-y' }}
                        allowTouchMove={true}
                        touchStartPreventDefault={false}
                        touchMoveStopPropagation={true}
                      >
                        {images.map((image, idx) => (
                          <SwiperSlide key={idx} className="h-full">
                            <img
                              src={image}
                              alt={`${resort.name} - ${idx + 1}`}
                              className="resort-img w-full h-full object-cover cursor-pointer select-none"
                              onClick={() => {
                                const swiper = swiperRefs.current[resort.id]
                                handleImageClick(resort.name, resort.folder, swiper?.realIndex || idx)
                              }}
                              loading={idx === 0 ? "eager" : "lazy"}
                              decoding="async"
                              draggable="false"
                              onError={(e) => {
                                e.target.src = '/images/resorts/piani-di-bobbio/1.jpg'
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      {/* Кастомные навигационные кнопки (как было раньше) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const swiper = swiperRefs.current[resort.id]
                          swiper?.slidePrev()
                        }}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                          (isMobile || isTablet) ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Previous image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const swiper = swiperRefs.current[resort.id]
                          swiper?.slideNext()
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                          (isMobile || isTablet) ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Next image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {/* Индикаторы для мобильных (как было раньше) */}
                      {(isMobile || isTablet) && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                          {images.map((_, idx) => {
                            const activeIndex = activeSlideIndex[resort.id] ?? 0
                            return (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  idx === activeIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                                }`}
                              />
                            )
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <img
                      src={images[0] || '/images/resorts/piani-di-bobbio/1.jpg'}
                      alt={resort.name}
                      className="resort-img w-full h-full object-cover cursor-pointer select-none"
                      onClick={() => handleImageClick(resort.name, resort.folder, 0)}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      onError={(e) => {
                        e.target.src = '/images/resorts/piani-di-bobbio/1.jpg'
                      }}
                    />
                  )}
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

                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="btn w-full px-[30px] py-4 mt-5 font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5"
                    style={{ fontWeight: '500' }}
                  >
                    {t('resorts.selectTourButton')}
                  </button>
                </div>
              </div>
            )
          })}
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
