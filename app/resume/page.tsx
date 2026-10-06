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
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-24">
      <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Laurel className="h-10 w-10 shrink-0 text-gold-500" />
          <div>
            <h1 className="inscription text-2xl font-semibold text-ink-900 md:text-3xl">Résumé</h1>
            <p className="label mt-1 text-ink-500">Updated September 2026</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={RESUME} download="Raymond_Tsai_Resume.pdf" size="sm">
            <Download size={16} aria-hidden /> Download PDF
          </ButtonLink>
          <ButtonLink href={RESUME} variant="secondary" size="sm" target="_blank" rel="noopener">
            <ExternalLink size={16} aria-hidden /> Open in browser
          </ButtonLink>
        </div>
      </header>

      {/* Native viewer, no JS. Browsers without inline PDF support (most Android) show the fallback.
          Height = one Letter page at full width plus room for the browser's PDF toolbar. */}
      <FramedPanel variant="ornate" className="@container mt-6 w-full p-2">
        <object
          data={`${RESUME}#view=FitH&navpanes=0`}
          type="application/pdf"
          aria-label="Raymond Tsai's résumé (PDF)"
          className="block h-[calc(100cqw*11/8.5+3.5rem)] w-full rounded-[1px] bg-ivory-0"
        >
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="max-w-[32ch] text-ink-700">
              Your browser can&rsquo;t show the PDF here. Use the buttons above to download it or
              open it in a new tab.
            </p>
          </div>
        </object>
      </FramedPanel>
    </div>
  );
}
