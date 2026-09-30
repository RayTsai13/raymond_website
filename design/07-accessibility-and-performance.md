# 07: Accessibility & Performance

A themed site is only impressive if it's also fast and usable. Recruiters and engineers will notice either way.

## Accessibility (target: WCAG 2.2 AA)

### Color & contrast
- Body text ≥ 4.5:1, large display text ≥ 3:1. See the contrast table in 02 and verify every token pair in the build.
- On the light theme, **gold text must use `gold-800`**. `gold-500` (~2.2:1 on marble) is decorative only.
- Never convey meaning with color alone. Status pills carry text labels, and tech tree states use border style (solid, bronze, dashed) as well as color.

### Motion
- Respect `prefers-reduced-motion: reduce`: disable parallax, the hero stagger, the rail draw (show it fully drawn), the glow breathing, and the Wonder reveal (show the final state). Keep instant color and opacity transitions only.

### Structure & semantics
- One `h1` per page (the hero name on home, the project title on detail pages). Sections use `h2`, and cards use `h3`.
- Themed titles are always paired with plain labels inside the same heading (see `SectionHeading` in 05).
- Landmarks: `header`, `nav`, `main`, `footer`, and `section` with `aria-labelledby`.
- Decorative SVG ornaments get `aria-hidden="true"` and `focusable="false"`.
- Roman numerals are decorative. The real value is always present in text, and ornamental numerals are `aria-hidden`.
- A skip link ("Skip to content") is styled as a small gold banner on focus.

### Keyboard
- Everything that works on hover also works on focus (tooltips, tech tree highlights, hobby card flips).
- The mobile menu traps focus while open. Esc closes it and returns focus to the trigger.
- Wonder reveal: any key skips it.
- The Next Turn button is reachable and labeled with its destination.

### Typography
- Cinzel is **only** used in caps for short strings (≤ 6 words). Never for paragraphs.
- Body is at least 17px on mobile, with a measure of 60–75ch.

## Performance budgets

| Metric | Budget |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 |
| LCP | < 2.0s on 4G |
| CLS | < 0.05 |
| INP | < 150ms |
| JS shipped (home, gzipped) | < 120 KB |
| Total home page weight | < 1 MB (including hero image) |

### Tactics
- **Fonts:** self-host via `next/font`, subset to Latin, and limit weights (Cinzel 500/600, EB Garamond 400/400i/600, JetBrains Mono 400). Use `display: swap` with size-adjusted fallbacks to avoid layout shift.
- **Textures:** inline SVG noise (`feTurbulence`) or a single tiny tiled PNG under 10 KB. No large texture images.
- **Ornaments:** one SVG sprite (`<symbol>` + `<use>`), not dozens of separate files.
- **Hero art:** the Antikythera SVG is inline, so it costs no image request. Rotation uses CSS `transform` only (compositor-friendly).
- **Motion library:** Framer Motion (`motion`) is lazy-loaded and used only where CSS can't do the job. Prefer CSS transitions, and scroll-driven animations where supported.
- **Tech tree:** render lines as one SVG, computed at build time where possible.
- **Static generation** for every route, with no client data fetching.
- **Images:** `next/image` with explicit sizes for project thumbnails.

## SEO & sharing

- Titles use the pattern: `Raymond Tsai · Software Engineer` and `Project Name · Raymond Tsai`.
- Meta descriptions use plain language, not themed copy.
- Open Graph image: a generated OG card (via `next/og`) in theme style showing the name, role, and laurel monogram. Per-project OG cards show the project title.
- JSON-LD `Person` schema on home.
- `sitemap.xml` and `robots.txt`.
