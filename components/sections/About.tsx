import { FramedPanel } from "@/components/frame";
import { Reveal } from "@/components/ui";
import { site } from "@/content/site";

/** About: the one parchment surface on the site. */
export function About() {
  const [first, ...rest] = site.about;
  return (
    <section id="about" aria-labelledby="about-title" className="px-4 py-20 md:py-28">
      <Reveal className="mx-auto max-w-3xl">
        <FramedPanel variant="parchment" className="px-6 py-10 md:px-14 md:py-14">
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
        </FramedPanel>
      </Reveal>
    </section>
  );
}
