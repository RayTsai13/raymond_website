import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { experience as rawExperience } from "@/content/experience";
import { hobbies as rawHobbies } from "@/content/hobbies";
import { honors as rawHonors } from "@/content/honors";
import { skills as rawSkills } from "@/content/skills";

/* ── Schemas (design/08 → "Content model") ───────────────────────────────── */

const isoDate = z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD");

export const projectTypes = ["web", "systems", "ml", "research", "game", "tooling"] as const;

export const projectSchema = z.object({
  title: z.string().min(1),
  tier: z.enum(["wonder", "great-work", "work"]),
  status: z.enum(["live", "shipped", "in-progress", "archived"]),
  date: isoDate,
  summary: z.string().min(1),
  tagline: z.string().optional(),
  impact: z.array(z.string()).default([]),
  stack: z.array(z.string()).min(1),
  types: z.array(z.enum(projectTypes)).min(1),
  role: z.string().optional(),
  team: z.string().optional(),
  links: z
    .object({ repo: z.url().optional(), live: z.url().optional(), writeup: z.url().optional() })
    .default({}),
  cover: z.string().optional(),
});

export const experienceSchema = z.object({
  org: z.string(),
  role: z.string(),
  age: z.enum(["antiquity", "exploration", "modern"]),
  start: isoDate,
  end: isoDate.optional(),
  location: z.string().optional(),
  bullets: z.array(z.string()),
  stack: z.array(z.string()).default([]),
  current: z.boolean().default(false),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbr: z.string().max(3).optional(),
  column: z.enum(["foundations", "systems", "specialties"]),
  state: z.enum(["mastered", "proficient", "researching"]),
  requires: z.array(z.string()).default([]),
  years: z.number().optional(),
  note: z.string().optional(),
  usedIn: z.array(z.string()).default([]),
});

export const hobbySchema = z.object({
  name: z.string(),
  icon: z.enum(["owl", "amphora", "trireme", "quill", "column", "lyre", "mountain", "helmet"]),
  line: z.string(),
  detail: z.string(),
});

export const honorSchema = z.object({
  title: z.string(),
  year: z.string(),
  note: z.string().optional(),
});

export type ProjectMeta = z.infer<typeof projectSchema> & { slug: string };
export type Project = ProjectMeta & { body: string };
export type ProjectStatus = ProjectMeta["status"];
export type ProjectType = (typeof projectTypes)[number];
export type Experience = z.infer<typeof experienceSchema>;
export type Age = Experience["age"];
export type Skill = z.infer<typeof skillSchema>;
export type Hobby = z.infer<typeof hobbySchema>;
export type Honor = z.infer<typeof honorSchema>;

/* ── Loaders (build time) ────────────────────────────────────────────────── */

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");
const tierRank = { wonder: 0, "great-work": 1, work: 2 } as const;

function parseOrThrow<T>(schema: z.ZodType<T>, value: unknown, where: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(`Invalid content in ${where}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

let projectCache: Project[] | undefined;

/** All projects, sorted by tier then newest first. */
export function getProjects(): Project[] {
  if (projectCache) return projectCache;
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  projectCache = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8"));
      return { ...parseOrThrow(projectSchema, data, `content/projects/${file}`), slug, body: content };
    })
    .sort((a, b) => tierRank[a.tier] - tierRank[b.tier] || b.date.localeCompare(a.date));
  return projectCache;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Strip MDX bodies for client components. */
export function toMeta({ body: _body, ...meta }: Project): ProjectMeta {
  void _body;
  return meta;
}

export function getExperience(): Experience[] {
  return rawExperience.map((e, i) => parseOrThrow(experienceSchema, e, `content/experience.ts[${i}]`));
}

export function getSkills(): Skill[] {
  const skills = rawSkills.map((s, i) => parseOrThrow(skillSchema, s, `content/skills.ts[${i}]`));
  const ids = new Set(skills.map((s) => s.id));
  for (const s of skills) {
    for (const r of s.requires) {
      if (!ids.has(r)) throw new Error(`content/skills.ts: "${s.id}" requires unknown skill "${r}"`);
    }
  }
  return skills;
}

export function getHobbies(): Hobby[] {
  return rawHobbies.map((h, i) => parseOrThrow(hobbySchema, h, `content/hobbies.ts[${i}]`));
}

export function getHonors(): Honor[] {
  return rawHonors.map((h, i) => parseOrThrow(honorSchema, h, `content/honors.ts[${i}]`));
}

/* ── Formatting helpers ──────────────────────────────────────────────────── */

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function formatMonth(iso: string) {
  const [y, m] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "PRESENT"}`;
}

