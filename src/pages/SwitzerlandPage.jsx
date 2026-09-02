import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Navigation from '../components/Navigation'
import FaqSection from '../components/FaqSection'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbOverlay from '../components/BreadcrumbOverlay'
import {
  EqualHeightTourCard,
  EqualHeightTourCardGrid,
  TourCardProgramDetails,
  TourCardProgramActionsPlaceholder,
} from '../components/EqualHeightTourCardGrid'
import PictureImg from '../components/PictureImg'
import EqualHeightReviewCards from '../components/EqualHeightReviewCards'
import { mountJsonLd, mountJsonLdScript, upsertMeta } from './seo/pageMeta'
import { buildFaqPageJsonLd } from './seo/faqSchema'
import { buildOrganizationSchema } from './seo/organizationSchema'
import { ITALY_DETAIL_ROUTE } from '../data/italyStandaloneTourConfigs'
import { ITALY_TOUR_CARD_BUNDLES } from '../data/italyTourCardBundles'
import { ITALY_TOUR_CARD_BUNDLES_EN } from '../data/italyTourCardBundles.en'
import { isEnglishLocale } from '../utils/isEnglishLocale'
import { validatePhone, validateEmail, formatPhone } from '../utils/leadFormValidation'
import { BREADCRUMB_PARENT, setBreadcrumbParent } from '../utils/breadcrumbContext'
import {
  trackCtaClick,
  trackFormSubmit,
  trackFormSuccess,
  trackPdfDownload,
} from '../utils/analytics'

const SWITZERLAND_CANONICAL = 'https://vacanzabianca.ru/switzerland/'
const SWITZERLAND_HERO_IMAGE = '/images/switzerland-page/hero-switzerland.webp'
const HOME_ABSOLUTE = 'https://vacanzabianca.ru/'
const HOME_PATH = '/'
const ALPS_SKI_TOUR_PATH = '/alps/gornolyzhnye-tury/'
const ITALY_TOURS_BASE = '/images/Italy-page/tours'

const TOUR_BUILDERS = [
  {
    key: 'peaksDolomites',
    image: `${ITALY_TOURS_BASE}/tours-Dolomity1.0.webp`,
    detailsHref: ITALY_DETAIL_ROUTE.peaksDolomites,
    hasProgram: true,
  },
  {
    key: 'skiAlps',
    image: `${ITALY_TOURS_BASE}/tours-Alps.webp`,
    detailsHref: ALPS_SKI_TOUR_PATH,
    hasProgram: false,
  },
]

const DIRECTION_DEFS = [
  { key: 'stMoritz', image: '/images/switzerland-page/directions/st-moritz.webp' },
  { key: 'zermatt', image: '/images/switzerland-page/directions/zermatt.webp' },
  { key: 'verbier', image: '/images/switzerland-page/directions/verbier.webp' },
  { key: 'laax', image: '/images/switzerland-page/directions/laax.webp' },
  { key: 'cransMontana', image: '/images/switzerland-page/directions/crans-montana.webp' },
]

const REVIEW_ANASTASIA_IMG = `/images/reviews/${encodeURIComponent('Анастасия и Михаил.webp')}`
const REVIEW_DMITRY_IMG = '/images/reviews/dmitry.webp'
const REVIEW_AVATAR_FALLBACK = '/images/icons/favicon.png'

/** Отзыв про Альпы/Трентино — первым; далее общие отзывы Vacanza Bianca. */
const REVIEW_DEFS = [
  { key: 'trentino', image: '/images/reviews/trentino-guest.webp' },
  { key: 'anastasiaMikhail', image: REVIEW_ANASTASIA_IMG },
  { key: 'nadezhda', image: '/images/reviews/Nadezhda.webp' },
  { key: 'dmitry', image: REVIEW_DMITRY_IMG },
]

/** Короткие отзывы (~до 4 строк) показываем целиком; длинный режем короче, чтобы с кнопкой высота совпала. */
const REVIEW_FULL_THRESHOLD = 120
const REVIEW_PREVIEW_MAX = 78

