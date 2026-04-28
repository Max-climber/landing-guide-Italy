import { useTranslation } from 'react-i18next'

const WhyUsSection = () => {
  const { t } = useTranslation()

  return (
    <section
      id="why-us"
      className="bg-bg-base py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
        <h2 className="section-title !mb-0 text-center">
          {t('about.title').replace('\n', ' ')}
        </h2>
      </div>
    </section>
  )
}

export default WhyUsSection
