// Sourced from the personal vault. Validated by lib/content.ts at build time.
// Ages: antiquity = foundations/education · exploration = internships, research, TA · modern = current.
// TODO(raymond): add an expected graduation date to the UW entry if you want one shown.

export const experience = [
  {
    org: "University of Washington",
    role: "B.S. Computer Science & Software Engineering · Minor in Mathematics",
    age: "antiquity",
    start: "2023-09",
    location: "Seattle, WA",
    bullets: [
      "Coursework: Data Structures & Discrete Math, Hardware & Computer Organization, Operating Systems, Database Systems, Network Design & Programming, Cloud Computing, Embedded Systems, Computer Vision.",
      "Dean's List, 2023–2024.",
    ],
  },
  {
    org: "UW Bothell",
    role: "Resident Assistant",
    age: "exploration",
    start: "2024-09",
    end: "2026-06",
    location: "Bothell, WA",
    bullets: [
      "Responsible for 25+ residents on my floor, and for the safety of 250+ residents while on duty.",
      "Created an alcohol-safety and violence-prevention event with the campus Violence Prevention Advocacy group, and handled all of the planning myself. 70+ residents attended.",
      "Trained and mentored new RAs on the job.",
    ],
  },
  {
    org: "AI4DeafBlind, Helen Keller Foundation",
    role: "CSE Intern",
    age: "exploration",
    start: "2026-01",
    end: "2026-06",
    location: "Seattle, WA",
    bullets: [
      "Built a real-time speech-to-Braille demo in Python using whisper.cpp and pybrl.",
      "Worked on real-time text-to-Braille streaming to a Brailliant refreshable Braille display.",
    ],
    stack: ["Python", "whisper.cpp", "pybrl"],
  },
  {
    org: "Costco IT",
    role: "Platform Engineer Intern",
    age: "modern",
    start: "2026-06",
    end: "2026-09",
    location: "Issaquah, WA",
    bullets: [
      "Owned the project end to end: an Azure-hosted Python ETL pipeline that consolidates DocuSign usage data for about 7,000 enterprise users into a central SQL database.",
      "Report generation went from 40 minutes (sometimes up to 8 hours) of manual spreadsheet work to about 5 minutes.",
      "Ran it as a cron-scheduled Azure Container Apps job with credentials in Azure Key Vault, using batched incremental loads, retries, and idempotent writes.",
      "Provisioned the infrastructure with Terraform and automated build, test, and deployment with GitHub Actions.",
    ],
    stack: ["Python", "Azure", "SQL", "Docker", "Terraform", "GitHub Actions"],
  },
];