function truncateReviewPreview(text, maxLen = REVIEW_PREVIEW_MAX) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim()
  if (normalized.length <= REVIEW_FULL_THRESHOLD) {
    return { preview: normalized, needsExpand: false }
  }
  const slice = normalized.slice(0, maxLen)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > maxLen * 0.55 ? slice.slice(0, lastSpace) : slice
  return { preview: `${cut.trimEnd()}…`, needsExpand: true }
}

function ReviewAvatar({ src, alt = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      width={44}
      height={44}
      className="h-11 w-11 flex-shrink-0 rounded-full bg-[#e8e4df] object-cover ring-1 ring-border-soft"
      loading="eager"
      decoding="async"
      fetchPriority="low"
      onError={(event) => {
        const el = event.currentTarget
        if (el.dataset.fallbackApplied === '1') return
        el.dataset.fallbackApplied = '1'
        el.src = REVIEW_AVATAR_FALLBACK
      }}
    />
  )
}

const PromoImageCard = ({ href, image, title, alt, aspectClassName = 'aspect-[3/4]', onBeforeNavigate }) => {
  const baseClassName = `group relative block w-full overflow-hidden rounded-xl border border-border-soft shadow-[0_10px_28px_rgba(0,0,0,0.06)] ${aspectClassName}`

  const prefetch = () => {
    if (!href || typeof document === 'undefined') return
    if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }

  const content = (
    <>
      <PictureImg
        src={image}
        alt={alt || title}
        className={`absolute inset-0 h-full w-full object-cover ${href ? 'transition-transform duration-300 group-hover:scale-[1.03]' : ''}`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = '/images/main-photo.webp'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" aria-hidden />
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        <h3
          className="font-serif text-[clamp(18px,2.2vw,24px)] leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          style={{ fontWeight: 300 }}
        >
          {title}
        </h3>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onBeforeNavigate}
        onMouseEnter={prefetch}
        onTouchStart={prefetch}
        className={`${baseClassName} transition-transform duration-200 hover:-translate-y-0.5`}
      >
        {content}
      </a>
    )
  }

  return <article className={baseClassName}>{content}</article>
}

