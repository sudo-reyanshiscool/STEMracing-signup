#!/usr/bin/env bash
# Regenerate STEM_Racing_Season9_Proposal_Rubric.pdf from rubric.html.
#
#   ./rubric/build.sh
#
# The PDF is committed to the repository and linked from the site as a
# download, so it must be rebuilt and committed whenever rubric.html changes.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
out="$(dirname "$here")/STEM_Racing_Season9_Proposal_Rubric.pdf"

chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$chrome" ] || chrome="$(command -v google-chrome || command -v chromium || true)"
if [ -z "$chrome" ] || [ ! -x "$chrome" ]; then
  echo "Chrome not found. Install Google Chrome, or point \$chrome at a Chromium binary." >&2
  exit 1
fi

"$chrome" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --virtual-time-budget=3000 \
  --print-to-pdf="$out" \
  "file://$here/rubric.html" 2>/dev/null

echo "Wrote $out"
