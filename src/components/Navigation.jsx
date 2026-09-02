import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const PHONE_E164 = '+393520014647'
const PHONE_DISPLAY = '+39 352 001 4647'
const CONSULTATION_ICON = '/images/consultation.webp'

const normalizePath = (pathname) => {
  const p = (pathname || '/').replace(/\/+$/, '')
  return p || '/'
}

const SCROLL_THRESHOLD = 16

/** Один источник позиции скролла (iOS / разные режимы документа) */
function readDocumentScrollY() {
  if (typeof window === 'undefined') return 0
  const { scrollY, pageYOffset } = window
  const docEl = document.documentElement
  const body = document.body
  if (typeof scrollY === 'number' && !Number.isNaN(scrollY)) return scrollY
  if (typeof pageYOffset === 'number' && !Number.isNaN(pageYOffset)) return pageYOffset
  if (docEl) return docEl.scrollTop || 0
  if (body) return body.scrollTop || 0
  return 0
}

const Navigation = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [alpsOpen, setAlpsOpen] = useState(false)
  const [switzerlandOpen, setSwitzerlandOpen] = useState(false)
  const [mobileAlpsOpen, setMobileAlpsOpen] = useState(false)
  const [mobileSwitzerlandOpen, setMobileSwitzerlandOpen] = useState(false)
  const [isCompactCta, setIsCompactCta] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 575 : false,
  )
  const [headerHeight, setHeaderHeight] = useState(88)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [navStyle, setNavStyle] = useState({
    bgClass: 'bg-transparent',
    text: 'text-text-main',
    backdrop: '',
  })
  const headerRef = useRef(null)
  const activeNavStyle = isOpen
    ? {
        bgClass: 'bg-bg-base',
        text: 'text-text-main',
        backdrop: '',
      }
    : navStyle

  const syncHeaderScroll = () => {
    const y = readDocumentScrollY()
    const past = y > SCROLL_THRESHOLD
    const path = normalizePath(window.location.pathname)
    const onDarkHero =
      (path === '/switzerland' || path === '/switzerland/st-moritz') && !past
    setHeaderScrolled(past)
    setNavStyle({
      bgClass: past ? '' : 'bg-transparent',
      text: onDarkHero ? 'text-white' : 'text-text-main',
      backdrop: '',
    })
  }

  const syncHeaderHeight = () => {
    const h = Math.round(headerRef.current?.getBoundingClientRect().height || 88)
    setHeaderHeight(h > 0 ? h : 88)
    document.documentElement.style.setProperty('--site-header-height', `${h > 0 ? h : 88}px`)
  }

  useEffect(() => {
    const handleViewport = () => {
      const width = window.innerWidth || 0
      setIsCompactCta(width < 575)
    }
    syncHeaderHeight()
    handleViewport()
    syncHeaderScroll()
    let ticking = false
    const throttled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          syncHeaderScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', throttled, { passive: true })
    window.addEventListener('scrollend', syncHeaderScroll, { passive: true })
    window.addEventListener('resize', syncHeaderScroll, { passive: true })
    window.addEventListener('resize', handleViewport, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttled)
      window.removeEventListener('scrollend', syncHeaderScroll)
      window.removeEventListener('resize', syncHeaderScroll)
      window.removeEventListener('resize', handleViewport)
    }
  }, [])

  useEffect(() => {
    syncHeaderHeight()
    const headerEl = headerRef.current
    if (!headerEl || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => syncHeaderHeight())
    observer.observe(headerEl)
    return () => observer.disconnect()
  }, [])

  const handleContactClick = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isOpen) setIsOpen(false)
    setTimeout(() => {
      window.dispatchEvent(new Event('openContactModal'))
    }, isOpen ? 200 : 0)
  }

  const scrollToHomeSection = (hash) => {
    const id = hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (el) {
      const headerH = headerRef.current?.offsetHeight || 88
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8
      window.scrollTo({ top, behavior: 'smooth' })
      window.history.pushState(null, '', `/#${id}`)
    }
  }

  const onInPageAnchorClick = (e, hash) => {
    if (normalizePath(window.location.pathname) !== '/') return
    e.preventDefault()
    scrollToHomeSection(hash)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.mobile-menu-container')
      if (isOpen && mobileMenu && !mobileMenu.contains(event.target)) {
        const hamburgerButton = event.target.closest('button[data-nav-toggle="true"]')
        if (!hamburgerButton) setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      syncHeaderHeight()
    } else {
      setMobileAlpsOpen(false)
      setMobileSwitzerlandOpen(false)
    }
  }, [isOpen])

  const linkDesk = `site-header-link ${activeNavStyle.text}`

  return (
    <>
      <header
        ref={headerRef}
        className={`header px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-5 xl:px-12 2xl:px-16 z-[70] transition-all duration-300 ${activeNavStyle.bgClass} ${activeNavStyle.backdrop || ''}`}
        style={{
          zIndex: 100,
          ...(!isOpen
            ? headerScrolled
              ? {
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px) saturate(1.06)',
                  WebkitBackdropFilter: 'blur(10px) saturate(1.06)',
                }
              : {
                  backgroundColor: 'transparent',
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                }
            : {}),
        }}
      >
        <div className="site-header-shell">
          <div className="site-header-brand">
            <button
              type="button"
              data-nav-toggle="true"
              className={`relative z-[72] flex-shrink-0 lg:hidden ${activeNavStyle.text}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('navHub.closeMenu') : 'Toggle menu'}
            >
              <div className="flex h-6 w-6 flex-col items-center justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
                />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
                />
              </div>
            </button>

            <a
              href="/"
              className={`logo max-w-[min(52vw,14rem)] truncate font-serif text-[16px] font-semibold tracking-[0.04em] sm:max-w-none sm:text-[18px] sm:overflow-visible sm:whitespace-normal lg:text-[20px] xl:text-[22px] ${activeNavStyle.text} uppercase no-underline transition-opacity hover:opacity-70`}
            >
              LA VACANZA BIANCA
            </a>
          </div>

          <nav className="site-header-nav" aria-label="Main">
            <a href="/italy/" className={linkDesk}>
              {t('navHub.italy')}
            </a>
            <div
              className="relative"
              onMouseEnter={() => setSwitzerlandOpen(true)}
              onMouseLeave={() => setSwitzerlandOpen(false)}
            >
              <button
                type="button"
                className={`${linkDesk} inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0`}
                aria-expanded={switzerlandOpen}
                aria-haspopup="true"
              >
                {t('navHub.switzerland')}
                <span className="text-[10px] leading-none" aria-hidden>
                  ▾
                </span>
              </button>
              {switzerlandOpen ? (
                <div className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-3">
                  <div className="rounded-xl border border-border-soft bg-bg-card py-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                    <a
                      href="/switzerland/"
                      className="block px-5 py-3 font-sans text-[13px] text-text-main no-underline transition-colors hover:bg-bg-base"
                    >
                      {t('navHub.switzerlandTours')}
                    </a>
                    <a
                      href="/switzerland/st-moritz/"
                      className="block px-5 py-3 font-sans text-[13px] text-text-main no-underline transition-colors hover:bg-bg-base"
                    >
                      {t('navHub.stMoritz')}
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setAlpsOpen(true)}
              onMouseLeave={() => setAlpsOpen(false)}
            >
              <button
                type="button"
                className={`${linkDesk} inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0`}
                aria-expanded={alpsOpen}
                aria-haspopup="true"
              >
                {t('navHub.alps')}
                <span className="text-[10px] leading-none" aria-hidden>
                  ▾
                </span>
              </button>
              {alpsOpen ? (
                <div className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-3">
                  <div className="rounded-xl border border-border-soft bg-bg-card py-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                    <a
                      href="/alps/gornolyzhnye-tury"
                      className="block px-5 py-3 font-sans text-[13px] text-text-main no-underline transition-colors hover:bg-bg-base"
                    >
                      {t('navHub.alpsSki')}
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <a href="/#about" className={linkDesk} onClick={(e) => onInPageAnchorClick(e, '#about')}>
              {t('navHub.about')}
            </a>
            <a href="/#reviews" className={linkDesk} onClick={(e) => onInPageAnchorClick(e, '#reviews')}>
              {t('navHub.reviews')}
            </a>
            <a href="/#faq" className={linkDesk} onClick={(e) => onInPageAnchorClick(e, '#faq')}>
              {t('navHub.faq')}
            </a>
            <a href="/blog/" className={linkDesk}>
              {t('navHub.blog')}
            </a>
          </nav>

          <div className="site-header-actions">
            <a
              href={`tel:${PHONE_E164}`}
              className={`hidden font-sans text-[13px] 2xl:inline ${activeNavStyle.text} no-underline transition-opacity hover:opacity-70`}
              style={{ fontWeight: 600 }}
            >
              {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={handleContactClick}
              aria-label={t('navHub.pickTour')}
              className={
                isCompactCta
                  ? `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none outline-none ring-0 transition-opacity hover:opacity-85 active:opacity-70 focus-visible:ring-2 focus-visible:ring-text-main/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`
                  : 'site-header-btn'
              }
            >
              {isCompactCta ? (
                <img
                  src={CONSULTATION_ICON}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-contain"
                  decoding="async"
                />
              ) : (
                <>
                  <span className="whitespace-nowrap leading-none 2xl:hidden">{t('navHub.pickTourShort')}</span>
                  <span className="hidden whitespace-nowrap leading-none 2xl:inline">{t('navHub.pickTour')}</span>
                </>
              )}
            </button>
            <div className="hidden items-center md:flex" style={{ height: 24 }}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu-container fixed left-0 right-0 z-[60] transition-transform duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full'
        }`}
        style={{ top: 0, paddingTop: Math.max(headerHeight - 1, 0) }}
      >
        <div className="border-b border-border-soft bg-bg-base shadow-lg">
          <div className="flex max-h-[min(85vh,640px)] flex-col overflow-y-auto px-4 pb-5">
            <a
              href="/italy/"
              className="border-b border-border-soft py-4 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main no-underline"
              style={{ fontWeight: 500 }}
              onClick={() => setIsOpen(false)}
            >
              {t('navHub.italy')}
            </a>
            <div className="border-b border-border-soft py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main"
                style={{ fontWeight: 500 }}
                aria-expanded={mobileSwitzerlandOpen}
                onClick={() => setMobileSwitzerlandOpen(!mobileSwitzerlandOpen)}
              >
                {t('navHub.switzerland')}
                <span className="text-lg">{mobileSwitzerlandOpen ? '−' : '+'}</span>
              </button>
              {mobileSwitzerlandOpen ? (
                <>
                  <a
                    href="/switzerland/"
                    className="block py-2 pl-2 font-sans text-[13px] text-text-light no-underline hover:text-text-main"
                    onClick={() => {
                      setIsOpen(false)
                      setMobileSwitzerlandOpen(false)
                    }}
                  >
                    {t('navHub.switzerlandTours')}
                  </a>
                  <a
                    href="/switzerland/st-moritz/"
                    className="block py-2 pl-2 font-sans text-[13px] text-text-light no-underline hover:text-text-main"
                    onClick={() => {
                      setIsOpen(false)
                      setMobileSwitzerlandOpen(false)
                    }}
                  >
                    {t('navHub.stMoritz')}
                  </a>
                </>
              ) : null}
            </div>
            <div className="border-b border-border-soft py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main"
                style={{ fontWeight: 500 }}
                aria-expanded={mobileAlpsOpen}
                onClick={() => setMobileAlpsOpen(!mobileAlpsOpen)}
              >
                {t('navHub.alps')}
                <span className="text-lg">{mobileAlpsOpen ? '−' : '+'}</span>
              </button>
              {mobileAlpsOpen ? (
                <a
                  href="/alps/gornolyzhnye-tury"
                  className="block py-2 pl-2 font-sans text-[13px] text-text-light no-underline hover:text-text-main"
                  onClick={() => {
                    setIsOpen(false)
                    setMobileAlpsOpen(false)
                  }}
                >
                  {t('navHub.alpsSki')}
                </a>
              ) : null}
            </div>
            <a
              href="/#about"
              className="border-b border-border-soft py-4 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main no-underline"
              style={{ fontWeight: 500 }}
              onClick={(e) => {
                onInPageAnchorClick(e, '#about')
                setIsOpen(false)
              }}
            >
              {t('navHub.about')}
            </a>
            <a
              href="/#reviews"
              className="border-b border-border-soft py-4 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main no-underline"
              style={{ fontWeight: 500 }}
              onClick={(e) => {
                onInPageAnchorClick(e, '#reviews')
                setIsOpen(false)
              }}
            >
              {t('navHub.reviews')}
            </a>
            <a
              href="/#faq"
              className="border-b border-border-soft py-4 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main no-underline"
              style={{ fontWeight: 500 }}
              onClick={(e) => {
                onInPageAnchorClick(e, '#faq')
                setIsOpen(false)
              }}
            >
              {t('navHub.faq')}
            </a>
            <a
              href="/blog/"
              className="border-b border-border-soft py-4 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main no-underline"
              style={{ fontWeight: 500 }}
              onClick={() => setIsOpen(false)}
            >
              {t('navHub.blog')}
            </a>
            <a
              href={`tel:${PHONE_E164}`}
              className="py-4 font-sans text-sm text-text-main no-underline md:hidden"
              style={{ fontWeight: 500 }}
            >
              {PHONE_DISPLAY}
            </a>
            <div className="mt-2 flex justify-start border-t border-border-soft pt-4 md:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
