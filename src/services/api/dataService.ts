import { demoAdapter } from './demoAdapter';
import { isSupabaseConfigured } from './supabaseClient';
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

export class DataService {
  public isDemoMode(): boolean {
    return !isSupabaseConfigured;
  }

  public getCurrentUser(): User {
    return demoAdapter.getCurrentUser();
  }

  public setCurrentUserRole(userId: string): User {
    return demoAdapter.setCurrentUserRole(userId);
  }

  public getAllUsers(): User[] {
    return demoAdapter.getAllUsers();
  }

  public getStudentProfile(userId?: string): StudentProfile {
    return demoAdapter.getStudentProfile(userId);
  }

  public updateStudentProfile(profile: Partial<StudentProfile>): StudentProfile {
    return demoAdapter.updateStudentProfile(profile);
  }

  public calculateClassReadinessAverage(): number {
    return demoAdapter.calculateClassReadinessAverage();
  }

  public getStudentSkills(studentId?: string): StudentSkill[] {
    return demoAdapter.getStudentSkills(studentId);
  }

  public updateStudentSkill(skillId: string, selfLevel: number): StudentSkill[] {
    return demoAdapter.updateStudentSkill(skillId, selfLevel);
  }

  public addCustomSkill(skillName: string, category: string): StudentSkill {
    return demoAdapter.addCustomSkill(skillName, category);
  }

  public verifySkillByTeacher(studentId: string, skillId: string, teacherName: string): void {
    demoAdapter.verifySkillByTeacher(studentId, skillId, teacherName);
  }

  public getRoadmapTasks(): RoadmapTask[] {
    return demoAdapter.getRoadmapTasks();
  }

  public addCustomRoadmapTask(task: Omit<RoadmapTask, 'id'>): RoadmapTask {
    return demoAdapter.addCustomRoadmapTask(task);
  }

  public getStudentTaskProgress(studentId?: string): Record<string, StudentTaskProgress> {
    return demoAdapter.getStudentTaskProgress(studentId);
  }

  public updateTaskStatus(taskId: string, status: StudentTaskProgress['status'], notes?: string): StudentTaskProgress {
    return demoAdapter.updateTaskStatus(taskId, status, notes);
  }

  public getProjects(): Project[] {
    return demoAdapter.getProjects();
  }

  public addCustomProjectTemplate(project: Omit<Project, 'id'>): Project {
    return demoAdapter.addCustomProjectTemplate(project);
  }

  public getProjectSubmissions(studentId?: string): ProjectSubmission[] {
    return demoAdapter.getProjectSubmissions(studentId);
  }

  public submitProject(projectId: string, repoUrl: string, demoUrl?: string, notes?: string): ProjectSubmission {
    return demoAdapter.submitProject(projectId, repoUrl, demoUrl, notes);
  }

  public reviewSubmission(submissionId: string, status: 'approved' | 'changes_requested', feedback: string): ProjectSubmission {
    return demoAdapter.reviewSubmission(submissionId, status, feedback);
  }

  public getAssessments(): Assessment[] {
    return demoAdapter.getAssessments();
  }

  public saveAssessmentAttempt(assessmentId: string, scorePercentage: number, weakSkills: string[]): AssessmentAttempt {
    return demoAdapter.saveAssessmentAttempt(assessmentId, scorePercentage, weakSkills);
  }

  public getJobApplications(): JobApplication[] {
    return demoAdapter.getJobApplications();
  }

  public addJobApplication(app: Omit<JobApplication, 'id' | 'student_id'>): JobApplication {
    return demoAdapter.addJobApplication(app);
  }

  public applyPlacementDrive(companyName: string, role: string): JobApplication {
    return demoAdapter.applyPlacementDrive(companyName, role);
  }

  public updateJobApplicationStatus(appId: string, status: JobApplication['status']): JobApplication {
    return demoAdapter.updateJobApplicationStatus(appId, status);
  }

  public deleteJobApplication(appId: string): void {
    demoAdapter.deleteJobApplication(appId);
  }

  public getHelpRequests(): HelpRequest[] {
    return demoAdapter.getHelpRequests();
  }

  public createHelpRequest(topic: string, message: string): HelpRequest {
    return demoAdapter.createHelpRequest(topic, message);
  }

  public replyToHelpRequest(requestId: string, reply: string): HelpRequest {
    return demoAdapter.replyToHelpRequest(requestId, reply);
  }

  public getTeacherAssignments(): TeacherAssignment[] {
    return demoAdapter.getTeacherAssignments();
  }

  public createTeacherAssignment(studentId: string, title: string, description: string, dueDate: string): TeacherAssignment {
    return demoAdapter.createTeacherAssignment(studentId, title, description, dueDate);
  }

  public getNotifications(): NotificationItem[] {
    return demoAdapter.getNotifications();
  }

  public addNotification(item: Omit<NotificationItem, 'id' | 'created_at'>): NotificationItem {
    return demoAdapter.addNotification(item);
  }

  public markNotificationRead(id: string): void {
    demoAdapter.markNotificationRead(id);
  }
}

export const dataService = new DataService();
