/**
 * FAQ для JSON-LD: plain text без HTML (требование SEO).
 */
export function htmlToPlainText(html) {
  if (!html || typeof html !== 'string') return ''
  if (typeof document !== 'undefined') {
    const el = document.createElement('div')
    el.innerHTML = html
    return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim()
  }
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * @param {Array<{ question: string, answerHtml: string }>} faqItems
 * @param {{ preserveHtml?: boolean }} [options] — preserveHtml: оставить HTML в text (как в видимом FAQ)
 */
export function buildFaqPageJsonLd(faqItems, options = {}) {
  const { preserveHtml = false } = options
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqItems || []).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: preserveHtml ? item.answerHtml || '' : htmlToPlainText(item.answerHtml),
      },
    })),
  }
}
