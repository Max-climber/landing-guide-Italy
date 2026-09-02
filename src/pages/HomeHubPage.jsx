import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Navigation from '../components/Navigation'
import FaqSection from '../components/FaqSection'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BlogFeaturedSection from '../components/BlogFeaturedSection'
import { mountJsonLd, mountJsonLdScript, upsertMeta } from './seo/pageMeta'
import { buildFaqPageJsonLd } from './seo/faqSchema'
import { buildOrganizationSchema } from './seo/organizationSchema'
import { validatePhone, validateEmail, formatPhone } from '../utils/leadFormValidation'

const HOME_CANONICAL = 'https://vacanzabianca.ru/'
const HOME_OG_IMAGE = 'https://vacanzabianca.ru/images/main-photo.webp'
const HERO_BG = '/images/infographics/main-carusel-2.1.webp'
const HERO_SLIDES = [
  '/images/infographics/main-carusel-2.1.webp',
  '/images/infographics/main-carusel-1.1.webp',
  '/images/infographics/main-carusel-3.1.webp',
]

const WHY_INFOGRAPHIC_FILES = [
  'авторские маршруты.webp',
  'individual.webp',
  'полное сопровождение.webp',
  'локальная экспертиза.webp',
  'premium-comfort.webp',
  'скрытые жемчужины.webp',
]

const REVIEW_ANASTASIA_IMG = `/images/reviews/${encodeURIComponent('Анастасия и Михаил.webp')}`
const REVIEW_DMITRY_IMG = '/images/reviews/dmitry.webp'
const REVIEW_ILYA_MARIA_IMG = `/images/reviews/${encodeURIComponent('Илья и Мария.webp')}`
const REVIEW_AVATAR_FALLBACK = '/images/icons/favicon.png'

const REVIEW_DEFS = [
  { key: 'ilyaMaria', image: REVIEW_ILYA_MARIA_IMG },
  { key: 'anastasiaMikhail', image: REVIEW_ANASTASIA_IMG },
  { key: 'nadezhda', image: '/images/reviews/Nadezhda.webp' },
  { key: 'dmitry', image: REVIEW_DMITRY_IMG },
]

const ITALY_TOURS_BASE = '/images/Italy-page/tours'
const ITALY_TOUR_ARCH_IMAGE = `${ITALY_TOURS_BASE}/${encodeURIComponent('tours-Архитектура-впечатлений-север-Италии.webp')}`
const POPULAR_TOUR_IMAGES = [
  `${ITALY_TOURS_BASE}/tours-Lakes.webp`,
  `${ITALY_TOURS_BASE}/tours-from-Como-to-Venezia.webp`,
  `${ITALY_TOURS_BASE}/tours-Dolomity1.0.webp`,
  ITALY_TOUR_ARCH_IMAGE,
  `${ITALY_TOURS_BASE}/tours-Riviera.webp`,
  `${ITALY_TOURS_BASE}/tours-Alps.webp`,
]

/** Фоны карточек направлений — `public/images/infographics/` */
const DIR_IMAGES = {
  italy: '/images/infographics/path-Italy.webp',
  ch: '/images/infographics/path-Switzerlend.webp',
  fr: '/images/infographics/path-france.webp',
  alps: '/images/infographics/path-Alps.webp',
}

const DirectionCard = ({ href, image, title, moreLabel }) => {
  const body = (
    <>
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/45"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        <h3
          className={`font-serif text-[clamp(18px,2.2vw,24px)] leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform duration-300 ${
            href ? 'group-hover:-translate-y-5' : ''
          }`}
          style={{ fontWeight: 300 }}
        >
          {title}
        </h3>
        {href ? (
          <span className="pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-2 font-serif text-[13px] uppercase tracking-[0.08em] text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-5 sm:left-5">
            {moreLabel} →
          </span>
        ) : null}
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="group relative block w-full overflow-hidden rounded-xl border border-border-soft shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] aspect-[16/10] min-h-[180px] sm:min-h-[200px] md:aspect-[4/3] md:min-h-0"
      >
        {body}
      </a>
    )
  }

  return (
    <article className="group relative block w-full overflow-hidden rounded-xl border border-border-soft shadow-[0_10px_28px_rgba(0,0,0,0.06)] aspect-[16/10] min-h-[180px] sm:min-h-[200px] md:aspect-[4/3] md:min-h-0">
      {body}
    </article>
  )
}

