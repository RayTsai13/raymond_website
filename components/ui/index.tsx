import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Divider } from "@/components/frame";
import { Rosette } from "@/components/ornaments";
import { cn } from "@/lib/cn";
import type { ProjectStatus } from "@/lib/content";
import { Reveal } from "./Reveal";

/* ── Button ──────────────────────────────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "label inline-flex items-center justify-center gap-2 rounded-stone transition-[background,border-color,color,box-shadow] duration-200 ease-[var(--ease-quick)] disabled:cursor-not-allowed disabled:opacity-50";

const buttonVariant: Record<ButtonVariant, string> = {
  primary:
    "border border-gold-600 bg-[linear-gradient(180deg,#f0dfb4,#d9b875_55%,#c9a45c)] text-ink-900 shadow-[var(--shadow-panel)] hover:border-gold-800 hover:shadow-[var(--shadow-panel-lift)]",
  secondary: "border border-gold-600 bg-ivory-0/60 text-gold-800 hover:bg-gold-300/30 hover:border-gold-800",
  ghost: "text-gold-800 underline decoration-gold-500/0 underline-offset-4 hover:decoration-gold-800",
};

const buttonSize: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[0.7rem]",
  md: "h-11 px-5",
  lg: "h-14 px-7 text-[0.8rem]",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(buttonBase, buttonVariant[variant], buttonSize[size], className);
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: { href: string; variant?: ButtonVariant; size?: ButtonSize; children: ReactNode } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
>) {
  const cls = buttonClass(variant, size, className);
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

/* ── MenuButton (hero + mobile "game menu") ──────────────────────────────── */

export function MenuButton({
  href,
  children,
  primary = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 overflow-hidden px-6 py-3.5 font-display text-[0.95rem] font-semibold uppercase tracking-[0.16em] outline-offset-[-2px] transition-colors duration-200",
        primary ? "text-gold-800" : "text-ink-900 hover:text-gold-800 focus-visible:text-gold-800",
      )}
    >
      {/* sweep */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-300/45 to-transparent transition-transform duration-300 ease-[var(--ease-quick)] group-hover:translate-x-0 group-focus-visible:translate-x-0"
      />
      {/* selection bar */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-2 left-0 w-[3px] bg-gold-600 transition-transform duration-200 ease-[var(--ease-quick)]",
          primary ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100",
        )}
      />
      <Rosette
        className={cn(
          "relative transition-opacity duration-200",
          primary ? "text-gold-600 opacity-100" : "text-gold-500 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      />
      <span className="relative transition-transform duration-200 ease-[var(--ease-quick)] group-hover:translate-x-1 group-focus-visible:translate-x-1">
        {children}
      </span>
    </a>
  );
}

/* ── TechTag / StatusPill ────────────────────────────────────────────────── */

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-stone border border-gold-500/60 bg-marble-50 px-2 py-0.5 font-mono text-[0.72rem] uppercase tracking-[0.04em] text-ink-700">
      {children}
    </span>
  );
}

export function TechTags({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <TechTag>{t}</TechTag>
        </li>
      ))}
    </ul>
  );
}

const statusStyle: Record<ProjectStatus, { label: string; dot: string; text: string }> = {
  live: { label: "Live", dot: "bg-verdigris-600", text: "text-verdigris-600" },
  shipped: { label: "Shipped", dot: "bg-gold-600", text: "text-gold-800" },
  "in-progress": { label: "In progress", dot: "bg-lapis-600 animate-pulse", text: "text-lapis-600" },
  archived: { label: "Archived", dot: "bg-ink-500", text: "text-ink-500" },
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  const s = statusStyle[status];
  return (
    <span className={cn("label inline-flex items-center gap-1.5 text-[0.65rem]", s.text)}>
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/* ── SectionHeading ──────────────────────────────────────────────────────── */

/**
 * Plain label (for skimmers & screen readers) + themed title, in one h2.
 * e.g. "I · Experience" / "The Ages".
 */
export function SectionHeading({
  id,
  numeral,
  label,
  title,
  intro,
  align = "center",
}: {
  id: string;
  numeral?: string;
  label: string;
  title: string;
  intro?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={cn("mb-12 md:mb-16", centered && "text-center")}>
      <h2 id={id} className="flex flex-col gap-3">
        <span className="label text-ink-500">
          {numeral && (
            <>
              <span className="text-gold-800">{numeral}</span>
              <span aria-hidden> · </span>
              <span className="sr-only">. </span>
            </>
          )}
          {label}
        </span>
        <span className="sr-only">: </span>
        <span className="inscription text-[2rem] font-semibold leading-[1.1] text-ink-900 md:text-[2.75rem]">
          {title}
        </span>
      </h2>
      <Divider variant="meander" draw className={cn("mt-5", centered ? "mx-auto max-w-md" : "max-w-xs")} />
      {intro && (
        <p className={cn("mt-5 text-lg text-ink-700 md:text-xl", centered && "mx-auto max-w-[60ch]")}>{intro}</p>
      )}
    </Reveal>
  );
}

export { Reveal };
