import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';
import { StudentProfile } from '../types';

describe('Placement Readiness Calculation Math', () => {
  it('calculates score within transparent 20 - 98 range', () => {
    const mockProfile: StudentProfile = {
      user_id: 'user_student_1',
      branch: 'cse',
      current_semester: 5,
      target_role_id: 'fullstack_dev',
      skill_level: 'intermediate',
      weekly_hours: 15,
      github_url: 'https://github.com/aaravsharma-dev',
      linkedin_url: 'https://linkedin.com/in/aarav',
      portfolio_url: 'https://aarav.dev',
      resume_url: 'https://aarav.dev/resume.pdf',
      placement_readiness_score: 74,
      onboarded: true
    };

    const score = demoAdapter.calculateReadinessScore('user_student_1', mockProfile);
    expect(score).toBeGreaterThanOrEqual(20);
    expect(score).toBeLessThanOrEqual(98);
  });
});
