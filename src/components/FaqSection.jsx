import { useState } from 'react'

/**
 * FAQ: h3 для вопросов (SEO), ответы всегда в DOM (для роботов),
 * визуально — аккордеон; клик по всей строке вопроса или по «+/−».
 */
const FaqSection = ({ id = 'faq', heading, items, className = '' }) => {
  const [openedIndex, setOpenedIndex] = useState(-1)

  if (!items?.length) return null

  const toggle = (index) => setOpenedIndex((prev) => (prev === index ? -1 : index))

  return (
    <section id={id} className={`scroll-mt-28 ${className}`.trim()}>
      <h2 className="section-title !mb-10 text-center">{heading}</h2>
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openedIndex === index
          const answerId = `faq-answer-${id}-${index}`

          return (
            <article
              key={`faq-${index}`}
              className="faq-item overflow-hidden rounded-xl border border-border-soft bg-bg-card"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggle(index)}
              >
                <h3 className="m-0 flex-1 font-sans text-[15px] font-medium text-text-main sm:text-base">
                  {item.question}
                </h3>
                <span className="shrink-0 text-xl leading-none text-text-main" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={answerId}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className="faq-answer border-t border-border-soft px-5 py-4 text-sm leading-7 text-text-light sm:px-6 sm:py-5 [&_a]:text-text-main [&_a]:underline [&_p+p]:mt-3 [&_strong]:font-medium [&_strong]:text-text-main [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default FaqSection
