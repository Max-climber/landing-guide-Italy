/**
 * Многоуровневые хлебные крошки (последний элемент не кликабельный).
 * @param {{ label: string, href?: string }[]} items
 * @param {{ label: string, href: string }} [mobileBackLink] — на мобилке «← Швейцария» вместо полной цепочки
 * @param {'inline'|'overlay'} [variant]
 * @param {'default'|'onDark'} [tone] — светлый текст поверх hero
 */
const BreadcrumbTrail = ({
  items,
  ariaLabel = 'Breadcrumb',
  variant = 'inline',
  tone = 'default',
  mobileBackLink,
}) => {
  if (!items?.length) return null
  const isInline = variant === 'inline'
  const isOnDark = !isInline && tone === 'onDark'

  const trailClasses = isInline
    ? 'pointer-events-auto flex flex-wrap items-center justify-start gap-x-2 gap-y-2.5 font-sans text-[13px] leading-relaxed tracking-[0.01em] text-text-light sm:gap-y-2'
    : isOnDark
      ? 'pointer-events-auto flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-sans text-[13px] leading-snug tracking-[0.01em] text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]'
      : 'pointer-events-auto flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-sans text-[13px] leading-snug tracking-[0.01em] text-[#4a4a4a] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]'

  const linkClass = isInline
    ? 'underline-offset-[3px] transition-colors hover:text-text-main hover:underline'
    : isOnDark
      ? 'text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline'
      : 'underline-offset-4 transition-colors hover:text-text-main hover:underline'

  const sepClass = isInline
    ? 'select-none px-0.5 text-border-soft'
    : isOnDark
      ? 'select-none text-white/50'
      : 'select-none text-[#7a7a7a]'

  const currentClass = isOnDark
    ? 'min-w-0 font-medium leading-snug text-white'
    : 'min-w-0 font-medium leading-snug text-text-main'

  const mobileLinkClass = isOnDark
    ? 'pointer-events-auto inline-flex items-center font-sans text-[13px] text-white/85 transition-colors hover:text-white sm:hidden'
    : 'pointer-events-auto inline-flex items-center font-sans text-[13px] text-text-light transition-colors hover:text-text-main sm:hidden'

  const renderTrail = () => (
    <ol className={trailClasses}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <li key={`${item.label}-${index}`} className="flex min-w-0 flex-wrap items-center gap-x-2">
            {index > 0 ? (
              <span className={sepClass} aria-hidden="true">
                &gt;
              </span>
            ) : null}
            {isLast || !item.href ? (
              <span className={currentClass} aria-current="page">
                {item.label}
              </span>
            ) : (
              <a href={item.href} className={linkClass}>
                {item.label}
              </a>
            )}
          </li>
        )
      })}
    </ol>
  )

  return (
    <nav
      aria-label={ariaLabel}
      className={
        isInline
          ? 'relative z-[25] w-full border-b border-border-soft/70 bg-bg-base/98 backdrop-blur-[6px]'
          : 'pointer-events-none absolute inset-x-0 top-0 z-[25] bg-transparent'
      }
      style={{
        paddingTop: isInline
          ? 'calc(var(--site-header-height, 88px) + 12px)'
          : 'calc(var(--site-header-height, 88px) + 10px)',
      }}
    >
      <div
        className={
          isInline
            ? 'mx-auto w-full max-w-[1200px] px-4 pb-5 text-left sm:px-6 sm:pb-6 md:px-8 lg:px-5'
            : 'mx-auto w-full max-w-[1200px] px-4 pb-2 text-left sm:px-6 md:px-8 lg:px-[50px]'
        }
      >
        {mobileBackLink ? (
          <>
            <a href={mobileBackLink.href} className={mobileLinkClass}>
              ← {mobileBackLink.label}
            </a>
            <div className="hidden sm:block">{renderTrail()}</div>
          </>
        ) : (
          renderTrail()
        )}
      </div>
    </nav>
  )
}

export default BreadcrumbTrail
