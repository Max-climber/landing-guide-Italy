import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import ContactModal from './ContactModal'

const Steps = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const steps = [
    {
      image: '/images/infographics/step-1.png',
      title: t('steps.step1.title'),
      desc: t('steps.step1.desc')
    },
    {
      image: '/images/infographics/step-2.png',
      title: t('steps.step2.title'),
      desc: t('steps.step2.desc')
    },
    {
      image: '/images/infographics/step-3.png',
      title: t('steps.step3.title'),
      desc: t('steps.step3.desc')
    },
    {
      image: '/images/infographics/step-4.png',
      title: t('steps.step4.title'),
      desc: t('steps.step4.desc')
    },
    {
      image: '/images/infographics/step-5.png',
      title: t('steps.step5.title'),
      desc: t('steps.step5.desc')
    }
  ]

  // Фиксированные размеры карточек - ВСЕГДА одинаковые
  const CARD_WIDTH = '220px'
  const CARD_HEIGHT = '400px'
  
  // Стили для номера над контентом по центру
  const NUMBER_STYLE = {
    fontSize: '28px',
    fontFamily: 'serif',
    fontWeight: '300',
    color: '#666666',
    lineHeight: '1',
    margin: 0,
    padding: 0,
    marginBottom: '12px'
  }

  return (
    <>
      <section id="steps" className="section-block steps py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-5 text-center bg-bg-base overflow-x-hidden">
        <h2 className="section-header-title font-serif text-[42px] text-text-main mb-5 tracking-[0.02em]" style={{ fontWeight: '300' }}>
          {t('steps.title')}
        </h2>
        <p className="section-header-desc text-lg font-sans text-text-light mb-[70px]" style={{ fontWeight: '400' }}>
          {t('steps.subtitle')}
        </p>
        
        <div className="steps-wrapper max-w-[1200px] mx-auto w-full overflow-x-hidden px-4 sm:px-6 md:px-6 lg:px-8 xl:px-5" style={{ boxSizing: 'border-box' }}>
          {/* Мобильная версия: 1 карточка в столбик (до 768px) */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="step-item card bg-bg-card border border-border-soft rounded-xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center relative" 
                style={{ 
                  width: CARD_WIDTH, 
                  minWidth: CARD_WIDTH,
                  maxWidth: CARD_WIDTH,
                  minHeight: CARD_HEIGHT, 
                  height: CARD_HEIGHT,
                  flexShrink: 0
                }}
              >
                <div className="w-full flex justify-center" style={NUMBER_STYLE}>
                  {idx + 1}
                </div>
                <div className="step-icon-box flex items-center justify-center mb-5 flex-shrink-0" style={{ width: 'auto', height: 'auto' }}>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="object-contain"
                    style={{ mixBlendMode: 'multiply', maxWidth: '70px', maxHeight: '70px' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="step-title font-serif text-[22px] mb-[10px] text-text-main text-center flex-shrink-0" style={{ fontWeight: '300' }}>
                  {step.title}
                </div>
                <div className="step-desc font-sans text-sm text-text-light leading-[1.5] text-center flex-grow overflow-y-auto" style={{ fontWeight: '400' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Планшетная версия: 3+2 карточки (768px - 1279px) */}
          <div className="hidden md:flex xl:hidden flex-col items-center gap-0">
            {/* Первая строка: 3 карточки */}
            <div className="flex justify-center gap-3 mb-16" style={{ maxWidth: '100%', width: '100%', flexWrap: 'nowrap' }}>
              {steps.slice(0, 3).map((step, idx) => (
                <div 
                  key={idx} 
                  className="step-item card bg-bg-card border border-border-soft rounded-xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center relative" 
                  style={{ 
                    width: CARD_WIDTH, 
                    minWidth: CARD_WIDTH,
                    maxWidth: CARD_WIDTH,
                    minHeight: CARD_HEIGHT, 
                    height: CARD_HEIGHT,
                    flexShrink: 0
                  }}
                >
                  <div className="w-full flex justify-center" style={NUMBER_STYLE}>
                    {idx + 1}
                  </div>
                  <div className="step-icon-box flex items-center justify-center mb-5 flex-shrink-0" style={{ width: 'auto', height: 'auto' }}>
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="object-contain"
                      style={{ mixBlendMode: 'multiply', maxWidth: '70px', maxHeight: '70px' }}
                    />
                  </div>
                  <div className="step-title font-serif text-[22px] mb-[10px] text-text-main text-center flex-shrink-0" style={{ fontWeight: '300' }}>
                    {step.title}
                  </div>
                  <div className="step-desc font-sans text-sm text-text-light leading-[1.5] text-center flex-grow overflow-y-auto" style={{ fontWeight: '400' }}>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Вторая строка: 2 карточки по центру */}
            <div className="flex justify-center gap-3" style={{ maxWidth: '100%', width: '100%', flexWrap: 'nowrap' }}>
              {steps.slice(3, 5).map((step, idx) => (
                <div 
                  key={idx + 3} 
                  className="step-item card bg-bg-card border border-border-soft rounded-xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center relative" 
                  style={{ 
                    width: CARD_WIDTH, 
                    minWidth: CARD_WIDTH,
                    maxWidth: CARD_WIDTH,
                    minHeight: CARD_HEIGHT, 
                    height: CARD_HEIGHT,
                    flexShrink: 0
                  }}
                >
                  <div className="w-full flex justify-center" style={NUMBER_STYLE}>
                    {idx + 4}
                  </div>
                  <div className="step-icon-box flex items-center justify-center mb-5 flex-shrink-0" style={{ width: 'auto', height: 'auto' }}>
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="object-contain"
                      style={{ mixBlendMode: 'multiply', maxWidth: '70px', maxHeight: '70px' }}
                    />
                  </div>
                  <div className="step-title font-serif text-[22px] mb-[10px] text-text-main text-center flex-shrink-0" style={{ fontWeight: '300' }}>
                    {step.title}
                  </div>
                  <div className="step-desc font-sans text-sm text-text-light leading-[1.5] text-center flex-grow overflow-y-auto" style={{ fontWeight: '400' }}>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Десктопная версия: 5 карточек в одну строку (1280px+) */}
          <div className="hidden xl:flex justify-center gap-4" style={{ maxWidth: '100%', width: '100%', flexWrap: 'nowrap' }}>
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="step-item card bg-bg-card border border-border-soft rounded-xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center relative" 
                style={{ 
                  width: CARD_WIDTH, 
                  minWidth: CARD_WIDTH,
                  maxWidth: CARD_WIDTH,
                  minHeight: CARD_HEIGHT, 
                  height: CARD_HEIGHT, 
                  flexShrink: 0
                }}
              >
                <div className="w-full flex justify-center" style={NUMBER_STYLE}>
                  {idx + 1}
                </div>
                <div className="step-icon-box flex items-center justify-center mb-5 flex-shrink-0" style={{ width: 'auto', height: 'auto' }}>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="object-contain"
                    style={{ mixBlendMode: 'multiply', maxWidth: '70px', maxHeight: '70px' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="step-title font-serif text-[22px] mb-[10px] text-text-main text-center flex-shrink-0" style={{ fontWeight: '300' }}>
                  {step.title}
                </div>
                <div className="step-desc font-sans text-sm text-text-light leading-[1.5] text-center flex-grow overflow-y-auto" style={{ fontWeight: '400' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn inline-block font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main px-[50px] py-[18px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5 mt-10"
          style={{ fontWeight: '500' }}
        >
          {t('steps.cta')}
        </button>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Steps
