/** @param {string | undefined} lang */
export function isEnglishLocale(lang) {
  return typeof lang === 'string' && lang.toLowerCase().startsWith('en')
}
