/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL PROFILE CONFIGURATION
 *  Every piece of personal information on the site lives here.
 *  Update this file to update the portfolio.
 *
 *  NOTE: The contact email address is NOT stored here — it is read from the
 *  PORTFOLIO_EMAIL environment variable (see .env and README.md) so it can be
 *  changed without touching code.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  firstName: "Eric",
  lastName: "Banven",
  fullName: "Nyuydze Banven Eric Junior",
  displayName: "Eric Banven",
  initials: "EB",
  tagline: "Building ideas into technology that matters.",
  roles: [
    "Software Engineer",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Data Analytics Explorer",
    "Technology Entrepreneur",
  ],
  location: "Cameroon, Central Africa",
  locationShort: "Yaoundé, Cameroon",
  availability: "OPEN TO OPPORTUNITIES",
  description:
    "Software Engineer, technology enthusiast and emerging innovator exploring the intersection of software engineering, artificial intelligence and real-world problem solving.",
  github: {
    username: "BANVEN-subzero",
    url: "https://github.com/BANVEN-subzero",
  },
  /** None yet — no LinkedIn link is displayed anywhere. */
  linkedin: null,
  cvPath: "/cv/Nyuydze_Banven_CV.pdf",
} as const;

export const hero = {
  status: "OPEN TO OPPORTUNITIES",
  greeting: "Hello, I'm Eric Banven.",
  headline: "Building ideas into technology that matters.",
  description:
    "Software Engineer, technology enthusiast and emerging innovator exploring the intersection of software engineering, artificial intelligence and real-world problem solving.",
  photo: {
    src: "/images/profile.webp",
    alt: "Portrait of Nyuydze Banven Eric Junior standing outdoors in front of a church in Cameroon, smiling at the camera",
  },
} as const;

export const about = {
  title: "Beyond the Code.",
  paragraphs: [
    "My journey into technology began with a curiosity about how digital systems work and how software can solve everyday problems. That curiosity gradually developed into a deeper commitment to software engineering, application development and emerging technologies.",
    "Having completed the coursework for my Bachelor of Technology in Software Engineering at the University of Buea — currently awaiting graduation — I am continuing my academic journey through a Master's programme at the College of Technology of the same institution.",
    "Beyond academics, I enjoy experimenting with ideas, building applications, exploring artificial intelligence and developing technology-driven solutions.",
  ],
  quote:
    "I believe that Africa has enormous untapped technological potential, and I want to contribute to that future through engineering, creativity, research and entrepreneurship.",
  highlights: [
    { icon: "map-pin", label: "Based in Cameroon" },
    { icon: "graduation-cap", label: "B.Tech. Software Engineering — Final Stage" },
    { icon: "book-open", label: "Master's Student · College of Technology" },
    { icon: "brain-circuit", label: "AI & Software Development Enthusiast" },
    { icon: "rocket", label: "Aspiring Technology Entrepreneur" },
  ],
  aboutPhoto: {
    src: "/images/profile-about.webp",
    alt: "Secondary portrait of Eric Banven used in the About section",
  },
} as const;

export const education = [
  {
    id: "bachelors",
    institution: "University of Buea",
    location: "Cameroon",
    credential: "Bachelor of Technology (B.Tech.) in Software Engineering",
    status: "Awaiting Completion / Graduation",
    statusTone: "done" as const,
    note: "Foundations in software engineering, application development, databases and emerging technologies. Reported GPA: 3.40.",
    icon: "graduation-cap",
  },
  {
    id: "masters",
    institution: "College of Technology, University of Buea",
    location: "Cameroon",
    credential: "Master's Programme in Software Engineering",
    status: "Currently Enrolled",
    statusTone: "active" as const,
    note: "Continuing academic and research work in software engineering at the College of Technology.",
    icon: "book-open",
  },
];

