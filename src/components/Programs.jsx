import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Programs = () => {
  const { t } = useTranslation()
  const [activeProgram, setActiveProgram] = useState(0)

  const programs = [
    {
      id: 1,
      title: t('programs.experienced.title'),
      subtitle: t('programs.experienced.subtitle'),
      description: t('programs.experienced.description'),
      features: [
        t('programs.experienced.features.consultation'),
        t('programs.experienced.features.airportPickup'),
        t('programs.experienced.features.airportDropoff'),
      ],
      pricing: {
        transfer: [
          {
            time: t('programs.experienced.pricing.workingDays'),
            price: t('programs.experienced.pricing.price1'),
          },
          {
            time: t('programs.experienced.pricing.otherTime'),
            price: t('programs.experienced.pricing.price2'),
          },
        ],
        consultation: t('programs.experienced.pricing.consultation'),
      },
      color: 'from-blue-600 to-blue-800',
    },
    {
      id: 2,
      title: t('programs.comfortable.title'),
      subtitle: t('programs.comfortable.subtitle'),
      description: t('programs.comfortable.description'),
      features: [
        t('programs.comfortable.features.tickets'),
        t('programs.comfortable.features.planning'),
        t('programs.comfortable.features.hotels'),
        t('programs.comfortable.features.transfers'),
        t('programs.comfortable.features.rental'),
        t('programs.comfortable.features.skipass'),
      ],
      pricing: {
        transfer: [
          {
            time: t('programs.comfortable.pricing.workingDays'),
            price: t('programs.comfortable.pricing.price1'),
          },
          {
            time: t('programs.comfortable.pricing.otherTime'),
            price: t('programs.comfortable.pricing.price2'),
          },
        ],
        consultation: t('programs.comfortable.pricing.consultation'),
        planning: t('programs.comfortable.pricing.planning'),
        hotelTransfer: t('programs.comfortable.pricing.hotelTransferPrice'),
      },
      color: 'from-purple-600 to-purple-800',
    },
    {
      id: 3,
      title: t('programs.superComfort.title'),
      subtitle: t('programs.superComfort.subtitle'),
      description: t('programs.superComfort.description'),
      features: [
        t('programs.superComfort.features.individual'),
        t('programs.superComfort.features.restDay'),
      ],
      pricing: {
        transfer: [
          {
            time: t('programs.superComfort.pricing.workingDays'),
            price: t('programs.superComfort.pricing.price1'),
          },
          {
            time: t('programs.superComfort.pricing.otherTime'),
            price: t('programs.superComfort.pricing.price2'),
          },
        ],
        consultation: t('programs.superComfort.pricing.consultation'),
        planning: t('programs.superComfort.pricing.planning'),
        hotelTransfer: t('programs.superComfort.pricing.hotelTransferPrice'),
        individualSlope: t('programs.superComfort.pricing.individualSlope'),
      },
      color: 'from-amber-600 to-amber-800',
    },
  ]

  return (
    <section
      id="programs"
      className="section-padding bg-color3 text-white"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-bold mb-4 sm:mb-6 px-4 text-color1">
            {t('programs.title')}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-oswald text-white max-w-3xl mx-auto px-4">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Program Tabs */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {programs.map((program, index) => (
            <button
              key={program.id}
              onClick={() => setActiveProgram(index)}
              className={`px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-oswald font-semibold text-base sm:text-lg uppercase tracking-wider transition-all ${
                activeProgram === index
                  ? 'bg-color1 text-color3'
                  : 'bg-white/10 text-white hover:bg-color1 hover:text-color3'
              }`}
            >
              {index === 0 ? t('programs.buttonNames.expert') : index === 1 ? t('programs.buttonNames.balance') : t('programs.buttonNames.ultracomfort')}
            </button>
          ))}
        </div>

        {/* Active Program Details */}
        {programs.map((program, index) => (
          activeProgram === index && (
            <div
              key={program.id}
              className="bg-color3 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
            >
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">{program.subtitle}</p>
                <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-color1">
                    {activeProgram === 2 ? (
                      <>
                        {t('programs.whatIncluded').replace(':', '')}{' '}
                        <span className="text-white font-normal text-base sm:text-lg">
                          ({t('programs.whatIncludedUltra')}):
                        </span>
                      </>
                    ) : (
                      t('programs.whatIncluded')
                    )}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-color1 mr-2 sm:mr-3 mt-1 text-sm sm:text-base">✓</span>
                        <span className="text-base sm:text-lg text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-color2 rounded-xl p-4 sm:p-6">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-oswald font-bold mb-4 sm:mb-6 text-color1">
                  {t('programs.cost')}
                </h4>
                <div className="space-y-6">
                  {/* Эксперт: только трансфер */}
                  {activeProgram === 0 && (
                    <>
                      {program.pricing.transfer && (
                        <div>
                          <p className="font-semibold text-white mb-3 text-base sm:text-lg md:text-xl">
                            {t(`programs.${activeProgram === 0 ? 'experienced' : activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.transfer`)}
                          </p>
                          <div className="space-y-2">
                            {program.pricing.transfer.map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-white/10 rounded-lg p-3"
                              >
                                <p className="text-white font-medium text-base sm:text-lg md:text-xl">
                                  {idx === 0 ? `${t(`programs.${activeProgram === 0 ? 'experienced' : activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.transferStart`)} ${item.time}` : item.time}
                                </p>
                                <p className="text-color1 text-[1.5em]">
                                  {item.price}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Баланс и Ультракомфорт: планирование, трансфер, отель */}
                  {(activeProgram === 1 || activeProgram === 2) && (
                    <>
                      {program.pricing.planning && (
                        <div>
                          <p className="text-white text-base sm:text-lg md:text-xl">
                            <span className="mr-2">1.</span>
                            {program.pricing.planning.split(':')[0]}:{' '}
                            <span className="text-color1 font-semibold">
                              {program.pricing.planning.split(':')[1]?.trim()}
                            </span>
                          </p>
                        </div>
                      )}
                      {program.pricing.transfer && (
                        <div>
                          <p className="font-semibold text-white mb-3 text-base sm:text-lg md:text-xl">
                            <span className="mr-2">2.</span>
                            {t(`programs.${activeProgram === 0 ? 'experienced' : activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.transfer`)}
                          </p>
                          <div className="space-y-2">
                            {program.pricing.transfer.map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-white/10 rounded-lg p-3"
                              >
                                <p className="text-white font-medium text-base sm:text-lg md:text-xl">
                                  {idx === 0 ? `${t(`programs.${activeProgram === 0 ? 'experienced' : activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.transferStart`)} ${item.time}` : item.time}
                                </p>
                                <p className="text-color1 text-[1.5em]">
                                  {item.price}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {program.pricing.hotelTransfer && (
                        <div>
                          <p className="text-white text-base sm:text-lg md:text-xl font-medium">
                            <span className="mr-2">3.</span>
                            {t(`programs.${activeProgram === 1 ? 'comfortable' : 'superComfort'}.pricing.hotelTransfer`)}{' '}
                            <span className="text-color1 font-semibold">
                              {program.pricing.hotelTransfer}
                            </span>
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Сноска для всех тарифов - вне блоков */}
            <div className="mt-6 pt-4">
              <p className="text-white text-base sm:text-lg">
                <span className="text-xl sm:text-2xl">*</span>{t('programs.tollRoadsNote').replace('* ', '')}
              </p>
            </div>
            </div>
          )
        ))}
      </div>
    </section>
  )
}

export default Programs

