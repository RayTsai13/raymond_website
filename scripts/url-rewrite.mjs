// Loads the CloudFront Function in infra/url-rewrite.js so Node scripts and tests
// resolve URLs exactly the way production does. The function is a bare script
// (CloudFront's runtime has no modules), so it's evaluated in a VM context.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../infra/url-rewrite.js", import.meta.url), "utf8");
const context = {};
vm.runInNewContext(source, context);

export const handler = context.handler;

/** Builds a CloudFront viewer-request event for `uri` on `host`. */
export function viewerRequest(uri, { host = "raymondtsai.site", querystring = {} } = {}) {
  return { request: { uri, headers: { host: { value: host } }, querystring } };
}

/** Maps a URL path to the object key it is served from, e.g. /resume → /resume.html. */
export function objectPath(uri) {
  return handler(viewerRequest(uri)).uri;
}
