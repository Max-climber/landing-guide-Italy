/**
 * variant="overlay" — поверх hero (Италия, Альпы, заглушки с фоном).
 * variant="inline" — в потоке документа под фиксированной шапкой (страницы программ без hero),
 * чтобы крошки не наезжали на h1 на узкой сетке.
 * tone="onDark" — светлый текст поверх затемнённого hero.
 * На мобилке: только «← Главная»; на sm+ — полная цепочка.
 */
const BreadcrumbOverlay = ({
  homeLabel,
  homeHref = '/',
  currentLabel,
  ariaLabel = 'Breadcrumb',
  variant = 'overlay',
  tone = 'default',
}) => {
  const isInline = variant === 'inline'
  const isOnDark = !isInline && tone === 'onDark'

  const navClass = isInline
    ? 'relative z-[25] w-full border-b border-border-soft/70 bg-bg-base/98 backdrop-blur-[6px]'
    : 'pointer-events-none absolute inset-x-0 top-0 z-[25] bg-transparent'

  const innerClass = isInline
    ? 'mx-auto w-full max-w-[1200px] px-4 pb-5 text-left sm:px-6 sm:pb-6 md:px-8 lg:px-5'
    : 'mx-auto w-full max-w-[1200px] px-4 pb-2 text-left sm:px-6 md:px-8 lg:px-[50px]'

  const linkClass = isInline
    ? 'underline-offset-[3px] transition-colors hover:text-text-main hover:underline'
    : isOnDark
      ? 'text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline'
      : 'underline-offset-4 transition-colors hover:text-text-main hover:underline'

  const listBase = isInline
    ? 'pointer-events-auto flex flex-wrap items-center justify-start gap-x-2 gap-y-2.5 font-sans text-[13px] leading-relaxed tracking-[0.01em] text-text-light'
    : isOnDark
      ? 'pointer-events-auto flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-sans text-[13px] leading-snug tracking-[0.01em] text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]'
      : 'pointer-events-auto flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-sans text-[13px] leading-snug tracking-[0.01em] text-[#4a4a4a] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]'

  const sepClass = isInline
    ? 'select-none px-0.5 text-border-soft'
    : isOnDark
      ? 'select-none text-white/50'
      : 'select-none text-[#7a7a7a]'

  const currentClass = isOnDark
    ? 'min-w-0 font-medium leading-snug text-white'
    : 'min-w-0 font-medium leading-snug text-text-main'

  return (
    <nav
      aria-label={ariaLabel}
      className={navClass}
      style={{
        paddingTop: isInline
          ? 'calc(var(--site-header-height, 88px) + 12px)'
          : 'calc(var(--site-header-height, 88px) + 10px)',
      }}
    >
      <div className={innerClass}>
        <ol className={`${listBase} sm:hidden`}>
          <li>
            <a href={homeHref} className={linkClass}>
              ← {homeLabel}
            </a>
          </li>
        </ol>
        <ol className={`${listBase} hidden sm:flex`}>
          <li>
            <a href={homeHref} className={linkClass}>
              {homeLabel}
            </a>
          </li>
          <li className={sepClass} aria-hidden="true">
            &gt;
          </li>
          <li className={currentClass} aria-current="page">
            {currentLabel}
          </li>
        </ol>
      </div>
    </nav>
  )
}

export default BreadcrumbOverlay
