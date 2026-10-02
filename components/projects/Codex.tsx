"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import type { ProjectMeta, ProjectType } from "@/lib/content";
import { ProjectCard, WonderCard } from "./ProjectCard";

const TYPE_LABEL: Record<ProjectType, string> = {
  web: "Web",
  systems: "Systems",
  ml: "ML",
  research: "Research",
  game: "Game",
  tooling: "Tooling",
};

/** Filterable project archive; filter state lives in the query string (?type=…&tech=…). */
export function Codex({ projects }: { projects: ProjectMeta[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const type = params.get("type");
  const tech = params.get("tech");

  const types = useMemo(() => [...new Set(projects.flatMap((p) => p.types))], [projects]);
  const techs = useMemo(() => [...new Set(projects.flatMap((p) => p.stack))].sort(), [projects]);

  const filtered = projects.filter((p) => (!type || p.types.includes(type as ProjectType)) && (!tech || p.stack.includes(tech)));

  const setParam = (key: "type" | "tech", value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div>
      <div className="mb-10 space-y-4">
        <FilterRow label="Type" options={types.map((t) => [t, TYPE_LABEL[t]])} value={type} onChange={(v) => setParam("type", v)} />
        <FilterRow label="Tech" options={techs.map((t) => [t, t])} value={tech} onChange={(v) => setParam("tech", v)} mono />
      </div>

      <p className="mb-6 font-mono text-xs uppercase tracking-wide text-ink-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "work" : "works"} found
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center font-italic text-xl italic text-ink-500">No projects match those filters.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) =>
            p.tier === "wonder" && !type && !tech ? (
              <li key={p.slug} className="md:col-span-2 lg:col-span-3">
                <WonderCard project={p} />
              </li>
            ) : (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
  mono = false,
}: {
  label: string;
  options: [string, string][];
  value: string | null;
  onChange: (v: string | null) => void;
  mono?: boolean;
}) {
  const chip = (active: boolean) =>
    cn(
      "rounded-stone border px-3 py-1.5 text-xs uppercase tracking-wide transition-colors",
      mono ? "font-mono" : "label",
      active ? "border-gold-800 bg-gold-300/50 text-ink-900" : "border-gold-500/70 bg-ivory-0 text-ink-700 hover:border-gold-600 hover:text-gold-800",
    );
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="label mr-2 w-12 text-ink-500">{label}</span>
      <button type="button" aria-pressed={!value} className={chip(!value)} onClick={() => onChange(null)}>
        All
      </button>
      {options.map(([v, text]) => (
        <button key={v} type="button" aria-pressed={value === v} className={chip(value === v)} onClick={() => onChange(value === v ? null : v)}>
          {text}
        </button>
      ))}
    </div>
  );
}
