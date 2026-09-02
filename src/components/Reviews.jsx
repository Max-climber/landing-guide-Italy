import { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const REVIEW_VARDAN_IMG = '/images/reviews/vardan.webp'
const REVIEW_KSENIA_IMG = '/images/reviews/ksenia.webp'
const REVIEW_OLGA_IMG = '/images/reviews/olga.webp'

const Reviews = () => {
  const { t } = useTranslation()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
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
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        videoRef.current.play()
        setIsVideoPlaying(true)
      }
    }
  }

  const handleVideoEnd = () => {
    setIsVideoPlaying(false)
  }

  const reviews = useMemo(
    () => [
      {
        name: t('reviews.review1.name'),
        tour: t('reviews.review1.tour'),
        photo: REVIEW_VARDAN_IMG,
        text: t('reviews.review1.text'),
      },
      {
        name: t('reviews.review2.name'),
        tour: t('reviews.review2.tour'),
        photo: REVIEW_KSENIA_IMG,
        text: t('reviews.review2.text'),
      },
      {
        name: t('reviews.review3.name'),
        tour: t('reviews.review3.tour'),
        photo: REVIEW_OLGA_IMG,
        text: t('reviews.review3.text'),
      },
    ],
    [t],
  )

  return (
    <section id="reviews" className="reviews-section scroll-mt-28 bg-bg-base py-[60px] sm:py-[80px] md:py-[100px] px-4">
      <h2 className="section-header-title font-serif text-[42px] text-text-main mb-5 tracking-[0.02em] text-center" style={{ fontWeight: '300' }}>
        {t('reviews.title')}
      </h2>
      <p className="section-header-desc text-lg font-sans text-text-light mb-[70px] text-center" style={{ fontWeight: '400' }}>
        {t('reviews.subtitle')}
      </p>

      <div className="reviews-video-top w-full max-w-[1100px] mx-auto mb-[60px] text-center px-4">
        <div className="video-wrapper aspect-video relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer bg-bg-card" onClick={handleVideoClick}>
          {!isVideoPlaying ? (
            <>
              <video
                ref={videoRef}
                src="/videos/reviews/elena-review.optimized.mov"
                poster="/images/infographics/заставка-видео-отзыв.webp"
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
              src="/videos/reviews/elena-review.optimized.mov"
              poster="/images/infographics/заставка-видео-отзыв.webp"
              className="w-full h-full object-cover"
              controls
              autoPlay
              preload="metadata"
              onEnded={handleVideoEnd}
            />
          )}
        </div>
        <div className="review-video-caption font-serif text-[22px] mt-[15px] text-text-main">
          {t('reviews.videoCaption')}
        </div>
      </div>

      <div className="reviews-grid flex justify-center gap-[30px] max-w-[1200px] mx-auto flex-wrap" style={{ boxSizing: 'border-box', width: '100%', paddingLeft: '0', paddingRight: '0', marginLeft: 'auto', marginRight: 'auto' }}>
        {reviews.map((review, idx) => (
          <div key={idx} className="review-card bg-white border border-border-soft rounded-xl p-[35px_30px] w-[350px] min-w-[350px] max-w-[350px] text-left shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex-shrink-0" style={{ boxSizing: 'border-box' }}>
            <div className="review-header flex items-center mb-5">
              <img
                src={review.photo}
                alt={review.name}
                className="client-photo w-[60px] h-[60px] rounded-full object-cover mr-[15px]"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/main-photo.webp'
                }}
              />
              <div className="client-info">
                <h4 className="m-0 font-serif text-lg text-text-main">{review.name}</h4>
                <span className="font-sans text-xs text-[#999] uppercase">{review.tour}</span>
              </div>
            </div>
            <p className="review-text font-sans text-sm leading-[1.6] text-text-light italic">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
