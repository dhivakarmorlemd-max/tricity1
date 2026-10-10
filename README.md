# CareerPilot AI — Smart Student Career & Placement Navigator

> **TriCity Hackathon 2026 Submission**  
> A full-stack, responsive web application empowering B.Tech engineering students to systematically plan skills, projects, internships, and placement preparation year-wise, while providing mentors with class-level progress visibility.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Local Installation & Running

```bash
# 1. Clone or navigate to project directory
cd d:\EDUTECH

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your web browser.

### Running Unit Tests & Production Build

```bash
# Run Vitest suite
npm run test

# Run TypeScript type check and Vite build
npm run build
```

---

## ⚡ Live Hackathon Demo Accounts (1-Click Switcher)

CareerPilot AI features an instant **Demo Mode Role Switcher** built directly into the top navbar:

| Persona Role | User Name | Focus & Access Scope |
| :--- | :--- | :--- |
| **Student** | Aarav Sharma (CSE, Sem 5) | Personalized Year-Wise Roadmap, Skill Matrix, Project Submissions, Quiz Assessments, Placement Tracker, Portfolio Showcase. |
| **Teacher / Mentor** | Dr. Vikram Sethi (Senior HOD) | Authorized Student Directory, Submission Review & Grading, Verified Badges, Task Assignments, Help Request Replies. |
| **Administrator** | Platform Admin | System Roadmap Templates, Skill & Project Bank Editor, Global Branding Config, Platform Operational Logs. |

---

## 🛠️ Tech Stack & Key Architectural Highlights

- **Frontend**: React 18, TypeScript, Vite, React Router DOM v6.
- **Styling & UI**: Tailwind CSS (with custom Navy/Teal palette), Lucide Icons, Glassmorphism backdrop filters, Dark/Light mode theme toggle.
- **Data & Persistence**:
  - Dual-mode architecture: Uses `Local DemoAdapter` (browser `localStorage` CRUD) out-of-the-box offline.
  - Connected Supabase PostgreSQL mode: Configurable via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Smart Engine**: Rule-based prerequisite dependency check & weakness detection + modular AI interface adapter (`aiAdapter.ts`).
- **Testing**: Vitest + React Testing Library.

---

## 📂 Project Structure

```
src/
├── app/ & App.tsx            # Main application router layout and screen routes
├── components/ui/            # Navbar, Sidebar, Card, Badge, Modal, ProgressBar
├── config/appConfig.ts       # Centralized application branding & academic config
├── pages/                    # 15 Complete Screens (Landing, Onboarding, Roadmap, Skills, Projects, etc.)
├── providers/AuthContext.tsx # Context provider with role switcher & profile state sync
├── services/
│   ├── api/                  # DataService, DemoAdapter, MockData, SupabaseClient
│   ├── ai/                   # Modular AI extension adapter
│   └── recommendations/      # Rule-based Recommendation Engine
├── types/                    # Domain TypeScript interfaces
└── tests/                    # Vitest test specs
supabase/
├── migrations/               # SQL schema with Row Level Security (RLS) policies
└── seed.sql                  # Database seed script
```

---

## 🔒 Security & Row Level Security (RLS)

- Role-Based Access Control (RBAC) enforced on client and database schema.
- RLS policies ensure students cannot access or modify other students' private records or elevate their role to teacher/admin.
- No secrets or service keys exposed in frontend code.

---

## ⚙️ Customization & Flexibility

All branches, semesters, skills, job roles, project templates, and color palettes are centralized in `src/config/appConfig.ts`. To adapt the platform for another university or college branch, modify `appConfig.ts` without rewriting any core application logic.
