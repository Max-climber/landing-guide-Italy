import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ItalyTourProgramDetails, {
  TourCardProgramActionsPlaceholder,
} from './ItalyTourProgramDetails'

export { TourCardProgramActionsPlaceholder }

/**
 * Сетка карточек туров: в закрытом состоянии — равная высота.
 * Внутри: title → route (flex-1, запас НАД meta) → dl meta → program/spacer → CTA.
 * При раскрытии программы растёт только эта карточка; соседи зафиксированы
 * на измеренной закрытой высоте (как EqualHeightReviewCards).
 */

const EqualHeightTourCardsContext = createContext(null)

export function EqualHeightTourCardGrid({ className = '', measureKey, children }) {
  const cardRefs = useRef(new Map())
  const closedHeightRef = useRef(null)
  const [closedHeight, setClosedHeight] = useState(null)
  const [expandedKey, setExpandedKey] = useState(null)

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
    if (max > 0) {
      const next = Math.ceil(max)
      closedHeightRef.current = next
      setClosedHeight(next)
    }
  }, [])

  useLayoutEffect(() => {
    if (expandedKey) return undefined

    const frame = requestAnimationFrame(() => {
      measureClosedHeight()
    })

    const onResize = () => {
      closedHeightRef.current = null
      setClosedHeight(null)
      requestAnimationFrame(measureClosedHeight)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [expandedKey, measureKey, measureClosedHeight])

  const openProgram = useCallback(
    (key) => {
      // Уже замеренную закрытую высоту не пересчитываем — иначе соседи «прыгают»
      if (closedHeightRef.current == null) measureClosedHeight()
      setExpandedKey(key)
    },
    [measureClosedHeight],
  )

  const closeProgram = useCallback((key) => {
    setExpandedKey((prev) => (prev === key ? null : prev))
  }, [])

  const value = useMemo(
    () => ({
      expandedKey,
      closedHeight,
      setCardRef,
      openProgram,
      closeProgram,
    }),
    [expandedKey, closedHeight, setCardRef, openProgram, closeProgram],
  )

  return (
    <EqualHeightTourCardsContext.Provider value={value}>
      <div className={`grid items-start gap-6 ${className}`}>{children}</div>
    </EqualHeightTourCardsContext.Provider>
  )
}

export function EqualHeightTourCard({ cardKey, className = '', id, children }) {
  const ctx = useContext(EqualHeightTourCardsContext)
  if (!ctx) {
    throw new Error('EqualHeightTourCard must be used inside EqualHeightTourCardGrid')
  }

  const isExpanded = ctx.expandedKey === cardKey
  const lockHeight = !isExpanded && ctx.closedHeight ? ctx.closedHeight : undefined

  return (
    <article
      id={id}
      ref={(node) => ctx.setCardRef(cardKey, node)}
      style={lockHeight ? { height: lockHeight, minHeight: lockHeight } : undefined}
      className={className}
    >
      {children}
    </article>
  )
}

/** Контроль «Программа по дням» внутри EqualHeightTourCardGrid. */
export function useTourProgramAccordion(cardKey) {
  const ctx = useContext(EqualHeightTourCardsContext)
  if (!ctx) {
    throw new Error('useTourProgramAccordion must be used inside EqualHeightTourCardGrid')
  }

  return {
    isOpen: ctx.expandedKey === cardKey,
    onOpenChange: (nextOpen) => {
      if (nextOpen) ctx.openProgram(cardKey)
      else ctx.closeProgram(cardKey)
    },
  }
}

/** ItalyTourProgramDetails, связанный с блокировкой высоты соседних карточек. */
export function TourCardProgramDetails({ cardKey, ...rest }) {
  const { isOpen, onOpenChange } = useTourProgramAccordion(cardKey)
  return <ItalyTourProgramDetails {...rest} open={isOpen} onOpenChange={onOpenChange} />
}
