import { User, StudentProfile, StudentSkill, RoadmapTask, Project, Assessment, JobApplication, NotificationItem, HelpRequest, TeacherAssignment, ProjectSubmission } from '../../types';

export const mockUsers: User[] = [
  {
    id: "user_student_1",
    email: "aarav.student@edutech.edu",
    full_name: "Aarav Sharma",
    role: "student",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    created_at: "2026-01-15T09:00:00Z"
  },
  {
    id: "user_student_2",
    email: "priya.patel@edutech.edu",
    full_name: "Priya Patel",
    role: "student",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    created_at: "2026-02-01T10:30:00Z"
  },
  {
    id: "user_student_3",
    email: "rohan.gupta@edutech.edu",
    full_name: "Rohan Gupta",
    role: "student",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    created_at: "2026-02-10T14:15:00Z"
  },
  {
    id: "user_teacher_1",
    email: "vikram.sethi@edutech.edu",
    full_name: "Dr. Vikram Sethi",
    role: "teacher",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
    created_at: "2025-08-01T08:00:00Z"
  },
  {
    id: "user_admin_1",
    email: "admin@edutech.edu",
    full_name: "Platform Administrator",
    role: "admin",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250",
    created_at: "2025-01-01T00:00:00Z"
  }
];

export const mockStudentProfiles: Record<string, StudentProfile> = {
  "user_student_1": {
    user_id: "user_student_1",
    branch: "cse",
    current_semester: 5,
    target_role_id: "fullstack_dev",
    skill_level: "intermediate",
    weekly_hours: 15,
    bio: "Passionate 3rd year CSE student building full-stack web applications and practicing DSA daily for upcoming placement drives.",
    github_url: "https://github.com/aaravsharma-dev",
    linkedin_url: "https://linkedin.com/in/aaravsharma-tech",
    portfolio_url: "https://aaravsharma.dev",
    resume_url: "https://aaravsharma.dev/resume.pdf",
    placement_readiness_score: 74,
    onboarded: true
  },
  "user_student_2": {
    user_id: "user_student_2",
    branch: "ai_ml",
    current_semester: 6,
    target_role_id: "ai_ml_engineer",
    skill_level: "advanced",
    weekly_hours: 20,
    bio: "Focusing on machine learning pipelines, PyTorch, and NLP models for research and industry applications.",
    github_url: "https://github.com/priyapatel-ai",
    linkedin_url: "https://linkedin.com/in/priyapatel-ml",
    portfolio_url: "https://priyapatel.ai",
    resume_url: "https://priyapatel.ai/resume.pdf",
    placement_readiness_score: 82,
    onboarded: true
  },
  "user_student_3": {
    user_id: "user_student_3",
    branch: "ece",
    current_semester: 4,
    target_role_id: "java_backend",
    skill_level: "beginner",
    weekly_hours: 10,
    bio: "Transitioning from ECE core to Java backend engineering. Learning Object-Oriented Programming and SQL.",
    github_url: "https://github.com/rohangupta-code",
    linkedin_url: "https://linkedin.com/in/rohangupta-eng",
    portfolio_url: "",
    resume_url: "",
    placement_readiness_score: 48,
    onboarded: true
  }
};

export const mockSkillsList: StudentSkill[] = [
  { id: "sk_1", student_id: "user_student_1", skill_id: "cpp", skill_name: "C++ & STL", category: "Programming Fundamentals", self_level: 4, assessment_score: 85, teacher_verified: true, teacher_name: "Dr. Vikram Sethi", updated_at: "2026-02-15" },
  { id: "sk_2", student_id: "user_student_1", skill_id: "dsa", skill_name: "Data Structures & Algorithms", category: "Data Structures & Algorithms", self_level: 4, assessment_score: 78, teacher_verified: true, teacher_name: "Dr. Vikram Sethi", updated_at: "2026-03-01" },
  { id: "sk_3", student_id: "user_student_1", skill_id: "react", skill_name: "React.js & TypeScript", category: "Web & Mobile Development", self_level: 4, assessment_score: 90, teacher_verified: true, teacher_name: "Dr. Vikram Sethi", updated_at: "2026-03-10" },
  { id: "sk_4", student_id: "user_student_1", skill_id: "node", skill_name: "Node.js & Express APIs", category: "Web & Mobile Development", self_level: 3, assessment_score: 70, teacher_verified: false, updated_at: "2026-03-12" },
  { id: "sk_5", student_id: "user_student_1", skill_id: "sql", skill_name: "PostgreSQL & SQL Queries", category: "Databases & Storage", self_level: 3, assessment_score: 75, teacher_verified: false, updated_at: "2026-03-15" },
  { id: "sk_6", student_id: "user_student_1", skill_id: "dbms", skill_name: "Database Management Systems", category: "Core CS Fundamentals", self_level: 3, assessment_score: 80, teacher_verified: true, teacher_name: "Dr. Vikram Sethi", updated_at: "2026-02-20" },
  { id: "sk_7", student_id: "user_student_1", skill_id: "os", skill_name: "Operating Systems & Linux", category: "Core CS Fundamentals", self_level: 3, assessment_score: 65, teacher_verified: false, updated_at: "2026-03-05" },
  { id: "sk_8", student_id: "user_student_1", skill_id: "aptitude", skill_name: "Quantitative & Aptitude", category: "Aptitude & Quantitative", self_level: 3, assessment_score: 60, teacher_verified: false, updated_at: "2026-03-18" },
  { id: "sk_9", student_id: "user_student_1", skill_id: "comm", skill_name: "Technical Communication", category: "Communication & HR", self_level: 4, assessment_score: 85, teacher_verified: true, teacher_name: "Dr. Vikram Sethi", updated_at: "2026-03-22" },
  { id: "sk_10", student_id: "user_student_1", skill_id: "git", skill_name: "Git & Version Control", category: "Projects & Practical Experience", self_level: 5, assessment_score: 95, teacher_verified: true, teacher_name: "Dr. Vikram Sethi", updated_at: "2026-01-25" },
];

