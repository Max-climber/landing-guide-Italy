import { useState, useEffect } from 'react'
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

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    
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
