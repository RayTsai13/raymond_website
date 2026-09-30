"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fades its child up once as it scrolls into view.
 *
 * Fail-safe by design: content renders visible, and only an element that is
 * still below the fold once JS runs gets hidden (data-reveal="pending") and
 * then revealed (data-reveal="shown"). If JS never runs, nothing is hidden.
 * Styling lives in globals.css.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute("data-reveal", "shown");

    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadyVisible || reduceMotion || !("IntersectionObserver" in window)) {
      show();
      return;
    }

    el.setAttribute("data-reveal", "pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      // threshold 0 so tall elements still trigger; fire slightly before fully in view
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      show(); // never leave content hidden on unmount/remount
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
