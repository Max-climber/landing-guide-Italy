import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
  const aboutText = t('about.text', { returnObjects: true })
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-color1 mb-4 sm:mb-6 px-4">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between text-white h-full text-left"
          >
            <div className="flex flex-col h-full justify-between gap-4 sm:gap-6 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
              {aboutText.map((paragraph, idx) => {
                const lines = paragraph.split('\n')
                return (
                  <p key={idx} className="text-base sm:text-lg leading-relaxed text-left tracking-[0.08em]">
                    {lines.map((line, lineIdx) => (
                      <span key={lineIdx}>
                        {line}
                        {lineIdx !== lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )
              })}
              {t('about.whyUsText1') && (
                <p className="text-base sm:text-lg leading-relaxed text-left tracking-[0.08em] mt-4 sm:mt-6">
                  {t('about.whyUsText1')}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full"
          >
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about_Us.jpg"
                alt="Альпы"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-color2/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

