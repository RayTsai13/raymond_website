import { BannerHeader, FramedPanel } from "@/components/frame";
import { Laurel, Rosette } from "@/components/ornaments";
import { Reveal, SectionHeading, TechTags } from "@/components/ui";
import { getSection } from "@/content/site";
import { formatRange, getExperience, getHonors, type Age, type Experience as Entry } from "@/lib/content";
import { cn } from "@/lib/cn";
import { TimelineRail } from "./TimelineRail";

const AGES: Record<Age, { name: string; blurb: string; text: string }> = {
  antiquity: {
    name: "Age of Antiquity",
    blurb: "Foundations: education and first works",
    text: "text-terracotta-600",
  },
  exploration: {
    name: "Age of Exploration",
    blurb: "Internships, research, and teaching",
    text: "text-lapis-600",
  },
  modern: {
    name: "The Modern Age",
    blurb: "Where the chronicle stands today",
    text: "text-verdigris-600",
  },
};

const ORDER: Age[] = ["antiquity", "exploration", "modern"];

export function Experience() {
  const meta = getSection("experience")!;
  const entries = getExperience();
  let index = 0; // global index for left/right alternation

  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="bg-marble-100/60 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id={`${meta.id}-title`}
          numeral={meta.numeral}
          label={meta.label}
          title={meta.title}
          intro="A career told in three ages, from first foundations to the present day."
        />

        <TimelineRail>
          {ORDER.map((age) => {
            const items = entries
              .filter((e) => e.age === age)
              .sort((a, b) => a.start.localeCompare(b.start)); // chronological, like the Ages
            if (!items.length) return null;
            const a = AGES[age];
            return (
              <div key={age} className="relative py-8">
                <Reveal className="relative z-10 mb-10 flex flex-col items-start pl-12 md:items-center md:pl-0">
                  <BannerHeader>
                    <span className={a.text}>{a.name}</span>
                  </BannerHeader>
                  <p className="mt-2 font-italic text-lg italic text-ink-500">{a.blurb}</p>
                </Reveal>
                <ol className="space-y-10 md:space-y-14">
                  {items.map((e) => (
                    <TimelineEntry key={`${e.org}-${e.start}`} entry={e} side={index++ % 2 === 0 ? "left" : "right"} />
                  ))}
                </ol>
              </div>
            );
          })}
        </TimelineRail>

        <Honors />
      </div>
    </section>
  );
}

function TimelineEntry({ entry, side }: { entry: Entry; side: "left" | "right" }) {
  return (
    <li className="relative">
      <Reveal className="group md:grid md:grid-cols-2 md:gap-16">
        {/* node on the rail */}
        <span
          aria-hidden
          className="absolute left-5 top-6 z-10 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-stone-300 bg-ivory-0 text-stone-300 transition-colors duration-500 group-data-[reveal=shown]:border-gold-600 group-data-[reveal=shown]:text-gold-600 md:left-1/2"
        >
          <Rosette />
          {entry.current && (
            <span className="absolute inset-0 rounded-full border border-pompeii-600/60 motion-safe:animate-ping" />
          )}
        </span>

        <div className={cn("pl-12 md:pl-0", side === "right" && "md:col-start-2")}>
          <FramedPanel as="article" interactive className="p-6 md:p-7">
            <p className="label text-gold-800">{entry.org}</p>
            <h3 className="mt-1 font-display text-xl font-medium leading-snug text-ink-900 md:text-2xl">{entry.role}</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-500">
              {formatRange(entry.start, entry.end)}
              {entry.location && <> · {entry.location}</>}
              {entry.current && <span className="label ml-2 text-[0.65rem] text-pompeii-600">· You are here</span>}
            </p>
            <ul className="mt-4 space-y-2">
              {entry.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-base text-ink-700">
                  <Rosette className="mt-1.5 h-2.5 w-2.5 shrink-0 text-gold-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {entry.stack.length > 0 && <TechTags items={entry.stack} className="mt-5" />}
          </FramedPanel>
        </div>
      </Reveal>
    </li>
  );
}

/** "Great People earned": awards and achievements as laurel badges beneath the timeline. */
function Honors() {
  const honors = getHonors();
  if (!honors.length) return null;
  return (
    <Reveal className="mt-16">
      <h3 className="label text-center text-ink-500">Honors &amp; Achievements</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {honors.map((h) => (
          <li key={h.title}>
            <FramedPanel className="h-full p-4">
              <div className="flex items-center gap-4">
              <Laurel className="h-12 w-12 shrink-0 text-gold-500" leaves={7} />
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-ink-900">{h.title}</p>
                <p className="font-mono text-[0.7rem] uppercase tracking-wide text-ink-500">
                  {h.year}
                  {h.note && <> · {h.note}</>}
                </p>
              </div>
              </div>
            </FramedPanel>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
