import { useState, useEffect, useRef } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import WhyUs from './components/WhyUs'
import Programs from './components/Programs'
import Resorts from './components/Resorts'
import Conditions from './components/Conditions'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    
    // Используем passive для лучшей производительности на мобильных
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrollY={scrollY} />
      <Hero />
      <About />
      <WhyUs />
      <Programs />
      <Resorts />
      <Conditions />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
