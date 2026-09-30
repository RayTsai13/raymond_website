import type { Metadata } from "next";
import { Download } from "lucide-react";
import { FramedPanel } from "@/components/frame";
import { Laurel } from "@/components/ornaments";
import { ButtonLink, buttonClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Raymond Tsai's résumé.",
};

// TODO(raymond): add public/resume.pdf, then enable the download button and optionally render an HTML résumé here.
export default function ResumePage() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 pb-24 pt-32">
      <FramedPanel variant="ornate" className="w-full max-w-xl px-8 py-14 text-center">
        <Laurel className="mx-auto h-16 w-16 text-gold-500" />
        <p className="label mt-4 text-ink-500">Résumé</p>
        <h1 className="inscription mt-2 text-3xl font-semibold text-ink-900 md:text-4xl">The Scroll</h1>
        <p className="mx-auto mt-4 max-w-[36ch] font-italic text-xl italic text-ink-700">
          The scroll is still being inscribed. Check back soon.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" disabled className={buttonClass("primary", "md")}>
            <Download size={16} aria-hidden /> Download PDF
          </button>
          <ButtonLink href="/#experience" variant="secondary">
            View the Ages instead
          </ButtonLink>
        </div>
      </FramedPanel>
    </div>
  );
}
