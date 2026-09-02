import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContactModal from '../components/ContactModal'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'

/**
 * @param {{ pageKey: 'france', canonical: string, backgroundImage: string }} props
 */
const UnderDevelopmentPage = ({ pageKey, canonical, backgroundImage }) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pageTitle = t(`underDevelopment.pages.${pageKey}.title`)
  const description = t(`underDevelopment.pages.${pageKey}.description`)

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      url: canonical,
      description,
    }),
    [canonical, description, pageTitle],
  )

  useEffect(() => {
    upsertMeta({
      title: `${pageTitle}${t('underDevelopment.metaTitleSuffix')}`,
      description,
      canonical,
      ogImage: `https://vacanzabianca.ru${backgroundImage}`,
      robots: 'noindex, follow',
    })
    const unmount = mountJsonLd(`under-dev-${pageKey}`, jsonLd)
    return () => unmount()
  }, [backgroundImage, canonical, description, jsonLd, pageKey, pageTitle, t])

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-base">
      <img src={backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />

      <a
        href="/"
        className="absolute left-4 top-4 z-20 inline-flex rounded-[40px] border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85 sm:left-6 sm:top-6"
      >
        {t('underDevelopment.homeLink')}
      </a>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-[760px]">
          <h1 className="font-serif text-[clamp(30px,4vw,52px)] leading-[1.1] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            {t('underDevelopment.heading')}
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[clamp(16px,2vw,22px)] leading-[1.4] text-white/95">
            {t('underDevelopment.subheading')}
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[50px] border border-text-main bg-text-main px-6 py-3 font-sans text-[12px] uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90 sm:px-7 sm:py-3 sm:text-[14px]"
            style={{ fontWeight: 600 }}
          >
            {t('underDevelopment.cta')}
          </button>
        </div>
      </main>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default UnderDevelopmentPage
