import { DustMotes, ScrollRoller } from "@/components/ornaments";
import { Reveal } from "@/components/ui";
import { site } from "@/content/site";

/**
 * About: the one parchment surface on the site, as a hanging scroll.
 * Where scroll timelines are supported it flies in as the hero mechanism
 * recedes, then unrolls top-down while pinned (.about-* in globals.css).
 * Without support, or under reduced motion, it renders open and static.
 */
export function About() {
  const [first, ...rest] = site.about;
  return (
    <section aria-labelledby="about-title" className="about-track relative px-4 py-20 md:py-28">
      {/* anchor target: lands on the open scroll in the pinned layout */}
      <span id="about" aria-hidden className="about-anchor absolute left-0 top-0" />
      <div className="about-stage relative">
        <div aria-hidden className="pointer-events-none absolute -inset-x-4 inset-y-0 overflow-hidden">
          <DustMotes depth="far" className="about-dust about-dust-far absolute inset-x-0 -top-1/4 h-[150%] w-full" />
          <DustMotes depth="mid" className="about-dust about-dust-mid absolute inset-x-0 -top-1/4 h-[150%] w-full" />
          <DustMotes depth="near" className="about-dust about-dust-near absolute inset-x-0 -top-1/4 h-[150%] w-full" />
        </div>

        <Reveal className="about-drift relative mx-auto w-full max-w-3xl px-5">
          <div className="about-scroll pb-3.5">
            <ScrollRoller className="relative z-10" />
            <div className="relative">
              <div className="about-sheet parchment-texture -my-1.5 border-x border-bronze-700/40 px-6 py-10 shadow-panel md:px-14 md:py-12">
                <h2 id="about-title" className="label mb-6 text-center text-bronze-700">
                  About
                </h2>
                <p className="text-lg leading-relaxed text-ink-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.6rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-gold-800 md:text-xl">
                  {first}
                </p>
                {rest.map((p) => (
                  <p key={p} className="mt-4 text-lg leading-relaxed text-ink-900 md:text-xl">
                    {p}
                  </p>
                ))}
                <p className="mt-8 border-t border-bronze-700/25 pt-5 font-mono text-sm text-ink-700">
                  <span className="label mr-2 text-pompeii-600">Now</span>
                  {site.now}
                </p>
              </div>
              {/* the bottom roller rides this layer from the top edge (rolled) to the bottom (open) */}
              <div className="about-roller pointer-events-none absolute inset-0 z-10">
                <ScrollRoller className="absolute inset-x-0 top-full -translate-y-1/2" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
