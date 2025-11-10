import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-gradient-to-b from-white to-premium-gray"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-premium-navy mb-6">
            О нас
          </h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-premium-darkGray leading-relaxed">
              Будучи страстными поклонниками таких видов спорта, как горные лыжи,
              скалолазание, хайкинг, каякинг, после недолгих раздумий мы выбрали,
              не поверите, <span className="font-semibold text-premium-navy">Италию!</span>
            </p>
            <p className="text-lg text-premium-darkGray leading-relaxed">
              Мы много путешествовали, особенно с горными лыжами. Урал, Апатиты,
              Кавказ, Армения, Грузия, Финляндия – прекрасные места для тех, кто
              понимает. Но <span className="font-semibold text-premium-navy">Альпы…</span> Альпы это
              там, куда надо ездить и возвращаться.
            </p>
            <p className="text-lg text-premium-darkGray leading-relaxed">
              Это там, где невероятная красота снежных вершин сопровождается
              безупречным сервисом горнолыжных курортов. Это там, где отпуск – это{' '}
              <span className="font-semibold text-premium-navy">Отпуск.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Альпы"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 bg-premium-navy rounded-2xl text-white"
        >
          <h3 className="text-2xl md:text-3xl font-elegant font-bold mb-6 text-center">
            Почему мы?
          </h3>
          <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
            И, насладившись этим всем, решили, что сделать La Vacanza Bianca для
            наших клиентов тем самым прекрасным временем, когда не надо заботиться
            ни о чем, кроме самого факта приезда в Италию – это отличная идея.
          </p>
          <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto mt-6">
            Вы не ломаете голову, как снять авто в аэропорту, не имея «правильной»
            кредитной карты. Как забронировать отель без нее же. Как после долгого и
            сложного перелета 4 часа рулить по заснеженным серпантинам. Как и где
            парковать машину, чтобы не топать до подъемника полчаса пешком.
          </p>
          <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto mt-6 text-premium-gold font-semibold">
            Так вот теперь обо всем этом позаботимся мы. А вы просто прилетите в
            Милан или Бергамо и по-настоящему кайфанёте!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About

