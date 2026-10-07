import type { Metadata } from "next";
import { Suspense } from "react";
import { Codex, CodexView } from "@/components/projects/Codex";
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
        <SectionHeading as="h1" id="codex-title" label="All Projects" title="The Archive" intro="Every project, big and small. Filter by type or technology." />
        <Suspense fallback={<CodexView projects={projects} />}>
          <Codex projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
