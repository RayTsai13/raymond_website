@AGENTS.md

# Project notes

Personal portfolio (Next.js 16 App Router, React 19, Tailwind v4). See `README.md` for structure and content editing, and `design/` for the full design spec.

## Workflow
- Work and commit directly on `main` (single-branch repo). Don't create feature branches unless asked.
- Verify changes with `npm run lint && npm run build`. CI runs the same, plus a Docker build and a smoke test.
- Check visual changes in a real browser at 375px and 1440px widths.

## Content
- All site content lives in `content/` and is validated by zod schemas in `lib/content.ts`. Change content there, not in components.
- Content is real, sourced from Raymond's notes. Don't invent details; leave gaps as `TODO(raymond)`. Remaining gaps are listed in `README.md` → Remaining content.
- An empty `content/hobbies.ts` hides that section; sections are looked up by id via `getSection()`, not by index.

## Copy rule
- The Greco-Roman / Civ VII theme is **visual only**. Site text is plain English: no Latin, no Roman-numeral dates, no roleplay words (envoy, scroll, forum, codex, capital). Strategy-game terms are allowed: Ages, Great Works, Wonder, Tech Tree, Next Turn.

## Design rules that are easy to break
- Gold **text** must use `gold-800` (contrast). `gold-500` is for ornaments and borders only.
- Content must never depend on JS to become visible: `<Reveal>` only hides elements that are still below the fold after JS runs (see `components/ui/Reveal.tsx`).
- Every animation must be disabled or simplified under `prefers-reduced-motion`.
- Ornaments are decorative: `aria-hidden`, original SVG only (no Civ/Firaxis assets).
