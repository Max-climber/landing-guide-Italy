import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'
import { validatePhone, validateEmail, formatPhone } from '../utils/leadFormValidation'

const HOME_CANONICAL = 'https://vacanzabianca.ru/'
const HOME_OG_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2200&q=80'
const HERO_BG = HOME_OG_IMAGE
const HERO_SLIDES = [
  '/images/infographics/main-carusel-1.png',
  '/images/infographics/main-carusel-2.png',
  '/images/infographics/main-carusel-3.png',
  '/images/infographics/main-carusel-4.png',
  '/images/infographics/main-carusel-5.png',
]

const WHY_INFOGRAPHIC_FILES = [
  'авторские маршруты.png',
  'индивидуальный формат.png',
  'полное сопровождение.png',
  'локальная экспертиза.png',
  'Премиальный комфорт.png',
  'скрытые жемчужины.png',
]

const REVIEW_DEFS = [
  { key: 'alina', image: '/images/reviews/ksenia.jpeg' },
  { key: 'katerina', image: '/images/reviews/olga.png' },
  { key: 'dmitry', image: '/images/reviews/vardan.png' },
]

const DIR_IMAGES = {
  italy: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80',
  ch: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d763b?auto=format&fit=crop&w=1400&q=80',
  fr: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1400&q=80',
  alps: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
}

const CountryCardLink = ({ href, image, title, cta }) => (
  <a
    href={href}
    className="group relative block aspect-[4/5] w-full min-h-[220px] overflow-hidden rounded-2xl border border-border-soft shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)]"
  >
    <img
      src={image}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/35 to-black/15" aria-hidden />
    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
      <h3 className="font-serif text-[clamp(22px,3vw,30px)] leading-tight text-white drop-shadow-md" style={{ fontWeight: 300 }}>
        {title}
      </h3>
      <span className="mt-3 inline-flex font-sans text-[11px] uppercase tracking-[0.14em] text-white/90">{cta}</span>
    </div>
  </a>
)

const CountryCardSoon = ({ image, title, soonLabel }) => (
  <div className="relative aspect-[4/5] w-full min-h-[220px] overflow-hidden rounded-2xl border border-border-soft shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/40 to-black/20" aria-hidden />
    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
      <h3 className="font-serif text-[clamp(22px,3vw,30px)] leading-tight text-white drop-shadow-md" style={{ fontWeight: 300 }}>
        {title}
      </h3>
      <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.12em] text-white/65">{soonLabel}</p>
    </div>
  </div>
)

