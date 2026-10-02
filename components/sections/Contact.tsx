import { Mail, ScrollText } from "lucide-react";
import { FramedPanel } from "@/components/frame";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";
import { socialIcon } from "@/components/ui/icons";
import { sections, site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const meta = sections[4];
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="bg-marble-100/60 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id={`${meta.id}-title`} numeral={meta.numeral} label={meta.label} title={meta.title} />
        <Reveal>
          <FramedPanel variant="ornate" className="px-6 py-10 text-center md:px-14 md:py-14">
            {/* TODO(raymond): say what you're open to */}
            <p className="mx-auto max-w-[46ch] text-xl text-ink-700">
              Open to internships, full-time roles, and interesting collaborations. The fastest route is email.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${site.email}`} size="lg">
                <Mail size={16} aria-hidden /> Email Me
              </ButtonLink>
              <ButtonLink href="/resume" variant="secondary" size="lg">
                <ScrollText size={16} aria-hidden /> Résumé
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-gold-500/40 pt-6">
              <CopyEmail email={site.email} />
              {site.socials.map((s) => {
                const Icon = socialIcon(s.label);
                return (
                  <a key={s.label} href={s.href} className="prose-link inline-flex items-center gap-2 font-mono text-sm">
                    {Icon && <Icon width={15} height={15} />}
                    {s.label}
                  </a>
                );
              })}
            </div>
          </FramedPanel>
        </Reveal>
      </div>
    </section>
  );
}
