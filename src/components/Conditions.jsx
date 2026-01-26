import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Conditions = () => {
  const { t } = useTranslation()
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
      className="relative section-padding bg-color3 overflow-hidden"
    >

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-premium-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-max relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-color1 mb-4 sm:mb-6 px-4">
            {t('contact.conditions')}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-sans text-white/80 max-w-3xl mx-auto px-4">
            {t('contact.conditionsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:max-w-5xl lg:mx-auto">
          {/* Первый ряд - 3 карточки по центру */}
          <div className="lg:col-span-3 lg:flex lg:justify-center lg:gap-6 lg:mb-6">
            {conditions.slice(0, 3).map((condition, index) => (
              <div key={condition.key} className="lg:w-1/3 lg:flex lg:flex-col">
                    <div className="relative bg-color2 rounded-2xl p-6 sm:p-8 border border-white hover:border-white transition-all duration-300 hover:shadow-2xl hover:scale-105 group lg:h-full lg:flex lg:flex-col text-white">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl sm:text-5xl">{condition.key === 'transfers' ? '🚗' : condition.icon}</div>
                          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                            {t(`contact.conditionsSections.${condition.key}.title`).replace(/📅|🏨|🚗|⛷️|💳/g, '').trim()}
                          </h3>
                        </div>

                        {/* Mobile Toggle Button - только стрелка, без текста */}
                        {isMobile && (
                          <button
                            onClick={() => {
                              // FAQ-режим: добавляем/удаляем условие из массива открытых
                              setOpenConditions(prev => 
                                prev.includes(condition.key)
                                  ? prev.filter(key => key !== condition.key)
                                  : [...prev, condition.key]
                              )
                            }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors mt-4"
                          >
                            <svg
                              className={`w-6 h-6 transition-transform ${openConditions.includes(condition.key) ? 'rotate-180' : ''}`}
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
                        )}

                        {/* Content - показываем всегда на десктопе, на мобилке только если открыта */}
                        {(openConditions.includes(condition.key) || !isMobile) && (
                          <div className="space-y-3 lg:flex-1">
                            {/* Условия для каждого типа */}
                            {condition.key === 'planning' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.startPlanning').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.startPlanning').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.firstConsultation').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.firstConsultation').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <div className="flex-1">
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                      <span className="font-semibold text-white">
                                        {t('contact.conditionsSections.planning.prepayment').split('=')[0].replace('*', '').trim()}
                                      </span>
                                      <sup className="text-white">*</sup>
                                      {' = '}
                                      <span className="text-white">
                                        {t('contact.conditionsSections.planning.prepayment').split('=')[1]?.split('–')[0]?.trim()}
                                      </span>
                                      {' – '}
                                      <span className="text-color1 font-bold">
                                        {t('contact.conditionsSections.planning.prepayment').split('–')[1]?.trim()}
                                      </span>
                                    </p>
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed mt-1">
                                      {t('contact.conditionsSections.planning.prepaymentNote')}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}

                            {condition.key === 'hotels' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.selection').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.selection').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.airportPickup').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.airportPickup').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    {t('contact.conditionsSections.service.safety')}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'payment' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.dailyPayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.payment.dailyPayment').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                          </div>
                        )}
                      </div>
                    </div>
              </div>
            ))}
          </div>
          {/* Второй ряд - 2 карточки по центру */}
          <div className="lg:col-span-3 lg:flex lg:justify-center lg:gap-6 lg:mt-0">
            {conditions.slice(3, 5).map((condition, index) => (
              <div key={condition.key} className="lg:w-1/3 lg:flex lg:flex-col">
                    <div className="relative bg-color2 rounded-2xl p-6 sm:p-8 border border-white hover:border-white transition-all duration-300 hover:shadow-2xl hover:scale-105 group lg:h-full lg:flex lg:flex-col text-white">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl sm:text-5xl">{condition.key === 'transfers' ? '🚗' : condition.icon}</div>
                          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                            {t(`contact.conditionsSections.${condition.key}.title`).replace(/📅|🏨|🚗|⛷️|💳/g, '').trim()}
                          </h3>
                        </div>

                        {/* Mobile Toggle Button - только стрелка, без текста */}
                        {isMobile && (
                          <button
                            onClick={() => {
                              // FAQ-режим: добавляем/удаляем условие из массива открытых
                              setOpenConditions(prev => 
                                prev.includes(condition.key)
                                  ? prev.filter(key => key !== condition.key)
                                  : [...prev, condition.key]
                              )
                            }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors mt-4"
                          >
                            <svg
                              className={`w-6 h-6 transition-transform ${openConditions.includes(condition.key) ? 'rotate-180' : ''}`}
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
                        )}

                        {/* Content - показываем всегда на десктопе, на мобилке только если открыта */}
                        {(openConditions.includes(condition.key) || !isMobile) && (
                          <div className="space-y-3 lg:flex-1">
                            {/* Условия для каждого типа */}
                            {condition.key === 'planning' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.startPlanning').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.startPlanning').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.firstConsultation').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.firstConsultation').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <div className="flex-1">
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                      <span className="font-semibold text-white">
                                        {t('contact.conditionsSections.planning.prepayment').split('=')[0].replace('*', '').trim()}
                                      </span>
                                      <sup className="text-white">*</sup>
                                      {' = '}
                                      <span className="text-white">
                                        {t('contact.conditionsSections.planning.prepayment').split('=')[1]?.split('–')[0]?.trim()}
                                      </span>
                                      {' – '}
                                      <span className="text-color1 font-bold">
                                        {t('contact.conditionsSections.planning.prepayment').split('–')[1]?.trim()}
                                      </span>
                                    </p>
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed mt-1">
                                      {t('contact.conditionsSections.planning.prepaymentNote')}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}

                            {condition.key === 'hotels' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.selection').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.selection').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.airportPickup').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.airportPickup').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    {t('contact.conditionsSections.service.safety')}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'payment' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.dailyPayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.payment.dailyPayment').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-color1 mt-1 text-lg">•</span>
                                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
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
                          </div>
                        )}
                      </div>
                    </div>
              </div>
            ))}  
          </div>
        </div>
      </div>
    </section>
  )
}

export default Conditions

