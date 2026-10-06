import { ScrollRoller, StarField } from "@/components/ornaments";
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
        <div aria-hidden className="pointer-events-none absolute -inset-x-4 inset-y-0 overflow-hidden max-md:hidden">
          <StarField depth="far" className="about-stars about-stars-far absolute inset-x-0 -top-1/4 h-[150%]" />
          <StarField depth="near" className="about-stars about-stars-near absolute inset-x-0 -top-1/4 h-[150%]" />
        </div>

        <Reveal className="about-drift relative mx-auto w-full max-w-3xl px-5">
          <div className="about-scroll pb-3.5">
            <ScrollRoller className="relative z-10" />
            <div className="relative">
              <div className="about-sheet parchment-texture relative -my-2 px-6 py-10 shadow-[inset_1px_0_0_rgb(107_78_46/0.14),inset_-1px_0_0_rgb(107_78_46/0.14),0_14px_30px_-6px_rgb(60_40_10/0.16)] md:px-14 md:py-12">
                {/* the sheet falls out of the top roll's shadow */}
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-linear-to-b from-[rgb(90_60_20/0.16)] to-transparent" />
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
                {/* the paper darkens as it curves into the bottom roll */}
                <span className="absolute inset-x-0 bottom-0 h-7 bg-linear-to-t from-[rgb(90_60_20/0.14)] to-transparent" />
                <ScrollRoller className="absolute inset-x-0 top-full -translate-y-1/2" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
