import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const PHONE_E164 = '+393331430647'
const PHONE_DISPLAY = '+39 333 143 0647'

const normalizePath = (pathname) => {
  const p = (pathname || '/').replace(/\/+$/, '')
  return p || '/'
}

const Navigation = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [alpsOpen, setAlpsOpen] = useState(false)
  const [mobileAlpsOpen, setMobileAlpsOpen] = useState(false)
  const [isNarrow575, setIsNarrow575] = useState(false)
  const [isVeryNarrow475, setIsVeryNarrow475] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(88)
  const [navStyle, setNavStyle] = useState({
    bgColor: 'transparent',
    bgClass: '',
    text: 'text-text-main',
    backdrop: 'backdrop-blur-[5px]',
  })
  const headerRef = useRef(null)
  const activeNavStyle = isOpen
    ? {
        bgColor: '#f1eceb',
        bgClass: 'bg-bg-base',
        text: 'text-text-main',
        backdrop: '',
      }
    : navStyle

  const getNavStyle = () => {
    const scrollY = window.scrollY || window.pageYOffset
    const threshold = 50
    if (scrollY > threshold) {
      return {
        bgColor: '#f1eceb',
        bgClass: 'bg-bg-base',
        text: 'text-text-main',
        backdrop: '',
      }
    }
    return {
      bgColor: 'transparent',
      bgClass: '',
      text: 'text-text-main',
      backdrop: 'backdrop-blur-[5px]',
    }
  }

  const syncHeaderHeight = () => {
    const h = Math.round(headerRef.current?.getBoundingClientRect().height || 88)
    setHeaderHeight(h > 0 ? h : 88)
    document.documentElement.style.setProperty('--site-header-height', `${h > 0 ? h : 88}px`)
  }

  useEffect(() => {
    const handleScroll = () => setNavStyle(getNavStyle())
    const handleViewport = () => {
      const width = window.innerWidth || 0
      setIsNarrow575(width < 575)
      setIsVeryNarrow475(width < 475)
    }
    syncHeaderHeight()
    handleViewport()
    handleScroll()
    let ticking = false
    const throttled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', throttled, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    window.addEventListener('resize', handleViewport, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttled)
      window.removeEventListener('resize', handleScroll)
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
      document.body.style.overflow = 'hidden'
      syncHeaderHeight()
    } else {
      document.body.style.overflow = ''
      setMobileAlpsOpen(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const linkDesk = `font-sans text-[12px] xl:text-[13px] uppercase tracking-[0.08em] ${activeNavStyle.text} no-underline transition-opacity hover:opacity-70 whitespace-nowrap`

  return (
    <>
      <header
        ref={headerRef}
        className={`header flex w-full items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-8 lg:gap-6 lg:px-[50px] lg:py-[26px] z-[70] transition-all duration-300 ${isVeryNarrow475 ? 'flex-wrap items-start' : ''} ${activeNavStyle.bgClass} ${activeNavStyle.backdrop || ''}`}
        style={{ backgroundColor: activeNavStyle.bgColor, zIndex: 100 }}
      >
        <div className={`flex min-w-0 flex-1 items-center gap-3 lg:flex-none ${isVeryNarrow475 ? 'w-full' : ''}`}>
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
            className={`logo font-serif text-[20px] tracking-[0.05em] sm:text-[22px] lg:text-[24px] ${activeNavStyle.text} flex-shrink-0 uppercase no-underline transition-opacity hover:opacity-70`}
            style={{ fontWeight: '300' }}
          >
            LA VACANZA BIANCA
          </a>
        </div>

        <nav
          className="hidden flex-1 items-center justify-center gap-5 xl:gap-8 lg:flex"
          aria-label="Main"
        >
          <a href="/italy/" className={linkDesk}>
            {t('navHub.italy')}
          </a>
          <div
            className="relative"
            onMouseEnter={() => setAlpsOpen(true)}
            onMouseLeave={() => setAlpsOpen(false)}
          >
            <button
              type="button"
              className={`${linkDesk} inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0`}
              style={{ fontWeight: 500 }}
              aria-expanded={alpsOpen}
              aria-haspopup="true"
            >
              {t('navHub.alps')}
              <span className="text-[10px]" aria-hidden>
                ▾
              </span>
            </button>
            {alpsOpen ? (
              <div className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-2">
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
          <a href="/#about-us" className={linkDesk} onClick={(e) => onInPageAnchorClick(e, '#about-us')}>
            {t('navHub.about')}
          </a>
          <a href="/#reviews" className={linkDesk} onClick={(e) => onInPageAnchorClick(e, '#reviews')}>
            {t('navHub.reviews')}
          </a>
        </nav>

        <div
          className={`flex flex-shrink-0 items-center gap-2 sm:gap-3 md:gap-4 ${isVeryNarrow475 ? 'w-full justify-start pl-[2.65rem] pt-2' : ''}`}
        >
          <a
            href={`tel:${PHONE_E164}`}
            className={`hidden font-sans text-[13px] md:inline ${activeNavStyle.text} no-underline transition-opacity hover:opacity-70`}
            style={{ fontWeight: 500 }}
          >
            {PHONE_DISPLAY}
          </a>
          <div className="hidden items-center md:flex" style={{ height: 24 }}>
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={handleContactClick}
            className={`header-btn inline-flex min-w-[156px] justify-center rounded-[50px] border border-text-main px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.08em] transition-all duration-300 hover:bg-text-main hover:text-white ${activeNavStyle.text} ${isVeryNarrow475 ? 'min-w-[210px] px-6 py-3 text-[12px]' : ''} lg:min-w-0 lg:px-7 lg:py-3 lg:text-[13px]`}
            style={{ fontWeight: 500 }}
          >
            {isVeryNarrow475 ? (
              <span>{t('navHub.pickTour')}</span>
            ) : isNarrow575 ? (
              <span className="text-center leading-[1.2]">
                {t('navHub.pickTourMobileLine1')}
                <br />
                {t('navHub.pickTourMobileLine2')}
              </span>
            ) : (
              <span>{t('navHub.pickTour')}</span>
            )}
          </button>
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
              href="/#about-us"
              className="border-b border-border-soft py-4 text-left font-sans text-sm uppercase tracking-[0.06em] text-text-main no-underline"
              style={{ fontWeight: 500 }}
              onClick={(e) => {
                onInPageAnchorClick(e, '#about-us')
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
