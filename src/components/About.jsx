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
          className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 bg-premium-navy rounded-2xl text-white"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-elegant font-bold mb-4 sm:mb-6 text-center">
            {t('about.whyUs')}
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-center max-w-4xl mx-auto px-4">
            {t('about.whyUsText1')}
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center max-w-4xl mx-auto mt-4 sm:mt-6 px-4">
            {t('about.whyUsText2')}
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center max-w-4xl mx-auto mt-4 sm:mt-6 text-premium-gold font-semibold px-4">
            {t('about.whyUsText3')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About

