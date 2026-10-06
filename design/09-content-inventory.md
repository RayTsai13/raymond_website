# 09: Content Inventory & Open Questions

The design is only as good as what goes in it. Here's what Raymond needs to gather.

**Current state:** real content from Raymond's personal notes has replaced the sample content. Remaining gaps are marked `TODO(raymond)` in the source and listed in the root `README.md`. Each item below says which file it goes in. The root `README.md` covers the project front matter format.

## Content checklist

### Identity
- [ ] Full name as it should appear (`content/site.ts`) (and whether to include a middle name or initial)
- [ ] One-line role: e.g. "Software Engineer · CS Student at ___"
- [ ] Hero tagline (draft: *"Building systems that last, and studying why the old ones fell."*)
- [ ] Portrait photo (square, well-lit, ≥ 800px). It replaces the monogram in `components/sections/Hero.tsx`.
- [ ] 3–4 sentence bio for the About section
- [ ] "NOW" line: current status or what he's seeking, with timeframe
- [ ] Links: GitHub (confirm `RayTsai13`), LinkedIn, email, and the site domain
- [x] Résumé PDF at `public/resume.pdf`

### Projects (for each) → `content/projects/<slug>.mdx`
- [ ] Title, one-line summary, date
- [ ] Tier: which one is the **Wonder**, and which 2–3 are **Great Works**
- [ ] 2–3 impact bullets with numbers where possible (users, performance, scale, grades, awards)
- [ ] Tech stack
- [ ] Links: repo, live demo, write-up
- [ ] Cover screenshot (16:9) in `public/`, referenced by `cover:`
- [ ] For the Wonder (and ideally Great Works): a longer write-up covering Problem → Approach → Architecture → Challenges → Results → Lessons

### Experience (for each) → `content/experience.ts`
- [ ] Org, role, dates, location
- [ ] 2–4 impact bullets
- [ ] Stack
- [ ] Which **stage** it belongs to (or accept the default split in 04)

### Education
- [ ] University, degree, minor (History?), expected graduation
- [ ] Relevant coursework (5–8), GPA if you want to show it, honors

### Skills → `content/skills.ts`
- [ ] List of languages, frameworks, tools, and concepts
- [ ] For each: mastered, proficient, or researching
- [ ] Rough prerequisite relationships (drafted from the list if needed)

### Hobbies → `content/hobbies.ts`
- [ ] 3–6 hobbies with a one-liner each
- [ ] History specifics: favorite period, currently reading, favorite historical figure
- [ ] Optional photos

### Honors → `content/honors.ts`
- [ ] Awards, hackathons, scholarships, publications

---

## Decisions (resolved 2026-09-30)

1. **Section order:** Experience first, then Projects.
2. **Hero art:** abstract. The gold "Antikythera mechanism" orrery (see 02).
3. **Theming intensity:** a rich but minimalist game UI. Mainly Civ VII, with a touch of Imperator: Rome.
4. **Theme:** Day (light, white and marble with gold accents) only. No dark mode for now.
5. **Blog:** skipped for now.
6. **Hosting:** AWS: static export on S3 + CloudFront, deployed from GitHub Actions.
7. **Easter eggs:** off.
8. **Resume:** download page at `/resume`, serving `public/resume.pdf`.

## Later decisions

- **2026-10-02, copy tone:** the theme is visual only. Site text stays plain English: no Latin, no Roman-numeral dates, and no roleplay wording (see 01, "Tone of voice").
- **2026-10-02, branches:** work happens directly on `main`.
