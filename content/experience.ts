// TODO(raymond): replace with real entries. Validated by lib/content.ts at build time.
// SAMPLE CONTENT: fictional organizations, realistic shape.
// Ages: antiquity = foundations/education · exploration = internships, research, TA · modern = current.

export const experience = [
  {
    org: "Northfield University",
    role: "B.S. Computer Science · Minor in History",
    age: "antiquity",
    start: "2023-09",
    end: "2027-06",
    location: "Northfield, CA",
    bullets: [
      "Coursework: Data Structures, Algorithms, Operating Systems, Distributed Systems, Databases, Machine Learning.",
      "History coursework: The Roman Republic, Byzantium, Historiography.",
      "GPA 3.8 · Dean's List, 4 semesters · ACM chapter vice-president.",
    ],
  },
  {
    org: "Northfield Digital Humanities Lab",
    role: "Undergraduate Researcher",
    age: "exploration",
    start: "2024-09",
    end: "2025-05",
    location: "Northfield, CA",
    bullets: [
      "Built an OCR clean-up pipeline for 19th-century letters, cutting manual correction time by 60%.",
      "Co-authored a workshop paper on dating undated manuscripts with small language models.",
    ],
    stack: ["Python", "PyTorch", "Tesseract"],
  },
  {
    org: "Northfield University, Dept. of CS",
    role: "Teaching Assistant, Data Structures",
    age: "exploration",
    start: "2025-01",
    end: "2025-05",
    location: "Northfield, CA",
    bullets: [
      "Led two weekly sections of 30 students. Section averages rose 8% over the prior term.",
      "Wrote an autograder test suite in Java that is still used today.",
    ],
    stack: ["Java", "JUnit"],
  },
  {
    org: "Meridian Labs",
    role: "Software Engineering Intern",
    age: "exploration",
    start: "2025-06",
    end: "2025-09",
    location: "San Francisco, CA",
    bullets: [
      "Rebuilt the billing export service in Go. p95 latency fell from 2.1 s to 380 ms.",
      "Designed and shipped a feature-flag audit log used by 14 internal teams.",
      "Cut CI time 35% by caching Docker layers and parallelizing integration tests.",
    ],
    stack: ["Go", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    org: "Halcyon Systems",
    role: "Software Engineering Co-op",
    age: "modern",
    start: "2026-09",
    location: "Remote",
    current: true,
    bullets: [
      "Working on the observability platform team: ingesting and querying traces at scale.",
      "First project: a sampling service that keeps rare, slow traces while dropping routine ones.",
    ],
    stack: ["Go", "Kafka", "ClickHouse"],
  },
];
