import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Programs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeProgram, setActiveProgram] = useState(0)

  const programs = [
    {
      id: 1,
      title: 'Для опытных',
      subtitle: 'Для горнолыжников, которые и сами всё умеют',
      description:
        'Если вы уже не раз бывали в Итальянских Альпах, то наверняка знаете, как самостоятельно выбрать лучшие горнолыжные курорты.',
      features: [
        'Консультация онлайн или офлайн по вариантам проведения горнолыжного отдыха в Италии и Швейцарии',
        'Встреча в аэропорту и трансфер до первого отеля',
        'Трансфер из последнего отеля в аэропорт',
      ],
      pricing: {
        transfer: [
          {
            time: 'с 7:00 до 21:00 в рабочие дни',
            price: '1 евро/км + стоимость платных дорог',
          },
          {
            time: 'Остальное время',
            price: '1,5 евро/км + стоимость платных дорог',
          },
        ],
        consultation: 'Обсуждение планов поездки, выбор билетов, подбор горнолыжных курортов и т.д. - бесплатно',
      },
      color: 'from-blue-600 to-blue-800',
    },
    {
      id: 2,
      title: 'Удобное путешествие',
      subtitle: 'Для горнолыжников, которые хотят путешествовать с комфортом',
      description:
        'Вы катаетесь на горных лыжах или сноуборде, побывали на разных курортах и хотели бы провести новый незабываемый спортивный отпуск в Италии?',
      features: [
        'Помощь с выбором вариантов маршрута приезда в Италию и с выбором билетов',
        'Составление плана всей поездки',
        'Бронирование отелей',
        'Трансфер от отелей до подъемников и обратно',
        'Помощь с арендой инвентаря',
        'Помощь с покупкой ски-пассов',
      ],
      pricing: {
        transfer: [
          {
            time: 'с 7:00 до 21:00 в рабочие дни',
            price: '0,7 евро/км + стоимость платных дорог',
          },
          {
            time: 'Остальное время',
            price: '1 евро/км + стоимость платных дорог',
          },
        ],
        consultation: 'Обсуждение планов поездки, выбор билетов, подбор горнолыжных курортов и т.д. - бесплатно',
        planning: '200 евро/услуга',
        hotelTransfer: '200 евро/день',
      },
      color: 'from-purple-600 to-purple-800',
    },
    {
      id: 3,
      title: 'Суперкомфорт',
      subtitle: 'Для тех, кто первый раз',
      description:
        'Вы новичок в горных лыжах или в паре один опытный лыжник, а другой только начинает? Мы покажем, расскажем, объясним всё.',
      features: [
        'Полный день сопровождения клиентов на склонах',
        'Индивидуальное сопровождение одного человека на склонах, полный день',
        'Сопровождение клиентов в день отдыха – поездки по магазинам, экскурсиям, хайкинг и т.д.',
      ],
      pricing: {
        transfer: [
          {
            time: 'с 7:00 до 21:00 в рабочие дни',
            price: '0,7 евро/км + стоимость платных дорог',
          },
          {
            time: 'Остальное время',
            price: '1 евро/км + стоимость платных дорог',
          },
        ],
        consultation: 'Обсуждение планов поездки, выбор билетов, подбор горнолыжных курортов и т.д. - бесплатно',
        planning: '200 евро/услуга',
        hotelTransfer: '400 евро/день',
        individualSlope: 'Индивидуальное сопровождение на склонах (одновременно – только один человек)',
      },
      color: 'from-amber-600 to-amber-800',
    },
  ]

  return (
    <section
      id="programs"
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
            Наши программы
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-8" />
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Выберите программу, которая подходит именно вам
          </p>
        </motion.div>

        {/* Program Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {programs.map((program, index) => (
            <motion.button
              key={program.id}
              onClick={() => setActiveProgram(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeProgram === index
                  ? 'bg-premium-gold text-premium-navy'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {program.title}
            </motion.button>
          ))}
        </div>

        {/* Active Program Details */}
        {programs.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 50 }}
            animate={
              inView && activeProgram === index
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50, display: 'none' }
            }
            transition={{ duration: 0.5 }}
            className={`${
              activeProgram === index ? 'block' : 'hidden'
            } bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-elegant font-bold mb-4 text-premium-gold">
                  {program.title}
                </h3>
                <p className="text-xl text-white/90 mb-6">{program.subtitle}</p>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-premium-gold">
                    Что входит:
                  </h4>
                  <ul className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-premium-gold mr-3 mt-1">✓</span>
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-2xl font-semibold mb-6 text-premium-gold">
                  Стоимость
                </h4>
                <div className="space-y-6">
                  {program.pricing.consultation && (
                    <div>
                      <p className="text-white/80 mb-2">
                        {program.pricing.consultation}
                      </p>
                    </div>
                  )}
                  {program.pricing.transfer && (
                    <div>
                      <p className="font-semibold text-white mb-3">
                        Трансфер из аэропорта/в аэропорт:
                      </p>
                      <div className="space-y-2">
                        {program.pricing.transfer.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white/10 rounded-lg p-3"
                          >
                            <p className="text-white/90 font-medium">
                              {item.time}
                            </p>
                            <p className="text-premium-gold">
                              {item.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {program.pricing.planning && (
                    <div>
                      <p className="text-white/80">
                        Составление плана всей поездки:{' '}
                        <span className="text-premium-gold font-semibold">
                          {program.pricing.planning}
                        </span>
                      </p>
                    </div>
                  )}
                  {program.pricing.hotelTransfer && (
                    <div>
                      <p className="text-white/80">
                        Трансфер от отеля до парковки у подъемников:{' '}
                        <span className="text-premium-gold font-semibold">
                          {program.pricing.hotelTransfer}
                        </span>
                      </p>
                    </div>
                  )}
                  {program.pricing.individualSlope && (
                    <div>
                      <p className="text-white/80">
                        {program.pricing.individualSlope}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Programs

