/**
 * Контекст родителя для хлебных крошек на общих страницах туров
 * (один URL тура открывается и из /italy/, и из /switzerland/).
 * Хранится в sessionStorage до явной смены.
 */
const STORAGE_KEY = 'vb:breadcrumb-parent'

export const BREADCRUMB_PARENT = {
  italy: 'italy',
  switzerland: 'switzerland',
  alps: 'alps',
  home: 'home',
}

export function setBreadcrumbParent(parent) {
  if (typeof window === 'undefined') return
  if (!parent) {
    window.sessionStorage.removeItem(STORAGE_KEY)
    return
  }
  window.sessionStorage.setItem(STORAGE_KEY, parent)
}

export function getBreadcrumbParent(fallback = BREADCRUMB_PARENT.italy) {
  if (typeof window === 'undefined') return fallback
  return window.sessionStorage.getItem(STORAGE_KEY) || fallback
}

/** Вызывать при клике по ссылке с хаба, чтобы целевая страница знала откуда пришли. */
export function rememberBreadcrumbParent(parent) {
  return () => setBreadcrumbParent(parent)
}