export const mockRoadmapTasks: RoadmapTask[] = [
  // Year 1 / Semester 1 & 2
  {
    id: "rt_101",
    year: 1,
    semester: 1,
    month: 1,
    week: 1,
    title: "Programming Fundamentals & C/C++ Syntax",
    description: "Master variables, loops, functions, pointers, memory allocation, and basic problem solving.",
    estimated_hours: 12,
    difficulty: "Easy",
    prerequisite_skills: [],
    learning_resource_url: "https://en.cppreference.com/w/",
    category: "Programming Fundamentals",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_102",
    year: 1,
    semester: 1,
    month: 2,
    week: 5,
    title: "Version Control with Git & GitHub",
    description: "Learn repository initialization, committing, branching, PRs, and GitHub profile setup.",
    estimated_hours: 8,
    difficulty: "Easy",
    prerequisite_skills: ["rt_101"],
    learning_resource_url: "https://docs.github.com/en/get-started",
    category: "Projects & Practical Experience",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_103",
    year: 1,
    semester: 2,
    month: 4,
    week: 13,
    title: "Data Structures Foundations (Arrays, Strings, Stacks & Queues)",
    description: "Implement linear data structures, analyze time complexity Big-O, solve 30 LeetCode easy problems.",
    estimated_hours: 20,
    difficulty: "Medium",
    prerequisite_skills: ["rt_101"],
    learning_resource_url: "https://geeksforgeeks.org/data-structures/",
    category: "Data Structures & Algorithms",
    target_role_id: "fullstack_dev"
  },
  
  // Year 2 / Semester 3 & 4
  {
    id: "rt_201",
    year: 2,
    semester: 3,
    month: 7,
    week: 25,
    title: "Object-Oriented Programming (OOP) & Java/C++",
    description: "Encapsulation, Inheritance, Polymorphism, Abstraction, Design Patterns, and Interfaces.",
    estimated_hours: 15,
    difficulty: "Medium",
    prerequisite_skills: ["rt_101"],
    learning_resource_url: "https://docs.oracle.com/javase/tutorial/java/concepts/",
    category: "Programming Fundamentals",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_202",
    year: 2,
    semester: 3,
    month: 8,
    week: 29,
    title: "Relational Databases & SQL Masterclass",
    description: "Database normalization, DDL/DML, complex JOINs, group by, transactions, and indexing.",
    estimated_hours: 16,
    difficulty: "Medium",
    prerequisite_skills: ["rt_201"],
    learning_resource_url: "https://postgresqltutorial.com",
    category: "Databases & Storage",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_203",
    year: 2,
    semester: 4,
    month: 10,
    week: 37,
    title: "Modern Web Development Foundations (HTML, CSS, Modern JS)",
    description: "Responsive layouts with Flexbox/Grid, ES6+ JavaScript, Async/Await, Fetch API, DOM manipulation.",
    estimated_hours: 18,
    difficulty: "Easy",
    prerequisite_skills: ["rt_102"],
    learning_resource_url: "https://developer.mozilla.org",
    category: "Web & Mobile Development",
    target_role_id: "fullstack_dev"
  },

  // Year 3 / Semester 5 & 6 (Current Semester for Aarav)
  {
    id: "rt_301",
    year: 3,
    semester: 5,
    month: 1,
    week: 1,
    title: "Frontend Engineering with React.js & TypeScript",
    description: "Components, Props, Hooks (useState, useEffect, useMemo), State Management, TypeScript interfaces, Tailwind CSS.",
    estimated_hours: 25,
    difficulty: "Medium",
    prerequisite_skills: ["rt_203"],
    learning_resource_url: "https://react.dev",
    category: "Web & Mobile Development",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_302",
    year: 3,
    semester: 5,
    month: 2,
    week: 5,
    title: "Backend Development with Node.js, Express & REST APIs",
    description: "Building scalable web servers, middleware routing, JWT authentication, error handling, ORMs (Prisma/Kysely).",
    estimated_hours: 22,
    difficulty: "Medium",
    prerequisite_skills: ["rt_202", "rt_203"],
    learning_resource_url: "https://nodejs.org/en/docs/",
    category: "Web & Mobile Development",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_303",
    year: 3,
    semester: 5,
    month: 3,
    week: 9,
    title: "Advanced Data Structures & Algorithms (Trees, Graphs, DP)",
    description: "Binary Search Trees, Heaps, Graph BFS/DFS, Dijkstra, Dynamic Programming paradigms. Target 100+ LeetCode problems.",
    estimated_hours: 30,
    difficulty: "Hard",
    prerequisite_skills: ["rt_103"],
    learning_resource_url: "https://leetcode.com",
    category: "Data Structures & Algorithms",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_304",
    year: 3,
    semester: 6,
    month: 4,
    week: 13,
    title: "Full-Stack Capstone Project & Deployment",
    description: "Design & build an end-to-end web product, connect CI/CD pipeline, deploy on Vercel/Render, write complete README.",
    estimated_hours: 35,
    difficulty: "Hard",
    prerequisite_skills: ["rt_301", "rt_302"],
    learning_resource_url: "https://vercel.com/docs",
    category: "Projects & Practical Experience",
    target_role_id: "fullstack_dev"
  },

  // Year 4 / Semester 7 & 8
  {
    id: "rt_401",
    year: 4,
    semester: 7,
    month: 1,
    week: 1,
    title: "System Design & Scalability Basics",
    description: "Load balancers, Caching (Redis), Database Sharding, Message Queues (RabbitMQ/Kafka), API Gateway design.",
    estimated_hours: 20,
    difficulty: "Hard",
    prerequisite_skills: ["rt_302", "rt_304"],
    learning_resource_url: "https://github.com/donnemartin/system-design-primer",
    category: "Core CS Fundamentals",
    target_role_id: "fullstack_dev"
  },
  {
    id: "rt_402",
    year: 4,
    semester: 7,
    month: 2,
    week: 5,
    title: "Placement Preparation: Aptitude, Coding Speed & Mock Interviews",
    description: "Timed aptitude tests, company-wise coding questions, live peer mock interviews, HR story crafting.",
    estimated_hours: 25,
    difficulty: "Medium",
    prerequisite_skills: ["rt_303"],
    learning_resource_url: "https://indiabix.com",
    category: "Aptitude & Quantitative",
    target_role_id: "fullstack_dev"
  }
];

