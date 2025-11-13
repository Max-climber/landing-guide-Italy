import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Programs = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeProgram, setActiveProgram] = useState(0)

  const programs = [
    {
      id: 1,
      title: t('programs.experienced.title'),
      subtitle: t('programs.experienced.subtitle'),
      description: t('programs.experienced.description'),
      features: [
        t('programs.experienced.features.consultation'),
        t('programs.experienced.features.airportPickup'),
        t('programs.experienced.features.airportDropoff'),
      ],
      pricing: {
        transfer: [
          {
            time: t('programs.experienced.pricing.workingDays'),
            price: t('programs.experienced.pricing.price1'),
          },
          {
            time: t('programs.experienced.pricing.otherTime'),
            price: t('programs.experienced.pricing.price2'),
          },
        ],
        consultation: t('programs.experienced.pricing.consultation'),
      },
      color: 'from-blue-600 to-blue-800',
    },
    {
      id: 2,
      title: t('programs.comfortable.title'),
      subtitle: t('programs.comfortable.subtitle'),
      description: t('programs.comfortable.description'),
      features: [
        t('programs.comfortable.features.tickets'),
        t('programs.comfortable.features.planning'),
        t('programs.comfortable.features.hotels'),
        t('programs.comfortable.features.transfers'),
        t('programs.comfortable.features.rental'),
        t('programs.comfortable.features.skipass'),
      ],
      pricing: {
        transfer: [
          {
            time: t('programs.comfortable.pricing.workingDays'),
            price: t('programs.comfortable.pricing.price1'),
          },
          {
            time: t('programs.comfortable.pricing.otherTime'),
            price: t('programs.comfortable.pricing.price2'),
          },
        ],
        consultation: t('programs.comfortable.pricing.consultation'),
        planning: t('programs.comfortable.pricing.planningPrice'),
        hotelTransfer: t('programs.comfortable.pricing.hotelTransferPrice'),
      },
      color: 'from-purple-600 to-purple-800',
    },
    {
      id: 3,
      title: t('programs.superComfort.title'),
      subtitle: t('programs.superComfort.subtitle'),
      description: t('programs.superComfort.description'),
      features: [
        t('programs.superComfort.features.fullDay'),
        t('programs.superComfort.features.individual'),
        t('programs.superComfort.features.restDay'),
      ],
      pricing: {
        transfer: [
          {
            time: t('programs.superComfort.pricing.workingDays'),
            price: t('programs.superComfort.pricing.price1'),
          },
          {
            time: t('programs.superComfort.pricing.otherTime'),
            price: t('programs.superComfort.pricing.price2'),
          },
        ],
        consultation: t('programs.superComfort.pricing.consultation'),
        planning: t('programs.superComfort.pricing.planningPrice'),
        hotelTransfer: t('programs.superComfort.pricing.hotelTransferPrice'),
        individualSlope: t('programs.superComfort.pricing.individualSlope'),
      },
      color: 'from-amber-600 to-amber-800',
    },
  ]

  return (
    <section
      id="programs"
      ref={ref}
      className="section-padding bg-premium-navy text-white"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-4 sm:mb-6 px-4">
            {t('programs.title')}
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            {t('programs.subtitle')}
          </p>
        </motion.div>

        {/* Program Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {programs.map((program, index) => (
            <motion.button
              key={program.id}
              onClick={() => setActiveProgram(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
                activeProgram === index
                  ? 'bg-premium-gold text-premium-navy'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {program.title}
            </motion.button>
          ))}
        </div>

        {/* Active Program Details */}
        {programs.map((program, index) => (
          activeProgram === index && (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
          >
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-elegant font-bold mb-3 sm:mb-4 text-premium-gold">
                  {program.title}
                </h3>
                <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6">{program.subtitle}</p>
                <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-premium-gold">
                    {t('programs.whatIncluded')}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-premium-gold mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-sm sm:text-base text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-premium-gold">
                  {t('programs.cost')}
                </h4>
                <div className="space-y-6">
                  {program.pricing.consultation && (
                    <div>
                      <p className="text-white/80 mb-2">
                        {program.pricing.consultation}
                      </p>
                    </div>
                  )}
                  {program.pricing.transfer && (
                    <div>
                      <p className="font-semibold text-white mb-3">
                        {t(`programs.${activeProgram === 0 ? 'experienced' : activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.transfer`)}
                      </p>
                      <div className="space-y-2">
                        {program.pricing.transfer.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white/10 rounded-lg p-3"
                          >
                            <p className="text-white/90 font-medium">
                              {idx === 0 ? `${t(`programs.${activeProgram === 0 ? 'experienced' : activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.transferStart`)} ${item.time}` : item.time}
                            </p>
                            <p className="text-premium-gold">
                              {item.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {program.pricing.planning && (
                    <div>
                      <p className="text-white/80">
                        {t(`programs.${activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.planning`)}{' '}
                        <span className="text-premium-gold font-semibold">
                          {program.pricing.planning}
                        </span>
                      </p>
                    </div>
                  )}
                  {program.pricing.hotelTransfer && (
                    <div>
                      <p className="text-white/80">
                        {t(`programs.${activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.hotelTransfer`)}{' '}
                        <span className="text-premium-gold font-semibold">
                          {program.pricing.hotelTransfer}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </motion.div>
          )
        ))}
      </div>
    </section>
  )
}

export default Programs

