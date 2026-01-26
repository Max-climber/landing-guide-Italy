import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Navigation = () => {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [navStyle, setNavStyle] = useState({ 
    bgColor: 'transparent', 
    bgClass: '', 
    text: 'text-text-main', 
    backdrop: 'backdrop-blur-[5px]' 
  })
  const navRef = useRef(null)
  const headerRef = useRef(null)

  // navItems обновляется автоматически при смене языка через t()
  const navItems = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.programs'), href: '#programs' },
    { name: t('nav.resorts'), href: '#resorts' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  // Функция для определения стиля навигации - прозрачный в начале, бежевый при скролле
  const getNavStyle = () => {
    const scrollY = window.scrollY || window.pageYOffset
    const threshold = 50 // Порог скролла для изменения фона
    
    if (scrollY > threshold) {
      // При скролле - бежевый фон
      return { 
        bgColor: '#f1eceb', 
        bgClass: 'bg-bg-base', 
        text: 'text-text-main', 
        backdrop: '' 
      }
    } else {
      // В начале - прозрачный фон
      return { 
        bgColor: 'transparent', 
        bgClass: '', 
        text: 'text-text-main', 
        backdrop: 'backdrop-blur-[5px]' 
      }
    }
  }

  // Функция для открытия модального окна контактов
  const handleContactClick = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Закрываем мобильное меню если открыто
    if (isOpen) {
      setIsOpen(false)
    }
    
    // Отправляем событие для открытия модального окна
    // Небольшая задержка для закрытия меню перед открытием модалки
    setTimeout(() => {
      window.dispatchEvent(new Event('openContactModal'))
    }, isOpen ? 200 : 0)
  }

  // Функция для скролла к секции
  const scrollToSection = (href) => {
    // Сохраняем текущее состояние меню
    const wasOpen = isOpen
    
    // Закрываем мобильное меню если открыто
    if (wasOpen) {
      setIsOpen(false)
    }
    
    // Функция для выполнения скролла
    const performScroll = () => {
      let targetElement = null
      
      // Для секции about скроллим к блоку instructor внутри
      if (href === '#about') {
        targetElement = document.querySelector('#instructor')
      } else {
        targetElement = document.querySelector(href)
      }
      
      if (targetElement) {
        const headerHeight = headerRef.current?.offsetHeight || 100
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    
    // Используем requestAnimationFrame для выполнения скролла после закрытия меню
    if (wasOpen) {
      // Двойной requestAnimationFrame для гарантии, что DOM обновился
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          performScroll()
        })
      })
    } else {
      performScroll()
    }
  }

  // Отслеживание скролла для изменения стиля навигации
  useEffect(() => {
    const handleScroll = () => {
      const style = getNavStyle()
      setNavStyle(style)
    }

    // Устанавливаем начальный стиль
    handleScroll()

    // Используем throttling для оптимизации производительности
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Проверяем, что клик был вне мобильного меню
      const mobileMenu = document.querySelector('.mobile-menu-container')
      if (isOpen && mobileMenu && !mobileMenu.contains(event.target)) {
        // Проверяем, что клик не был на кнопку гамбургера
        const hamburgerButton = event.target.closest('button[aria-label="Toggle menu"]')
        if (!hamburgerButton) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      // Небольшая задержка, чтобы не закрывать меню сразу при открытии
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
      }, 100)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <header 
        ref={headerRef}
        className={`header relative flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-[50px] py-4 sm:py-6 lg:py-[30px] z-10 transition-all duration-300 ${navStyle.bgClass} ${navStyle.backdrop || ''}`}
        style={{
          backgroundColor: navStyle.bgColor,
        }}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Гамбургер-меню для мобильной и планшетной версии - слева */}
          <button
            className={`lg:hidden ${navStyle.text} relative z-50 flex-shrink-0`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <span 
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
          
          <div className={`logo font-serif text-[24px] tracking-[0.05em] ${navStyle.text} uppercase flex-shrink-0`} style={{ fontWeight: '300' }}>
            LA VACANZA BIANCA
          </div>
        </div>
        
        <nav className="nav-menu flex items-center gap-[30px]" ref={navRef}>
          {/* Desktop Navigation (только для больших экранов >= 1024px) */}
          <div className="hidden lg:flex items-center gap-[30px]">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`nav-link ${navStyle.text} text-sm uppercase tracking-[0.05em] no-underline transition-opacity duration-300 hover:opacity-70 whitespace-nowrap`}
                style={{ fontWeight: '500' }}
              >
                {item.name}
              </button>
            ))}
            <div className="ml-2 flex items-center" style={{ height: '24px' }}>
              <LanguageSwitcher />
            </div>
            <button
              onClick={handleContactClick}
              className={`header-btn px-7 py-3 border border-text-main rounded-[50px] no-underline ${navStyle.text} text-[13px] uppercase transition-all duration-300 hover:bg-text-main hover:text-white whitespace-nowrap`}
              style={{ fontWeight: '500' }}
            >
              {t('nav.connect')}
            </button>
          </div>

          {/* Mobile и Tablet: Always show Contact button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={handleContactClick}
              className={`header-btn px-4 py-2 border border-text-main rounded-[50px] no-underline ${navStyle.text} text-[11px] uppercase transition-all duration-300 hover:bg-text-main hover:text-white whitespace-nowrap flex-shrink-0`}
              style={{ fontWeight: '600' }}
            >
              {t('nav.connect')}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile и Tablet Menu - выезжает сверху */}
      <div 
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-transform duration-300 mobile-menu-container ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ paddingTop: headerRef.current?.offsetHeight || 100 }}
      >
        <div className="bg-bg-base border-b border-border-soft shadow-lg">
          <div className="flex flex-col px-4 pb-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  scrollToSection(item.href)
                }}
                className="text-left py-4 text-text-main text-sm uppercase tracking-[0.05em] hover:opacity-70 transition-opacity"
                style={{ fontWeight: '500' }}
              >
                {item.name}
              </button>
            ))}
            <div 
              className="pt-4 mt-2 border-t border-border-soft flex items-center justify-end" 
              style={{ zIndex: 10, position: 'relative' }}
            >
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleContactClick(e)
              }}
              className="mt-4 px-7 py-3 border border-text-main rounded-[50px] text-text-main text-[13px] uppercase transition-all duration-300 hover:bg-text-main hover:text-white text-center w-full"
              style={{ fontWeight: '600' }}
            >
              {t('nav.connect')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
