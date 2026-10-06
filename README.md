# Raymond Tsai: Portfolio

Personal portfolio for a software engineer and computer science student. The visual style is a light, "rich minimalist" take on strategy-game UI (mainly Civilization VII, with touches of Imperator: Rome): ivory and marble surfaces, gold frames, inscription capitals, and an animated gold "Antikythera mechanism" in the hero. The **text** stays plain English. The theme lives in the visuals.

> **Status:** the content is real, drawn from Raymond's personal notes. A few gaps remain, marked `TODO(raymond)` in the source. See [Remaining content](#remaining-content).

## Quick start

Requires **Node.js 20+** (CI uses Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (statically generates every page) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

Before pushing, run `npm run lint && npm run build`. That's what CI checks.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**, with design tokens defined in `@theme` in `app/globals.css`
- **MDX** project write-ups via `next-mdx-remote`, plus front matter via `gray-matter`
- **zod** validates all content at build time, so a typo in your content fails the build with a clear message
- **lucide-react** for utility icons. Ornaments and emblems are original inline SVG components.
- Fonts via `next/font`: Cinzel (display), EB Garamond (body), Cormorant Garamond (italic subtitles), JetBrains Mono (tags and dates)
- No animation library. Motion is CSS, plus a few small client components.

> Next.js 16 has breaking changes from earlier versions. Its bundled docs live in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Home: Hero → About → Experience → Projects → Skills → Hobbies → Contact
  projects/page.tsx      The Archive: all projects, filterable (?type=…&tech=…)
  projects/[slug]/       Project detail page (MDX) + its Open Graph image
  resume/page.tsx        Résumé download page (PDF in public/resume.pdf)
  not-found.tsx          404
  opengraph-image.tsx    Share card for the home page
  sitemap.ts, robots.ts, icon.svg
  globals.css            Design tokens, base styles, animations, MDX prose styles
components/
  sections/              One component per home page section
  frame/                 FramedPanel, BannerHeader, Divider, Medallion
  ui/                    Buttons, MenuButton, TechTag(s), StatusPill, SectionHeading, Reveal, brand icons
  nav/                   Nav, MobileMenu, Footer, NextTurnButton, SampleBanner, scroll-spy hook
  projects/              WonderCard, ProjectCard, Codex (filterable grid), WonderReveal
  skills/TechTree.tsx    Skills tech tree (edges, hover paths, tooltips)
  hero/Mechanism.tsx     The animated Antikythera hero SVG
  ornaments/             Meander, filigree, rosette, laurel, Ionic capital, monogram, hobby emblems
content/                 ← all site content lives here (see below)
lib/
  content.ts             Content schemas (zod), loaders, date formatting
  og.tsx                 Shared Open Graph image renderer
design/                  Design specs: concept, visual language, components, motion, a11y
```

## Editing content

Everything shown on the site comes from `content/`. You shouldn't need to touch components to change what the site says.

| What | File | Notes |
|---|---|---|
| Name, tagline, bio, "Now" line, email, social links, domain | `content/site.ts` | Also holds the section titles and the `sampleContent` flag |
| Experience timeline | `content/experience.ts` | Each entry has an `age`: `antiquity` (education), `exploration` (internships, research, TA), `modern` (current). Mark the current role `current: true`. |
| Honors & achievements | `content/honors.ts` | Shown as laurel badges under the timeline |
| Projects | `content/projects/<slug>.mdx` | The file name becomes the URL (`/projects/<slug>`). See the front matter below. |
| Skills tech tree | `content/skills.ts` | `requires` draws the connecting lines. `state` is `mastered`, `proficient`, or `researching`. |
| Hobbies | `content/hobbies.ts` | `icon` is one of: `owl`, `amphora`, `trireme`, `quill`, `column`, `lyre`, `mountain`, `helmet` |

### Project front matter

```yaml
---
title: "Aqueduct"
tier: wonder            # wonder (the 1 featured project) | great-work (home page grid) | work (archive only)
status: live            # live | shipped | in-progress | archived
date: "2026-04"         # YYYY-MM or YYYY-MM-DD
summary: "One sentence on what it is and why it matters."
tagline: "Optional italic line on the project page."
impact:                 # 2–3 bullets with numbers, shown on Wonder/Great Work cards
  - "Used by ~4,200 students every week"
stack: ["TypeScript", "Next.js"]
types: ["web", "systems"]   # web | systems | ml | research | game | tooling (drives the filters)
role: "Creator & lead engineer"   # optional, shown in the sidebar
team: "3"                         # optional
cover: "/projects/aqueduct.png"   # optional 16:9 image in public/
links:
  repo: "https://github.com/…"
  live: "https://…"
  writeup: "https://…"
---

Markdown/MDX body: Problem → Approach → Challenges → Results → What I'd do differently
```

The home page shows the one `wonder` plus up to three `great-work` projects. Every project appears on `/projects`.

### Remaining content

Gaps are marked `TODO(raymond)` in the source:

1. Hobbies: `content/hobbies.ts` is empty, so the "Beyond the Code" section is hidden. It appears (and the sections renumber) once you add entries.
2. Screenshots: put them in `public/` and point each project's `cover:` at them. Add repo links too.
3. Skills: every skill is set to "proficient" with no years. Adjust them in `content/skills.ts`.
4. Rewrite the tagline in `content/site.ts`.
5. Portrait: the hero shows an "RT" monogram until you add a photo. See the `TODO(raymond)` in `components/sections/Hero.tsx`.

The `sampleContent` flag in `content/site.ts` shows a "Sample content" label when set to `true`.

The full checklist is in [`design/09-content-inventory.md`](design/09-content-inventory.md).

## Writing guidelines

- **Plain text, themed visuals.** No Latin, no Roman-numeral dates, and no roleplay wording ("envoy", "scroll", "forum"…). Strategy-game terms are fine: Ages, Great Works, Wonder, Tech Tree, Next Turn.
- Descriptions are plain and specific, with numbers where possible.

## Docker & CI

```bash
docker build -t raymond-portfolio .
docker run --rm -p 3000:3000 raymond-portfolio
```

The image uses Next.js `output: "standalone"` on `node:22-alpine` and runs as a non-root user.

GitHub Actions (`.github/workflows/build.yml`) runs on pushes and PRs to `main`/`develop`. The steps are `npm ci` → lint → build → Docker build → start the container and `curl` it. Deployment (planned: AWS) isn't set up yet.

## Design docs

The `design/` folder holds the full design spec: concept, color and type tokens, layouts, components, motion, and accessibility and performance targets. Start with [`design/README.md`](design/README.md), which also tracks what's built versus still planned.
