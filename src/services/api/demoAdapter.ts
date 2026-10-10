import {
  User,
  StudentProfile,
  StudentSkill,
  RoadmapTask,
  StudentTaskProgress,
  Project,
  ProjectSubmission,
  Assessment,
  AssessmentAttempt,
  JobApplication,
  NotificationItem,
  HelpRequest,
  TeacherAssignment
} from '../../types';
import {
  mockUsers,
  mockStudentProfiles,
  mockSkillsList,
  mockRoadmapTasks,
  mockProjects,
  mockSubmissions,
  mockAssessments,
  mockJobApplications,
  mockNotifications,
  mockHelpRequests,
  mockTeacherAssignments
} from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'careerpilot_current_user_id',
  PROFILES: 'careerpilot_student_profiles',
  SKILLS: 'careerpilot_skills',
  TASK_PROGRESS: 'careerpilot_task_progress',
  PROJECT_SUBMISSIONS: 'careerpilot_submissions',
  ASSESSMENT_ATTEMPTS: 'careerpilot_assessment_attempts',
  JOB_APPLICATIONS: 'careerpilot_job_applications',
  NOTIFICATIONS: 'careerpilot_notifications',
  HELP_REQUESTS: 'careerpilot_help_requests',
  TEACHER_ASSIGNMENTS: 'careerpilot_teacher_assignments',
  ROADMAP_TASKS: 'careerpilot_roadmap_tasks',
  PROJECTS: 'careerpilot_projects'
};

class DemoAdapter {
  constructor() {
    this.initStorage();
  }

