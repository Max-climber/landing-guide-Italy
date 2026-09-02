/**
 * Заменяет .png/.jpg/.jpeg → .webp в путях /images/ (favicon не трогаем).
 * Запуск: node scripts/update-image-refs.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const FILES = [
  'index.html',
  'src/components/Hero.jsx',
  'src/components/About.jsx',
  'src/components/Reviews.jsx',
  'src/components/Resorts.jsx',
  'src/components/Steps.jsx',
  'src/components/Navigation.jsx',
  'src/components/ItalyLakesTourChoiceModal.jsx',
  'src/pages/HomeHubPage.jsx',
  'src/pages/ItalyPage.jsx',
  'src/pages/ItalyComoPage.jsx',
  'src/pages/ItalyComoVenicePage.jsx',
  'src/pages/ItalyTourStandalonePage.jsx',
  'src/pages/AlpsSkiToursPage.jsx',
  'src/pages/PlaceholderPage.jsx',
  'src/pages/SiteMapPage.jsx',
  'src/pages/routes.jsx',
  'src/data/italyStandaloneTourConfigs.js',
  'src/locales/ru.json',
  'src/locales/en.json',
]

/** /images/...кроме icons/favicon */
function transform(content) {
  return content
    .replace(/(\/images\/(?!icons\/favicon)[^"'`\s)]+)\.(png|jpe?g)/gi, '$1.webp')
    .replace(/(encodeURIComponent\('[^']+)\.(png|jpe?g)'\)/gi, "$1.webp')")
    .replace(/(['"])([^'"]+)\.(png|jpe?g)(['"])/g, (m, q1, path, ext, q2) => {
      if (!path.includes('/images/') || path.includes('icons/favicon')) return m
      if (/\.(png|jpe?g)$/i.test(path) && path.startsWith('/images/')) {
        return `${q1}${path.replace(/\.(png|jpe?g)$/i, '.webp')}${q2}`
      }
      return m
    })
}

async function main() {
  for (const rel of FILES) {
    const path = join(root, rel)
    const before = await readFile(path, 'utf8')
    const after = transform(before)
    if (after !== before) {
      await writeFile(path, after, 'utf8')
      console.log('updated', rel)
    }
  }
  console.log('Пути обновлены.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
