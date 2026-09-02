/** База сайта для абсолютных ссылок на файлы из `public/` (PDF и т.д.). */
const DEFAULT_ORIGIN = 'https://vacanzabianca.ru'

/**
 * Превращает путь вида `/files/…` в полный URL, чтобы скачивание PDF не ломалось
 * при SPA-fallback и при открытии страницы не с корня домена.
 * @param {string} relativePath
 */
export function absolutePublicUrl(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return relativePath
  if (/^https?:\/\//i.test(relativePath)) return relativePath
  const fromEnv = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_ORIGIN
  const origin = String(fromEnv || DEFAULT_ORIGIN).replace(/\/$/, '')
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return `${origin}${path}`
}
