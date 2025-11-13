import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Programs from './components/Programs'
import Resorts from './components/Resorts'
import Conditions from './components/Conditions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NewYearGift from './components/NewYearGift'
import NewYearModal from './components/NewYearModal'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrollY={scrollY} />
      <Hero />
      <About />
      <Programs />
      <Resorts />
      <Conditions />
      <Contact />
      <Footer />
      
      {/* Новогодний подарок */}
      <NewYearGift onClick={() => setIsModalOpen(true)} />
      
      {/* Модальное окно со скидкой */}
      <NewYearModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App
