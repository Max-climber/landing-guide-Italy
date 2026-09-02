import { useTranslation } from 'react-i18next'
import ArticleCallout from './ArticleCallout'
import ArticleCta from './ArticleCta'

const headingTag = (level) => {
  if (level === 3) return 'h3'
  if (level === 4) return 'h4'
  return 'h2'
}

const ArticleContent = ({ blocks }) => {
  const { t } = useTranslation()

  if (!blocks?.length) return null

  return (
    <div className="article-content">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'paragraph') {
          return (
            <p
              key={key}
              className="mb-5 font-sans text-base leading-8 text-text-main [&_a]:text-text-main [&_a]:underline [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          )
        }

        if (block.type === 'heading') {
          const Tag = headingTag(block.level)
          return (
            <Tag
              key={key}
              id={block.id}
              className={`article-heading scroll-mt-28 ${
                block.level === 3
                  ? 'mb-4 mt-8 font-sans text-[20px] font-medium text-text-main sm:text-[22px]'
                  : block.level === 4
                    ? 'mb-3 mt-6 font-sans text-[18px] font-medium text-text-main'
                    : 'section-title !mb-5 !mt-10 !text-left !text-[clamp(26px,3.5vw,34px)]'
              }`}
            >
              {block.text}
            </Tag>
          )
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul'
          return (
            <ListTag
              key={key}
              className={`mb-5 space-y-2 pl-5 font-sans text-base leading-8 text-text-main ${
                block.ordered ? 'list-decimal' : 'list-disc'
              }`}
            >
              {block.items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ListTag>
          )
        }

        if (block.type === 'table') {
          return (
            <div key={key} className="article-table-wrap mb-6 overflow-x-auto">
              <table className="article-table w-full min-w-[480px] border-collapse text-left font-sans text-sm">
                <thead>
                  <tr>
                    {block.headers.map((h) => (
                      <th key={h} className="border border-border-soft bg-bg-warm px-4 py-3 font-medium text-text-main">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="border border-border-soft px-4 py-3 text-text-light">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        if (block.type === 'image') {
          const img = (
            <img
              src={block.src}
              alt={block.alt || ''}
              width={block.width || 1200}
              height={block.height || 800}
              className="h-auto w-full rounded-lg object-cover"
              loading={block.lazy !== false ? 'lazy' : 'eager'}
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
            />
          )
          return (
            <figure key={key} className="article-figure mb-6 min-w-0">
              {block.href ? (
                <a href={block.href} className="block">
                  {img}
                </a>
              ) : (
                img
              )}
              {(block.caption || block.credit) ? (
                <figcaption className="mt-2 font-sans text-[12px] leading-6 text-text-light sm:text-[13px]">
                  {block.caption ? <span className="block italic">{block.caption}</span> : null}
                  {block.credit ? (
                    <span
                      className={`block break-words italic text-[#999] [overflow-wrap:anywhere]${block.caption ? ' mt-1' : ''}`}
                    >
                      {t('blogPage.source')}: {block.credit}
                    </span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        if (block.type === 'callout') {
          return <ArticleCallout key={key} variant={block.variant} html={block.html} />
        }

        if (block.type === 'cta') {
          return (
            <ArticleCta
              key={key}
              title={block.title}
              text={block.text}
              buttonText={block.buttonText}
              href={block.href}
              action={block.action}
            />
          )
        }

        return null
      })}
    </div>
  )
}

export function extractHeadings(blocks) {
  return (blocks || [])
    .filter((b) => b.type === 'heading' && b.level === 2 && b.id && b.text)
    .map((b) => ({ id: b.id, text: b.text, level: b.level }))
}

export default ArticleContent
