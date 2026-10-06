# 08: Technical Implementation

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16 (App Router, Turbopack) + React 19 + TypeScript** | Every route is statically generated |
| Styling | **Tailwind CSS v4** with design tokens in `@theme` (`app/globals.css`) | Tokens from 02 become CSS variables and utilities |
| Content | **MDX** project write-ups (`next-mdx-remote/rsc` + `gray-matter`) and **typed TS modules** for everything else | Validated with **zod** at build time |
| Motion | **CSS only** (keyframes + transitions), plus small client components for scroll-driven effects | No animation library was needed |
| Icons | `lucide-react` for utility icons. Ornaments and emblems are original inline SVG React components. | lucide v1 has no brand icons, so GitHub/LinkedIn glyphs live in `components/ui/icons.tsx` |
| Fonts | `next/font/google`: Cinzel, EB Garamond, Cormorant Garamond (italic), JetBrains Mono | Self-hosted at build time |
| OG images | `next/og` (`lib/og.tsx`) | Fetches the Cinzel TTF at build; falls back to the default font if offline |
| Deploy | Static export (`output: "export"`) to S3 + CloudFront, deployed by GitHub Actions | See README → Deployment |

## Folder structure (as built)

```
app/
  layout.tsx              fonts, metadata, skip link, <Nav/>, <Footer/>, <NextTurnButton/>, <SampleBanner/>
  page.tsx                home: Hero, About, Experience, Projects, Skills, Hobbies, Contact (+ JSON-LD Person)
  projects/page.tsx       the Archive (filterable, filters in the query string)
  projects/[slug]/        MDX project page + per-project opengraph-image
  resume/page.tsx         placeholder
  not-found.tsx           404
  opengraph-image.tsx, sitemap.ts, robots.ts, icon.svg
  globals.css             tokens, base, type utilities, reveal + hero animations, MDX prose
components/
  frame/                  FramedPanel, BannerHeader, Divider, Medallion
  ui/                     ButtonLink/buttonClass, MenuButton, TechTag(s), StatusPill, SectionHeading, Reveal, icons
  nav/                    Nav, MobileMenu, Footer, NextTurnButton, SampleBanner, useActiveSection
  sections/               Hero, About, Experience (+ TimelineRail, Honors), Projects, Skills, Hobbies, Contact (+ CopyEmail)
  projects/               WonderCard, ProjectCard, Codex (filter grid), WonderReveal
  skills/                 TechTree
  hero/                   Mechanism (Antikythera SVG)
  ornaments/              Meander, CornerFiligree, Rosette, Laurel, IonicCapital, Monogram; Emblems (hobby icons)
content/
  site.ts                 identity, bio, "now" line, socials, sampleContent flag, section titles
  experience.ts, honors.ts, skills.ts, hobbies.ts
  projects/*.mdx          front matter + write-up
lib/
  content.ts              zod schemas, loaders, date formatting
  og.tsx                  shared OG image renderer
  cn.ts                   class-name join helper
```

## Design tokens in code

All tokens live in the `@theme` block of `app/globals.css`, and the values match the tables in 02. Highlights:

```css
@theme {
  --color-marble-50: #fbf8f2;   /* page */
  --color-ivory-0: #fffdf8;     /* panels */
  --color-ink-900: #1f1a14;     /* text */
  --color-gold-500: #c9a45c;    /* ornaments only */
  --color-gold-800: #7a5c24;    /* gold text */
  --color-lapis-800: #1c2a40;   /* dark accent */
  --color-terracotta-600: #8f5024; /* Foundations stage */
  --font-display: var(--font-cinzel), "Trajan Pro", Georgia, serif;
  --radius-stone: 2px;
  --ease-ceremonial: cubic-bezier(0.16, 1, 0.3, 1);
  --shadow-panel: 0 1px 2px rgb(60 40 10 / 0.06), 0 8px 24px rgb(60 40 10 / 0.06);
}
```

Custom utilities: `label`, `inscription`, `gold-gradient-text`, `prose-link`, `parchment-texture`. Project write-ups are styled by the `.mdx` rules at the bottom of the file.

## Content model (`lib/content.ts`)

Content is validated with zod when it loads, so an invalid file fails the build and names the file and field.

```ts
type Project = {
  slug: string;                 // from the file name
  title: string;
  tier: "wonder" | "great-work" | "work";
  status: "live" | "shipped" | "in-progress" | "archived";
  date: string;                 // YYYY-MM or YYYY-MM-DD
  summary: string;
  tagline?: string;
  impact: string[];             // default []
  stack: string[];              // ≥ 1
  types: ("web" | "systems" | "ml" | "research" | "game" | "tooling")[];
  role?: string; team?: string;
  links: { repo?: string; live?: string; writeup?: string };
  cover?: string;               // path in public/
  body: string;                 // MDX
};

type Experience = {
  org: string; role: string;
  stage: "foundations" | "first-roles" | "industry";
  start: string; end?: string;  // no end = present
  location?: string;
  bullets: string[];
  stack: string[];              // default []
  current: boolean;             // default false; shows "You are here"
};

type Skill = {
  id: string; name: string;
  abbr?: string;                // 1–3 letters in the roundel
  column: "foundations" | "systems" | "specialties";
  state: "mastered" | "proficient" | "researching";
  requires: string[];           // ids; unknown ids fail the build
  years?: number; note?: string;
};

type Honor = { title: string; year: string; note?: string };
type Hobby = { name: string; icon: "owl" | "amphora" | "trireme" | "quill" | "column" | "lyre" | "mountain" | "helmet"; line: string; detail: string };
```

Projects are sorted by tier (wonder → great-work → work), then newest first.

## Build, CI, and deploy

- `npm run lint`, then `npm run build`. Both must pass. CI (`.github/workflows/build.yml`, Node 22) runs them on pushes and PRs to `main`/`develop` and checks that the static export in `out/` has every page.
- `output: "export"` means no server features: metadata routes need `dynamic = "force-static"`, dynamic routes need `generateStaticParams` + `dynamicParams = false`, and `next/image` runs unoptimized.
- Pushes to `main` deploy `out/` to S3 + CloudFront (`scripts/deploy.sh`). `infra/url-rewrite.js` maps clean URLs to `.html` files and redirects `www`.
- Work happens on `main`.

## Build order (done)

1. ✅ Foundation: scaffold, tokens, fonts, primitives, ornaments
2. ✅ Static home with all sections, checked on mobile
3. ✅ Project pages: MDX pipeline, filters, detail page
4. ✅ Signature pieces: tech tree, timeline rail, Next Turn button
5. ✅ Motion pass with reduced-motion handling
6. ✅ Polish: OG images, SEO, 404, accessibility pass, Lighthouse (see 07)
7. ⬜ Real content (see 09)
8. ⬜ Deploy (AWS)
