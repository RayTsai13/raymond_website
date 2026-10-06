import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is prerendered, so the site ships as static files (out/) to S3 + CloudFront.
  output: "export",
  // No image optimizer without a server: covers are served as-is from public/.
  images: { unoptimized: true },
};

export default nextConfig;
