import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'

const CANONICAL = 'https://vacanzabianca.ru/sitemap/'
const TITLE = 'Карта сайта – Vacanza Bianca'
const DESCRIPTION =
  'Структура многостраничного сайта Vacanza Bianca. Быстрый доступ к разделам Италия, Швейцария, Альпы и блогу.'

/** Относительные пути: навигация остаётся на текущем хосте (localhost / прод), SPA подхватывает маршрут */
const structure = [
  {
    section: 'Главная',
    items: [{ name: 'Главная', href: '/' }],
  },
  {
    section: 'Италия',
    items: [
      { name: 'Туры в Италию (раздел)', href: '/italy/' },
      { name: 'Летние туры', href: '/italy/tury-letom/' },
      { name: 'Горнолыжные туры', href: '/italy/gornolyzhnye-tury/' },
      {
        name: 'Горнолыжные туры Доломити Superski',
        href: '/italy/gornolyzhnye-tury/dolomiti-superski/',
      },
      { name: 'Доломитовые Альпы', href: '/italy/dolomity-alps/' },
      { name: 'Экскурсии в Италии', href: '/italy/excursions/' },
      { name: 'Туры в Италию на двоих', href: '/italy/tury-na-dvoih/' },
      { name: 'Туры на север Италии', href: '/italy/tury-sever/' },
      { name: 'Туры в Италию на март', href: '/italy/tury-march/' },
      { name: 'Туры в Италию на май', href: '/italy/tury-may/' },
      { name: 'Туры в Италию на 7 дней', href: '/italy/7-days/' },
      { name: 'Туры на озеро Комо', href: '/italy/tury-ozero-como/' },
      { name: 'Туры на озеро Гарда', href: '/italy/tury-ozero-garda/' },
    ],
  },
  {
    section: 'Швейцария',
    items: [
      { name: 'Швейцария', href: '/switzerland/' },
      { name: 'Курорт Санкт-Мориц', href: '/switzerland/st-moritz/' },
      { name: 'Курорт Церматт', href: '/switzerland/zermatt/' },
      { name: 'Курорт Вербье', href: '/switzerland/verbier/' },
      { name: 'Курорт Лаакс', href: '/switzerland/laax/' },
      { name: 'Курорт Кран-Монтана', href: '/switzerland/crans-montana/' },
    ],
  },
  {
    section: 'Альпы',
    items: [
      { name: 'Альпы', href: '/alps/' },
      { name: 'Горнолыжные туры в Альпы', href: '/alps/gornolyzhnye-tury/' },
    ],
  },
  {
    section: 'Блог',
    items: [
      { name: 'Блог', href: '/blog/' },
      { name: 'Горнолыжные курорты Альп', href: '/blog/gornolyzhnye-kurorty-alpy/' },
      { name: 'Горнолыжные курорты Италии', href: '/blog/gornolyzhnye-kurorty-italy/' },
      { name: 'Горнолыжные курорты Швейцарии', href: '/blog/gornolyzhnye-kurorty-switzerland/' },
      { name: 'Горнолыжные курорты Европы', href: '/blog/gornolyzhnye-kurorty-europe/' },
      { name: 'Альпы Швейцария гид', href: '/blog/switzerland-alps/' },
      { name: 'Куда поехать в Италии', href: '/blog/kuda-poehat-italy/' },
      { name: 'Отдых в Италии летом', href: '/blog/otdyh-v-italy-letom/' },
      { name: 'Отдых в Италии на море', href: '/blog/otdyh-v-italy-na-more/' },
      { name: 'Сколько стоит поездка в Италию', href: '/blog/skolko-stoit-poyezdka-v-italy/' },
      { name: 'Озеро Комо vs Гарда', href: '/blog/como-vs-garda/' },
      { name: 'Озеро Комо гид', href: '/blog/ozero-como/' },
      { name: 'Озеро Комо за 1 день', href: '/blog/ozero-como-1-day/' },
      { name: 'Озеро Гарда гид', href: '/blog/ozero-garda/' },
      { name: 'Озеро Маджоре гид', href: '/blog/ozero-maggiore/' },
      { name: 'Озера северной Италии', href: '/blog/ozera-na-severe-italy/' },
      { name: 'Озера в Доломитовых Альпах', href: '/blog/ozera-v-dolomitovyh-alpah/' },
      { name: 'Лучшие пляжи озера Комо', href: '/blog/luchshie-plyazhi-ozero-como/' },
      { name: 'Пешие маршруты Альпы', href: '/blog/peshehodnye-marshruty-alps/' },
      {
        name: 'Пешие маршруты озеро Гарда',
        href: '/blog/peshehodnye-marshruty-ozero-garda/',
      },
    ],
  },
]

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vacanza Bianca',
  url: 'https://vacanzabianca.ru/',
  logo: 'https://vacanzabianca.ru/images/icons/favicon.png',
  sameAs: ['https://t.me/la_vacanza_bianca', 'https://wa.me/393331430647'],
}

const SiteMapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const jsonLd = useMemo(
    () => [
      ORG,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://vacanzabianca.ru/' },
          { '@type': 'ListItem', position: 2, name: 'Карта сайта', item: CANONICAL },
        ],
      },
    ],
    [],
  )

  useEffect(() => {
    upsertMeta({
      title: TITLE,
      description: DESCRIPTION,
      canonical: CANONICAL,
    })
    const unmount = mountJsonLd('sitemap-jsonld', jsonLd)
    return () => unmount()
  }, [jsonLd])

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-[50px] border border-text-main px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
        >
          Подобрать тур
        </button>
      </header>

      <main className="pb-12">
        <section className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h1 className="section-title !mb-10">Карта сайта</h1>
          <p className="section-subtitle !mb-10 max-w-[860px]">
            Быстрый доступ ко всем страницам из согласованной структуры. Сейчас часть страниц — заглушки, но URL и перелинковка уже
            готовы.
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="/italy/"
              className="inline-flex rounded-[50px] border border-text-main px-6 py-3 text-[11px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
            >
              Туры в Италию
            </a>
            <a
              href="/"
              className="inline-flex rounded-[50px] border border-border-soft px-6 py-3 text-[11px] uppercase tracking-[0.12em] text-text-main transition-colors hover:border-text-main"
            >
              Главная
            </a>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="grid gap-6">
            {structure.map((block) => (
              <article key={block.section} className="rounded-xl border border-border-soft bg-bg-card p-6">
                <h2 className="mb-4 font-serif text-[28px] text-text-main" style={{ fontWeight: '300' }}>
                  {block.section}
                </h2>
                <ul className="grid gap-2 md:grid-cols-2">
                  {block.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-sm leading-6 text-text-main underline-offset-4 hover:underline">
                        {item.name}
                      </a>
                      <div className="text-[11px] leading-5 text-[#888]">{item.href}</div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default SiteMapPage

