import { describe, it, expect } from 'vitest';
import { aiAdapter } from '../services/ai/aiAdapter';
import { demoAdapter } from '../services/api/demoAdapter';
import { StudentProfile } from '../types';

describe('Phase 1 Feature Upgrades', () => {
  it('aiAdapter returns personalized advice and suggested actions', async () => {
    const mockProfile: StudentProfile = {
      user_id: 'user_student_1',
      branch: 'cse',
      current_semester: 5,
      target_role_id: 'fullstack_dev',
      skill_level: 'intermediate',
      weekly_hours: 15,
      placement_readiness_score: 74,
      onboarded: true
    };

    const res = await aiAdapter.getSmartCareerAdvice(mockProfile, 'What should I build next?');
    expect(res.advice).toContain('FULLSTACK DEV');
    expect(res.suggestedTasks.length).toBeGreaterThan(0);
  });

  it('calculates dynamic class readiness average across all enrolled students', () => {
    const classAvg = demoAdapter.calculateClassReadinessAverage();
    expect(classAvg).toBeGreaterThanOrEqual(50);
    expect(classAvg).toBeLessThanOrEqual(100);
  });
});
