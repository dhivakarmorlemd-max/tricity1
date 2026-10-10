-- CareerPilot AI — PostgreSQL Database Schema & Supabase Row Level Security (RLS) Policies

-- 1. ENUMS & CONSTANTS
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'completed', 'postponed');
CREATE TYPE submission_status AS ENUM ('submitted', 'under_review', 'approved', 'changes_requested');
CREATE TYPE job_app_status AS ENUM ('Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected');

-- 2. USER PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. STUDENT ACADEMIC PROFILES
CREATE TABLE IF NOT EXISTS public.student_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    branch TEXT NOT NULL DEFAULT 'cse',
    current_semester INT NOT NULL DEFAULT 5,
    target_role_id TEXT NOT NULL DEFAULT 'fullstack_dev',
    skill_level TEXT NOT NULL DEFAULT 'intermediate',
    weekly_hours INT NOT NULL DEFAULT 15,
    bio TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    resume_url TEXT,
    placement_readiness_score INT NOT NULL DEFAULT 70,
    onboarded BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SKILLS & STUDENT SKILL MATRIX
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    icon TEXT
);

CREATE TABLE IF NOT EXISTS public.student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    self_level INT NOT NULL CHECK (self_level BETWEEN 1 AND 5),
    assessment_score INT CHECK (assessment_score BETWEEN 0 AND 100),
    teacher_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by_teacher_id UUID REFERENCES public.profiles(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(student_id, skill_id)
);

-- 5. ROADMAP TASKS & PROGRESS
CREATE TABLE IF NOT EXISTS public.roadmap_tasks (
    id TEXT PRIMARY KEY,
    year INT NOT NULL,
    semester INT NOT NULL,
    month INT NOT NULL,
    week INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    estimated_hours INT NOT NULL DEFAULT 10,
    difficulty TEXT NOT NULL DEFAULT 'Medium',
    prerequisite_skills TEXT[],
    learning_resource_url TEXT,
    category TEXT NOT NULL,
    target_role_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.student_task_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id TEXT NOT NULL REFERENCES public.roadmap_tasks(id) ON DELETE CASCADE,
    status task_status NOT NULL DEFAULT 'not_started',
    completed_at TIMESTAMPTZ,
    notes TEXT,
    UNIQUE(student_id, task_id)
);

-- 6. PROJECTS & SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    target_role_id TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    description TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    why_useful TEXT NOT NULL,
    required_skills TEXT[],
    tech_stack TEXT[],
    implementation_milestones TEXT[],
    expected_outcome TEXT,
    testing_checklist TEXT[]
);

CREATE TABLE IF NOT EXISTS public.project_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    github_repo_url TEXT NOT NULL,
    live_demo_url TEXT,
    notes TEXT,
    status submission_status NOT NULL DEFAULT 'submitted',
    teacher_feedback TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 7. JOB APPLICATIONS TRACKER
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Internship',
    status job_app_status NOT NULL DEFAULT 'Applied',
    location TEXT,
    stipend_or_salary TEXT,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    deadline DATE,
    notes TEXT
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_task_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile, teachers can read all student profiles
CREATE POLICY "Profiles read access" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));

CREATE POLICY "Profiles update own" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Student Profiles: Students update own, teachers view
CREATE POLICY "Student profiles own access" ON public.student_profiles
    FOR ALL USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));

-- Project Submissions: Students insert/update own, teachers review
CREATE POLICY "Submissions access" ON public.project_submissions
    FOR ALL USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));

-- Job Applications: Only student owns job applications
CREATE POLICY "Job applications own access" ON public.job_applications
    FOR ALL USING (student_id = auth.uid());
