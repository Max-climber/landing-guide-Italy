import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Instructor = () => {
  const { t } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

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
    <section className="instructor-section bg-white py-[100px] px-[50px]">
      <div className="instructor-container max-w-[1100px] mx-auto flex gap-[60px] items-center">
        <div className="instructor-text flex-1 text-left">
          <h2 className="instructor-title font-serif text-[36px] font-medium mb-5 text-text-main">
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
                preload="metadata"
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
    </section>
  )
}

export default Instructor
