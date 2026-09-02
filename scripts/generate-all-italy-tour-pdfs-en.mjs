/**
 * Writes English tour PDFs under public/files/ (ASCII filenames).
 * Run: node scripts/generate-all-italy-tour-pdfs-en.mjs
 */
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { buildTourPdfEnHtml } from './lib/tour-pdf-en-html.mjs'
import {
  COMO_GARDA_BOOKING_TERMS_EN,
  COMO_GARDA_EXCLUDED_LIST_EN,
  COMO_GARDA_INCLUDED_LIST_EN,
  COMO_GARDA_POST_TABLE_NOTICE_EN,
} from '../src/data/comoGardaLegal.en.js'
import {
  COMO_GARDA_PRICE_SUMMARY_LINE_EN,
  COMO_GARDA_PROGRAM_DAYS_EN,
  COMO_GARDA_TOUR_PDF_HREF_EN,
} from '../src/data/comoGardaProgram.en.js'
import {
  COMO_VENICE_BOOKING_TERMS_EN,
  COMO_VENICE_EXCLUDED_LIST_EN,
  COMO_VENICE_INCLUDED_LIST_EN,
  COMO_VENICE_INDIVIDUAL_NOTICE_EN,
  COMO_VENICE_PRICE_SUMMARY_LINE_EN,
  COMO_VENICE_PROGRAM_DAYS_EN,
  COMO_VENICE_PDF_HREF_EN,
  COMO_VENICE_STAR_PRICE_NOTICE_EN,
} from '../src/data/comoVeniceProgram.en.js'
import {
  ARCHITECTURE_NORTH_BOOKING_TERMS_EN,
  ARCHITECTURE_NORTH_EXCLUDED_LIST_EN,
  ARCHITECTURE_NORTH_INCLUDED_LIST_EN,
  ARCHITECTURE_NORTH_INDIVIDUAL_NOTICE_EN,
  ARCHITECTURE_NORTH_PDF_HREF_EN,
  ARCHITECTURE_NORTH_PRICE_SUMMARY_LINE_EN,
  ARCHITECTURE_NORTH_PROGRAM_DAYS_EN,
  ARCHITECTURE_NORTH_STAR_PRICE_NOTICE_EN,
} from '../src/data/architectureNorthProgram.en.js'
import {
  PEAKS_DOLOMITES_BOOKING_TERMS_EN,
  PEAKS_DOLOMITES_EXCLUDED_LIST_EN,
  PEAKS_DOLOMITES_INCLUDED_LIST_EN,
  PEAKS_DOLOMITES_INDIVIDUAL_NOTICE_EN,
  PEAKS_DOLOMITES_PDF_HREF_EN,
  PEAKS_DOLOMITES_PRICE_SUMMARY_LINE_EN,
  PEAKS_DOLOMITES_PROGRAM_DAYS_EN,
  PEAKS_DOLOMITES_STAR_PRICE_NOTICE_EN,
} from '../src/data/peaksDolomitesProgram.en.js'
import {
  RIVIERA_BOOKING_TERMS_EN,
  RIVIERA_EXCLUDED_LIST_EN,
  RIVIERA_INCLUDED_LIST_EN,
  RIVIERA_INDIVIDUAL_NOTICE_EN,
  RIVIERA_PDF_HREF_EN,
  RIVIERA_PRICE_SUMMARY_LINE_EN,
  RIVIERA_PROGRAM_DAYS_EN,
  RIVIERA_STAR_PRICE_NOTICE_EN,
} from '../src/data/rivieraProgram.en.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public', 'files')

function hrefToDiskPath(href) {
  if (!href.startsWith('/files/')) throw new Error(`Unexpected href: ${href}`)
  return join(outDir, href.slice('/files/'.length))
}

