import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import WhyUsSection from '../components/WhyUsSection'
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

const HERO_IMAGE = '/images/main-photo.png'

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
      <WhyUsSection />
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