export type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  accent: "electric" | "violet" | "cyan";
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    icon: "code-2",
    accent: "electric",
    skills: ["Python", "JavaScript", "Java", "C++"],
  },
  {
    id: "web",
    label: "Web Development",
    icon: "globe",
    accent: "violet",
    skills: ["HTML", "CSS", "Tailwind CSS", "Node.js", "Express.js", "Flask"],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    accent: "cyan",
    skills: ["SQLite", "MongoDB"],
  },
  {
    id: "data-ai",
    label: "Data & Artificial Intelligence",
    icon: "brain-circuit",
    accent: "electric",
    skills: [
      "Data Analytics",
      "Machine Learning Fundamentals",
      "Predictive Modelling",
      "AI API Integration",
      "Google Gemini API",
      "OpenAI API",
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    icon: "wrench",
    accent: "violet",
    skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Figma", "LabVIEW"],
  },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  fullName: string;
  category: string;
  flagship?: boolean;
  description: string;
  contribution?: string[];
  features?: string[];
  models?: string[];
  tech: string[];
  /** Verified public repository URL — left null when none exists (shows "Repository coming soon"). */
  repoUrl: string | null;
  /** Verified live demo URL — none of the projects have one yet. */
  liveUrl: string | null;
  visual:
    | "cultia"
    | "tryons"
    | "utrust"
    | "mediscan"
    | "analytics"
    | "labview";
  image?: { src: string; alt: string };
  disclaimer?: string;
};

export const projects: Project[] = [
  {
    id: "cultia",
    index: "01",
    name: "CULTIA",
    fullName: "CULTIA — Cultural Heritage & AI Integration Platform",
    category: "Flagship · AI × Cultural Preservation",
    flagship: true,
    description:
      "An AI-powered cultural learning and preservation platform designed to promote, document and preserve African cultural heritage, with a particular focus on Cameroon — its ethnic groups, traditions, indigenous stories and local languages.",
    features: [
      "AI-powered cultural chatbot",
      "Exploration of Cameroon's ethnic groups",
      "Cultural stories & heritage learning",
      "Interactive quizzes",
      "User learning progress",
      "Achievements & rewards",
      "Administrative dashboard",
      "AI integration — Google Gemini & OpenAI",
    ],
    tech: [
      "Python",
      "Flask",
      "JavaScript",
      "HTML",
      "CSS",
      "SQLite",
      "Google Gemini API",
      "OpenAI API",
    ],
    repoUrl: null,
    liveUrl: null,
    visual: "cultia",
    image: {
      src: "/images/projects/cultia-heritage.webp",
      alt: "Hand-carved African wooden caryatid stool, an example of the heritage artefacts CULTIA documents",
    },
  },
  {
    id: "tryons",
    index: "02",
    name: "TryOns / Tryon Space",
    fullName: "TryOns — AR E-Commerce Experience",
    category: "AR E-Commerce",
    description:
      "An augmented-reality e-commerce experience designed to make online shopping more interactive by allowing users to virtually preview products before buying.",
    contribution: [
      "Frontend interface development",
      "Responsive dashboard",
      "AR preview interface",
      "Authentication interface",
      "Backend integration",
    ],
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    repoUrl: null,
    liveUrl: null,
    visual: "tryons",
    image: {
      src: "/images/projects/tryons-concept.webp",
      alt: "Smartphones showing a virtual clothing try-on concept that inspired the TryOns interface",
    },
  },
  {
    id: "utrust",
    index: "03",
    name: "U-Trust",
    fullName: "U-Trust — Personal Finance Technology",
    category: "Personal Finance Technology",
    description:
      "A personal expense-tracking application designed to help individuals monitor spending, organize expenses and improve financial awareness, with an FCFA-oriented financial experience.",
    features: [
      "Expense tracking",
      "Financial organization",
      "Personal budgeting concept",
      "FCFA-oriented experience",
    ],
    tech: ["JavaScript", "Node.js", "Express.js", "SQLite"],
    repoUrl: null,
    liveUrl: null,
    visual: "utrust",
  },
  {
    id: "mediscan",
    index: "04",
    name: "MediScan AI",
    fullName: "MediScan AI — AI Health Information Concept",
    category: "AI × Health Technology",
    description:
      "An AI-driven health information concept that explores how artificial intelligence can help users understand symptoms and access preliminary health information.",
    disclaimer:
      "Exploratory project — not a clinically validated diagnostic system.",
    tech: ["Python", "AI API Integration", "JavaScript", "HTML", "CSS"],
    repoUrl: null,
    liveUrl: null,
    visual: "mediscan",
  },
  {
    id: "analytics",
    index: "05",
    name: "Youth Unemployment Analysis",
    fullName:
      "Youth Unemployment in Cameroon's Informal Sector: A Data-Driven Analysis and Forecast",
    category: "Data Analytics × Social Impact",
    description:
      "A data analytics and predictive modelling project examining youth unemployment patterns in Cameroon, particularly within the informal sector — exploring employment patterns, educational background, digital skills, income patterns and unemployment duration.",
    features: [
      "Employment pattern analysis",
      "Educational background & digital skills data",
      "Income pattern exploration",
      "Unemployment duration modelling",
      "Predictive modelling & forecasting",
    ],
    models: ["Linear Regression", "Random Forest Regression"],
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Statistical Modelling",
    ],
    repoUrl: null,
    liveUrl: null,
    visual: "analytics",
  },
  {
    id: "labview",
    index: "06",
    name: "LabVIEW Calculator & Quadratic Solver",
    fullName: "LabVIEW Calculator and Quadratic Solver",
    category: "Engineering · Desktop Application",
    description:
      "A desktop calculator and quadratic equation solver developed using LabVIEW, featuring arithmetic operations, memory functions and quadratic root calculations.",
    features: [
      "Arithmetic operations",
      "Memory functions",
      "Quadratic root calculations",
      "Graphical front-panel interface",
    ],
    tech: ["LabVIEW 2023 Community Edition"],
    repoUrl: null,
    liveUrl: null,
    visual: "labview",
  },
];

