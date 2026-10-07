#!/usr/bin/env bash
# Checks the live site after a deploy: pages, clean URLs, 404s, content types and
# the www redirect. CloudFront invalidations take a minute or two to land, so
# each check retries before failing.
# Usage: ./scripts/smoke.sh [base-url]   (default: https://raymondtsai.site)
set -uo pipefail

BASE="${1:-${SITE_URL:-https://raymondtsai.site}}"
BASE="${BASE%/}"
ATTEMPTS="${ATTEMPTS:-10}"
failed=0

# check <path> <expected status> [expected content-type prefix]
check() {
  local path="$1" want="$2" type="${3:-}" got ctype
  for ((i = 1; i <= ATTEMPTS; i++)); do
    read -r got ctype < <(curl -s -o /dev/null -w "%{http_code} %{content_type}\n" "$BASE$path")
    if [ "$got" = "$want" ] && [[ "$ctype" == "$type"* ]]; then
      echo "ok   $path → $got $ctype"
      return
    fi
    sleep 10
  done
  echo "FAIL $path → $got $ctype (wanted $want${type:+ $type})"
  failed=1
}

check / 200 text/html
check /projects 200 text/html
check /resume 200 text/html
check /resume/ 200 text/html
check /resume.pdf 200 application/pdf
check /robots.txt 200 text/plain
check /sitemap.xml 200
check /opengraph-image 200 image/png
check /no-such-page 404 text/html

# Every project page from the live sitemap.
for path in $(curl -s "$BASE/sitemap.xml" | grep -o '<loc>[^<]*/projects/[^<]*</loc>' | sed -E 's#<loc>https?://[^/]+##; s#</loc>##'); do
  check "$path" 200 text/html
done

# www → bare domain, only when testing the real domain (not localhost or a *.cloudfront.net URL).
host="${BASE#https://}"
if [[ "$BASE" == https://* && "$host" != *cloudfront.net ]]; then
  location=$(curl -s -o /dev/null -w "%{redirect_url}" "https://www.$host/resume?x=1")
  if [ "$location" = "https://$host/resume?x=1" ]; then
    echo "ok   www redirect → $location"
  else
    echo "FAIL www redirect → '${location}' (wanted https://$host/resume?x=1)"
    failed=1
  fi
fi

exit $failed
