import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) {
      return 'Телефон обязателен для заполнения'
    }
    
    // Удаляем все нецифровые символы для проверки
    const digitsOnly = phone.replace(/\D/g, '')
    
    // Минимальная длина международного номера (с кодом страны) - 7 цифр
    // Максимальная длина по E.164 стандарту - 15 цифр
    if (digitsOnly.length < 7) {
      return 'Телефон должен содержать минимум 7 цифр'
    }
    
    if (digitsOnly.length > 15) {
      return 'Телефон слишком длинный (максимум 15 цифр)'
    }
    
    // Проверка на российский формат (если начинается с 7 или 8)
    if (digitsOnly.startsWith('7') || digitsOnly.startsWith('8')) {
      if (digitsOnly.length !== 11) {
        return 'Российский номер должен содержать 11 цифр (включая код страны)'
      }
    }
    
    // Проверка на международный формат (начинается с кода страны 1-9, но не 7 или 8)
    // Если номер начинается с других цифр, проверяем общую длину
    if (!digitsOnly.startsWith('7') && !digitsOnly.startsWith('8')) {
      // Для международных номеров минимальная длина обычно 8-15 цифр
      if (digitsOnly.length < 8) {
        return 'Международный номер должен содержать минимум 8 цифр'
      }
    }
    
    return ''
  }

  const formatPhone = (value) => {
    // Удаляем все нецифровые символы для определения типа номера
    const digitsOnly = value.replace(/\D/g, '')
    
    if (!digitsOnly) {
      return value
    }
    
    // Определяем, является ли номер российским
    const isRussian = digitsOnly.startsWith('7') || digitsOnly.startsWith('8')
    
    // Для российских номеров - форматируем как +7 (XXX) XXX-XX-XX
    if (isRussian) {
      // Если начинается с 8, заменяем на 7
      let formatted = digitsOnly.startsWith('8') ? '7' + digitsOnly.slice(1) : digitsOnly
      
      if (formatted.length > 1 && formatted.length <= 11) {
        const code = formatted.slice(1, 4)
        const part1 = formatted.slice(4, 7)
        const part2 = formatted.slice(7, 9)
        const part3 = formatted.slice(9, 11)
        
        if (part3) {
          return `+7 (${code}) ${part1}-${part2}-${part3}`
        } else if (part2) {
          return `+7 (${code}) ${part1}-${part2}`
        } else if (part1) {
          return `+7 (${code}) ${part1}`
        } else if (code) {
          return `+7 (${code}`
        }
        return '+7 '
      }
    }
    
    // Для международных номеров - не форматируем автоматически
    // Пользователь может вводить в любом формате: +39 123 456 7890, +1 234 567 8900, и т.д.
    // Просто возвращаем значение как есть, чтобы не мешать пользователю
    return value
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    
    // Определяем тип номера по цифрам
    const digitsOnly = value.replace(/\D/g, '')
    const isRussian = digitsOnly.startsWith('7') || digitsOnly.startsWith('8')
    
    // Форматируем только российские номера
    // Для международных номеров оставляем как есть, чтобы пользователь мог вводить в любом формате
    const formatted = isRussian ? formatPhone(value) : value
    
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
    if (!email || !email.trim()) {
      return 'Email обязателен для заполнения'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Введите корректный email адрес'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидация перед отправкой
    const phoneError = validatePhone(formData.phone)
    const emailError = validateEmail(formData.email)
    
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
    
    // Формируем сообщение для WhatsApp (минимальное, чтобы можно было редактировать)
    const whatsappMessage = `Здравствуйте! Меня зовут ${formData.name}.

Email: ${formData.email}
Телефон: ${formData.phone}
${formData.program ? `Интересующая программа: ${formData.program}` : ''}
${formData.message ? `Сообщение: ${formData.message}` : ''}

Готов(а) обсудить детали моего горнолыжного тура в Италию!`

    // Используем итальянский номер телефона
    const whatsappUrl = `https://wa.me/393311535788?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-premium-navy text-white"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-4 sm:mb-6 px-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-elegant font-bold mb-4 sm:mb-6 text-premium-gold">
              {t('contact.sendRequest')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-white/90 mb-2 text-sm sm:text-base">{t('contact.form.name')} *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm sm:text-base placeholder-white/50 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-white/90 mb-2 text-sm sm:text-base">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 border rounded-lg text-white text-sm sm:text-base placeholder-white/50 focus:outline-none transition-colors ${
                    emailError && emailTouched
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/20 focus:border-premium-gold'
                  }`}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {emailTouched && emailError && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
                {!emailError && emailTouched && formData.email && (
                  <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Email введен корректно
                  </p>
                )}
                {!emailTouched && (
                  <p className="mt-1 text-xs text-white/60">
                    Пример: skilover@email.com
                  </p>
                )}
              </div>
              <div>
                <label className="block text-white/90 mb-2 text-sm sm:text-base">
                  {t('contact.form.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  required
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 border rounded-lg text-white text-sm sm:text-base placeholder-white/50 focus:outline-none transition-colors ${
                    phoneError && phoneTouched
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/20 focus:border-premium-gold'
                  }`}
                  placeholder="+7 (999) 123-45-67 или +39 123 456 7890"
                />
                {phoneTouched && phoneError && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {phoneError}
                  </p>
                )}
                {!phoneError && phoneTouched && formData.phone && (
                  <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Телефон введен корректно
                  </p>
                )}
                {!phoneTouched && (
                  <p className="mt-1 text-xs text-white/60">
                    Формат: +7 (999) 123-45-67, +39 123 456 7890, или 8 (999) 123-45-67
                  </p>
                )}
              </div>
              <div>
                <label className="block text-white/90 mb-2 text-sm sm:text-base">
                  {t('contact.form.program')}
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-premium-gold transition-colors [&>option]:bg-premium-navy [&>option]:text-white"
                >
                  <option value="" className="bg-premium-navy text-white">{t('contact.form.selectProgram')}</option>
                  <option value={t('programs.experienced.title')} className="bg-premium-navy text-white">{t('programs.experienced.title')}</option>
                  <option value={t('programs.comfortable.title')} className="bg-premium-navy text-white">{t('programs.comfortable.title')}</option>
                  <option value={t('programs.superComfort.title')} className="bg-premium-navy text-white">{t('programs.superComfort.title')}</option>
                </select>
              </div>
              <div>
                <label className="block text-white/90 mb-2 text-sm sm:text-base">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm sm:text-base placeholder-white/50 focus:outline-none focus:border-premium-gold transition-colors resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-premium-gold text-premium-navy rounded-full font-semibold text-base sm:text-lg hover:bg-premium-lightGold transition-colors"
              >
                {t('contact.form.submit')}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Conditions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-elegant font-bold mb-4 sm:mb-6 text-premium-gold">
                {t('contact.quickContact')}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <motion.a
                  href="https://wa.me/393311535788"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-white font-semibold text-sm sm:text-base">WhatsApp</span>
                </motion.a>
                <motion.a
                  href="tel:+393311535788"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-white font-semibold text-sm sm:text-base">+39 331 153 5788</span>
                </motion.a>
                <motion.a
                  href="mailto:dmitryiz975@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-white font-semibold text-xs sm:text-sm md:text-base break-all">
                    dmitryiz975@gmail.com
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

