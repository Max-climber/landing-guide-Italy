/**
 * English UI copy + programme text for standalone Italy tour pages.
 * Paths / PDF / jsonLd keys mirror {@link ./italyStandaloneTourConfigs.js}.
 */

import {
  ITALY_STANDALONE_ARCHITECTURE,
  ITALY_STANDALONE_PEAKS,
  ITALY_STANDALONE_RIVIERA,
} from './italyStandaloneTourConfigs'
import {
  ARCHITECTURE_NORTH_BOOKING_TERMS_EN,
  ARCHITECTURE_NORTH_EXCLUDED_LIST_EN,
  ARCHITECTURE_NORTH_INCLUDED_LIST_EN,
  ARCHITECTURE_NORTH_INDIVIDUAL_NOTICE_EN,
  ARCHITECTURE_NORTH_PDF_HREF_EN,
  ARCHITECTURE_NORTH_PRICE_SUMMARY_LINE_EN,
  ARCHITECTURE_NORTH_PROGRAM_DAYS_EN,
  ARCHITECTURE_NORTH_STAR_PRICE_NOTICE_EN,
} from './architectureNorthProgram.en'
import {
  PEAKS_DOLOMITES_BOOKING_TERMS_EN,
  PEAKS_DOLOMITES_EXCLUDED_LIST_EN,
  PEAKS_DOLOMITES_INCLUDED_LIST_EN,
  PEAKS_DOLOMITES_INDIVIDUAL_NOTICE_EN,
  PEAKS_DOLOMITES_PDF_HREF_EN,
  PEAKS_DOLOMITES_PRICE_SUMMARY_LINE_EN,
  PEAKS_DOLOMITES_PROGRAM_DAYS_EN,
  PEAKS_DOLOMITES_STAR_PRICE_NOTICE_EN,
} from './peaksDolomitesProgram.en'
import {
  RIVIERA_BOOKING_TERMS_EN,
  RIVIERA_EXCLUDED_LIST_EN,
  RIVIERA_INCLUDED_LIST_EN,
  RIVIERA_INDIVIDUAL_NOTICE_EN,
  RIVIERA_PDF_HREF_EN,
  RIVIERA_PRICE_SUMMARY_LINE_EN,
  RIVIERA_PROGRAM_DAYS_EN,
  RIVIERA_STAR_PRICE_NOTICE_EN,
} from './rivieraProgram.en'

export const ITALY_STANDALONE_PEAKS_EN = {
  ...ITALY_STANDALONE_PEAKS,
  pdfHref: PEAKS_DOLOMITES_PDF_HREF_EN,
  metaTitle: 'Summit Line: Dolomites — St. Moritz – Vacanza Bianca',
  metaDescription:
    'Summit Line tour: Dolomites, Bolzano, Ortisei, St. Moritz, Bernina Express, Lake Como. 9 nights — itinerary as in our PDF.',
  breadcrumbLabel: 'Summit Line: Dolomites — St. Moritz',
  h1: 'Summit Line:\nDolomites — St. Moritz',
  priceSummaryLine: PEAKS_DOLOMITES_PRICE_SUMMARY_LINE_EN,
  programDays: PEAKS_DOLOMITES_PROGRAM_DAYS_EN,
  postTableNotice: `${PEAKS_DOLOMITES_STAR_PRICE_NOTICE_EN}\n\n${PEAKS_DOLOMITES_INDIVIDUAL_NOTICE_EN}`,
  includedList: PEAKS_DOLOMITES_INCLUDED_LIST_EN,
  excludedList: PEAKS_DOLOMITES_EXCLUDED_LIST_EN,
  bookingTerms: PEAKS_DOLOMITES_BOOKING_TERMS_EN,
  ctaHeading: 'Plan your “Summit Line” tour',
  ctaDescription:
    'Leave a request — we’ll align dates, hotels, spa and pacing across the Dolomites and St. Moritz. We reply on WhatsApp/Telegram and by email.',
}

export const ITALY_STANDALONE_ARCHITECTURE_EN = {
  ...ITALY_STANDALONE_ARCHITECTURE,
  pdfHref: ARCHITECTURE_NORTH_PDF_HREF_EN,
  metaTitle: 'Architecture of Wonder: Northern Italy – Vacanza Bianca',
  metaDescription:
    'Milan, Lake Garda, Venice and Bologna with private guides and a spa day on Lake Garda. 9 nights — itinerary as in our PDF.',
  breadcrumbLabel: 'Architecture of Wonder: Northern Italy',
  h1: 'Architecture of Wonder:\nNorthern Italy',
  priceSummaryLine: ARCHITECTURE_NORTH_PRICE_SUMMARY_LINE_EN,
  programDays: ARCHITECTURE_NORTH_PROGRAM_DAYS_EN,
  postTableNotice: `${ARCHITECTURE_NORTH_STAR_PRICE_NOTICE_EN}\n\n${ARCHITECTURE_NORTH_INDIVIDUAL_NOTICE_EN}`,
  includedList: ARCHITECTURE_NORTH_INCLUDED_LIST_EN,
  excludedList: ARCHITECTURE_NORTH_EXCLUDED_LIST_EN,
  bookingTerms: ARCHITECTURE_NORTH_BOOKING_TERMS_EN,
  ctaHeading: 'Plan your “Architecture of Wonder” tour',
  ctaDescription:
    'Leave a request — we’ll tailor cities, tours and pace across Northern Italy. We reply on WhatsApp/Telegram and by email.',
}

export const ITALY_STANDALONE_RIVIERA_EN = {
  ...ITALY_STANDALONE_RIVIERA,
  pdfHref: RIVIERA_PDF_HREF_EN,
  metaTitle: 'Riviera: Liguria & the French Riviera – Vacanza Bianca',
  metaDescription:
    'Liguria and the Côte d’Azur: yachting, Genoa, Camogli–Portofino hike, Nice. 9 nights — itinerary as in our PDF.',
  breadcrumbLabel: 'Riviera: Liguria & the French Riviera',
  h1: 'Riviera:\nLiguria & the French Riviera',
  priceSummaryLine: RIVIERA_PRICE_SUMMARY_LINE_EN,
  programDays: RIVIERA_PROGRAM_DAYS_EN,
  postTableNotice: `${RIVIERA_STAR_PRICE_NOTICE_EN}\n\n${RIVIERA_INDIVIDUAL_NOTICE_EN}`,
  includedList: RIVIERA_INCLUDED_LIST_EN,
  excludedList: RIVIERA_EXCLUDED_LIST_EN,
  bookingTerms: RIVIERA_BOOKING_TERMS_EN,
  ctaHeading: 'Plan your Liguria & French Riviera tour',
  ctaDescription:
    'Leave a request — we’ll shape the route, hotels and seaside experiences including Nice. We reply on WhatsApp/Telegram and by email.',
}
