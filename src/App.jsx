import Navigation from './components/Navigation'
import Hero from './components/Hero'
import WhyUsSection from './components/WhyUsSection'
import About from './components/About'
import Steps from './components/Steps'
import Programs from './components/Programs'
import Resorts from './components/Resorts'
import Reviews from './components/Reviews'
import Individual from './components/Individual'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TelegramFloatButton from './components/TelegramFloatButton'

function App() {

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WhyUsSection />
      <About />
      <Steps />
      <Programs />
      <Resorts />
      <Reviews />
      <Individual />
      <Contact />
      <Footer />
      <TelegramFloatButton />
    </div>
  )
}

export default App
