import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbOverlay from '../components/BreadcrumbOverlay'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'

const ITALY_CANONICAL = 'https://vacanzabianca.ru/italy/'
const ITALY_HERO_IMAGE =
  'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=2200&q=80'
const HOME_ABSOLUTE = 'https://vacanzabianca.ru/'
const HOME_PATH = '/'

const TOUR_BUILDERS = [
  { key: 'lakeComoGarda', image: '/images/infographics/main-carusel-1.1.png' },
  { key: 'comoVenice', image: 'https://images.unsplash.com/photo-1540979388789-67225c354146?q=80&w=1200' },
  { key: 'peaksDolomites', image: 'https://images.unsplash.com/photo-1617822129592-b3a165a2d711?q=80&w=1200' },
  { key: 'northArchitecture', image: 'https://images.unsplash.com/photo-1599389713679-370e081827b5?q=80&w=1200' },
  { key: 'riviera', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200' },
  { key: 'skiAlps', image: 'https://images.unsplash.com/photo-1549640376-3ad70f27489b?q=80&w=1200' },
]

const DIRECTION_DEFS = [
  { key: 'como', image: 'https://images.unsplash.com/photo-1588623744358-04def0a7f1df?q=80&w=1200' },
  { key: 'garda', image: 'https://images.unsplash.com/photo-1568282361099-27027d1a2f69?q=80&w=1200' },
  { key: 'dolomites', image: 'https://images.unsplash.com/photo-1590244793822-261162434685?q=80&w=1200' },
  { key: 'north', image: 'https://images.unsplash.com/photo-1518844390315-99c51c88824f?q=80&w=1200' },
]

const FORMAT_DEFS = [
  { key: 'summer', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80' },
  { key: 'ski', href: '/alps/gornolyzhnye-tury', image: 'https://images.unsplash.com/photo-1549640376-3ad70f27489b?auto=format&fit=crop&w=1200&q=80' },
  { key: 'excursions', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80' },
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

const validCountryCodes = [
  '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
  '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86', '90', '91', '92', '93', '94', '95', '98', '212', '213', '216', '218',
  '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239',
  '240', '241', '242', '243', '244', '245', '246', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '260', '261',
  '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', '299', '350', '351', '352', '353', '354', '355', '356',
  '357', '358', '359', '370', '371', '372', '373', '374', '375', '376', '377', '378', '380', '381', '382', '383', '385', '386', '387', '389',
  '420', '421', '423', '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', '596',
  '597', '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '685', '686', '687', '688',
  '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961', '962', '963', '964', '965', '966', '967', '968',
  '970', '971', '972', '973', '974', '975', '976', '977', '992', '993', '994', '995', '996', '998',
]

const PromoImageCard = ({ href, image, title, moreLabel, aspectClassName = 'aspect-[3/4]' }) => {
  const baseClassName = `group relative block w-full overflow-hidden rounded-xl border border-border-soft shadow-[0_10px_28px_rgba(0,0,0,0.06)] ${aspectClassName}`
  const interactiveClassName = 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]'

  const content = (
    <>
      <img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${href ? 'group-hover:scale-105' : ''}`}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.src = '/images/main-photo.jpg'
        }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition-opacity duration-300 ${
          href ? 'group-hover:from-black/85 group-hover:via-black/45' : ''
        }`}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        <h3
          className="font-serif text-[clamp(18px,2.2vw,24px)] leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          style={{ fontWeight: 300 }}
        >
          {title}
        </h3>
        {href ? (
          <span className="mt-2 inline-flex translate-y-2 font-sans text-[11px] uppercase tracking-[0.12em] text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {moreLabel} →
          </span>
        ) : null}
      </div>
    </>
  )

  if (!href) {
    return <article className={baseClassName}>{content}</article>
  }

  return (
    <a href={href} className={`${baseClassName} ${interactiveClassName}`}>
      {content}
    </a>
  )
}

const ItalyPage = () => {
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

  const italyTours = useMemo(
    () =>
      TOUR_BUILDERS.map(({ key, image }) => ({
        ...(t(`italyPage.tours.${key}`, { returnObjects: true }) || {}),
        tourKey: key,
        image,
        showDetails: key === 'skiAlps' || key === 'lakeComoGarda',
        detailsHref:
          key === 'skiAlps'
            ? '/alps/gornolyzhnye-tury'
            : key === 'lakeComoGarda'
              ? '/italy/tury-ozero-como/'
              : undefined,
      })),
    [t],
  )

  const directionCards = useMemo(
    () =>
      DIRECTION_DEFS.map(({ key, href, image }) => {
        const tr = t(`italyPage.directions.${key}`, { returnObjects: true }) || {}
        return { cardKey: key, title: tr.title, href, image }
      }),
    [t],
  )

  const formatCards = useMemo(
    () =>
      FORMAT_DEFS.map(({ key, href, image }) => {
        const tr = t(`italyPage.formats.${key}`, { returnObjects: true }) || {}
        return { cardKey: key, title: tr.title, href, image }
      }),
    [t],
  )

  const whyIconSrcs = useMemo(
    () => WHY_INFOGRAPHIC_FILES.map((file) => `/images/infographics/${encodeURIComponent(file)}`),
    [],
  )

  const reviewCards = useMemo(
    () =>
      REVIEW_DEFS.map(({ key, image }) => {
        const tr = t(`italyPage.reviews.${key}`, { returnObjects: true }) || {}
        return { title: tr.title, description: tr.quote, image }
      }),
    [t],
  )

  const whyCards = useMemo(() => t('italyPage.whyCards', { returnObjects: true }) || [], [t])

  const faqItems = useMemo(() => t('italyPage.faq', { returnObjects: true }) || [], [t])

  const schemaData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vacanza Bianca',
        url: 'https://vacanzabianca.ru/',
        logo: 'https://vacanzabianca.ru/images/icons/favicon.png',
        sameAs: [
          'https://www.instagram.com/it.tours.mountains.transfer?igsh=MWF6bHR1M3k4YzJpag==',
          'https://t.me/la_vacanza_bianca',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('italyPage.breadcrumbHome'),
            item: HOME_ABSOLUTE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('italyPage.breadcrumbCurrent'),
            item: ITALY_CANONICAL,
          },
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
    [t, faqItems],
  )

  useEffect(() => {
    upsertMeta({
      title: t('italyPage.metaTitle'),
      description: t('italyPage.metaDescription'),
      canonical: ITALY_CANONICAL,
      ogImage: ITALY_HERO_IMAGE,
    })

    const unmount = mountJsonLd('italy-jsonld', schemaData)
    return () => unmount()
  }, [schemaData, t])

  useEffect(() => {
    const onOpen = () => setIsModalOpen(true)
    window.addEventListener('openContactModal', onOpen)
    return () => window.removeEventListener('openContactModal', onOpen)
  }, [])

  const moreLabel = t('italyPage.moreDetails')
  const finalToast = finalStatus === 'success' ? t('italyPage.finalCta.success') : t('italyPage.finalCta.error')

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) {
      return 'Телефон обязателен для заполнения'
    }

    let cleanPhone = phone.trim().replace(/[\s-()]/g, '')

    if (!cleanPhone.startsWith('+')) {
      if (cleanPhone.startsWith('8')) {
        cleanPhone = '+7' + cleanPhone.slice(1)
      } else if (/^\d/.test(cleanPhone)) {
        cleanPhone = '+' + cleanPhone
      } else {
        return 'Телефон должен начинаться с + или цифры'
      }
    }

    const e164Regex = /^\+[1-9]\d{6,14}$/
    if (!e164Regex.test(cleanPhone)) {
      return 'Неверный формат телефона. Используйте формат: +7 (999) 123-45-67 или +39 123 456 7890'
    }

    const digitsOnly = cleanPhone.slice(1)
    let countryCode = ''

    for (let i = 1; i <= 3 && i <= digitsOnly.length; i++) {
      const code = digitsOnly.slice(0, i)
      if (validCountryCodes.includes(code)) {
        countryCode = code
        break
      }
    }

    if (!countryCode) {
      return 'Неверный код страны. Проверьте правильность ввода'
    }

    const numberPart = digitsOnly.slice(countryCode.length)
    if (numberPart.length < 6) {
      return 'Номер слишком короткий. Минимум 6 цифр после кода страны'
    }

    if (numberPart.length > 12) {
      return 'Номер слишком длинный. Максимум 12 цифр после кода страны'
    }

    if (countryCode === '7') {
      if (digitsOnly.length !== 11) {
        return 'Российский номер должен содержать 11 цифр: +7 (XXX) XXX-XX-XX'
      }
    } else if (countryCode === '1') {
      if (digitsOnly.length !== 11) {
        return 'Номер США/Канады должен содержать 11 цифр: +1 (XXX) XXX-XXXX'
      }
    } else if (countryCode === '39') {
      if (digitsOnly.length < 11 || digitsOnly.length > 12) {
        return 'Итальянский номер должен содержать 11-12 цифр после знака +: +39 XXX XXX XXXX'
      }
    }

    return ''
  }

  const formatPhone = (value) => {
    if (!value) return ''

    let clean = value.replace(/[^\d+]/g, '')

    if (!clean.startsWith('+')) {
      if (clean.startsWith('8')) {
        clean = '+7' + clean.slice(1)
      } else if (clean.length > 0) {
        clean = '+' + clean
      }
    }

    if (clean.startsWith('+8')) {
      clean = '+7' + clean.slice(2)
    }

    if (clean.startsWith('+7')) {
      const digits = clean.slice(2).replace(/\D/g, '')
      if (digits.length === 0) return '+7'
      if (digits.length <= 3) return `+7 (${digits}`
      if (digits.length <= 6) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3)}`
      if (digits.length <= 8) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
    }

    return clean
  }

  const validateEmail = (email) => {
    if (!email || !email.trim()) {
      return ''
    }

    const trimmedEmail = email.trim().toLowerCase()
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(trimmedEmail)) {
      return 'Введите корректный email адрес'
    }

    if (trimmedEmail.includes('..')) {
      return 'Email не может содержать двойные точки'
    }

    if (trimmedEmail.startsWith('.') || trimmedEmail.startsWith('@')) {
      return 'Email не может начинаться с точки или @'
    }

    const parts = trimmedEmail.split('@')
    if (parts.length !== 2) {
      return 'Email должен содержать один символ @'
    }

    const [localPart, domain] = parts

    if (localPart.length === 0 || localPart.length > 64) {
      return 'Локальная часть email слишком короткая или длинная'
    }

    if (localPart.endsWith('.') || localPart.startsWith('.')) {
      return 'Локальная часть не может начинаться или заканчиваться точкой'
    }

    if (domain.length === 0 || domain.length > 255) {
      return 'Домен слишком короткий или длинный'
    }

    if (!domain.includes('.')) {
      return 'Email должен содержать домен верхнего уровня (например, .com, .ru)'
    }

    return ''
  }

  const handleFinalNameChange = (event) => {
    setFinalFormData((prev) => ({ ...prev, name: event.target.value }))
  }

  const handleFinalPhoneChange = (event) => {
    const formatted = formatPhone(event.target.value)
    setFinalFormData((prev) => ({ ...prev, phone: formatted }))
    if (phoneTouched) {
      setPhoneError(validatePhone(formatted))
    }
  }

  const handleFinalPhoneBlur = () => {
    setPhoneTouched(true)
    setPhoneError(validatePhone(finalFormData.phone))
  }

  const handleFinalEmailChange = (event) => {
    const value = event.target.value
    setFinalFormData((prev) => ({ ...prev, email: value }))
    if (emailTouched) {
      setEmailError(validateEmail(value))
    }
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

    if (phoneValidationError || emailValidationError) {
      return
    }

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
          program: t('italyPage.breadcrumbCurrent'),
          message: t('italyPage.finalCta.autoMessage'),
          subject: t('italyPage.finalCta.emailSubject'),
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
    } catch (error) {
      console.error('Final CTA form error:', error)
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
          title={t('italyPage.heroTitle')}
          subtitle=""
          description={t('italyPage.heroDescription')}
          ctaLabel={t('italyPage.ctaPlanTour')}
          ctaHref="#tours"
          showStructureLink={false}
          backgroundImage={ITALY_HERO_IMAGE}
          imageOverlayClassName="bg-[rgba(255,255,255,0.42)]"
        />
        <BreadcrumbOverlay
          ariaLabel={t('italyPage.breadcrumbAria')}
          homeLabel={t('italyPage.breadcrumbHome')}
          homeHref={HOME_PATH}
          currentLabel={t('italyPage.breadcrumbCurrent')}
        />
      </div>

      <main className="pb-12">
        <section id="tours" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.toursHeading')}</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {italyTours.map((tour) => (
              <article
                key={tour.tourKey}
                className="flex flex-col overflow-hidden rounded-xl border border-border-soft bg-bg-card shadow-[0_8px_22px_rgba(0,0,0,0.03)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.src = '/images/main-photo.jpg'
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
                  <p className="mb-5 whitespace-pre-line text-sm leading-6 text-text-light">{tour.route}</p>
                  <div className="mt-auto">
                    <div className="mb-4 grid grid-cols-2 gap-4 border-y border-border-soft py-4">
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('italyPage.labelGuests')}</p>
                        <p className="text-sm font-medium text-text-main">{tour.people}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#888]">{t('italyPage.labelDuration')}</p>
                        <p className="text-sm font-medium text-text-main">{tour.duration}</p>
                      </div>
                    </div>
                    <p
                      className={`mb-5 font-serif leading-tight text-text-main ${
                        tour.tourKey === 'skiAlps'
                          ? 'text-[clamp(15px,1.9vw,20px)]'
                          : 'text-[clamp(22px,2.6vw,28px)]'
                      }`}
                      style={{ fontWeight: 400 }}
                    >
                      {tour.price}
                    </p>
                    {tour.showDetails ? (
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={tour.detailsHref}
                          className="rounded-[40px] border border-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
                        >
                          {t('italyPage.moreDetails')}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          className="rounded-[40px] border border-text-main bg-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90"
                        >
                          {t('italyPage.discussTour')}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full rounded-[40px] border border-text-main bg-text-main px-3 py-2.5 text-[11px] uppercase tracking-[0.11em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90"
                      >
                        {t('italyPage.discussTour')}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.whyHeading')}</h2>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {whyCards.map((card, idx) => (
              <article key={`${card.title}-${idx}`} className="flex flex-col items-center p-1 text-center sm:p-2">
                <div className="mb-4 flex w-full justify-center">
                  <img
                    src={whyIconSrcs[idx]}
                    alt=""
                    className="h-12 w-12 object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mb-3 font-serif text-[26px] leading-[1.15] text-text-main" style={{ fontWeight: '300' }}>
                  {card.title}
                </h3>
                <p className="max-w-md text-sm leading-6 text-text-light">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="directions" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.directionsHeading')}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {directionCards.map((item) => (
              <PromoImageCard key={item.cardKey} href={item.href} image={item.image} title={item.title} moreLabel={moreLabel} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.formatsHeading')}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {formatCards.map((item) => (
              <PromoImageCard
                key={item.cardKey}
                href={item.href}
                image={item.image}
                title={item.title}
                moreLabel={moreLabel}
                aspectClassName="aspect-[4/5] min-h-[240px]"
              />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.northHeading')}</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-5 font-sans text-lg font-medium text-text-main">{t('italyPage.northSubheading')}</h3>
              <p className="mb-4 text-sm leading-7 text-text-light">{t('italyPage.northP1')}</p>
              <p className="mb-4 text-sm leading-7 text-text-light">{t('italyPage.northP2')}</p>
              <p className="text-sm leading-7 text-text-light">{t('italyPage.northP3')}</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-border-soft bg-bg-card">
              <img
                src="https://images.unsplash.com/photo-1529911194206-4f3fdb4fef72?auto=format&fit=crop&w=1400&q=80"
                alt={t('italyPage.northImgAlt')}
                className="h-full min-h-[380px] w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = '/images/main-photo.jpg'
                }}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.reviewsHeading')}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {reviewCards.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border-soft bg-bg-card p-5 shadow-[0_8px_22px_rgba(0,0,0,0.03)] sm:p-6"
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
                    decoding="async"
                  />
                  <span className="font-serif text-base text-text-main" style={{ fontWeight: 400 }}>
                    {item.title}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center">{t('italyPage.faqHeading')}</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openedFaq === index
              return (
                <article key={`faq-${index}`} className="overflow-hidden rounded-xl border border-border-soft bg-bg-card">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenedFaq((prev) => (prev === index ? -1 : index))}
                  >
                    <h3 className="pr-4 font-sans text-base font-medium text-text-main">{item.question}</h3>
                    <span className="text-xl text-text-main">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen ? (
                    <div
                      className="border-t border-border-soft px-6 py-5 text-sm leading-7 text-text-light [&_p+p]:mt-3 [&_strong]:font-medium [&_strong]:text-text-main [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-text-light"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>

        <section id="final-cta" className="mx-auto mt-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="p-0 sm:p-2 md:p-4">
            <h2 className="section-title !mb-4 text-center text-[clamp(28px,4vw,38px)]">{t('italyPage.finalCta.title')}</h2>
            <p className="mx-auto mb-8 max-w-[760px] text-center text-sm leading-7 text-text-light">
              {t('italyPage.finalCta.description')}
            </p>
            <form id="cta-form" onSubmit={handleFinalCtaSubmit} className="mx-auto flex w-full max-w-[760px] flex-col gap-4">
              <input
                type="text"
                name="name"
                required
                value={finalFormData.name}
                onChange={handleFinalNameChange}
                placeholder="Ваше имя"
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
                style={{ fontWeight: '500' }}
              >
                {isFinalSubmitting ? t('italyPage.finalCta.submitting') : t('italyPage.finalCta.submit')}
              </button>
              <p className="text-center text-xs leading-6 text-[#8a8a8a]">
                {t('italyPage.finalCta.privacyPrefix')}{' '}
                <a href="#" className="underline-offset-4 hover:underline">
                  {t('italyPage.finalCta.privacyLink')}
                </a>
              </p>
            </form>
          </div>
        </section>

        {/* BLOG BLOCK TEMPORARILY HIDDEN
          <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10 text-center text-[clamp(28px,4vw,38px)]">{t('italyPage.blogHeading')}</h2>
          <ul className="mx-auto max-w-[640px] divide-y divide-border-soft rounded-xl border border-border-soft bg-bg-card/80 px-2 py-1 sm:px-3">
            {blogCards.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex gap-3 py-3.5 pl-2 pr-2 transition-colors hover:bg-bg-base/60 sm:gap-4 sm:py-4 sm:pl-3 sm:pr-3"
                >
                  <div className="relative h-14 w-[5.25rem] flex-shrink-0 overflow-hidden rounded-lg border border-border-soft sm:h-[4.5rem] sm:w-24">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="font-serif text-[17px] leading-snug text-text-main transition-colors group-hover:text-text-main sm:text-[18px]"
                      style={{ fontWeight: '400' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-text-light">{item.description}</p>
                  </div>
                  <span
                    className="hidden flex-shrink-0 self-center font-sans text-[11px] text-[#bbb] transition-colors group-hover:text-text-main sm:inline"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <a
              href="/blog"
              className="inline-flex rounded-[40px] border border-text-main px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
            >
              {t('italyPage.blogAllArticles')}
            </a>
          </div>
          </section>
        */}
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

export default ItalyPage
