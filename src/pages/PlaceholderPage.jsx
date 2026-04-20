import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbOverlay from '../components/BreadcrumbOverlay'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vacanza Bianca',
  url: 'https://vacanzabianca.ru/',
  logo: 'https://vacanzabianca.ru/images/icons/favicon.png',
  sameAs: ['https://t.me/la_vacanza_bianca', 'https://wa.me/393331430647'],
}

function buildBreadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  }
}

const PlaceholderPage = ({
  title,
  description,
  canonical,
  h1,
  subtitle,
  breadcrumbs,
  links = [],
  heroImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentCrumb = breadcrumbs?.[breadcrumbs.length - 1]?.name || h1

  const jsonLd = useMemo(() => {
    const crumbs = breadcrumbs?.length ? buildBreadcrumbs(breadcrumbs) : null
    return [ORG, crumbs].filter(Boolean)
  }, [breadcrumbs])

  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')
        ? window.location.origin
        : 'https://vacanzabianca.ru'
    const og =
      heroImage && heroImage.startsWith('/') ? `${origin}${heroImage}` : heroImage || `${origin}/images/about/hero-composite.jpg`
    upsertMeta({
      title,
      description,
      canonical,
      ogImage: og,
    })

    const unmount = mountJsonLd(`jsonld-${canonical || title}`.replace(/[^a-zA-Z0-9-_]/g, ''), jsonLd)
    return () => unmount()
  }, [canonical, description, heroImage, jsonLd, title])

  return (
    <div className="min-h-screen bg-bg-base">
      <header className="header relative z-20 flex items-center justify-between bg-bg-base px-4 py-4 sm:px-6 md:px-8 lg:px-[50px] lg:py-[26px]">
        <a
          href="/"
          className="logo font-serif text-[24px] uppercase tracking-[0.05em] text-text-main transition-opacity hover:opacity-70"
          style={{ fontWeight: '300' }}
        >
          LA VACANZA BIANCA
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/sitemap/"
            className="rounded-[50px] border border-border-soft px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-text-main transition-colors hover:border-text-main"
          >
            Все страницы
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-[50px] border border-text-main px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
          >
            Подобрать тур
          </button>
        </div>
      </header>

      <main className="pb-12">
        <section className="relative min-h-[60vh] overflow-hidden">
          <img
            src={heroImage || '/images/about/hero-composite.jpg'}
            alt={h1}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[rgba(241,236,235,0.62)]" />
          <BreadcrumbOverlay
            ariaLabel="Хлебные крошки"
            homeLabel="Главная"
            currentLabel={currentCrumb}
          />
          <div className="relative mx-auto flex min-h-[60vh] w-full max-w-[1200px] flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-5">
            <h1 className="hero-title mb-5 max-w-[860px] text-[clamp(40px,6vw,68px)] uppercase tracking-[0.06em] text-text-main">
              {h1}
            </h1>
            {subtitle ? (
              <p className="hero-desc mb-8 max-w-[720px] text-lg leading-8 text-[#494949]">{subtitle}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="main-btn inline-flex rounded-[50px] border border-text-main px-[40px] py-[16px] text-[12px] uppercase tracking-[0.14em] text-text-main transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main hover:text-white"
              >
                Подобрать тур
              </button>
              <a
                href="/sitemap/"
                className="inline-flex rounded-[50px] border border-border-soft bg-bg-card px-[40px] py-[16px] text-[12px] uppercase tracking-[0.12em] text-text-main transition-colors hover:border-text-main"
              >
                Смотреть структуру
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10">О странице</h2>
          <p className="section-subtitle !mb-10 max-w-[900px]">{description}</p>

          <div className="rounded-xl border border-border-soft bg-bg-card p-6">
            <h3 className="mb-3 font-serif text-[28px] text-text-main" style={{ fontWeight: '300' }}>
              Контент будет добавлен
            </h3>
            <p className="text-sm leading-7 text-text-light">
              Это временная заглушка по структуре сайта. Стили, типографика и сетка сохранены; дальше наполним блоки по SEO-ТЗ.
            </p>
          </div>
        </section>

        {links?.length ? (
          <section className="mx-auto mt-14 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
            <h2 className="section-title !mb-10">{h1 ? 'Перелинковка' : 'Ссылки'}</h2>
            <div className="rounded-xl border border-border-soft bg-bg-card p-6">
              <ul className="grid gap-2 md:grid-cols-2">
                {links.map((href) => (
                  <li key={href}>
                    <a href={href} className="text-sm leading-6 text-text-main underline-offset-4 hover:underline">
                      {href}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default PlaceholderPage

