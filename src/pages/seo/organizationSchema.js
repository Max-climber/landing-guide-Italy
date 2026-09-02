export const SITE_ORIGIN = 'https://vacanzabianca.ru'
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`
export const ORGANIZATION_PHONE = '+393520014647'
export const ORGANIZATION_EMAIL = 'mail@vacanzabianca.ru'

const ORGANIZATION_SAME_AS = [
  'https://www.instagram.com/it.tours.mountains.transfer?igsh=MWF6bHR1M3k4YzJpag==',
  'https://t.me/la_vacanza_bianca',
]

/** Europe/Rome offset for schema dates (CEST, summer). */
export const SCHEMA_TIMEZONE_OFFSET = '+02:00'

export function toSchemaDateTime(isoDate) {
  if (!isoDate) return undefined
  if (isoDate.includes('T')) return isoDate
  return `${isoDate}T00:00:00${SCHEMA_TIMEZONE_OFFSET}`
}

export function buildOrganizationSchema(overrides = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Vacanza Bianca',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/images/icons/favicon.png`,
    telephone: ORGANIZATION_PHONE,
    email: ORGANIZATION_EMAIL,
    sameAs: ORGANIZATION_SAME_AS,
    ...overrides,
  }
}

export function buildPublisherSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Vacanza Bianca',
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/images/icons/favicon.png`,
    },
  }
}

export function buildArticleAuthorSchema(author, origin = SITE_ORIGIN) {
  if (!author) {
    return {
      '@type': 'Organization',
      name: 'Vacanza Bianca',
      url: `${origin}/`,
    }
  }

  if (author.url) {
    return {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    }
  }

  return {
    '@type': 'Organization',
    name: author.name,
    url: `${origin}/`,
  }
}
