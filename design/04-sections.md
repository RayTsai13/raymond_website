# 04: Sections

Wireframes are schematic. `[ ]` are buttons, `( )` are medallions and roundels, and `╔═╗` marks a `FramedPanel`. All surfaces are Day theme (see 02): ivory panels on marble, gold frames, ink text.

---

## 0. Hero: "Main Menu"

**Goal:** within 5 seconds a visitor knows name, role, and theme, and has an obvious next click.

```
          ~ sunlit marble; huge gold Antikythera rings slowly turning behind ~

                               WELCOME
                              ╭─── laurel ───╮
                             (   PORTRAIT    )
                              ╰──────────────╯
                           ── ornamental rule ──
                          R A Y M O N D   T S A I
                  Software Engineer  ·  Student of Computer Science
                   "Building systems that last — and studying why
                              the old ones fell."

                       ╔═══════════════════════════╗
                       ║   BEGIN · TIMELINE        ║   ← primary (experience)
                       ╠═══════════════════════════╣
                       ║   THE GREAT WORKS         ║
                       ║   RÉSUMÉ                  ║
                       ║   GET IN TOUCH            ║
                       ╚═══════════════════════════╝

                  (gh)  (in)  (✉)            ⌄ scroll
```

- The layout mirrors a game main menu: centered medallion, name, and a vertical stack of menu buttons.
- The name uses Cinzel `display-xl` with the gold gradient text-clip. The role line uses Cormorant italic `subtitle`.
- Buttons use `MenuButton` (see 05). Hovering slides a gold bar in from the left, like a game menu selection.
- Background: the **Antikythera mechanism** SVG (see 02). It is gold line-art rings, oversized and centered behind the medallion, partly cropped by the viewport, with a warm radial light from the top. The rings draw in on load and then rotate slowly.
- Social icons sit in small gold-bordered roundels.
- **Mobile:** same stack, with the menu at full width.
- The portrait is a `TODO`: until a photo is added, the medallion holds an "RT" monogram.

## 0.5 About

A short bio on a **parchment** panel. This is the only place parchment appears.

```
╔═ parchment ════════════════════════════════════════════════╗
║  Ⓘ  I'm a computer science student at [University] who     ║
║  builds [kind of software]. When I'm not writing code, I   ║
║  read history, mostly [Rome / Byzantium / ...]. Both       ║
║  teach the same lesson: systems outlive their builders,    ║
║  so build them well.                                       ║
║                                                            ║
║  NOW  ·  [current role / what I'm studying / seeking]      ║
╚════════════════════════════════════════════════════════════╝
```

- Drop cap in gold Cinzel.
- A "NOW" line in mono gives current status, e.g. "Seeking SWE internships for Summer 2027."

---

## I. Experience: "Timeline"

The career timeline is grouped into three plain-English **stages**: Foundations, First Roles, and Industry. Each stage is a band with its own subtle tint. (These replaced the earlier Civ-style "Age of Antiquity / Exploration / Modern" names, which read as corny.)

```
I  ·  EXPERIENCE
TIMELINE
─── meander ───

 ┃ ═══ FOUNDATIONS ═══  (education and coursework)
 ┃
 ◉─── ╔════════════════════════════════════════╗
 ┃    ║ (logo) UNIVERSITY NAME                 ║
 ┃    ║ B.S. Computer Science · Minor History  ║
 ┃    ║ 2023 — 2027          ▸ coursework ...  ║
 ┃    ╚════════════════════════════════════════╝
 ┃
 ┃ ═══ FIRST ROLES ═══  (internships, research, and teaching)
 ┃
 ◉─── ╔════════════════════════════════════════╗
 ┃    ║ (logo) COMPANY · Software Eng. Intern  ║
 ┃    ║ Summer 2025 · City                     ║
 ┃    ║ ▸ Achievement with metric              ║
 ┃    ║ ▸ Achievement with metric              ║
 ┃    ║ GO · KAFKA · AWS                       ║
 ┃    ╚════════════════════════════════════════╝
 ┃
 ┃ ═══ INDUSTRY ═══  (professional engineering work)
 ┃
 ◉ ◀ YOU ARE HERE (pulsing gold)
 ┃
 ╨  (Ionic column base)
```

