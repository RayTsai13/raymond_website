#!/usr/bin/env bash
# Upload the static export (out/) to S3 and refresh CloudFront.
# Run `npm run build` first. CI runs this on every push to main; locally,
# set AWS_PROFILE to a profile that can write to the bucket.
set -euo pipefail

BUCKET="${BUCKET:-raymondtsai-site-676726973702}"
DISTRIBUTION_ID="${DISTRIBUTION_ID:-E1UP86IQY7WF6I}"

[ -f out/index.html ] || { echo "out/ is missing. Run npm run build first." >&2; exit 1; }

# Hashed build assets never change, so browsers can keep them forever.
# No --delete: visitors mid-session may still request the previous build's chunks.
aws s3 sync out/_next/static "s3://$BUCKET/_next/static" \
  --cache-control "public, max-age=31536000, immutable"

# Pages and everything else: browsers revalidate, CloudFront caches until the invalidation below.
aws s3 sync out "s3://$BUCKET" --delete \
  --exclude "_next/static/*" --exclude "*opengraph-image" --exclude ".gitkeep" \
  --cache-control "public, max-age=0, s-maxage=31536000, must-revalidate"

# OG images have no file extension, so set their type explicitly.
aws s3 cp out "s3://$BUCKET" --recursive \
  --exclude "*" --include "*opengraph-image" \
  --content-type "image/png" \
  --cache-control "public, max-age=3600, s-maxage=31536000"

aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" \
  --query "Invalidation.Id" --output text