export const mockProjects: Project[] = [
  {
    id: "proj_1",
    title: "Smart Task & Study Tracker Web App",
    category: "Web Development",
    target_role_id: "fullstack_dev",
    difficulty: "Beginner",
    description: "Build a responsive student task management dashboard with semester categories, priority flags, and local storage persistence.",
    problem_statement: "Students struggle to track daily study tasks across multiple subjects without clear priority levels.",
    why_useful: "Teaches core React state management, component architecture, form handling, and local storage CRUD operations.",
    required_skills: ["HTML/CSS", "JavaScript/TypeScript", "React"],
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    implementation_milestones: [
      "Set up Vite + React + TypeScript project with Tailwind CSS",
      "Build Task List component with add, edit, toggle, and filter functionality",
      "Implement persistent local storage synchronization",
      "Add progress bar indicator and category badges"
    ],
    expected_outcome: "A polished, responsive single-page web app ready for GitHub hosting.",
    testing_checklist: [
      "Task creation works with non-empty input validation",
      "Task state persists upon browser reload",
      "Filters for Completed/Pending work accurately"
    ]
  },
  {
    id: "proj_2",
    title: "DevConnect — Developer Portfolio & Peer Review Platform",
    category: "Full Stack",
    target_role_id: "fullstack_dev",
    difficulty: "Intermediate",
    description: "Full-stack application allowing engineering students to showcase projects, receive peer feedback, and rate technical skills.",
    problem_statement: "Students lack a dedicated space to showcase engineering projects with verified mentor and peer reviews.",
    why_useful: "Demonstrates full-stack API integration, database relationship modeling, user authentication, and secure CRUD operations.",
    required_skills: ["React", "Node.js/Express", "PostgreSQL/Supabase", "Git"],
    tech_stack: ["React", "Node.js", "Express", "Supabase PostgreSQL", "Tailwind CSS"],
    implementation_milestones: [
      "Design database schema for profiles, projects, and comments",
      "Implement JWT / Supabase authentication with user roles",
      "Create RESTful API endpoints for project CRUD operations",
      "Build frontend dashboard with search, tags, and project submission forms"
    ],
    expected_outcome: "Deployable full-stack application with live database persistence and deployment URL.",
    testing_checklist: [
      "Unauthenticated users cannot create or modify projects",
      "Database foreign key constraints prevent orphaned comments",
      "API returns 400 validation error on malformed project payload"
    ]
  },
  {
    id: "proj_3",
    title: "Microservices E-Commerce API Gateway with Rate Limiting",
    category: "Backend & Systems",
    target_role_id: "java_backend",
    difficulty: "Advanced",
    description: "Enterprise grade Java Spring Boot microservice suite with API gateway routing, Resilience4j circuit breakers, and Redis rate limiting.",
    problem_statement: "High-traffic backend services require resilience against cascading failures and rate-limiting to prevent DDoS attack vector overload.",
    why_useful: "Prepares candidates for tier-1 tech interviews by proving mastery of distributed systems, concurrency, and microservice resilience.",
    required_skills: ["Java", "Spring Boot", "Docker", "Redis", "System Design"],
    tech_stack: ["Java 21", "Spring Cloud Gateway", "Redis", "Docker Compose", "PostgreSQL"],
    implementation_milestones: [
      "Create Auth, Catalog, and Order microservices with Spring Boot",
      "Configure Spring Cloud Gateway with Token Bucket rate limiter in Redis",
      "Implement Circuit Breaker fallback pattern using Resilience4j",
      "Containerize microservices into unified Docker Compose deployment"
    ],
    expected_outcome: "Containerized backend codebase with comprehensive integration test suite and OpenAPI documentation.",
    testing_checklist: [
      "Requests exceeding 10 req/sec receive HTTP 429 Too Many Requests",
      "Service failure triggers circuit breaker fallback response in under 200ms",
      "Docker compose up initializes all services cleanly without startup race conditions"
    ]
  }
];

