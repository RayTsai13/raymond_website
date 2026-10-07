import assert from "node:assert/strict";
import { test } from "node:test";
import { handler, objectPath, viewerRequest } from "../scripts/url-rewrite.mjs";

test("root maps to index.html", () => {
  assert.equal(objectPath("/"), "/index.html");
});

test("clean URLs map to .html files, with or without a trailing slash", () => {
  assert.equal(objectPath("/resume"), "/resume.html");
  assert.equal(objectPath("/resume/"), "/resume.html");
  assert.equal(objectPath("/projects"), "/projects.html");
  assert.equal(objectPath("/projects/gridlock"), "/projects/gridlock.html");
  assert.equal(objectPath("/projects/gridlock/"), "/projects/gridlock.html");
});

test("files with an extension pass through", () => {
  assert.equal(objectPath("/resume.pdf"), "/resume.pdf");
  assert.equal(objectPath("/_next/static/chunks/app.js"), "/_next/static/chunks/app.js");
  assert.equal(objectPath("/sitemap.xml"), "/sitemap.xml");
});

test("extensionless OG images pass through", () => {
  assert.equal(objectPath("/opengraph-image"), "/opengraph-image");
  assert.equal(objectPath("/projects/gridlock/opengraph-image"), "/projects/gridlock/opengraph-image");
});

test("www redirects to the bare domain and keeps path and query", () => {
  const res = handler(
    viewerRequest("/projects/gridlock", {
      host: "www.raymondtsai.site",
      querystring: { ref: { value: "x" }, flag: { value: "" } },
    }),
  );
  assert.equal(res.statusCode, 301);
  assert.equal(res.headers.location.value, "https://raymondtsai.site/projects/gridlock?ref=x&flag");
});

test("www redirect without a query string has no trailing ?", () => {
  const res = handler(viewerRequest("/", { host: "www.raymondtsai.site" }));
  assert.equal(res.headers.location.value, "https://raymondtsai.site/");
});
