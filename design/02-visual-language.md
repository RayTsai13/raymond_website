# 02: Visual Language (Day theme)

The site is **sunlit marble with gold trim**. Surfaces are warm whites and ivories, like polished stone in daylight. Gold does the framing. Deep lapis appears rarely, as a contrast accent in the style of Civ VII's dark tooltips. The references are Civ VII (framing, banners, medallions, menus) and Imperator: Rome (marble and stone panels, bronze trim, laurels).

**Tone: rich minimalism.** Most of the page is calm ivory space. The richness comes from a few very well-made details: the frames, the ornaments, the hero mechanism.

## Color

### Core palette

| Token | Hex | Role |
|---|---|---|
| `marble-50` | `#FBF8F2` | Page background (warm white) |
| `ivory-0` | `#FFFDF8` | Panel surface |
| `marble-100` | `#F4EEE2` | Alternate section band, hover surface |
| `stone-200` | `#E4DCCB` | Hairlines, dividers |
| `stone-300` | `#D3C7AF` | Panel borders (non-gold) |
| `ink-900` | `#1F1A14` | Primary text |
| `ink-700` | `#4A4238` | Secondary text |
| `ink-500` | `#6F6557` | Captions, meta |
| `gold-300` | `#E8D3A0` | Gold glints, highlight fills, selection |
| `gold-500` | `#C9A45C` | **Decorative** gold: frames, ornaments, rules |
| `gold-600` | `#A8843F` | Gold borders on interactive elements |
| `gold-800` | `#7A5C24` | **Gold text**, links, focus ring |
| `bronze-700` | `#6B4E2E` | Deep trim, pressed states |
| `lapis-800` | `#1C2A40` | Rare dark accent: tooltips, Wonder banner |
| `parchment-100` | `#F1E6CC` | Parchment surface (About scroll only) |

### Accents (small doses)

| Token | Hex | Meaning |
|---|---|---|
| `tyrian-600` | `#6A2556` | Wonder / featured badge |
| `pompeii-600` | `#9A3324` | Emphasis, "current" marker |
| `verdigris-600` | `#3F7568` | Live / success |
| `lapis-600` | `#2A4F8F` | In progress / info |

### Age tints (Experience timeline)
Each Age band gets a faint wash (≈6%) over marble plus a colored Age label:
- **Antiquity:** terracotta `#8F5024`
- **Exploration:** lapis `#2A4F8F`
- **Modern:** verdigris `#3F7568`

### Rules
1. **Gold as text must be `gold-800`.** `gold-500` is too light to read on white, so use it only for ornaments, frames, and rules.
2. **At most one dark element per view:** tooltips and the Wonder banner use `lapis-800` with gold text (`gold-300`). This deliberate contrast is borrowed from Civ VII.
3. Large gold areas are never flat. Use the gold gradient `#E8D3A0 → #C9A45C → #A8843F` on strokes, ornaments, and the hero name.

### Contrast (targets; verify in build)

| Pair | Approx. ratio | Use |
|---|---|---|
| `ink-900` on `marble-50` | ~16:1 | Body ✅ |
| `ink-700` on `ivory-0` | ~9:1 | Secondary ✅ |
| `ink-500` on `marble-50` | ~5.3:1 | Captions ✅ AA |
| `gold-800` on `marble-50` | ~5.6:1 | Links, gold text ✅ AA |
| `gold-300` on `lapis-800` | ~10:1 | Tooltip text ✅ |
| `gold-500` on `marble-50` | ~2.2:1 | ❌ decorative only |

---

## Typography

| Role | Typeface | Why |
|---|---|---|
| **Display / Inscription** | **Cinzel** 500–600 | Roman inscriptional capitals. Names, section titles, banners. Caps only, tracked. |
| **Reading / Body** | **EB Garamond** 400/600 + italic | A classical book face that stays readable on screen. |
| **Display italic** | **Cormorant Garamond** 500 italic | Themed subtitles. |
| **Technical** | **JetBrains Mono** 400 | Stacks, dates, metrics: the engineer's voice. |