export const mockSubmissions: ProjectSubmission[] = [
  {
    id: "sub_1",
    project_id: "proj_2",
    project_title: "DevConnect — Developer Portfolio & Peer Review Platform",
    student_id: "user_student_1",
    student_name: "Aarav Sharma",
    github_repo_url: "https://github.com/aaravsharma-dev/devconnect-fullstack",
    live_demo_url: "https://devconnect-aarav.vercel.app",
    notes: "Implemented full-stack architecture with React, Supabase PostgreSQL, and RLS policies. Added live search and feedback tags!",
    status: "approved",
    teacher_feedback: "Excellent work, Aarav! The database schema is cleanly normalized, and the RLS security policies are properly configured. Verified!",
    submitted_at: "2026-03-20T14:30:00Z",
    reviewed_at: "2026-03-22T10:15:00Z"
  }
];

export const mockAssessments: Assessment[] = [
  {
    id: "ass_dsa",
    title: "Data Structures & Algorithms Master Assessment",
    category: "Data Structures & Algorithms",
    target_role_id: "fullstack_dev",
    duration_minutes: 25,
    total_questions: 5,
    passing_score: 75,
    questions: [
      {
        id: "q_dsa_1",
        assessment_id: "ass_dsa",
        question_text: "What is the average and worst-case time complexity of searching an element in a balanced Binary Search Tree (BST)?",
        options: ["O(1) and O(N)", "O(log N) and O(log N)", "O(log N) and O(N)", "O(N) and O(N log N)"],
        correct_option_index: 1,
        explanation: "In a balanced BST (like AVL or Red-Black Tree), the height of the tree is bounded by O(log N). Thus, search operations take O(log N) in both average and worst case.",
        skill_id: "dsa"
      },
      {
        id: "q_dsa_2",
        assessment_id: "ass_dsa",
        question_text: "Which data structure is fundamentally used for Breadth-First Search (BFS) level-order graph traversal?",
        options: ["Stack", "Queue", "Priority Queue (Heap)", "Hash Map"],
        correct_option_index: 1,
        explanation: "BFS uses a Queue (First In, First Out) to explore graph nodes level by level.",
        skill_id: "dsa"
      },
      {
        id: "q_dsa_3",
        assessment_id: "ass_dsa",
        question_text: "What is the worst-case time complexity of QuickSort when pivot selection is consistently unbalanced?",
        options: ["O(N log N)", "O(N^2)", "O(N)", "O(2^N)"],
        correct_option_index: 1,
        explanation: "QuickSort degenerates to O(N^2) time complexity when the chosen pivot is consistently the smallest or largest element.",
        skill_id: "dsa"
      },
      {
        id: "q_dsa_4",
        assessment_id: "ass_dsa",
        question_text: "In Dynamic Programming, what problem property allows us to store subproblem results in a lookup table?",
        options: [
          "Greedy Choice Property",
          "Overlapping Subproblems & Optimal Substructure",
          "Divide and Conquer Partitioning",
          "Randomized Pivot Selection"
        ],
        correct_option_index: 1,
        explanation: "Dynamic Programming applies when a problem exhibits Overlapping Subproblems and Optimal Substructure, enabling memoization or tabulation.",
        skill_id: "dsa"
      },
      {
        id: "q_dsa_5",
        assessment_id: "ass_dsa",
        question_text: "Which data structure provides O(1) average time complexity for insert, delete, and lookup operations?",
        options: ["Balanced BST", "Hash Table (Hash Map)", "Max Heap", "Sorted Array"],
        correct_option_index: 1,
        explanation: "Hash Tables compute array indices using a hash function, yielding O(1) average time complexity for basic operations.",
        skill_id: "dsa"
      }
    ]
  },
  {
    id: "ass_fullstack",
    title: "Full Stack Web & Systems Architecture Master Assessment",
    category: "Web & Mobile Development",
    target_role_id: "fullstack_dev",
    duration_minutes: 20,
    total_questions: 5,
    passing_score: 75,
    questions: [
      {
        id: "q_fs_1",
        assessment_id: "ass_fullstack",
        question_text: "In React 19, what is the primary purpose of the `useMemo` hook?",
        options: [
          "To handle async side effects after DOM mutation",
          "To memoize expensive calculation results between component re-renders",
          "To directly mutate DOM nodes without state triggers",
          "To bind external WebSocket event listeners"
        ],
        correct_option_index: 1,
        explanation: "useMemo caches the result of a calculation between re-renders unless its declared dependencies change.",
        skill_id: "react"
      },
      {
        id: "q_fs_2",
        assessment_id: "ass_fullstack",
        question_text: "How does the Node.js Non-Blocking Event Loop handle asynchronous I/O operations?",
        options: [
          "By spawning a new OS thread for every single HTTP connection",
          "By offloading I/O to libuv worker pool threads and executing callbacks on the main single thread",
          "By halting JavaScript execution until disk read completes",
          "By compiling JavaScript directly into C++ binaries at runtime"
        ],
        correct_option_index: 1,
        explanation: "Node.js uses a single-threaded event loop powered by libuv, which delegates heavy I/O to system worker threads and queues callbacks for execution.",
        skill_id: "nodejs"
      },
      {
        id: "q_fs_3",
        assessment_id: "ass_fullstack",
        question_text: "What is the key advantage of RESTful Stateless HTTP APIs?",
        options: [
          "Server maintains session memory state across client calls",
          "Each request contains all necessary auth and context data, improving horizontal scalability",
          "Client and server share a single persistent TCP socket for every payload",
          "Requests never require JSON serialization"
        ],
        correct_option_index: 1,
        explanation: "Statelessness means the server does not store client session context, making it easy to scale across load balancers.",
        skill_id: "web"
      },
      {
        id: "q_fs_4",
        assessment_id: "ass_fullstack",
        question_text: "In Database Management Systems, what is BCNF (Boyce-Codd Normal Form)?",
        options: [
          "A relation where every non-prime attribute is partially dependent on the candidate key",
          "A strict form of 3NF where for every functional dependency X -> Y, X MUST be a Super Key",
          "A database without any foreign key constraints",
          "A NoSQL key-value store architecture"
        ],
        correct_option_index: 1,
        explanation: "BCNF requires that for every non-trivial functional dependency X -> Y, X is a Super Key.",
        skill_id: "dbms"
      },
      {
        id: "q_fs_5",
        assessment_id: "ass_fullstack",
        question_text: "Which HTTP header is used in CORS (Cross-Origin Resource Sharing) to specify allowed origin domains?",
        options: [
          "Access-Control-Allow-Origin",
          "X-Content-Type-Options",
          "Content-Security-Policy",
          "Authorization-Bearer"
        ],
        correct_option_index: 0,
        explanation: "Access-Control-Allow-Origin indicates whether the response can be shared with requesting code from the given origin.",
        skill_id: "web"
      }
    ]
  },
  {
    id: "ass_cs_core",
    title: "Core Computer Science Fundamentals (OS, DBMS & Networks) Master Assessment",
    category: "Core CS Fundamentals",
    target_role_id: "fullstack_dev",
    duration_minutes: 20,
    total_questions: 5,
    passing_score: 70,
    questions: [
      {
        id: "q_cs_1",
        assessment_id: "ass_cs_core",
        question_text: "What does the ACID acronym stand for in Database Management Systems (DBMS)?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Asynchronous, Concurrent, Indexed, Distributed",
          "Aggregation, Clustering, Indexing, Data-integrity",
          "Automated, Compiled, Isolated, Deterministic"
        ],
        correct_option_index: 0,
        explanation: "ACID guarantees database transaction reliability: Atomicity (all-or-nothing), Consistency, Isolation, and Durability.",
        skill_id: "dbms"
      },
      {
        id: "q_cs_2",
        assessment_id: "ass_cs_core",
        question_text: "In Operating Systems, what is a Page Fault?",
        options: [
          "A hardware failure in physical RAM modules",
          "An interrupt raised when a program accesses a virtual memory page not currently loaded in physical RAM",
          "A corruption error in disk sectors",
          "A CPU syntax exception in user space"
        ],
        correct_option_index: 1,
        explanation: "A Page Fault occurs when a thread accesses a virtual memory address mapped to swap/disk rather than physical RAM.",
        skill_id: "os"
      },
      {
        id: "q_cs_3",
        assessment_id: "ass_cs_core",
        question_text: "What is the sequence of the 3-Way TCP Handshake to establish a reliable connection?",
        options: [
          "SYN -> SYN-ACK -> ACK",
          "ACK -> SYN -> FIN",
          "CONNECT -> ACCEPT -> READY",
          "PING -> PONG -> ACK"
        ],
        correct_option_index: 0,
        explanation: "The TCP handshake consists of 1. Client SYN, 2. Server SYN-ACK, 3. Client ACK to establish full-duplex transmission.",
        skill_id: "networks"
      },
      {
        id: "q_cs_4",
        assessment_id: "ass_cs_core",
        question_text: "Which SOLID Object-Oriented Design principle states that software entities should be open for extension, but closed for modification?",
        options: [
          "Single Responsibility Principle (SRP)",
          "Open-Closed Principle (OCP)",
          "Liskov Substitution Principle (LSP)",
          "Dependency Inversion Principle (DIP)"
        ],
        correct_option_index: 1,
        explanation: "The Open-Closed Principle (OCP) states that software entities (classes, modules, functions) should be open for extension, but closed for modification.",
        skill_id: "cpp"
      },
      {
        id: "q_cs_5",
        assessment_id: "ass_cs_core",
        question_text: "Which 4 conditions MUST hold simultaneously for a system deadlock to occur?",
        options: [
          "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
          "Paging, Segmentation, Swapping, Thrashing",
          "Race Condition, Starvation, Livelock, Priority Inversion",
          "Read Lock, Write Lock, Shared Lock, Exclusive Lock"
        ],
        correct_option_index: 0,
        explanation: "Coffman conditions for deadlock: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        skill_id: "os"
      }
    ]
  },
  {
    id: "ass_aiml",
    title: "AI, Machine Learning & Data Science Master Assessment",
    category: "AI & Data Science",
    target_role_id: "ai_ml",
    duration_minutes: 20,
    total_questions: 5,
    passing_score: 75,
    questions: [
      {
        id: "q_ai_1",
        assessment_id: "ass_aiml",
        question_text: "What is the primary difference between Supervised and Unsupervised Machine Learning?",
        options: [
          "Supervised ML uses labeled training data with target outputs; Unsupervised ML finds patterns in unlabeled data",
          "Supervised ML only works on image datasets; Unsupervised ML works on text",
          "Supervised ML requires GPU hardware; Unsupervised ML runs on CPU",
          "There is no mathematical difference"
        ],
        correct_option_index: 0,
        explanation: "Supervised learning learns a mapping from input features to ground-truth labels. Unsupervised learning discovers underlying clusters or distributions without target labels.",
        skill_id: "python"
      },
      {
        id: "q_ai_2",
        assessment_id: "ass_aiml",
        question_text: "In Neural Networks, what is Overfitting and how can L2 Regularization (Ridge) mitigate it?",
        options: [
          "Overfitting occurs when a model performs poorly on training data; L2 sets weights to zero",
          "Overfitting occurs when a model memorizes training noise and fails to generalize; L2 adds a squared weight penalty to the loss function",
          "Overfitting is caused by low learning rates; L2 increases learning rate exponentially",
          "Overfitting only happens in Linear Regression"
        ],
        correct_option_index: 1,
        explanation: "Overfitting means high variance / memorizing training noise. L2 regularization penalizes large weight values, enforcing smoother decision boundaries.",
        skill_id: "python"
      },
      {
        id: "q_ai_3",
        assessment_id: "ass_aiml",
        question_text: "Which architectural mechanism enables Transformer models (like BERT / GPT) to process token relationships in parallel across entire sequences?",
        options: [
          "Recurrent Backpropagation",
          "Scaled Dot-Product Multi-Head Self-Attention",
          "Convolutional Pooling Filters",
          "Decision Tree Gradient Boosting"
        ],
        correct_option_index: 1,
        explanation: "Multi-Head Self-Attention calculates query, key, and value dot products, allowing global context modeling without sequential RNN recurrences.",
        skill_id: "python"
      },
      {
        id: "q_ai_4",
        assessment_id: "ass_aiml",
        question_text: "What metric is best suited for evaluating a medical diagnosis classifier with highly imbalanced positive disease cases?",
        options: ["Accuracy", "Recall / Sensitivity & Precision-Recall AUC", "Mean Squared Error (MSE)", "R-Squared Score"],
        correct_option_index: 1,
        explanation: "When data is imbalanced, accuracy is misleading. Recall measures the proportion of actual positive disease cases correctly identified.",
        skill_id: "python"
      },
      {
        id: "q_ai_5",
        assessment_id: "ass_aiml",
        question_text: "In Python Data Science, which library is built on N-dimensional arrays for fast vector arithmetic and linear algebra operations?",
        options: ["NumPy", "Flask", "BeautifulSoup", "Requests"],
        correct_option_index: 0,
        explanation: "NumPy provides vectorised ndarray objects and SIMD-optimized C routines for high-speed numerical computing.",
        skill_id: "python"
      }
    ]
  },
  {
    id: "ass_devops",
    title: "DevOps, Cloud Infrastructure & Containerization Master Assessment",
    category: "DevOps & Cloud",
    target_role_id: "fullstack_dev",
    duration_minutes: 20,
    total_questions: 5,
    passing_score: 75,
    questions: [
      {
        id: "q_do_1",
        assessment_id: "ass_devops",
        question_text: "What is the fundamental architectural difference between Docker Containers and Virtual Machines (VMs)?",
        options: [
          "Containers share the host OS kernel and isolate user space, whereas VMs virtualize hardware and run guest OS instances",
          "Containers require hypervisor hardware emulation",
          "VMs startup faster than Docker containers",
          "Containers cannot run Linux binaries"
        ],
        correct_option_index: 0,
        explanation: "Containers share the host operating system kernel, making them lightweight (MBs) and fast compared to full OS virtualization in VMs (GBs).",
        skill_id: "git"
      },
      {
        id: "q_do_2",
        assessment_id: "ass_devops",
        question_text: "In Kubernetes, what is the smallest deployable computing unit that encapsulates one or more co-located containers?",
        options: ["Node", "Pod", "Cluster", "Namespace"],
        correct_option_index: 1,
        explanation: "A Pod is the basic execution unit in Kubernetes, containing one or more containers sharing network IP and storage volumes.",
        skill_id: "git"
      },
      {
        id: "q_do_3",
        assessment_id: "ass_devops",
        question_text: "What is the goal of a CI/CD Pipeline (Continuous Integration / Continuous Deployment)?",
        options: [
          "To manually deploy code changes once per year",
          "To automate code building, unit testing, security scanning, and deployment upon every repository push",
          "To replace version control repositories",
          "To block developer code commits"
        ],
        correct_option_index: 1,
        explanation: "CI/CD automates the build, test, and release cycle to deliver reliable software iterations rapidly.",
        skill_id: "git"
      },
      {
        id: "q_do_4",
        assessment_id: "ass_devops",
        question_text: "In Linux system administration, which command changes file permissions (read, write, execute)?",
        options: ["chmod", "chown", "grep", "top"],
        correct_option_index: 0,
        explanation: "chmod (change mode) modifies file read, write, and execute permissions for user, group, and others.",
        skill_id: "os"
      },
      {
        id: "q_do_5",
        assessment_id: "ass_devops",
        question_text: "What role does a Reverse Proxy (like Nginx / HAProxy) serve in production Web architecture?",
        options: [
          "It sits in front of backend servers, handling SSL termination, load balancing, and request caching",
          "It compiles frontend JavaScript into webassembly",
          "It stores primary relational database tables",
          "It generates SSL certificates automatically without DNS"
        ],
        correct_option_index: 0,
        explanation: "A Reverse Proxy routes incoming client requests to backend servers while managing load distribution, SSL/TLS termination, and security headers.",
        skill_id: "web"
      }
    ]
  },
  {
    id: "ass_aptitude_comm",
    title: "Aptitude, Quantitative Reasoning & Corporate Communication Master Assessment",
    category: "Aptitude & Quantitative",
    target_role_id: "fullstack_dev",
    duration_minutes: 20,
    total_questions: 5,
    passing_score: 70,
    questions: [
      {
        id: "q_ap_1",
        assessment_id: "ass_aptitude_comm",
        question_text: "If 12 engineers can complete a web platform in 15 days working 8 hours/day, how many days will 10 engineers take working 6 hours/day?",
        options: ["18 days", "24 days", "20 days", "16 days"],
        correct_option_index: 1,
        explanation: "Total work = 12 * 15 * 8 = 1440 man-hours. Required days = 1440 / (10 * 6) = 1440 / 60 = 24 days.",
        skill_id: "aptitude"
      },
      {
        id: "q_ap_2",
        assessment_id: "ass_aptitude_comm",
        question_text: "A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?",
        options: ["30 km/h", "36 km/h", "45 km/h", "50 km/h"],
        correct_option_index: 1,
        explanation: "Speed in m/s = 150m / 15s = 10 m/s. Converting to km/h: 10 * (18 / 5) = 36 km/h.",
        skill_id: "aptitude"
      },
      {
        id: "q_ap_3",
        assessment_id: "ass_aptitude_comm",
        question_text: "In behavioral corporate interviews, what does the STAR technique stand for when answering experience questions?",
        options: [
          "Situation, Task, Action, Result",
          "Software, Testing, Architecture, Release",
          "Strategy, Time, Assessment, Review",
          "Scope, Team, Analysis, Reasoning"
        ],
        correct_option_index: 0,
        explanation: "STAR stands for Situation (Context), Task (Responsibility), Action (Steps Taken), and Result (Measurable Outcome).",
        skill_id: "comm"
      },
      {
        id: "q_ap_4",
        assessment_id: "ass_aptitude_comm",
        question_text: "What is the recommended tone and structure when communicating a technical delay to a project mentor?",
        options: [
          "Proactively explain the root cause bottleneck, present 2 potential solutions, and propose a revised timeline",
          "Wait until the deadline has passed and send a 1-word apology",
          "Blame external team members without providing technical details",
          "Ignore mentor communications"
        ],
        correct_option_index: 0,
        explanation: "Professional corporate communication requires early transparency, root-cause analysis, and actionable solution proposals.",
        skill_id: "comm"
      },
      {
        id: "q_ap_5",
        assessment_id: "ass_aptitude_comm",
        question_text: "Find the next number in the logical series: 4, 9, 19, 39, 79, ?",
        options: ["119", "159", "149", "169"],
        correct_option_index: 1,
        explanation: "Pattern: Each term is (Previous Term * 2) + 1. (79 * 2) + 1 = 158 + 1 = 159.",
        skill_id: "aptitude"
      }
    ]
  }
];

