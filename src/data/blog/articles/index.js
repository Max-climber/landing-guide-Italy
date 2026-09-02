import { ozeroKomoItaliya } from './ozero-komo-italiya.js'
import { ozeroGardaItaliya } from './ozero-garda-italiya.js'
import { kudaPoehatItaly } from './kuda-poehat-italy.js'
import { ozeroKomoItaliyaEn } from './ozero-komo-italiya.en.js'
import { ozeroGardaItaliyaEn } from './ozero-garda-italiya.en.js'
import { kudaPoehatItalyEn } from './kuda-poehat-italy.en.js'

export const BLOG_ARTICLES = [ozeroKomoItaliya, ozeroGardaItaliya, kudaPoehatItaly]

export const BLOG_ARTICLES_BY_SLUG = Object.fromEntries(BLOG_ARTICLES.map((a) => [a.slug, a]))

export const BLOG_ARTICLES_EN_BY_SLUG = {
  'ozero-komo-italiya': ozeroKomoItaliyaEn,
  'ozero-garda-italiya': ozeroGardaItaliyaEn,
  'kuda-poehat-italy': kudaPoehatItalyEn,
}
