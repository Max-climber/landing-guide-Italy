/**
 * Конвертирует все PNG/JPEG в public/images → WebP (кроме favicon и vendor three.js).
 * Запуск: npm run optimize-images
 */
import { readdir, stat, copyFile } from 'node:fs/promises'
import { join, dirname, parse, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const distImages = join(root, 'dist', 'images')

const SKIP_REL = [
  'images/icons/favicon.png',
  'images/infographics/app', // three.js bundle, не контент сайта
]

const RASTER = /\.(png|jpe?g)$/i

async function loadSharp() {
  try {
    return (await import('sharp')).default
  } catch {
    console.error('Установите sharp: npm install -D sharp')
    process.exit(1)
  }
}

function shouldSkip(rel) {
  const norm = rel.replace(/\\/g, '/')
  if (SKIP_REL.some((s) => norm === s || norm.startsWith(`${s}/`))) return true
  return false
}

async function* walk(dir) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, name.name)
    if (name.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function ensureValidInput(absPath, rel) {
  const st = await stat(absPath)
  if (st.size > 0) return true
  const fallback = join(distImages, rel.replace(/^images\//, ''))
  try {
    const fb = await stat(fallback)
    if (fb.size > 0) {
      await copyFile(fallback, absPath)
      console.warn(`RESTORE ${rel} из dist/`)
      return true
    }
  } catch {
    /* no fallback */
  }
  console.warn(`SKIP (пустой/битый): ${rel}`)
  return false
}

async function optimizeOne(sharp, absPath, rel) {
  const { dir, name } = parse(absPath)
  const out = join(dir, `${name}.webp`)

  if (!(await ensureValidInput(absPath, rel))) return { ok: false }

  const before = (await stat(absPath)).size
  const maxWidth = before > 800_000 ? 1920 : before > 200_000 ? 1600 : 1200

  try {
    await sharp(absPath)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(out)
  } catch (err) {
    console.warn(`FAIL ${rel}:`, err.message)
    return { ok: false }
  }

  const after = (await stat(out)).size
  const saved = (((before - after) / before) * 100).toFixed(0)
  console.log(
    `${rel} → ${name}.webp (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB, −${saved}%)`,
  )
  return { ok: true, before, after }
}

async function main() {
  const sharp = await loadSharp()
  const imagesRoot = join(publicDir, 'images')
  let ok = 0
  let fail = 0
  let totalBefore = 0
  let totalAfter = 0

  for await (const absPath of walk(imagesRoot)) {
    if (!RASTER.test(absPath)) continue
    const rel = relative(publicDir, absPath).replace(/\\/g, '/')
    if (shouldSkip(rel)) continue

    const result = await optimizeOne(sharp, absPath, rel)
    if (result?.ok) {
      ok++
      totalBefore += result.before
      totalAfter += result.after
    } else fail++
  }

  console.log(
    `\nГотово: ${ok} файлов, ошибок ${fail}. ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
