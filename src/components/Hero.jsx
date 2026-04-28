import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Hero = ({
  title,
  subtitle,
  description,
  ctaLabel,
  onCtaClick,
  /** Если задано — кнопка ведёт по ссылке (якорь или URL), иначе модалка / onCtaClick */
  ctaHref,
  backgroundImage,
  /** Массив фонов для hero-слайдшоу */
  backgroundImages,
  /** Лёгкий слой поверх фото (например `bg-white/40`) — чтобы тёмный текст читался на любом снимке */
  imageOverlayClassName,
  showStructureLink = true,
  /** Контент под основной CTA (например быстрые ссылки) */
  belowCta,
  /** false — без uppercae в H1 (hub-главная) */
  titleUppercase = true,
} = {}) => {
  const { t } = useTranslation()

  const resolvedTitle = title ?? t('hero.title')
  const resolvedSubtitle = subtitle ?? t('hero.subtitle')
  const resolvedDescription = description ?? t('hero.description')
  const resolvedCtaLabel = ctaLabel ?? t('hero.cta')
  const heroImages = useMemo(() => {
    if (Array.isArray(backgroundImages) && backgroundImages.length > 0) {
      return backgroundImages
    }
    return [backgroundImage ?? '/images/main-photo.png']
  }, [backgroundImage, backgroundImages])
  const [readyImages, setReadyImages] = useState(() => heroImages.slice(0, 1))
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    setReadyImages(heroImages.slice(0, 1))
    setActiveSlide(0)
  }, [heroImages])

  useEffect(() => {
    if (heroImages.length <= 1) return undefined
    let cancelled = false
    const preloaders = heroImages.slice(1).map((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.loading = 'eager'
      img.src = src
      img.onload = () => {
        if (cancelled) return
        setReadyImages((prev) => (prev.includes(src) ? prev : [...prev, src]))
      }
      return img
    })

    return () => {
      cancelled = true
      preloaders.forEach((img) => {
        img.onload = null
      })
    }
  }, [heroImages])

  useEffect(() => {
    if (readyImages.length <= 1) return undefined
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % readyImages.length)
    }, 5500)
    return () => window.clearInterval(interval)
  }, [readyImages])

  useEffect(() => {
    if (activeSlide > readyImages.length - 1) {
      setActiveSlide(0)
    }
  }, [activeSlide, readyImages.length])

  return (
    <section
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Background Image - начинается с самого верха */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden" style={{ top: 0 }}>
        {readyImages.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={resolvedTitle}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectPosition: 'center top' }}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            onError={(e) => {
              if (e.target.src.endsWith('.png')) {
                e.target.src = '/images/main-photo.jpg'
              }
            }}
          />
        ))}
      </div>

      {imageOverlayClassName ? (
        <div
          className={`pointer-events-none absolute inset-0 z-[1] ${imageOverlayClassName}`}
          aria-hidden
        />
      ) : null}

      {/* Content - по центру экрана */}
      <div className="hero-content">
        <h1
          className={`hero-title font-serif text-text-main mb-[10px] px-2 sm:px-4 drop-shadow-lg ${titleUppercase ? 'uppercase' : ''}`}
          style={{ fontSize: 'clamp(34px, 4.5vw, 68px)', letterSpacing: titleUppercase ? '0.07em' : '0.02em', lineHeight: '1.1', fontWeight: '300', fontFamily: "'Cormorant Garamond', serif" }}
        >
          {resolvedTitle}
        </h1>
        {resolvedSubtitle ? (
          <h2 className="hero-subtitle font-sans text-text-main mb-4 px-2 sm:px-4 drop-shadow-lg" style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', letterSpacing: '0.02em', fontWeight: '400' }}>
            {resolvedSubtitle}
          </h2>
        ) : null}
        <p className="hero-desc font-sans text-text-main mb-9 px-2 sm:px-4 max-w-[680px] mx-auto" style={{ fontSize: '18px', lineHeight: '1.45', fontWeight: '300' }}>
          {resolvedDescription.replace('<br/>', '\n').split('\n').map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
        {ctaHref ? (
          <a
            href={ctaHref}
            className="main-btn inline-block font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main px-[55px] py-[22px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5 no-underline mx-4 sm:mx-0"
            style={{ fontWeight: '500' }}
          >
            {resolvedCtaLabel}
          </a>
        ) : (
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              if (onCtaClick) {
                onCtaClick()
                return
              }
              window.dispatchEvent(new Event('openContactModal'))
            }}
            className="main-btn inline-block font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main px-[55px] py-[22px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5 no-underline mx-4 sm:mx-0"
            style={{ fontWeight: '500' }}
          >
            {resolvedCtaLabel}
          </a>
        )}

        {belowCta ? <div className="mt-8 w-full max-w-[720px] px-4">{belowCta}</div> : null}

        {showStructureLink ? (
          <a
            href="/sitemap/"
            className="mt-4 inline-block font-sans text-[11px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-border-soft px-[38px] py-[16px] rounded-[50px] cursor-pointer transition-all duration-300 hover:border-text-main no-underline mx-4 sm:mx-0"
            style={{ fontWeight: '500' }}
          >
            Смотреть структуру сайта
          </a>
        ) : null}
      </div>
    </section>
  )
}

export default Hero
