// Checks the static export in out/ before it ships:
// - every page in the sitemap, plus 404, robots, sitemap, resume.pdf and OG images, exists
// - every internal link and asset in every page resolves to a file, using the same
//   URL rewrite CloudFront runs (infra/url-rewrite.js)
// - every #fragment points at an id on the target page
// Run after `npm run build`.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { objectPath } from "./url-rewrite.mjs";

const OUT = path.resolve(import.meta.dirname, "../out");
const errors = [];

if (!existsSync(path.join(OUT, "index.html"))) {
  console.error("out/ is missing. Run npm run build first.");
  process.exit(1);
}

const fileFor = (urlPath) => path.join(OUT, objectPath(urlPath));
const nonEmpty = (file) => existsSync(file) && statSync(file).isFile() && statSync(file).size > 0;

// ── Required files and sitemap pages ──────────────────────────────────────
for (const f of ["404.html", "robots.txt", "sitemap.xml", "resume.pdf", "opengraph-image"]) {
  if (!nonEmpty(path.join(OUT, f))) errors.push(`missing out/${f}`);
}

const sitemap = readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]));
if (locs.length === 0) errors.push("sitemap.xml lists no pages");
const siteOrigin = locs[0]?.origin;

for (const url of locs) {
  const page = url.pathname;
  if (!nonEmpty(fileFor(page))) errors.push(`sitemap page ${page} has no file (${objectPath(page)})`);
  if (page.startsWith("/projects/")) {
    const og = `${page}/opengraph-image`;
    if (!nonEmpty(fileFor(og))) errors.push(`missing OG image ${og}`);
  }
}

// ── Internal links and fragments ──────────────────────────────────────────
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

const idCache = new Map();
function idsIn(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

/** URL path a page is served at, e.g. out/projects/gridlock.html → /projects/gridlock. */
function pagePath(file) {
  const rel = "/" + path.relative(OUT, file).split(path.sep).join("/");
  return rel === "/index.html" ? "/" : rel.replace(/\.html$/, "");
}

let checked = 0;
for (const file of htmlFiles(OUT)) {
  if (path.basename(file) === "_not-found.html") continue;
  const page = pagePath(file);
  // Drop scripts: the RSC payload repeats links in escaped JSON.
  const html = readFileSync(file, "utf8").replace(/<script\b[\s\S]*?<\/script>/g, "");

  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const ref = raw.replaceAll("&amp;", "&");
    if (/^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;

    const url = new URL(ref, siteOrigin + page);
    if (url.origin !== siteOrigin) continue; // external: covered by the scheduled link check

    checked++;
    const target = fileFor(url.pathname);
    if (!nonEmpty(target)) {
      errors.push(`${page}: broken ${attr} ${ref}`);
      continue;
    }
    const fragment = decodeURIComponent(url.hash.slice(1));
    if (fragment && target.endsWith(".html") && !idsIn(target).has(fragment)) {
      errors.push(`${page}: ${ref} points at #${fragment}, which isn't on ${url.pathname}`);
    }
  }
}

if (errors.length) {
  console.error(`Export check failed:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`Export OK: ${locs.length} sitemap pages, ${checked} internal links and assets.`);
