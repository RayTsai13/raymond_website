# 03: Information Architecture

## Site map

```
/                       Home: single long-scroll "chronicle"
├── #experience         I.   Experience      — "The Ages"
├── #projects           II.  Projects        — "The Great Works"
├── #skills             III. Skills          — "The Tech Tree"
├── #hobbies            IV.  Beyond the Code — "The Forum"
└── #contact            V.   Contact         — "Send an Envoy"

/projects               All projects (filterable), "The Codex"
/projects/[slug]        Project detail, "Wonder" page
/resume                 Placeholder, "The Scroll is being inscribed"
/404                    "These lands are uncharted."
```

Out of scope for v1: blog, dark theme, easter eggs.

## Home page flow

| Order | Section | Purpose |
|---|---|---|
| 0 | **Hero / Main Menu** | Who, what, where next (Antikythera hero) |
| 0.5 | **About ("The Scroll")** | Short bio: engineer + historian |
| I | **Experience** | Timeline grouped into Ages |
| II | **Projects** | 1 Wonder + 2–3 Great Works, then a link to the Codex |
| III | **Skills** | Tech tree |
| IV | **Hobbies** | 3–6 Forum cards |
| V | **Contact** | Email, links, resume |
| — | **Footer** | Meander band, monogram, Latin quote |

## Navigation

### Top bar (desktop)
```
(RT) RAYMOND TSAI     EXPERIENCE · PROJECTS · SKILLS · HOBBIES · CONTACT    [ RESUME ]
```
- Transparent over the hero. After scrolling it becomes frosted ivory (`ivory-0/85%` with backdrop blur) with a gold hairline beneath.
- Links use the `label` style in `ink-700`. The active link turns `gold-800` with a small rosette below it (scroll-spy).

### Mobile
- Monogram on the left, gold hamburger on the right. It opens a full-screen **Game Menu** overlay (an ornate framed panel with `MenuButton`s). It traps focus and closes on Esc.

### Next Turn button
A fixed circular gold button, bottom-right, that jumps to the next section. On the last section it says "RETURN" and goes back to the top.

## URLs
- Anchors use plain words (`#experience`).
- `/projects?type=web&tech=rust` keeps filter state in the query string.
- Every route is statically generated.
