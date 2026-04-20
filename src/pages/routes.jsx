import ItalyPage from './ItalyPage'
import ItalyComoPage from './ItalyComoPage'
import SiteMapPage from './SiteMapPage'
import PlaceholderPage from './PlaceholderPage'
import AlpsSkiToursPage from './AlpsSkiToursPage'
import HomeHubPage from './HomeHubPage'

const hero = '/images/about/hero-composite.jpg'

export function getRouteComponent(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/'

  if (path === '/') return { Component: HomeHubPage }
  if (path === '/italy') return { Component: ItalyPage }
  if (path === '/italy/tury-ozero-como') return { Component: ItalyComoPage }
  if (path === '/alps/gornolyzhnye-tury') return { Component: AlpsSkiToursPage }
  if (path === '/sitemap') return { Component: SiteMapPage }

  const placeholders = {
    '/italy/tury-ozero-garda': {
      h1: 'Туры на озеро Гарда',
      canonical: 'https://vacanzabianca.ru/italy/tury-ozero-garda/',
      description: 'Страница под кластер запросов «туры на озеро Гарда». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Озеро Гарда', item: 'https://vacanzabianca.ru/italy/tury-ozero-garda/' },
      ],
    },
    '/italy/dolomity-alps': {
      h1: 'Доломитовые Альпы',
      canonical: 'https://vacanzabianca.ru/italy/dolomity-alps/',
      description: 'Страница под кластер «Доломитовые Альпы». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Доломитовые Альпы', item: 'https://vacanzabianca.ru/italy/dolomity-alps/' },
      ],
    },
    '/italy/tury-sever': {
      h1: 'Туры на север Италии',
      canonical: 'https://vacanzabianca.ru/italy/tury-sever/',
      description: 'Страница под кластер «туры на север Италии». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Север Италии', item: 'https://vacanzabianca.ru/italy/tury-sever/' },
      ],
    },
    '/italy/tury-letom': {
      h1: 'Летние туры в Италию',
      canonical: 'https://vacanzabianca.ru/italy/tury-letom/',
      description: 'Страница под кластер «летние туры в Италию». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Летние туры', item: 'https://vacanzabianca.ru/italy/tury-letom/' },
      ],
    },
    '/italy/gornolyzhnye-tury': {
      h1: 'Горнолыжные туры в Италию',
      canonical: 'https://vacanzabianca.ru/italy/gornolyzhnye-tury/',
      description: 'Страница под кластер «горнолыжные туры в Италию». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Горнолыжные туры', item: 'https://vacanzabianca.ru/italy/gornolyzhnye-tury/' },
      ],
    },
    '/italy/gornolyzhnye-tury/dolomiti-superski': {
      h1: 'Горнолыжные туры Доломити Superski',
      canonical: 'https://vacanzabianca.ru/italy/gornolyzhnye-tury/dolomiti-superski/',
      description: 'Страница под кластер «Доломити Superski». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Горнолыжные туры', item: 'https://vacanzabianca.ru/italy/gornolyzhnye-tury/' },
        { name: 'Dolomiti Superski', item: 'https://vacanzabianca.ru/italy/gornolyzhnye-tury/dolomiti-superski/' },
      ],
    },
    '/italy/excursions': {
      h1: 'Экскурсии в Италии',
      canonical: 'https://vacanzabianca.ru/italy/excursions/',
      description: 'Страница под кластер «экскурсии в Италии». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Экскурсии', item: 'https://vacanzabianca.ru/italy/excursions/' },
      ],
    },
    '/italy/tury-na-dvoih': {
      h1: 'Туры в Италию на двоих',
      canonical: 'https://vacanzabianca.ru/italy/tury-na-dvoih/',
      description: 'Страница под кластер «туры в Италию на двоих». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'На двоих', item: 'https://vacanzabianca.ru/italy/tury-na-dvoih/' },
      ],
    },
    '/italy/tury-march': {
      h1: 'Туры в Италию на март',
      canonical: 'https://vacanzabianca.ru/italy/tury-march/',
      description: 'Страница под кластер «туры в Италию на март». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Март', item: 'https://vacanzabianca.ru/italy/tury-march/' },
      ],
    },
    '/italy/tury-may': {
      h1: 'Туры в Италию на май',
      canonical: 'https://vacanzabianca.ru/italy/tury-may/',
      description: 'Страница под кластер «туры в Италию на май». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: 'Май', item: 'https://vacanzabianca.ru/italy/tury-may/' },
      ],
    },
    '/italy/7-days': {
      h1: 'Туры в Италию на 7 дней',
      canonical: 'https://vacanzabianca.ru/italy/7-days/',
      description: 'Страница под кластер «туры в Италию на 7 дней». Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
        { name: '7 дней', item: 'https://vacanzabianca.ru/italy/7-days/' },
      ],
    },

    '/switzerland': {
      h1: 'Швейцария',
      canonical: 'https://vacanzabianca.ru/switzerland/',
      description: 'Страница раздела Швейцария. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Швейцария', item: 'https://vacanzabianca.ru/switzerland/' },
      ],
    },
    '/switzerland/st-moritz': {
      h1: 'Курорт Санкт-Мориц',
      canonical: 'https://vacanzabianca.ru/switzerland/st-moritz/',
      description: 'Посадочная страница курорта Санкт-Мориц. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Швейцария', item: 'https://vacanzabianca.ru/switzerland/' },
        { name: 'Санкт-Мориц', item: 'https://vacanzabianca.ru/switzerland/st-moritz/' },
      ],
    },
    '/switzerland/zermatt': {
      h1: 'Курорт Церматт',
      canonical: 'https://vacanzabianca.ru/switzerland/zermatt/',
      description: 'Посадочная страница курорта Церматт. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Швейцария', item: 'https://vacanzabianca.ru/switzerland/' },
        { name: 'Церматт', item: 'https://vacanzabianca.ru/switzerland/zermatt/' },
      ],
    },
    '/switzerland/verbier': {
      h1: 'Курорт Вербье',
      canonical: 'https://vacanzabianca.ru/switzerland/verbier/',
      description: 'Посадочная страница курорта Вербье. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Швейцария', item: 'https://vacanzabianca.ru/switzerland/' },
        { name: 'Вербье', item: 'https://vacanzabianca.ru/switzerland/verbier/' },
      ],
    },
    '/switzerland/laax': {
      h1: 'Курорт Лаакс',
      canonical: 'https://vacanzabianca.ru/switzerland/laax/',
      description: 'Посадочная страница курорта Лаакс. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Швейцария', item: 'https://vacanzabianca.ru/switzerland/' },
        { name: 'Лаакс', item: 'https://vacanzabianca.ru/switzerland/laax/' },
      ],
    },
    '/switzerland/crans-montana': {
      h1: 'Курорт Кран-Монтана',
      canonical: 'https://vacanzabianca.ru/switzerland/crans-montana/',
      description: 'Посадочная страница курорта Кран-Монтана. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Швейцария', item: 'https://vacanzabianca.ru/switzerland/' },
        { name: 'Кран-Монтана', item: 'https://vacanzabianca.ru/switzerland/crans-montana/' },
      ],
    },

    '/alps': {
      h1: 'Альпы',
      canonical: 'https://vacanzabianca.ru/alps/',
      description: 'Раздел Альпы. Контент будет добавлен по SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Альпы', item: 'https://vacanzabianca.ru/alps/' },
      ],
    },
    '/blog': {
      h1: 'Блог',
      canonical: 'https://vacanzabianca.ru/blog/',
      description: 'Блог Vacanza Bianca. Страницы статей будут наполнены по контент-плану.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Блог', item: 'https://vacanzabianca.ru/blog/' },
      ],
    },
  }

  const blogSlugs = [
    'gornolyzhnye-kurorty-alpy',
    'gornolyzhnye-kurorty-italy',
    'gornolyzhnye-kurorty-switzerland',
    'gornolyzhnye-kurorty-europe',
    'switzerland-alps',
    'kuda-poehat-italy',
    'otdyh-v-italy-letom',
    'otdyh-v-italy-na-more',
    'skolko-stoit-poyezdka-v-italy',
    'como-vs-garda',
    'ozero-como',
    'ozero-como-1-day',
    'ozero-garda',
    'ozero-maggiore',
    'ozera-na-severe-italy',
    'ozera-v-dolomitovyh-alpah',
    'luchshie-plyazhi-ozero-como',
    'peshehodnye-marshruty-alps',
    'peshehodnye-marshruty-ozero-garda',
  ]

  if (path.startsWith('/blog/') && blogSlugs.includes(path.split('/')[2])) {
    const slug = path.split('/')[2]
    placeholders[path] = {
      h1: 'Статья блога (заглушка)',
      canonical: `https://vacanzabianca.ru/blog/${slug}/`,
      description: 'Черновик страницы статьи. Контент будет подготовлен по контент-плану и SEO-ТЗ.',
      breadcrumbs: [
        { name: 'Главная', item: 'https://vacanzabianca.ru/' },
        { name: 'Блог', item: 'https://vacanzabianca.ru/blog/' },
        { name: slug, item: `https://vacanzabianca.ru/blog/${slug}/` },
      ],
    }
  }

  if (placeholders[path]) {
    const cfg = placeholders[path]
    const Component = () => (
      <PlaceholderPage
        title={`${cfg.h1} – Vacanza Bianca`}
        description={cfg.description}
        canonical={cfg.canonical}
        h1={cfg.h1}
        subtitle="Страница создана по структуре сайта. Дальше наполним блоки контентом."
        breadcrumbs={cfg.breadcrumbs}
        heroImage={hero}
      />
    )
    return { Component }
  }

  return null
}

