import { site } from "@/content/site";
import { getProject, getProjects } from "@/lib/content";
import { ogSize, renderOg } from "@/lib/og";

export const dynamic = "force-static";

export const alt = "Project";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOg({
    eyebrow: project?.tier === "wonder" ? "Wonder" : "Great Work",
    title: project?.title ?? "Project",
    subtitle: `${site.name} · ${project?.stack.slice(0, 3).join(" · ") ?? ""}`,
  });
}
