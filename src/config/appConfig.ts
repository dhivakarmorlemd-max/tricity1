export interface AppConfig {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  hackathonBadge: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  features: {
    enableDemoMode: boolean;
    enableAIIntegration: boolean;
    enableTeacherVerification: boolean;
    enableCommunitySharing: boolean;
  };
  academic: {
    branches: { id: string; name: string; code: string }[];
    semesters: { id: number; name: string; year: string }[];
  };
  careerRoles: {
    id: string;
    title: string;
    description: string;
    demandLevel: 'High' | 'Very High' | 'Moderate';
    avgSalaryRange: string;
    icon: string;
    topSkills: string[];
  }[];
  skillCategories: {
    id: string;
    name: string;
    description: string;
    icon: string;
  }[];
}

export const appConfig: AppConfig = {
  name: "CareerPilot AI",
  shortName: "CareerPilot",
  tagline: "Smart Student Career & Placement Navigator",
  subTagline: "Personalized year-wise skill roadmaps, project recommendations, mentor feedback, and placement readiness tracking for B.Tech students.",
  hackathonBadge: "University Production Edition",
  branding: {
    primaryColor: "teal",
    secondaryColor: "slate",
    accentColor: "indigo",
  },
  features: {
    enableDemoMode: true,
    enableAIIntegration: true,
    enableTeacherVerification: true,
    enableCommunitySharing: false,
  },
  academic: {
    branches: [
      { id: "cse", name: "Computer Science & Engineering", code: "CSE" },
      { id: "it", name: "Information Technology", code: "IT" },
      { id: "ai_ml", name: "Artificial Intelligence & Machine Learning", code: "AI & ML" },
      { id: "ece", name: "Electronics & Communication", code: "ECE" },
      { id: "ds", name: "Data Science & Analytics", code: "DS" },
      { id: "me", name: "Mechanical Engineering", code: "ME" },
      { id: "ce", name: "Civil Engineering", code: "CE" },
    ],
    semesters: [
      { id: 1, name: "Semester 1", year: "1st Year" },
      { id: 2, name: "Semester 2", year: "1st Year" },
      { id: 3, name: "Semester 3", year: "2nd Year" },
      { id: 4, name: "Semester 4", year: "2nd Year" },
      { id: 5, name: "Semester 5", year: "3rd Year" },
      { id: 6, name: "Semester 6", year: "3rd Year" },
      { id: 7, name: "Semester 7", year: "4th Year" },
      { id: 8, name: "Semester 8", year: "4th Year" },
    ],
  },
  careerRoles: [
    {
      id: "fullstack_dev",
      title: "Full Stack Software Developer",
      description: "Build end-to-end web applications, frontend interfaces, APIs, and scalable databases.",
      demandLevel: "Very High",
      avgSalaryRange: "₹8 LPA - ₹24 LPA",
      icon: "Code",
      topSkills: ["React", "Node.js", "TypeScript", "SQL/PostgreSQL", "Data Structures"],
    },
    {
      id: "java_backend",
      title: "Java Enterprise Developer",
      description: "Design high-performance enterprise systems, Spring Boot microservices, and secure backend APIs.",
      demandLevel: "Very High",
      avgSalaryRange: "₹7 LPA - ₹20 LPA",
      icon: "Server",
      topSkills: ["Java", "Spring Boot", "OOP Concepts", "PostgreSQL/MySQL", "System Design"],
    },
    {
      id: "frontend_dev",
      title: "Frontend Engineer (React/Web)",
      description: "Craft responsive, sleek web applications, master component state, performance & UI engineering.",
      demandLevel: "High",
      avgSalaryRange: "₹6 LPA - ₹18 LPA",
      icon: "Layout",
      topSkills: ["JavaScript/TypeScript", "React", "Tailwind CSS", "HTML/CSS", "Git & GitHub"],
    },
    {
      id: "data_analyst",
      title: "Data Analyst & Business Intelligence",
      description: "Transform complex raw data into actionable insights, dashboards, statistical models, and SQL pipelines.",
      demandLevel: "High",
      avgSalaryRange: "₹6 LPA - ₹16 LPA",
      icon: "BarChart3",
      topSkills: ["Python", "SQL", "Pandas", "Power BI / Tableau", "Statistics & Aptitude"],
    },
    {
      id: "ai_ml_engineer",
      title: "AI & Machine Learning Engineer",
      description: "Develop ML algorithms, predictive models, neural networks, and integrate GenAI capabilities.",
      demandLevel: "Very High",
      avgSalaryRange: "₹10 LPA - ₹30 LPA",
      icon: "Cpu",
      topSkills: ["Python", "PyTorch / TensorFlow", "Linear Algebra", "Data Processing", "MLOps"],
    },
    {
      id: "cloud_devops",
      title: "Cloud & DevOps Engineer",
      description: "Automate deployment pipelines, manage Docker containers, cloud infrastructure, and CI/CD.",
      demandLevel: "Very High",
      avgSalaryRange: "₹8 LPA - ₹22 LPA",
      icon: "Cloud",
      topSkills: ["Linux", "Docker & K8s", "AWS / Azure", "CI/CD Pipelines", "Bash Scripting"],
    },
  ],
  skillCategories: [
    { id: "programming", name: "Programming Fundamentals", description: "Syntax, logic building, data types, control flow", icon: "Code2" },
    { id: "dsa", name: "Data Structures & Algorithms", description: "Arrays, Trees, Graphs, Sorting, Dynamic Programming", icon: "Binary" },
    { id: "web_app", name: "Web & Mobile Development", description: "Frontend frameworks, REST APIs, Backend servers", icon: "Globe" },
    { id: "databases", name: "Databases & Storage", description: "Relational SQL, NoSQL, ORM, indexing & optimization", icon: "Database" },
    { id: "core_cs", name: "Core CS Fundamentals", description: "Operating Systems, DBMS, Networks, OOP, System Design", icon: "Cpu" },
    { id: "aptitude", name: "Aptitude & Quantitative", description: "Numerical ability, logical reasoning, verbal speed", icon: "Calculator" },
    { id: "communication", name: "Communication & HR", description: "Technical articulation, interview speaking, resume storytelling", icon: "MessageSquare" },
    { id: "practical_projects", name: "Projects & Practical Experience", description: "Git workflow, open source, full stack project deployments", icon: "FolderGit2" },
  ],
};
