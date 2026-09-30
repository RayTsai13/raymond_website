"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IonicCapital } from "@/components/ornaments";

/**
 * Wraps the Experience timeline. Exposes scroll progress through the section
 * as --rail (0→1) so the gold rail draws itself; full under reduced motion.
 */
export function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--rail", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.65;
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      el.style.setProperty("--rail", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative py-10" style={{ "--rail": 0 } as React.CSSProperties}>
      {/* rail: faint track + gold fill that grows with scroll */}
      <div aria-hidden className="absolute bottom-6 left-5 top-6 w-px -translate-x-1/2 md:left-1/2">
        <div className="absolute inset-0 bg-stone-300" />
        <div className="absolute inset-0 origin-top bg-gradient-to-b from-gold-500 to-gold-600" style={{ transform: "scaleY(var(--rail))" }} />
      </div>
      <IonicCapital className="absolute left-5 top-0 -translate-x-1/2 text-gold-600 md:left-1/2" />
      <IonicCapital className="absolute bottom-0 left-5 -translate-x-1/2 rotate-180 text-gold-600 md:left-1/2" />
      {children}
    </div>
  );
}
