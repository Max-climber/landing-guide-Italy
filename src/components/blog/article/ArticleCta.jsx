const ArticleCta = ({ title, titleLevel = 'p', text, buttonText, href, action }) => {
  const isContact = action === 'contact-modal'
  const isCompact = !title && !text
  const TitleTag = titleLevel === 'h2' ? 'h2' : 'p'

  const handleClick = (e) => {
    if (!isContact) return
    e.preventDefault()
    window.dispatchEvent(new Event('openContactModal'))
  }

  const button = (
    <a
      href={href || '#'}
      onClick={handleClick}
      className="main-btn inline-flex w-full justify-center rounded-[50px] border border-text-main bg-text-main px-6 py-3.5 font-sans text-[12px] uppercase tracking-[0.12em] text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90 sm:w-auto"
      style={{ fontWeight: 500 }}
    >
      {buttonText}
    </a>
  )

  if (isCompact) {
    return <div className="article-cta my-8">{button}</div>
  }

  return (
    <aside className="article-cta my-8 rounded-xl border border-border-soft bg-bg-card px-5 py-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:px-8 sm:py-7">
      {title ? (
        <TitleTag
          className={
            titleLevel === 'h2'
              ? 'section-title !mb-4 !mt-0 !text-left !text-[clamp(26px,3.5vw,34px)]'
              : 'mb-3 font-serif text-[20px] leading-snug text-text-main sm:text-[24px]'
          }
          style={titleLevel === 'h2' ? undefined : { fontWeight: 500 }}
        >
          {title}
        </TitleTag>
      ) : null}
      {text ? <p className="mb-5 font-sans text-sm leading-7 text-text-light sm:text-base">{text}</p> : null}
      {button}
    </aside>
  )
}

export default ArticleCta
