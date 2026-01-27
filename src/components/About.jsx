import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

const About = () => {
  const { t } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Создаем превью из первого кадра видео
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const createPoster = () => {
      if (video.poster) return // Превью уже создано
      
      if (video.readyState >= 2) {
        // Видео готово, создаем превью
        video.currentTime = 0.1
        const checkFrame = () => {
          if (video.readyState >= 2 && !video.poster) {
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            video.poster = canvas.toDataURL('image/jpeg', 0.9)
            video.currentTime = 0
          }
        }
        video.addEventListener('seeked', checkFrame, { once: true })
      }
    }

    video.addEventListener('loadedmetadata', createPoster)
    if (video.readyState >= 1) {
      createPoster()
    }

    return () => {
      video.removeEventListener('loadedmetadata', createPoster)
    }
  }, [])

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  return (
    <section
      id="about"
      className="features-section bg-bg-base pt-0 pb-[100px] px-0 text-text-main text-center"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Блок 2: Текст и карточки преимуществ */}
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-[50px] py-[60px] sm:py-[80px]" style={{ boxSizing: 'border-box' }}>
        <p className="section-subtitle font-sans text-[20px] leading-[1.6] text-[#4A4A4A] max-w-[800px] mx-auto mb-[80px]" style={{ fontWeight: '400' }}>
          {t('about.subtitle')}
        </p>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mb-20">
          {[
            {
              image: '/images/infographics/experience.png',
              name: t('about.features.experience.title'),
              desc: t('about.features.experience.desc')
            },
            {
              image: '/images/infographics/individual.png',
              name: t('about.features.individual.title'),
              desc: t('about.features.individual.desc')
            },
            {
              image: '/images/infographics/logistics.png',
              name: t('about.features.logistics.title'),
              desc: t('about.features.logistics.desc')
            },
            {
              image: '/images/infographics/comfort.png',
              name: t('about.features.comfort.title'),
              desc: t('about.features.comfort.desc')
            }
          ].map((feature, idx) => (
            <div key={idx} className="feature-card card bg-bg-card border border-border-soft rounded-xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center w-full" style={{ boxSizing: 'border-box' }}>
              <div className="icon-box w-full mb-[35px] text-text-main flex justify-center items-center" style={{ height: '100px' }}>
                <img 
                  src={feature.image} 
                  alt={feature.name}
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: 'multiply', maxHeight: '100px', width: 'auto', height: '100px' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="feature-name font-serif text-[24px] uppercase tracking-[0.05em] mb-[15px] text-text-main text-center" style={{ fontWeight: '300' }}>
                {feature.name}
              </h3>
              <p className="feature-desc font-sans text-[14px] leading-[1.6] text-[#555555] text-center flex-grow" style={{ fontWeight: '400' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Блок 3: Фото семьи на лыжах (без размытия) */}
      <div className="feature-image-wrapper-full about-image-transparent-nav w-full relative overflow-hidden" style={{ marginTop: 0, marginBottom: 0, height: isMobile ? '50vh' : '100vh', minHeight: isMobile ? '50vh' : '100vh' }}>
        <img
          src="/images/about/family-skiing.jpeg"
          alt="Семья на лыжах в Альпах"
          className="w-full h-full object-cover block"
          style={{ width: '100%', height: '100%', objectPosition: 'center bottom', display: 'block' }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Блок 4: "Ваш гид и организатор" */}
      <div id="instructor" className="instructor-section bg-bg-base py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-[50px]">
        <div className="instructor-container max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-[60px] items-center">
          <div className="instructor-text flex-1 text-left">
            <h2 className="section-header-title font-serif text-[42px] mb-5 text-text-main tracking-[0.02em]" style={{ fontWeight: '300' }}>
              {t('instructor.title')}
            </h2>
            <div className="instructor-quote-box border-none bg-transparent p-0">
              <p className="instructor-desc font-sans text-base leading-[1.7] text-text-light m-0">
                {t('instructor.description')}
              </p>
            </div>
          </div>
          <div className="video-wrapper instructor-video flex-1 aspect-video relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer bg-black" onClick={handleVideoClick}>
            {!isPlaying ? (
              <>
                <video
                  ref={videoRef}
                  src="/videos/guide-section.mp4"
                  className="video-cover w-full h-full object-cover opacity-90 transition-all duration-500"
                  onEnded={handleVideoEnd}
                  preload="none"
                  playsInline
                />
                <div className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 z-[2] hover:scale-110 hover:bg-white">
                  <svg className="w-5 h-5 fill-text-main ml-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </>
            ) : (
              <video
                ref={videoRef}
                src="/videos/guide-section.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
                onEnded={handleVideoEnd}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