- The vertical rail is a thin gold line topped and based with **Ionic column capitals**. Nodes are rosettes.
- Entries alternate left and right on desktop. On mobile they sit in a single column with the rail on the left.
- The rail **draws itself** as you scroll (a gold line scaled by scroll progress). Each node turns gold as its entry appears.
- Each entry is a framed card: org, title, dates (mono), location, 2–4 impact bullets, and tech tags. Org logos were planned but aren't implemented.
- **Assigning stages:** *Foundations* = education. *First Roles* = internships, research, RA/TA work, and hackathons. *Industry* = professional engineering roles.
- An **"Honors & Achievements"** strip sits beneath (awards, hackathon wins, scholarships, papers) as small laurel badges, four across. Content is in `content/honors.ts`.

---

## II. Projects: "The Great Works"

### Home page: featured projects

**Layout:** one **Wonder** (hero project, full width) followed by 2–3 **Great Works** in a grid.

```
II  ·  PROJECTS
THE GREAT WORKS
─── meander ───

╔════════════════════════════════════════════════════════════╗
║ ┌──────────────────────┐   ★ WONDER                        ║
║ │                      │   PROJECT NAME                    ║
║ │   screenshot/video   │   One-sentence value statement.   ║
║ │                      │                                   ║
║ └──────────────────────┘   ▸ Impact metric one             ║
║                            ▸ Impact metric two             ║
║                            RUST · WASM · POSTGRES          ║
║                            [ VIEW WONDER ]  (gh) (↗)       ║
╚════════════════════════════════════════════════════════════╝

╔══════════════════╗ ╔══════════════════╗ ╔══════════════════╗
║  [thumbnail]     ║ ║  [thumbnail]     ║ ║  [thumbnail]     ║
║  PROJECT NAME    ║ ║  PROJECT NAME    ║ ║  PROJECT NAME    ║
║  Short desc...   ║ ║  Short desc...   ║ ║  Short desc...   ║
║  TS · REACT      ║ ║  PY · PYTORCH    ║ ║  GO · GRPC       ║
╚══════════════════╝ ╚══════════════════╝ ╚══════════════════╝

                 [ SEE ALL PROJECTS → ]
```

- Tiering: **Wonder** (1 flagship, with a Tyrian purple badge and laurel), then **Great Work** (featured), then **Work** (archive only).
- Every card shows: title, one-line description, 2–3 bullet impacts (Wonder only), tech tags (mono), links (repo, live, write-up), and a status pill (`LIVE`, `SHIPPED`, `IN PROGRESS`, `ARCHIVED`) in the appropriate accent.

### `/projects`: "The Archive"

- A filter bar with gold-outline chips: **Type** (Web, Systems, ML, Research, Game, Tooling) and **Tech** (languages and frameworks).
- A responsive grid of `ProjectCard`s, ordered by tier and then newest first. The Wonder spans the full width when no filter is active. (A sort control was not built.)

### `/projects/[slug]`: Wonder page

```
┌── banner ─────────────────────────────────────────────┐
│  ★ WONDER COMPLETED                                   │
│  PROJECT NAME                              APR 2025   │
│  Tagline in italic                                    │
└───────────────────────────────────────────────────────┘
[ hero screenshot in gold frame ]

╔ SIDEBAR ═══════╗   Summary (drop cap) + impact bullets
║ STATUS         ║   Body (MDX): Problem → Approach →
║ ROLE           ║   Challenges → Results →
║ TEAM           ║   What I'd do differently
║ STACK          ║
║ LINKS          ║
╚════════════════╝
         ← PREVIOUS WORK        NEXT WORK →
```

- The first visit to a Wonder page plays a short, skippable "Wonder completed" reveal: the banner unfurls and the title fades up. Details in 06.
- The body uses a readable 68ch measure, EB Garamond, and a gold drop cap.

