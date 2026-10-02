import { ProjectCard, WonderCard } from "@/components/projects/ProjectCard";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";
import { sections } from "@/content/site";
import { getProjects, toMeta } from "@/lib/content";

export function Projects() {
  const meta = sections[1];
  const projects = getProjects().map(toMeta);
  const wonder = projects.find((p) => p.tier === "wonder");
  const greatWorks = projects.filter((p) => p.tier === "great-work").slice(0, 3);

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id={`${meta.id}-title`}
          numeral={meta.numeral}
          label={meta.label}
          title={meta.title}
          intro="Things I've built, with the flagship first."
        />
        {wonder && (
          <Reveal>
            <WonderCard project={wonder} />
          </Reveal>
        )}
        <ul className={`mt-8 grid gap-6 md:grid-cols-2 ${greatWorks.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {greatWorks.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <ButtonLink href="/projects" variant="secondary">
            See all projects →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
