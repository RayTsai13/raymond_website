"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FramedPanel } from "@/components/frame";
import { Monogram } from "@/components/ornaments";
import { MenuButton } from "@/components/ui";
import { sections } from "@/content/site";

/** Full-screen "game menu" overlay for small screens. Traps focus; Esc closes. */
export function MobileMenu({ onHome }: { onHome: boolean }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="game-menu"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-stone border border-gold-500/70 text-gold-800 lg:hidden"
      >
        <span aria-hidden className="flex w-5 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {open && (
        <div
          id="game-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 grid h-dvh place-items-center bg-marble-50/95 px-6 backdrop-blur-sm lg:hidden"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div ref={panelRef} className="w-full max-w-sm">
            <FramedPanel variant="ornate" className="py-4">
              <div className="flex items-center justify-between px-6 pb-3">
                <Monogram className="h-9 w-9 text-gold-600" />
                <button type="button" onClick={close} aria-label="Close menu" className="grid h-10 w-10 place-items-center text-gold-800">
                  <X aria-hidden />
                </button>
              </div>
              <ul className="divide-y divide-gold-500/30 border-t border-gold-500/30">
                {sections.map((s) => (
                  <li key={s.id}>
                    <MenuButton href={onHome ? `#${s.id}` : `/#${s.id}`} onClick={close}>
                      <span className="mr-2 text-gold-800">{s.numeral}</span> {s.label}
                    </MenuButton>
                  </li>
                ))}
                <li>
                  <MenuButton href="/resume" onClick={close}>
                    The Scroll · Résumé
                  </MenuButton>
                </li>
              </ul>
            </FramedPanel>
          </div>
        </div>
      )}
    </>
  );
}
