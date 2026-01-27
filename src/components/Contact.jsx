import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ContactModal from './ContactModal'

const Contact = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Функция для открытия модального окна (используется из Navigation)
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true)
    }
    
    // Слушаем событие открытия модального окна
    window.addEventListener('openContactModal', handleOpenModal)
    
    return () => {
      window.removeEventListener('openContactModal', handleOpenModal)
    }
  }, [])

  return (
    <>
    <section
      id="contact"
        className="section-block final-cta bg-bg-base py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-5 text-center"
    >
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-header-title font-serif text-[42px] text-text-main mb-5 tracking-[0.02em]" style={{ fontWeight: '300' }}>
            {t('contact.title')}
          </h2>
          <p className="section-header-desc text-lg font-sans text-text-light mb-[50px]" style={{ fontWeight: '400' }}>
            {t('contact.subtitle')}
          </p>
              <button
            onClick={() => setIsModalOpen(true)}
            className="btn-cta inline-block font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main px-[55px] py-[22px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5"
            style={{ fontWeight: '500' }}
          >
            {t('contact.form.submit')}
          </button>
          <p className="final-note font-sans text-[13px] text-[#999] mt-5">
            {t('contact.form.finalNote')}
          </p>
      </div>
    </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Contact
