const BreadcrumbOverlay = ({
  homeLabel,
  homeHref = '/',
  currentLabel,
  ariaLabel = 'Breadcrumb',
}) => {
  return (
    <nav
      aria-label={ariaLabel}
      className="pointer-events-none absolute inset-x-0 top-0 z-[25] bg-transparent"
      style={{ paddingTop: 'calc(var(--site-header-height, 88px) + 10px)' }}
    >
      <div className="w-full pb-2 pl-[calc(1rem+1.5rem+1rem)] pr-4 sm:pl-[calc(1.5rem+1.5rem+1rem)] sm:pr-6 md:pl-[calc(2rem+1.5rem+1rem)] md:pr-8 lg:pl-[50px] lg:pr-[50px]">
        <ol className="pointer-events-auto flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[13px] leading-snug tracking-[0.01em] text-[#4a4a4a] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
          <li>
            <a href={homeHref} className="underline-offset-4 transition-colors hover:text-text-main hover:underline">
              {homeLabel}
            </a>
          </li>
          <li className="select-none text-[#7a7a7a]" aria-hidden="true">
            &gt;
          </li>
          <li className="font-medium text-text-main" aria-current="page">
            {currentLabel}
          </li>
        </ol>
      </div>
    </nav>
  )
}

export default BreadcrumbOverlay
