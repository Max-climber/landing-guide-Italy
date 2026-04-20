export function upsertMeta({ title, description, canonical, ogImage }) {
  if (title) document.title = title

  const setMeta = (attr, key, value) => {
    if (!value) return
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', value)
  }

  const setCanonical = (href) => {
    if (!href) return
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }

  if (description) setMeta('name', 'description', description)
  if (canonical) setCanonical(canonical)

  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:image', ogImage)

  setMeta('property', 'twitter:title', title)
  setMeta('property', 'twitter:description', description)
  setMeta('property', 'twitter:image', ogImage)
}

export function mountJsonLd(idPrefix, entries) {
  if (!Array.isArray(entries)) return () => {}

  entries.forEach((entry, index) => {
    const id = `${idPrefix}-${index}`
    let script = document.getElementById(id)
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(entry)
  })

  return () => {
    entries.forEach((_, index) => {
      const script = document.getElementById(`${idPrefix}-${index}`)
      if (script) script.remove()
    })
  }
}

