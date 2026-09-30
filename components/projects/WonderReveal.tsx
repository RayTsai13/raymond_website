"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BannerHeader } from "@/components/frame";

/**
 * "Wonder Completed" flourish: the banner unfurls and the title rises,
 * once per project per session. Content is never hidden; this is decoration only.
 */
export function WonderReveal({ slug, banner, children }: { slug: string; banner: string; children: ReactNode }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const key = `wonder-seen:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      return;
    }
    // Deferred so the first paint is the final state for returning visitors.
    const raf = requestAnimationFrame(() => setPlay(true));
    const skip = () => setPlay(false);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    const done = setTimeout(skip, 1400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [slug]);

  return (
    <header className="mt-6">
      <div className={play ? "unfurl" : undefined}>
        <BannerHeader tone="dark">{banner}</BannerHeader>
      </div>
      <div className={play ? "hero-enter" : undefined} style={{ "--d": "250ms" } as React.CSSProperties}>
        {children}
      </div>
    </header>
  );
}
