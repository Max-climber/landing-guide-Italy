import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import TelegramFloatButton from '../../components/TelegramFloatButton'
import BreadcrumbTrail from '../../components/blog/BreadcrumbTrail'
import BlogCard from '../../components/blog/BlogCard'
import ArticleHero from '../../components/blog/article/ArticleHero'
import ArticleContent, { extractHeadings } from '../../components/blog/article/ArticleContent'
import ArticleCta from '../../components/blog/article/ArticleCta'
import ArticleToc from '../../components/blog/article/ArticleToc'
import ArticleFaq from '../../components/blog/article/ArticleFaq'
import ArticleAuthor from '../../components/blog/article/ArticleAuthor'
import { getArticleBySlug, getArticleCanonical, getRelatedArticles, BLOG_ORIGIN } from '../../data/blog/index.js'
import { resolveBlogCategory } from '../../data/blog/resolveBlogLocale.js'
import { isEnglishLocale } from '../../utils/isEnglishLocale.js'
import { mountJsonLd, upsertMeta } from '../seo/pageMeta'
import { buildFaqPageJsonLd } from '../seo/faqSchema'
import {
  buildArticleAuthorSchema,
  buildPublisherSchema,
  SITE_ORIGIN,
  toSchemaDateTime,
} from '../seo/organizationSchema'

const formatDate = (iso, lang) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(isEnglishLocale(lang) ? 'en-GB' : 'ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const BlogArticlePage = ({ slug }) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [isModalOpen, setIsModalOpen] = useState(false)
  const article = getArticleBySlug(slug, lang)

  const category = article ? resolveBlogCategory(article.category, lang) : null
  const headings = useMemo(() => {
    const h = extractHeadings(article?.blocks)
    if (article?.faq?.length) {
      h.push({ id: 'article-faq', text: t('blogPage.faqHeading'), level: 2 })
    }
    return h
  }, [article, t])
  const related = useMemo(() => (article ? getRelatedArticles(article, 3, lang) : []), [article, lang])

  const breadcrumbItems = useMemo(() => {
    if (!article) return []
    return [
      { label: t('blogPage.home'), href: '/' },
      { label: t('blogPage.blog'), href: '/blog/' },
      { label: article.h1 },
    ]
  }, [article, t])

  const jsonLd = useMemo(() => {
    if (!article) return []

    const canonical = getArticleCanonical(article.slug)
    const origin = SITE_ORIGIN

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('blogPage.home'), item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: t('blogPage.blog'), item: `${origin}/blog/` },
        { '@type': 'ListItem', position: 3, name: article.h1, item: canonical },
      ],
    }

    const blogPosting = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.h1,
      description: article.metaDescription,
      image: `${origin}${article.heroImage}`,
      datePublished: toSchemaDateTime(article.publishedAt),
      dateModified: toSchemaDateTime(article.updatedAt || article.publishedAt),
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      inLanguage: isEnglishLocale(lang) ? 'en' : 'ru',
      author: buildArticleAuthorSchema(article.author, origin),
      publisher: buildPublisherSchema(),
    }

    const entries = [breadcrumb, blogPosting]

    if (article.faq?.length) {
      entries.push(
        buildFaqPageJsonLd(
          article.faq.map((f) => ({ question: f.question, answerHtml: `<p>${f.answer}</p>` })),
        ),
      )
    }

    return entries
  }, [article, lang, t])

  useEffect(() => {
    if (!article) return undefined

    upsertMeta({
      title: article.metaTitle,
      description: article.metaDescription,
      canonical: getArticleCanonical(article.slug),
      ogImage: `${BLOG_ORIGIN}${article.heroImage}`,
      robots: 'index, follow',
    })

    const unmount = mountJsonLd('blog-article-jsonld', jsonLd)
    return () => unmount()
  }, [article, jsonLd])

  useEffect(() => {
    const onOpen = () => setIsModalOpen(true)
    window.addEventListener('openContactModal', onOpen)
    return () => window.removeEventListener('openContactModal', onOpen)
  }, [])

  if (!article) return null

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <BreadcrumbTrail
        items={breadcrumbItems}
        ariaLabel={t('blogPage.breadcrumbAria')}
        mobileBackLink={{ label: t('blogPage.backToBlog'), href: '/blog/' }}
      />
      <main className="pb-16 pt-8 sm:pt-10 md:pt-12">
        <article className="mx-auto w-full max-w-[800px] min-w-0 px-4 sm:px-6 md:px-8 lg:px-5">
          {category ? (
            <a
              href={category.path}
              className="mb-3 inline-block font-sans text-[11px] uppercase tracking-[0.1em] text-text-light no-underline transition-colors hover:text-text-main"
            >
              {article.categoryLabel || category.label}
            </a>
          ) : null}

          <h1 className="section-title !mb-4 !text-left !text-[clamp(26px,5.5vw,42px)] !leading-tight">{article.h1}</h1>

          <p className="mb-6 font-sans text-[15px] leading-7 text-text-light sm:text-base sm:leading-8">{article.lead}</p>

          <ArticleHero
            src={article.heroImage}
            alt={article.heroAlt || article.h1}
            width={article.heroWidth}
            height={article.heroHeight}
            caption={article.heroCaption}
            credit={article.heroCredit}
            publishedLabel={`${t('blogPage.published')}: ${formatDate(article.publishedAt, lang)}`}
            readingLabel={article.readingMinutes ? t('blogPage.minRead', { n: article.readingMinutes }) : null}
            eager
          />

          <ArticleToc headings={headings} />
          <ArticleContent blocks={article.blocks} />

          {article.faq?.length ? <ArticleFaq items={article.faq} /> : null}

          {article.closing?.cta ? (
            <ArticleCta {...article.closing.cta} />
          ) : article.closing?.html ? (
            <p
              className="mb-6 font-sans text-base leading-8 text-text-main"
              dangerouslySetInnerHTML={{ __html: article.closing.html }}
            />
          ) : null}

          {article.author ? <ArticleAuthor author={article.author} /> : null}
        </article>

        {related.length ? (
          <section className="mx-auto mt-16 w-full max-w-[1200px] border-t border-border-soft px-4 pt-12 sm:px-6 md:px-8 lg:px-5">
            <h2 className="section-title !mb-8 !text-left !text-[clamp(26px,3.5vw,34px)]">
              {t('blogPage.relatedHeading')}
            </h2>
            <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((rel) => (
                <li key={rel.slug} className="min-w-0">
                  <BlogCard article={rel} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default BlogArticlePage
