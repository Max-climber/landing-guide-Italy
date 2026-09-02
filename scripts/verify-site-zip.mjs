/**
 * Проверка dist/ и site.zip перед выкладкой на хостинг.
 */
import { readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { getSitemapPathnames, toSitemapLoc } from '../src/sitemapPaths.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const zipPath = join(root, 'site.zip')
const ORIGIN = 'https://vacanzabianca.ru'

const EXPECTED_SITEMAP_LOCS = getSitemapPathnames().map((p) => toSitemapLoc(ORIGIN, p))

const PRERENDERED_PATHS = [
  { rel: 'index.html', label: 'главная', needle: '<h1' },
  { rel: 'italy/index.html', label: '/italy/', needle: '<h1' },
  { rel: 'switzerland/index.html', label: '/switzerland/', needle: 'Авторские туры в Швейцарию' },
  { rel: 'alps/gornolyzhnye-tury/index.html', label: '/alps/gornolyzhnye-tury/', needle: 'Горнолыжные' },
  { rel: 'italy/tury-ozero-como/index.html', label: '/italy/tury-ozero-como/', needle: '<h1' },
  { rel: 'italy/tury-como-venezia/index.html', label: '/italy/tury-como-venezia/', needle: '<h1' },
  { rel: 'italy/tury-liniya-vershin-dolomity/index.html', label: '/italy/tury-liniya-vershin-dolomity/', needle: '<h1' },
  { rel: 'blog/index.html', label: '/blog/', needle: 'Блог Vacanza Bianca' },
  { rel: 'france/index.html', label: '/france/', needle: 'noindex' },
]

const REQUIRED_ROOT = [
  'index.html',
  '404.html',
  '.htaccess',
  'robots.txt',
  'sitemap.xml',
]

const errors = []
const ok = []

function pass(msg) {
  ok.push(`✓ ${msg}`)
}

function fail(msg) {
  errors.push(`✗ ${msg}`)
}

async function fileExists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function checkDist() {
  for (const name of REQUIRED_ROOT) {
    if (await fileExists(join(dist, name))) pass(`dist/${name}`)
    else fail(`нет dist/${name}`)
  }

  const [indexStat, err404Stat] = await Promise.all([
    stat(join(dist, 'index.html')),
    stat(join(dist, '404.html')),
  ])
  if (indexStat.size > err404Stat.size * 2) {
    pass(`index.html (${indexStat.size} B) больше 404.html (${err404Stat.size} B) — пререндер есть`)
  } else {
    fail(`index.html (${indexStat.size} B) слишком мал — похоже, пререндер не сработал`)
  }

  for (const { rel, label, needle } of PRERENDERED_PATHS) {
    const filePath = join(dist, rel)
    if (!(await fileExists(filePath))) {
      fail(`нет пререндера: ${rel} (${label})`)
      continue
    }
    const html = await readFile(filePath, 'utf8')
    const rootStart = html.indexOf('<div id="root"')
    const rootEnd = rootStart >= 0 ? html.lastIndexOf('</div>', html.indexOf('</body>')) : -1
    const rootLen =
      rootStart >= 0 && rootEnd > rootStart ? html.slice(rootStart, rootEnd + 6).length : 0
    if (rootLen < 5000 && !label.includes('france')) {
      fail(`пререндер ${label}: мало контента в #root (${rootLen} символов)`)
    } else if (!html.includes(needle)) {
      fail(`пререндер ${label}: нет ожидаемого контента «${needle}»`)
    } else {
      pass(`пререндер ${label}: ${rootLen} символов в #root`)
    }
  }

  const seoHeadChecks = [
    {
      rel: 'italy/index.html',
      label: '/italy/',
      mustNot: ['id="home-jsonld-faq"'],
      mustHave: ['id="italy-jsonld-faq"'],
    },
    {
      rel: 'switzerland/index.html',
      label: '/switzerland/',
      mustNot: [
        'name="robots" content="noindex, follow"',
        'id="home-jsonld-faq"',
        'Подберем тур под ваш стиль путешествия',
      ],
      mustHave: [
        'id="switzerland-jsonld-faq"',
        'rel="canonical" href="https://vacanzabianca.ru/switzerland/"',
        'Авторские туры в Швейцарию',
        'Готовы к поездке в Швейцарию?',
        'trentino-guest.webp',
        'Трентино',
        'Слава',
      ],
    },
    {
      rel: 'blog/index.html',
      label: '/blog/',
      mustNot: ['id="home-jsonld-faq"'],
      mustHave: ['id="blog-list-jsonld-0"'],
    },
    {
      rel: 'france/index.html',
      label: '/france/',
      mustHave: ['name="robots" content="noindex, follow"'],
    },
  ]
  for (const { rel, label, mustNot = [], mustHave = [] } of seoHeadChecks) {
    const filePath = join(dist, rel)
    if (!(await fileExists(filePath))) continue
    const html = await readFile(filePath, 'utf8')
    for (const needle of mustNot) {
      if (html.includes(needle)) fail(`SEO ${label}: лишний ${needle}`)
      else pass(`SEO ${label}: нет ${needle}`)
    }
    for (const needle of mustHave) {
      if (html.includes(needle)) pass(`SEO ${label}: есть ${needle}`)
      else fail(`SEO ${label}: нет ${needle}`)
    }
    if (html.includes('127.0.0.1') || html.includes('localhost')) {
      fail(`SEO ${label}: в HTML есть localhost/127.0.0.1`)
    }
  }

  const robots = await readFile(join(dist, 'robots.txt'), 'utf8')
  if (robots.includes('Allow: /') && robots.includes('Sitemap: https://vacanzabianca.ru/sitemap.xml')) {
    pass('robots.txt: Allow + Sitemap')
  } else fail('robots.txt: неверное содержимое')

  const htaccess = await readFile(join(dist, '.htaccess'), 'utf8')
  const htChecks = [
    ['ErrorDocument 404 /404.html', 'ErrorDocument 404'],
    ['RewriteRule ^italy/?$ italy/index.html', 'маршрут /italy → italy/index.html'],
    ['RewriteRule ^switzerland/?$ switzerland/index.html', 'маршрут /switzerland → switzerland/index.html'],
    ['RewriteRule ^alps/gornolyzhnye-tury/?$ alps/gornolyzhnye-tury/index.html', 'маршрут /alps'],
    ['RewriteRule ^italy/tury-ozero-como/?$ italy/tury-ozero-como/index.html', 'маршрут /italy/tury-ozero-como'],
    ['RewriteRule ^italy/tury-como-venezia/?$ italy/tury-como-venezia/index.html', 'маршрут /italy/tury-como-venezia'],
    ['RewriteRule ^italy/tury-liniya-vershin-dolomity/?$ italy/tury-liniya-vershin-dolomity/index.html', 'маршрут доломиты'],
    ['RewriteRule ^france/?$ france/index.html', 'маршрут /france'],
    ['RewriteRule ^blog/?$ blog/index.html', 'маршрут /blog'],
    ['R=301', 'редирект 301'],
    ['^www\\.', 'снятие www'],
  ]
  for (const [needle, label] of htChecks) {
    if (needle.startsWith('^www')) {
      if (/RewriteCond %\{HTTP_HOST\} \^www\\./.test(htaccess)) pass(`.htaccess: ${label}`)
      else fail(`.htaccess: нет ${label}`)
    } else if (htaccess.includes(needle)) pass(`.htaccess: ${label}`)
    else fail(`.htaccess: нет ${label}`)
  }
  // Старый паттерн отдавал корневой index.html (= главная) — SEO видел SPA/home
  if (/RewriteRule \^switzerland\/\?\$ index\.html/.test(htaccess)) {
    fail('.htaccess: switzerland всё ещё указывает на корневой index.html (баг SEO)')
  } else {
    pass('.htaccess: switzerland не ведёт на корневой index.html')
  }
  if (htaccess.includes('RewriteRule ^ index.html [L]')) {
    fail('.htaccess: есть опасный catch-all RewriteRule ^ index.html')
  } else if (htaccess.includes('RewriteRule . /index.html [L]')) {
    fail('.htaccess: есть SPA catch-all (нужен пререндер)')
  } else {
    pass('.htaccess: нет catch-all на index.html (404 для лишних URL)')
  }

  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (locs.length === EXPECTED_SITEMAP_LOCS.length) {
    pass(`sitemap.xml: ${locs.length} URL`)
  } else {
    fail(`sitemap.xml: ${locs.length} URL (ожидалось ${EXPECTED_SITEMAP_LOCS.length})`)
  }

  for (const expected of EXPECTED_SITEMAP_LOCS) {
    if (locs.includes(expected)) pass(`sitemap: ${expected}`)
    else fail(`sitemap: нет ${expected}`)
  }
  for (const loc of locs) {
    if (loc.includes('/france') && !loc.includes('/blog/')) {
      fail(`sitemap: лишний URL ${loc}`)
    }
  }

  const assetsDir = join(dist, 'assets')
  if (await fileExists(assetsDir)) pass('dist/assets/ (JS/CSS)')
  else fail('нет dist/assets/')

  const jsFiles = execSync(`ls "${join(dist, 'assets')}"/*.js 2>/dev/null || true`, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  const mainJs = jsFiles.find((f) => f.includes('index-') && !f.includes('vendor'))
  if (mainJs) {
    const js = await readFile(mainJs, 'utf8')
    const bundleChecks = [
      ['Горнолыжные туры в Альпы 2026', 'уникальный title Альп'],
      ['vacanzabianca.ru/alps/gornolyzhnye-tury/', 'canonical Альп'],
      ['faq-item', 'компонент FAQ в бандле'],
      ['Страница не найдена', 'страница 404'],
      ['underDevelopment', 'заглушка Франция'],
      ['switzerland-jsonld-faq', 'FAQPage Швейцарии'],
      ['Авторские туры в Швейцарию', 'H1/title Швейцарии'],
      ['italy-jsonld-faq', 'FAQPage Италии'],
      ['home-jsonld-faq', 'FAQPage главной'],
      ['Блог Vacanza Bianca', 'страница блога'],
      ['blog-list-jsonld', 'JSON-LD списка блога'],
    ]
    for (const [needle, label] of bundleChecks) {
      if (js.includes(needle)) pass(`JS: ${label}`)
      else fail(`JS: нет «${label}»`)
    }
  } else {
    fail('не найден главный JS-бандл')
  }
}

async function checkZip() {
  if (!(await fileExists(zipPath))) {
    fail('site.zip не найден')
    return
  }
  const zipStat = await stat(zipPath)
  pass(`site.zip: ${(zipStat.size / 1024 / 1024).toFixed(1)} MB`)

  const listing = execSync(`unzip -l "${zipPath}"`, { encoding: 'utf8' })
  for (const name of REQUIRED_ROOT) {
    if (listing.includes(name)) pass(`site.zip содержит ${name}`)
    else fail(`site.zip: нет ${name}`)
  }

  const zipSitemap = execSync(`unzip -p "${zipPath}" sitemap.xml`, { encoding: 'utf8' })
  const zipLocs = [...zipSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (
    zipLocs.length === EXPECTED_SITEMAP_LOCS.length &&
    EXPECTED_SITEMAP_LOCS.every((u) => zipLocs.includes(u))
  ) {
    pass(`site.zip: sitemap.xml (${zipLocs.length} URL)`)
  } else {
    fail(`site.zip sitemap: ${zipLocs.join(', ')}`)
  }

  const zipHt = execSync(`unzip -p "${zipPath}" .htaccess`, { encoding: 'utf8' })
  if (
    zipHt.includes('ErrorDocument 404') &&
    zipHt.includes('RewriteRule ^switzerland/?$ switzerland/index.html') &&
    zipHt.includes('italy/tury-ozero-como/index.html')
  ) {
    pass('site.zip: .htaccess с 404 и пререндер-rewrites')
  } else {
    fail('site.zip: .htaccess неполный или switzerland ведёт на корневой index.html')
  }
}

async function main() {
  console.log('Проверка сборки для хостинга\n')
  await checkDist()
  await checkZip()

  console.log('\n--- Успешно ---')
  ok.forEach((line) => console.log(line))

  if (errors.length) {
    console.log('\n--- Ошибки ---')
    errors.forEach((line) => console.log(line))
    process.exit(1)
  }

  console.log(`\nГотово: ${ok.length} проверок пройдено. site.zip можно заливать на хостинг.`)
  console.log(`Путь: ${zipPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
