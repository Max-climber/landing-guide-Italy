import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation, Trans } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-gradient-to-b from-white to-premium-gray"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-premium-navy mb-4 sm:mb-6 px-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-6 sm:mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-base sm:text-lg text-premium-darkGray leading-relaxed">
              <Trans
                i18nKey="about.paragraph1"
                values={{ country: t('about.italy') }}
                components={{ bold: <span className="font-semibold text-premium-navy" /> }}
              />
            </p>
            <p className="text-base sm:text-lg text-premium-darkGray leading-relaxed">
              <Trans
                i18nKey="about.paragraph2"
                values={{ alps: t('about.alps') }}
                components={{ bold: <span className="font-semibold text-premium-navy" /> }}
              />
            </p>
            <p className="text-base sm:text-lg text-premium-darkGray leading-relaxed">
              <Trans
                i18nKey="about.paragraph3"
                values={{ vacation: t('about.vacation') }}
                components={{ bold: <span className="font-semibold text-premium-navy" /> }}
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Альпы"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-12 md:mt-16 relative overflow-hidden"
        >
          {/* Декоративные элементы */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-premium-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-premium-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative bg-gradient-to-br from-premium-navy via-premium-navy/95 to-premium-navy rounded-2xl p-6 sm:p-8 md:p-12 text-white border-2 border-premium-gold/20 shadow-2xl">
            {/* Снежинки декоративные */}
            <div className="absolute top-4 right-4 text-premium-gold/20 text-2xl">❄</div>
            <div className="absolute bottom-4 left-4 text-premium-gold/20 text-xl">❄</div>
            <div className="absolute top-1/2 right-8 text-premium-gold/10 text-xl">❄</div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-elegant font-bold mb-6 sm:mb-8 text-center text-premium-gold"
            >
              {t('about.whyUs')}
            </motion.h3>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-premium-gold to-transparent mx-auto mb-6 sm:mb-8" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4 sm:space-y-6 max-w-4xl mx-auto"
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/95 px-4">
                {t('about.whyUsText1')}
              </p>
              
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 px-4">
                {t('about.whyUsText2')}
              </p>
              
              <div className="pt-4 sm:pt-6 border-t border-premium-gold/30 mt-6 sm:mt-8">
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-center text-premium-gold font-bold px-4">
                  {t('about.whyUsText3')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

