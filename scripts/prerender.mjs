/**
 * После `vite build` проходит по всем URL из prerenderPaths, рендерит SPA в Chromium
 * и сохраняет полный HTML в dist/<path>/index.html (главная — dist/index.html).
 * Локальный сервер с `-s` отдаёт для любого пути index.html, чтобы React увидел pathname.
 */
import http from 'node:http'
import { spawn } from 'node:child_process'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'
import { getPrerenderPaths } from '../src/prerenderPaths.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const require = createRequire(import.meta.url)
const serveMain = join(dirname(require.resolve('serve/package.json')), 'build', 'main.js')
const distDir = join(root, 'dist')
const PORT = Number(process.env.PRERENDER_PORT || 4178)
const HOST = '127.0.0.1'
const baseUrl = `http://${HOST}:${PORT}`

function waitForHttpOk(url, timeoutMs = 30000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      http
        .get(url, (res) => {
          res.resume()
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
            resolve()
            return
          }
          scheduleRetry()
        })
        .on('error', scheduleRetry)

      function scheduleRetry() {
        if (Date.now() - started > timeoutMs) {
          reject(new Error(`Таймаут ожидания сервера: ${url}`))
          return
        }
        setTimeout(tryOnce, 150)
      }
    }
    tryOnce()
  })
}

async function main() {
  const paths = getPrerenderPaths()
  console.log(`Prerender: ${paths.length} страниц → ${distDir}`)

  const server = spawn(process.execPath, [serveMain, '-s', '-l', String(PORT), distDir], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '0' },
  })

  server.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })

  try {
    await waitForHttpOk(`${baseUrl}/`)
  } catch (e) {
    server.kill('SIGTERM')
    throw e
  }

  // Чистая SPA-оболочка: serve -s отдаёт dist/index.html для всех маршрутов.
  // Без сброса после пререндера главной в <head> остаётся JSON-LD главной на всех страницах.
  const shellHtml = await readFile(join(distDir, 'index.html'), 'utf8')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent:
      'Mozilla/5.0 (compatible; VacanzaBiancaPrerender/1.0; +https://vacanzabianca.ru)',
  })

  try {
    let homeHtml = null

    for (const path of paths) {
      const urlPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`
      if (urlPath !== '/') {
        await writeFile(join(distDir, 'index.html'), shellHtml, 'utf8')
      }

      const page = await context.newPage()
      const url = `${baseUrl}${urlPath === '/' ? '/' : urlPath}`
      // domcontentloaded — не ждём загрузки всех lazy-картинок (~40 МБ на главной)
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
      await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 })
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root')
          return root && root.innerHTML && root.innerHTML.trim().length > 80
        },
        { timeout: 30_000 },
      )
      // useEffect с meta/title отрабатывает после первого paint
      await page.waitForFunction(
        () => document.title && document.title.trim().length > 10,
        { timeout: 15_000 },
      )
      await new Promise((r) => setTimeout(r, 800))
      const html = await page.content()
      await page.close()

      const outFile = urlPath === '/' ? join(distDir, 'index.html') : join(distDir, urlPath.slice(1), 'index.html')
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, html, 'utf8')
      if (urlPath === '/') homeHtml = html
      console.log('OK', urlPath, '→', outFile.replace(root + '/', ''))
    }

    if (homeHtml) {
      await writeFile(join(distDir, 'index.html'), homeHtml, 'utf8')
    }
  } finally {
    await browser.close()
    server.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