export const mockJobApplications: JobApplication[] = [
  {
    id: "job_1",
    student_id: "user_student_1",
    company_name: "TechCorp Global",
    role_title: "Software Engineer Intern (Full Stack)",
    type: "Internship",
    status: "Interviewing",
    location: "Mohali / Hybrid",
    stipend_or_salary: "₹35,000 / month",
    application_date: "2026-03-01",
    deadline: "2026-03-30",
    notes: "Passed technical round 1 on DSA and React. Technical round 2 scheduled for next Tuesday."
  },
  {
    id: "job_2",
    student_id: "user_student_1",
    company_name: "InnoWave Solutions",
    role_title: "Frontend Developer",
    type: "Full-time",
    status: "Applied",
    location: "Chandigarh",
    stipend_or_salary: "₹9.5 LPA",
    application_date: "2026-03-15",
    deadline: "2026-04-10",
    notes: "Applied via campus placement portal. Resume ATS score verified at 88%."
  },
  {
    id: "job_3",
    student_id: "user_student_1",
    company_name: "CloudScale Systems",
    role_title: "Backend Java Engineer",
    type: "Full-time",
    status: "Offered",
    location: "Gurugram / Remote",
    stipend_or_salary: "₹12 LPA",
    application_date: "2026-02-10",
    deadline: "2026-03-15",
    notes: "Offer letter received! Reviewing joining terms and CTC structure."
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif_1",
    user_id: "user_student_1",
    title: "Project Approved!",
    message: "Dr. Vikram Sethi reviewed and approved your DevConnect submission with verified skill badge.",
    type: "feedback",
    read: false,
    created_at: "2026-03-22T10:15:00Z"
  },
  {
    id: "notif_2",
    user_id: "user_student_1",
    title: "Upcoming Milestone Deadline",
    message: "Full-Stack Capstone Project & Deployment task is due in 5 days.",
    type: "deadline",
    read: false,
    created_at: "2026-03-23T08:00:00Z"
  },
  {
    id: "notif_3",
    user_id: "user_student_1",
    title: "New Assignment Received",
    message: "Dr. Vikram Sethi assigned: Solve 10 Graph BFS/DFS problems on LeetCode.",
    type: "assignment",
    read: true,
    created_at: "2026-03-18T11:00:00Z"
  }
];

export const mockHelpRequests: HelpRequest[] = [
  {
    id: "help_1",
    student_id: "user_student_1",
    student_name: "Aarav Sharma",
    branch: "Computer Science & Engineering",
    semester: 5,
    teacher_id: "user_teacher_1",
    topic: "Guidance on Dynamic Programming & Tree Algorithms",
    message: "Sir, I am struggling to optimize my DP memoization approach for tree knapsack problems. Can we discuss during office hours?",
    status: "resolved",
    teacher_reply: "Sure Aarav! Review the standard Top-Down tree recursion pattern we discussed in class. Let's connect this Thursday at 3 PM in Lab 4.",
    created_at: "2026-03-14T16:20:00Z"
  }
];

export const mockTeacherAssignments: TeacherAssignment[] = [
  {
    id: "ta_1",
    teacher_id: "user_teacher_1",
    teacher_name: "Dr. Vikram Sethi",
    student_id: "user_student_1",
    student_name: "Aarav Sharma",
    title: "Solve 10 Graph Traversal (BFS/DFS) Problems",
    description: "Complete 10 LeetCode Medium graph problems and paste solution repository link.",
    due_date: "2026-03-28",
    status: "assigned",
    created_at: "2026-03-18T11:00:00Z"
  }
];
