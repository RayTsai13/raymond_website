// Serves out/ the way CloudFront does: URLs go through infra/url-rewrite.js,
// and missing pages get 404.html with a 404 status. Used by the Playwright tests.
// Usage: node scripts/serve-out.mjs [port]
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { objectPath } from "./url-rewrite.mjs";

const OUT = path.resolve(import.meta.dirname, "../out");
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function send(res, status, file) {
  const type = path.basename(file) === "opengraph-image" ? "image/png" : TYPES[path.extname(file)];
  res.writeHead(status, { "content-type": type ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const file = path.join(OUT, path.normalize(objectPath(decodeURIComponent(pathname))));
  if (file.startsWith(OUT) && existsSync(file) && statSync(file).isFile()) send(res, 200, file);
  else send(res, 404, path.join(OUT, "404.html"));
}).listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}`));
