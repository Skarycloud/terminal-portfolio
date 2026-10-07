// Portfolio content. Edit this file to update what the terminal prints.

export type Tone = "default" | "accent" | "success" | "error" | "warning" | "muted"

export type Line =
  | { kind: "out"; text: string; tone?: Tone; art?: boolean }
  | { kind: "prompt"; prompt: string; text: string }

// Commands may return plain strings (default tone) or styled lines.
export type Out = string | Line

export const out = (text: string, tone?: Tone): Line => ({ kind: "out", text, tone })
export const art = (text: string, tone?: Tone): Line => ({ kind: "out", text, tone, art: true })

const RULE_WIDTH = 44

export const header = (title: string): Line[] => {
  const pad = Math.max(0, Math.floor((RULE_WIDTH - title.length) / 2))
  return [
    out("=".repeat(RULE_WIDTH), "accent"),
    out(" ".repeat(pad) + title, "accent"),
    out("=".repeat(RULE_WIDTH), "accent"),
    "",
  ].map((l) => (typeof l === "string" ? out(l) : l))
}

export const profile = {
  name: "Sumanth Kumar",
  role: "Full-stack Developer & AI Product Builder",
  tagline: "Full-stack Developer & AI Product Builder",
  stack: "React · Next.js · React Native · Expo · Node.js · AI",
  location: "Mangalore, Karnataka, India",
  email: "sumanth.k.0202@gmail.com",
  phone: "+91 8970732689",
  githubUser: "Skarycloud",
  github: "https://github.com/Skarycloud",
  linkedin: "https://www.linkedin.com/in/sumanth-kumar-230194294",
  x: "https://x.com/SumanthKum75525",
  instagram: "https://www.instagram.com/skarycloud/",
  portfolio: "https://sumanth-kumar-portfolio.vercel.app",
  resume: "/assets/Sumanth_Kumar_Resume.pdf",
  resumeFile: "Sumanth_Kumar_Resume.pdf",
}

export type Project = {
  slug: string
  name: string
  category: string
  // featured: professional / client / founder work. more: earlier projects. experiment: side projects.
  tier: "featured" | "more" | "experiment"
  summary: string
  // What the product is...
  product: string[]
  // ...kept separate from what I personally did.
  role?: string
  work?: string[]
  features?: string[]
  tech: string[]
  links: { label: string; url: string }[]
  note?: string
}

