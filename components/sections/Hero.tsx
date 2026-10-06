import { ChevronDown, Mail } from "lucide-react";
import { FramedPanel, Medallion } from "@/components/frame";
import { Mechanism } from "@/components/hero/Mechanism";
import { Monogram } from "@/components/ornaments";
import { MenuButton } from "@/components/ui";
import { socialIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** "Main Menu": medallion, inscription name, game-menu buttons over the Antikythera mechanism. */
export function Hero() {
  return (
    <section aria-label="Introduction" className="relative isolate flex min-h-dvh items-center justify-center overflow-x-clip px-4 pb-16 pt-28 short:pb-14 short:pt-20 tight:pb-6 tight:pt-[4.25rem] [view-timeline-name:--hero]">
      {/* warm light from above + the mechanism */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_0%,#fffaf0_0%,transparent_70%)]" />
      {/* bleeds below the hero behind About; fades out and recedes on scroll (.mech-recede) */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[max(150vmin,720px)] -translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,#000_55%,transparent_92%)]">
        <div className="mech-recede">
          <Mechanism className="block w-full opacity-80" />
        </div>
      </div>
      {/* soft ivory halo keeps the text column legible over the lines */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(251_248_242/0.92)_30%,rgb(251_248_242/0)_70%)]" />

      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <p className="label hero-enter mb-5 text-gold-800 short:mb-[clamp(0.5rem,2dvh,1.25rem)] tight:mb-1" style={d(300)}>
          Welcome
        </p>

        <div className="hero-enter short:[zoom:0.78] tight:[zoom:0.5]" style={d(450)}>
          {/* TODO(raymond): replace the monogram with a portrait (next/image, square ≥ 800px). */}
          <Medallion size={124} laurel>
            <Monogram className="h-20 w-20 text-gold-600" />
          </Medallion>
        </div>

        <h1 className="inscription gold-gradient-text hero-rise mt-4 text-[2.6rem] font-semibold leading-none tracking-[0.08em] short:mt-2 sm:text-6xl md:text-7xl short:md:text-6xl tight:md:text-5xl">
          {site.name}
        </h1>
        <p className="hero-enter mt-4 font-italic text-xl italic text-ink-700 short:mt-3 tight:mt-2 md:text-2xl tight:md:text-xl" style={d(800)}>
          {site.roleLine}
        </p>
        <p className="hero-enter mt-3 max-w-md text-ink-500 tight:mt-2" style={d(900)}>
          “{site.tagline}”
        </p>

        <FramedPanel as="nav" aria-label="Main menu" variant="ornate" className="hero-enter mt-9 w-full max-w-sm short:mt-[clamp(1.25rem,4dvh,2.25rem)] tight:mt-4" style={d(1050)}>
          <ul className="divide-y divide-gold-500/30 py-2 short:py-1 short:[&_a]:py-2.5 tight:[&_a]:py-2">
            <li>
              <MenuButton href="#experience" primary>
                Begin · Timeline
              </MenuButton>
            </li>
            <li>
              <MenuButton href="#projects">The Great Works</MenuButton>
            </li>
            <li>
              <MenuButton href="/resume">Résumé</MenuButton>
            </li>
            <li>
              <MenuButton href="#contact">Get in Touch</MenuButton>
            </li>
          </ul>
        </FramedPanel>

        <ul className="hero-enter mt-7 flex items-center gap-3 p-1 short:mt-[clamp(0.75rem,3.5dvh,1.75rem)] tight:mt-2" style={d(1200)}>
          {site.socials.map((s) => {
            const Icon = socialIcon(s.label);
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold-500 bg-ivory-0/70 text-gold-800 transition-colors hover:border-gold-800 hover:bg-gold-300/40"
                >
                  {Icon ? <Icon /> : s.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-500 bg-ivory-0/70 text-gold-800 transition-colors hover:border-gold-800 hover:bg-gold-300/40"
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden />
            </a>
          </li>
        </ul>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="hero-fade absolute bottom-6 short:bottom-3 tight:hidden left-1/2 -translate-x-1/2 text-gold-600 transition-colors hover:text-gold-800"
        style={d(1600)}
      >
        <ChevronDown aria-hidden className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
