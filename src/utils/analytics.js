const METRIKA_ID = 105878112

const PAGE_DEFAULTS = {
  '/switzerland': {
    page_url: '/switzerland/',
    page_type: 'country_landing',
    direction: 'Switzerland',
  },
}

function normalizePath(pathname) {
  return (pathname || '/').replace(/\/+$/, '') || '/'
}

function resolvePageContext(overrides = {}) {
  if (typeof window === 'undefined') {
    return {
      page_url: overrides.page_url || '/',
      page_type: overrides.page_type || 'page',
      direction: overrides.direction || '',
    }
  }

  const path = normalizePath(window.location.pathname)
  const defaults = PAGE_DEFAULTS[path] || {
    page_url: `${path === '/' ? '/' : `${path}/`}`,
    page_type: 'page',
    direction: '',
  }

  return {
    page_url: overrides.page_url || defaults.page_url,
    page_type: overrides.page_type || defaults.page_type,
    direction: overrides.direction || defaults.direction,
  }
}

/**
 * Единая отправка событий в dataLayer (YM ecommerce) и reachGoal Метрики.
 * @param {string} eventName
 * @param {{ cta_position?: string, cta_text?: string, page_url?: string, page_type?: string, direction?: string } & Record<string, unknown>} [payload]
 */
export function trackEvent(eventName, payload = {}) {
  if (!eventName || typeof window === 'undefined') return

  const { cta_position, cta_text, page_url, page_type, direction, ...rest } = payload
  const pageContext = resolvePageContext({ page_url, page_type, direction })

  const params = {
    ...pageContext,
    ...(cta_position ? { cta_position } : {}),
    ...(cta_text ? { cta_text } : {}),
    ...rest,
  }

  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...params })
  } catch {
    /* ignore */
  }

  try {
    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'reachGoal', eventName, params)
    }
  } catch {
    /* ignore */
  }
}

export function trackCtaClick({ ctaText, ctaPosition, ...rest } = {}) {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_position: ctaPosition,
    ...rest,
  })
}

export function trackFormSubmit({ ctaText, ctaPosition = 'final', ...rest } = {}) {
  trackEvent('form_submit', {
    cta_text: ctaText,
    cta_position: ctaPosition,
    ...rest,
  })
}

export function trackFormSuccess({ ctaText, ctaPosition = 'final', ...rest } = {}) {
  trackEvent('form_success', {
    cta_text: ctaText,
    cta_position: ctaPosition,
    ...rest,
  })
}

export function trackPhoneClick({ ctaText, ctaPosition = 'footer', ...rest } = {}) {
  trackEvent('phone_click', {
    cta_text: ctaText,
    cta_position: ctaPosition,
    ...rest,
  })
}

export function trackMessengerClick({ ctaText, ctaPosition = 'sticky', ...rest } = {}) {
  trackEvent('messenger_click', {
    cta_text: ctaText,
    cta_position: ctaPosition,
    ...rest,
  })
}

export function trackPdfDownload({ ctaText = 'Скачать PDF', ctaPosition = 'tour_card', ...rest } = {}) {
  trackEvent('pdf_download', {
    cta_text: ctaText,
    cta_position: ctaPosition,
    ...rest,
  })
}