export const experience = {
  company: "Digimark Consulting SARL",
  position: "Software Development Intern",
  description:
    "Participated in practical software development activities, gaining experience in programming, web technologies, application development and database integration.",
  /** Two separate internship periods — NOT continuous employment between them. */
  periods: [
    { id: "2024", period: "July – September 2024", label: "Internship — Period 1" },
    { id: "2025", period: "July – September 2025", label: "Internship — Period 2" },
  ],
  highlights: [
    "C++ programming",
    "HTML, CSS & JavaScript",
    "Introduction to Node.js",
    "Java desktop interface development",
    "Python authentication systems",
    "SQLite database integration",
    "Password hashing",
    "Frontend development",
    "Backend integration",
    "Responsive interface design",
  ],
  finalProject: {
    name: "TryOns / Tryon Space",
    note: "Final internship project (2025) — AR e-commerce website.",
  },
};

export const research = {
  title: "Curiosity Beyond Development.",
  description:
    "My interests reach past writing code — into how data, AI and thoughtful engineering can explain real problems and open new possibilities for African communities.",
  interests: [
    { icon: "brain-circuit", label: "Artificial Intelligence" },
    { icon: "sparkles", label: "Machine Learning" },
    { icon: "bar-chart-3", label: "Data Analytics" },
    { icon: "trending-up", label: "Predictive Modelling" },
    { icon: "landmark", label: "African Cultural Heritage" },
    { icon: "cpu", label: "Digital Transformation" },
    { icon: "network", label: "Software Architecture" },
    { icon: "rocket", label: "Technology Entrepreneurship" },
  ],
  featured: {
    kicker: "Research in practice",
    title:
      "Youth Unemployment in Cameroon's Informal Sector: A Data-Driven Analysis and Forecast",
    summary:
      "An independent data analytics project applying statistics and machine learning to a real societal challenge — examining employment patterns, education, digital skills, income and unemployment duration, then building predictive models to forecast trends.",
    approaches: [
      "Employment pattern analysis",
      "Educational background & digital skills",
      "Income pattern exploration",
      "Unemployment duration",
      "Predictive modelling & forecasting",
    ],
    models: ["Linear Regression", "Random Forest Regression"],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    note: "Independent academic project — not a published paper.",
  },
};

