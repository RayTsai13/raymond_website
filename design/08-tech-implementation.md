# 08: Technical Implementation

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Matches the existing CI (`.github/workflows/build.yml`: lint → build → Docker) |
| Styling | **Tailwind CSS v4** with design tokens in `@theme` | Tokens from 02 become CSS variables and utilities |
| Content | **MDX** for project write-ups + **typed TS/JSON** for experience, skills, hobbies | Content stays in the repo, typed and versioned |
| Motion | CSS first, **Motion** (`motion/react`) for orchestration | Lazy-load where possible |
| Icons | `lucide-react` + custom SVG sprite for ornaments | |
| Fonts | `next/font/google`: Cinzel, EB Garamond, Cormorant Garamond (italic only), JetBrains Mono | |
| OG images | `next/og` | |
| Deploy | Docker (per current CI) → target TBD (Vercel is simplest; AWS/DO per CI TODO) | See open questions |

## Proposed folder structure

```
app/
  layout.tsx              fonts, <Nav/>, <Footer/>, <NextTurnButton/>
  page.tsx                home: Hero, About, Projects, Experience, Skills, Hobbies, Contact
  projects/
    page.tsx              the Archive (filterable)
    [slug]/page.tsx       Wonder page (MDX)
  resume/page.tsx
  not-found.tsx           "These lands are uncharted"
  opengraph-image.tsx
  globals.css             Tailwind + @theme tokens + base styles
components/
  frame/                  FramedPanel, BannerHeader, Divider, Medallion
  ui/                     Button, MenuButton, TechTag, StatusPill, Tooltip, Toast
  nav/                    Nav, MobileMenu, SectionRail, NextTurnButton
  sections/               Hero, About, Projects, Experience, Skills, Hobbies, Contact
  skills/                 TechTree, TechNode
  ornaments/              sprite.svg + <Ornament name="meander" /> wrapper
content/
  projects/*.mdx          frontmatter: title, slug, tier, status, date, stack, links, summary, impact[]
  experience.ts           typed entries with `age: 'antiquity' | 'exploration' | 'modern'`
  skills.ts               nodes + edges + state
  hobbies.ts
  site.ts                 name, tagline, socials, "now" line
lib/
  content.ts              loaders + zod schemas for validation at build time
public/
  images/                 hero, portrait, project screenshots
  resume.pdf
design/                   ← these specs
```

## Design tokens in code (sketch)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-marble-50: #FBF8F2;
  --color-marble-100: #F4EEE2;
  --color-ivory-0: #FFFDF8;
  --color-stone-200: #E4DCCB;
  --color-stone-300: #D3C7AF;
  --color-ink-900: #1F1A14;
  --color-ink-700: #4A4238;
  --color-ink-500: #6F6557;
  --color-gold-300: #E8D3A0;
  --color-gold-500: #C9A45C;
  --color-gold-600: #A8843F;
  --color-gold-800: #7A5C24;
  --color-bronze-700: #6B4E2E;
  --color-lapis-800: #1C2A40;
  --color-parchment-100: #F1E6CC;
  --color-tyrian-600: #6A2556;
  --color-pompeii-600: #9A3324;
  --color-verdigris-600: #3F7568;
  --color-lapis-600: #2A4F8F;

  --font-display: var(--font-cinzel), "Trajan Pro", serif;
  --font-serif: var(--font-eb-garamond), Georgia, serif;
  --font-italic: var(--font-cormorant), var(--font-eb-garamond), serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;

  --radius-stone: 2px;
  --ease-ceremonial: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-quick: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

## Content model (types)

```ts
type Project = {
  slug: string;
  title: string;
  tier: 'wonder' | 'great-work' | 'work';
  status: 'live' | 'shipped' | 'in-progress' | 'archived';
  date: string;               // ISO
  summary: string;            // one line
  impact?: string[];          // 2–3 bullets for wonder/great-work
  stack: string[];
  types: ('web' | 'systems' | 'ml' | 'research' | 'game' | 'tooling')[];
  links: { repo?: string; live?: string; writeup?: string };
  cover: string;              // image path
};

type Experience = {
  org: string;
  role: string;
  age: 'antiquity' | 'exploration' | 'modern';
  start: string; end?: string; // ISO; undefined = present
  location?: string;
  bullets: string[];
  stack?: string[];
  logo?: string;
};

type SkillNode = {
  id: string;
  name: string;
  column: 'foundations' | 'systems' | 'specialties';
  state: 'mastered' | 'proficient' | 'researching';
  requires?: string[];        // ids → edges
  years?: number;
  usedIn?: string[];          // project slugs
  icon?: string;
};
```

## Build order

1. **Foundation:** Next.js scaffold, Tailwind tokens, fonts, base typography, the `FramedPanel`, `Divider`, and `Medallion` primitives, and the ornament sprite.
2. **Static home:** all sections with real content and no motion. Check it on mobile.
3. **Project pages:** MDX pipeline, `/projects` filters, `[slug]` page.
4. **Signature pieces:** Tech tree, timeline rail, Next Turn button.
5. **Motion pass:** entrance, reveals, gilding, Wonder reveal. Reduced-motion checks.
6. **Polish:** OG images, SEO, 404, Lighthouse and accessibility audit.
7. **Deploy.**

## Note on the current repo state

The working tree shows the Create Next App files as deleted, and the CI expects `npm run lint`, `npm run build`, and a `Dockerfile`. Step 1 either restores that scaffold or regenerates it with the current `create-next-app` (plus Tailwind v4), and adds a `Dockerfile` (Next.js `output: 'standalone'`) so CI passes. Current Next.js needs Node ≥ 20, so CI moves from Node 18 to Node 22.
