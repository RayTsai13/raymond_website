# 05: Components

Each component lists **anatomy**, **variants**, and **states**. Token names refer to 02 and are defined in `app/globals.css`. File paths point to the implementation.

---

## `FramedPanel` (`components/frame`)

The base container that gives everything its Civ-like feel.

**Anatomy**
- Surface: `ivory-0` with a soft warm shadow (`--shadow-panel`)
- Border: 1px `gold-500`, plus an inset hairline 4px inside at ~35% opacity (the double-rule frame)
- Corners: 32px SVG filigree on the `ornate` variant only
- Radius: **2px** (`rounded-stone`), nearly square like cut stone. No rounded "app" corners.
- Children are wrapped in an inner `div.relative`. Put layout classes (flex, grid) on your own inner wrapper, not on the panel.

**Variants**
| Variant | Difference | Used for |
|---|---|---|
| `plain` | Ivory, `gold-500/70` border, no corners | Most cards |
| `ornate` | Full gold border + corner filigree | Hero menu, Wonder card, contact, résumé, mobile menu |
| `parchment` | Parchment texture, bronze border | About (the only parchment surface) |
| `dark` | `lapis-800` fill, gold text | Reserved for Civ-style dark accents |

**States:** with `interactive`, hover lifts the panel 2px, deepens the shadow (`--shadow-panel-lift`), and gilds the border to `gold-600`. `focus-within` gilds it as well.

---

## `BannerHeader` (`components/frame`)

A ribbon strip with swallowtail notches cut into both ends (CSS `clip-path`) and gold hairlines top and bottom.

- `tone="light"`: `marble-100` fill, `gold-800` text. Used for the stage headers in the timeline.
- `tone="dark"`: `lapis-800` fill, `gold-300` text. Used for the "Wonder Completed" banner.

---

## `SectionHeading` (`components/ui`)

```
       III  ·  SKILLS              ← eyebrow: label, ink-500, numeral in gold-800
       THE TECH TREE               ← Cinzel caps, ink-900
  ───────◆ meander ◆───────        ← Divider (meander), draws out on reveal
   Optional one-line intro         ← body-lg, ink-700, max 60ch
```

- Centered by default; `align="left"` is also available.
- One `h2` contains both the plain label and the themed title, with a screen-reader-only ": " between them. The accessible name reads "III. Skills: The Tech Tree".

---

## `MenuButton` (`components/ui`)

Full-width stacked menu items, like a game main menu (hero menu and mobile menu).

- Rest: Cinzel caps, `ink-900`, separated by `gold-500/30` hairlines
- Hover/focus: a 3px `gold-600` bar grows in on the left, a `gold-300` gradient sweeps across, a rosette fades in, the text shifts right 4px and turns `gold-800`
- `primary`: lit by default (gold text, bar and rosette visible)

## Buttons: `ButtonLink` / `buttonClass` (`components/ui`)

`ButtonLink` renders a Next `<Link>` for internal paths and an `<a>` otherwise. `buttonClass()` gives the same styles to a `<button>`.

| Variant | Look |
|---|---|
| `primary` | Gold gradient fill, `ink-900` text, Cinzel label, `gold-600` border |
| `secondary` | Translucent ivory, `gold-600` border, `gold-800` text; hover tints `gold-300` |
| `ghost` | `gold-800` text, underline appears on hover |

Sizes: `sm` 32px, `md` 44px (default, which is the minimum touch target), `lg` 56px. Round icon links (social, repo, live) are styled inline where they're used: a 36–40px circle with a gold border.

---

## `NextTurnButton` (`components/nav`)

The signature floating control, shown on the home page only.

- A circle fixed bottom-right (56px mobile, 76px desktop) with a gold gradient ring and ivory center, plus a chevron in the middle
- Desktop: "NEXT TURN · NEXT TURN" wraps the circle (SVG `textPath`); hover rotates it 15°
- Idle "breathing" glow every 6s (off under reduced motion)
- Click scrolls to the next section. A small dark tag briefly shows the destination name
- On the last section (or at the page bottom) the chevron flips and the label becomes "RETURN", which scrolls to the top
- Hidden until the visitor scrolls 40% of the viewport. `aria-label` updates to "Next section: …" / "Return to top"

