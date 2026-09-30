"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sections } from "@/content/site";
import { cn } from "@/lib/cn";

/** Civ's End Turn, reimagined: jumps to the next home section, or back to the top. */
export function NextTurnButton() {
  const onHome = usePathname() === "/";
  const [visible, setVisible] = useState(false);
  const [next, setNext] = useState<(typeof sections)[number] | null>(sections[0]);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome) return;
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
      // The next section is the first one whose top is still below the nav line.
      const line = 96;
      const upcoming = sections.find((s) => {
        const el = document.getElementById(s.id);
        return el && el.getBoundingClientRect().top > line + 4;
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setNext(atBottom ? null : (upcoming ?? null));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 1000);
    return () => clearTimeout(t);
  }, [flash]);

  if (!onHome) return null;

  const label = next ? `Next section: ${next.label}` : "Return to top";
  const ring = next ? "NEXT TURN · NEXT TURN · " : "RETURN · RETURN · RETURN · ";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        if (next) {
          document.getElementById(next.id)?.scrollIntoView({ block: "start" });
          setFlash(next.label);
        } else {
          window.scrollTo({ top: 0 });
          setFlash("Return");
        }
      }}
      className={cn(
        "group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full transition-[opacity,translate,scale] duration-300 ease-[var(--ease-quick)] active:scale-95 md:bottom-6 md:right-6 md:h-[76px] md:w-[76px]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {/* gold ring + ivory centre */}
      <span
        aria-hidden
        className="breathe absolute inset-0 rounded-full p-[3px] shadow-[var(--shadow-panel-lift)]"
        style={{ background: "linear-gradient(160deg,#e8d3a0,#c9a45c 45%,#a8843f)" }}
      >
        <span className="block h-full w-full rounded-full border border-bronze-700/30 bg-ivory-0" />
      </span>
      {/* circular label (desktop) */}
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 hidden transition-transform duration-500 group-hover:rotate-[15deg] md:block">
        <defs>
          <path id="nt-circle" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1 -72 0" />
        </defs>
        <text fontFamily="var(--font-cinzel), serif" fontSize="9.5" fontWeight="600" letterSpacing="2.2" fill="#7a5c24">
          <textPath href="#nt-circle">{ring}</textPath>
        </text>
      </svg>
      <ChevronDown
        aria-hidden
        className={cn("relative text-gold-800 transition-transform duration-300 md:h-5 md:w-5", !next && "rotate-180")}
        strokeWidth={2}
      />
      {/* destination flash */}
      <span
        aria-hidden
        className={cn(
          "label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-stone border border-gold-500 bg-lapis-800 px-3 py-1.5 text-gold-300 transition-opacity duration-300",
          flash ? "opacity-100" : "opacity-0",
        )}
      >
        {flash}
      </span>
    </button>
  );
}
