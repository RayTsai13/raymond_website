import { Meander, Monogram } from "@/components/ornaments";
import { site } from "@/content/site";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-gold-500/40 bg-ivory-0 px-4 pb-24 pt-2">
      <Meander className="opacity-80" />
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 text-center">
        <Monogram className="h-12 w-12 text-gold-600" />
        <p className="label text-ink-700">
          {site.name} · © {YEAR}
        </p>
        <p className="font-mono text-xs text-ink-500">Built with Next.js · Set in Cinzel & EB Garamond</p>
      </div>
    </footer>
  );
}
