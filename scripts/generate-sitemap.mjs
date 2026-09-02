/**
 * Генерирует public/sitemap.xml для Sprinthost (после vite, до copy-public).
 */
import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSitemapPathnames, toSitemapLoc } from '../src/sitemapPaths.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outFile = join(root, 'public', 'sitemap.xml')

const ORIGIN = 'https://vacanzabianca.ru'
/** Обновлять только при реальном изменении контента страниц (ТЗ SEO). */
const SITEMAP_LASTMOD = '2026-05-19'

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function main() {
  const paths = getSitemapPathnames()
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${escapeXml(toSitemapLoc(ORIGIN, path))}</loc>
    <lastmod>${SITEMAP_LASTMOD}</lastmod>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  await writeFile(outFile, xml, 'utf8')
  console.log(`sitemap.xml: ${paths.length} URL → ${outFile.replace(root, '')}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
