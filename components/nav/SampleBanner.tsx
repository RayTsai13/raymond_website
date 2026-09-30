/** Reminder that the content is filler. Toggle with `sampleContent` in content/site.ts. */
export function SampleBanner() {
  return (
    <p className="pointer-events-none fixed bottom-5 left-5 z-40 rounded-stone border border-pompeii-600/40 bg-ivory-0/95 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wide text-pompeii-600 shadow-[var(--shadow-panel)] md:left-20">
      Sample content · edit /content
    </p>
  );
}