export const milestones = [
  {
    id: "m1",
    icon: "graduation-cap",
    title: "B.Tech. studies in Software Engineering",
    detail: "University of Buea — coursework completed, awaiting graduation (reported GPA 3.40).",
  },
  {
    id: "m2",
    icon: "book-open",
    title: "Enrolled in a Master's programme",
    detail: "College of Technology, University of Buea — Software Engineering.",
  },
  {
    id: "m3",
    icon: "briefcase",
    title: "Two internship periods completed",
    detail: "Software Development Intern at Digimark Consulting SARL (2024 & 2025).",
  },
  {
    id: "m4",
    icon: "layers",
    title: "Multiple projects developed",
    detail: "Software and technology project concepts taken from idea to working build.",
  },
  {
    id: "m5",
    icon: "landmark",
    title: "AI-powered cultural platform built",
    detail:
      "CULTIA — cultural preservation platform integrating Google Gemini & OpenAI APIs.",
  },
  {
    id: "m6",
    icon: "bar-chart-3",
    title: "Data-driven research explored",
    detail: "Youth unemployment analysis & forecasting for Cameroon's informal sector.",
  },
];

export const vision = {
  title: "Still Building. Still Becoming.",
  description:
    "A long-term view — ambitious, but grounded in steady work rather than hype.",
  ambitions: [
    {
      index: "01",
      title: "Advanced Software Engineering",
      detail:
        "Develop deeper expertise in software architecture, scalable applications and modern engineering practices.",
      icon: "code-2",
    },
    {
      index: "02",
      title: "Artificial Intelligence",
      detail:
        "Explore AI research, machine learning and practical AI applications that solve real problems.",
      icon: "brain-circuit",
    },
    {
      index: "03",
      title: "African Technology Innovation",
      detail:
        "Build technology products that address meaningful problems in African communities.",
      icon: "globe",
    },
    {
      index: "04",
      title: "International Exposure",
      detail:
        "Participate in international fellowships, scholarships, research programmes, technology conferences and open-source initiatives.",
      icon: "plane",
    },
    {
      index: "05",
      title: "Entrepreneurship",
      detail:
        "Develop sustainable technology businesses and products with real-world impact.",
      icon: "rocket",
    },
    {
      index: "06",
      title: "Open Source",
      detail:
        "Contribute to global developer communities and collaborate with engineers around the world.",
      icon: "git-branch",
    },
  ],
};

export const githubSection = {
  title: "Code. Collaborate. Contribute.",
  description:
    "My GitHub is where experiments, coursework and project builds live. I'm growing my open-source footprint one commit at a time.",
  username: "BANVEN-subzero",
  profileUrl: "https://github.com/BANVEN-subzero",
  interests: [
    "Open-source tooling",
    "AI & ML libraries",
    "Data science notebooks",
    "Web standards",
    "Developer education",
    "African tech communities",
  ],
};

export const contact = {
  title: "Have an idea worth building?",
  description:
    "I'm always interested in meaningful collaborations, software development opportunities, research initiatives, open-source contributions and conversations about technology.",
  /** The destination address itself comes from PORTFOLIO_EMAIL (server-side). */
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "vision", label: "Vision" },
  { id: "contact", label: "Contact" },
] as const;

/** Verified numbers only — rendered with animated counters. */
export const stats = [
  { value: 6, suffix: "", label: "Projects built & in progress" },
  { value: 2, suffix: "", label: "Internship periods completed" },
  { value: 25, suffix: "+", label: "Technologies & tools explored" },
];
