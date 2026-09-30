import { TechTree } from "@/components/skills/TechTree";
import { Reveal, SectionHeading } from "@/components/ui";
import { sections } from "@/content/site";
import { getSkills } from "@/lib/content";

export function Skills() {
  const meta = sections[2];
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="bg-marble-100/60 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id={`${meta.id}-title`}
          numeral={meta.numeral}
          label={meta.label}
          title={meta.title}
          intro="Hover or focus a technology to trace what it builds on."
        />
        <Reveal>
          <TechTree skills={getSkills()} />
        </Reveal>
      </div>
    </section>
  );
}
