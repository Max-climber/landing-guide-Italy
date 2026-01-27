import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Background Image - начинается с самого верха */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" style={{ top: 0 }}>
        <img
          src="/images/main-photo.png"
          alt="Горнолыжный курорт в Альпах"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          onError={(e) => {
            // Fallback на jpg если png не найден
            if (e.target.src.endsWith('.png')) {
              e.target.src = '/images/main-photo.jpg'
            }
          }}
        />
      </div>

      {/* Content - по центру экрана */}
      <div className="hero-content">
        <h1 className="hero-title font-serif text-text-main mb-[10px] px-2 sm:px-4 drop-shadow-lg uppercase" style={{ fontSize: 'clamp(34px, 4.5vw, 68px)', letterSpacing: '0.07em', lineHeight: '1.1', fontWeight: '300', fontFamily: "'Cormorant Garamond', serif" }}>
          {t('hero.title')}
        </h1>
        <h2 className="hero-subtitle font-sans text-[#4A4A4A] mb-4 px-2 sm:px-4 drop-shadow-lg" style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', letterSpacing: '0.02em', fontWeight: '400' }}>
          {t('hero.subtitle')}
        </h2>
        <p className="hero-desc font-sans text-[#666666] mb-9 px-2 sm:px-4 max-w-[680px] mx-auto" style={{ fontSize: '18px', lineHeight: '1.45', fontWeight: '300' }}>
          {t('hero.description').replace('<br/>', '\n').split('\n').map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            window.dispatchEvent(new Event('openContactModal'))
          }}
          className="main-btn inline-block font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main px-[55px] py-[22px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5 no-underline mx-4 sm:mx-0"
          style={{ fontWeight: '500' }}
        >
          {t('hero.cta')}
        </a>
      </div>
    </section>
  )
}

export default Hero
