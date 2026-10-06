import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/projects`, priority: 0.8 },
    { url: `${site.url}/resume`, priority: 0.5 },
    ...getProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.7 })),
  ];
}
