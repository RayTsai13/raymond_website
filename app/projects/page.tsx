import type { Metadata } from "next";
import { Suspense } from "react";
import { Codex } from "@/components/projects/Codex";
import { SectionHeading } from "@/components/ui";
import { getProjects, toMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every project Raymond Tsai has built, filterable by type and technology.",
};

export default function ProjectsPage() {
  const projects = getProjects().map(toMeta);
  return (
    <div className="px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="codex-title" label="All Projects" title="The Codex" intro="Every work, great and small. Filter by type or technology." />
        <Suspense>
          <Codex projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
