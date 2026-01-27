import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ContactModal from './ContactModal'

const Programs = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [activeProgramIndex, setActiveProgramIndex] = useState(1) // По умолчанию Balance (рекомендуемый)
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      // Показываем кнопки когда 3 карточки не помещаются (примерно < 1000px с учетом padding и gap)
      setShowButtons(width < 1000)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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
        planningTitle: t('programs.experienced.pricing.planningTitle'),
        planningDesc: t('programs.experienced.pricing.planningDesc'),
        planningPrice: t('programs.experienced.pricing.planningPrice'),
        transferTitle: t('programs.experienced.pricing.transfer'),
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
        hotelTransfer: t('programs.experienced.pricing.hotelTransfer'),
        hotelTransferPrice: t('programs.experienced.pricing.hotelTransferPrice'),
      },
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
        planningTitle: t('programs.comfortable.pricing.planningTitle'),
        planningDesc: t('programs.comfortable.pricing.planningDesc'),
        planningPrice: t('programs.comfortable.pricing.planningPrice'),
        transferTitle: t('programs.comfortable.pricing.transfer'),
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
        hotelTransfer: t('programs.comfortable.pricing.hotelTransfer'),
        hotelTransferDesc: t('programs.comfortable.pricing.hotelTransferDesc'),
        hotelTransferPrice: t('programs.comfortable.pricing.hotelTransferPrice'),
      },
      isRecommended: true,
    },
    {
      id: 3,
      title: t('programs.superComfort.title'),
      subtitle: t('programs.superComfort.subtitle'),
      description: t('programs.superComfort.description'),
      features: [
        t('programs.comfortable.features.tickets'),
        t('programs.comfortable.features.planning'),
        t('programs.comfortable.features.hotels'),
        t('programs.comfortable.features.transfers'),
        t('programs.comfortable.features.rental'),
        t('programs.comfortable.features.skipass'),
        t('programs.superComfort.features.individual'),
        t('programs.superComfort.features.restDay'),
      ],
      pricing: {
        planningTitle: t('programs.superComfort.pricing.planningTitle'),
        planningDesc: t('programs.superComfort.pricing.planningDesc'),
        planningPrice: t('programs.superComfort.pricing.planningPrice'),
        transferTitle: t('programs.superComfort.pricing.transfer'),
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
        hotelTransfer: t('programs.superComfort.pricing.hotelTransfer'),
        hotelTransferDesc: t('programs.superComfort.pricing.hotelTransferDesc'),
        hotelTransferPrice: t('programs.superComfort.pricing.hotelTransferPrice'),
      },
    },
  ]

  return (
    <>
      <div id="programs" className="section-block pricing py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-5 text-center bg-bg-base">
        <h2 className="section-header-title font-serif text-[42px] text-text-main mb-5 tracking-[0.02em]" style={{ fontWeight: '300' }}>
          {t('programs.title')}
        </h2>
        <p className="section-header-desc text-lg font-sans text-text-light mb-[40px] sm:mb-[50px] md:mb-[60px]" style={{ fontWeight: '400' }}>
          {t('programs.subtitle')}
        </p>
        
        {/* Переключение между программами (мобилка и когда карточки не помещаются) */}
        {(isMobile || showButtons) && (
          <div className="mb-8 flex gap-2 justify-center pb-2 px-4" style={{ maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div className="flex gap-2 flex-wrap justify-center" style={{ width: '100%' }}>
              {programs.map((program, idx) => (
                <button
                  key={program.id}
                  onClick={() => setActiveProgramIndex(idx)}
                  className={`px-4 py-2 rounded-[50px] border text-xs font-sans uppercase tracking-[0.05em] transition-all whitespace-nowrap ${
                    activeProgramIndex === idx
                      ? 'bg-text-main text-white border-text-main'
                      : 'bg-transparent text-text-main border-text-main hover:bg-text-main/10'
                  }`}
                  style={{ fontWeight: '500', flexShrink: 0 }}
                >
                  {program.title}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className={`pricing-grid flex justify-center items-stretch gap-4 md:gap-5 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-5 ${(isMobile || showButtons) ? 'flex-col' : 'flex-wrap md:flex-nowrap'}`} style={{ boxSizing: 'border-box' }}>
          {programs.map((program, idx) => {
            // Когда показываются кнопки, показываем только активную программу
            if ((isMobile || showButtons) && activeProgramIndex !== idx) {
              return null
            }
            
            return (
            <div
              key={program.id}
              className={`card bg-bg-card border border-border-soft rounded-xl p-6 sm:p-8 md:p-10 w-full md:w-auto md:flex-1 min-w-[280px] max-w-[400px] md:max-w-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col min-h-[500px] relative transition-transform duration-300 flex-shrink-0 ${
                program.isRecommended
                  ? 'balance md:scale-105 z-[2] border-text-main/20 shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:mt-[15px]'
                  : ''
              }`}
              style={{ boxSizing: 'border-box' }}
            >
              {program.isRecommended && (
                <div className="badge absolute top-0 left-0 right-0 bg-btn-graphite text-white text-[11px] uppercase py-3 rounded-t-xl tracking-[1.5px] font-sans" style={{ fontWeight: '600' }}>
                  {t('programs.recommended')}
                </div>
              )}
              
              <div className={`card-title font-serif mb-[10px] mt-[10px] text-text-main ${program.isRecommended ? 'mt-[30px]' : ''}`} style={{ fontSize: '32px', fontWeight: '500' }}>
                {program.title}
              </div>
              
              <div className="card-sub font-sans text-text-main mb-[15px] text-left" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.4' }}>
                {program.subtitle}
              </div>
              
              <p className="card-desc-text expert-desc font-sans text-text-main text-left mb-5" style={{ fontSize: '12px', lineHeight: '1.5', fontWeight: '400' }}>
                {program.description}
              </p>
              
              <ul className="p-0 mb-[30px] text-left list-none" style={{ fontWeight: '400' }}>
                {program.features.map((feature, idx) => (
                  <li key={idx} className="pl-[15px] relative font-sans text-text-main" style={{ fontSize: '12.5px', lineHeight: '1.4', marginBottom: '8px', fontWeight: '300' }}>
                    <span className="absolute left-0 text-[#999]">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="expert-price-list text-left mt-auto mb-0 font-sans text-text-main bg-[#f9f9f9] p-[15px] rounded-lg" style={{ fontSize: '11px', lineHeight: '1.4' }}>
                <h4 className="m-0 mb-[10px] uppercase" style={{ fontSize: '12px', fontWeight: '600' }}>{t('programs.cost')}:</h4>
                
                {/* Для карточки "Эксперт" показываем только пункт 2 (без нумерации) */}
                {program.id === 1 ? (
                  <div className="expert-price-item" style={{ marginBottom: '10px', fontWeight: '400' }}>
                    <span className="expert-price-title" style={{ fontWeight: '600', display: 'block' }}>{program.pricing.transferTitle}</span>
                    <ul className="expert-sub-list list-none pl-[10px] mx-0" style={{ marginTop: '5px', marginBottom: '0', fontWeight: '400' }}>
                      {program.pricing.transfer.map((item, idx) => (
                        <li key={idx} className="pl-0" style={{ fontSize: '11px', marginBottom: '4px', fontWeight: '400' }}>
                          — {item.time}: <strong style={{ fontWeight: '600' }}>{item.price}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    <div className="expert-price-item" style={{ marginBottom: '10px', fontWeight: '400' }}>
                      <span className="expert-price-title" style={{ fontWeight: '600', display: 'block' }}>1. {program.pricing.planningTitle}</span>
                      <span style={{ fontWeight: '400' }}> {program.pricing.planningDesc} </span>
                      <strong style={{ fontWeight: '600' }}>{program.pricing.planningPrice}</strong>
                    </div>
                    
                    <div className="expert-price-item" style={{ marginBottom: '10px', fontWeight: '400' }}>
                      <span className="expert-price-title" style={{ fontWeight: '600', display: 'block' }}>2. {program.pricing.transferTitle}</span>
                      <ul className="expert-sub-list list-none pl-[10px] mx-0" style={{ marginTop: '5px', marginBottom: '0', fontWeight: '400' }}>
                        {program.pricing.transfer.map((item, idx) => (
                          <li key={idx} className="pl-0" style={{ fontSize: '11px', marginBottom: '4px', fontWeight: '400' }}>
                            — {item.time}: <strong style={{ fontWeight: '600' }}>{item.price}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="expert-price-item" style={{ marginBottom: '10px', fontWeight: '400' }}>
                      <span className="expert-price-title" style={{ fontWeight: '600', display: 'block' }}>3. {program.pricing.hotelTransfer}</span>
                      {program.pricing.hotelTransferDesc && (
                        <span style={{ fontWeight: '400' }}> {program.pricing.hotelTransferDesc} </span>
                      )}
                      <strong style={{ fontWeight: '600' }}>{program.pricing.hotelTransferPrice}</strong>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn w-full px-[30px] py-4 mt-5 font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5"
                style={{ fontWeight: '500' }}
              >
                {t('programs.selectButton')}
              </button>
              
              {/* Объединенный блок сносок с двумя абзацами */}
              <div className="card-footnote-inner mt-[15px] font-sans text-left" style={{ fontSize: '10.8px', color: '#999', lineHeight: '1.3' }}>
                <p style={{ marginBottom: '8px', marginTop: 0 }}>
                  * {t('programs.tollRoadsNote').replace('* ', '')}
                </p>
                {program.id !== 3 ? (
                  <p style={{ marginBottom: 0, marginTop: 0 }}>
                    {t('programs.groupNoteExpert')}
                  </p>
                ) : (
                  <p style={{ marginBottom: 0, marginTop: 0 }}>
                    {t('programs.groupNoteUltra')}
                  </p>
                )}
              </div>
            </div>
            )
          })}
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Programs
