import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

const WhyUs = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section
      id="whyUs"
      ref={ref}
      className="section-padding bg-white"
    >
      <div className="container-max">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-bold mb-6 sm:mb-8 text-center text-color3"
        >
          {t('about.whyUs')}
        </motion.h3>
        
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 sm:space-y-6 max-w-4xl mx-auto"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-color3 text-justify">
            {t('about.whyUsText1')}
          </p>
          
          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-color3 text-justify">
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
    </section>
  )
}

export default WhyUs

