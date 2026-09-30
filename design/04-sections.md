# 04: Sections

Wireframes are schematic. `[ ]` are buttons, `( )` are medallions and roundels, and `╔═╗` marks a `FramedPanel`. All surfaces are Day theme (see 02): ivory panels on marble, gold frames, ink text.

---

## 0. Hero: "Main Menu"

**Goal:** within 5 seconds a visitor knows name, role, and theme, and has an obvious next click.

```
          ~ sunlit marble; huge gold Antikythera rings slowly turning behind ~

                              ╭─── laurel ───╮
                             (   PORTRAIT    )
                              ╰──────────────╯
                           ── ornamental rule ──
                          R A Y M O N D   T S A I
                  Software Engineer  ·  Student of Computer Science
                   "Building systems that last — and studying why
                              the old ones fell."

                       ╔═══════════════════════════╗
                       ║   BEGIN: THE AGES         ║   ← primary (experience)
                       ╠═══════════════════════════╣
                       ║   THE GREAT WORKS         ║
                       ║   THE SCROLL (RESUME)     ║
                       ║   SEND AN ENVOY           ║
                       ╚═══════════════════════════╝

                  (gh)  (in)  (✉)            ⌄ scroll
```

- The layout mirrors a game main menu: centered medallion, name, and a vertical stack of menu buttons.
- The name uses Cinzel `display-xl` with the gold gradient text-clip. The role line uses Cormorant italic `subtitle`.
- Buttons use `MenuButton` (see 05). Hovering slides a gold bar in from the left, like a game menu selection.
- Background: the **Antikythera mechanism** SVG (see 02). It is gold line-art rings, oversized and centered behind the medallion, partly cropped by the viewport, with a warm radial light from the top. The rings draw in on load and then rotate slowly.
- Social icons sit in small gold-bordered roundels.
- **Mobile:** same stack. The portrait shrinks to 120px, and the menu becomes full-width buttons.

## 0.5 About: "The Scroll"

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

## I. Experience: "The Ages"

The career timeline is grouped into three **Ages**, echoing Civ VII's Antiquity, Exploration, and Modern eras. Each Age is a band with its own subtle tint.

```
I  ·  EXPERIENCE
THE AGES
─── meander ───

 ┃ ═══ AGE OF ANTIQUITY ═══  (foundations: education, first projects)
 ┃
 ◉─── ╔════════════════════════════════════════╗
 ┃    ║ (logo) UNIVERSITY NAME                 ║
 ┃    ║ B.S. Computer Science · Minor History  ║
 ┃    ║ 2023 — 2027          ▸ coursework ...  ║
 ┃    ╚════════════════════════════════════════╝
 ┃
 ┃ ═══ AGE OF EXPLORATION ═══  (internships, research, TA)
 ┃
 ◉─── ╔════════════════════════════════════════╗
 ┃    ║ (logo) COMPANY · Software Eng. Intern  ║
 ┃    ║ Summer 2025 · City                     ║
 ┃    ║ ▸ Achievement with metric              ║
 ┃    ║ ▸ Achievement with metric              ║
 ┃    ║ GO · KAFKA · AWS                       ║
 ┃    ╚════════════════════════════════════════╝
 ┃
 ┃ ═══ MODERN AGE ═══  (current)
 ┃
 ◉ ◀ YOU ARE HERE (pulsing gold)
 ┃
 ╨  (Ionic column base)
```

- The vertical rail is a thin gold line topped and based with **Ionic column capitals**. Nodes are rosettes.
- Entries alternate left and right on desktop. On mobile they sit in a single column with the rail on the left.
- The rail **draws itself** as you scroll (stroke-dashoffset tied to scroll progress).
- Each entry is an `ExperienceCard`: logo roundel, org, title, dates (mono), location, 2–4 impact bullets, and tech tags.
- **Assigning Ages** is a creative choice. Suggested split: *Antiquity* = education, clubs, and first projects. *Exploration* = internships, research, TA work, and hackathons. *Modern* = the current or most recent role, plus what's next.
- An optional **"Honors & Achievements"** strip sits beneath (awards, hackathon wins, scholarships), styled as small laurel badges called "Great People earned".

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

                 [ EXPLORE THE FULL CODEX → ]
