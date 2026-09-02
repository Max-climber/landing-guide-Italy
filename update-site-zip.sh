#!/usr/bin/env bash
# Пересобирает production (включая пререндер для SEO) и упаковывает dist → site.zip.
# Эквивалент: npm run pack-site
set -euo pipefail
cd "$(dirname "$0")"
exec npm run pack-site
