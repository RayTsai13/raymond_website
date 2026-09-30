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
1. The Antikythera rings draw in (SVG stroke-dashoffset, outer ring first). Afterward they rotate continuously and very slowly (60–180s per turn, alternating directions)
2. The medallion ring draws in (SVG stroke) and the laurel fades up
3. The name fades up letter-group by letter-group (the Cinzel caps "carve in" with a subtle gold shimmer sweep once)
4. The menu buttons stagger in (60ms apart)

On later client-side navigations back to home, skip it and show the final state.

### Section reveal on scroll
- The section eyebrow and title fade up 12px (`standard`)
- The meander divider **draws from center outward** (scaleX 0 → 1)
- Cards stagger in (40ms apart, max 6 staggered, the rest appear together)
- Triggers once as the element enters the viewport (IntersectionObserver). No reverse on scroll-up.
- **Fail-safe:** content renders visible. Only elements still below the fold once JS runs are hidden and then revealed. If JS fails or is off, nothing is ever hidden.

### Frame gilding (hover on interactive panels)
- The border animates from bronze to gold. A soft **light sweep** travels across the border once (a masked linear-gradient animating `background-position`, 600ms).

### Timeline rail draw
- The rail's SVG `stroke-dashoffset` is tied to scroll progress through the Experience section. Nodes light up (bronze to gold with a small glow pulse) as the rail reaches them.

### Tech tree path highlight
- On node hover or focus, prerequisite connectors animate to gold in sequence from the root outward (80ms per edge). Unrelated nodes dim to 50%.

### "Wonder Completed" reveal (project detail page)
- The banner unfurls horizontally (clip-path from center, `ceremonial`), "WONDER COMPLETED" fades in, then the title rises in
- Plays once per project per session (sessionStorage). Click or any key skips it
- Total ≤ 1.2s, and content below is readable immediately. This is a flourish, not a loading screen

### Next Turn button
- Idle: a slow glow breath (6s loop)
- Hover: the ring rotates 15° and the glow intensifies
- Click: a quick press (scale 0.94), then a smooth scroll to the next section. The label crossfades to the next section's name for 1s before returning to "NEXT TURN"

## Interaction details

- **Scroll-spy** updates the active nav link and the section rail.
- **Smooth scrolling** only for in-page anchor jumps. There's no scroll hijacking, and native scroll physics are left alone.
- **Cursor:** default system cursors. (A custom gold cursor is tempting, but it hurts usability. Skip it.)
- **Focus ring:** 2px `gold-800` outline with 2px offset. Always visible on `:focus-visible`.
- **Text selection color:** `gold-300` background with `ink-900` text.
- **Link style in body copy:** `gold-800` with a 1px underline at 40% opacity that goes to 100% on hover.

## Sound

None by default. If added later, use an opt-in toggle (a lyre icon) for a soft UI click and chime. It stays muted until the user turns it on.
