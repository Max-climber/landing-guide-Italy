const ArticleAuthor = ({ author }) => {
  if (!author?.name) return null

  return (
    <section className="article-author mt-12 rounded-xl border border-border-soft bg-bg-card p-6 sm:flex sm:items-start sm:gap-6 sm:p-8">
      {author.photo ? (
        <div className="mb-4 shrink-0 sm:mb-0">
          <img
            src={author.photo}
            alt={author.photoAlt || author.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="min-w-0">
        {author.href ? (
          <a href={author.href} className="font-serif text-[20px] text-text-main no-underline hover:underline">
            {author.name}
          </a>
        ) : (
          <p className="font-serif text-[20px] text-text-main" style={{ fontWeight: 500 }}>
            {author.name}
          </p>
        )}
        {author.role ? (
          <p className="mt-1 font-sans text-[13px] uppercase tracking-[0.06em] text-text-light">{author.role}</p>
        ) : null}
        {author.bio ? <p className="mt-3 font-sans text-sm leading-7 text-text-light">{author.bio}</p> : null}
      </div>
    </section>
  )
}

export default ArticleAuthor
