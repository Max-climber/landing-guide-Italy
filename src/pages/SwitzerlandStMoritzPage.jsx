import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Navigation from '../components/Navigation'
import FaqSection from '../components/FaqSection'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbTrail from '../components/blog/BreadcrumbTrail'
import { EqualHeightTourCard, EqualHeightTourCardGrid } from '../components/EqualHeightTourCardGrid'
import PictureImg from '../components/PictureImg'
import EqualHeightReviewCards from '../components/EqualHeightReviewCards'
import { mountJsonLd, mountJsonLdScript, upsertMeta } from './seo/pageMeta'
import { buildFaqPageJsonLd } from './seo/faqSchema'
import { buildOrganizationSchema } from './seo/organizationSchema'
import { ITALY_DETAIL_ROUTE } from '../data/italyStandaloneTourConfigs'
import { validatePhone, validateEmail, formatPhone } from '../utils/leadFormValidation'
import { BREADCRUMB_PARENT, getBreadcrumbParent, setBreadcrumbParent } from '../utils/breadcrumbContext'
import {
  trackCtaClick,
  trackFormSubmit,
  trackFormSuccess,
} from '../utils/analytics'

const CANONICAL = 'https://vacanzabianca.ru/switzerland/st-moritz/'
const HERO_IMAGE = '/images/switzerland-page/directions/st-moritz.webp'
const HOME_ABSOLUTE = 'https://vacanzabianca.ru/'
const SWITZERLAND_PATH = '/switzerland/'
const SWITZERLAND_ABSOLUTE = 'https://vacanzabianca.ru/switzerland/'
const PEAKS_PATH = ITALY_DETAIL_ROUTE.peaksDolomites
const ALPS_SKI_PATH = '/alps/gornolyzhnye-tury/'
const GUIDE_PHOTO = '/images/about/dmitry-guide-face.webp'
const ITALY_TOURS_BASE = '/images/Italy-page/tours'

/** Компактные иконки (не полноразмерные фото path-/ski-tours-*). */
const WHY_ICON_SRCS = [
  `/images/infographics/${encodeURIComponent('resort-pistes.webp')}`,
  `/images/infographics/${encodeURIComponent('premium-comfort.webp')}`,
  `/images/infographics/${encodeURIComponent('авторские маршруты.webp')}`,
  `/images/infographics/${encodeURIComponent('experience.webp')}`,
  `/images/infographics/${encodeURIComponent('individual.webp')}`,
]

const FORMAT_IMAGES = [
  '/images/about/family-skiing.webp',
  '/images/about/apres-ski.webp',
  `${ITALY_TOURS_BASE}/tours-Dolomity1.0.webp`,
  '/images/resorts/sankt-moritz/3.webp',
]

const ATMOSPHERE_ITEMS = [
  {
    src: '/images/resorts/sankt-moritz/2.webp',
    altKey: 'atmosphere.alt1',
    captionKey: 'atmosphere.caption1',
  },
  {
    src: '/images/resorts/sankt-moritz/3.webp',
    altKey: 'atmosphere.alt2',
    captionKey: 'atmosphere.caption2',
  },
  {
    src: '/images/resorts/sankt-moritz/4.webp',
    altKey: 'atmosphere.alt3',
    captionKey: 'atmosphere.caption3',
  },
  {
    src: '/images/resorts/sankt-moritz/Заставка.webp',
    altKey: 'atmosphere.alt4',
    captionKey: 'atmosphere.caption4',
  },
  {
    src: HERO_IMAGE,
    altKey: 'atmosphere.alt5',
    captionKey: 'atmosphere.caption5',
  },
  {
    src: '/images/about/family-skiing.webp',
    altKey: 'atmosphere.alt6',
    captionKey: 'atmosphere.caption6',
  },
  {
    src: '/images/about/apres-ski.webp',
    altKey: 'atmosphere.alt7',
    captionKey: 'atmosphere.caption7',
  },
  {
    src: `${ITALY_TOURS_BASE}/tours-Alps.webp`,
    altKey: 'atmosphere.alt8',
    captionKey: 'atmosphere.caption8',
  },
]

