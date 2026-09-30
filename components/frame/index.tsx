import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { CornerFiligree, Laurel, Meander, Rosette } from "@/components/ornaments";
import { cn } from "@/lib/cn";

/* ── FramedPanel ─────────────────────────────────────────────────────────── */

type PanelVariant = "plain" | "ornate" | "parchment" | "dark";

type FramedPanelProps<T extends ElementType> = {
  as?: T;
  variant?: PanelVariant;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const surface: Record<PanelVariant, string> = {
  plain: "bg-ivory-0 border-gold-500/70",
  ornate: "bg-ivory-0 border-gold-500",
  parchment: "parchment-texture border-bronze-700/40",
  dark: "bg-lapis-800 border-gold-500 text-gold-300",
};

/**
 * The base container: ivory surface, gold double-rule frame, stone-square corners.
 * `ornate` adds filigree corners. `interactive` gilds and lifts on hover.
 */
export function FramedPanel<T extends ElementType = "div">({
  as,
  variant = "plain",
  interactive = false,
  className,
  children,
  ...rest
}: FramedPanelProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ornate = variant === "ornate";
  return (
    <Tag
      className={cn(
        "relative rounded-stone border shadow-[var(--shadow-panel)]",
        surface[variant],
        interactive &&
          "transition-[border-color,box-shadow,translate] duration-200 ease-[var(--ease-quick)] hover:-translate-y-0.5 hover:border-gold-600 hover:shadow-[var(--shadow-panel-lift)] focus-within:border-gold-600",
        className,
      )}
      {...rest}
    >
      {/* inset hairline: the second rule of the double frame */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-1 rounded-[1px] border",
          variant === "dark" ? "border-gold-500/30" : "border-gold-500/35",
        )}
      />
      {ornate && (
        <>
          <CornerFiligree className="pointer-events-none absolute -left-1 -top-1 text-gold-500" />
          <CornerFiligree className="pointer-events-none absolute -right-1 -top-1 rotate-90 text-gold-500" />
          <CornerFiligree className="pointer-events-none absolute -bottom-1 -right-1 rotate-180 text-gold-500" />
          <CornerFiligree className="pointer-events-none absolute -bottom-1 -left-1 -rotate-90 text-gold-500" />
        </>
      )}
      <div className="relative">{children}</div>
    </Tag>
  );
}

/* ── BannerHeader ────────────────────────────────────────────────────────── */

/** Swallowtail ribbon strip. */
export function BannerHeader({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center px-10 py-2",
        "[clip-path:polygon(0_0,100%_0,calc(100%-14px)_50%,100%_100%,0_100%,14px_50%)]",
        tone === "dark" ? "bg-lapis-800 text-gold-300" : "bg-marble-100 text-gold-800",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-[3px] h-px bg-gold-500/70" />
      <span aria-hidden className="absolute inset-x-0 bottom-[3px] h-px bg-gold-500/70" />
      <span className="label relative">{children}</span>
    </div>
  );
}

/* ── Divider ─────────────────────────────────────────────────────────────── */

export function Divider({
  variant = "hairline",
  className,
  draw = false,
}: {
  variant?: "hairline" | "meander" | "rosette" | "laurel";
  className?: string;
  /** Scale in from the center when its reveal parent is shown. */
  draw?: boolean;
}) {
  const drawProps = draw ? { "data-reveal-draw": "" } : {};
  if (variant === "meander") {
    return (
      <div aria-hidden className={cn("flex items-center gap-3 text-gold-500", className)} {...drawProps}>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/70" />
        <Meander className="w-40 shrink-0" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/70" />
      </div>
    );
  }
  if (variant === "rosette" || variant === "laurel") {
    return (
      <div aria-hidden className={cn("flex items-center gap-3 text-gold-500", className)} {...drawProps}>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/70" />
        {variant === "rosette" ? <Rosette /> : <Laurel className="h-6 w-6" leaves={6} />}
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/70" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={cn("h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent", className)}
      {...drawProps}
    />
  );
}

/* ── Medallion ───────────────────────────────────────────────────────────── */

/** Circular frame: gold gradient ring, bronze hairline, optional laurel. */
export function Medallion({
  size = 96,
  laurel = false,
  children,
  className,
}: {
  size?: number;
  laurel?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const pad = laurel ? size * 0.32 : 0;
  return (
    <div
      className={cn("relative grid shrink-0 place-items-center", className)}
      style={{ width: size + pad * 2, height: size + pad * 2 }}
    >
      {laurel && <Laurel className="absolute inset-0 h-full w-full text-gold-500" />}
      <div
        className="rounded-full p-[3px] shadow-[var(--shadow-panel)]"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(160deg, #e8d3a0, #c9a45c 45%, #a8843f)",
        }}
      >
        <div className="grid h-full w-full place-items-center overflow-hidden rounded-full border border-bronze-700/30 bg-ivory-0">
          {children}
        </div>
      </div>
    </div>
  );
}
