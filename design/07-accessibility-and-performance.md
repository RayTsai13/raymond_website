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
- Section numerals (I–V) are decorative chapter marks. The plain section name is always present in the heading.
- A skip link ("Skip to content") is styled as a small gold banner on focus.

### Keyboard
- Everything that works on hover also works on focus (tech tree tooltips and highlights, card states).
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
| Total home page weight | < 1 MB |

### Tactics
- **Fonts:** self-host via `next/font`, subset to Latin, and limit weights (Cinzel 500/600, EB Garamond 400/400i/600, JetBrains Mono 400). Use `display: swap` with size-adjusted fallbacks to avoid layout shift.
- **Textures:** only the parchment panel uses a small inline SVG noise texture. The page background is a CSS gradient (a tiled marble texture was dropped because it showed seams).
- **Ornaments:** inline SVG React components, with no image requests. The meander band is a tiny data-URI background.
- **Hero art:** the Antikythera SVG is inline, so it costs no image request. Rotation uses CSS `transform` only (compositor-friendly).
- **Motion:** CSS only. No animation library ships.
- **Tech tree:** edges are one SVG, measured from the DOM on the client (with ResizeObserver), so they follow the real layout.
- **Static generation** for every route, with no client data fetching.
- **Images:** `next/image` with explicit sizes for project thumbnails.

### Measured results (production build, Lighthouse mobile, 2026-09-30)

| Category | Score |
|---|---|
| Performance | 91–92 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

- CLS **0**, Total Blocking Time ~20 ms. Text contrast was checked against every token pair in use, and all pass AA.
- **Gap:** Lighthouse's simulated LCP is ~3.4s on throttled 4G (target < 2.0s), even though the real render delay is under 100 ms. The hero name was changed to a transform-only rise so it paints immediately. Disabling preload on the non-critical fonts made no difference, so it was reverted. Next things to try: fewer font files (drop Cormorant and use EB Garamond italic), and checking the CSS/JS critical path.
- Verified: the full page renders with JavaScript disabled, all animations respect reduced motion, there's no horizontal scroll at 390px, and keyboard tab order follows the visual order.

## SEO & sharing

- Titles use the pattern: `Raymond Tsai · Software Engineer` and `Project Name · Raymond Tsai`.
- Meta descriptions use plain language, not themed copy.
- Open Graph image: a generated OG card (via `next/og`) in theme style showing the name, role, and laurel monogram. Per-project OG cards show the project title.
- JSON-LD `Person` schema on home.
- `sitemap.xml` and `robots.txt`.
