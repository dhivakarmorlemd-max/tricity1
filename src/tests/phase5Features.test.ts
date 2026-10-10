import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 5 Feature Upgrades', () => {
  it('allows student profile updates for weekly study hours and target role optimization', () => {
    const original = demoAdapter.getStudentProfile();
    const updated = demoAdapter.updateStudentProfile({
      weekly_hours: 25,
      placement_readiness_score: Math.min(99, original.placement_readiness_score + 4)
    });

    expect(updated.weekly_hours).toBe(25);
    expect(updated.placement_readiness_score).toBeGreaterThanOrEqual(original.placement_readiness_score);
  });

  it('creates alumni mentorship ticket via help requests', () => {
    const initialRequests = demoAdapter.getHelpRequests().length;

    const request = demoAdapter.createHelpRequest(
      'Alumni Mentorship Test',
      'Requesting guidance from alumni Karan Malhotra'
    );

    expect(request.id).toBeDefined();
    expect(demoAdapter.getHelpRequests().length).toBe(initialRequests + 1);
  });
});
