import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PictureImg from './PictureImg'

const FALLBACK_HERO = '/images/main-photo.webp'

function handleHeroImgError(event) {
  const el = event.currentTarget
  if (el.dataset.heroFallback === '1') return
  el.dataset.heroFallback = '1'
  el.src = FALLBACK_HERO
}

const Hero = ({
  title,
  subtitle,
  description,
  ctaLabel,
  onCtaClick,
  /** Если задано — кнопка ведёт по ссылке (якорь или URL), иначе модалка / onCtaClick */
  ctaHref,
  /** Вторая CTA под основной (например «Подобрать тур» → якорь) */
  secondaryCtaLabel,
  secondaryCtaHref,
  onSecondaryCtaClick,
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
  /** onDark — белый текст и светлые кнопки поверх затемнённого фото */
  tone = 'default',
} = {}) => {
  const { t } = useTranslation()
  const isOnDark = tone === 'onDark'

  const resolvedTitle = title ?? t('hero.title')
  const resolvedSubtitle = subtitle ?? t('hero.subtitle')
  const resolvedDescription = description ?? t('hero.description')
  const resolvedCtaLabel = ctaLabel ?? t('hero.cta')
  const textClass = isOnDark ? 'text-white' : 'text-text-main'
  const primaryBtnClass = isOnDark
    ? 'main-btn inline-flex min-h-[48px] items-center justify-center rounded-[50px] border border-white/80 bg-white/90 px-[55px] py-[22px] font-sans text-[14px] uppercase tracking-[0.14em] text-text-main no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white mx-4 sm:mx-0'
    : 'main-btn inline-flex min-h-[48px] items-center justify-center rounded-[50px] border border-text-main bg-text-main px-[55px] py-[22px] font-sans text-[14px] uppercase tracking-[0.14em] text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90 mx-4 sm:mx-0'
  const secondaryBtnClass = isOnDark
    ? 'inline-flex min-h-[48px] items-center justify-center rounded-[50px] border border-white/70 bg-white/20 px-[38px] py-[16px] font-sans text-[12px] uppercase tracking-[0.14em] text-white no-underline backdrop-blur-[2px] transition-all duration-300 hover:bg-white/30 mx-4 sm:mx-0'
    : 'inline-flex min-h-[48px] items-center justify-center rounded-[50px] border border-text-main bg-transparent px-[38px] py-[16px] font-sans text-[12px] uppercase tracking-[0.14em] text-text-main no-underline transition-all duration-300 hover:border-text-main hover:bg-white/40 mx-4 sm:mx-0'
  const heroImages = useMemo(() => {
    if (Array.isArray(backgroundImages) && backgroundImages.length > 0) {
      return backgroundImages
    }
    return [backgroundImage ?? FALLBACK_HERO]
  }, [backgroundImage, backgroundImages])
  const [activeSlide, setActiveSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(null)
  const [isFading, setIsFading] = useState(false)
  const activeSlideRef = useRef(activeSlide)

  useEffect(() => {
    activeSlideRef.current = activeSlide
  }, [activeSlide])

  useEffect(() => {
    setActiveSlide(0)
    setPrevSlide(null)
    setIsFading(false)
  }, [heroImages])

  useEffect(() => {
    if (heroImages.length <= 1) return undefined
    const interval = window.setInterval(() => {
      const current = activeSlideRef.current
      const next = (current + 1) % heroImages.length
      setPrevSlide(current)
      setIsFading(false)
      setActiveSlide(next)
      // Даем React отрисовать новый слайд со стартовой opacity=0,
      // после чего включаем transition для crossfade.
      window.requestAnimationFrame(() => setIsFading(true))
    }, 5500)
    return () => window.clearInterval(interval)
  }, [heroImages])

  useEffect(() => {
    if (prevSlide === null) return undefined
    const t = window.setTimeout(() => setPrevSlide(null), 1900)
    return () => window.clearTimeout(t)
  }, [activeSlide, prevSlide])

  return (
    <section
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Background Image - начинается с самого верха */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden" style={{ top: 0 }}>
        {prevSlide !== null && prevSlide !== activeSlide ? (
          <PictureImg
            src={heroImages[prevSlide]}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
              isFading ? 'z-0 opacity-0' : 'z-0 opacity-100'
            } pointer-events-none`}
            style={{ objectPosition: 'center top' }}
            loading="eager"
            decoding="async"
            onError={handleHeroImgError}
          />
        ) : null}

        <PictureImg
          key={heroImages[activeSlide]}
          src={heroImages[activeSlide]}
          alt={prevSlide === null ? resolvedTitle : ''}
          aria-hidden={prevSlide !== null}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            prevSlide === null ? 'z-[1] opacity-100' : isFading ? 'z-[1] opacity-100' : 'z-[1] opacity-0'
          } pointer-events-none`}
          style={{ objectPosition: 'center top' }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={handleHeroImgError}
        />
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
          className={`hero-title mt-0 max-[425px]:mt-12 font-serif ${textClass} mb-[10px] px-2 sm:px-4 drop-shadow-lg ${titleUppercase ? 'uppercase' : ''}`}
          style={{ fontSize: 'clamp(37.4px, 4.95vw, 74.8px)', letterSpacing: titleUppercase ? '0.07em' : '0.02em', lineHeight: '1.1', fontWeight: '600', fontFamily: "'Cormorant Garamond', serif" }}
        >
          {resolvedTitle}
        </h1>
        {resolvedSubtitle ? (
          <h2 className={`hero-subtitle font-sans ${textClass} mb-4 px-2 sm:px-4 drop-shadow-lg`} style={{ fontSize: 'clamp(19.8px, 2.42vw, 24.2px)', letterSpacing: '0.02em', fontWeight: '400' }}>
            {resolvedSubtitle}
          </h2>
        ) : null}
        <p className={`hero-desc font-sans ${textClass} mb-9 px-2 sm:px-4 max-w-[748px] mx-auto`} style={{ fontSize: '19.8px', lineHeight: '1.45', fontWeight: '400' }}>
          {resolvedDescription.replace('<br/>', '\n').split('\n').map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          {ctaHref ? (
            <a
              href={ctaHref}
              className={primaryBtnClass}
              style={{ fontWeight: '600' }}
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
              className={primaryBtnClass}
              style={{ fontWeight: '600' }}
            >
              {resolvedCtaLabel}
            </a>
          )}
          {secondaryCtaLabel && secondaryCtaHref ? (
            <a
              href={secondaryCtaHref}
              onClick={onSecondaryCtaClick}
              className={secondaryBtnClass}
              style={{ fontWeight: '600' }}
            >
              {secondaryCtaLabel}
            </a>
          ) : null}
        </div>

        {belowCta ? <div className="mt-8 w-full max-w-[980px] px-4">{belowCta}</div> : null}

        {showStructureLink ? (
          <a
            href="/sitemap/"
            className="mt-4 inline-block font-sans text-[12px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-border-soft px-[38px] py-[16px] rounded-[50px] cursor-pointer transition-all duration-300 hover:border-text-main no-underline mx-4 sm:mx-0"
            style={{ fontWeight: '600' }}
          >
            Смотреть структуру сайта
          </a>
        ) : null}
      </div>
    </section>
  )
}

export default Hero