---

## III. Skills: "The Tech Tree"

The signature visualization: skills laid out as a Civ-style **tech tree**. Nodes are connected by lines that show progression from fundamentals to specialties.

```
III  ·  SKILLS
THE TECH TREE
─── meander ───

 FOUNDATIONS          SYSTEMS              SPECIALTIES
 ┌─────────┐          ┌─────────┐          ┌─────────┐
 │ (C) C   │──────────│ (⚙) OS  │──────────│ Distrib.│
 └─────────┘     ┌────└─────────┘          │ Systems │
 ┌─────────┐     │    ┌─────────┐          └─────────┘
 │ (Py)    │─────┴────│ (ML)    │──────────┌─────────┐
 │ Python  │          │ PyTorch │          │  LLMs   │
 └─────────┘          └─────────┘          └─────────┘
 ┌─────────┐          ┌─────────┐
 │ (JS) JS │──────────│ React / │───── ...
 └─────────┘          │ Next.js │
                      └─────────┘
```

- Columns act like "eras": **Foundations**, then **Systems / Frameworks**, then **Specialties**.
- Node states: **Mastered** (solid gold border, lit icon), **Proficient** (bronze border), and **Researching** (dashed border with a small progress ring for what he's learning now). This replaces the usual meaningless skill-percentage bars with something honest.
- Hovering or focusing a node highlights its prerequisite path in gold and shows a **dark framed tooltip**: state, note, what it builds on, and what it unlocks. (Linking skills to projects was planned but isn't built.)
- **Mobile:** the tree collapses into grouped lists per column, with connectors hidden. Each item keeps its state badge.
- **Accessible fallback:** the tree is built from real lists (`<ul>` per column) with `aria-describedby` for prerequisites. The SVG lines are decorative.

---

## IV. Hobbies: "Off the Clock" (Beyond the Code)

Small and warm. It lets the visitor see a person, not a résumé.

```
IV  ·  BEYOND THE CODE
OFF THE CLOCK
─── meander ───

 ╔═══════════╗  ╔═══════════╗  ╔═══════════╗  ╔═══════════╗
 ║  (owl)    ║  ║(mountain) ║  ║ (column)  ║  ║ (helmet)  ║
 ║  HISTORY  ║  ║  [HOBBY]  ║  ║  [HOBBY]  ║  ║  [HOBBY]  ║
 ║ "Currently║  ║  one line ║  ║  one line ║  ║  one line ║
 ║  reading: ║  ║           ║  ║           ║  ║           ║
 ║  SPQR"    ║  ║           ║  ║           ║  ║           ║
 ╚═══════════╝  ╚═══════════╝  ╚═══════════╝  ╚═══════════╝
```

- 3–6 hobby cards. Each has a custom icon roundel, a name, a one-liner, and a detail line (a favorite book, a stat). The detail is always visible; a hover-only reveal left the cards looking empty.
- History gets special treatment with a **"Currently Reading"** card (book title plus author) and perhaps a "favorite period" line.
- Optional: a "Civilization I'd play as" card. It's a fun wink for anyone who gets the reference.

---

## V. Contact: "Get in Touch"

```
V  ·  CONTACT
GET IN TOUCH
─── meander ───

 ╔══════════════════════════════════════════════════════╗
 ║   Open to [internships / full-time roles / collabs]. ║
 ║   The fastest route is email.                        ║
 ║                                                      ║
 ║   [ ✉  EMAIL ME ]   [ RÉSUMÉ ]  ← mailto + résumé page ║
 ║                                                      ║
 ║   (gh) GitHub   (in) LinkedIn   (✉) email@...        ║
 ╚══════════════════════════════════════════════════════╝
```

- Use a mailto plus a copy-email button (it shows an "Email copied" toast). **No contact form in v1**, which means no backend, no spam, and nothing to maintain.

## Footer

```
═══════════ meander band ═══════════
        (RT)
  RAYMOND TSAI · © 2026
  Built with Next.js · Set in Cinzel & EB Garamond
```
