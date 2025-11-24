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
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="text-6xl sm:text-8xl">❄️</div>
          </motion.div>
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
                                {/* Rolls-Royce стиль - длинный капот, элегантный силуэт */}
                                {/* Основной кузов */}
                                <path d="M10 40 L15 25 L25 20 L50 20 L55 18 L85 18 L90 20 L115 20 L125 25 L130 40 L130 48 L10 48 Z" 
                                      fill="#000000" stroke="#1a1a1a" strokeWidth="0.8"/>
                                {/* Длинный капот с плавным изгибом */}
                                <path d="M15 25 Q20 22 25 20 L50 20 Q55 19 60 20" 
                                      stroke="#0a0a0a" strokeWidth="1" fill="none"/>
                                {/* Лобовое стекло - наклонное, элегантное */}
                                <path d="M60 20 L65 18 L95 18 L100 20 L100 32 L60 32 Z" 
                                      fill="#050505" stroke="#1a1a1a" strokeWidth="0.5"/>
                                {/* Заднее стекло - fastback стиль */}
                                <path d="M100 20 L110 22 L125 25 L125 32 L100 32 Z" 
                                      fill="#050505" stroke="#1a1a1a" strokeWidth="0.5"/>
                                {/* Крыша - плавная линия */}
                                <path d="M60 20 Q80 18 100 20" 
                                      stroke="#1a1a1a" strokeWidth="0.8" fill="none"/>
                                {/* Дверная линия */}
                                <path d="M75 20 L75 48" 
                                      stroke="#1a1a1a" strokeWidth="0.6" opacity="0.6"/>
                                {/* Колеса - премиум многоспицевые диски */}
                                <circle cx="30" cy="48" r="7" fill="#000000" stroke="#1a1a1a" strokeWidth="1.2"/>
                                <circle cx="30" cy="48" r="5" fill="#0a0a0a"/>
                                {/* Спицы диска */}
                                <g stroke="#1a1a1a" strokeWidth="0.4" opacity="0.8">
                                  <line x1="30" y1="48" x2="30" y2="43" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="33" y2="45" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="35" y2="46" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="33" y2="51" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="35" y2="50" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="30" y2="53" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="27" y2="51" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="25" y2="50" strokeLinecap="round"/>
                                </g>
                                <circle cx="30" cy="48" r="2" fill="#D4AF37"/>
                                
                                <circle cx="110" cy="48" r="7" fill="#000000" stroke="#1a1a1a" strokeWidth="1.2"/>
                                <circle cx="110" cy="48" r="5" fill="#0a0a0a"/>
                                {/* Спицы диска */}
                                <g stroke="#1a1a1a" strokeWidth="0.4" opacity="0.8">
                                  <line x1="110" y1="48" x2="110" y2="43" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="113" y2="45" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="115" y2="46" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="113" y2="51" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="115" y2="50" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="110" y2="53" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="107" y2="51" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="105" y2="50" strokeLinecap="round"/>
                                </g>
                                <circle cx="110" cy="48" r="2" fill="#D4AF37"/>
                                
                                {/* Решетка радиатора - вертикальная, премиум */}
                                <rect x="20" y="22" width="8" height="3" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.4"/>
                                <line x1="22" y1="22" x2="22" y2="25" stroke="#1a1a1a" strokeWidth="0.3"/>
                                <line x1="24" y1="22" x2="24" y2="25" stroke="#1a1a1a" strokeWidth="0.3"/>
                                <line x1="26" y1="22" x2="26" y2="25" stroke="#1a1a1a" strokeWidth="0.3"/>
                                
                                {/* Фары - элегантные, овальные */}
                                <ellipse cx="15" cy="26" rx="2.5" ry="1.8" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.6"/>
                                <ellipse cx="125" cy="26" rx="2.5" ry="1.8" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.6"/>
                                
                                {/* Блеск на кузове - премиум эффект */}
                                <path d="M15 28 Q70 25 125 28" 
                                      stroke="#1a1a1a" strokeWidth="0.4" fill="none" opacity="0.4"/>
                                <path d="M20 30 Q70 27 120 30" 
                                      stroke="#1a1a1a" strokeWidth="0.3" fill="none" opacity="0.3"/>
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
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.startPlanning').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.startPlanning').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.firstConsultation').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.firstConsultation').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-premium-gold font-bold">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'hotels' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.selection').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.selection').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
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
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.airportPickup').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.airportPickup').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
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
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-premium-gold font-bold">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-premium-gold font-bold">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    {t('contact.conditionsSections.service.safety')}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'payment' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.dailyPayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.payment.dailyPayment').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.rublesPayment').split('+')[0]}
                                    </span>
                                    {' '}
                                    <span className="text-premium-gold font-bold">
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
                                {/* Rolls-Royce стиль - длинный капот, элегантный силуэт */}
                                {/* Основной кузов */}
                                <path d="M10 40 L15 25 L25 20 L50 20 L55 18 L85 18 L90 20 L115 20 L125 25 L130 40 L130 48 L10 48 Z" 
                                      fill="#000000" stroke="#1a1a1a" strokeWidth="0.8"/>
                                {/* Длинный капот с плавным изгибом */}
                                <path d="M15 25 Q20 22 25 20 L50 20 Q55 19 60 20" 
                                      stroke="#0a0a0a" strokeWidth="1" fill="none"/>
                                {/* Лобовое стекло - наклонное, элегантное */}
                                <path d="M60 20 L65 18 L95 18 L100 20 L100 32 L60 32 Z" 
                                      fill="#050505" stroke="#1a1a1a" strokeWidth="0.5"/>
                                {/* Заднее стекло - fastback стиль */}
                                <path d="M100 20 L110 22 L125 25 L125 32 L100 32 Z" 
                                      fill="#050505" stroke="#1a1a1a" strokeWidth="0.5"/>
                                {/* Крыша - плавная линия */}
                                <path d="M60 20 Q80 18 100 20" 
                                      stroke="#1a1a1a" strokeWidth="0.8" fill="none"/>
                                {/* Дверная линия */}
                                <path d="M75 20 L75 48" 
                                      stroke="#1a1a1a" strokeWidth="0.6" opacity="0.6"/>
                                {/* Колеса - премиум многоспицевые диски */}
                                <circle cx="30" cy="48" r="7" fill="#000000" stroke="#1a1a1a" strokeWidth="1.2"/>
                                <circle cx="30" cy="48" r="5" fill="#0a0a0a"/>
                                {/* Спицы диска */}
                                <g stroke="#1a1a1a" strokeWidth="0.4" opacity="0.8">
                                  <line x1="30" y1="48" x2="30" y2="43" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="33" y2="45" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="35" y2="46" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="33" y2="51" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="35" y2="50" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="30" y2="53" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="27" y2="51" strokeLinecap="round"/>
                                  <line x1="30" y1="48" x2="25" y2="50" strokeLinecap="round"/>
                                </g>
                                <circle cx="30" cy="48" r="2" fill="#D4AF37"/>
                                
                                <circle cx="110" cy="48" r="7" fill="#000000" stroke="#1a1a1a" strokeWidth="1.2"/>
                                <circle cx="110" cy="48" r="5" fill="#0a0a0a"/>
                                {/* Спицы диска */}
                                <g stroke="#1a1a1a" strokeWidth="0.4" opacity="0.8">
                                  <line x1="110" y1="48" x2="110" y2="43" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="113" y2="45" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="115" y2="46" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="113" y2="51" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="115" y2="50" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="110" y2="53" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="107" y2="51" strokeLinecap="round"/>
                                  <line x1="110" y1="48" x2="105" y2="50" strokeLinecap="round"/>
                                </g>
                                <circle cx="110" cy="48" r="2" fill="#D4AF37"/>
                                
                                {/* Решетка радиатора - вертикальная, премиум */}
                                <rect x="20" y="22" width="8" height="3" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="0.4"/>
                                <line x1="22" y1="22" x2="22" y2="25" stroke="#1a1a1a" strokeWidth="0.3"/>
                                <line x1="24" y1="22" x2="24" y2="25" stroke="#1a1a1a" strokeWidth="0.3"/>
                                <line x1="26" y1="22" x2="26" y2="25" stroke="#1a1a1a" strokeWidth="0.3"/>
                                
                                {/* Фары - элегантные, овальные */}
                                <ellipse cx="15" cy="26" rx="2.5" ry="1.8" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.6"/>
                                <ellipse cx="125" cy="26" rx="2.5" ry="1.8" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.6"/>
                                
                                {/* Блеск на кузове - премиум эффект */}
                                <path d="M15 28 Q70 25 125 28" 
                                      stroke="#1a1a1a" strokeWidth="0.4" fill="none" opacity="0.4"/>
                                <path d="M20 30 Q70 27 120 30" 
                                      stroke="#1a1a1a" strokeWidth="0.3" fill="none" opacity="0.3"/>
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
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.startPlanning').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.startPlanning').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.firstConsultation').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.planning.firstConsultation').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-premium-gold font-bold">
                                      {t('contact.conditionsSections.planning.prepayment').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'hotels' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.hotels.selection').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.hotels.selection').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
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
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.transfers.airportPickup').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.transfers.airportPickup').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
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
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-premium-gold font-bold">
                                      {t('contact.conditionsSections.service.maxDays').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[0]}
                                    </span>
                                    {' – '}
                                    <span className="text-premium-gold font-bold">
                                      {t('contact.conditionsSections.service.maxHours').split('–')[1]}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    {t('contact.conditionsSections.service.safety')}
                                  </p>
                                </div>
                              </>
                            )}

                            {condition.key === 'payment' && (
                              <>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.dailyPayment').split('–')[0]}
                                    </span>
                                    {' – '}
                                    {t('contact.conditionsSections.payment.dailyPayment').split('–')[1]}
                                  </p>
                                </div>
                                <div className="flex items-start gap-3">
                                  <span className="text-premium-gold mt-1 text-lg">•</span>
                                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                                    <span className="font-semibold text-white">
                                      {t('contact.conditionsSections.payment.rublesPayment').split('+')[0]}
                                    </span>
                                    {' '}
                                    <span className="text-premium-gold font-bold">
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

