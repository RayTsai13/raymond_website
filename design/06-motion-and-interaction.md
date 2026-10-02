# 06: Motion & Interaction

## Motion philosophy

Motion should feel **ceremonial but quick**, like a game UI that respects your time. Things **unfurl, gild, and settle**. They never bounce or wobble.

### Timing tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `instant` | 100ms | `ease-out` | Color changes, focus rings |
| `quick` | 200ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Hover lifts, button states |
| `standard` | 350ms | same | Panel reveals, tooltips |
| `ceremonial` | 700ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entrance, Wonder reveal, banner unfurl |

Nothing interactive ever waits on an animation longer than 350ms.

## Key animations

### Hero entrance (first load only, ~1.2s total, staggered)
1. The Antikythera rings draw in (SVG stroke-dashoffset, outer ring first). Afterward they rotate continuously and very slowly (30–360s per turn, alternating directions)
2. The eyebrow, medallion, role line, tagline, menu, and social icons fade up in a stagger (~150ms apart)
3. The name **rises** with transform only (no opacity fade), so it's visible on first paint and counts as the LCP element

All hero motion is CSS. Under reduced motion the rings are fully drawn and still, and nothing staggers.

### Section reveal on scroll
- The section eyebrow and title fade up 12px (`standard`)
- The meander divider **draws from center outward** (scaleX 0 → 1)
- Cards stagger in (60ms apart)
- Triggers once as the element enters the viewport (IntersectionObserver). No reverse on scroll-up.
- **Fail-safe:** content renders visible. Only elements still below the fold once JS runs are hidden and then revealed. If JS fails or is off, nothing is ever hidden.

### Frame gilding (hover on interactive panels)
- The border gilds (`gold-500` → `gold-600`), the shadow deepens, and the panel lifts 2px (200ms). A traveling light sweep was planned but isn't built.

### Timeline rail draw
- A gold line over a stone track scales with scroll progress through the Experience section (`--rail`, updated on `requestAnimationFrame`). Each node turns from stone to gold when its entry reveals. Under reduced motion the rail is fully drawn.

### Tech tree path highlight
- On node hover or focus, the node and all of its prerequisites (and the edges between them) turn gold together (300ms). Unrelated nodes dim to ~45%.

### "Wonder Completed" reveal (project detail page)
- The banner unfurls horizontally (clip-path from center, `ceremonial`), "WONDER COMPLETED" fades in, then the title rises in
- Plays once per project per session (sessionStorage). Clicking or pressing any key skips it
- Total ≤ 1.2s, and content below is readable immediately. This is a flourish, not a loading screen

### Next Turn button
- Idle: a slow glow breath (6s loop)
- Hover: the ring rotates 15° and the glow intensifies
- Click: a quick press (scale 0.95), then a smooth scroll to the next section. A small dark tag shows the destination's name for 1s

## Interaction details

- **Scroll-spy** updates the active nav link (gold text plus a rosette beneath).
- **Smooth scrolling** only for in-page anchor jumps. There's no scroll hijacking, and native scroll physics are left alone.
- **Cursor:** default system cursors. (A custom gold cursor is tempting, but it hurts usability. Skip it.)
- **Focus ring:** 2px `gold-800` outline with 2px offset. Always visible on `:focus-visible`.
- **Text selection color:** `gold-300` background with `ink-900` text.
- **Link style in body copy:** `gold-800` with a 1px underline at 40% opacity that goes to 100% on hover.

## Sound

None by default. If added later, use an opt-in toggle (a lyre icon) for a soft UI click and chime. It stays muted until the user turns it on.
