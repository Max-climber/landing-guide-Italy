import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbOverlay from '../components/BreadcrumbOverlay'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'
import {
  COMO_VENICE_BOOKING_TERMS,
  COMO_VENICE_EXCLUDED_LIST,
  COMO_VENICE_INCLUDED_LIST,
  COMO_VENICE_PDF_HREF,
  COMO_VENICE_POST_TABLE_NOTICE,
  COMO_VENICE_PRICE_SUMMARY_LINE,
  COMO_VENICE_PROGRAM_DAYS,
} from '../data/comoVeniceProgram'
import {
  COMO_VENICE_BOOKING_TERMS_EN,
  COMO_VENICE_EXCLUDED_LIST_EN,
  COMO_VENICE_INCLUDED_LIST_EN,
  COMO_VENICE_PDF_HREF_EN,
  COMO_VENICE_POST_TABLE_NOTICE_EN,
  COMO_VENICE_PRICE_SUMMARY_LINE_EN,
  COMO_VENICE_PROGRAM_DAYS_EN,
} from '../data/comoVeniceProgram.en'
import { absolutePublicUrl } from '../utils/absolutePublicUrl'
import { isEnglishLocale } from '../utils/isEnglishLocale'

const CANONICAL = 'https://vacanzabianca.ru/italy/tury-como-venezia/'

const heroImage = '/images/Italy-page/tours/tours-from-Como-to-Venezia.webp'

const ItalyComoVenicePage = () => {
  const { t, i18n } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const en = isEnglishLocale(i18n.language)

  const pdfAbsoluteHref = useMemo(
    () => absolutePublicUrl(en ? COMO_VENICE_PDF_HREF_EN : COMO_VENICE_PDF_HREF),
    [en],
  )

  const priceSummaryLine = en ? COMO_VENICE_PRICE_SUMMARY_LINE_EN : COMO_VENICE_PRICE_SUMMARY_LINE
  const programDays = en ? COMO_VENICE_PROGRAM_DAYS_EN : COMO_VENICE_PROGRAM_DAYS
  const postTableNotice = en ? COMO_VENICE_POST_TABLE_NOTICE_EN : COMO_VENICE_POST_TABLE_NOTICE
  const includedList = en ? COMO_VENICE_INCLUDED_LIST_EN : COMO_VENICE_INCLUDED_LIST
  const excludedList = en ? COMO_VENICE_EXCLUDED_LIST_EN : COMO_VENICE_EXCLUDED_LIST
  const bookingTerms = en ? COMO_VENICE_BOOKING_TERMS_EN : COMO_VENICE_BOOKING_TERMS

  const pageSubtitle = priceSummaryLine.replace(/^«[^»]+»\.\s*/, '')

  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vacanza Bianca',
        url: 'https://vacanzabianca.ru/',
        logo: 'https://vacanzabianca.ru/images/icons/favicon.png',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('italyTourPages.schemaHome'), item: 'https://vacanzabianca.ru/' },
          { '@type': 'ListItem', position: 2, name: t('italyTourPages.schemaItaly'), item: 'https://vacanzabianca.ru/italy/' },
          {
            '@type': 'ListItem',
            position: 3,
            name: t('italyTourPages.comoVenice.breadcrumbCurrent'),
            item: CANONICAL,
          },
        ],
      },
    ],
    [t],
  )

  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')
        ? window.location.origin
        : 'https://vacanzabianca.ru'
    upsertMeta({
      title: t('italyTourPages.comoVenice.metaTitle'),
      description: t('italyTourPages.comoVenice.metaDescription'),
      canonical: CANONICAL,
      ogImage: `${origin}${heroImage}`,
    })
    const unmount = mountJsonLd('italy-como-venice-jsonld', jsonLd)
    return () => unmount()
  }, [jsonLd, t])

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <BreadcrumbOverlay
        variant="inline"
        homeLabel={t('italyTourPages.breadcrumbItaly')}
        homeHref="/italy/"
        currentLabel={t('italyTourPages.comoVenice.breadcrumbCurrent')}
        ariaLabel={t('italyTourPages.breadcrumbAria')}
      />
      <main className="pb-12 pt-8 sm:pt-10 md:pt-12">
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="w-full flex-1 text-center sm:text-left">
              <h1 className="section-title !mb-4 text-center sm:!text-left">{t('italyTourPages.comoVenice.h1')}</h1>
              <p className="mx-auto max-w-[760px] font-sans text-sm leading-7 text-text-light sm:mx-0 sm:text-base">
                {pageSubtitle}
              </p>
            </div>
            <a
              href={pdfAbsoluteHref}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-[50px] border border-text-main bg-bg-base px-6 py-3 text-center text-[12px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-warm"
            >
              {t('italyTourPages.downloadPdf')}
            </a>
          </div>
          <h2 className="section-title !mb-10 text-center">{t('italyTourPages.programHeading')}</h2>
          <div className="space-y-4">
            {programDays.map((item, index) => {
              const body = item.cardText ?? item.text
              return (
                <article key={item.day} className="rounded-xl border border-border-soft bg-bg-card p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#777]">{item.day}</p>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-bg-base text-xs uppercase tracking-[0.12em] text-text-main">
                      {index + 1}
                    </div>
                  </div>
                  {item.title?.trim() ? (
                    <h3 className="mb-3 font-sans text-base font-medium text-text-main" style={{ fontWeight: 500 }}>
                      {item.title}
                    </h3>
                  ) : null}
                  {body ? (
                    <p className="whitespace-pre-line text-sm leading-snug text-text-light">{body}</p>
                  ) : null}
                  {item.note ? (
                    <p className="mt-4 rounded-lg bg-bg-warm p-4 text-sm leading-snug text-text-main whitespace-pre-line">
                      {item.note}
                    </p>
                  ) : null}
                </article>
              )
            })}
          </div>

          <p className="mt-12 whitespace-pre-line text-sm leading-7 text-text-light">{postTableNotice}</p>

          <div className="mt-10 space-y-10 text-sm leading-7 text-text-light">
            <div>
              <h3 className="mb-3 font-sans text-base font-medium text-text-main">{t('italyTourPages.includedHeading')}</h3>
              <p className="whitespace-pre-line">{includedList}</p>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-base font-medium text-text-main">{t('italyTourPages.excludedHeading')}</h3>
              <p className="whitespace-pre-line">{excludedList}</p>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-base font-medium text-text-main">{t('italyTourPages.bookingHeading')}</h3>
              <p className="whitespace-pre-line">{bookingTerms}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="rounded-2xl border border-border-soft bg-bg-card px-6 py-10 text-center md:px-10 md:py-14">
            <h2 className="section-title !mb-10">{t('italyTourPages.comoVenice.ctaTitle')}</h2>
            <p className="mx-auto mb-8 max-w-[760px] text-sm leading-7 text-text-light">{t('italyTourPages.comoVenice.ctaBody')}</p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-[50px] border border-text-main bg-text-main px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90"
            >
              {t('italyTourPages.ctaButton')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default ItalyComoVenicePage
