import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Contact = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Здесь можно добавить отправку формы
    const whatsappMessage = `Здравствуйте! Меня зовут ${formData.name}. 
Email: ${formData.email}
Телефон: ${formData.phone}
Интересующая программа: ${formData.program}
Сообщение: ${formData.message}`

    const whatsappUrl = `https://wa.me/79000000000?text=${encodeURIComponent(whatsappMessage)}`
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-6">
            Свяжитесь с нами
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-8" />
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Начните планирование вашего незабываемого горнолыжного отпуска
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
          >
            <h3 className="text-2xl font-elegant font-bold mb-6 text-premium-gold">
              Отправьте заявку
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 mb-2">Имя *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="block text-white/90 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white/90 mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <label className="block text-white/90 mb-2">
                  Интересующая программа
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-premium-gold transition-colors"
                >
                  <option value="">Выберите программу</option>
                  <option value="Для опытных">Для опытных</option>
                  <option value="Удобное путешествие">Удобное путешествие</option>
                  <option value="Суперкомфорт">Суперкомфорт</option>
                </select>
              </div>
              <div>
                <label className="block text-white/90 mb-2">Сообщение</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-premium-gold transition-colors resize-none"
                  placeholder="Расскажите о ваших планах..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-4 bg-premium-gold text-premium-navy rounded-full font-semibold text-lg hover:bg-premium-lightGold transition-colors"
              >
                Отправить заявку
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
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-elegant font-bold mb-6 text-premium-gold">
                Быстрая связь
              </h3>
              <div className="space-y-4">
                <motion.a
                  href="https://wa.me/79000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-white font-semibold">WhatsApp</span>
                </motion.a>
                <motion.a
                  href="tel:+79000000000"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
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
                  <span className="text-white font-semibold">+7 (900) 000-00-00</span>
                </motion.a>
                <motion.a
                  href="mailto:info@lavacanzabianca.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
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
                  <span className="text-white font-semibold">
                    info@lavacanzabianca.com
                  </span>
                </motion.a>
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-elegant font-bold mb-6 text-premium-gold">
                Условия
              </h3>
              <div className="space-y-3 text-sm text-white/80">
                <p>• Начало составления планов поездки – минимум за 5 дней до ее начала</p>
                <p>• Первая консультация – в течение 40 минут</p>
                <p>• Предоплата за всю программу = оплата стоимости составления планов поездки – 200 евро</p>
                <p>• Подбор и помощь в бронировании отелей – минимум за 3 дня до начала поездки</p>
                <p>• Бронирование отелей – с заранее переведенной клиентом суммы в рублях или евро</p>
                <p>• Встреча в аэропорту – на краткосрочной стоянке для встречающих</p>
                <p>• Максимальное количество дней сопровождения - 7</p>
                <p>• Максимальное количество часов на склоне в день - 6</p>
                <p>• Переезды между курортами – по цене трансфера из аэропорта</p>
                <p>• Оплата каждого дня – в конце этого дня</p>
                <p>• При оплате в рублях – стоимость по курсу на день оплаты + 5%</p>
                <p>• Компания имеет право в любой момент отказаться от индивидуального сопровождения из соображений безопасности</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

