import { Mechanism } from "@/components/hero/Mechanism";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-4 pt-16 text-center">
      <Mechanism className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[max(120vmin,600px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div>
        <p className="label text-gold-800">404 · Terra Incognita</p>
        <h1 className="inscription mt-3 text-4xl font-semibold text-ink-900 md:text-6xl">These lands are uncharted</h1>
        <p className="mx-auto mt-4 max-w-[40ch] font-italic text-xl italic text-ink-700">
          The page you sought lies beyond the edge of the map.
        </p>
        <ButtonLink href="/" className="mt-8">
          Return to the Capital
        </ButtonLink>
      </div>
    </div>
  );
}
