/** Категории блога: slug → метаданные и SEO. */
export const BLOG_CATEGORIES = {
  italy: {
    slug: 'italy',
    label: 'Италия',
    path: '/blog/italy/',
    metaTitle: 'Статьи об Италии — блог Vacanza Bianca',
    metaDescription:
      'Маршруты, озёра, города и советы по путешествиям по Италии: гиды, подборки и идеи для поездок от Vacanza Bianca.',
    h1: 'Блог об Италии',
    intro:
      'Собираем маршруты, сезонные гиды и практические советы по путешествиям по Италии: от озёр Ломбардии до Доломитов и Северной Италии.',
    indexable: true,
  },
  switzerland: {
    slug: 'switzerland',
    label: 'Швейцария',
    path: '/blog/switzerland/',
    metaTitle: 'Статьи о Швейцарии — блог Vacanza Bianca',
    metaDescription:
      'Путеводители, маршруты и идеи для поездок в Швейцарию: Альпы, озёра и горнолыжные направления от Vacanza Bianca.',
    h1: 'Блог о Швейцарии',
    intro:
      'Готовим материалы о путешествиях по Швейцарии: Альпы, озёра и горнолыжные направления. Скоро здесь появятся новые статьи.',
    indexable: false,
  },
  france: {
    slug: 'france',
    label: 'Франция',
    path: '/blog/france/',
    metaTitle: 'Статьи о Франции — блог Vacanza Bianca',
    metaDescription:
      'Гиды и идеи для путешествий по Франции: Альпы, Прованс и маршруты от Vacanza Bianca.',
    h1: 'Блог о Франции',
    intro:
      'Скоро опубликуем материалы о путешествиях по Франции: Альпы, курорты и маршруты для вдохновения.',
    indexable: false,
  },
}

export const BLOG_CATEGORY_SLUGS = Object.keys(BLOG_CATEGORIES)

export function getCategoryBySlug(slug) {
  return BLOG_CATEGORIES[slug] || null
}
