import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import TelegramFloatButton from '../components/TelegramFloatButton'

const HomeHubPage = () => {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const title = isEn ? 'Choose destination section' : 'Выберите раздел сайта'
  const subtitle = isEn
    ? 'Main ski content is now moved to a dedicated landing page.'
    : 'Основной контент по горнолыжным турам перенесен на отдельную посадочную страницу.'

  const links = [
    { href: '/alps/gornolyzhnye-tury/', label: isEn ? 'Ski tours in the Alps' : 'Горнолыжные туры в Альпы' },
    { href: '/italy/', label: isEn ? 'Italy tours' : 'Туры в Италию' },
    { href: '/sitemap/', label: isEn ? 'Site map' : 'Карта сайта' },
  ]

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main className="mx-auto min-h-screen w-full max-w-[1200px] px-4 pb-12 pt-[calc(6rem+40px)] sm:px-6 md:px-8 lg:px-5">
        <section className="rounded-2xl border border-border-soft bg-bg-card px-6 py-10 text-center shadow-[0_10px_28px_rgba(0,0,0,0.03)] sm:px-10 sm:py-12">
          <h1 className="section-title !mb-6 text-center">{title}</h1>
          <p className="mx-auto mb-8 max-w-[760px] text-sm leading-7 text-text-light">{subtitle}</p>
          <div className="mx-auto grid max-w-[760px] gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[58px] items-center justify-center rounded-[50px] border border-text-main px-6 py-3 text-center text-[12px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <TelegramFloatButton />
    </div>
  )
}

export default HomeHubPage
