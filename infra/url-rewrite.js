// CloudFront Function (viewer request) for the static export in out/.
// - www.<domain> → 301 to the bare domain
// - clean URLs: /resume → /resume.html, /projects/ → /projects.html, / → /index.html
// Extensionless OG images (…/opengraph-image) are real objects and pass through.
function handler(event) {
  var request = event.request;
  var host = request.headers.host ? request.headers.host.value : "";

  if (host.indexOf("www.") === 0) {
    var qs = Object.keys(request.querystring).map(function (k) {
      var v = request.querystring[k];
      return v.value ? k + "=" + v.value : k;
    }).join("&");
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: "https://" + host.slice(4) + request.uri + (qs ? "?" + qs : "") } },
    };
  }

  var uri = request.uri;
  if (uri === "/") {
    request.uri = "/index.html";
    return request;
  }
  if (uri.length > 1 && uri.charAt(uri.length - 1) === "/") uri = uri.slice(0, -1);
  var last = uri.slice(uri.lastIndexOf("/") + 1);
  if (last.indexOf(".") === -1 && last !== "opengraph-image") uri += ".html";
  request.uri = uri;
  return request;
}
