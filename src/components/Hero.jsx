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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{
            y,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551524164-6cf77f5e7b8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          }}
          className="absolute inset-0 bg-cover bg-center scale-110"
        />
        <div className="absolute inset-0 bg-premium-navy/70" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 container-max px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-elegant font-bold text-white mb-4 sm:mb-6 px-4"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-premium-lightGold mb-3 sm:mb-4 font-light px-4"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
          >
            {t('hero.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
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
              className="px-6 py-3 sm:px-8 sm:py-4 bg-premium-gold text-premium-navy rounded-full font-semibold text-base sm:text-lg hover:bg-premium-lightGold transition-colors shadow-lg"
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
              className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-premium-gold text-premium-gold rounded-full font-semibold text-base sm:text-lg hover:bg-premium-gold/10 transition-colors"
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

