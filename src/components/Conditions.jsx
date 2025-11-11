import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

const Conditions = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
      {/* Animated Snowflakes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-2xl"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: -50,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            ❄
          </motion.div>
        ))}
      </div>

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
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-premium-gold to-transparent mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            {t('contact.conditionsSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {conditions.map((condition, index) => (
            <motion.div
              key={condition.key}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br ${condition.gradient} backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 ${condition.borderColor} hover:border-premium-gold transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl sm:text-5xl">{condition.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-elegant font-bold text-white">
                    {t(`contact.conditionsSections.${condition.key}.title`)}
                  </h3>
                </div>

                <div className="space-y-3">
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Conditions

