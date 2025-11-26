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
      className="section-padding bg-color3"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-color1 mb-4 sm:mb-6 px-4">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between text-white h-full"
          >
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-justify">
                <Trans
                  i18nKey="about.paragraph1"
                  values={{ country: t('about.italy') }}
                  components={{ bold: <span className="font-semibold text-color1" /> }}
                />
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-justify">
                <Trans
                  i18nKey="about.paragraph2"
                  values={{ alps: t('about.alps') }}
                  components={{ bold: <span className="font-semibold text-color1" /> }}
                />
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-justify">
                <Trans
                  i18nKey="about.paragraph3"
                  values={{ vacation: t('about.vacation') }}
                  components={{ bold: <span className="font-semibold text-color1" /> }}
                />
              </p>
            </div>
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
              <div className="absolute inset-0 bg-color2/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

