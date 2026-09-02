/** Shared HTML for Italy tour EN PDFs (Playwright → PDF). */

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function programmeCell(item) {
  const parts = []
  if (item.title?.trim()) parts.push(item.title.trim())
  const body = (item.text ?? item.cardText ?? '').trim()
  if (body) parts.push(body)
  return parts.join('\n\n')
}

/**
 * @param {{
 *   h1: string
 *   programDays: Array<{ day: string, title?: string, text?: string, cardText?: string, note?: string }>
 *   priceParagraphs: string[]
 *   includedList: string
 *   excludedList: string
 *   bookingTerms: string
 * }} opts
 * Layout matches Russian tour PDFs: zebra table (#4a76c0 header), then plain paragraphs and section titles (no boxed h2).
 */
export function buildTourPdfEnHtml(opts) {
  const { h1, programDays, priceParagraphs, includedList, excludedList, bookingTerms } = opts

  const rows = programDays.map((item) => {
    const prog = programmeCell(item)
    const note = (item.note ?? '').trim()
    return `<tr>
      <td class="day">${esc(item.day)}</td>
      <td class="prog">${esc(prog)}</td>
      <td class="note">${esc(note)}</td>
    </tr>`
  }).join('\n')

  const pricePs = priceParagraphs
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => `<p${i > 0 ? ' style="margin-top:8pt"' : ''}>${esc(p)}</p>`)
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, 'Segoe UI', system-ui, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
    }
    h1 {
      text-align: center;
      font-size: 13pt;
      font-weight: 600;
      margin: 0 0 14pt;
      color: #000;
    }
    table.itin {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-bottom: 14pt;
    }
    table.itin col.day { width: 11%; }
    table.itin col.prog { width: 52%; }
    table.itin col.note { width: 37%; }
    table.itin th {
      background: #4a76c0;
      color: #fff;
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #fff;
      font-size: 9pt;
    }
    table.itin td {
      border: 1px solid #fff;
      padding: 8px 10px;
      vertical-align: top;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    table.itin tbody tr:nth-child(odd) td {
      background: #d9e2f3;
    }
    table.itin tbody tr:nth-child(even) td {
      background: #cfd9f1;
    }
    table.itin td.day {
      font-weight: 600;
    }
    .post-table {
      margin-top: 0;
    }
    .post-table p {
      margin: 0 0 8pt;
      white-space: pre-wrap;
    }
    .post-table p:last-child {
      margin-bottom: 10pt;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: 700;
      margin: 10pt 0 4pt;
      color: #000;
    }
    .section-body {
      margin: 0 0 10pt;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <h1>${esc(h1)}</h1>
  <table class="itin">
    <colgroup>
      <col class="day" /><col class="prog" /><col class="note" />
    </colgroup>
    <thead>
      <tr>
        <th>Day</th>
        <th>Programme</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <div class="post-table">
    ${pricePs}
  </div>
  <p class="section-title">What's included in the tour price:</p>
  <p class="section-body">${esc(includedList)}</p>
  <p class="section-title">What is NOT included in the tour price:</p>
  <p class="section-body">${esc(excludedList)}</p>
  <p class="section-title">Tour booking and payment terms:</p>
  <p class="section-body">${esc(bookingTerms)}</p>
</body>
</html>`
}