const REVIEW_ANASTASIA_IMG = `/images/reviews/${encodeURIComponent('Анастасия и Михаил.webp')}`
const REVIEW_DMITRY_IMG = '/images/reviews/dmitry.webp'
const REVIEW_AVATAR_FALLBACK = '/images/icons/favicon.png'

const REVIEW_DEFS = [
  { key: 'trentino', image: '/images/reviews/trentino-guest.webp' },
  { key: 'anastasiaMikhail', image: REVIEW_ANASTASIA_IMG },
  { key: 'nadezhda', image: '/images/reviews/Nadezhda.webp' },
  { key: 'dmitry', image: REVIEW_DMITRY_IMG },
]

const REVIEW_FULL_THRESHOLD = 120
const REVIEW_PREVIEW_MAX = 78

const tourCtaClass =
  'inline-flex min-h-[44px] items-center justify-center rounded-[40px] border border-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white'
const tourPrimaryCtaClass =
  'inline-flex min-h-[44px] items-center justify-center rounded-[40px] border border-text-main bg-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90'

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

function ReviewAvatar({ src }) {
  return (
    <img
      src={src}
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
  )
}

function TourMeta({ tour, t }) {
  return (
    <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border-soft py-4">
      <dt className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('stMoritzPage.labelGuests')}</dt>
      <dt className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('stMoritzPage.labelDuration')}</dt>
      <dd className="m-0 text-sm font-medium text-text-main">{tour.people}</dd>
      <dd className="m-0 text-sm font-medium text-text-main">{tour.duration}</dd>
      <dt className="col-span-2 mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('stMoritzPage.labelPrice')}</dt>
      <dd
        className="col-span-2 m-0 font-serif text-[clamp(18px,2.2vw,26px)] leading-tight text-text-main"
        style={{ fontWeight: 400 }}
      >
        {tour.price}
      </dd>
    </dl>
  )
}