const HomeHubPage = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openedFaq, setOpenedFaq] = useState(-1)
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
  const popularTours = useMemo(() => t('homePage.popularTours', { returnObjects: true }) || [], [t])
  const bookingSteps = useMemo(() => t('homePage.bookingSteps', { returnObjects: true }) || [], [t])
  const faqItems = useMemo(() => t('homePage.faq', { returnObjects: true }) || [], [t])
  const blogFeatured = useMemo(() => t('italyPage.blogFeatured', { returnObjects: true }) || [], [t])
  const reviewCards = useMemo(
    () =>
      REVIEW_DEFS.map(({ key, image }) => {
        const tr = t(`italyPage.reviews.${key}`, { returnObjects: true }) || {}
        return { title: tr.title, description: tr.quote, image }
      }),
    [t],
  )

  const schemaData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vacanza Bianca',
        url: HOME_CANONICAL,
        logo: 'https://vacanzabianca.ru/images/icons/favicon.png',
        sameAs: [
          'https://www.instagram.com/it.tours.mountains.transfer?igsh=MWF6bHR1M3k4YzJpag==',
          'https://t.me/la_vacanza_bianca',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answerHtml,
          },
        })),
      },
    ],
    [faqItems],
  )

  useEffect(() => {
    upsertMeta({
      title: t('homePage.metaTitle'),
      description: t('homePage.metaDescription'),
      canonical: HOME_CANONICAL,
      ogImage: HOME_OG_IMAGE,
    })
    const unmount = mountJsonLd('home-jsonld', schemaData)
    return () => unmount()
  }, [schemaData, t])

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
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <a
        href="/alps/gornolyzhnye-tury"
        className="inline-flex min-h-[48px] items-center rounded-full border border-white/70 bg-white/15 px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.1em] text-white no-underline backdrop-blur-sm transition-all hover:bg-white/25"
      >
        ⛷️ {t('homePage.quickSki')}
      </a>
      <a
        href="/italy/"
        className="inline-flex min-h-[48px] items-center rounded-full border border-white/70 bg-white/15 px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.1em] text-white no-underline backdrop-blur-sm transition-all hover:bg-white/25"
      >
        🇮🇹 {t('homePage.quickItaly')}
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
        imageOverlayClassName="bg-[rgba(241,236,235,0.45)]"
        showStructureLink={false}
        titleUppercase={false}
        belowCta={quickFilters}
      />

      <main className="pb-16">
        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.directionsHeading')}</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <CountryCardLink
              href="/italy/"
              image={DIR_IMAGES.italy}
              title={t('homePage.dirItalyTitle')}
              cta={t('homePage.dirItalyCta')}
            />
            <CountryCardSoon image={DIR_IMAGES.ch} title={t('homePage.dirChTitle')} soonLabel={t('footer.soon')} />
            <CountryCardSoon image={DIR_IMAGES.fr} title={t('homePage.dirFrTitle')} soonLabel={t('footer.soon')} />
            <CountryCardSoon image={DIR_IMAGES.alps} title={t('homePage.dirAlpsTitle')} soonLabel={t('footer.soon')} />
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
                    className="h-12 w-12 object-contain brightness-0"
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
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
            {popularTours.map((tour, idx) => (
              <article
                key={`${tour.title}-${idx}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-bg-card shadow-[0_10px_32px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="mb-3 font-serif text-[28px] leading-tight text-text-main" style={{ fontWeight: 300 }}>
                    {tour.title}
                  </h3>
                  <p className="mb-5 text-sm leading-7 text-text-light">{tour.route}</p>
                  <div className="mt-auto">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-y border-border-soft py-4 text-[12px] uppercase tracking-[0.08em] text-[#666]">
                      <span>👤 {tour.people}</span>
                      <span>⏳ {tour.duration}</span>
                    </div>
                    <p className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] text-text-main" style={{ fontWeight: 400 }}>
                      {tour.price}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={tour.detailsHref}
                        download={tour.detailsDownload ? '' : undefined}
                        className="rounded-[40px] border border-text-main py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all hover:bg-text-main hover:text-white"
                      >
                        {t('homePage.moreDetails')}
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-[40px] border border-text-main bg-text-main py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-white transition-all hover:bg-text-main/90"
                      >
                        {t('homePage.discussTour')}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.bookingHeading')}</h2>
          <ol className="mx-auto grid max-w-[900px] gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {bookingSteps.map((step, i) => (
              <li
                key={i}
                className="relative rounded-2xl border border-border-soft bg-bg-card/80 px-5 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-text-main font-serif text-lg text-text-main">
                  {i + 1}
                </span>
                <p className="font-sans text-sm leading-6 text-text-main" style={{ fontWeight: 500 }}>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about-us" className="mx-auto mt-24 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('homePage.aboutHeading')}</h2>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-2xl border border-border-soft shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
              <img
                src="/images/about/hero-composite.jpg"
                alt=""
                className="h-full min-h-[280px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-base leading-8 text-text-light sm:text-[17px] sm:leading-8">{t('homePage.aboutText')}</p>
          </div>
        </section>

        <section id="reviews" className="mx-auto mt-24 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-12 text-center">{t('homePage.reviewsHeading')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reviewCards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border-soft bg-bg-card p-5 shadow-[0_8px_22px_rgba(0,0,0,0.04)] sm:p-6"
              >
                <div className="mb-2 font-serif text-3xl leading-none text-text-main/25" aria-hidden>
                  ”
                </div>
                <blockquote className="mb-5 text-sm leading-7 text-text-light">{item.description}</blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-1 ring-border-soft"
                    loading="lazy"
                  />
                  <span className="font-serif text-base text-text-main" style={{ fontWeight: 400 }}>
                    {item.title}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto mt-24 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('homePage.faqHeading')}</h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openedFaq === index
              return (
                <article key={`faq-${index}`} className="overflow-hidden rounded-xl border border-border-soft bg-bg-card">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5"
                    onClick={() => setOpenedFaq((prev) => (prev === index ? -1 : index))}
                  >
                    <span className="pr-4 font-sans text-[15px] font-medium text-text-main">{item.question}</span>
                    <span className="text-xl text-text-main">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen ? (
                    <div
                      className="border-t border-border-soft px-5 py-4 text-sm leading-7 text-text-light sm:px-6 [&_p+p]:mt-3 [&_strong]:font-medium [&_strong]:text-text-main [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>

        <section id="final-cta" className="mx-auto mt-24 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-4 text-center text-[clamp(28px,4vw,38px)]">{t('homePage.finalTitle')}</h2>
          <p className="mx-auto mb-8 max-w-[720px] text-center text-sm leading-7 text-text-light">{t('homePage.finalDescription')}</p>
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
              className="main-btn w-full rounded-[50px] border border-text-main bg-transparent px-6 py-4 text-[13px] uppercase tracking-[0.14em] text-text-main transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontWeight: 500 }}
            >
              {isFinalSubmitting ? t('homePage.finalSubmitting') : t('homePage.finalSubmit')}
            </button>
            <p className="text-center text-xs leading-6 text-[#8a8a8a]">
              {t('homePage.finalPrivacyPrefix')}{' '}
              <span className="underline-offset-4 hover:underline">{t('homePage.finalPrivacyLink')}</span>
            </p>
          </form>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('homePage.blogHeading')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {blogFeatured.map((post, idx) => (
              <a
                key={`${post.href}-${idx}`}
                href={post.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]"
              >
                <div className="aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.12em] text-[#888]">{post.category}</p>
                  <h3 className="font-serif text-[20px] leading-snug text-text-main" style={{ fontWeight: 300 }}>
                    {post.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href="/blog"
              className="inline-flex rounded-[40px] border border-text-main px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
            >
              {t('homePage.blogAllArticles')}
            </a>
          </div>
        </section>
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
