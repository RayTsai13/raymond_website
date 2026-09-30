import { Meander, Monogram } from "@/components/ornaments";
import { site } from "@/content/site";
import { toRoman } from "@/lib/content";

// Evaluated once per build, so the quote rotates with each deploy.
const BUILT = new Date();
const QUOTE = site.quotes[Math.floor(BUILT.getTime() / 86_400_000) % site.quotes.length];

export function Footer() {
  const year = BUILT.getFullYear();
  const quote = QUOTE;

  return (
    <footer className="border-t border-gold-500/40 bg-ivory-0 px-4 pb-24 pt-2">
      <Meander className="opacity-80" />
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 text-center">
        <Monogram className="h-12 w-12 text-gold-600" />
        <p className="label text-ink-700">
          {site.name} · <span aria-hidden>{toRoman(year)} · </span>© {year}
        </p>
        <figure className="group">
          <blockquote className="font-italic text-lg italic text-ink-700" tabIndex={0}>
            “{quote.latin}”
          </blockquote>
          <figcaption className="mt-1 font-mono text-xs text-ink-500 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100">
            {quote.english}
            {"source" in quote && quote.source ? ` · ${quote.source}` : ""}
          </figcaption>
        </figure>
        <p className="font-mono text-xs text-ink-500">Built with Next.js · Set in Cinzel & EB Garamond</p>
      </div>
    </footer>
  );
}
