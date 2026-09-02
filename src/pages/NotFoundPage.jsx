import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import { upsertMeta } from './seo/pageMeta'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    upsertMeta({
      title: t('notFound.metaTitle'),
      description: t('notFound.metaDescription'),
      robots: 'noindex, nofollow',
    })
  }, [t])

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="mb-3 text-sm uppercase tracking-[0.14em] text-text-light">404</p>
        <h1 className="section-title !mb-4">{t('notFound.heading')}</h1>
        <p className="mb-8 text-sm leading-7 text-text-light">{t('notFound.description')}</p>
        <a href="/" className="btn-primary inline-flex">
          {t('notFound.homeLink')}
        </a>
      </main>
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TelegramFloatButton />
    </div>
  )
}

export default NotFoundPage
