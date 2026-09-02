import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Steps from '../components/Steps'
import Programs from '../components/Programs'
import Resorts from '../components/Resorts'
import Reviews from '../components/Reviews'
import Individual from '../components/Individual'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbOverlay from '../components/BreadcrumbOverlay'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'
import { BREADCRUMB_PARENT, setBreadcrumbParent } from '../utils/breadcrumbContext'

const HERO_IMAGE = '/images/main-photo.webp'
const ALPS_CANONICAL = 'https://vacanzabianca.ru/alps/gornolyzhnye-tury/'
const ALPS_META_TITLE_RU = 'Горнолыжные туры в Альпы 2026: авторские маршруты и цены — Vacanza Bianca'
const ALPS_META_DESCRIPTION_RU =
  'Авторские горнолыжные туры в Альпы: индивидуальные маршруты, курорты Италии и Швейцарии, трансферы, отели, сопровождение и помощь в организации отдыха.'

const AlpsSkiToursPage = () => {
  const { i18n } = useTranslation()
  const homeLabel = i18n.language === 'en' ? 'Home' : 'Главная'
  const currentLabel = i18n.language === 'en' ? 'Ski tours' : 'Горнолыжные туры'
  const heroTitle = i18n.language === 'en' ? 'Ski tours in the Alps' : 'Горнолыжные туры в Альпы'
  const heroDescription =
    i18n.language === 'en'
      ? 'Premium ski trips in Italy and Switzerland with private support.'
      : 'Премиальные горнолыжные туры в Италии и Швейцарии с индивидуальным сопровождением.'
  const heroCta = i18n.language === 'en' ? 'Get a personal offer' : 'Получить персональное предложение'

  const pageTitle =
    i18n.language === 'en'
      ? 'Ski tours in the Alps 2026: bespoke routes and prices — Vacanza Bianca'
      : ALPS_META_TITLE_RU
  const metaDescription =
    i18n.language === 'en'
      ? 'Premium ski tours to the Alps: Italy and Switzerland, private transfers and hotels. Request a tailored quote from Vacanza Bianca.'
      : ALPS_META_DESCRIPTION_RU

  const ogImage = 'https://vacanzabianca.ru/images/main-photo.webp'

  const schemaData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeLabel,
            item: 'https://vacanzabianca.ru/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: currentLabel,
            item: ALPS_CANONICAL,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': ALPS_CANONICAL,
        url: ALPS_CANONICAL,
        name: heroTitle,
        description: metaDescription,
      },
    ],
    [currentLabel, homeLabel, heroTitle, metaDescription],
  )

  useEffect(() => {
    setBreadcrumbParent(BREADCRUMB_PARENT.alps)
    upsertMeta({
      title: pageTitle,
      description: metaDescription,
      canonical: ALPS_CANONICAL,
      ogImage,
    })
    const unmount = mountJsonLd('alps-ski-jsonld', schemaData)
    return () => unmount()
  }, [metaDescription, ogImage, pageTitle, schemaData])

  return (
    <div className="alps-page-compact min-h-screen bg-bg-base">
      <Navigation />
      <div className="relative">
        <Hero
          title={heroTitle}
          subtitle=""
          description={heroDescription}
          ctaLabel={heroCta}
          backgroundImage={HERO_IMAGE}
          imageOverlayClassName="bg-[rgba(241,236,235,0.38)]"
          showStructureLink={false}
        />
        <BreadcrumbOverlay
          ariaLabel={i18n.language === 'en' ? 'Breadcrumb' : 'Хлебные крошки'}
          homeLabel={homeLabel}
          currentLabel={currentLabel}
        />
      </div>
      <About />
      <Steps />
      <Programs />
      <Resorts />
      <Reviews />
      <Individual />
      <Contact />
      <Footer />
      <TelegramFloatButton />
    </div>
  )
}

export default AlpsSkiToursPage
