# 01: Concept & Creative Direction

## The idea

**"An engineer's chronicle, told in the visual language of antiquity."**

Two identities are joined here: someone who builds software and someone who studies history. The site should suggest that both are about the same thing: building systems that last, and understanding why earlier ones rose or fell. The Greco-Roman theme is a statement about who Raymond is. It is not decoration for its own sake.

Civilization VII is the right reference because it already solved the hard problem: how to make classical ornament feel **modern, premium, and usable** rather than kitschy. Gold is used sparingly as framing. We take its framing language and set it on a **light, sunlit palette**: marble, ivory, and gold, closer to the stone-and-bronze panels of **Imperator: Rome**. Ornament sits at the edges, never behind the text.

## Design principles

1. **Legible first, themed second.** Every section has a plain label ("Projects") with a themed subtitle ("Great Works"). A recruiter should never need to know what Civ is.
2. **Ornament lives on the frame, never in the content.** Filigree goes on borders, corners, dividers, and headers. Body text sits on calm, flat panels.
3. **Gold is earned.** Gold marks hierarchy: frames, active states, key headings. If everything is gold, nothing is.
4. **Antiquity meets the terminal.** Classical serif display type sits beside a monospace face for technical details (stacks, dates, metrics). The contrast between the two tells the engineer + historian story.
5. **Game-like, not a game.** Borrow the feel: menus, banners, turn progression, tech tree. Keep standard web conventions: scrolling, links, a back button that works, text you can select.
6. **Fast and quiet.** No autoplay audio, no loading screens, no scroll-jacking. Textures are subtle and light.
7. **Never hide content behind an effect.** Animations decorate content that is already there. If JS or motion is off, everything is still visible.

## What to borrow from Civ VII's UI

| Civ VII element | How it shows up here |
|---|---|
| Framed panels with thin gold borders (rendered here as ivory marble, Imperator-style) | Base surface for every card and section |
| Dark tooltips with gold text | The one dark accent: tooltips and the Wonder banner |
| Ornamental corner pieces and filigree frame edges | `FramedPanel` corners (SVG), used on key panels only |
| Leader portrait in a circular medallion | Hero portrait of Raymond, and small avatars |
| Banner / ribbon headers | Section titles and card headers |
| The three **Ages** (Antiquity, Exploration, Modern) | The structure of the Experience timeline |
| **Tech tree** with connected nodes | Skills visualization |
| **Wonders** and their completion splash | Featured projects and the project detail "reveal" |
| The **Next Turn** button in the corner | Floating "next section" button |
| Tooltips with rich, framed content | Dark hover tooltips on tech tree skills |
| Softly lit, monumental backdrops | The abstract gold "Antikythera mechanism" hero on sunlit marble |

## What *not* to borrow

- **Copyrighted assets.** No Civ VII screenshots, icons, fonts, logos, or art. Everything is original or public domain. This is inspired by Civ VII, not a copy of it.
- **HUD density.** Game UIs pack resource counters and minimaps everywhere. A portfolio shouldn't.
- **Everything in jargon.** "Science yield +5" doesn't belong on a résumé line. Themed words stay in labels and headings. Descriptions stay in plain professional English.
- **Heavy parchment and skeuomorphism.** Crumpled scrolls and wax seals everywhere tip into Renaissance-fair territory. Use parchment in one place (About) only.

## Tone of voice

- **Headings:** classical and a little grand. "The Great Works". "Ages of Service".
- **Body copy:** plain, confident, specific. "Built a real-time ingestion pipeline handling 2M events/day in Go."
- **Microcopy:** a light wink from strategy games, never Roman roleplay. The "Next Turn" button. A 404 page that reads "These lands are uncharted."
- **No Latin and no Roman roleplay in the text.** That means no "Salve", no Latin quotes, no Roman-numeral dates, and no "envoy/scroll/forum/codex/capital" wording. The visuals carry the theme, and the words stay plain. Strategy-game terms (Ages, Great Works, Wonder, Tech Tree, Next Turn) are fine.

## Mood keywords

`sunlit` · `marble` · `gilded` · `inscribed` · `restrained` · `precise` · `rich minimalism`

## References to gather for a moodboard

- Civ VII main menu, leader select, and tech/civics tree screens (for layout and framing reference only)
- Roman monumental inscriptions (e.g., Trajan's Column base) for letterform proportion
- Greek meander (key) patterns, laurel wreaths, acanthus scrolls
- Pompeian red and black frescoes (Villa of the Mysteries) for the accent palette
- Imperator: Rome UI (marble panels, bronze trim)
- White Pentelic marble and gilded bronze (Parthenon, the Arch of Titus)
- Old portolan charts and Roman road maps (Tabula Peutingeriana) for the "map" motif
