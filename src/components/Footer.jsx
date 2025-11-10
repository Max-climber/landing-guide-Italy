import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-premium-navy text-white py-12">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-elegant font-bold text-premium-gold mb-4">
              La Vacanza Bianca
            </h3>
            <p className="text-white/80 mb-4">
              Премиальные горнолыжные туры в Италию с индивидуальным сопровождением.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  Программы
                </a>
              </li>
              <li>
                <a
                  href="#resorts"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  Курорты
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-premium-gold transition-colors"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-white/80">
              <li>Email: info@lavacanzabianca.com</li>
              <li>Телефон: +7 (900) 000-00-00</li>
              <li className="flex space-x-4 mt-4">
                <a
                  href="https://wa.me/79000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-premium-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; {currentYear} La Vacanza Bianca. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

