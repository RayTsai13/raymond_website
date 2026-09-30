"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Monogram, Rosette } from "@/components/ornaments";
import { buttonClass } from "@/components/ui";
import { sections, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { useActiveSection } from "./useActiveSection";

const IDS = sections.map((s) => s.id);
const NONE: string[] = [];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome ? IDS : NONE);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !onHome;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,box-shadow,border-color] duration-300",
        solid ? "border-b border-gold-500/50 bg-ivory-0/85 shadow-[0_1px_12px_rgb(60_40_10/0.05)] backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="flex items-center gap-3 text-gold-600">
          <Monogram className="h-9 w-9" />
          <span className="inscription sr-only text-sm font-semibold tracking-[0.16em] text-ink-900 sm:not-sr-only">{site.name}</span>
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="relative">
                  <a
                    href={onHome ? `#${s.id}` : `/#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn("label transition-colors", isActive ? "text-gold-800" : "text-ink-700 hover:text-gold-800")}
                  >
                    {s.id === "hobbies" ? "Hobbies" : s.label}
                  </a>
                  <Rosette
                    className={cn(
                      "absolute -bottom-3.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 text-gold-600 transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/resume" className={buttonClass("secondary", "sm", "hidden sm:inline-flex")}>
            Résumé
          </Link>
          <MobileMenu onHome={onHome} />
        </div>
      </div>
    </header>
  );
}
