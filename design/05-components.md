# 05: Components

Each component lists **anatomy**, **variants**, and **states**. Token names refer to 02 and are defined in code per 08.

---

## `FramedPanel`

The base container that gives everything its Civ-like feel.

**Anatomy**
- Surface: `ivory-0` + faint marble texture + soft warm shadow
- Border: 1px `gold-500`, with a second inset border 4px inside at `gold-500/40%` (double-rule frame)
- Corners: optional 32px SVG filigree in each corner, overlapping the border
- Padding: 24px mobile / 32px desktop
- Radius: **2px** (nearly square, like stone. Avoid rounded "app" corners)

**Variants**
| Variant | Difference |
|---|---|
| `plain` | Single border, no corners (most cards) |
| `ornate` | Double rule + corner filigree (hero menu, Wonder card, contact) |
| `parchment` | Parchment surface, ink text, bronze border (About) |
| `banner` | Adds a `BannerHeader` overlapping the top edge |

**States:** interactive panels on hover move the border from `gold-500` to `gold-600`, deepen the shadow, and lift by 2px.

---

## `BannerHeader`

A ribbon-shaped header strip.

- Shape: horizontal band with swallowtail notches cut into both ends (CSS `clip-path` or SVG)
- Fill: `marble-100` (or `lapis-800` with `gold-300` text for the Wonder banner), with a gold hairline top and bottom
- Text: `label` or `display-md` Cinzel, centered, `gold-500`
- Use for: card headers on the Wonder card, Age headers in the timeline, the "Wonder Completed" banner

---

## `SectionHeading`

```
       III  ·  SKILLS              ← eyebrow: label, stone-400, numeral in gold
       THE TECH TREE               ← display-lg, Cinzel, marble-50
  ───────◆ meander ◆───────        ← Divider (meander variant)
   Optional one-line intro         ← body-lg, marble-300, max 60ch
```

- Centered on the home page, left-aligned on inner pages.
- The `h2` holds the plain label for SEO and screen readers. The themed title is visually primary but grouped with it in the same heading. For example: `<h2><span class="eyebrow">III · Skills</span> The Tech Tree</h2>`.

---

## `MenuButton` (hero menu, mobile menu)

Full-width stacked buttons, like a game main menu.

- Rest: transparent, Cinzel `label` at 16px, `marble-50`, divided by gold-700 hairlines
- Hover/focus: a gold bar (3px) slides in from the left, the text shifts 8px right and turns `gold-300`, and a faint gradient sweep appears (`gold-500/10% → transparent`)
- Active (pressed): the text dims a little and the bar stays
- The `primary` variant is lit by default: gold text plus a small rosette on the left

## `Button`

| Variant | Look |
|---|---|
| `primary` | Gold gradient fill, `ink-900` text, Cinzel label, 2px radius, gold-300 1px outline on hover |
| `secondary` | Transparent, 1px `gold-500` border, gold text; hover fills `gold-500/10%` |
| `ghost` | Text only with a gold underline that draws in on hover |
| `icon` | 40px roundel, bronze border, gold icon; hover goes to gold border and glow |

Sizes: `sm` 32px, `md` 44px (default, which is also the touch target minimum), `lg` 56px.

---

## `NextTurnButton`

The signature floating control.

- A 72px circle fixed bottom-right (24px inset), with a gold gradient ring, `ivory-0` center, and a laurel ornament around it
- Label "NEXT TURN" in Cinzel 11px wrapped around the circle (SVG `textPath`), with a chevron glyph in the center
- A subtle "breathing" glow every 6s while idle (off with reduced motion)
- Click scrolls to the next section anchor. On the last section the chevron flips up and the label becomes "RETURN"
- Hidden on the hero until the user scrolls 40% of the viewport, so it doesn't compete with the menu
- Mobile: 56px, with the circular text dropped and a chevron plus `aria-label` kept
- `aria-label="Next section: Experience"` (updates dynamically)

---

## `ProjectCard`

**Anatomy:** thumbnail (16:9, gold 1px frame, duotone at rest) → tier badge → title (`display-md`) → description (`body-sm`, 2-line clamp) → tags (`TechTag` list) → footer links (icon buttons) + `StatusPill`.

**Variants:** `wonder` (horizontal, ornate panel, impact bullets, Tyrian badge with laurel), `great-work` (vertical, plain panel), `compact` (archive list row).

**States:** hover lifts the card, restores the thumbnail to full color, gilds the border, and slides an arrow in next to the title. The whole card is one link (to the detail page). Secondary links (repo, live) are separate focusable elements layered above it.

## `ExperienceCard`

Anatomy: logo roundel (48px, monochrome gold) → org name (Cinzel `label` 14px, gold) → role (`display-md` small, 24px) → meta line (mono: `JUN 2025 — AUG 2025 · SEATTLE, WA`) → bullets (rosette markers) → tech tags.

## `TechTag`

A mono 13px uppercase label with `gold-700` border and `gold-300` text, 2px radius, 4×8px padding. Tags are separated by gap, and in dense places they're joined by interpuncts instead of drawn as chips.

## `StatusPill`

A small caps label with a colored dot: `LIVE` (verdigris), `SHIPPED` (gold), `IN PROGRESS` (lapis, animated dot), `ARCHIVED` (stone).

## `TechNode` (skills tree)

- A 160×56 box with an icon roundel on the left and the name (Cinzel 14px) on the right
- States: `mastered`, `proficient`, `researching` (see 04). There's also a `highlighted` state, used when it's on the hovered path
- A tooltip on hover or focus shows a `FramedPanel` popover with years, contexts, and linked projects

## `Tooltip`

A compact `FramedPanel` (plain) with a 6px gold arrow. It appears after 150ms and follows the Civ pattern of a title row in gold Cinzel plus body text. On touch devices it opens on tap and closes on outside tap.

## `Divider`

Variants: `hairline` (1px gold-700 gradient fade at both ends), `meander` (Greek key band, 10px), `rosette` (hairline with a centered rosette), `laurel` (small laurel sprig centered).

## `Medallion`

A circular image frame: gold gradient ring (4px) + inner bronze hairline + optional laurel wreath SVG around it. Sizes: 48 / 96 / 200 (hero). Used for the portrait, logos, and hobby icons.

## `Nav` / `MobileMenu`

See 03 for behavior. The mobile menu reuses `FramedPanel ornate` and `MenuButton`.

## `Toast`

A bottom-center small framed panel, used for "Email copied". It auto-dismisses after 3s and is announced via `aria-live="polite"`.

