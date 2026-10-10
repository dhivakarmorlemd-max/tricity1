import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 4 Feature Upgrades', () => {
  it('adds job application dynamically for placement drive eligibility check', () => {
    const initialApps = demoAdapter.getJobApplications().length;

    const newApp = demoAdapter.addJobApplication({
      company_name: 'Google Phase 4 Test Drive',
      role_title: 'SDE-1',
      type: 'Full-time',
      status: 'Applied',
      location: 'Bengaluru',
      stipend_or_salary: '₹24 LPA',
      deadline: '2026-11-15',
      application_date: '2026-10-09',
      notes: 'Phase 4 Eligibility Matrix Test Application'
    });

    expect(newApp.id).toBeDefined();
    expect(demoAdapter.getJobApplications().length).toBe(initialApps + 1);
  });

  it('updates readiness score after benchmark exam assessment', () => {
    const profileBefore = demoAdapter.getStudentProfile();
    const updated = demoAdapter.updateStudentProfile({
      placement_readiness_score: Math.min(99, profileBefore.placement_readiness_score + 2)
    });

    expect(updated.placement_readiness_score).toBeGreaterThanOrEqual(profileBefore.placement_readiness_score);
  });
});