---

## Project cards (`components/projects/ProjectCard.tsx`)

**`WonderCard`** (the one flagship): an ornate panel, laid out horizontally on desktop. It shows the cover, a Tyrian "Wonder" badge with laurel, a `StatusPill`, the title, a summary, impact bullets, `TechTags`, "View the Wonder →", and repo/live/write-up icon links.

**`ProjectCard`** (Great Works and Works): a plain panel, vertical. It shows the cover, a tier label, a `StatusPill`, the title, a 2-line summary, up to 4 tags, and icon links.

- **Cover:** a 16:9 image in a gold frame, slightly warm and desaturated at rest and full color on hover. Without a `cover`, an ornamental "coin" plate shows the project's initial.
- The **whole card is one link** to the project page (a stretched link on the title). Repo/live links sit above it as separate focusable elements.
- Hover lifts the card, gilds the frame, and slides an arrow in next to the title.

## Timeline entry (`components/sections/Experience.tsx`)

An interactive plain panel: org (`label`, `gold-800`) → role (Cinzel, 20–24px) → meta line (mono: `JUN 2025 — SEP 2025 · SAN FRANCISCO, CA`) → rosette bullets → tech tags. The current role adds a "You are here" marker and a pulsing ring on its rail node. Rail nodes turn from stone to gold when their entry reveals. (Org logos from the original spec aren't implemented.)

## Honors badge (`components/sections/Experience.tsx`)

A small plain panel with a laurel, the title (Cinzel caps), and a mono line for year and note. Badges sit four across beneath the timeline.

## `TechTag` / `TechTags` / `StatusPill` (`components/ui`)

- **TechTag:** mono 11–12px uppercase, `ink-700` on `marble-50`, `gold-500/60` border, 2px radius. `TechTags` renders a labelled list.
- **StatusPill:** a small caps label with a colored dot: `LIVE` (verdigris), `SHIPPED` (gold), `IN PROGRESS` (lapis, pulsing), `ARCHIVED` (ink-500).

## `TechTree` and its nodes (`components/skills/TechTree.tsx`)

- Three columns (Foundations → Systems & Frameworks → Specialties), each a real `<ul>`. Nodes are `<button>`s with an abbreviation roundel, the name, and the state plus years.
- States: **mastered** (2px `gold-600` border, gilded roundel), **proficient** (bronze hairline), **researching** (dashed gold border plus a slow spinner). A legend sits below.
- Edges are SVG béziers measured from the DOM (desktop only). Same-column prerequisites draw a short vertical link.
- Hovering or focusing a node highlights it and all its prerequisites, dims the rest, and opens a **dark Civ-style tooltip** (`lapis-800`, gold text) showing the state, a note, "Builds on", and "Unlocks". Esc closes it.

## `Divider` (`components/frame`)

Variants: `hairline` (gold gradient fading at both ends), `meander` (Greek key band between two fading hairlines), `rosette`, `laurel`. `draw` makes it scale out from the center when its `Reveal` parent appears.

## `Medallion` (`components/frame`)

A circular frame with a gold gradient ring, a bronze hairline, and an optional laurel wreath around it. The hero uses it at 124px with a laurel, holding the monogram placeholder until a portrait is added.

## `Reveal` (`components/ui/Reveal.tsx`)

The scroll-in wrapper. It is **fail-safe**: content renders visible, and only elements still below the fold once JS runs are set to `data-reveal="pending"` (hidden), then `"shown"` as they enter the viewport. `delay` staggers siblings. See 06.

## `Nav` / `MobileMenu` (`components/nav`)

See 03 for behavior. The mobile menu is a full-screen overlay holding an ornate panel of `MenuButton`s. It traps focus, closes on Esc, and returns focus to the trigger.

## Toast (`components/sections/CopyEmail.tsx`)

Copying the email shows a small dark framed toast, bottom-center, reading "Email copied". It dismisses after 3s and is announced with `role="status"`.

## `SampleBanner` (`components/nav`)

A small red mono label in the bottom-left corner, "Sample content · edit /content", shown while `sampleContent` is `true` in `content/site.ts`.
