export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface StudentProfile {
  user_id: string;
  branch: string;
  current_semester: number;
  target_role_id: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  weekly_hours: number;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  placement_readiness_score: number; // calculated dynamically
  onboarded: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
}

export interface StudentSkill {
  id: string;
  student_id: string;
  skill_id: string;
  skill_name: string;
  category: string;
  self_level: number; // 1 to 5
  assessment_score: number | null; // 0 - 100
  teacher_verified: boolean;
  teacher_name?: string;
  updated_at: string;
}

export interface RoadmapTask {
  id: string;
  year: number; // 1, 2, 3, 4
  semester: number; // 1 to 8
  month: number; // 1 to 12
  week: number; // 1 to 48
  title: string;
  description: string;
  estimated_hours: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prerequisite_skills: string[];
  learning_resource_url: string;
  category: string;
  target_role_id: string;
  custom?: boolean;
}

export interface StudentTaskProgress {
  id: string;
  student_id: string;
  task_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'postponed';
  completed_at?: string;
  notes?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  target_role_id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  problem_statement: string;
  why_useful: string;
  required_skills: string[];
  tech_stack: string[];
  implementation_milestones: string[];
  expected_outcome: string;
  testing_checklist: string[];
  custom?: boolean;
}

export interface ProjectSubmission {
  id: string;
  project_id: string;
  project_title: string;
  student_id: string;
  student_name: string;
  github_repo_url: string;
  live_demo_url?: string;
  notes?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'changes_requested';
  teacher_feedback?: string;
  submitted_at: string;
  reviewed_at?: string;
}

export interface AssessmentQuestion {
  id: string;
  assessment_id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  skill_id: string;
}

export interface Assessment {
  id: string;
  title: string;
  category: string;
  target_role_id: string;
  duration_minutes: number;
  total_questions: number;
  passing_score: number;
  questions?: AssessmentQuestion[];
}

export interface AssessmentAttempt {
  id: string;
  assessment_id: string;
  assessment_title: string;
  student_id: string;
  score_percentage: number;
  total_questions: number;
  correct_answers: number;
  weak_skills: string[];
  completed_at: string;
}

export interface TeacherAssignment {
  id: string;
  teacher_id: string;
  teacher_name: string;
  student_id: string;
  student_name?: string;
  title: string;
  description: string;
  due_date: string;
  status: 'assigned' | 'completed' | 'overdue';
  feedback?: string;
  created_at: string;
}

export interface JobApplication {
  id: string;
  student_id: string;
  company_name: string;
  role_title: string;
  type: 'Internship' | 'Full-time';
  status: 'Saved' | 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';
  location: string;
  stipend_or_salary: string;
  application_date: string;
  deadline: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'deadline' | 'feedback' | 'assignment' | 'milestone' | 'recommendation';
  read: boolean;
  created_at: string;
}

export interface HelpRequest {
  id: string;
  student_id: string;
  student_name: string;
  branch: string;
  semester: number;
  teacher_id?: string;
  topic: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  teacher_reply?: string;
  created_at: string;
}

export interface SmartRecommendation {
  id: string;
  title: string;
  message: string;
  type: 'prerequisite_missing' | 'behind_schedule' | 'skill_gap' | 'project_ready' | 'placement_tip';
  target_task_id?: string;
  action_text: string;
  action_link?: string;
  category?: 'dsa' | 'resume' | 'project' | 'placement' | 'schedule' | 'interview';
  severity?: 'critical' | 'high' | 'medium';
  impactScore?: number;
  rootCause?: string;
  solutionSteps?: string[];
  quickFixAction?: string;
  modalTarget?: string;
}
