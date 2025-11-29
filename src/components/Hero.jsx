import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-white"
      style={{ 
        willChange: 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Content */}
      <div className="relative z-10 container-max px-4 md:px-8 lg:px-16 text-center">
        <div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-oswald font-semibold text-color3 mb-3 sm:mb-4 max-w-4xl mx-auto px-4 leading-snug">
            {t('hero.subtitle')}
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-oswald font-extrabold text-color3 mb-5 sm:mb-6 px-4 tracking-tight"
            style={{ fontStretch: 'condensed' }}
          >
            {t('hero.title')}
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-oswald font-semibold text-color3 mb-12 sm:mb-16 max-w-4xl mx-auto px-4 leading-snug">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 justify-center px-4">
            <button
              onClick={() => {
                const element = document.querySelector('#programs')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-color3 text-white rounded-lg font-oswald font-semibold text-base sm:text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors"
            >
              {t('hero.ourPrograms')}
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#resorts')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-color3 text-white rounded-lg font-oswald font-semibold text-base sm:text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors"
            >
              {t('hero.bestResorts')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