```

- Tiering: **Wonder** (1 flagship, with a Tyrian purple badge and laurel), then **Great Work** (featured), then **Work** (archive only).
- Every card shows: title, one-line description, 2–3 bullet impacts (Wonder only), tech tags (mono), links (repo, live, write-up), and a status pill (`LIVE`, `SHIPPED`, `IN PROGRESS`, `ARCHIVED`) in the appropriate accent.

### `/projects`: "The Codex"

- A filter bar with gold-outline chips: **Type** (Web, Systems, ML, Research, Game, Tooling) and **Tech** (languages and frameworks).
- A responsive grid of `ProjectCard`s, sortable by date or tier.

### `/projects/[slug]`: Wonder page

```
┌── banner ─────────────────────────────────────────────┐
│  ★ WONDER COMPLETED                                   │
│  PROJECT NAME                         MMXXV · 2025    │
│  Tagline in italic                                    │
└───────────────────────────────────────────────────────┘
[ hero screenshot in gold frame ]

╔ SIDEBAR ═══════╗   Body (MDX): Problem → Approach →
║ ROLE           ║   Architecture (diagram) → Challenges →
║ TIMELINE       ║   Results → What I'd do differently
║ STACK          ║
║ TEAM SIZE      ║
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
- Hovering or focusing a node highlights its prerequisite path in gold and shows a **framed tooltip**: years of use, and which projects used it (linked).
- **Mobile:** the tree collapses into grouped lists per column, with connectors hidden. Each item keeps its state badge.
- **Accessible fallback:** the tree is built from real lists (`<ul>` per column) with `aria-describedby` for prerequisites. The SVG lines are decorative.

---

## IV. Hobbies: "The Forum" (Beyond the Code)

Small and warm. It lets the visitor see a person, not a résumé.

```
IV  ·  BEYOND THE CODE
THE FORUM
─── meander ───

 ╔═══════════╗  ╔═══════════╗  ╔═══════════╗  ╔═══════════╗
 ║  (owl)    ║  ║ (amphora) ║  ║ (trireme) ║  ║  (quill)  ║
 ║  HISTORY  ║  ║  [HOBBY]  ║  ║  [HOBBY]  ║  ║  [HOBBY]  ║
 ║ "Currently║  ║  one line ║  ║  one line ║  ║  one line ║
 ║  reading: ║  ║           ║  ║           ║  ║           ║
 ║  SPQR"    ║  ║           ║  ║           ║  ║           ║
 ╚═══════════╝  ╚═══════════╝  ╚═══════════╝  ╚═══════════╝
```

- 3–6 **"Pantheon" cards**. Each has a custom icon roundel, a name, a one-liner, and a detail line (a favorite book, a stat). The detail is always visible; a hover-only reveal left the cards looking empty.
- History gets special treatment with a **"Currently Reading"** card (book title plus author) and perhaps a "favorite period" line.
- Optional: a "Civilization I'd play as" card. It's a fun wink for anyone who gets the reference.

---

## V. Contact: "Send an Envoy"

```
V  ·  CONTACT
SEND AN ENVOY
─── meander ───

 ╔══════════════════════════════════════════════════════╗
 ║   Open to [internships / full-time roles / collabs]. ║
 ║   The fastest route is email.                        ║
 ║                                                      ║
 ║   [ ✉  SEND AN ENVOY ]   ← mailto, primary           ║
 ║   [ ⬇  DOWNLOAD THE SCROLL (RESUME PDF) ]            ║
 ║                                                      ║
 ║   (gh) GitHub   (in) LinkedIn   (✉) email@...        ║
 ╚══════════════════════════════════════════════════════╝
```

- Use a mailto plus a copy-email button (it shows a "Copied, the envoy departs" toast). **No contact form in v1**, which means no backend, no spam, and nothing to maintain.

## Footer

```
═══════════ meander band ═══════════
        (RT)
  RAYMOND TSAI · MMXXVI · © 2026
  Built with Next.js · Set in Cinzel & EB Garamond
  "Carthago delenda est" ← rotating Latin quote (with hover translation)
```
