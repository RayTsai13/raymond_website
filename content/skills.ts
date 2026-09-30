// TODO(raymond): adjust skills, states and prerequisites. `requires` draws the tree edges.
// abbr: 1–3 letters shown in the node roundel.
// state: mastered (solid gold) · proficient (bronze) · researching (dashed, learning now)

export const skills = [
  // Foundations
  { id: "python", name: "Python", abbr: "Py", column: "foundations", state: "mastered", years: 4 },
  { id: "java", name: "Java", abbr: "Jv", column: "foundations", state: "proficient", years: 3 },
  { id: "c", name: "C / C++", abbr: "C", column: "foundations", state: "proficient", years: 2 },
  { id: "js", name: "JavaScript", abbr: "JS", column: "foundations", state: "mastered", years: 4 },
  { id: "sql", name: "SQL", abbr: "SQL", column: "foundations", state: "proficient", years: 2 },

  // Systems & frameworks
  { id: "ts", name: "TypeScript", abbr: "TS", column: "systems", state: "mastered", requires: ["js"], years: 3 },
  { id: "react", name: "React / Next.js", abbr: "Re", column: "systems", state: "mastered", requires: ["ts"], years: 3 },
  { id: "node", name: "Node.js", abbr: "Nd", column: "systems", state: "proficient", requires: ["js"], years: 2 },
  { id: "os", name: "Operating Systems", abbr: "OS", column: "systems", state: "proficient", requires: ["c"] },
  { id: "postgres", name: "PostgreSQL", abbr: "PG", column: "systems", state: "proficient", requires: ["sql"] },
  { id: "pytorch", name: "PyTorch", abbr: "PT", column: "systems", state: "proficient", requires: ["python"] },

  // Specialties
  { id: "fullstack", name: "Full-Stack Web", abbr: "FS", column: "specialties", state: "mastered", requires: ["react", "node", "postgres"] },
  { id: "distributed", name: "Distributed Systems", abbr: "DS", column: "specialties", state: "researching", requires: ["os", "java"], note: "Learning now" },
  { id: "ml", name: "Machine Learning", abbr: "ML", column: "specialties", state: "proficient", requires: ["pytorch"] },
  { id: "cloud", name: "Cloud & Docker", abbr: "CD", column: "specialties", state: "researching", requires: ["node", "os"], note: "Learning now" },
];