const HomeHubPage = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false)
  const [finalStatus, setFinalStatus] = useState(null)
  const [finalFormData, setFinalFormData] = useState({ name: '', phone: '', email: '' })
  const [phoneError, setPhoneError] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

  const whyIconSrcs = useMemo(
    () => WHY_INFOGRAPHIC_FILES.map((file) => `/images/infographics/${encodeURIComponent(file)}`),
    [],
  )
  const whyCards = useMemo(() => t('italyPage.whyCards', { returnObjects: true }) || [], [t])
  const popularTours = useMemo(
    () =>
      (t('homePage.popularTours', { returnObjects: true }) || []).map((tour, idx) => ({
        ...tour,
        image: POPULAR_TOUR_IMAGES[idx] || tour.image,
      })),
    [t],
  )
  const bookingSteps = useMemo(() => {
    const raw = t('homePage.bookingSteps', { returnObjects: true }) || []
    return raw.map((item) =>
      typeof item === 'string' ? { title: item, text: '' } : { title: item.title, text: item.text || '' },
    )
  }, [t])
  const faqItems = useMemo(() => t('homePage.faq', { returnObjects: true }) || [], [t])
  const detailsLabel = t('italyPage.moreDetails')
  const reviewCards = useMemo(
    () =>
      REVIEW_DEFS.map(({ key, image }) => {
        const tr = t(`italyPage.reviews.${key}`, { returnObjects: true }) || {}
        return { title: tr.title, description: tr.quote, image }
      }),
    [t],
  )

  const orgSchema = useMemo(() => buildOrganizationSchema(), [])

  const blogFeatured = useMemo(() => t('homePage.blogFeatured', { returnObjects: true }) || [], [t])

  const faqSchema = useMemo(() => buildFaqPageJsonLd(faqItems), [faqItems])

  useEffect(() => {
    upsertMeta({
      title: t('homePage.metaTitle'),
      description: t('homePage.metaDescription'),
      canonical: HOME_CANONICAL,
      ogImage: HOME_OG_IMAGE,
    })
    const unmountOrg = mountJsonLd('home-jsonld', [orgSchema])
    const unmountFaq = mountJsonLdScript('home-jsonld-faq', faqSchema)
    return () => {
      unmountOrg()
      unmountFaq()
    }
  }, [faqSchema, orgSchema, t])

  useEffect(() => {
    const onOpen = () => setIsModalOpen(true)
    window.addEventListener('openContactModal', onOpen)
    return () => window.removeEventListener('openContactModal', onOpen)
  }, [])

  useEffect(() => {
    const hash = window.location.hash?.replace(/^#/, '')
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
      const header = document.querySelector('.header')
      const h = header?.offsetHeight ?? 88
      setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.pageYOffset - h - 8
        window.scrollTo({ top, behavior: 'smooth' })
      }, 100)
    }
  }, [])

  const finalToast = finalStatus === 'success' ? t('homePage.finalSuccess') : t('homePage.finalError')

  const handleFinalPhoneChange = (event) => {
    const formatted = formatPhone(event.target.value)
    setFinalFormData((prev) => ({ ...prev, phone: formatted }))
    if (phoneTouched) setPhoneError(validatePhone(formatted))
  }

  const handleFinalPhoneBlur = () => {
    setPhoneTouched(true)
    setPhoneError(validatePhone(finalFormData.phone))
  }

  const handleFinalEmailChange = (event) => {
    const value = event.target.value
    setFinalFormData((prev) => ({ ...prev, email: value }))
    if (emailTouched) setEmailError(validateEmail(value))
  }

  const handleFinalEmailBlur = () => {
    setEmailTouched(true)
    setEmailError(validateEmail(finalFormData.email))
  }

  const handleFinalCtaSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const phoneValidationError = validatePhone(finalFormData.phone)
    const emailValidationError = validateEmail(finalFormData.email)
    setPhoneTouched(true)
    setEmailTouched(true)
    setPhoneError(phoneValidationError)
    setEmailError(emailValidationError)
    if (phoneValidationError || emailValidationError) return

    const name = finalFormData.name.trim()
    const phone = finalFormData.phone.trim()
    const email = finalFormData.email.trim()

    setIsFinalSubmitting(true)
    setFinalStatus(null)
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ieteu8c'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_mgom9am'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'hWDtd1yXUvolBOTS5'
      if (!serviceId || !templateId || !publicKey) throw new Error('EmailJS params are not configured')

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'mail@vacanzabianca.ru',
          from_name: name,
          from_email: email,
          phone,
          program: t('homePage.metaTitle'),
          message: t('homePage.finalAutoMessage'),
          subject: t('homePage.finalEmailSubject'),
        },
        publicKey,
      )

      form.reset()
      setFinalFormData({ name: '', phone: '', email: '' })
      setPhoneTouched(false)
      setEmailTouched(false)
      setPhoneError('')
      setEmailError('')
      setFinalStatus('success')
      setTimeout(() => setFinalStatus(null), 7000)
    } catch (err) {
      console.error(err)
      setFinalStatus('error')
      setTimeout(() => setFinalStatus(null), 7000)
    } finally {
      setIsFinalSubmitting(false)
    }
  }

  const quickFilters = (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <a
        href="/alps/gornolyzhnye-tury"
        className="inline-flex w-full min-h-[48px] items-center justify-center rounded-[50px] border border-text-main bg-bg-base/30 px-5 py-4 font-sans text-[12px] uppercase tracking-[0.12em] text-text-main no-underline backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main hover:text-white sm:w-auto sm:whitespace-nowrap sm:px-[55px] sm:py-[22px] sm:text-[14px] sm:tracking-[0.14em]"
        style={{ fontWeight: 600 }}
      >
        {t('homePage.quickSki')}
      </a>
      <a
        href="/italy/"
        className="inline-flex w-full min-h-[48px] items-center justify-center rounded-[50px] border border-text-main bg-bg-base/30 px-5 py-4 font-sans text-[12px] uppercase tracking-[0.12em] text-text-main no-underline backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main hover:text-white sm:w-auto sm:whitespace-nowrap sm:px-[55px] sm:py-[22px] sm:text-[14px] sm:tracking-[0.14em]"
        style={{ fontWeight: 600 }}
      >
        {t('homePage.quickItaly')}
      </a>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <Hero
        title={t('homePage.heroTitle')}
        subtitle=""
        description={t('homePage.heroLead')}
        ctaLabel={t('homePage.heroCta')}
        ctaHref="#popular-tours"
        backgroundImage={HERO_BG}
        backgroundImages={HERO_SLIDES}
        imageOverlayClassName="bg-[rgba(241,236,235,0.52)]"
        showStructureLink={false}
        titleUppercase={false}
        belowCta={quickFilters}
      />

      <main className="pb-16">
        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.directionsHeading')}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DirectionCard href="/italy/" image={DIR_IMAGES.italy} title={t('homePage.dirItalyTitle')} moreLabel={detailsLabel} />
            <DirectionCard href="/switzerland/" image={DIR_IMAGES.ch} title={t('homePage.dirChTitle')} moreLabel={detailsLabel} />
            <DirectionCard href="/france/" image={DIR_IMAGES.fr} title={t('homePage.dirFrTitle')} moreLabel={detailsLabel} />
            <DirectionCard href="/alps/gornolyzhnye-tury" image={DIR_IMAGES.alps} title={t('homePage.dirAlpsTitle')} moreLabel={detailsLabel} />
          </div>
        </section>

        <section className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.whyHeading')}</h2>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {whyCards.map((card, idx) => (
              <article key={`${card.title}-${idx}`} className="flex flex-col items-center px-2 text-center sm:px-3">
                <div className="mb-5 flex w-full justify-center">
                  <img
                    src={whyIconSrcs[idx]}
                    alt=""
                    className="h-12 w-12 object-contain"
                    style={{ filter: 'grayscale(1)', opacity: 0.72 }}
                    loading="lazy"
                  />
                </div>
                <h3 className="mb-3 font-serif text-[26px] leading-snug text-text-main" style={{ fontWeight: 300 }}>
                  {card.title}
                </h3>
                <p className="max-w-sm text-sm leading-7 text-text-light">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="popular-tours" className="mx-auto mt-24 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.popularHeading')}</h2>
          <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularTours.map((tour, idx) => (
              <article
                key={`${tour.title}-${idx}`}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="mb-2 font-serif text-[24px] leading-[1.1] text-text-main" style={{ fontWeight: 300 }}>
                    {tour.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-6 text-text-light">{tour.route}</p>
                  <dl className="mb-3 grid grid-cols-2 gap-x-3 gap-y-2 border-y border-border-soft py-3">
                    <dt className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('italyPage.labelGuests')}</dt>
                    <dt className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('italyPage.labelDuration')}</dt>
                    <dd className="m-0 text-sm font-medium text-text-main">{tour.people}</dd>
                    <dd className="m-0 text-sm font-medium text-text-main">{tour.duration}</dd>
                    <dt className="col-span-2 mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('italyPage.labelPrice')}</dt>
                    <dd className="col-span-2 m-0 mb-1 font-serif text-[clamp(20px,2.2vw,26px)] text-text-main" style={{ fontWeight: 400 }}>
                      {tour.price}
                    </dd>
                  </dl>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={tour.detailsHref}
                      download={tour.detailsDownload ? '' : undefined}
                      className="rounded-[40px] border border-text-main px-3 py-2 text-center text-[10px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
                    >
                      {t('homePage.moreDetails')}
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-[40px] border border-text-main bg-text-main px-3 py-2 text-center text-[10px] uppercase tracking-[0.11em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90"
                    >
                      {t('homePage.discussTour')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="booking-steps"
          className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5"
          aria-labelledby="booking-steps-heading"
        >
          <h2 id="booking-steps-heading" className="section-title mb-8 text-center md:mb-8">
            {t('homePage.bookingHeading')}
          </h2>
          <div className="px-2 py-2 sm:px-4 md:px-6 lg:px-8">
            <div className="relative mx-auto max-w-[1080px]">
              <div className="pointer-events-none absolute left-0 right-0 top-8 z-[1] hidden h-[2px] bg-[#d3ccc6] md:block" aria-hidden />

              <ol className="relative z-[2] m-0 grid list-none gap-10 p-0 md:grid-cols-5 md:items-stretch md:gap-4">
                {bookingSteps.map((step, index) => (
                  <li key={`booking-step-${index}`} className="flex min-w-0 flex-col items-center text-center md:h-full">
                    <div
                      className="order-1 mb-4 grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full border border-[#e1dad4] bg-bg-base text-text-main"
                    >
                      <span
                        className="block font-serif text-[30px] leading-none"
                        style={{ fontVariantNumeric: 'lining-nums tabular-nums' }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div
                      className="order-2 flex w-full flex-col rounded-2xl border border-border-soft bg-bg-card p-4 shadow-[0_8px_22px_rgba(0,0,0,0.04)] sm:p-5 md:h-full md:min-h-[190px]"
                    >
                      <h3 className="mb-2 font-serif text-[22px] leading-[1.15] text-text-main break-words">
                        {step.title}
                      </h3>
                      {step.text ? (
                        <p className="font-serif text-[15px] leading-[1.25] text-text-light break-words">
                          {step.text}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto mt-24 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('homePage.aboutHeading')}</h2>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <p className="order-1 text-base leading-8 text-text-light sm:text-[17px] sm:leading-8">{t('homePage.aboutText')}</p>
            <div className="order-2 w-full max-w-[360px] justify-self-center overflow-hidden rounded-2xl border border-border-soft bg-black shadow-[0_12px_36px_rgba(0,0,0,0.06)] lg:justify-self-end">
              <video
                src="/videos/main-home.optimized.mov"
                poster="/videos/заставка.png"
                className="aspect-[9/16] w-full object-contain"
                controls
                loop
                muted
                playsInline
                preload="none"
              />
            </div>
          </div>
        </section>

        <section id="reviews" className="mx-auto mt-24 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.reviewsHeading')}</h2>
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-3 pt-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:snap-none lg:grid-cols-4">
            {reviewCards.map((item, idx) => (
              <article
                key={`${item.title}-${idx}`}
                className="flex min-h-0 w-[min(100%,340px)] flex-shrink-0 snap-center flex-col rounded-xl border border-border-soft bg-bg-card p-5 shadow-[0_8px_22px_rgba(0,0,0,0.03)] sm:p-6 md:w-auto md:min-w-0 md:flex-1 md:snap-none"
              >
                <div className="mb-2 font-serif text-3xl leading-none text-text-main/25" aria-hidden>
                  ”
                </div>
                <blockquote className="mb-0 min-h-0 flex-1 text-sm leading-7 text-text-light">{item.description}</blockquote>
                <div className="mt-4 flex shrink-0 items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 flex-shrink-0 rounded-full bg-[#e8e4df] object-cover ring-1 ring-border-soft"
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      const el = event.currentTarget
                      if (el.dataset.fallbackApplied === '1') return
                      el.dataset.fallbackApplied = '1'
                      el.src = REVIEW_AVATAR_FALLBACK
                    }}
                  />
                  <span className="font-serif text-base text-text-main" style={{ fontWeight: 400 }}>
                    {item.title}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <FaqSection
          heading={t('homePage.faqHeading')}
          items={faqItems}
          className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5"
        />

        <section id="final-cta" className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="overflow-hidden bg-bg-base">
            <div className="relative z-10 px-4 pb-2 pt-6 sm:px-8 sm:pb-3 sm:pt-8">
              <h2 className="section-title !mb-3 text-center text-[clamp(28px,4vw,38px)]">{t('homePage.finalTitle')}</h2>
              <p className="mx-auto mb-0 max-w-[720px] text-center text-sm leading-7 text-text-light">{t('homePage.finalDescription')}</p>
            </div>
          </div>

          <div className="mt-2 sm:mt-3">
            <div className="relative z-10 mx-auto w-full max-w-[760px] px-5 py-5 sm:px-6 sm:py-6">
              <form onSubmit={handleFinalCtaSubmit} className="mx-auto flex w-full max-w-[640px] flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  value={finalFormData.name}
                  onChange={(e) => setFinalFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder={t('italyPage.finalCta.namePlaceholder')}
                  className="w-full rounded-[14px] border border-border-soft bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-[#9c9c9c] focus:border-text-main"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={finalFormData.phone}
                  onChange={handleFinalPhoneChange}
                  onBlur={handleFinalPhoneBlur}
                  placeholder="+7 (999) 123-45-67 или +39 123 456 7890"
                  className={`w-full rounded-[14px] border bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-[#9c9c9c] ${
                    phoneTouched && phoneError ? 'border-red-400 focus:border-red-400' : 'border-border-soft focus:border-text-main'
                  }`}
                />
                {phoneTouched && phoneError ? <p className="mt-1 text-xs text-red-400">{phoneError}</p> : null}
                <input
                  type="email"
                  name="email"
                  required
                  value={finalFormData.email}
                  onChange={handleFinalEmailChange}
                  onBlur={handleFinalEmailBlur}
                  placeholder="your@email.com"
                  className={`w-full rounded-[14px] border bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-[#9c9c9c] ${
                    emailTouched && emailError ? 'border-red-400 focus:border-red-400' : 'border-border-soft focus:border-text-main'
                  }`}
                />
                {emailTouched && emailError ? <p className="mt-1 text-xs text-red-400">{emailError}</p> : null}
                <button
                  type="submit"
                  disabled={isFinalSubmitting}
                  className="main-btn w-full rounded-[50px] border border-text-main bg-text-main px-6 py-4 text-[13px] uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontWeight: 500 }}
                >
                  {isFinalSubmitting ? t('homePage.finalSubmitting') : t('homePage.finalSubmit')}
                </button>
                <p className="text-center text-xs leading-6 text-[#8a8a8a]">
                  {t('homePage.finalPrivacyPrefix')}{' '}
                  <span className="underline-offset-4 hover:underline">{t('homePage.finalPrivacyLink')}</span>
                </p>
              </form>
            </div>
          </div>
        </section>

        <BlogFeaturedSection
          heading={t('homePage.blogHeading')}
          items={blogFeatured}
          allArticlesLabel={t('homePage.blogAllArticles')}
        />
      </main>

      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {finalStatus ? (
        <div className="fixed bottom-5 left-1/2 z-[70] w-[min(92vw,560px)] -translate-x-1/2 rounded-xl border border-border-soft bg-bg-card p-4 shadow-[0_10px_28px_rgba(0,0,0,0.2)]">
          <p className="text-sm leading-7 text-text-main">{finalToast}</p>
        </div>
      ) : null}
    </div>
  )
}

export default HomeHubPage
