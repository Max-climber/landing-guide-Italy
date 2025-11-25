import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Conditions = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [openConditions, setOpenConditions] = useState([]) // Массив открытых условий для FAQ-режима на мобилке
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const conditions = [
    {
      key: 'planning',
      icon: '📅',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/50',
    },
    {
      key: 'hotels',
      icon: '🏨',
      gradient: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-400/50',
    },
    {
      key: 'transfers',
      icon: '🚗',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/50',
    },
    {
      key: 'service',
      icon: '⛷️',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/50',
    },
    {
      key: 'payment',
      icon: '💳',
      gradient: 'from-gold-500/20 to-yellow-500/20',
      borderColor: 'border-premium-gold/50',
    },
  ]

  return (
    <section
      id="conditions"
      ref={ref}
      className="relative section-padding bg-gradient-to-b from-premium-navy via-premium-navy/95 to-premium-navy overflow-hidden"
    >

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-premium-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-white mb-4 sm:mb-6 px-4">
            {t('contact.conditions')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            {t('contact.conditionsSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:max-w-5xl lg:mx-auto">
          {/* Первый ряд - 3 карточки по центру */}
          <div className="lg:col-span-3 lg:flex lg:justify-center lg:gap-6 lg:mb-6">
            {conditions.slice(0, 3).map((condition, index) => (
              <div key={condition.key} className="lg:w-1/3 lg:flex lg:flex-col">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative bg-gradient-to-br ${condition.gradient} backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 ${condition.borderColor} hover:border-premium-gold transition-all duration-300 hover:shadow-2xl hover:scale-105 group lg:h-full lg:flex lg:flex-col`}
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          {condition.key === 'transfers' ? (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                              <svg className="w-full h-full" viewBox="0 0 140 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Красная машинка */}
                                <rect x="15" y="25" width="110" height="25" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
                                <rect x="30" y="20" width="80" height="15" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
                                <rect x="40" y="18" width="60" height="12" rx="1" fill="#B91C1C"/>
                                <circle cx="40" cy="50" r="8" fill="#1F2937" stroke="#111827" strokeWidth="1.5"/>
                                <circle cx="40" cy="50" r="5" fill="#374151"/>
                                <circle cx="100" cy="50" r="8" fill="#1F2937" stroke="#111827" strokeWidth="1.5"/>
                                <circle cx="100" cy="50" r="5" fill="#374151"/>
                                <rect x="25" y="22" width="15" height="8" rx="1" fill="#7F1D1D" opacity="0.6"/>
                                <rect x="100" y="22" width="15" height="8" rx="1" fill="#7F1D1D" opacity="0.6"/>
                              </svg>
                            </div>
                          ) : (
                            <div className="text-4xl sm:text-5xl">{condition.icon}</div>
                          )}
                          <h3 className="text-xl sm:text-2xl font-elegant font-bold text-white">
                            {t(`contact.conditionsSections.${condition.key}.title`).replace(/📅|🏨|🚗|⛷️|💳/g, '').trim()}
                          </h3>
                        </div>

                        {/* Mobile Toggle Button - только стрелка, без текста */}
                        {isMobile && (
                          <motion.button
                            onClick={() => {
                              // FAQ-режим: добавляем/удаляем условие из массива открытых
                              setOpenConditions(prev => 
                                prev.includes(condition.key)
                                  ? prev.filter(key => key !== condition.key)
                                  : [...prev, condition.key]
                              )
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors mt-4"
                          >
                            <motion.svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ rotate: openConditions.includes(condition.key) ? 180 : 0 }}
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
                        )}

                        {/* Content - показываем всегда на десктопе, на мобилке только если открыта */}
                        {(openConditions.includes(condition.key) || !isMobile) && (
                          <motion.div
                            initial={isMobile && !openConditions.includes(condition.key) ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 lg:flex-1"
                          >
                            {/* Условия для каждого типа */}
                            {condition.key === 'planning' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.startPlanning').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.startPlanning').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.firstConsultation').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.firstConsultation').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-color1 font-bold">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'hotels' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.selection').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.selection').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.booking').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.booking').split('–')[1]}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'transfers' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.airportPickup').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.airportPickup').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.betweenResorts').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.betweenResorts').split('–')[1]}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'service' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-color1 font-bold">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-color1 font-bold">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    {t('contact.conditionsSections.service.safety')}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'payment' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.dailyPayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.payment.dailyPayment').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.rublesPayment').split('+')[0]}
                                    </span>
                                    {' '}
                                    <span className="text-color1 font-bold">
                                      + {t('contact.conditionsSections.payment.rublesPayment').split('+')[1]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
              </div>
            ))}
          </div>
          {/* Второй ряд - 2 карточки по центру */}
          <div className="lg:col-span-3 lg:flex lg:justify-center lg:gap-6 lg:mt-0">
            {conditions.slice(3, 5).map((condition, index) => (
              <div key={condition.key} className="lg:w-1/3 lg:flex lg:flex-col">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                      className={`relative bg-gradient-to-br ${condition.gradient} backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 ${condition.borderColor} hover:border-premium-gold transition-all duration-300 hover:shadow-2xl hover:scale-105 group lg:h-full lg:flex lg:flex-col`}
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          {condition.key === 'transfers' ? (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                              <svg className="w-full h-full" viewBox="0 0 140 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Красная машинка */}
                                <rect x="15" y="25" width="110" height="25" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
                                <rect x="30" y="20" width="80" height="15" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
                                <rect x="40" y="18" width="60" height="12" rx="1" fill="#B91C1C"/>
                                <circle cx="40" cy="50" r="8" fill="#1F2937" stroke="#111827" strokeWidth="1.5"/>
                                <circle cx="40" cy="50" r="5" fill="#374151"/>
                                <circle cx="100" cy="50" r="8" fill="#1F2937" stroke="#111827" strokeWidth="1.5"/>
                                <circle cx="100" cy="50" r="5" fill="#374151"/>
                                <rect x="25" y="22" width="15" height="8" rx="1" fill="#7F1D1D" opacity="0.6"/>
                                <rect x="100" y="22" width="15" height="8" rx="1" fill="#7F1D1D" opacity="0.6"/>
                              </svg>
                            </div>
                          ) : (
                            <div className="text-4xl sm:text-5xl">{condition.icon}</div>
                          )}
                          <h3 className="text-xl sm:text-2xl font-elegant font-bold text-white">
                            {t(`contact.conditionsSections.${condition.key}.title`).replace(/📅|🏨|🚗|⛷️|💳/g, '').trim()}
                          </h3>
                        </div>

                        {/* Mobile Toggle Button - только стрелка, без текста */}
                        {isMobile && (
                          <motion.button
                            onClick={() => {
                              // FAQ-режим: добавляем/удаляем условие из массива открытых
                              setOpenConditions(prev => 
                                prev.includes(condition.key)
                                  ? prev.filter(key => key !== condition.key)
                                  : [...prev, condition.key]
                              )
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors mt-4"
                          >
                            <motion.svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ rotate: openConditions.includes(condition.key) ? 180 : 0 }}
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
                        )}

                        {/* Content - показываем всегда на десктопе, на мобилке только если открыта */}
                        {(openConditions.includes(condition.key) || !isMobile) && (
                          <motion.div
                            initial={isMobile && !openConditions.includes(condition.key) ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 lg:flex-1"
                          >
                            {/* Условия для каждого типа */}
                            {condition.key === 'planning' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.startPlanning').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.startPlanning').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.firstConsultation').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.firstConsultation').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-color1 font-bold">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'hotels' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.selection').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.selection').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.booking').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.booking').split('–')[1]}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'transfers' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.airportPickup').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.airportPickup').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.betweenResorts').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.betweenResorts').split('–')[1]}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'service' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-color1 font-bold">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-color1 font-bold">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    {t('contact.conditionsSections.service.safety')}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'payment' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.dailyPayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.payment.dailyPayment').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.rublesPayment').split('+')[0]}
                                    </span>
                                    {' '}
                                    <span className="text-color1 font-bold">
                                      + {t('contact.conditionsSections.payment.rublesPayment').split('+')[1]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
              </div>
            ))}  
          </div>
        </div>
      </div>
    </section>
  )
}

export default Conditions

