# Portfolio Design Spec: "Chronicle"

A portfolio for a software engineer and computer science student who also studies history. The visual language borrows from Greco-Roman antiquity as it appears in modern strategy-game UI (mainly Civilization VII, with touches of Imperator: Rome): sunlit marble and ivory surfaces, gold filigree frames, inscription-style capitals, medallions, and banners. The tone is **rich minimalism**: mostly calm white space, with a few details done very well. It should still read as a clean, fast, modern website. **The theme is the frame. The content is what the page is about.**

## Documents

| # | File | What it covers |
|---|------|----------------|
| 01 | [concept.md](01-concept.md) | Creative direction, design principles, what to borrow from Civ VII and what to leave out |
| 02 | [visual-language.md](02-visual-language.md) | Color, typography, texture, ornament, iconography |
| 03 | [information-architecture.md](03-information-architecture.md) | Site map, navigation, page flow, URLs |
| 04 | [sections.md](04-sections.md) | Section-by-section layouts: Hero, Projects, Experience, Skills, Hobbies, Contact |
| 05 | [components.md](05-components.md) | Reusable UI components with anatomy, states, and variants |
| 06 | [motion-and-interaction.md](06-motion-and-interaction.md) | Animation, hover and focus states, the "Next Turn" button, hero animation |
| 07 | [accessibility-and-performance.md](07-accessibility-and-performance.md) | Contrast, reduced motion, keyboard use, performance budgets |
| 08 | [tech-implementation.md](08-tech-implementation.md) | Stack, design tokens in code, folder layout, content model |
| 09 | [content-inventory.md](09-content-inventory.md) | Content Raymond needs to supply, plus open questions |

## One-paragraph pitch

The visitor lands on something that feels like the main menu of a grand strategy game: sunlit marble with a huge gold Antikythera-mechanism orrery slowly turning behind a gold-framed medallion portrait, the name set in Roman inscription capitals, and a short menu of choices. Scrolling moves the visitor through the **Ages** of Raymond's career (experience, first), the **Great Works** he has built (projects), a **Tech Tree** of his skills, and a small section of hobbies. Each section has a plain-English label, so a recruiter skimming for 30 seconds never has to decode the theme.

## Status

- [x] Design direction and specs (this folder)
- [x] Decisions: Day theme only, experience first, abstract hero, no blog, no easter eggs, résumé placeholder (see 09)
- [x] Build: tokens, components, every section and page (see 08)
- [x] Sample content seeded: fictional, marked `SAMPLE CONTENT`. The label toggles via `sampleContent` in `content/site.ts`.
- [x] Copy toned down: themed visuals, plain text (see 01, "Tone of voice")
- [x] Polish: motion, reduced motion, accessibility pass, Lighthouse (Accessibility/Best Practices/SEO 100, Performance 91–92; see 07)
- [ ] Real content (checklist in 09)
- [ ] Performance: reach the ≥ 95 target (simulated LCP gap, see 07)
- [ ] Deploy (AWS)

## Planned in these specs but not built

These specs describe the full design intent. A few pieces were deliberately left out or simplified. Each is noted where it appears:

- Section rail (I–V roundels on wide screens). The nav's scroll-spy and Next Turn cover it.
- Org logos on experience cards, and links from skills to the projects that used them
- A sort control on `/projects` (it's ordered by tier, then date)
- The traveling light sweep on panel hover, and the sequenced edge animation in the tech tree
- Light/dark theme toggle and sound (out of scope)

For how to run, edit, and deploy the site, see the root [`README.md`](../README.md).
