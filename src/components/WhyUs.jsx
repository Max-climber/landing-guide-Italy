import { useTranslation } from 'react-i18next'

const WhyUs = () => {
  const { t } = useTranslation()

  return (
    <section
      id="whyUs"
      className="section-padding bg-white"
    >
      <div className="container-max">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-bold mb-6 sm:mb-8 text-center text-color3">
          {t('about.whyUs')}
        </h3>
        
        
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-color3 text-justify">
            {t('about.whyUsText1')}
          </p>
          
          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-color3 text-justify">
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item1')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item2')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item3')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item4')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item5')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item6')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item7')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>{t('about.whyUsList.item8')}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyUs

