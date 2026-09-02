/**
 * Копирует статику public/ → dist/ (vite: copyPublicDir: false).
 * WebP копируются по одному (обход зависаний iCloud на тяжёлых папках).
 */
import { mkdir, copyFile, readdir } from 'node:fs/promises'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const distDir = join(root, 'dist')

const SKIP_UNDER_IMAGES = ['infographics/app']

async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const ent of entries) {
    const full = join(dir, ent.name)
    const rel = relative(base, full).replace(/\\/g, '/')
    if (ent.isDirectory()) {
      if (SKIP_UNDER_IMAGES.some((skip) => rel === skip || rel.startsWith(`${skip}/`))) continue
      files.push(...(await walk(full, base)))
    } else {
      files.push(full)
    }
  }
  return files
}

async function copyWebpImages() {
  const imagesRoot = join(publicDir, 'images')
  const files = await walk(imagesRoot)
  let n = 0
  for (const src of files) {
    const rel = relative(imagesRoot, src).replace(/\\/g, '/')
    if (SKIP_UNDER_IMAGES.some((skip) => rel === skip || rel.startsWith(`${skip}/`))) continue
    if (!/\.(webp|avif)$/i.test(src)) continue
    const dest = join(distDir, 'images', rel)
    await mkdir(dirname(dest), { recursive: true })
    await copyFile(src, dest)
    n++
  }
  console.log(`copied ${n} webp/avif → dist/images`)
}

async function copyTree(srcDir, destDir) {
  await mkdir(destDir, { recursive: true })
  const entries = await readdir(srcDir, { withFileTypes: true })
  let copied = 0
  let skipped = 0
  for (const ent of entries) {
    const src = join(srcDir, ent.name)
    const dest = join(destDir, ent.name)
    if (ent.isDirectory()) {
      const sub = await copyTree(src, dest)
      copied += sub.copied
      skipped += sub.skipped
      continue
    }
    try {
      await copyFile(src, dest)
      copied += 1
    } catch (err) {
      skipped += 1
      console.warn(`skip copy: ${relative(publicDir, src)} (${err.code || err.message})`)
    }
  }
  return { copied, skipped }
}

async function copyDirSimple(name) {
  const src = join(publicDir, name)
  const dest = join(distDir, name)
  const { copied, skipped } = await copyTree(src, dest)
  console.log(`copied ${name}/ → dist/${name}/ (${copied} files${skipped ? `, skipped ${skipped}` : ''})`)
}

async function main() {
  await mkdir(distDir, { recursive: true })
  await copyWebpImages()
  await copyDirSimple('videos')
  await copyDirSimple('files')
  for (const file of ['robots.txt', 'sitemap.xml', '.htaccess']) {
    await copyFile(join(publicDir, file), join(distDir, file))
    console.log(`copied ${file}`)
  }
  await copyFile(join(distDir, 'index.html'), join(distDir, '404.html'))
  console.log('copied index.html → 404.html (ErrorDocument)')
  // favicon остаётся png
  await mkdir(join(distDir, 'images', 'icons'), { recursive: true })
  await copyFile(
    join(publicDir, 'images/icons/favicon.png'),
    join(distDir, 'images/icons/favicon.png'),
  )
  console.log('copied images/icons/favicon.png')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
