import { FramedPanel } from "@/components/frame";
import { Emblem } from "@/components/ornaments/Emblems";
import { Reveal, SectionHeading } from "@/components/ui";
import { sections } from "@/content/site";
import { getHobbies } from "@/lib/content";

/** "The Forum": small cards whose detail rises on hover/focus (always shown on touch). */
export function Hobbies() {
  const meta = sections[3];
  const hobbies = getHobbies();
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id={`${meta.id}-title`}
          numeral={meta.numeral}
          label={meta.label}
          title={meta.title}
          intro="What I do when I'm not writing code."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hobbies.map((h, i) => (
            <Reveal as="li" key={h.name} delay={i * 60}>
              <FramedPanel as="article" interactive tabIndex={0} className="group h-full overflow-hidden p-6 text-center outline-none">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-500 bg-marble-50 text-gold-600 transition-colors duration-300 group-hover:border-gold-600 group-hover:text-gold-800">
                  <Emblem name={h.icon} className="h-9 w-9" />
                </div>
                <h3 className="inscription mt-4 text-lg font-semibold text-ink-900">{h.name}</h3>
                <p className="mt-2 text-base text-ink-700">{h.line}</p>
                <p className="mt-3 border-t border-gold-500/40 pt-3 font-italic text-base italic text-ink-500 transition-all duration-300 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                  {h.detail}
                </p>
              </FramedPanel>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
