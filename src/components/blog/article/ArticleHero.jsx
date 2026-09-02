import { useTranslation } from 'react-i18next'

const ArticleHero = ({
  src,
  alt,
  width,
  height,
  caption,
  credit,
  eager = true,
  publishedLabel,
  readingLabel,
}) => {
  const { t } = useTranslation()

  return (
    <figure className="article-hero mb-8 overflow-hidden rounded-xl">
      <div className="relative">
        <img
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 800}
          className="h-auto w-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
        />
        {publishedLabel || readingLabel ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-4">
            {publishedLabel ? (
              <span className="max-w-[58%] rounded-md bg-black/50 px-2 py-1 font-sans text-[10px] leading-snug text-white backdrop-blur-sm sm:max-w-none sm:px-2.5 sm:text-[13px]">
                {publishedLabel}
              </span>
            ) : (
              <span className="hidden sm:block" />
            )}
            {readingLabel ? (
              <span className="ml-auto max-w-[42%] rounded-md bg-black/50 px-2 py-1 text-right font-sans text-[10px] leading-snug text-white backdrop-blur-sm sm:max-w-none sm:px-2.5 sm:text-[13px]">
                {readingLabel}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      {caption || credit ? (
        <figcaption className="mt-2 font-sans text-[12px] leading-6 text-text-light sm:text-[13px]">
          {caption ? <span className="block italic">{caption}</span> : null}
          {credit ? (
            <span
              className={`block break-words italic text-[#999] [overflow-wrap:anywhere]${caption ? ' mt-1' : ''}`}
            >
              {t('blogPage.source')}: {credit}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default ArticleHero
