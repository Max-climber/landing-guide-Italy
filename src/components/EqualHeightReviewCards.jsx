import { useCallback, useLayoutEffect, useRef, useState } from 'react'

/**
 * Ряд/карусель отзывов с фиксированной высотой закрытых карточек.
 * При раскрытии одной остальные сохраняют ту же высоту между собой.
 */
export default function EqualHeightReviewCards({
  items,
  expandedKey,
  onToggle,
  readMoreLabel,
  collapseLabel,
  renderAvatar,
  showQuoteMark = false,
  className = '',
}) {
  const cardRefs = useRef(new Map())
  const [closedHeight, setClosedHeight] = useState(null)

  const setCardRef = useCallback((key, node) => {
    if (node) cardRefs.current.set(key, node)
    else cardRefs.current.delete(key)
  }, [])

  const measureClosedHeight = useCallback(() => {
    let max = 0
    cardRefs.current.forEach((el) => {
      if (!el) return
      const prevHeight = el.style.height
      const prevMin = el.style.minHeight
      el.style.height = 'auto'
      el.style.minHeight = '0'
      max = Math.max(max, el.getBoundingClientRect().height)
      el.style.height = prevHeight
      el.style.minHeight = prevMin
    })
    if (max > 0) setClosedHeight(Math.ceil(max))
  }, [])

  useLayoutEffect(() => {
    if (expandedKey) return undefined

    const frame = requestAnimationFrame(() => {
      measureClosedHeight()
    })

    const onResize = () => {
      setClosedHeight(null)
      requestAnimationFrame(measureClosedHeight)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [expandedKey, items, measureClosedHeight])

  return (
    <div
      className={`-mx-4 flex items-start gap-5 overflow-x-auto px-4 pb-3 pt-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:snap-none lg:grid-cols-4 ${className}`}
    >
      {items.map((item) => {
        const isExpanded = expandedKey === item.key
        const quoteText = item.needsExpand && !isExpanded ? item.preview : item.full
        const lockHeight = !isExpanded && closedHeight ? closedHeight : undefined

        return (
          <article
            key={item.key}
            ref={(node) => setCardRef(item.key, node)}
            style={lockHeight ? { height: lockHeight, minHeight: lockHeight } : undefined}
            className="flex w-[min(100%,340px)] flex-shrink-0 snap-center flex-col rounded-xl border border-border-soft bg-bg-card p-5 shadow-[0_8px_22px_rgba(0,0,0,0.03)] sm:p-6 md:w-auto md:min-w-0 md:snap-none"
          >
            {showQuoteMark ? (
              <div className="mb-2 font-serif text-3xl leading-none text-text-main/25" aria-hidden>
                ”
              </div>
            ) : null}
            <blockquote
              className={`mb-0 flex-1 text-sm leading-7 text-text-light ${isExpanded ? 'whitespace-pre-line' : ''}`}
            >
              {quoteText}
            </blockquote>
            {item.needsExpand ? (
              <button
                type="button"
                onClick={() => {
                  if (!isExpanded) measureClosedHeight()
                  onToggle(isExpanded ? null : item.key)
                }}
                className="mt-3 min-h-[44px] self-start rounded-lg bg-[#e6e3df] px-3.5 py-2 font-sans text-xs tracking-wide text-text-main/75 transition-colors hover:bg-[#dcd8d3] hover:text-text-main"
                aria-expanded={isExpanded}
              >
                {isExpanded ? collapseLabel : readMoreLabel}
              </button>
            ) : (
              <span className="mt-3 block min-h-[44px]" aria-hidden="true" />
            )}
            <div className="mt-4 flex shrink-0 items-center gap-3">
              {renderAvatar(item)}
              <span className="font-serif text-base text-text-main" style={{ fontWeight: 400 }}>
                {item.title}
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
