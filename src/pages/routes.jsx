import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { normalizePathname } from '../activeRoutes'
import { parseBlogPath } from '../utils/blogRouting'
import {
  ITALY_STANDALONE_ARCHITECTURE,
  ITALY_STANDALONE_PEAKS,
  ITALY_STANDALONE_RIVIERA,
} from '../data/italyStandaloneTourConfigs'
import {
  ITALY_STANDALONE_ARCHITECTURE_EN,
  ITALY_STANDALONE_PEAKS_EN,
  ITALY_STANDALONE_RIVIERA_EN,
} from '../data/italyStandaloneTourConfigs.en'
import { isEnglishLocale } from '../utils/isEnglishLocale'
import ItalyPage from './ItalyPage'
import ItalyComoPage from './ItalyComoPage'
import ItalyComoVenicePage from './ItalyComoVenicePage'
import ItalyTourStandalonePage from './ItalyTourStandalonePage'
import AlpsSkiToursPage from './AlpsSkiToursPage'
import HomeHubPage from './HomeHubPage'
import SwitzerlandPage from './SwitzerlandPage'
import SwitzerlandStMoritzPage from './SwitzerlandStMoritzPage'
import UnderDevelopmentPage from './UnderDevelopmentPage'
import BlogListPage from './blog/BlogListPage'
import BlogArticlePage from './blog/BlogArticlePage'

function ItalyStandaloneTourRoute({ ru, en }) {
  const { i18n } = useTranslation()
  const config = useMemo(
    () => (isEnglishLocale(i18n.language) ? en : ru),
    [i18n.language, ru, en],
  )
  return <ItalyTourStandalonePage config={config} />
}

const STUB_PAGES = {
  '/france': {
    pageKey: 'france',
    canonical: 'https://vacanzabianca.ru/france/',
    backgroundImage: '/images/infographics/path-france.webp',
  },
}

export function getRouteComponent(pathname) {
  const path = normalizePathname(pathname)

  if (path === '/') return { Component: HomeHubPage }
  if (path === '/italy') return { Component: ItalyPage }
  if (path === '/switzerland') return { Component: SwitzerlandPage }
  if (path === '/switzerland/st-moritz') return { Component: SwitzerlandStMoritzPage }
  if (path === '/italy/tury-ozero-como') return { Component: ItalyComoPage }
  if (path === '/italy/tury-como-venezia') return { Component: ItalyComoVenicePage }
  if (path === '/italy/tury-liniya-vershin-dolomity') {
    return {
      Component: () => (
        <ItalyStandaloneTourRoute ru={ITALY_STANDALONE_PEAKS} en={ITALY_STANDALONE_PEAKS_EN} />
      ),
    }
  }
  if (path === '/italy/tury-arhitektura-sever-italii') {
    return {
      Component: () => (
        <ItalyStandaloneTourRoute ru={ITALY_STANDALONE_ARCHITECTURE} en={ITALY_STANDALONE_ARCHITECTURE_EN} />
      ),
    }
  }
  if (path === '/italy/tury-riviera-liguria') {
    return {
      Component: () => (
        <ItalyStandaloneTourRoute ru={ITALY_STANDALONE_RIVIERA} en={ITALY_STANDALONE_RIVIERA_EN} />
      ),
    }
  }
  if (path === '/alps/gornolyzhnye-tury') return { Component: AlpsSkiToursPage }

  const blogRoute = parseBlogPath(path)
  if (blogRoute?.type === 'list') {
    const { category, page } = blogRoute
    return {
      Component: () => <BlogListPage category={category} page={page} />,
    }
  }
  if (blogRoute?.type === 'article') {
    const { slug } = blogRoute
    return {
      Component: () => <BlogArticlePage slug={slug} />,
    }
  }

  const stub = STUB_PAGES[path]
  if (stub) {
    const { pageKey, canonical, backgroundImage } = stub
    return {
      Component: () => (
        <UnderDevelopmentPage pageKey={pageKey} canonical={canonical} backgroundImage={backgroundImage} />
      ),
    }
  }

  return null
}