const SwitzerlandPage = () => {
  const { t, i18n } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false)
  const [finalStatus, setFinalStatus] = useState(null)
  const [finalFormData, setFinalFormData] = useState({ name: '', phone: '', email: '' })
  const [phoneError, setPhoneError] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [expandedReviewKey, setExpandedReviewKey] = useState(null)

  const tours = useMemo(
    () =>
      TOUR_BUILDERS.map(({ key, image, detailsHref, hasProgram }) => {
        const tr = t(`switzerlandPage.tours.${key}`, { returnObjects: true }) || {}
        const bundles = isEnglishLocale(i18n.language) ? ITALY_TOUR_CARD_BUNDLES_EN : ITALY_TOUR_CARD_BUNDLES
        return {
          ...tr,
          tourKey: key,
          image,
          detailsHref,
          programBundle: hasProgram ? bundles[key] : undefined,
        }
      }),
    [t, i18n.language],
  )

  const directionCards = useMemo(
    () =>
      DIRECTION_DEFS.map(({ key, image }) => {
        const tr = t(`switzerlandPage.directions.${key}`, { returnObjects: true }) || {}
        return {
          cardKey: key,
          title: tr.title,
          alt: tr.alt,
          image,
          href: key === 'stMoritz' ? '/switzerland/st-moritz/' : undefined,
        }
      }),
    [t],
  )

  const whyCards = useMemo(() => t('switzerlandPage.whyCards', { returnObjects: true }) || [], [t])

  const bookingSteps = useMemo(
    () => t('switzerlandPage.bookingSteps', { returnObjects: true }) || [],
    [t],
  )

  const reviewCards = useMemo(
    () =>
      REVIEW_DEFS.map(({ key, image }) => {
        const tr = t(`switzerlandPage.reviews.${key}`, { returnObjects: true }) || {}
        const full = String(tr.quote || '')
        const { preview, needsExpand } = truncateReviewPreview(full)
        return { key, title: tr.title, full, preview, needsExpand, image }
      }),
    [t],
  )

  const faqItems = useMemo(() => t('switzerlandPage.faq', { returnObjects: true }) || [], [t])

  const schemaData = useMemo(
    () => [
      buildOrganizationSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('switzerlandPage.breadcrumbHome'),
            item: HOME_ABSOLUTE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('switzerlandPage.breadcrumbCurrent'),
            item: SWITZERLAND_CANONICAL,
          },
        ],
      },
    ],
    [t],
  )

  const faqSchema = useMemo(() => buildFaqPageJsonLd(faqItems, { preserveHtml: true }), [faqItems])

  useEffect(() => {
    setBreadcrumbParent(BREADCRUMB_PARENT.switzerland)
    upsertMeta({
      title: t('switzerlandPage.metaTitle'),
      description: t('switzerlandPage.metaDescription'),
      canonical: SWITZERLAND_CANONICAL,
      ogImage: `https://vacanzabianca.ru${SWITZERLAND_HERO_IMAGE}`,
    })

    const unmountBase = mountJsonLd('switzerland-jsonld', schemaData)
    const unmountFaq = mountJsonLdScript('switzerland-jsonld-faq', faqSchema)
    return () => {
      unmountBase()
      unmountFaq()
    }
  }, [faqSchema, schemaData, t])

  useEffect(() => {
    const onOpen = () => setIsModalOpen(true)
    window.addEventListener('openContactModal', onOpen)
    return () => window.removeEventListener('openContactModal', onOpen)
  }, [])

  const finalToast =
    finalStatus === 'success' ? t('switzerlandPage.finalCta.success') : t('switzerlandPage.finalCta.error')

  const openContactModal = (ctaText, ctaPosition, extra = {}) => {
    trackCtaClick({ ctaText, ctaPosition, ...extra })
    setIsModalOpen(true)
  }

  const handleFinalNameChange = (event) => {
    setFinalFormData((prev) => ({ ...prev, name: event.target.value }))
  }

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
    const submitLabel = t('switzerlandPage.finalCta.submit')

    trackFormSubmit({ ctaText: submitLabel, ctaPosition: 'final' })

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

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS params are not configured')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'mail@vacanzabianca.ru',
          from_name: name,
          from_email: email,
          phone,
          program: t('switzerlandPage.breadcrumbCurrent'),
          message: t('switzerlandPage.finalCta.autoMessage'),
          subject: t('switzerlandPage.finalCta.emailSubject'),
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
      trackFormSuccess({ ctaText: submitLabel, ctaPosition: 'final' })
      setTimeout(() => setFinalStatus(null), 7000)
    } catch (error) {
      console.error('Switzerland final CTA form error:', error)
      setFinalStatus('error')
      setTimeout(() => setFinalStatus(null), 7000)
    } finally {
      setIsFinalSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <div className="relative">
        <Hero
          title={t('switzerlandPage.heroTitle')}
          subtitle=""
          description={t('switzerlandPage.heroDescription')}
          ctaLabel={t('switzerlandPage.ctaOffer')}
          onCtaClick={() => openContactModal(t('switzerlandPage.ctaOffer'), 'hero')}
          secondaryCtaLabel={t('switzerlandPage.ctaPickTour')}
          secondaryCtaHref="#tours"
          onSecondaryCtaClick={() =>
            trackCtaClick({ ctaText: t('switzerlandPage.ctaPickTour'), ctaPosition: 'hero' })
          }
          showStructureLink={false}
          backgroundImage={SWITZERLAND_HERO_IMAGE}
          imageOverlayClassName="bg-black/45"
          tone="onDark"
        />
        <BreadcrumbOverlay
          ariaLabel={t('switzerlandPage.breadcrumbAria')}
          homeLabel={t('switzerlandPage.breadcrumbHome')}
          homeHref={HOME_PATH}
          currentLabel={t('switzerlandPage.breadcrumbCurrent')}
          tone="onDark"
        />
      </div>

      <main className="pb-12">
        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-6 text-center">{t('switzerlandPage.introHeading')}</h2>
          <p className="mx-auto mb-12 max-w-[820px] text-center text-sm leading-7 text-text-light">
            {t('switzerlandPage.introText')}
          </p>
          <div className="grid items-stretch gap-6 sm:grid-cols-2">
            {whyCards.map((card, idx) => (
              <article
                key={`${card.title}-${idx}`}
                className="flex h-full flex-col items-center rounded-xl border border-border-soft bg-bg-card p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-10"
              >
                <h3
                  className="mb-3 font-serif text-[clamp(22px,2.4vw,26px)] leading-[1.15] text-text-main"
                  style={{ fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p className="max-w-md flex-1 text-sm leading-6 text-text-light">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tours" className="mx-auto mt-20 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('switzerlandPage.toursHeading')}</h2>
          <EqualHeightTourCardGrid
            measureKey={tours.map((tour) => tour.tourKey).join('|')}
            className="mx-auto max-w-[900px] md:grid-cols-2"
          >
            {tours.map((tour) => {
              const discussLabel = t('switzerlandPage.discussTour')
              return (
                <EqualHeightTourCard
                  id={`tour-${tour.tourKey}`}
                  key={tour.tourKey}
                  cardKey={tour.tourKey}
                  className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.imageAlt || tour.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.src = '/images/main-photo.webp'
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      className="mb-3 whitespace-pre-line font-serif text-[30px] leading-[1.1] text-text-main"
                      style={{ fontWeight: '300' }}
                    >
                      {tour.title}
                    </h3>
                    <p className="mb-5 flex-1 whitespace-pre-line text-sm leading-6 text-text-light">{tour.route}</p>
                    <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border-soft py-4">
                      <dt className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">
                        {t('switzerlandPage.labelGuests')}
                      </dt>
                      <dt className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">
                        {t('switzerlandPage.labelDuration')}
                      </dt>
                      <dd className="m-0 text-sm font-medium text-text-main">{tour.people}</dd>
                      <dd className="m-0 text-sm font-medium text-text-main">{tour.duration}</dd>
                      <dt className="col-span-2 mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">
                        {t('switzerlandPage.labelPrice')}
                      </dt>
                      <dd
                        className={`col-span-2 m-0 font-serif leading-tight text-text-main ${
                          tour.tourKey === 'skiAlps'
                            ? 'text-[clamp(15px,1.9vw,20px)]'
                            : 'text-[clamp(22px,2.6vw,28px)]'
                        }`}
                        style={{ fontWeight: 400 }}
                      >
                        {tour.price}
                      </dd>
                    </dl>
                    <div>
                      {tour.programBundle ? (
                        <TourCardProgramDetails
                          cardKey={tour.tourKey}
                          bundle={tour.programBundle}
                          onPdfClick={() =>
                            trackPdfDownload({
                              ctaText: t('italyTourPages.downloadPdf'),
                              ctaPosition: 'tour_card',
                              tour: tour.tourKey,
                            })
                          }
                        />
                      ) : (
                        <TourCardProgramActionsPlaceholder />
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={tour.detailsHref}
                          className="rounded-[40px] border border-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
                          onClick={() => {
                            setBreadcrumbParent(BREADCRUMB_PARENT.switzerland)
                            trackCtaClick({
                              ctaText: t('switzerlandPage.moreDetails'),
                              ctaPosition: 'tour_card',
                              tour: tour.tourKey,
                            })
                          }}
                        >
                          {t('switzerlandPage.moreDetails')}
                        </a>
                        <button
                          type="button"
                          onClick={() => openContactModal(discussLabel, 'tour_card', { tour: tour.tourKey })}
                          className="rounded-[40px] border border-text-main bg-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90"
                        >
                          {discussLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </EqualHeightTourCard>
              )
            })}
          </EqualHeightTourCardGrid>
        </section>

        <section id="directions" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-6 text-center">{t('switzerlandPage.directionsHeading')}</h2>
          <p className="mx-auto mb-10 max-w-[820px] text-center text-sm leading-7 text-text-light">
            {t('switzerlandPage.directionsIntro')}
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {directionCards.map((item) => (
              <PromoImageCard
                key={item.cardKey}
                href={item.href}
                image={item.image}
                title={item.title}
                alt={item.alt}
                onBeforeNavigate={
                  item.href ? () => setBreadcrumbParent(BREADCRUMB_PARENT.switzerland) : undefined
                }
              />
            ))}
          </div>
        </section>

        <section
          id="booking-steps"
          className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5"
          aria-labelledby="switzerland-booking-heading"
        >
          <h2 id="switzerland-booking-heading" className="section-title mb-8 text-center md:mb-10">
            {t('switzerlandPage.bookingHeading')}
          </h2>
          <div className="px-2 py-2 sm:px-4 md:px-6">
            <ol className="m-0 grid list-none items-stretch gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {bookingSteps.map((step, index) => (
                <li key={`ch-step-${index}`} className="flex h-full min-w-0 flex-col items-center text-center">
                  <div className="mb-4 grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full border border-[#e1dad4] bg-bg-base text-text-main">
                    <span
                      className="block font-serif text-[30px] leading-none"
                      style={{ fontVariantNumeric: 'lining-nums tabular-nums' }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex w-full flex-1 flex-col rounded-2xl border border-border-soft bg-bg-card p-4 shadow-[0_8px_22px_rgba(0,0,0,0.04)] sm:p-5 md:min-h-[160px]">
                    <h3 className="mb-2 font-serif text-[22px] leading-[1.15] text-text-main break-words">
                      {step.title}
                    </h3>
                    {step.text ? (
                      <p className="font-serif text-[15px] leading-[1.35] text-text-light break-words">{step.text}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="reviews" className="mx-auto mt-20 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('switzerlandPage.reviewsHeading')}</h2>
          <EqualHeightReviewCards
            items={reviewCards}
            expandedKey={expandedReviewKey}
            onToggle={setExpandedReviewKey}
            readMoreLabel={t('switzerlandPage.reviewsReadMore')}
            collapseLabel={t('switzerlandPage.reviewsCollapse')}
            showQuoteMark
            renderAvatar={(item) => <ReviewAvatar src={item.image} />}
          />
        </section>

        <FaqSection
          heading={t('switzerlandPage.faqHeading')}
          items={faqItems}
          className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5"
        />

        <section id="final-cta" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="p-0 sm:p-2 md:p-4">
            <h2 className="section-title !mb-4 text-center text-[clamp(28px,4vw,38px)]">
              {t('switzerlandPage.finalCta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-[760px] text-center text-sm leading-7 text-text-light">
              {t('switzerlandPage.finalCta.description')}
            </p>
            <form
              id="cta-form"
              key={i18n.language}
              onSubmit={handleFinalCtaSubmit}
              className="mx-auto flex w-full max-w-[760px] flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                required
                value={finalFormData.name}
                onChange={handleFinalNameChange}
                placeholder={t('switzerlandPage.finalCta.namePlaceholder')}
                className="w-full rounded-[14px] border border-border-soft bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-[#9c9c9c] focus:border-text-main"
              />
              <input
                type="tel"
                name="phone"
                required
                value={finalFormData.phone}
                onChange={handleFinalPhoneChange}
                onBlur={handleFinalPhoneBlur}
                placeholder={t('switzerlandPage.finalCta.phonePlaceholder')}
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
                placeholder={t('switzerlandPage.finalCta.emailPlaceholder')}
                className={`w-full rounded-[14px] border bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-[#9c9c9c] ${
                  emailTouched && emailError ? 'border-red-400 focus:border-red-400' : 'border-border-soft focus:border-text-main'
                }`}
              />
              {emailTouched && emailError ? <p className="mt-1 text-xs text-red-400">{emailError}</p> : null}
              <button
                type="submit"
                disabled={isFinalSubmitting}
                className="main-btn w-full rounded-[50px] border border-text-main bg-text-main px-6 py-4 text-[13px] uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontWeight: '500' }}
              >
                {isFinalSubmitting ? t('switzerlandPage.finalCta.submitting') : t('switzerlandPage.finalCta.submit')}
              </button>
              <p className="text-center text-xs leading-6 text-[#8a8a8a]">
                {t('switzerlandPage.finalCta.privacyPrefix')}{' '}
                <a href="#" className="underline-offset-4 hover:underline">
                  {t('switzerlandPage.finalCta.privacyLink')}
                </a>
              </p>
            </form>
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

export default SwitzerlandPage
