/**
 * Карточки избранных статей блога (превью + заголовок).
 * @param {{ title: string, description?: string, image: string, href: string }[]} items
 */
const BlogFeaturedSection = ({ heading, items, allArticlesLabel, className = 'mt-20' }) => {
  if (!items?.length) return null

  return (
    <section className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5 ${className}`}>
      <h2 className="section-title !mb-10 text-center text-[clamp(28px,4vw,38px)]">{heading}</h2>
      <ul className="mx-auto max-w-[640px] divide-y divide-border-soft rounded-xl border border-border-soft bg-bg-card/80 px-2 py-1 sm:px-3">
        {items.map((post, idx) => (
          <li key={`${post.href}-${idx}`}>
            <a
              href={post.href}
              className="group flex gap-3 py-3.5 pl-2 pr-2 transition-colors hover:bg-bg-base/60 sm:gap-4 sm:py-4 sm:pl-3 sm:pr-3"
            >
              <div className="relative h-14 w-[5.25rem] flex-shrink-0 overflow-hidden rounded-lg border border-border-soft sm:h-[4.5rem] sm:w-24">
                <img
                  src={post.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-serif text-[17px] leading-snug text-text-main transition-colors group-hover:text-text-main sm:text-[18px]"
                  style={{ fontWeight: 400 }}
                >
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-text-light">{post.description}</p>
                ) : null}
              </div>
              <span
                className="hidden flex-shrink-0 self-center font-sans text-[11px] text-[#bbb] transition-colors group-hover:text-text-main sm:inline"
                aria-hidden
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <a
          href="/blog/"
          className="inline-flex rounded-[40px] border border-text-main px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
        >
          {allArticlesLabel}
        </a>
      </div>
    </section>
  )
}

export default BlogFeaturedSection