### Scale (18px base)

| Token | Size / LH | Face | Use |
|---|---|---|---|
| `display-xl` | 72/1.0, +0.08em | Cinzel 600 | Hero name |
| `display-lg` | 44/1.1, +0.06em | Cinzel 600 | Section titles |
| `display-md` | 28/1.2, +0.05em | Cinzel 500 | Card titles, Age names |
| `subtitle` | 22/1.3 | Cormorant italic | Themed subtitles |
| `body-lg` | 20/1.6 | EB Garamond | Lede |
| `body` | 18/1.65 | EB Garamond | Default |
| `body-sm` | 16/1.5 | EB Garamond | Card copy |
| `mono` | 13/1.5, +0.02em | JetBrains Mono | Tags, dates |
| `label` | 12/1.4, +0.18em caps | Cinzel 600 | Eyebrows, buttons |

On mobile, display sizes shrink by about 35%. Body text stays at 17–18px.

### Details
- Sections are numbered with **Roman numerals**: I Experience, II Projects, III Skills, IV Hobbies, V Contact.
- Dates are plain (`APR 2026`). No Roman-numeral dates, which read as costume.
- Separate lists with **interpuncts** (`·`).
- Use a gold **drop cap** in the About section and on project pages only.

---

## Surfaces & texture (Imperator influence)

- **Page:** `marble-50` with a soft warm radial light from above (no tiled texture, which showed seams).
- **Panel:** `ivory-0`, 1px `gold-500` border plus an inset hairline 4px inside (a double rule), and a 2px radius so the corners read as stone. Soft warm shadow: `0 1px 2px rgba(60,40,10,.06), 0 8px 24px rgba(60,40,10,.06)`.
- **Hover:** the border gilds to `gold-600`, the shadow deepens, and the panel lifts 2px.
- **Parchment:** About panel only.
- **Section bands:** alternate `marble-50` and `marble-100`, separated by a meander band.

## Hero concept: "The Antikythera Mechanism"

The hero art is an abstract **gold line-art orrery / astrolabe**: concentric rings, gear teeth, zodiac-style tick marks with Greek letters, and fine constellation lines. It sits large and partly cropped behind or beside the name, on sunlit marble.

- **Why:** the Antikythera mechanism (c. 100 BC) is often called the first analog computer. It's the literal place where computing meets classical history, which makes it a good emblem for this site.
- **Build:** one inline SVG (no raster) made of 5–7 rings with varied stroke weights (0.75–1.5px) in the gold gradient. Two rings carry gear teeth, and one carries Greek letters (Α–Ω) as tick labels.
- **Motion:** rings draw in on load (stroke-dashoffset), then rotate very slowly in alternating directions (60–180s per turn). Under reduced motion they are fully drawn and static.

## Ornament library (original SVG, one family, 1.25px stroke)

| Ornament | Use |
|---|---|
| Meander (Greek key) band | Section dividers, footer |
| Corner filigree | `FramedPanel ornate` corners |
| Laurel wreath | Portrait medallion, Wonder badge |
| Rosette | Bullets, timeline nodes |
| Ionic capital | Timeline rail caps |
| Swallowtail banner | Section and card headers |
| "RT" roundel monogram | Logo, favicon |

## Iconography
- Utility icons come from Lucide (1.5px stroke), in `ink-700` or `gold-800`.
- Themed icons (owl, amphora, trireme, quill, column, scroll) are custom gold line art in a roundel.
- Tech names appear as mono text tags, not colored brand logos.

## Imagery
- **Project thumbnails:** real screenshots in a gold frame, shown with a slight warm desaturation at rest and full color on hover.
- **Portrait:** a circular medallion with a gold ring and laurel. It shows a monogram placeholder until a photo is supplied.
