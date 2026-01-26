import { useTranslation } from 'react-i18next'

const Individual = () => {
  const { t } = useTranslation()

  return (
    <section id="individual" className="section-block individual bg-bg-base py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-5 text-center">
      <div className="individual-container max-w-[700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-5">
        <h2 className="section-header-title font-serif text-[42px] text-text-main mb-5 tracking-[0.02em]" style={{ fontWeight: '300' }}>
          {t('individual.title')}
        </h2>
        <p className="individual-text font-sans text-xl leading-[1.6] text-text-main mb-6" style={{ fontWeight: '400' }}>
          {t('individual.text').split('<br/>').map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
        <p className="individual-note font-sans text-[15px] text-text-light" style={{ fontWeight: '400' }}>
          {t('individual.note')}
        </p>
      </div>
    </section>
  )
}

export default Individual
