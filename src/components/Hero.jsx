import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-white"
    >
      {/* Content */}
      <div ref={ref} className="relative z-10 container-max px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-color3 mb-4 sm:mb-6 px-4 font-oswald font-bold"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-oswald font-bold text-color3/60 mb-6 sm:mb-8 px-4 tracking-tight"
            style={{ fontStretch: 'condensed' }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-color3/80 mb-12 sm:mb-16 max-w-3xl mx-auto px-4 font-oswald font-light leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 justify-center px-4"
          >
            <motion.button
              onClick={() => {
                const element = document.querySelector('#programs')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-color3 text-white rounded-lg font-oswald font-semibold text-base sm:text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors"
            >
              {t('hero.ourPrograms')}
            </motion.button>
            <motion.button
              onClick={() => {
                const element = document.querySelector('#resorts')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-color3 text-white rounded-lg font-oswald font-semibold text-base sm:text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors"
            >
              {t('hero.bestResorts')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

