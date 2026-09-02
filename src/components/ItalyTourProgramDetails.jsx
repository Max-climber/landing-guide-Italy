import { useTranslation } from 'react-i18next'
import { absolutePublicUrl } from '../utils/absolutePublicUrl'

/**
 * Раскрывающийся блок программы тура для карточек на странице Италии.
 * @typedef {{ priceSummaryLine: string, programDays: Array, pdfHref: string, footerMode?: 'split'|'combined', starPriceNotice?: string, individualTourNotice?: string, combinedFooterNotice?: string, includedList: string, excludedList: string, bookingTerms: string }} TourProgramBundle
 */

const ACCORDION_NAME = 'tour-program-by-days'

const LegalFooter = ({ bundle }) => {
  const { t } = useTranslation()
  const {
    footerMode,
    starPriceNotice,
    individualTourNotice,
    combinedFooterNotice,
    includedList,
    excludedList,
    bookingTerms,
  } = bundle

  return (
    <div className="mt-6 space-y-6 border-t border-border-soft pt-4 text-[11px] leading-snug text-text-light">
      {footerMode === 'split' ? (
        <>
          {starPriceNotice ? (
            <p className="whitespace-pre-line text-text-light">{starPriceNotice}</p>
          ) : null}
          {individualTourNotice ? (
            <p className="whitespace-pre-line text-text-light">{individualTourNotice}</p>
          ) : null}
        </>
      ) : (
        <p className="whitespace-pre-line text-text-light">{combinedFooterNotice}</p>
      )}
      <div>
        <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-text-main">
          {t('italyTourPages.includedHeading')}
        </p>
        <p className="whitespace-pre-line">{includedList}</p>
      </div>
      <div>
        <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-text-main">
          {t('italyTourPages.excludedHeading')}
        </p>
        <p className="whitespace-pre-line">{excludedList}</p>
      </div>
      <div>
        <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-text-main">
          {t('italyTourPages.bookingHeading')}
        </p>
        <p className="whitespace-pre-line">{bookingTerms}</p>
      </div>
    </div>
  )
}

/** Невидимый twin закрытых «Программа»+PDF — чтобы карточки без них держали ту же высоту слота. */
export function TourCardProgramActionsPlaceholder() {
  const { t } = useTranslation()
  return (
    <div className="invisible pointer-events-none select-none" aria-hidden="true">
      <div className="mb-4 rounded-lg border border-border-soft bg-bg-base px-3 text-left">
        <div className="flex items-center py-3 font-sans text-[11px] uppercase tracking-[0.11em]">
          <svg className="mr-1.5 h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 4.25 L6 7.75 L9.5 4.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('italyTourPages.programHeading')}
        </div>
      </div>
      <div className="mb-4 block w-full rounded-[40px] border border-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em]">
        {t('italyTourPages.downloadPdf')}
      </div>
    </div>
  )
}

/**
 * @param {{ bundle: TourProgramBundle, onPdfClick?: Function, accordionName?: string, open?: boolean, onOpenChange?: (open: boolean) => void }} props
 * Controlled mode (open + onOpenChange): exclusivity и высота соседей — с родителя.
 * Uncontrolled: нативный exclusive accordion через name.
 */
const ItalyTourProgramDetails = ({
  bundle,
  onPdfClick,
  accordionName = ACCORDION_NAME,
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation()
  const { priceSummaryLine, programDays, pdfHref } = bundle
  const pdfAbsoluteHref = absolutePublicUrl(pdfHref)
  const isControlled = typeof open === 'boolean' && typeof onOpenChange === 'function'

  return (
    <>
      <details
        name={isControlled ? undefined : accordionName}
        open={isControlled ? open : undefined}
        className="group mb-4 rounded-lg border border-border-soft bg-bg-base px-3 text-left"
      >
        <summary
          className="flex cursor-pointer list-none select-none items-center py-3 font-sans text-[11px] uppercase tracking-[0.11em] text-text-main [&::-webkit-details-marker]:hidden"
          onClick={
            isControlled
              ? (event) => {
                  event.preventDefault()
                  onOpenChange(!open)
                }
              : undefined
          }
        >
          <svg
            className="mr-1.5 h-3 w-3 shrink-0 text-text-main transition-transform duration-200 group-open:rotate-180"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 4.25 L6 7.75 L9.5 4.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('italyTourPages.programHeading')}
        </summary>
        <div className="max-h-[min(70vh,560px)] overflow-y-auto border-t border-border-soft pb-3 pt-3">
          <p className="mb-4 whitespace-pre-line text-[11px] leading-snug text-text-main">{priceSummaryLine}</p>
          {programDays.map((item, index) => (
            <div
              key={item.day}
              className="mb-4 border-b border-border-soft pb-4 last:mb-0 last:border-b-0 last:pb-0"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.1em] text-[#888]">{item.day}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-soft text-[10px] text-text-main">
                  {index + 1}
                </span>
              </div>
              {item.title ? (
                <p className="mb-2 font-sans text-[13px] font-medium text-text-main">{item.title}</p>
              ) : null}
              <p className="whitespace-pre-line text-xs leading-snug text-text-light">{item.cardText ?? item.text}</p>
              {item.note ? (
                <p className="mt-2 whitespace-pre-line rounded-md bg-bg-warm px-2 py-2 text-[11px] leading-snug text-text-main">
                  {item.note}
                </p>
              ) : null}
            </div>
          ))}
          <LegalFooter bundle={bundle} />
        </div>
      </details>
      <a
        href={pdfAbsoluteHref}
        download
        target="_blank"
        rel="noopener noreferrer"
        onClick={onPdfClick}
        className="mb-4 block w-full rounded-[40px] border border-text-main px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.11em] text-text-main transition-all duration-300 hover:bg-bg-warm"
      >
        {t('italyTourPages.downloadPdf')}
      </a>
    </>
  )
}

export default ItalyTourProgramDetails
