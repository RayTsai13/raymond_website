// TODO(raymond): replace every placeholder in this file — see design/09-content-inventory.md.
// SAMPLE CONTENT: realistic filler so the layout reads like the finished site.

export const site = {
  name: "Raymond Tsai",
  role: "Software Engineer",
  roleLine: "Software Engineer · Student of Computer Science & History",
  tagline: "Building systems that last, and studying why the old ones fell.",
  description:
    "Portfolio of Raymond Tsai, a software engineer and computer science student with a lifelong love of history.",
  // TODO(raymond): set the real domain once it exists.
  url: "https://example.com",
  email: "hello@example.com", // TODO(raymond)
  /** Shows the "Sample content" pill. Set to false once everything is real. */
  sampleContent: true,
  now: "Software engineering co-op at Halcyon Systems this fall · seeking SWE internships for Summer 2027.",
  about: [
    "Currently a computer science student at Northfield University, I like building systems people rely on every day: real-time data pipelines, developer tools, and the occasional game.",
    "I also study history, mostly the late Roman Republic. Both fields teach the same lesson: systems outlive their builders, so build them to be understood, maintained, and trusted.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/RayTsai13" }, // TODO(raymond): confirm
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO(raymond)
  ],
  quotes: [
    { latin: "Festina lente.", english: "Make haste slowly.", source: "Augustus" },
    { latin: "Per aspera ad astra.", english: "Through hardships to the stars." },
    { latin: "Faber est suae quisque fortunae.", english: "Every man is the maker of his own fortune.", source: "Appius Claudius Caecus" },
    { latin: "Non scholae sed vitae discimus.", english: "We learn not for school, but for life.", source: "after Seneca" },
    { latin: "Historia magistra vitae.", english: "History is the teacher of life.", source: "Cicero" },
  ],
} as const;

/** Home page sections, in order. Drives nav, scroll-spy and the Next Turn button. */
export const sections = [
  { id: "experience", numeral: "I", label: "Experience", title: "The Ages" },
  { id: "projects", numeral: "II", label: "Projects", title: "The Great Works" },
  { id: "skills", numeral: "III", label: "Skills", title: "The Tech Tree" },
  { id: "hobbies", numeral: "IV", label: "Beyond the Code", title: "The Forum" },
  { id: "contact", numeral: "V", label: "Contact", title: "Send an Envoy" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
