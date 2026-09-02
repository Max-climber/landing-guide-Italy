/**
 * Удаляет PNG/JPEG, если рядом уже есть .webp (favicon не трогаем).
 * Запуск перед pack-site: node scripts/prune-raster-duplicates.mjs
 */
import { unlink, stat } from 'node:fs/promises'
import { join, dirname, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const publicImages = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')

async function* walk(dir) {
  const { readdir } = await import('node:fs/promises')
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, ent.name)
    if (ent.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function main() {
  let removed = 0
  for await (const file of walk(publicImages)) {
    if (!/\.webp$/i.test(file)) continue
    const base = file.slice(0, -5)
    for (const ext of ['.png', '.jpg', '.jpeg', '.PNG', '.JPG']) {
      const candidate = base + ext
      try {
        await stat(candidate)
        await unlink(candidate)
        console.log('removed', candidate.replace(publicImages, 'images'))
        removed++
      } catch {
        /* нет файла */
      }
    }
  }
  console.log(`Удалено дубликатов: ${removed}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
