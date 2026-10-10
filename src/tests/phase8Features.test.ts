import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 8 Feature Upgrades', () => {
  it('logs hackathon judge score evaluation dynamically in system log', () => {
    const helpRequestsBefore = demoAdapter.getHelpRequests().length;

    const res = demoAdapter.createHelpRequest(
      'Hackathon Judge Score Submitted: 10/10',
      'Grand Finals Evaluation Score Logged'
    );

    expect(res.id).toBeDefined();
    expect(demoAdapter.getHelpRequests().length).toBe(helpRequestsBefore + 1);
  });

  it('generates optimized recruiter headline with readiness score', () => {
    const profile = demoAdapter.getStudentProfile();
    const headline = `B.Tech ${profile.branch.toUpperCase()} | Readiness Score: ${profile.placement_readiness_score}%`;

    expect(headline).toContain('B.Tech CSE');
    expect(headline).toContain('Readiness Score:');
  });
});
