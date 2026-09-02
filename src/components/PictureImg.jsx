import { useState } from 'react'

/**
 * Надёжная картинка: AVIF для современных браузеров + WebP/JPEG fallback.
 * Если AVIF отсутствует (SPA отдаёт HTML 200), снимаем <source> и показываем webp.
 */
function encodeSrc(src) {
  if (typeof src !== 'string' || src.length === 0) return src
  try {
    return src
      .split('/')
      .map((segment, index) => {
        if (segment === '' && index === 0) return ''
        try {
          return encodeURIComponent(decodeURIComponent(segment))
        } catch {
          return encodeURIComponent(segment)
        }
      })
      .join('/')
  } catch {
    return src
  }
}

function toAvifSrc(src) {
  if (typeof src !== 'string' || !/\.webp$/i.test(src)) return null
  return src.replace(/\.webp$/i, '.avif')
}

const PictureImg = ({
  src,
  avifSrc,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  style,
  onError,
  ...rest
}) => {
  const [skipAvif, setSkipAvif] = useState(false)
  const resolvedAvif = skipAvif ? null : avifSrc || toAvifSrc(src)
  const encodedSrc = encodeSrc(src)
  const encodedAvif = resolvedAvif ? encodeSrc(resolvedAvif) : null

  const handleError = (event) => {
    // SPA часто отдаёт HTML 200 вместо отсутствующего .avif — тогда <source> ломает картинку.
    if (resolvedAvif && !skipAvif) {
      setSkipAvif(true)
      return
    }
    onError?.(event)
  }

  const imgProps = {
    src: encodedSrc,
    alt,
    className,
    width,
    height,
    loading,
    decoding,
    fetchPriority,
    style,
    onError: handleError,
    ...rest,
  }

  if (!encodedAvif) {
    return <img {...imgProps} />
  }

  return (
    <picture>
      <source
        srcSet={encodedAvif}
        type="image/avif"
        onError={() => setSkipAvif(true)}
      />
      <img {...imgProps} />
    </picture>
  )
}

export default PictureImg
