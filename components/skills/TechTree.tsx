"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Skill } from "@/lib/content";

const COLUMNS: { id: Skill["column"]; name: string; blurb: string }[] = [
  { id: "foundations", name: "Foundations", blurb: "Languages & fundamentals" },
  { id: "systems", name: "Systems & Frameworks", blurb: "Tools built upon them" },
  { id: "specialties", name: "Specialties", blurb: "Where it all leads" },
];

const STATE_LABEL: Record<Skill["state"], string> = {
  mastered: "Mastered",
  proficient: "Proficient",
  researching: "Researching",
};

type Edge = { from: string; to: string; d: string };

/** Walk `requires` upward: every prerequisite of `id`, plus `id` itself. */
function ancestors(id: string, byId: Map<string, Skill>, out = new Set<string>()) {
  out.add(id);
  for (const r of byId.get(id)?.requires ?? []) if (!out.has(r)) ancestors(r, byId, out);
  return out;
}

export function TechTree({ skills }: { skills: Skill[] }) {
  const byId = useMemo(() => new Map(skills.map((s) => [s.id, s])), [skills]);
  const unlocks = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of skills) for (const r of s.requires) m.set(r, [...(m.get(r) ?? []), s.name]);
    return m;
  }, [skills]);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>());
  const [edges, setEdges] = useState<Edge[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<string | null>(null);

  const lit = useMemo(() => (active ? ancestors(active, byId) : null), [active, byId]);

  // Measure node positions → bezier edges from prerequisite (right edge) to dependent (left edge).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const box = container.getBoundingClientRect();
      const next: Edge[] = [];
      for (const s of skills) {
        const to = nodeRefs.current.get(s.id)?.getBoundingClientRect();
        if (!to) continue;
        for (const r of s.requires) {
          const from = nodeRefs.current.get(r)?.getBoundingClientRect();
          if (!from) continue;
          if (byId.get(r)?.column === s.column) {
            // Same column: a short vertical link from the bottom of one node to the top of the next.
            const x = from.left + from.width / 2 - box.left;
            next.push({ from: r, to: s.id, d: `M${x} ${from.bottom - box.top}L${x} ${to.top - box.top}` });
            continue;
          }
          const x1 = from.right - box.left;
          const y1 = from.top + from.height / 2 - box.top;
          const x2 = to.left - box.left;
          const y2 = to.top + to.height / 2 - box.top;
          const mx = (x1 + x2) / 2;
          next.push({ from: r, to: s.id, d: `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}` });
        }
      }
      setEdges(next);
      setSize({ w: box.width, h: box.height });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [skills, byId]);

  return (
    <div>
      <div ref={containerRef} className="relative grid gap-10 md:grid-cols-3 md:gap-20">
        {/* edges: decorative, desktop only */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          fill="none"
        >
          {edges.map((e) => {
            const on = lit?.has(e.from) && lit?.has(e.to);
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={e.d}
                strokeWidth={on ? 2 : 1.25}
                className={cn(
                  "transition-[stroke,opacity] duration-300",
                  on ? "stroke-gold-600" : "stroke-stone-300",
                  lit && !on && "opacity-40",
                )}
              />
            );
          })}
        </svg>

        {COLUMNS.map((col) => (
          <div key={col.id} className="relative">
            <h3 className="mb-5 border-b border-gold-500/50 pb-2">
              <span className="label block text-gold-800">{col.name}</span>
              <span className="font-italic text-base italic text-ink-500">{col.blurb}</span>
            </h3>
            <ul className="space-y-3">
              {skills
                .filter((s) => s.column === col.id)
                .map((s) => (
                  <li key={s.id} className="relative">
                    <TechNode
                      skill={s}
                      unlocks={unlocks.get(s.id) ?? []}
                      requires={s.requires.map((r) => byId.get(r)?.name ?? r)}
                      highlighted={!!lit?.has(s.id)}
                      dimmed={!!lit && !lit.has(s.id)}
                      open={active === s.id}
                      onActivate={() => setActive(s.id)}
                      onDeactivate={() => setActive((cur) => (cur === s.id ? null : cur))}
                      nodeRef={(el) => {
                        if (el) nodeRefs.current.set(s.id, el);
                        else nodeRefs.current.delete(s.id);
                      }}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* legend */}
      <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wide text-ink-500">
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3.5 w-6 rounded-stone border-2 border-gold-600 bg-gold-300/40" /> Mastered
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3.5 w-6 rounded-stone border border-bronze-700/50 bg-ivory-0" /> Proficient
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3.5 w-6 rounded-stone border border-dashed border-gold-600 bg-ivory-0" /> Researching
        </li>
      </ul>
    </div>
  );
}

function TechNode({
  skill,
  unlocks,
  requires,
  highlighted,
  dimmed,
  open,
  onActivate,
  onDeactivate,
  nodeRef,
}: {
  skill: Skill;
  unlocks: string[];
  requires: string[];
  highlighted: boolean;
  dimmed: boolean;
  open: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  nodeRef: (el: HTMLElement | null) => void;
}) {
  const tipId = `skill-tip-${skill.id}`;
  const abbr = skill.abbr ?? skill.name.replace(/[^A-Za-z]/g, "").slice(0, 2);
  return (
    <div className="relative" onMouseEnter={onActivate} onMouseLeave={onDeactivate}>
      <button
        ref={nodeRef}
        type="button"
        aria-describedby={tipId}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={onActivate}
        onKeyDown={(e) => e.key === "Escape" && onDeactivate()}
        className={cn(
          "relative flex w-full items-center gap-3 rounded-stone bg-ivory-0 px-3 py-2.5 text-left shadow-[var(--shadow-panel)] transition-[border-color,background,opacity,box-shadow] duration-300",
          skill.state === "mastered" && "border-2 border-gold-600",
          skill.state === "proficient" && "border border-bronze-700/40",
          skill.state === "researching" && "border border-dashed border-gold-600",
          highlighted && "bg-gold-300/25 shadow-[var(--shadow-panel-lift)]",
          dimmed && "opacity-45",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-xs font-semibold",
            skill.state === "mastered"
              ? "border-gold-600 bg-[linear-gradient(160deg,#f0dfb4,#c9a45c)] text-ink-900"
              : "border-gold-500 bg-marble-50 text-gold-800",
          )}
        >
          {abbr}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-semibold uppercase tracking-[0.06em] text-ink-900">
            {skill.name}
          </span>
          <span className="block font-mono text-[0.68rem] uppercase tracking-wide text-ink-500">
            {STATE_LABEL[skill.state]}
            {skill.years ? ` · ${skill.years} yr${skill.years > 1 ? "s" : ""}` : ""}
          </span>
        </span>
        {skill.state === "researching" && (
          <span aria-hidden className="h-4 w-4 shrink-0 rounded-full border-2 border-gold-300 border-t-gold-600 motion-safe:animate-spin [animation-duration:3s]" />
        )}
      </button>

      {/* Civ-style dark tooltip */}
      <div
        id={tipId}
        role="tooltip"
        className={cn(
          "absolute left-0 right-0 top-full z-30 mt-2 rounded-stone border border-gold-500 bg-lapis-800 p-4 text-sm text-gold-300/90 shadow-[var(--shadow-panel-lift)] transition-[opacity,translate] duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <span aria-hidden className="absolute -top-[5px] left-6 h-2.5 w-2.5 rotate-45 border-l border-t border-gold-500 bg-lapis-800" />
        <p className="label text-gold-300">{skill.name}</p>
        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wide text-gold-300/70">
          {STATE_LABEL[skill.state]}
          {skill.note ? ` · ${skill.note}` : ""}
        </p>
        {requires.length > 0 && (
          <p className="mt-2 text-[0.95rem] text-marble-100">
            <span className="text-gold-300/70">Builds on: </span>
            {requires.join(", ")}
          </p>
        )}
        {unlocks.length > 0 && (
          <p className="mt-1 text-[0.95rem] text-marble-100">
            <span className="text-gold-300/70">Unlocks: </span>
            {unlocks.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