const SwitzerlandStMoritzPage = () => {
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
  const [parentHub, setParentHub] = useState(BREADCRUMB_PARENT.switzerland)

  useEffect(() => {
    setParentHub(getBreadcrumbParent(BREADCRUMB_PARENT.switzerland))
  }, [])

  const whyCards = useMemo(() => t('stMoritzPage.whyCards', { returnObjects: true }) || [], [t])
  const formatCards = useMemo(() => t('stMoritzPage.formatCards', { returnObjects: true }) || [], [t])
  const bookingSteps = useMemo(() => t('stMoritzPage.bookingSteps', { returnObjects: true }) || [], [t])
  const faqItems = useMemo(() => t('stMoritzPage.faq', { returnObjects: true }) || [], [t])

  const skiAlpsTour = useMemo(() => {
    const tr = t('stMoritzPage.tours.skiAlps', { returnObjects: true }) || {}
    return {
      ...tr,
      image: `${ITALY_TOURS_BASE}/tours-Alps.webp`,
      detailsHref: ALPS_SKI_PATH,
    }
  }, [t])

  const peaksTour = useMemo(() => {
    const tr = t('stMoritzPage.tours.peaksDolomites', { returnObjects: true }) || {}
    return {
      ...tr,
      image: `${ITALY_TOURS_BASE}/tours-Dolomity1.0.webp`,
      detailsHref: PEAKS_PATH,
    }
  }, [t])

  const individualTour = useMemo(
    () => t('stMoritzPage.tours.individual', { returnObjects: true }) || {},
    [t],
  )

  const reviewCards = useMemo(
    () =>
      REVIEW_DEFS.map(({ key, image }) => {
        const tr = t(`stMoritzPage.reviews.${key}`, { returnObjects: true }) || {}
        const full = String(tr.quote || '')
        const { preview, needsExpand } = truncateReviewPreview(full)
        return { key, title: tr.title, full, preview, needsExpand, image }
      }),
    [t],
  )

  const isFromAlps = parentHub === BREADCRUMB_PARENT.alps
  const parentLabel = isFromAlps
    ? t('stMoritzPage.breadcrumbAlps')
    : t('stMoritzPage.breadcrumbSwitzerland')
  const parentHref = isFromAlps ? ALPS_SKI_PATH : SWITZERLAND_PATH
  const parentSchemaName = isFromAlps
    ? t('stMoritzPage.schemaAlps')
    : t('stMoritzPage.schemaSwitzerland')
  const parentSchemaUrl = isFromAlps
    ? 'https://vacanzabianca.ru/alps/gornolyzhnye-tury/'
    : SWITZERLAND_ABSOLUTE

  const breadcrumbItems = useMemo(
    () => [
      { label: t('stMoritzPage.breadcrumbHome'), href: '/' },
      { label: parentLabel, href: parentHref },
      { label: t('stMoritzPage.breadcrumbCurrent') },
    ],
    [parentHref, parentLabel, t],
  )

  const schemaData = useMemo(
    () => [
      buildOrganizationSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('stMoritzPage.schemaHome'), item: HOME_ABSOLUTE },
          {
            '@type': 'ListItem',
            position: 2,
            name: parentSchemaName,
            item: parentSchemaUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: t('stMoritzPage.schemaCurrent'),
            item: CANONICAL,
          },
        ],
      },
    ],
    [parentSchemaName, parentSchemaUrl, t],
  )

  const faqSchema = useMemo(() => buildFaqPageJsonLd(faqItems), [faqItems])

  useEffect(() => {
    upsertMeta({
      title: t('stMoritzPage.metaTitle'),
      description: t('stMoritzPage.metaDescription'),
      canonical: CANONICAL,
      ogImage: `https://vacanzabianca.ru${HERO_IMAGE}`,
      robots: 'index, follow',
    })
    const unmountBase = mountJsonLd('st-moritz-jsonld', schemaData)
    const unmountFaq = mountJsonLdScript('st-moritz-jsonld-faq', faqSchema)
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

  const openContactModal = (ctaText, ctaPosition, extra = {}) => {
    trackCtaClick({ ctaText, ctaPosition, ...extra })
    setIsModalOpen(true)
  }

  const handleFinalNameChange = (event) => {
    setFinalFormData((prev) => ({ ...prev, name: event.target.value }))
  }

  const handleFinalPhoneChange = (event) => {
    setFinalFormData((prev) => ({ ...prev, phone: formatPhone(event.target.value) }))
    if (phoneTouched) setPhoneError(validatePhone(event.target.value) || '')
  }

  const handleFinalPhoneBlur = () => {
    setPhoneTouched(true)
    setPhoneError(validatePhone(finalFormData.phone) || '')
  }

  const handleFinalEmailChange = (event) => {
    setFinalFormData((prev) => ({ ...prev, email: event.target.value }))
    if (emailTouched) setEmailError(validateEmail(event.target.value) || '')
  }

  const handleFinalEmailBlur = () => {
    setEmailTouched(true)
    setEmailError(validateEmail(finalFormData.email) || '')
  }

  const handleFinalCtaSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const phoneErr = validatePhone(finalFormData.phone)
    const emailErr = validateEmail(finalFormData.email)
    setPhoneTouched(true)
    setEmailTouched(true)
    setPhoneError(phoneErr || '')
    setEmailError(emailErr || '')
    if (phoneErr || emailErr) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      setFinalStatus('error')
      setTimeout(() => setFinalStatus(null), 7000)
      return
    }

    trackFormSubmit({ formName: 'st_moritz_final_cta' })
    setIsFinalSubmitting(true)
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: finalFormData.name,
          phone: finalFormData.phone,
          email: finalFormData.email,
          message: t('stMoritzPage.finalCta.autoMessage'),
          subject: t('stMoritzPage.finalCta.emailSubject'),
        },
        publicKey,
      )
      trackFormSuccess({ formName: 'st_moritz_final_cta' })
      form.reset()
      setFinalFormData({ name: '', phone: '', email: '' })
      setPhoneTouched(false)
      setEmailTouched(false)
      setPhoneError('')
      setEmailError('')
      setFinalStatus('success')
      setTimeout(() => setFinalStatus(null), 7000)
    } catch (error) {
      console.error('St Moritz CTA form error:', error)
      setFinalStatus('error')
      setTimeout(() => setFinalStatus(null), 7000)
    } finally {
      setIsFinalSubmitting(false)
    }
  }

  const finalToast =
    finalStatus === 'success' ? t('stMoritzPage.finalCta.success') : t('stMoritzPage.finalCta.error')

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <div className="relative">
        <Hero
          title={t('stMoritzPage.heroTitle')}
          subtitle=""
          description={t('stMoritzPage.heroDescription')}
          ctaLabel={t('stMoritzPage.ctaOffer')}
          onCtaClick={() => openContactModal(t('stMoritzPage.ctaOffer'), 'hero')}
          secondaryCtaLabel={t('stMoritzPage.ctaTours')}
          secondaryCtaHref="#tours"
          onSecondaryCtaClick={() =>
            trackCtaClick({ ctaText: t('stMoritzPage.ctaTours'), ctaPosition: 'hero' })
          }
          showStructureLink={false}
          backgroundImage={HERO_IMAGE}
          imageOverlayClassName="bg-black/45"
          tone="onDark"
        />
        <BreadcrumbTrail
          variant="overlay"
          tone="onDark"
          ariaLabel={t('stMoritzPage.breadcrumbAria')}
          items={breadcrumbItems}
          mobileBackLink={{
            label: parentLabel,
            href: parentHref,
          }}
        />
      </div>

      <main className="pb-12">
        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-6 text-center">{t('stMoritzPage.whyHeading')}</h2>
          <p className="mx-auto mb-12 max-w-[820px] text-center text-sm leading-7 text-text-light">
            {t('stMoritzPage.whyIntro')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
            {whyCards.map((card, idx) => (
              <article
                key={`why-${idx}`}
                className="flex w-full flex-col items-center px-2 text-center sm:w-[calc(50%-1rem)] sm:px-3 lg:w-[calc(33.333%-1.375rem)]"
              >
                <div className="mb-5 flex h-12 w-full items-center justify-center">
                  <img
                    src={WHY_ICON_SRCS[idx] || WHY_ICON_SRCS[0]}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                    style={{ filter: 'grayscale(1)', opacity: 0.72 }}
                    loading="lazy"
                    decoding="async"
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

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('stMoritzPage.formatsHeading')}</h2>
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {formatCards.map((card, idx) => (
              <article
                key={`format-${idx}`}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <PictureImg
                    src={FORMAT_IMAGES[idx] || FORMAT_IMAGES[0]}
                    alt={card.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3
                    className="mb-3 font-serif text-[clamp(22px,2.4vw,28px)] leading-[1.15] text-text-main"
                    style={{ fontWeight: 400 }}
                  >
                    {card.title}
                  </h3>
                  <p className="flex-1 text-sm leading-7 text-text-light">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="tours" className="mx-auto mt-20 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('stMoritzPage.toursHeading')}</h2>
          <EqualHeightTourCardGrid measureKey="st-moritz-tours" className="mx-auto md:grid-cols-2 lg:grid-cols-3">
            <EqualHeightTourCard
              cardKey="skiAlps"
              className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={skiAlpsTour.image}
                  alt={skiAlpsTour.imageAlt || skiAlpsTour.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="mb-3 whitespace-pre-line font-serif text-[28px] leading-[1.1] text-text-main"
                  style={{ fontWeight: 300 }}
                >
                  {skiAlpsTour.title}
                </h3>
                <p className="mb-5 flex-1 whitespace-pre-line text-sm leading-6 text-text-light">{skiAlpsTour.route}</p>
                <TourMeta tour={skiAlpsTour} t={t} />
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={skiAlpsTour.detailsHref}
                    onClick={() => setBreadcrumbParent(BREADCRUMB_PARENT.switzerland)}
                    className={tourCtaClass}
                  >
                    {t('stMoritzPage.moreDetails')}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      openContactModal(t('stMoritzPage.discussTour'), 'tour_card', { tour: 'skiAlps' })
                    }
                    className={tourPrimaryCtaClass}
                  >
                    {t('stMoritzPage.discussTour')}
                  </button>
                </div>
              </div>
            </EqualHeightTourCard>

            <EqualHeightTourCard
              cardKey="peaksDolomites"
              className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={peaksTour.image}
                  alt={peaksTour.imageAlt || peaksTour.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="mb-3 whitespace-pre-line font-serif text-[28px] leading-[1.1] text-text-main"
                  style={{ fontWeight: 300 }}
                >
                  {peaksTour.title}
                </h3>
                <p className="mb-5 flex-1 whitespace-pre-line text-sm leading-6 text-text-light">{peaksTour.route}</p>
                <TourMeta tour={peaksTour} t={t} />
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={peaksTour.detailsHref}
                    onClick={() => setBreadcrumbParent(BREADCRUMB_PARENT.switzerland)}
                    className={tourCtaClass}
                  >
                    {t('stMoritzPage.moreDetails')}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      openContactModal(t('stMoritzPage.discussTour'), 'tour_card', {
                        tour: 'peaksDolomites',
                      })
                    }
                    className={tourPrimaryCtaClass}
                  >
                    {t('stMoritzPage.discussTour')}
                  </button>
                </div>
              </div>
            </EqualHeightTourCard>

            <EqualHeightTourCard
              cardKey="individual"
              className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt={individualTour.imageAlt || individualTour.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="mb-3 whitespace-pre-line font-serif text-[28px] leading-[1.1] text-text-main"
                  style={{ fontWeight: 300 }}
                >
                  {individualTour.title}
                </h3>
                <p className="mb-5 flex-1 whitespace-pre-line text-sm leading-6 text-text-light">
                  {individualTour.route}
                </p>
                <TourMeta tour={individualTour} t={t} />
                <button
                  type="button"
                  onClick={() =>
                    openContactModal(t('stMoritzPage.ctaOffer'), 'tour_card', { tour: 'individual' })
                  }
                  className={`${tourPrimaryCtaClass} w-full`}
                >
                  {t('stMoritzPage.ctaOffer')}
                </button>
              </div>
            </EqualHeightTourCard>
          </EqualHeightTourCardGrid>
        </section>

        <section id="guide" className="mx-auto mt-20 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('stMoritzPage.guide.heading')}</h2>
          <div className="mx-auto grid max-w-[980px] items-start gap-10 md:grid-cols-[200px_1fr]">
            <figure className="mx-auto flex w-full max-w-[200px] flex-col items-center md:mx-0 md:sticky md:top-28">
              {/* Asset already circular + alpha — object-contain, no object-cover crop */}
              <PictureImg
                src={GUIDE_PHOTO}
                alt={t('stMoritzPage.guide.photoAlt')}
                width={200}
                height={200}
                className="aspect-square w-full object-contain"
                loading="lazy"
              />
              <figcaption className="mt-4 text-center font-serif text-base text-text-main" style={{ fontWeight: 400 }}>
                {t('stMoritzPage.guide.photoAlt')}
              </figcaption>
            </figure>
            <p className="whitespace-pre-line text-sm leading-7 text-text-light sm:text-base">
              {t('stMoritzPage.guide.text')}
            </p>
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-8 text-center">{t('stMoritzPage.atmosphere.heading')}</h2>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] snap-x snap-mandatory sm:gap-4">
            {ATMOSPHERE_ITEMS.map((item, idx) => (
              <figure
                key={`atm-${idx}`}
                className="w-[min(70vw,240px)] shrink-0 snap-start overflow-hidden rounded-xl border border-border-soft bg-bg-card sm:w-[220px]"
              >
                <PictureImg
                  src={item.src}
                  alt={t(`stMoritzPage.${item.altKey}`)}
                  className="aspect-[4/3] max-h-[160px] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-2.5 py-2 text-center font-sans text-[12px] leading-4 text-text-light">
                  {t(`stMoritzPage.${item.captionKey}`)}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          id="booking-steps"
          className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5"
          aria-labelledby="st-moritz-booking-heading"
        >
          <h2 id="st-moritz-booking-heading" className="section-title mb-8 text-center md:mb-8">
            {t('stMoritzPage.bookingHeading')}
          </h2>
          <div className="px-2 py-2 sm:px-4 md:px-6 lg:px-8">
            <div className="relative mx-auto max-w-[1080px]">
              <div
                className="pointer-events-none absolute left-0 right-0 top-8 z-[1] hidden h-[2px] bg-[#d3ccc6] md:block"
                aria-hidden
              />
              <ol className="relative z-[2] m-0 grid list-none gap-10 p-0 md:grid-cols-5 md:items-stretch md:gap-4">
                {bookingSteps.map((step, index) => (
                  <li key={`booking-step-${index}`} className="flex min-w-0 flex-col items-center text-center md:h-full">
                    <div className="order-1 mb-4 grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full border border-[#e1dad4] bg-bg-base text-text-main">
                      <span
                        className="block font-serif text-[30px] leading-none"
                        style={{ fontVariantNumeric: 'lining-nums tabular-nums' }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="order-2 flex w-full flex-col rounded-2xl border border-border-soft bg-bg-card p-4 shadow-[0_8px_22px_rgba(0,0,0,0.04)] sm:p-5 md:h-full md:min-h-[190px]">
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

        <section id="reviews" className="mx-auto mt-20 w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('stMoritzPage.reviewsHeading')}</h2>
          <EqualHeightReviewCards
            items={reviewCards}
            expandedKey={expandedReviewKey}
            onToggle={setExpandedReviewKey}
            readMoreLabel={t('stMoritzPage.reviewsReadMore')}
            collapseLabel={t('stMoritzPage.reviewsCollapse')}
            renderAvatar={(item) => <ReviewAvatar src={item.image} />}
          />
        </section>

        <FaqSection
          heading={t('stMoritzPage.faqHeading')}
          items={faqItems}
          className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5"
        />

        <section id="final-cta" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-4 text-center text-[clamp(28px,4vw,38px)]">
            {t('stMoritzPage.finalCta.title')}
          </h2>
          <p className="mx-auto mb-8 max-w-[760px] text-center text-sm leading-7 text-text-light">
            {t('stMoritzPage.finalCta.description')}
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
              placeholder={t('stMoritzPage.finalCta.namePlaceholder')}
              className="min-h-[44px] w-full rounded-[14px] border border-border-soft bg-white px-4 py-3 text-sm text-text-main outline-none focus:border-text-main"
            />
            <input
              type="tel"
              name="phone"
              required
              value={finalFormData.phone}
              onChange={handleFinalPhoneChange}
              onBlur={handleFinalPhoneBlur}
              placeholder={t('stMoritzPage.finalCta.phonePlaceholder')}
              className={`min-h-[44px] w-full rounded-[14px] border bg-white px-4 py-3 text-sm outline-none ${
                phoneTouched && phoneError ? 'border-red-400' : 'border-border-soft focus:border-text-main'
              }`}
            />
            {phoneTouched && phoneError ? <p className="text-xs text-red-400">{phoneError}</p> : null}
            <input
              type="email"
              name="email"
              required
              value={finalFormData.email}
              onChange={handleFinalEmailChange}
              onBlur={handleFinalEmailBlur}
              placeholder={t('stMoritzPage.finalCta.emailPlaceholder')}
              className={`min-h-[44px] w-full rounded-[14px] border bg-white px-4 py-3 text-sm outline-none ${
                emailTouched && emailError ? 'border-red-400' : 'border-border-soft focus:border-text-main'
              }`}
            />
            {emailTouched && emailError ? <p className="text-xs text-red-400">{emailError}</p> : null}
            <button
              type="submit"
              disabled={isFinalSubmitting}
              className="min-h-[48px] w-full rounded-[50px] border border-text-main bg-text-main px-6 py-4 text-[13px] uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-text-main/90 disabled:opacity-50"
            >
              {isFinalSubmitting ? t('stMoritzPage.finalCta.submitting') : t('stMoritzPage.finalCta.submit')}
            </button>
          </form>
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

export default SwitzerlandStMoritzPage
