import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const WhyUsSection = () => {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      id="why-us"
      className="why-us-hero-section relative w-full overflow-hidden"
      style={{ 
        height: isMobile ? '50vh' : '100vh', 
        minHeight: isMobile ? '50vh' : '100vh',
        marginTop: 0,
        marginBottom: 0
      }}
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
        <img
          src="/images/about/apres-ski-new.jpeg"
          alt="Апре-ски в Альпах"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
          loading="lazy"
        />
        {/* Градиентная растяжка внизу, как в hero-composite.jpg */}
        <div className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[250px] bg-gradient-to-b from-transparent via-bg-base/60 to-bg-base pointer-events-none" />
      </div>

      {/* Overlay Text - позиционирован выше, примерно на 5-7% от верха, чтобы быть над бокалом */}
      <div className="absolute inset-0 flex items-start justify-center z-10" style={{ paddingTop: '5%' }}>
        <div className="text-center px-4 sm:px-8">
          <h2 className="font-serif text-text-main tracking-[0.02em] leading-[1.2] mb-0 drop-shadow-lg" 
              style={{ 
                fontSize: isMobile ? 'clamp(28px, 6vw, 42px)' : 'clamp(36px, 4vw, 52px)', 
                fontWeight: '300',
                fontFamily: "'Cormorant Garamond', serif"
              }}>
            {t('about.title').split('\n').map((line, idx) => (
              <span key={idx} className="block">
                {idx === 0 ? line : <span className="brand-name">{line}</span>}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