  private initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, 'user_student_1');
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(mockStudentProfiles));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(mockSkillsList));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TASK_PROGRESS)) {
      const initialProgress: Record<string, StudentTaskProgress> = {
        "tp_1": { id: "tp_1", student_id: "user_student_1", task_id: "rt_101", status: "completed", completed_at: "2025-09-10" },
        "tp_2": { id: "tp_2", student_id: "user_student_1", task_id: "rt_102", status: "completed", completed_at: "2025-10-15" },
        "tp_3": { id: "tp_3", student_id: "user_student_1", task_id: "rt_103", status: "completed", completed_at: "2025-12-01" },
        "tp_4": { id: "tp_4", student_id: "user_student_1", task_id: "rt_201", status: "completed", completed_at: "2026-01-20" },
        "tp_5": { id: "tp_5", student_id: "user_student_1", task_id: "rt_202", status: "completed", completed_at: "2026-02-14" },
        "tp_6": { id: "tp_6", student_id: "user_student_1", task_id: "rt_203", status: "completed", completed_at: "2026-03-01" },
        "tp_7": { id: "tp_7", student_id: "user_student_1", task_id: "rt_301", status: "completed", completed_at: "2026-03-10" },
        "tp_8": { id: "tp_8", student_id: "user_student_1", task_id: "rt_302", status: "in_progress" },
        "tp_9": { id: "tp_9", student_id: "user_student_1", task_id: "rt_303", status: "in_progress" },
        "tp_10": { id: "tp_10", student_id: "user_student_1", task_id: "rt_304", status: "not_started" },
      };
      localStorage.setItem(STORAGE_KEYS.TASK_PROGRESS, JSON.stringify(initialProgress));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECT_SUBMISSIONS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECT_SUBMISSIONS, JSON.stringify(mockSubmissions));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(mockJobApplications));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(mockHelpRequests));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS)) {
      localStorage.setItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS, JSON.stringify(mockTeacherAssignments));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ROADMAP_TASKS)) {
      localStorage.setItem(STORAGE_KEYS.ROADMAP_TASKS, JSON.stringify(mockRoadmapTasks));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mockProjects));
    }
  }

  // User & Auth
  public getCurrentUser(): User {
    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || 'user_student_1';
    return mockUsers.find(u => u.id === currentId) || mockUsers[0];
  }

  public setCurrentUserRole(userId: string): User {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
    return this.getCurrentUser();
  }

  public getAllUsers(): User[] {
    return mockUsers;
  }

  // Student Profile
  public getStudentProfile(userId?: string): StudentProfile {
    const targetId = userId || this.getCurrentUser().id;
    const profiles: Record<string, StudentProfile> = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}');
    if (profiles[targetId]) return profiles[targetId];

    return {
      user_id: targetId,
      branch: 'cse',
      current_semester: 5,
      target_role_id: 'fullstack_dev',
      skill_level: 'intermediate',
      weekly_hours: 15,
      placement_readiness_score: 74,
      onboarded: true
    };
  }

  public updateStudentProfile(profile: Partial<StudentProfile>): StudentProfile {
    const currentUser = this.getCurrentUser();
    const profiles = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}');
    const existing = profiles[currentUser.id] || this.getStudentProfile(currentUser.id);

    const updated = { ...existing, ...profile };
    updated.placement_readiness_score = this.calculateReadinessScore(currentUser.id, updated);
    profiles[currentUser.id] = updated;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    return updated;
  }

  // Transparent Dynamic Readiness Score Calculation Math
  public calculateReadinessScore(studentId: string, profile: StudentProfile): number {
    // 1. Task Completion (35%)
    const allProgress: Record<string, StudentTaskProgress> = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASK_PROGRESS) || '{}');
    const studentProgress = Object.values(allProgress).filter(p => p.student_id === studentId);
    const completedTasks = studentProgress.filter(p => p.status === 'completed').length;
    const taskScore = Math.min(100, (completedTasks / 7) * 100);

    // 2. Assessment Average (25%)
    const skills = this.getStudentSkills(studentId);
    const scoredSkills = skills.filter(s => s.assessment_score !== null);
    const avgAssessment = scoredSkills.length > 0
      ? scoredSkills.reduce((acc, s) => acc + (s.assessment_score || 0), 0) / scoredSkills.length
      : 65;

    // 3. Project Submissions & Teacher Verifications (25%)
    const submissions = this.getProjectSubmissions(studentId);
    const approvedProjs = submissions.filter(s => s.status === 'approved').length;
    const verifiedSkills = skills.filter(s => s.teacher_verified).length;
    const projectScore = Math.min(100, (approvedProjs * 40) + (verifiedSkills * 12));

    // 4. Resume & Portfolio Links (15%)
    let prepScore = 0;
    if (profile.github_url) prepScore += 30;
    if (profile.linkedin_url) prepScore += 20;
    if (profile.portfolio_url) prepScore += 25;
    if (profile.resume_url) prepScore += 25;

    const finalScore = Math.round(
      (taskScore * 0.35) +
      (avgAssessment * 0.25) +
      (projectScore * 0.25) +
      (prepScore * 0.15)
    );

    return Math.min(98, Math.max(20, finalScore));
  }

  // Calculate Dynamic Class Readiness Average
  public calculateClassReadinessAverage(): number {
    const profilesObj: Record<string, StudentProfile> = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}');
    const profilesList = Object.values(profilesObj);
    if (profilesList.length === 0) return 72;
    const sum = profilesList.reduce((acc, p) => acc + p.placement_readiness_score, 0);
    return Math.round(sum / profilesList.length);
  }

  // Skills - Fully Dynamic CRUD
  public getStudentSkills(studentId?: string): StudentSkill[] {
    const targetId = studentId || this.getCurrentUser().id;
    const skills: StudentSkill[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    return skills.filter(s => s.student_id === targetId);
  }

  public updateStudentSkill(skillId: string, selfLevel: number): StudentSkill[] {
    const studentId = this.getCurrentUser().id;
    let skills: StudentSkill[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    const index = skills.findIndex(s => s.student_id === studentId && s.id === skillId);
    if (index !== -1) {
      skills[index].self_level = selfLevel;
      skills[index].updated_at = new Date().toISOString().split('T')[0];
    }
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    this.updateStudentProfile({});
    return skills.filter(s => s.student_id === studentId);
  }

  public addCustomSkill(skillName: string, category: string): StudentSkill {
    const user = this.getCurrentUser();
    let skills: StudentSkill[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    const newSkill: StudentSkill = {
      id: `sk_custom_${Date.now()}`,
      student_id: user.id,
      skill_id: `custom_${skillName.toLowerCase().replace(/\s+/g, '_')}`,
      skill_name: skillName,
      category,
      self_level: 3,
      assessment_score: 75,
      teacher_verified: false,
      updated_at: new Date().toISOString().split('T')[0]
    };
    skills.push(newSkill);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    this.updateStudentProfile({});
    return newSkill;
  }

  public verifySkillByTeacher(studentId: string, skillId: string, teacherName: string): void {
    let skills: StudentSkill[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    const index = skills.findIndex(s => s.student_id === studentId && s.id === skillId);
    if (index !== -1) {
      skills[index].teacher_verified = !skills[index].teacher_verified;
      skills[index].teacher_name = teacherName;
      skills[index].updated_at = new Date().toISOString().split('T')[0];
    }
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    this.updateStudentProfile({});
  }

  // Roadmap & Tasks - Fully Dynamic CRUD
  public getRoadmapTasks(): RoadmapTask[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ROADMAP_TASKS) || JSON.stringify(mockRoadmapTasks));
  }

  public addCustomRoadmapTask(task: Omit<RoadmapTask, 'id'>): RoadmapTask {
    const tasks: RoadmapTask[] = this.getRoadmapTasks();
    const newTask: RoadmapTask = {
      ...task,
      id: `rt_custom_${Date.now()}`,
      custom: true
    };
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEYS.ROADMAP_TASKS, JSON.stringify(tasks));
    return newTask;
  }

  public getStudentTaskProgress(studentId?: string): Record<string, StudentTaskProgress> {
    const targetId = studentId || this.getCurrentUser().id;
    const allProgress: Record<string, StudentTaskProgress> = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASK_PROGRESS) || '{}');
    const filtered: Record<string, StudentTaskProgress> = {};
    Object.values(allProgress).forEach(p => {
      if (p.student_id === targetId) {
        filtered[p.task_id] = p;
      }
    });
    return filtered;
  }

  public updateTaskStatus(taskId: string, status: StudentTaskProgress['status'], notes?: string): StudentTaskProgress {
    const studentId = this.getCurrentUser().id;
    const allProgress: Record<string, StudentTaskProgress> = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASK_PROGRESS) || '{}');
    const existingKey = Object.keys(allProgress).find(k => allProgress[k].student_id === studentId && allProgress[k].task_id === taskId);
    
    const id = existingKey || `tp_${Date.now()}`;
    const updated: StudentTaskProgress = {
      id,
      student_id: studentId,
      task_id: taskId,
      status,
      completed_at: status === 'completed' ? new Date().toISOString() : undefined,
      notes: notes || allProgress[id]?.notes
    };

    allProgress[id] = updated;
    localStorage.setItem(STORAGE_KEYS.TASK_PROGRESS, JSON.stringify(allProgress));
    this.updateStudentProfile({});
    return updated;
  }

  // Projects & Submissions - Fully Dynamic CRUD
  public getProjects(): Project[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || JSON.stringify(mockProjects));
  }

  public addCustomProjectTemplate(project: Omit<Project, 'id'>): Project {
    const projects: Project[] = this.getProjects();
    const newProj: Project = {
      ...project,
      id: `proj_custom_${Date.now()}`,
      custom: true
    };
    projects.push(newProj);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProj;
  }

  public getProjectSubmissions(studentId?: string): ProjectSubmission[] {
    const submissions: ProjectSubmission[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECT_SUBMISSIONS) || '[]');
    if (studentId) {
      return submissions.filter(s => s.student_id === studentId);
    }
    return submissions;
  }

  public submitProject(projectId: string, repoUrl: string, demoUrl?: string, notes?: string): ProjectSubmission {
    const user = this.getCurrentUser();
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    const submissions: ProjectSubmission[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECT_SUBMISSIONS) || '[]');

    const newSub: ProjectSubmission = {
      id: `sub_${Date.now()}`,
      project_id: projectId,
      project_title: project?.title || 'Custom Project',
      student_id: user.id,
      student_name: user.full_name,
      github_repo_url: repoUrl,
      live_demo_url: demoUrl,
      notes,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    };

    submissions.push(newSub);
    localStorage.setItem(STORAGE_KEYS.PROJECT_SUBMISSIONS, JSON.stringify(submissions));

    // Send automated notification to teacher
    this.addNotification({
      user_id: 'user_teacher_1',
      title: 'New Project Submission',
      message: `${user.full_name} submitted "${project?.title || 'Project'}" for mentor verification.`,
      type: 'feedback',
      read: false
    });

    return newSub;
  }

  public reviewSubmission(submissionId: string, status: 'approved' | 'changes_requested', feedback: string): ProjectSubmission {
    const submissions: ProjectSubmission[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECT_SUBMISSIONS) || '[]');
    const sub = submissions.find(s => s.id === submissionId);
    if (sub) {
      sub.status = status;
      sub.teacher_feedback = feedback;
      sub.reviewed_at = new Date().toISOString();

      if (status === 'approved') {
        let skills: StudentSkill[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
        skills = skills.map(sk => {
          if (sk.student_id === sub.student_id) {
            return { ...sk, teacher_verified: true, teacher_name: this.getCurrentUser().full_name };
          }
          return sk;
        });
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
      }

      // Send notification back to student
      this.addNotification({
        user_id: sub.student_id,
        title: status === 'approved' ? 'Project Approved!' : 'Revisions Requested',
        message: `Mentor ${this.getCurrentUser().full_name} reviewed "${sub.project_title}": ${feedback}`,
        type: 'feedback',
        read: false
      });
    }
    localStorage.setItem(STORAGE_KEYS.PROJECT_SUBMISSIONS, JSON.stringify(submissions));
    this.updateStudentProfile({});
    return sub!;
  }

  // Assessments
  public getAssessments(): Assessment[] {
    return mockAssessments;
  }

  public saveAssessmentAttempt(assessmentId: string, scorePercentage: number, weakSkills: string[]): AssessmentAttempt {
    const user = this.getCurrentUser();
    const assessment = mockAssessments.find(a => a.id === assessmentId);
    const attempts: AssessmentAttempt[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENT_ATTEMPTS) || '[]');

    const attempt: AssessmentAttempt = {
      id: `att_${Date.now()}`,
      assessment_id: assessmentId,
      assessment_title: assessment?.title || 'Skill Assessment',
      student_id: user.id,
      score_percentage: scorePercentage,
      total_questions: assessment?.total_questions || 5,
      correct_answers: Math.round(((assessment?.total_questions || 5) * scorePercentage) / 100),
      weak_skills: weakSkills,
      completed_at: new Date().toISOString()
    };

    attempts.push(attempt);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_ATTEMPTS, JSON.stringify(attempts));

    let skills: StudentSkill[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    skills = skills.map(sk => {
      if (sk.student_id === user.id) {
        return { ...sk, assessment_score: Math.max(sk.assessment_score || 0, scorePercentage) };
      }
      return sk;
    });
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    this.updateStudentProfile({});

    return attempt;
  }

  // Job Applications - Fully Dynamic CRUD
  public getJobApplications(): JobApplication[] {
    const userId = this.getCurrentUser().id;
    const apps: JobApplication[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS) || '[]');
    return apps.filter(a => a.student_id === userId);
  }

  public addJobApplication(app: Omit<JobApplication, 'id' | 'student_id'>): JobApplication {
    const user = this.getCurrentUser();
    const apps: JobApplication[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS) || '[]');
    const newApp: JobApplication = {
      ...app,
      id: `job_${Date.now()}`,
      student_id: user.id
    };
    apps.push(newApp);
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(apps));
    this.updateStudentProfile({});
    return newApp;
  }

  public applyPlacementDrive(companyName: string, role: string): JobApplication {
    return this.addJobApplication({
      company_name: companyName,
      role_title: role,
      type: 'Full-time',
      status: 'Applied',
      location: 'Bengaluru / Hybrid',
      stipend_or_salary: '₹18 LPA',
      application_date: new Date().toISOString().split('T')[0],
      deadline: '2026-11-30'
    });
  }

  public updateJobApplicationStatus(appId: string, status: JobApplication['status']): JobApplication {
    const apps: JobApplication[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS) || '[]');
    const target = apps.find(a => a.id === appId);
    if (target) {
      target.status = status;
    }
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(apps));
    this.updateStudentProfile({});
    return target!;
  }

  public deleteJobApplication(appId: string): void {
    let apps: JobApplication[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS) || '[]');
    apps = apps.filter(a => a.id !== appId);
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(apps));
    this.updateStudentProfile({});
  }

  // Teacher Assignments & Help Requests
  public getHelpRequests(): HelpRequest[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS) || '[]');
  }

  public createHelpRequest(topic: string, message: string): HelpRequest {
    const user = this.getCurrentUser();
    const profile = this.getStudentProfile(user.id);
    const requests: HelpRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS) || '[]');

    const newReq: HelpRequest = {
      id: `help_${Date.now()}`,
      student_id: user.id,
      student_name: user.full_name,
      branch: profile.branch,
      semester: profile.current_semester,
      topic,
      message,
      status: 'open',
      created_at: new Date().toISOString()
    };

    requests.push(newReq);
    localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(requests));
    return newReq;
  }

  public replyToHelpRequest(requestId: string, reply: string): HelpRequest {
    const requests: HelpRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS) || '[]');
    const req = requests.find(r => r.id === requestId);
    if (req) {
      req.teacher_reply = reply;
      req.status = 'resolved';
      req.teacher_id = this.getCurrentUser().id;

      this.addNotification({
        user_id: req.student_id,
        title: 'Mentor Replied to Guidance Request',
        message: `${this.getCurrentUser().full_name}: "${reply}"`,
        type: 'feedback',
        read: false
      });
    }
    localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(requests));
    return req!;
  }

  public getTeacherAssignments(): TeacherAssignment[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS) || '[]');
  }

  public createTeacherAssignment(studentId: string, title: string, description: string, dueDate: string): TeacherAssignment {
    const teacher = this.getCurrentUser();
    const assignments: TeacherAssignment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS) || '[]');
    const studentUser = mockUsers.find(u => u.id === studentId);

    const newAss: TeacherAssignment = {
      id: `ta_${Date.now()}`,
      teacher_id: teacher.id,
      teacher_name: teacher.full_name,
      student_id: studentId,
      student_name: studentUser?.full_name || 'Student',
      title,
      description,
      due_date: dueDate,
      status: 'assigned',
      created_at: new Date().toISOString()
    };

    assignments.push(newAss);
    localStorage.setItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS, JSON.stringify(assignments));

    this.addNotification({
      user_id: studentId,
      title: 'New Teacher Assignment Assigned',
      message: `${teacher.full_name} assigned: "${title}" due on ${dueDate}.`,
      type: 'assignment',
      read: false
    });

    return newAss;
  }

  // Notifications - Fully Dynamic
  public getNotifications(): NotificationItem[] {
    const userId = this.getCurrentUser().id;
    const notifs: NotificationItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    return notifs.filter(n => n.user_id === userId || n.user_id === 'all_students');
  }

  public addNotification(item: Omit<NotificationItem, 'id' | 'created_at'>): NotificationItem {
    const notifs: NotificationItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    notifs.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    return newNotif;
  }

  public markNotificationRead(id: string): void {
    const notifs: NotificationItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const n = notifs.find(item => item.id === id);
    if (n) n.read = true;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }
}

export const demoAdapter = new DemoAdapter();