export const projects: Project[] = [
  {
    slug: "mirchi35-studio",
    name: "Mirchi35 Studio",
    category: "React Native / Expo · Android · Production",
    tier: "featured",
    summary: "Production Android app for Mirchi35, live on Google Play",
    product: [
      "The Android app from Mirchi35, India's live local-discovery platform where local vendors post live updates, deals and offers.",
    ],
    role: "Associate MERN Stack Developer & Test Engineer at Mirchi35. Responsible for the app's UI/UX and frontend development.",
    work: [
      "Designed the UI/UX and screens in Figma",
      "Built the app in React Native with Expo",
      "Frontend architecture and API integration",
      "Responsive mobile UI implementation",
      "Testing and debugging",
      "Android build configuration and release preparation",
      "Launched on the Google Play Store",
    ],
    tech: ["React Native", "Expo (Expo Router)", "Redux Toolkit", "Axios", "Figma"],
    links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.mirchi35.studio" }],
  },
  {
    slug: "community-connect",
    name: "Mirchi35 Community Connect",
    category: "React Native / Expo · Android · Production",
    tier: "featured",
    summary: "Second production Android app for Mirchi35, live on Google Play",
    product: ["A community app in the Mirchi35 ecosystem for Android."],
    role: "Associate MERN Stack Developer & Test Engineer at Mirchi35. UI/UX and frontend development.",
    work: [
      "UI/UX design in Figma",
      "Frontend development in React Native with Expo",
      "API integration",
      "Testing and debugging",
      "Android build and Play Store deployment",
    ],
    tech: ["React Native", "Expo (Expo Router)", "i18next (multi-language)", "Figma"],
    links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.mirchi35.pulse" }],
  },
  {
    slug: "emenu",
    name: "eMenu",
    category: "Founder · Full-stack · SaaS",
    tier: "featured",
    summary: "My own SaaS: digital QR menus for restaurants and cafés",
    product: [
      "A digital menu platform for restaurants, cafés and food businesses. Businesses create and manage their menus, then share them with customers through a QR code. No reprinting when prices change.",
    ],
    role: "Founder. I design and build the product.",
    features: [
      "Menu builder with drag-and-drop ordering",
      "Instant menu updates for items and pricing",
      "QR-based menu access",
      "Customer-facing menu with restaurant branding, category & tag filters, search and multi-language support",
      "Business dashboard with analytics",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Supabase", "Prisma", "Stripe"],
    links: [{ label: "Live", url: "https://emenuweb.com/" }],
  },
  {
    slug: "gt-five",
    name: "GT-Five",
    category: "Freelance · UI/UX · Brand & Product Design",
    tier: "featured",
    summary: "App UI/UX, logo, posters and banners for an electrical accessories brand",
    product: [
      "GT-Five is a brand of premium modular electrical switches, sockets and accessories, with its own Android app on Google Play.",
    ],
    role: "Freelance designer. I designed the app's UI/UX and the brand graphics. Development was done by others.",
    work: [
      "App UI/UX design in Figma: user flows, screens and visual system",
      "Logo design",
      "Poster and banner designs",
    ],
    tech: ["Figma"],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.gtfive.gtfive_app" },
      { label: "Website", url: "https://gtfive.com/" },
    ],
  },
  {
    slug: "vakya",
    name: "Vakya",
    category: "Product / Web · UI/UX · Development",
    tier: "featured",
    summary: "Landing page for a daily Bhagavad Gita verses product",
    product: ["Vakya puts a Bhagavad Gita verse on your lock screen and home screen, every day."],
    role: "Freelance. Designed and built the landing page.",
    work: ["Landing page design and frontend development", "Redesign with a light cream theme and color-blocked sections"],
    tech: ["Next.js", "React", "GSAP", "Motion"],
    links: [{ label: "Live", url: "https://vakya.fun/" }],
  },
  {
    slug: "auralion-labs",
    name: "Auralion Labs",
    category: "Co-founder · Product Development · Design & Engineering",
    tier: "featured",
    summary: "The product studio I co-founded. I designed and built its website",
    product: [
      "Auralion Labs is a product studio that designs and builds AI products, web and mobile apps, automation systems and SaaS platforms.",
    ],
    role: "Co-founder. I personally designed and built the company website.",
    work: [
      "UI/UX and visual design in Figma",
      "Built the site in Next.js and React",
      "Responsive layouts and motion",
      "Blog powered by Sanity CMS",
      "Cal.com call booking",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "GSAP", "Motion", "Sanity CMS", "Figma"],
    links: [{ label: "Live", url: "https://www.auralionlabs.com/" }],
  },
  {
    slug: "wren",
    name: "Wren – Agentic Healthcare Assistant",
    category: "Agentic AI · Healthcare Automation · Hackathon",
    tier: "featured",
    summary: "AI agent for patient check-in, built for a Devpost hackathon",
    product: [
      "An agentic waiting-room assistant for GP clinics. It's not a chatbot: an AI agent runs the patient's check-in, asks the follow-up questions people avoid at the desk and writes the day's intake into the chart. A separate clinician console turns that intake and messy past notes into a 30-second brief for the doctor to review.",
    ],
    role: "Team project for the All Things Agentic hackathon. I worked on the patient and clinician interfaces.",
    work: [
      "Redesigned the patient check-in and clinician surfaces",
      "Speech input for the patient chat",
      "Chat composer and conversation fixes",
    ],
    features: [
      "Patient intake: an agent-led check-in that writes the day's chart",
      "Clinician brief: intake plus past notes condensed into a 30-second summary for review",
      "Waiting room: the clinician's patient queue, sorted by triage urgency (sickest first)",
    ],
    tech: ["Gemini", "Google Agent Development Kit (ADK)", "Python", "Cloud Run", "Firestore"],
    links: [{ label: "Hackathon", url: "https://allthingsagentichackathon.devpost.com/" }],
    note: "Hackathon prototype. Not a production or clinically validated system, and it does not diagnose.",
  },
  {
    slug: "mirchi35-web",
    name: "Mirchi35 Website",
    category: "Next.js / React · UI/UX · Frontend",
    tier: "featured",
    summary: "Responsive website for Mirchi35's live discovery platform",
    product: ["The public website for Mirchi35, India's live local-discovery platform."],
    role: "Frontend developer at Mirchi35.",
    work: ["UI implementation", "Responsive frontend development", "Optimization and testing"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    links: [{ label: "Live", url: "https://www.mirchi35.com/" }],
  },
  {
    slug: "oryx",
    name: "Oryx AI",
    category: "AI · Data Platform",
    tier: "more",
    summary: "Training datasets and evaluation tools for AI/LLM models",
    product: ["A platform providing standardized training datasets and evaluation tools for AI/LLM models."],
    features: [
      "Dataset repositories & preprocessing pipelines",
      "Format transformation tools & model analytics",
      "API-based data access & credit-based usage",
    ],
    tech: ["Node.js", "React", "Python", "Tailwind CSS"],
    links: [{ label: "Live", url: "https://oryx-ai.vercel.app/" }],
  },
  {
    slug: "codestack",
    name: "Code Stack",
    category: "Open Source · Developer Tools",
    tier: "more",
    summary: "Open-source directory of developer tools and resources",
    product: ["An open-source developer resource platform organizing frameworks, tools, and resources."],
    features: ["Clean, responsive UI for discovering tech", "Conceptually organized tools", "Searchable directory"],
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    links: [{ label: "Live", url: "https://codestack-sigma.vercel.app/" }],
  },
  {
    slug: "scavenge",
    name: "Scavenge",
    category: "Web Platform · Games",
    tier: "more",
    summary: "Real-world scavenger hunts with GPS tracking and leaderboards",
    product: ["An interactive platform for creating and playing real-world scavenger hunt games."],
    features: [
      "Custom hunt creation & team-based gameplay",
      "Real-time GPS tracking & live leaderboards",
      "Chat, progress tracking & event management",
      "QR code challenges",
    ],
    tech: ["React", "JavaScript", "Node.js", "Maps API", "QR codes"],
    links: [{ label: "Live", url: "https://scavenge.rs/" }],
  },
  {
    slug: "image-pi",
    name: "image-π",
    category: "Experiment · Browser Tools",
    tier: "experiment",
    summary: "Privacy-first image toolkit that runs entirely in the browser",
    product: ["A browser-based image toolkit that processes images locally, so nothing is uploaded."],
    features: [
      "Compression, format conversion, cropping",
      "Background removal & EXIF stripping",
      "Base64 conversion, QR code generator",
    ],
    tech: ["React", "TypeScript", "Canvas API", "Web APIs"],
    links: [{ label: "Live", url: "https://image-pi-dusky.vercel.app/" }],
  },
  {
    slug: "salary-split",
    name: "Salary Split",
    category: "Experiment · Finance Visualization",
    tier: "experiment",
    summary: "Visualize how a salary splits across spending and savings",
    product: ["A small financial visualization tool for splitting a salary into budgets."],
    tech: ["React"],
    links: [{ label: "Live", url: "https://salary-split-three.vercel.app/" }],
  },
  {
    slug: "terminal",
    name: "Terminal Portfolio",
    category: "Experiment · Interactive Portfolio",
    tier: "experiment",
    summary: "This terminal you're using right now",
    product: ["A command-line styled portfolio with themes, a fake filesystem, snake and more."],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Live", url: "https://terminal-portfolio-seven-kohl.vercel.app/" }],
  },
  {
    slug: "roulette",
    name: "Useless Website Roulette",
    category: "Experiment · Fun",
    tier: "experiment",
    summary: "Spin to land on a random delightfully useless website",
    product: ["A fun discovery app that sends you to a random useless website."],
    tech: ["Next.js"],
    links: [{ label: "Live", url: "https://useless-website-roulette.vercel.app/" }],
  },
]

// Accepts "1".."n", a slug ("emenu"), or a name prefix ("gt").
export const findProject = (query: string): { project: Project; index: number } | undefined => {
  const q = query.toLowerCase().replace(/\.md$/, "")
  const n = Number(q)
  if (Number.isInteger(n) && n >= 1 && n <= projects.length) return { project: projects[n - 1], index: n - 1 }
  const index = projects.findIndex(
    (p) => p.slug === q || p.name.toLowerCase() === q || p.slug.startsWith(q) || p.name.toLowerCase().startsWith(q),
  )
  return index === -1 ? undefined : { project: projects[index], index }
}

export const aboutLines = (): Out[] => [
  out("=".repeat(RULE_WIDTH), "accent"),
  out("               SUMANTH KUMAR", "accent"),
  out("  Full-stack Developer & AI Product Builder", "accent"),
  out("        Mangalore, Karnataka, India", "accent"),
  out("=".repeat(RULE_WIDTH), "accent"),
  "",
  "I design and build real products for web and mobile, from the Figma file to the Play Store listing.",
  "",
  "By day I'm at Mirchi35, where I've shipped two Android apps (React Native + Expo) to Google Play and worked on the company website. I take the UI/UX, the frontend, the API integration and the testing.",
  "",
  "Outside of that, I take on freelance product and design work, I'm building eMenu (a SaaS I founded), and I co-founded Auralion Labs, a product studio whose website I designed and built.",
  "",
  "Lately I spend a lot of time on AI: agentic workflows, AI-powered features, and using AI to prototype fast.",
  "",
  out("WHAT I BRING", "warning"),
  out("✓ Production experience: apps live on Google Play", "success"),
  out("✓ Design and engineering in one person: Figma → React / React Native", "success"),
  out("✓ Full-stack: frontend, APIs, backend and automation", "success"),
  out("✓ Founder mindset: I build and ship my own products", "success"),
  "",
  "Type [[experience]], [[projects]], or [[contact]] to learn more.",
  "",
]

export const expertise = [
  "Full-stack Product Development",
  "React & Next.js",
  "React Native & Expo",
  "UI/UX & Product Design",
  "AI & Agentic Systems",
  "AI-assisted Development",
  "API Integration",
  "Backend Development",
  "Automation & Workflows",
  "Data Visualization",
  "Rapid Prototyping",
  "Product Engineering",
]

export const skillGroups: { title: string; items: string }[] = [
  { title: "Frontend", items: "React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, Bootstrap, Material UI" },
  { title: "Mobile", items: "React Native, Expo, Ionic, Capacitor" },
  { title: "Backend", items: "Node.js, Express.js, MongoDB, Firebase, Supabase" },
  { title: "AI / Data", items: "Python, AI/ML, Agentic AI, Data Visualization" },
  { title: "Tools", items: "Git, GitHub, Docker, Postman, Figma, VS Code" },
  { title: "Deployment", items: "Vercel, Netlify, Hostinger, Google Play Console" },
]

export const skillsLines = (): Out[] => [
  ...header("EXPERTISE"),
  ...expertise.map((e) => `  • ${e}`),
  "",
  ...header("TECH STACK"),
  ...skillGroups.flatMap((g) => [out(`${g.title}:`, "warning"), `  ${g.items}`, ""]),
]

const projectListItem = (p: Project, i: number): Out[] => [
  out(`${String(i + 1).padStart(2)}. ${p.name}`, "warning"),
  out(`    ${p.category}`, "muted"),
  `    ${p.summary}  → [[details|project ${i + 1}]]`,
  "",
]

export const projectsLines = (): Out[] => {
  const indexed = projects.map((p, i) => ({ p, i }))
  const section = (tier: Project["tier"]) => indexed.filter((x) => x.p.tier === tier)
  return [
    ...header("PROJECTS"),
    out("Featured: production, client & founder work", "accent"),
    "",
    ...section("featured").flatMap(({ p, i }) => projectListItem(p, i)),
    out("More projects", "accent"),
    "",
    ...section("more").flatMap(({ p, i }) => projectListItem(p, i)),
    out("Other projects & experiments", "accent"),
    ...section("experiment").map(({ p, i }) => `${String(i + 1).padStart(2)}. [[${p.name}|project ${i + 1}]] – ${p.summary}`),
    "",
    "Type [[project <n>|project 1]] or [[project <name>|project emenu]] for details,",
    "or [[open <n>|open 1]] to launch a project in a new tab.",
    "",
  ]
}

export const projectDetailLines = (p: Project, index: number): Out[] => [
  ...header(p.name),
  out(p.category, "accent"),
  "",
  ...p.product,
  "",
  ...(p.role ? [out("My role:", "warning"), `  ${p.role}`, ""] : []),
  ...(p.work ? [out("What I worked on:", "warning"), ...p.work.map((w) => `  • ${w}`), ""] : []),
  ...(p.features ? [out("Key features:", "warning"), ...p.features.map((f) => `  • ${f}`), ""] : []),
  out("Technologies:", "warning"),
  `  ${p.tech.join(", ")}`,
  "",
  ...p.links.map((l) => `${l.label}: ${l.url}`),
  ...(p.note ? [out(`Note: ${p.note}`, "muted")] : []),
  `Type [[link]] or [[open ${index + 1}]] to open it in a new tab.`,
  "",
]

export const experienceLines = (): Out[] => [
  ...header("EXPERIENCE"),
  out("Associate MERN Stack Developer & Test Engineer", "warning"),
  "Mirchi35 Private Limited",
  out("Nov 2025 – Present · Current role", "success"),
  "",
  "  Mirchi35 Studio (Android, live on Google Play)",
  "    • UI/UX design in Figma and React Native (Expo) development",
  "    • Frontend architecture, API integration, testing & debugging",
  "    • Android build configuration and Play Store launch",
  "  Mirchi35 Community Connect (Android, live on Google Play)",
  "    • UI/UX, React Native (Expo) frontend and API integration",
  "    • Testing, Android build and Play Store deployment",
  "  Mirchi35 Website",
  "    • Responsive UI implementation, optimization and testing",
  "  → [[project 1]] · [[project 2]] · [[project 8]]",
  "",
  out("Freelance Full-stack Developer & UI/UX Designer", "warning"),
  out("Part-time, alongside Mirchi35 · Present", "muted"),
  "  • Product UI/UX in Figma, from user flows to visual systems",
  "  • Turning product requirements into working, responsive interfaces",
  "  • Selected work: GT-Five (app UI/UX, logo, posters & banners), Vakya (design & frontend)",
  "  → [[project 4]] · [[project 5]]",
  "",
  out("Founder & Co-founder", "warning"),
  "  • Founder, eMenu: digital menu SaaS for restaurants  → [[project 3]]",
  "  • Co-founder, Auralion Labs: product studio; designed and built its website  → [[project 6]]",
  "",
  out("Frontend Programmer (MEAN Stack) | Ants Applied DataScience", "warning"),
  out("Nov 2023 – Feb 2025", "muted"),
  "  • Ants Portfolio Analyzer: financial analytics dashboards and interactive data visualization",
  "  • Converted it to an Android app with Ionic / Capacitor",
  "  • Solar Data Lake: IoT monitoring dashboards",
  "  • Customer/admin interfaces, API integration, AI/data analytics projects",
  "",
  out("Assistant Software Programmer (Intern) | Ants Applied DataScience", "warning"),
  out("Mar 2023 – Oct 2023", "muted"),
  "  • Data preprocessing and AI/ML workflows, REST APIs, support for data-driven apps",
  "",
]

export const educationLines = (): Out[] => [
  ...header("EDUCATION"),
  out("Bachelor of Computer Applications – Artificial Intelligence & Machine Learning", "warning"),
  "Manipal University Jaipur (Online) | Sep 2024 – 2027 (expected)",
  out("Remote distance-learning program, studied on weekends alongside full-time work", "muted"),
  "",
  out("Diploma in Computer Science & Engineering", "warning"),
  "S J Government Polytechnic | Nov 2021 – May 2023 (GPA: 9.0)",
  "",
]

export const certificationLines = (): Out[] => [
  ...header("CERTIFICATIONS"),
  "• HTML, CSS, and JavaScript for Web Developers – Johns Hopkins University / Coursera",
  "• Developing Cloud Apps with Node.js and React – IBM / Coursera",
  "• AI for Everyone – DeepLearning.AI / Coursera",
  "• ChatGPT Prompt Engineering for Developers – DeepLearning.AI",
  "• Docker for Absolute Beginners – Coursera",
  "",
]

export const contactLines = (): Out[] => [
  ...header("CONTACT"),
  "Have a product idea, need a web or mobile app, or want to build something with AI? Let's talk.",
  "",
  `Email:     ${profile.email}`,
  `Phone:     ${profile.phone}`,
  `GitHub:    ${profile.github}`,
  `LinkedIn:  ${profile.linkedin}`,
  `X:         ${profile.x}`,
  `Instagram: ${profile.instagram}`,
  `Portfolio: ${profile.portfolio}`,
  `Location:  ${profile.location}`,
  "",
  "Shortcut: type [[hire]] to open a pre-filled email. 😉",
  "",
]

// ANSI Shadow letters, assembled per row so the art stays aligned.
const LETTERS: Record<string, string[]> = {
  S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
  U: ["██╗   ██╗", "██║   ██║", "██║   ██║", "██║   ██║", "╚██████╔╝", " ╚═════╝ "],
  M: ["███╗   ███╗", "████╗ ████║", "██╔████╔██║", "██║╚██╔╝██║", "██║ ╚═╝ ██║", "╚═╝     ╚═╝"],
  A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  N: ["███╗   ██╗", "████╗  ██║", "██╔██╗ ██║", "██║╚██╗██║", "██║ ╚████║", "╚═╝  ╚═══╝"],
  T: ["████████╗", "╚══██╔══╝", "   ██║   ", "   ██║   ", "   ██║   ", "   ╚═╝   "],
  H: ["██╗  ██╗", "██║  ██║", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  K: ["██╗  ██╗", "██║ ██╔╝", "█████╔╝ ", "██╔═██╗ ", "██║  ██╗", "╚═╝  ╚═╝"],
}

export const bigText = (word: string): string[] =>
  Array.from({ length: 6 }, (_, row) =>
    word
      .toUpperCase()
      .split("")
      .map((ch) => LETTERS[ch]?.[row] ?? "")
      .join(""),
  )

export const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "I would tell you a UDP joke, but you might not get it.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "!false — it's funny because it's true.",
  "It works on my machine. ¯\\_(ツ)_/¯  Then we'll ship your machine.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
]

export const quotes = [
  ["First, solve the problem. Then, write the code.", "John Johnson"],
  ["Simplicity is prerequisite for reliability.", "Edsger W. Dijkstra"],
  ["Talk is cheap. Show me the code.", "Linus Torvalds"],
  ["Programs must be written for people to read, and only incidentally for machines to execute.", "Harold Abelson"],
  ["Make it work, make it right, make it fast.", "Kent Beck"],
  ["The best way to predict the future is to invent it.", "Alan Kay"],
]
