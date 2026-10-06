import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { FramedPanel } from "@/components/frame";
import { Laurel } from "@/components/ornaments";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Raymond Tsai's résumé.",
};

const RESUME = "/resume.pdf";

export default function ResumePage() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 pb-24 pt-32">
      <FramedPanel variant="ornate" className="w-full max-w-xl px-8 py-14 text-center">
        <Laurel className="mx-auto h-16 w-16 text-gold-500" />
        <p className="label mt-4 text-ink-500">Updated September 2026</p>
        <h1 className="inscription mt-2 text-3xl font-semibold text-ink-900 md:text-4xl">Résumé</h1>
        <p className="mx-auto mt-4 max-w-[36ch] font-italic text-xl italic text-ink-700">
          A one-page PDF of my education, experience, and projects.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={RESUME} download="Raymond_Tsai_Resume.pdf">
            <Download size={16} aria-hidden /> Download PDF
          </ButtonLink>
          <ButtonLink href={RESUME} variant="secondary" target="_blank" rel="noopener">
            <ExternalLink size={16} aria-hidden /> Open in browser
          </ButtonLink>
        </div>
      </FramedPanel>
    </div>
  );
}
