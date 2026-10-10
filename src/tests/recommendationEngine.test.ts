import { describe, it, expect } from 'vitest';
import { recommendationEngine } from '../services/recommendations/recommendationEngine';
import { StudentProfile, StudentSkill, RoadmapTask, StudentTaskProgress } from '../types';

describe('RecommendationEngine', () => {
  it('generates prerequisite warning when task is in_progress but prerequisite is incomplete', () => {
    const mockProfile: StudentProfile = {
      user_id: 'test_user',
      branch: 'cse',
      current_semester: 5,
      target_role_id: 'fullstack_dev',
      skill_level: 'intermediate',
      weekly_hours: 15,
      placement_readiness_score: 70,
      onboarded: true
    };

    const mockSkills: StudentSkill[] = [];
    const mockTasks: RoadmapTask[] = [
      {
        id: 't_prereq',
        year: 1,
        semester: 1,
        month: 1,
        week: 1,
        title: 'Git Basics',
        description: 'Git',
        estimated_hours: 5,
        difficulty: 'Easy',
        prerequisite_skills: [],
        learning_resource_url: '',
        category: 'Practical',
        target_role_id: 'fullstack_dev'
      },
      {
        id: 't_main',
        year: 2,
        semester: 3,
        month: 5,
        week: 17,
        title: 'React Basics',
        description: 'React',
        estimated_hours: 10,
        difficulty: 'Medium',
        prerequisite_skills: ['t_prereq'],
        learning_resource_url: '',
        category: 'Web',
        target_role_id: 'fullstack_dev'
      }
    ];

    const mockProgress: Record<string, StudentTaskProgress> = {
      't_main': { id: 'tp1', student_id: 'test_user', task_id: 't_main', status: 'in_progress' }
    };

    const recs = recommendationEngine.generateRecommendations(
      mockProfile,
      mockSkills,
      mockTasks,
      mockProgress
    );

    const prereqRec = recs.find(r => r.type === 'prerequisite_missing');
    expect(prereqRec).toBeDefined();
    expect(prereqRec?.target_task_id).toBe('t_prereq');
  });

  it('generates pacing warning if weekly hours are less than 12', () => {
    const mockProfile: StudentProfile = {
      user_id: 'test_user',
      branch: 'cse',
      current_semester: 5,
      target_role_id: 'fullstack_dev',
      skill_level: 'beginner',
      weekly_hours: 8,
      placement_readiness_score: 50,
      onboarded: true
    };

    const recs = recommendationEngine.generateRecommendations(mockProfile, [], [], {});
    const hoursRec = recs.find(r => r.type === 'behind_schedule');
    expect(hoursRec).toBeDefined();
  });
});
