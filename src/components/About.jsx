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
            className="flex flex-col justify-end text-white h-full"
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-12 md:mt-16 relative overflow-hidden -mx-4 md:-mx-8 lg:-mx-16 px-4 md:px-8 lg:px-16 py-6 sm:py-8 md:py-12 bg-white"
        >
          <div className="relative">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-elegant font-bold mb-6 sm:mb-8 text-center text-color3"
            >
              {t('about.whyUs')}
            </motion.h3>
            
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4 sm:space-y-6 max-w-4xl mx-auto"
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-color3 text-justify">
                {t('about.whyUsText1')}
              </p>
              
              <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl leading-relaxed text-color3 text-justify">
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item4')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item5')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item6')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item7')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">-</span>
                  <span>{t('about.whyUsList.item8')}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

