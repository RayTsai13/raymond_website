import { hobbies } from "./hobbies";

// Sourced from the personal vault (resume + experience notes). Remaining gaps are marked TODO(raymond).

export const site = {
  name: "Raymond Tsai",
  role: "Software Engineer",
  roleLine: "Software Engineer · Computer Science & Software Engineering student at the University of Washington",
  // TODO(raymond): rewrite the tagline in your own voice. This one only restates what's in the vault.
  tagline: "I build full-stack web apps, cloud data pipelines, and networked systems.",
  description:
    "Portfolio of Raymond Tsai, a software engineer and Computer Science & Software Engineering student at the University of Washington.",
  // TODO(raymond): set the real domain once it exists.
  url: "https://example.com",
  email: "raytsai.21@gmail.com",
  /** Shows the "Sample content" pill. Set to false once everything is real. */
  sampleContent: false,
  now: "Studying Computer Science & Software Engineering at the University of Washington. Most recently a Platform Engineer Intern at Costco IT (summer 2026).",
  about: [
    "I'm a Computer Science & Software Engineering student at the University of Washington, minoring in mathematics. This past summer I was a Platform Engineer Intern at Costco IT, where I owned an Azure data pipeline end to end: the Python ETL code, the Terraform infrastructure, and the CI/CD pipeline that ships it.",
    "Outside of work I build full-stack products like Schedulux and compete in hackathons, most recently as a finalist at UWBHacks '26. I also spent two years as a Resident Assistant at UW Bothell. I speak English, Mandarin Chinese, and Japanese.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/RayTsai13" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/raymondtsai61931" },
  ],
} as const;

const NUMERALS = ["I", "II", "III", "IV", "V"];

const allSections = [
  { id: "experience", label: "Experience", title: "The Ages" },
  { id: "projects", label: "Projects", title: "The Great Works" },
  { id: "skills", label: "Skills", title: "The Tech Tree" },
  { id: "hobbies", label: "Beyond the Code", title: "Off the Clock" },
  { id: "contact", label: "Contact", title: "Get in Touch" },
] as const;

export type SectionId = (typeof allSections)[number]["id"];

/** Home page sections, in order. Drives nav, scroll-spy and the Next Turn button. Empty sections are left out. */
export const sections = allSections
  .filter((s) => s.id !== "hobbies" || hobbies.length > 0)
  .map((s, i) => ({ ...s, numeral: NUMERALS[i] }));

export function getSection(id: SectionId) {
  return sections.find((s) => s.id === id);
}
