import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Resorts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedResort, setSelectedResort] = useState(null)

  const resorts = [
    {
      id: 1,
      name: 'Курмайор',
      nameEn: 'Courmayeur',
      region: 'Валле-д\'Аоста',
      description:
        'Расположен у подножия Монблана. Известен шикарными видами и сочетанием итальянского и французского стиля отдыха.',
      trails: '~100 км',
      elevation: 'до 2755 м',
      level: 'Все уровни',
      image:
        'https://images.unsplash.com/photo-1551524164-6cf77f5e7b8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Великолепные виды на Монблан',
        'Высококачественный сервис',
        'Разнообразные трассы',
      ],
    },
    {
      id: 2,
      name: 'Ливиньо',
      nameEn: 'Livigno',
      region: 'Ломбардия',
      description:
        'Находится рядом со швейцарской границей. Известен зоной duty-free и демократичными ценами.',
      trails: '115 км',
      elevation: '1800–2900 м',
      level: 'Все уровни',
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Зона duty-free',
        'Демократичные цены',
        'Отличные условия для сноуборда',
      ],
    },
    {
      id: 3,
      name: 'Валь-Гардена',
      nameEn: 'Val Gardena',
      region: 'Трентино-Альто Адидже',
      description:
        'Часть системы Dolomiti Superski. Известен разнообразием трасс и живописными пейзажами.',
      trails: '175 км',
      elevation: 'до 2518 м',
      level: 'Все уровни',
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Часть Dolomiti Superski',
        'Живописные пейзажи',
        'Разнообразие трасс',
      ],
    },
    {
      id: 4,
      name: 'Альта Бадия',
      nameEn: 'Alta Badia',
      region: 'Трентино-Альто Адидже',
      description:
        'Известен множеством пологих склонов в окружении хвойного леса. Идеален для семейного отдыха.',
      trails: '130 км',
      elevation: 'до 2778 м',
      level: 'Средний уровень',
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Пологие склоны',
        'Семейный отдых',
        'Хвойные леса',
      ],
    },
    {
      id: 5,
      name: 'Червиния',
      nameEn: 'Cervinia',
      region: 'Валле-д\'Аоста',
      description:
        'Расположен у подножия Маттерхорна. Известен длинными трассами и возможностью катания на леднике.',
      trails: '150 км',
      elevation: 'до 3480 м',
      level: 'Все уровни',
      image:
        'https://images.unsplash.com/photo-1551524164-6cf77f5e7b8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Вид на Маттерхорн',
        'Катание на леднике',
        'Длинные трассы',
      ],
    },
    {
      id: 6,
      name: 'Мадонна ди Кампильо',
      nameEn: 'Madonna di Campiglio',
      region: 'Трентино',
      description:
        'Один из самых престижных курортов Италии. Элегантная атмосфера и отличная инфраструктура.',
      trails: '150 км',
      elevation: 'до 2500 м',
      level: 'Все уровни',
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Престижный курорт',
        'Элегантная атмосфера',
        'Отличная инфраструктура',
      ],
    },
  ]

  return (
    <section
      id="resorts"
      ref={ref}
      className="section-padding bg-gradient-to-b from-premium-gray to-white"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-premium-navy mb-6">
            Лучшие горнолыжные курорты Италии
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-8" />
          <p className="text-xl text-premium-darkGray max-w-3xl mx-auto">
            Мы работаем на самых престижных курортах Альп
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort, index) => (
            <motion.div
              key={resort.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedResort(selectedResort === resort.id ? null : resort.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-elegant font-bold text-white mb-1">
                    {resort.name}
                  </h3>
                  <p className="text-premium-lightGold text-sm">{resort.nameEn}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-premium-gold font-semibold mb-2">{resort.region}</p>
                <p className="text-premium-darkGray mb-4 line-clamp-2">
                  {resort.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-premium-darkGray mb-4">
                  <span>📏 {resort.trails}</span>
                  <span>⛰️ {resort.elevation}</span>
                  <span>🎿 {resort.level}</span>
                </div>
                {selectedResort === resort.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-premium-gray"
                  >
                    <p className="font-semibold text-premium-navy mb-2">Особенности:</p>
                    <ul className="space-y-1">
                      {resort.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-premium-darkGray">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Resorts

