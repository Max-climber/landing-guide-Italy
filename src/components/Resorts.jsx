import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ResortImageCarousel from './ResortImageCarousel'
import ImageModal from './ImageModal'

const Resorts = () => {
  const { t } = useTranslation()

  const [selectedResort, setSelectedResort] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [modalImage, setModalImage] = useState({ isOpen: false, images: [], index: 0, resortName: '' })
  const [showAllResorts, setShowAllResorts] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
    highlights: t(`resorts.resorts.${key}.highlights`, { returnObjects: true }),
  })

  /**
   * Получает реальное количество изображений для каждого курорта
   * @param {string} resortFolder - Название папки курорта
   * @returns {number} Количество изображений
   */
  const getResortImageCount = (resortFolder) => {
    const imageCounts = {
      'piani-di-bobbio': 6,
      'madesimo': 4,
      'sankt-moritz': 6,
      'bivio': 3,
      'valmalenco': 4,
      'aprica': 6,
      'livigno': 6, // 1.jpg, 2.webp, 3-6.jpg
    }
    return imageCounts[resortFolder] || 0
  }

  /**
   * Получает массив изображений для курорта
   * Возвращает только реально существующие изображения
   * 
   * @param {string} resortFolder - Название папки курорта (например, 'piani-di-bobbio')
   * @param {string} fallbackImage - Fallback изображение (старое изображение курорта)
   * @param {Array} imageOrder - Кастомный порядок изображений (опционально)
   * @returns {Array} Массив путей к изображениям
   */
  const getResortImages = (resortFolder, fallbackImage = null, imageOrder = null) => {
    const imageCount = getResortImageCount(resortFolder)
    const images = []
    
    // Если указан кастомный порядок, используем его
    if (imageOrder && imageOrder.length > 0) {
      imageOrder.forEach((num) => {
        if (resortFolder === 'livigno' && num === 2) {
          images.push(`/images/resorts/${resortFolder}/${num}.webp`)
        } else {
          images.push(`/images/resorts/${resortFolder}/${num}.jpg`)
        }
      })
    } else {
      // Стандартный порядок
      for (let i = 1; i <= imageCount; i++) {
        // Для livigno второе изображение - webp
        if (resortFolder === 'livigno' && i === 2) {
          images.push(`/images/resorts/${resortFolder}/${i}.webp`)
        } else {
          images.push(`/images/resorts/${resortFolder}/${i}.jpg`)
        }
      }
    }
    
    // Если нет изображений, используем fallback
    return images.length > 0 ? images : (fallbackImage ? [fallbackImage] : [])
  }

  /**
   * Обработчик клика на изображение - работает на всех устройствах
   * Открывает модальное окно с изображением
   */
  const handleImageClick = (resortId, resortName, resortFolder, fallbackImage, imageOrder = null, imageIndex = 0) => {
    const images = getResortImages(resortFolder, fallbackImage, imageOrder)
    setModalImage({
      isOpen: true,
      images,
      index: imageIndex,
      resortName,
    })
  }

  const resorts = [
    {
      id: 1,
      ...getResortData('pianiDiBobbio'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'piani-di-bobbio', // Название папки для изображений
      discount: 25,
      isFeatured: true,
      url: 'https://pianidibobbio.com/it/',
      imageOrder: [3, 2, 1, 4, 5, 6], // Порядок изображений: первое будет 3.jpg
    },
    {
      id: 2,
      ...getResortData('madesimo'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'madesimo',
      isFeatured: true,
      url: 'https://www.skiareavalchiavenna.it/',
    },
    {
      id: 3,
      ...getResortData('sanktMoritz'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'sankt-moritz',
      isFeatured: true,
      url: 'https://www.engadin.ch/de',
    },
    {
      id: 4,
      ...getResortData('bivio'),
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'bivio',
      url: 'https://www.schneesportbivio.ch/',
    },
    {
      id: 5,
      ...getResortData('valmalenco'),
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'valmalenco',
      url: 'https://www.sondrioevalmalenco.it/it/ski-area-valmalenco',
    },
    {
      id: 6,
      ...getResortData('aprica'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'aprica',
      url: 'https://www.apricaonline.com/it/montagna-inverno/sci',
    },
    {
      id: 7,
      ...getResortData('livigno'),
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      folder: 'livigno',
      url: 'https://www.livigno.eu/sciare-livigno',
    },
  ]

  return (
    <section
      id="resorts"
      className="section-padding bg-gradient-to-b from-premium-gray to-white"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-bold text-color3 mb-4 sm:mb-6 px-4">
            {t('resorts.title')}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-oswald text-color3 max-w-3xl mx-auto px-4">
            {t('resorts.subtitle')}
          </p>
        </div>

        {isMobile && !showAllResorts ? (
          // Мобильный вид: показываем только первую карточку целиком
          <>
            {resorts.slice(0, 1).map((resort) => (
              <div
                key={resort.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all relative ${
                  resort.discount ? 'ring-4 ring-premium-gold ring-opacity-50' : ''
                } ${resort.isFeatured ? 'border-2 border-premium-gold' : ''}`}
              >
                {/* Discount Badge */}
                {resort.discount && (
                  <div className="absolute top-2 right-2 z-10 bg-color3 text-white px-3 py-1.5 rounded-none font-oswald font-bold text-sm uppercase tracking-wider shadow-lg">
                    {t('resorts.discount', { value: resort.discount })}
                  </div>
                )}

                {/* Featured Badge */}
                {resort.isFeatured && !resort.discount && (
                  <div className="absolute top-2 right-2 z-10 bg-color2 text-color1 px-3 py-1.5 rounded-none font-oswald font-bold text-xs uppercase tracking-wider shadow-lg">
                    {t('resorts.recommended')}
                  </div>
                )}

                {/* Полная карточка для мобилки */}
                <div className="relative h-64 overflow-hidden">
                  <div className="relative w-full h-full">
                    <ResortImageCarousel
                      images={getResortImages(resort.folder, resort.image, resort.imageOrder)}
                      resortName={resort.name}
                      isMobile={isMobile}
                      onImageClick={(imageIndex) =>
                        handleImageClick(resort.id, resort.name, resort.folder, resort.image, resort.imageOrder, imageIndex)
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/25 via-transparent to-transparent pointer-events-none z-10" />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-2xl font-oswald font-bold text-premium-navy mb-1">
                    {resort.name}
                  </h3>
                  <p className="text-premium-darkGray text-xs font-medium mb-4">{resort.region}</p>
                  <p className="text-premium-darkGray mb-4 leading-relaxed text-sm">
                    {resort.description}
                  </p>
                  
                  {resort.url && (
                    <a
                      href={resort.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-color1 hover:text-premium-navy font-semibold mb-4 transition-colors"
                    >
                      <span>{t('resorts.learnMore')}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-premium-gray/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">📏</span>
                        <span className="text-xs text-premium-darkGray font-medium">{t('resorts.trails')}</span>
                      </div>
                      <p className="text-premium-navy font-bold text-sm">{resort.trails}</p>
                    </div>
                    <div className="bg-premium-gray/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">⛰️</span>
                        <span className="text-xs text-premium-darkGray font-medium">{t('resorts.elevation')}</span>
                      </div>
                      <p className="text-premium-navy font-bold text-sm">{resort.elevation}</p>
                    </div>
                    <div className="bg-premium-gray/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">🎿</span>
                        <span className="text-xs text-premium-darkGray font-medium">{t('resorts.level')}</span>
                      </div>
                      <p className="text-premium-navy font-bold text-xs">{resort.difficulty}</p>
                    </div>
                    <div className="bg-premium-gray/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">✈️</span>
                        <span className="text-xs text-premium-darkGray font-medium">{t('resorts.airport')}</span>
                      </div>
                      <p className="text-premium-navy font-bold text-xs">{resort.airportFrom}</p>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-premium-gold/10 rounded-lg border border-premium-gold/20">
                    <p className="text-sm text-premium-darkGray font-medium">
                      <span className="text-color1 font-semibold">📍 {t('resorts.distance')}</span>{' '}
                      {resort.airportDistance}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedResort(selectedResort === resort.id ? null : resort.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-color2 text-color1 rounded-lg font-semibold text-sm hover:bg-color2/80 transition-colors mb-4"
                  >
                    <span>{selectedResort === resort.id ? t('resorts.hideFeatures') : t('resorts.showFeatures')}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${selectedResort === resort.id ? 'rotate-180' : ''}`}
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
                    <div className="pt-4 border-t-2 border-premium-gray">
                      <h4 className="text-lg font-oswald font-bold text-premium-navy mb-3">
                        {t('resorts.features')}
                      </h4>
                      <ul className="space-y-2">
                        {resort.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-color1 text-lg mt-0.5">✓</span>
                            <span className="text-sm text-premium-darkGray leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Кнопка "Больше курортов" */}
            <div className="mt-6">
              <button
                onClick={() => setShowAllResorts(true)}
                className="w-full px-6 py-4 bg-color3 text-white rounded-lg font-oswald font-bold text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors shadow-lg"
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
                              <span className="text-lg">📏</span>
                              <span className="text-xs text-premium-darkGray font-medium">{t('resorts.trails')}</span>
                            </div>
                            <p className="text-premium-navy font-bold text-xs">{resort.trails}</p>
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
                              <span className="text-lg">✈️</span>
                              <span className="text-xs text-premium-darkGray font-medium">{t('resorts.airport')}</span>
                            </div>
                            <p className="text-premium-navy font-bold text-xs">{resort.airportFrom}</p>
                          </div>
                        </div>
                        <div className="mb-3 p-2 bg-premium-gold/10 rounded-lg border border-premium-gold/20">
                          <p className="text-xs text-premium-darkGray font-medium">
                            <span className="text-color1 font-semibold">📍 {t('resorts.distance')}</span>{' '}
                            {resort.airportDistance}
                          </p>
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
                          <span className="text-xl sm:text-2xl">📏</span>
                          <span className="text-xs text-premium-darkGray font-medium">{t('resorts.trails')}</span>
                        </div>
                        <p className="text-premium-navy font-bold text-sm sm:text-base">{resort.trails}</p>
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
                          <span className="text-xl sm:text-2xl">✈️</span>
                          <span className="text-xs text-premium-darkGray font-medium">{t('resorts.airport')}</span>
                        </div>
                        <p className="text-premium-navy font-bold text-xs sm:text-sm">{resort.airportFrom}</p>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-premium-gold/10 rounded-lg border border-premium-gold/20">
                      <p className="text-xs sm:text-sm text-premium-darkGray font-medium">
                        <span className="text-color1 font-semibold">📍 {t('resorts.distance')}</span>{' '}
                        {resort.airportDistance}
                      </p>
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
        </div>
        )}
      </div>

      {/* Модальное окно для просмотра изображений (работает на всех устройствах) */}
      <ImageModal
        isOpen={modalImage.isOpen}
        onClose={() => setModalImage({ ...modalImage, isOpen: false })}
        images={modalImage.images}
        initialIndex={modalImage.index}
        resortName={modalImage.resortName}
      />
    </section>
  )
}

export default Resorts

