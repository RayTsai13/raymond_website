// Only skills with evidence in the vault (Skills Inventory). `requires` draws the tree edges.
// abbr: 1–3 letters shown in the node roundel.
// state: mastered (solid gold) · proficient (bronze) · researching (dashed, learning now)
// TODO(raymond): the vault doesn't rate proficiency, so every skill is "proficient" with no years. Adjust these.
// Resume skills without vault evidence yet (Go, Rust, C#, Flutter, Next.js, Flask, GCP, Kubernetes, Supabase, Prisma) are left out.

export const skills = [
  // Foundations
  { id: "python", name: "Python", abbr: "Py", column: "foundations", state: "proficient" },
  { id: "java", name: "Java", abbr: "Jv", column: "foundations", state: "proficient" },
  { id: "c", name: "C / C++", abbr: "C", column: "foundations", state: "proficient" },
  { id: "ts", name: "TypeScript", abbr: "TS", column: "foundations", state: "proficient" },
  { id: "sql", name: "SQL", abbr: "SQL", column: "foundations", state: "proficient" },

  // Systems & frameworks
  { id: "react", name: "React", abbr: "Re", column: "systems", state: "proficient", requires: ["ts"] },
  { id: "node", name: "Node.js / Express", abbr: "Nd", column: "systems", state: "proficient", requires: ["ts"] },
  { id: "postgres", name: "PostgreSQL", abbr: "PG", column: "systems", state: "proficient", requires: ["sql"] },
  { id: "docker", name: "Docker", abbr: "Dk", column: "systems", state: "proficient" },
  { id: "sockets", name: "POSIX Sockets", abbr: "So", column: "systems", state: "proficient", requires: ["c"] },

  // Specialties
  { id: "fullstack", name: "Full-Stack Web", abbr: "FS", column: "specialties", state: "proficient", requires: ["react", "node", "postgres"] },
  { id: "etl", name: "Data Pipelines", abbr: "ETL", column: "specialties", state: "proficient" },
  { id: "cloud", name: "Cloud (Azure, AWS)", abbr: "Cl", column: "specialties", state: "proficient", requires: ["docker"] },
  { id: "iac", name: "Terraform & CI/CD", abbr: "TF", column: "specialties", state: "proficient", requires: ["docker"] },
  { id: "networking", name: "Networking (UDP/TCP)", abbr: "Net", column: "specialties", state: "proficient", requires: ["sockets"] },
];
