import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'

const ContactModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  })

  const [phoneError, setPhoneError] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Сбрасываем выбранную программу при смене языка
  useEffect(() => {
    // При смене языка всегда сбрасываем выбранную программу
    if (formData.program) {
      setFormData(prev => ({ ...prev, program: '' }))
    }
  }, [i18n.language])

  // Закрытие по клику вне модального окна
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Валидация телефона (из оригинального Contact.jsx)
  const validCountryCodes = [
    '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
    '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86', '90', '91', '92', '93', '94', '95', '98', '212', '213', '216', '218',
    '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239',
    '240', '241', '242', '243', '244', '245', '246', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '260', '261',
    '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', '299', '350', '351', '352', '353', '354', '355', '356',
    '357', '358', '359', '370', '371', '372', '373', '374', '375', '376', '377', '378', '380', '381', '382', '383', '385', '386', '387', '389',
    '420', '421', '423', '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', '596',
    '597', '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '685', '686', '687', '688',
    '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961', '962', '963', '964', '965', '966', '967', '968',
    '970', '971', '972', '973', '974', '975', '976', '977', '992', '993', '994', '995', '996', '998'
  ]

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) {
      return 'Телефон обязателен для заполнения'
    }
    
    let cleanPhone = phone.trim().replace(/[\s-()]/g, '')
    
    if (!cleanPhone.startsWith('+')) {
      if (cleanPhone.startsWith('8')) {
        cleanPhone = '+7' + cleanPhone.slice(1)
      } else if (/^\d/.test(cleanPhone)) {
        cleanPhone = '+' + cleanPhone
      } else {
        return 'Телефон должен начинаться с + или цифры'
      }
    }
    
    const e164Regex = /^\+[1-9]\d{6,14}$/
    if (!e164Regex.test(cleanPhone)) {
      return 'Неверный формат телефона. Используйте формат: +7 (999) 123-45-67 или +39 123 456 7890'
    }
    
    const digitsOnly = cleanPhone.slice(1)
    let countryCode = ''
    
    for (let i = 1; i <= 3 && i <= digitsOnly.length; i++) {
      const code = digitsOnly.slice(0, i)
      if (validCountryCodes.includes(code)) {
        countryCode = code
        break
      }
    }
    
    if (!countryCode) {
      return 'Неверный код страны. Проверьте правильность ввода'
    }
    
    const numberPart = digitsOnly.slice(countryCode.length)
    if (numberPart.length < 6) {
      return 'Номер слишком короткий. Минимум 6 цифр после кода страны'
    }
    
    if (numberPart.length > 12) {
      return 'Номер слишком длинный. Максимум 12 цифр после кода страны'
    }
    
    if (countryCode === '7') {
      if (digitsOnly.length !== 11) {
        return 'Российский номер должен содержать 11 цифр: +7 (XXX) XXX-XX-XX'
      }
    } else if (countryCode === '1') {
      if (digitsOnly.length !== 11) {
        return 'Номер США/Канады должен содержать 11 цифр: +1 (XXX) XXX-XXXX'
      }
    } else if (countryCode === '39') {
      if (digitsOnly.length < 11 || digitsOnly.length > 12) {
        return 'Итальянский номер должен содержать 11-12 цифр после знака +: +39 XXX XXX XXXX'
      }
    }
    
    return ''
  }

  const formatPhone = (value) => {
    if (!value) return ''
    
    let clean = value.replace(/[^\d+]/g, '')
    
    if (!clean.startsWith('+')) {
      if (clean.startsWith('8')) {
        clean = '+7' + clean.slice(1)
      } else if (clean.length > 0) {
        clean = '+' + clean
      }
    }
    
    if (clean.startsWith('+8')) {
      clean = '+7' + clean.slice(2)
    }
    
    if (clean.startsWith('+7')) {
      const digits = clean.slice(2).replace(/\D/g, '')
      if (digits.length === 0) return '+7'
      if (digits.length <= 3) return `+7 (${digits}`
      if (digits.length <= 6) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3)}`
      if (digits.length <= 8) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
    }
    
    return clean
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    const formatted = formatPhone(value)
    
    setFormData({
      ...formData,
      phone: formatted,
    })
    
    if (phoneTouched) {
      setPhoneError(validatePhone(formatted))
    }
  }

  const handlePhoneBlur = () => {
    setPhoneTouched(true)
    setPhoneError(validatePhone(formData.phone))
  }

  const validateEmail = (email) => {
    // Email теперь необязателен
    if (!email || !email.trim()) {
      return ''
    }
    
    const trimmedEmail = email.trim().toLowerCase()
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(trimmedEmail)) {
      return 'Введите корректный email адрес'
    }
    
    if (trimmedEmail.includes('..')) {
      return 'Email не может содержать двойные точки'
    }
    
    if (trimmedEmail.startsWith('.') || trimmedEmail.startsWith('@')) {
      return 'Email не может начинаться с точки или @'
    }
    
    const parts = trimmedEmail.split('@')
    if (parts.length !== 2) {
      return 'Email должен содержать один символ @'
    }
    
    const [localPart, domain] = parts
    
    if (localPart.length === 0 || localPart.length > 64) {
      return 'Локальная часть email слишком короткая или длинная'
    }
    
    if (localPart.endsWith('.') || localPart.startsWith('.')) {
      return 'Локальная часть не может начинаться или заканчиваться точкой'
    }
    
    if (domain.length === 0 || domain.length > 255) {
      return 'Домен слишком короткий или длинный'
    }
    
    if (!domain.includes('.')) {
      return 'Email должен содержать домен верхнего уровня (например, .com, .ru)'
    }
    
    return ''
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setFormData({
      ...formData,
      email: value,
    })
    
    if (emailTouched) {
      setEmailError(validateEmail(value))
    }
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
    setEmailError(validateEmail(formData.email))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setSubmitSuccess(false)
    setSubmitError('')
    
    const phoneError = validatePhone(formData.phone)
    // Email валидируем только если он заполнен
    const emailError = formData.email ? validateEmail(formData.email) : ''
    
    if (phoneError) {
      setPhoneTouched(true)
      setPhoneError(phoneError)
    }
    
    if (emailError) {
      setEmailTouched(true)
      setEmailError(emailError)
    }
    
    if (phoneError || emailError) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ieteu8c'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_mgom9am'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'hWDtd1yXUvolBOTS5'
      
      if (!serviceId || serviceId === 'YOUR_SERVICE_ID' || !templateId || templateId === 'YOUR_TEMPLATE_ID' || !publicKey || publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS параметры не настроены. Проверьте переменные окружения.')
      }
      
      const templateParams = {
        to_email: 'info@vacanzabianca.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        program: formData.program || t('contact.form.program') || 'Не указана',
        message: formData.message || t('contact.form.message') || 'Сообщение не указано',
        subject: t('contact.form.subject')
      }
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      try {
        const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID || 'template_auto_reply'
        const autoReplyParams = {
          to_email: formData.email,
          to_name: formData.name,
          subject: t('contact.form.autoReplySubject')
        }
        
        await emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey)
      } catch (error) {
        console.error('Ошибка отправки ответного письма:', error)
      }
      
      setSubmitSuccess(true)
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: '',
        message: '',
      })
      setPhoneTouched(false)
      setEmailTouched(false)
      
      setTimeout(() => {
        setSubmitSuccess(false)
        onClose()
      }, 2000)
      
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      setSubmitError(t('contact.form.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Закрываем модальное окно при клике на backdrop или вне модального контента
        const modalContent = e.currentTarget.querySelector('.modal-content')
        if (!modalContent || !modalContent.contains(e.target)) {
          onClose()
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div className="modal-content relative bg-bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-main hover:text-text-light transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-main mb-2">
            {t('contact.title')}
          </h2>
          <p className="text-lg font-sans text-text-light mb-6">
            {t('contact.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-text-main mb-2 text-sm font-sans">{t('contact.form.name')} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg text-text-main text-sm font-sans placeholder-text-light/50 focus:outline-none focus:border-text-main transition-colors"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-text-main mb-2 text-sm font-sans">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`w-full px-4 py-3 bg-white border rounded-lg text-text-main text-sm font-sans placeholder-text-light/50 focus:outline-none transition-colors ${
                  emailError && emailTouched
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-border-soft focus:border-text-main'
                }`}
                placeholder={t('contact.form.emailPlaceholder')}
              />
              {emailTouched && emailError && (
                <p className="mt-1 text-xs text-red-400">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-text-main mb-2 text-sm font-sans">
                {t('contact.form.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                required
                className={`w-full px-4 py-3 bg-white border rounded-lg text-text-main text-sm font-sans placeholder-text-light/50 focus:outline-none transition-colors ${
                  phoneError && phoneTouched
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-border-soft focus:border-text-main'
                }`}
                placeholder="+7 (999) 123-45-67 или +39 123 456 7890"
              />
              {phoneTouched && phoneError && (
                <p className="mt-1 text-xs text-red-400">{phoneError}</p>
              )}
            </div>

            <div>
              <label className="block text-text-main mb-2 text-sm font-sans">
                {t('contact.form.program')}
              </label>
              <select
                key={i18n.language}
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 bg-white border border-border-soft rounded-lg text-text-main text-sm font-sans focus:outline-none focus:border-text-main transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%232f3035%22%20d%3D%22M6%209L1%204h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:12px_12px] bg-[right_1rem_center]"
                style={{ paddingRight: '2.5rem' }}
              >
                <option value="">{t('contact.form.selectProgram')}</option>
                <option value={t('programs.buttonNames.expert')}>{t('programs.buttonNames.expert')}</option>
                <option value={t('programs.buttonNames.balance')}>{t('programs.buttonNames.balance')}</option>
                <option value={t('programs.buttonNames.ultracomfort')}>{t('programs.buttonNames.ultracomfort')}</option>
              </select>
            </div>

            <div>
              <label className="block text-text-main mb-2 text-sm font-sans">{t('contact.form.message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg text-text-main text-sm font-sans placeholder-text-light/50 focus:outline-none focus:border-text-main transition-colors resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {submitSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{t('contact.form.submitSuccess')}</p>
              </div>
            )}
            
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{submitError}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-text-main text-white rounded-[50px] font-sans font-medium text-[13px] uppercase tracking-[0.14em] hover:bg-text-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