const jobs = [
  {
    out: hrefToDiskPath(COMO_GARDA_TOUR_PDF_HREF_EN),
    html: buildTourPdfEnHtml({
      h1: COMO_GARDA_PRICE_SUMMARY_LINE_EN,
      programDays: COMO_GARDA_PROGRAM_DAYS_EN,
      priceParagraphs: COMO_GARDA_POST_TABLE_NOTICE_EN.split(/\n\n+/)
        .map((s) => s.trim())
        .filter(Boolean),
      includedList: COMO_GARDA_INCLUDED_LIST_EN,
      excludedList: COMO_GARDA_EXCLUDED_LIST_EN,
      bookingTerms: COMO_GARDA_BOOKING_TERMS_EN,
    }),
  },
  {
    out: hrefToDiskPath(COMO_VENICE_PDF_HREF_EN),
    html: buildTourPdfEnHtml({
      h1: COMO_VENICE_PRICE_SUMMARY_LINE_EN,
      programDays: COMO_VENICE_PROGRAM_DAYS_EN,
      priceParagraphs: [COMO_VENICE_STAR_PRICE_NOTICE_EN, COMO_VENICE_INDIVIDUAL_NOTICE_EN],
      includedList: COMO_VENICE_INCLUDED_LIST_EN,
      excludedList: COMO_VENICE_EXCLUDED_LIST_EN,
      bookingTerms: COMO_VENICE_BOOKING_TERMS_EN,
    }),
  },
  {
    out: hrefToDiskPath(PEAKS_DOLOMITES_PDF_HREF_EN),
    html: buildTourPdfEnHtml({
      h1: PEAKS_DOLOMITES_PRICE_SUMMARY_LINE_EN,
      programDays: PEAKS_DOLOMITES_PROGRAM_DAYS_EN,
      priceParagraphs: [PEAKS_DOLOMITES_STAR_PRICE_NOTICE_EN, PEAKS_DOLOMITES_INDIVIDUAL_NOTICE_EN],
      includedList: PEAKS_DOLOMITES_INCLUDED_LIST_EN,
      excludedList: PEAKS_DOLOMITES_EXCLUDED_LIST_EN,
      bookingTerms: PEAKS_DOLOMITES_BOOKING_TERMS_EN,
    }),
  },
  {
    out: hrefToDiskPath(ARCHITECTURE_NORTH_PDF_HREF_EN),
    html: buildTourPdfEnHtml({
      h1: ARCHITECTURE_NORTH_PRICE_SUMMARY_LINE_EN,
      programDays: ARCHITECTURE_NORTH_PROGRAM_DAYS_EN,
      priceParagraphs: [ARCHITECTURE_NORTH_STAR_PRICE_NOTICE_EN, ARCHITECTURE_NORTH_INDIVIDUAL_NOTICE_EN],
      includedList: ARCHITECTURE_NORTH_INCLUDED_LIST_EN,
      excludedList: ARCHITECTURE_NORTH_EXCLUDED_LIST_EN,
      bookingTerms: ARCHITECTURE_NORTH_BOOKING_TERMS_EN,
    }),
  },
  {
    out: hrefToDiskPath(RIVIERA_PDF_HREF_EN),
    html: buildTourPdfEnHtml({
      h1: RIVIERA_PRICE_SUMMARY_LINE_EN,
      programDays: RIVIERA_PROGRAM_DAYS_EN,
      priceParagraphs: [RIVIERA_STAR_PRICE_NOTICE_EN, RIVIERA_INDIVIDUAL_NOTICE_EN],
      includedList: RIVIERA_INCLUDED_LIST_EN,
      excludedList: RIVIERA_EXCLUDED_LIST_EN,
      bookingTerms: RIVIERA_BOOKING_TERMS_EN,
    }),
  },
]

async function main() {
  await mkdir(outDir, { recursive: true })
  const browser = await chromium.launch()
  try {
    for (const { out, html } of jobs) {
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'load' })
      const buf = await page.pdf({
        path: out,
        format: 'A4',
        printBackground: true,
        margin: { top: '14mm', right: '12mm', bottom: '14mm', left: '12mm' },
      })
      await page.close()
      console.log('Wrote', out, `(${buf.length} bytes)`)
    }
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
