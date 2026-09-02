import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbTrail from '../components/blog/BreadcrumbTrail'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'
import { absolutePublicUrl } from '../utils/absolutePublicUrl'
import { BREADCRUMB_PARENT, getBreadcrumbParent } from '../utils/breadcrumbContext'

const ItalyTourStandalonePage = ({ config }) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parentHub, setParentHub] = useState(BREADCRUMB_PARENT.italy)

  useEffect(() => {
    setParentHub(getBreadcrumbParent(BREADCRUMB_PARENT.italy))
  }, [])

  const pageSubtitle = config.priceSummaryLine.replace(/^«[^»]+»\.\s*/, '')
  const pdfAbsoluteHref = absolutePublicUrl(config.pdfHref)

  const isFromSwitzerland = parentHub === BREADCRUMB_PARENT.switzerland
  const parentLabel = isFromSwitzerland
    ? t('italyTourPages.breadcrumbSwitzerland')
    : t('italyTourPages.breadcrumbItaly')
  const parentHref = isFromSwitzerland ? '/switzerland/' : '/italy/'
  const parentSchemaName = isFromSwitzerland
    ? t('italyTourPages.schemaSwitzerland')
    : t('italyTourPages.schemaItaly')
  const parentSchemaUrl = isFromSwitzerland
    ? 'https://vacanzabianca.ru/switzerland/'
    : 'https://vacanzabianca.ru/italy/'

  const breadcrumbItems = useMemo(
    () => [
      { label: t('italyTourPages.schemaHome'), href: '/' },
      { label: parentLabel, href: parentHref },
      { label: config.breadcrumbLabel },
    ],
    [config.breadcrumbLabel, parentHref, parentLabel, t],
  )

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
          { '@type': 'ListItem', position: 2, name: parentSchemaName, item: parentSchemaUrl },
          { '@type': 'ListItem', position: 3, name: config.breadcrumbLabel, item: config.canonical },
        ],
      },
    ],
    [config.breadcrumbLabel, config.canonical, parentSchemaName, parentSchemaUrl, t],
  )

  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')
        ? window.location.origin
        : 'https://vacanzabianca.ru'
    upsertMeta({
      title: config.metaTitle,
      description: config.metaDescription,
      canonical: config.canonical,
      ogImage: `${origin}${config.heroImage}`,
    })
    const unmount = mountJsonLd(config.jsonLdKey, jsonLd)
    return () => unmount()
  }, [config.metaTitle, config.metaDescription, config.canonical, config.heroImage, config.jsonLdKey, jsonLd])

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <BreadcrumbTrail
        variant="inline"
        ariaLabel={t('italyTourPages.breadcrumbAria')}
        items={breadcrumbItems}
        mobileBackLink={{ label: parentLabel, href: parentHref }}
      />
      <main className="pb-12 pt-8 sm:pt-10 md:pt-12">
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="w-full flex-1 text-center sm:text-left">
              <h1 className="section-title !mb-4 whitespace-pre-line text-center sm:!text-left">{config.h1}</h1>
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
            {config.programDays.map((item, index) => {
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

          <p className="mt-12 whitespace-pre-line text-sm leading-7 text-text-light">{config.postTableNotice}</p>

          <div className="mt-10 space-y-10 text-sm leading-7 text-text-light">
            <div>
              <h3 className="mb-3 font-sans text-base font-medium text-text-main">{t('italyTourPages.includedHeading')}</h3>
              <p className="whitespace-pre-line">{config.includedList}</p>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-base font-medium text-text-main">{t('italyTourPages.excludedHeading')}</h3>
              <p className="whitespace-pre-line">{config.excludedList}</p>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-base font-medium text-text-main">{t('italyTourPages.bookingHeading')}</h3>
              <p className="whitespace-pre-line">{config.bookingTerms}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="rounded-2xl border border-border-soft bg-bg-card px-6 py-10 text-center md:px-10 md:py-14">
            <h2 className="section-title !mb-10">{config.ctaHeading}</h2>
            <p className="mx-auto mb-8 max-w-[760px] text-sm leading-7 text-text-light">{config.ctaDescription}</p>
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

export default ItalyTourStandalonePage
