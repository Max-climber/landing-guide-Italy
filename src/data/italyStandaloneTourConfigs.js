/**
 * Полноэкранные страницы туров (программа + PDF как на Комо / Комо–Венеция).
 * Пути синхронизировать с {@link ../pages/routes.jsx} и ItalyPage.
 */

import {
  ARCHITECTURE_NORTH_BOOKING_TERMS,
  ARCHITECTURE_NORTH_EXCLUDED_LIST,
  ARCHITECTURE_NORTH_INCLUDED_LIST,
  ARCHITECTURE_NORTH_INDIVIDUAL_NOTICE,
  ARCHITECTURE_NORTH_PDF_HREF,
  ARCHITECTURE_NORTH_PRICE_SUMMARY_LINE,
  ARCHITECTURE_NORTH_PROGRAM_DAYS,
  ARCHITECTURE_NORTH_STAR_PRICE_NOTICE,
} from './architectureNorthProgram'
import {
  PEAKS_DOLOMITES_BOOKING_TERMS,
  PEAKS_DOLOMITES_EXCLUDED_LIST,
  PEAKS_DOLOMITES_INCLUDED_LIST,
  PEAKS_DOLOMITES_INDIVIDUAL_NOTICE,
  PEAKS_DOLOMITES_PDF_HREF,
  PEAKS_DOLOMITES_PRICE_SUMMARY_LINE,
  PEAKS_DOLOMITES_PROGRAM_DAYS,
  PEAKS_DOLOMITES_STAR_PRICE_NOTICE,
} from './peaksDolomitesProgram'
import {
  RIVIERA_BOOKING_TERMS,
  RIVIERA_EXCLUDED_LIST,
  RIVIERA_INCLUDED_LIST,
  RIVIERA_INDIVIDUAL_NOTICE,
  RIVIERA_PDF_HREF,
  RIVIERA_PRICE_SUMMARY_LINE,
  RIVIERA_PROGRAM_DAYS,
  RIVIERA_STAR_PRICE_NOTICE,
} from './rivieraProgram'

/** Кнопка «Подробнее» на /italy/ и канонический URL */
export const ITALY_DETAIL_ROUTE = {
  peaksDolomites: '/italy/tury-liniya-vershin-dolomity/',
  northArchitecture: '/italy/tury-arhitektura-sever-italii/',
  riviera: '/italy/tury-riviera-liguria/',
}

export const ITALY_STANDALONE_PEAKS = {
  routePath: '/italy/tury-liniya-vershin-dolomity',
  canonical: 'https://vacanzabianca.ru/italy/tury-liniya-vershin-dolomity/',
  metaTitle: 'Линия вершин: Доломиты — Санкт-Мориц – Vacanza Bianca',
  metaDescription:
    'Тур «Линия вершин»: Доломиты, Больцано, Ортизеи, Санкт-Мориц, Bernina Express, озеро Комо. 9 ночей, программа по PDF.',
  breadcrumbLabel: 'Линия вершин: Доломиты — Санкт-Мориц',
  h1: 'Линия вершин:\nДоломиты — Санкт-Мориц',
  heroImage: '/images/Italy-page/tours/tours-Dolomity1.0.webp',
  jsonLdKey: 'italy-tour-peaks-jsonld',
  priceSummaryLine: PEAKS_DOLOMITES_PRICE_SUMMARY_LINE,
  pdfHref: PEAKS_DOLOMITES_PDF_HREF,
  programDays: PEAKS_DOLOMITES_PROGRAM_DAYS,
  postTableNotice: `${PEAKS_DOLOMITES_STAR_PRICE_NOTICE}\n\n${PEAKS_DOLOMITES_INDIVIDUAL_NOTICE}`,
  includedList: PEAKS_DOLOMITES_INCLUDED_LIST,
  excludedList: PEAKS_DOLOMITES_EXCLUDED_LIST,
  bookingTerms: PEAKS_DOLOMITES_BOOKING_TERMS,
  ctaHeading: 'Подобрать тур «Линия вершин»',
  ctaDescription:
    'Оставьте заявку — согласуем даты, отели, СПА и темп маршрута по Доломитам и Санкт-Морицу. Ответим в WhatsApp/Telegram и на почту.',
}

export const ITALY_STANDALONE_ARCHITECTURE = {
  routePath: '/italy/tury-arhitektura-sever-italii',
  canonical: 'https://vacanzabianca.ru/italy/tury-arhitektura-sever-italii/',
  metaTitle: 'Архитектура впечатлений: Север Италии – Vacanza Bianca',
  metaDescription:
    'Тур по Милану, Гарде, Венеции и Болонье с индивидуальными экскурсиями и днём СПА. 9 ночей, программа по PDF.',
  breadcrumbLabel: 'Архитектура впечатлений: Север Италии',
  h1: 'Архитектура впечатлений:\nСевер Италии',
  heroImage: `/images/Italy-page/tours/${encodeURIComponent('tours-Архитектура-впечатлений-север-Италии.webp')}`,
  jsonLdKey: 'italy-tour-architecture-jsonld',
  priceSummaryLine: ARCHITECTURE_NORTH_PRICE_SUMMARY_LINE,
  pdfHref: ARCHITECTURE_NORTH_PDF_HREF,
  programDays: ARCHITECTURE_NORTH_PROGRAM_DAYS,
  postTableNotice: `${ARCHITECTURE_NORTH_STAR_PRICE_NOTICE}\n\n${ARCHITECTURE_NORTH_INDIVIDUAL_NOTICE}`,
  includedList: ARCHITECTURE_NORTH_INCLUDED_LIST,
  excludedList: ARCHITECTURE_NORTH_EXCLUDED_LIST,
  bookingTerms: ARCHITECTURE_NORTH_BOOKING_TERMS,
  ctaHeading: 'Подобрать тур «Архитектура впечатлений»',
  ctaDescription:
    'Оставьте заявку — подберём города, экскурсии и ритм поездки по северу Италии. Ответим в WhatsApp/Telegram и на почту.',
}

export const ITALY_STANDALONE_RIVIERA = {
  routePath: '/italy/tury-riviera-liguria',
  canonical: 'https://vacanzabianca.ru/italy/tury-riviera-liguria/',
  metaTitle: 'Ривьера: Лигурия и Лазурный берег – Vacanza Bianca',
  metaDescription:
    'Лигурия и Лазурный берег: яхтинг, Генуя, трекинг Камольи — Портофино, Ницца. 9 ночей, программа по PDF.',
  breadcrumbLabel: 'Ривьера: Лигурия и Лазурный берег',
  h1: 'Ривьера:\nЛигурия и Лазурный берег',
  heroImage: '/images/Italy-page/tours/tours-Riviera.webp',
  jsonLdKey: 'italy-tour-riviera-jsonld',
  priceSummaryLine: RIVIERA_PRICE_SUMMARY_LINE,
  pdfHref: RIVIERA_PDF_HREF,
  programDays: RIVIERA_PROGRAM_DAYS,
  postTableNotice: `${RIVIERA_STAR_PRICE_NOTICE}\n\n${RIVIERA_INDIVIDUAL_NOTICE}`,
  includedList: RIVIERA_INCLUDED_LIST,
  excludedList: RIVIERA_EXCLUDED_LIST,
  bookingTerms: RIVIERA_BOOKING_TERMS,
  ctaHeading: 'Подобрать тур по Лигурии и Лазурному берегу',
  ctaDescription:
    'Оставьте заявку — согласуем маршрут, отели и активности на море и в Ницце. Ответим в WhatsApp/Telegram и на почту.',
}
