import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const { t } = useTranslation()
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      console.error('Video element not found')
      return
    }

    const videoSrc = '/videos/hero-video.mp4'
    console.log('Инициализация видео:', {
      src: videoSrc,
      readyState: video.readyState,
      networkState: video.networkState
    })

    // Проверяем доступность видео файла
    fetch(videoSrc, { method: 'HEAD' })
      .then((response) => {
        if (response.ok) {
          console.log('Видео файл доступен:', {
            status: response.status,
            contentType: response.headers.get('content-type'),
            contentLength: response.headers.get('content-length')
          })
        } else {
          console.error('Видео файл недоступен:', response.status, response.statusText)
        }
      })
      .catch((error) => {
        console.error('Ошибка при проверке видео файла:', error)
      })

    // Принудительный запуск видео на мобильных устройствах
    const playVideo = async () => {
      try {
        video.muted = true
        console.log('Попытка запуска видео, readyState:', video.readyState)
        await video.play()
        console.log('Видео успешно запущено')
      } catch (error) {
        console.log('Автозапуск видео заблокирован:', error.message)
        // Если автозапуск заблокирован, пытаемся запустить после первого взаимодействия
        const handleInteraction = async () => {
          try {
            video.muted = true
            await video.play()
            console.log('Видео запущено после взаимодействия')
            document.removeEventListener('touchstart', handleInteraction)
            document.removeEventListener('click', handleInteraction)
          } catch (e) {
            console.error('Ошибка при запуске видео:', e)
          }
        }
        document.addEventListener('touchstart', handleInteraction, { once: true })
        document.addEventListener('click', handleInteraction, { once: true })
      }
    }

    // Обработка ошибок загрузки видео
    const handleError = (e) => {
      const error = video.error
      console.error('Ошибка загрузки видео:', {
        code: error?.code,
        message: error?.message,
        networkState: video.networkState,
        readyState: video.readyState,
        src: video.src || video.querySelector('source')?.src
      })
    }
    video.addEventListener('error', handleError)

    // Отслеживание прогресса загрузки
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const loaded = (video.buffered.end(0) / video.duration) * 100
        console.log(`Видео загружено: ${loaded.toFixed(1)}%`)
      }
    }
    video.addEventListener('progress', handleProgress)

    // Запускаем видео после загрузки
    if (video.readyState >= 2) {
      console.log('Видео уже готово, запускаем сразу')
      playVideo()
    } else {
      console.log('Ожидание загрузки видео...')
      video.addEventListener('loadeddata', () => {
        console.log('Видео загружено (loadeddata)')
        playVideo()
      }, { once: true })
      video.addEventListener('canplay', () => {
        console.log('Видео готово к воспроизведению (canplay)')
        playVideo()
      }, { once: true })
      video.addEventListener('loadedmetadata', () => {
        console.log('Метаданные видео загружены:', {
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        })
      }, { once: true })
    }

    // Обеспечиваем зацикливание
    const handleEnded = () => {
      console.log('Видео закончилось, перезапускаем')
      video.currentTime = 0
      video.play().catch(() => {})
    }
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadeddata', playVideo)
      video.removeEventListener('canplay', playVideo)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      video.removeEventListener('progress', handleProgress)
    }
  }, [])

  return (
    <section
<<<<<<< HEAD
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Background Image - начинается с самого верха */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" style={{ top: 0 }}>
        <img
          src="/images/main-photo.png"
          alt="Горнолыжный курорт в Альпах"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
          loading="eager"
          onError={(e) => {
            // Fallback на jpg если png не найден
            if (e.target.src.endsWith('.png')) {
              e.target.src = '/images/main-photo.jpg'
            }
          }}
        />
      </div>

      {/* Content - по центру экрана */}
      <div className="hero-content">
        <h1 className="hero-title font-serif text-text-main mb-[10px] px-2 sm:px-4 drop-shadow-lg uppercase" style={{ fontSize: 'clamp(34px, 4.5vw, 68px)', letterSpacing: '0.07em', lineHeight: '1.1', fontWeight: '300', fontFamily: "'Cormorant Garamond', serif" }}>
          {t('hero.title')}
        </h1>
        <h2 className="hero-subtitle font-sans text-[#4A4A4A] mb-4 px-2 sm:px-4 drop-shadow-lg" style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', letterSpacing: '0.02em', fontWeight: '400' }}>
          {t('hero.subtitle')}
        </h2>
        <p className="hero-desc font-sans text-[#666666] mb-9 px-2 sm:px-4 max-w-[680px] mx-auto" style={{ fontSize: '18px', lineHeight: '1.45', fontWeight: '300' }}>
          {t('hero.description').replace('<br/>', '\n').split('\n').map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            window.dispatchEvent(new Event('openContactModal'))
          }}
          className="main-btn inline-block font-sans text-[13px] tracking-[0.14em] uppercase text-text-main bg-transparent border border-text-main px-[55px] py-[22px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-text-main hover:text-white hover:-translate-y-0.5 no-underline mx-4 sm:mx-0"
          style={{ fontWeight: '500' }}
        >
          {t('hero.cta')}
        </a>
=======
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        aria-label="Hero background video"
        onError={(e) => {
          const video = e.target
          console.error('Ошибка загрузки видео:', {
            error: video.error,
            networkState: video.networkState,
            readyState: video.readyState,
            src: video.src || video.querySelector('source')?.src
          })
        }}
        onLoadStart={() => console.log('Начало загрузки видео')}
        onLoadedMetadata={() => console.log('Метаданные видео загружены')}
        onLoadedData={() => console.log('Данные видео загружены')}
        onCanPlay={() => console.log('Видео готово к воспроизведению')}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Content */}
      <div className="relative z-10 container-max px-4 md:px-8 lg:px-16 text-center">
        <div>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-oswald font-semibold text-color3 mb-2 sm:mb-3 md:mb-4 max-w-4xl mx-auto px-2 sm:px-4 leading-snug drop-shadow-lg">
            {t('hero.subtitle')}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-oswald font-extrabold text-color3 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4 tracking-tight drop-shadow-lg"
            style={{ fontStretch: 'condensed' }}
          >
            {t('hero.title')}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-oswald font-semibold text-color3 mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto px-2 sm:px-4 leading-snug drop-shadow-lg">
            <span className="block">{t('hero.description').split('<br/>')[0]}</span>
            <span className="block">{t('hero.description').split('<br/>')[1]}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 justify-center px-2 sm:px-4">
            <button
              onClick={() => {
                const element = document.querySelector('#programs')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-color3 text-white rounded-lg font-oswald font-semibold text-sm sm:text-base md:text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('hero.ourPrograms')}
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#resorts')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-color3 text-white rounded-lg font-oswald font-semibold text-sm sm:text-base md:text-lg uppercase tracking-wider hover:bg-color3/90 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('hero.bestResorts')}
            </button>
          </div>
        </div>
>>>>>>> 033120d62b2d23478db4a5acc4631cdf9622de9f
      </div>
    </section>
  )
}

export default Hero
