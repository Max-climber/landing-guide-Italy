import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import TelegramFloatButton from '../../components/TelegramFloatButton'
import BreadcrumbTrail from '../../components/blog/BreadcrumbTrail'
import BlogCategories from '../../components/blog/BlogCategories'
import BlogCard from '../../components/blog/BlogCard'
import BlogPagination from '../../components/blog/BlogPagination'
import { BLOG_INDEX_META } from '../../data/blog/config.js'
import { BLOG_ORIGIN } from '../../data/blog/index.js'
import {
  getArticlesByCategory,
  getArticleCanonical,
  getListCanonical,
  getListPath,
  paginateArticles,
} from '../../data/blog/index.js'
import {
  formatBlogPageTitle,
  resolveBlogCategory,
  resolveBlogIndexMeta,
} from '../../data/blog/resolveBlogLocale.js'
import { mountJsonLd, upsertMeta, upsertPaginationLinks } from '../seo/pageMeta'

const BlogListPage = ({ category: categorySlug = null, page = 1 }) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [isModalOpen, setIsModalOpen] = useState(false)

  const category = categorySlug ? resolveBlogCategory(categorySlug, lang) : null
  const indexMeta = resolveBlogIndexMeta(lang)
  const allArticles = getArticlesByCategory(categorySlug, lang)
  const { items, totalPages, page: currentPage, hasPrev, hasNext } = paginateArticles(allArticles, page)

  const meta = useMemo(() => {
    if (category) {
      return {
        title: formatBlogPageTitle(category.metaTitle, currentPage, lang),
        description: category.metaDescription,
        h1: category.h1,
        intro: category.intro,
        canonical: getListCanonical({ category: categorySlug, page: currentPage }),
        robots: category.indexable ? 'index, follow' : 'noindex, follow',
      }
    }
    return {
      title: formatBlogPageTitle(indexMeta.metaTitle, currentPage, lang),
      description: indexMeta.metaDescription,
      h1: indexMeta.h1,
      intro: indexMeta.intro,
      canonical: getListCanonical({ category: null, page: currentPage }),
      robots: 'index, follow',
    }
  }, [category, categorySlug, currentPage, indexMeta, lang])

  const breadcrumbItems = useMemo(() => {
    const crumbs = [
      { label: t('blogPage.home'), href: '/' },
      { label: t('blogPage.blog'), href: '/blog/' },
    ]
    if (category) {
      crumbs.push({ label: category.label })
    } else if (currentPage > 1) {
      crumbs.push({ label: t('blogPage.page', { n: currentPage }) })
    } else {
      crumbs[1] = { label: t('blogPage.blog') }
    }
    return crumbs
  }, [category, currentPage, t])

  const jsonLd = useMemo(() => {
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(item.href ? { item: `https://vacanzabianca.ru${item.href.replace(/\/+$/, '')}/` } : {}),
      })),
    }

    const collection = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: meta.h1,
      description: meta.description,
      url: meta.canonical,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: getArticleCanonical(article.slug),
          name: article.h1,
        })),
      },
    }

    return [breadcrumb, collection]
  }, [breadcrumbItems, items, meta])

  useEffect(() => {
    upsertMeta({
      title: meta.title,
      description: meta.description,
      canonical: meta.canonical,
      ogImage: `${BLOG_ORIGIN}${BLOG_INDEX_META.ogImage}`,
      robots: meta.robots,
    })

    upsertPaginationLinks({
      prev: hasPrev ? getListCanonical({ category: categorySlug, page: currentPage - 1 }) : null,
      next: hasNext ? getListCanonical({ category: categorySlug, page: currentPage + 1 }) : null,
    })

    const unmount = mountJsonLd('blog-list-jsonld', jsonLd)
    return () => {
      unmount()
      upsertPaginationLinks({ prev: null, next: null })
    }
  }, [categorySlug, currentPage, hasNext, hasPrev, jsonLd, meta])

  useEffect(() => {
    const onOpen = () => setIsModalOpen(true)
    window.addEventListener('openContactModal', onOpen)
    return () => window.removeEventListener('openContactModal', onOpen)
  }, [])

  if (currentPage > 1 && items.length === 0) {
    window.location.replace(getListPath({ category: categorySlug, page: 1 }))
    return null
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <BreadcrumbTrail items={breadcrumbItems} ariaLabel={t('blogPage.breadcrumbAria')} />
      <main className="pb-16 pt-8 sm:pt-10 md:pt-12">
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h1 className="section-title !mb-5 !text-left">{meta.h1}</h1>
          <p className="mb-8 max-w-[760px] font-sans text-base leading-8 text-text-light">{meta.intro}</p>

          <BlogCategories activeCategory={categorySlug} />

          {items.length ? (
            <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.map((article, index) => (
                <li key={article.slug} className="min-w-0">
                  <BlogCard article={article} eagerImage={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 font-sans text-base text-text-light">
              {category ? t('blogPage.emptyCategory') : t('blogPage.emptyBlog')}
            </p>
          )}

          <BlogPagination category={categorySlug} page={currentPage} totalPages={totalPages} />
        </section>
      </main>
      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default BlogListPage
