import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Resorts = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedResort, setSelectedResort] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

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

  const resorts = [
    {
      id: 1,
      ...getResortData('pianiDiBobbio'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      discount: 25,
      isFeatured: true,
      url: 'https://pianidibobbio.com/it/',
    },
    {
      id: 2,
      ...getResortData('madesimo'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      url: 'https://www.skiareavalchiavenna.it/',
    },
    {
      id: 3,
      ...getResortData('bivio'),
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      url: 'https://www.schneesportbivio.ch/',
    },
    {
      id: 4,
      ...getResortData('sanktMoritz'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      url: 'https://www.engadin.ch/de',
    },
    {
      id: 5,
      ...getResortData('valmalenco'),
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      url: 'https://www.sondrioevalmalenco.it/it/ski-area-valmalenco',
    },
    {
      id: 6,
      ...getResortData('aprica'),
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      url: 'https://www.apricaonline.com/it/montagna-inverno/sci',
    },
    {
      id: 7,
      ...getResortData('livigno'),
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      url: 'https://www.livigno.eu/sciare-livigno',
    },
  ]

  return (
    <section
      id="resorts"
      ref={ref}
      className="section-padding bg-gradient-to-b from-premium-gray to-white"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-premium-navy mb-4 sm:mb-6 px-4">
            {t('resorts.title')}
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg md:text-xl text-premium-darkGray max-w-3xl mx-auto px-4">
            {t('resorts.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {resorts.map((resort, index) => (
            <motion.div
              key={resort.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all relative ${
                resort.discount ? 'ring-4 ring-premium-gold ring-opacity-50' : ''
              } ${resort.isFeatured ? 'border-2 border-premium-gold' : ''} ${
                index === resorts.length - 1 && resorts.length % 3 === 1 ? 'lg:col-start-2' : ''
              }`}
            >
                {/* Discount Badge */}
              {resort.discount && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-premium-gold text-premium-navy px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-lg shadow-lg">
                  {t('resorts.discount', { value: resort.discount })}
                </div>
              )}

              {/* Featured Badge */}
              {resort.isFeatured && !resort.discount && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-premium-navy text-premium-gold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg">
                  {t('resorts.recommended')}
                </div>
              )}

              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/90 via-premium-navy/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-2xl sm:text-3xl font-elegant font-bold text-white mb-1">
                    {resort.name}
                  </h3>
                  <p className="text-premium-lightGold text-sm sm:text-base mb-2 sm:mb-3">{resort.nameEn}</p>
                  <p className="text-white/90 text-xs sm:text-sm font-medium">{resort.region}</p>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-premium-darkGray mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {resort.description}
                </p>
                
                {/* Resort Link */}
                {resort.url && (
                  <a
                    href={resort.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm sm:text-base text-premium-gold hover:text-premium-navy font-semibold mb-4 sm:mb-6 transition-colors"
                  >
                    <span>{t('resorts.learnMore')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                {/* Stats Grid */}
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

                {/* Airport Distance */}
                <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-premium-gold/10 rounded-lg border border-premium-gold/20">
                  <p className="text-xs sm:text-sm text-premium-darkGray font-medium">
                    <span className="text-premium-gold font-semibold">📍 {t('resorts.distance')}</span>{' '}
                    {resort.airportDistance}
                  </p>
                </div>

                {/* Toggle Button */}
                <motion.button
                  onClick={() => setSelectedResort(selectedResort === resort.id ? null : resort.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-premium-navy text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-premium-navy/90 transition-colors"
                >
                  <span>{selectedResort === resort.id ? t('resorts.hideFeatures') : t('resorts.showFeatures')}</span>
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: selectedResort === resort.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                {/* Expanded Details - на мобилке показываем только если открыта */}
                {(selectedResort === resort.id || !isMobile) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-premium-gray"
                  >
                    <h4 className="text-lg sm:text-xl font-elegant font-bold text-premium-navy mb-3 sm:mb-4">
                      {t('resorts.features')}
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {resort.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <span className="text-premium-gold text-lg sm:text-xl mt-0.5">✓</span>
                          <span className="text-sm sm:text-base text-premium-darkGray leading-relaxed">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Resorts

