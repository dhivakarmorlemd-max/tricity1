import { describe, it, expect } from 'vitest';
import { aiAdapter } from '../services/ai/aiAdapter';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 12 Next-Gen AI Career Copilot & Global Scale Suite', () => {
  it('processes diagnostic NLP test queries via AI Career Copilot engine', () => {
    const profile = demoAdapter.getStudentProfile();
    const query = 'What should I learn for Google SDE roles?';

    const result = aiAdapter.processUserQuery(query, profile);
    expect(result).toBeDefined();
    expect(result.advice).toBeDefined();
    expect(result.advice.length).toBeGreaterThan(0);
  });

  it('schedules peer-to-peer live mock interview session into help tracking', () => {
    const countBefore = demoAdapter.getHelpRequests().length;

    const res = demoAdapter.createHelpRequest(
      'Peer Mock Booked: Devansh Roy (IIT Delhi)',
      'Scheduled peer mock for Today 6:00 PM on LeetCode Medium Graphs'
    );

    expect(res.id).toBeDefined();
    expect(demoAdapter.getHelpRequests().length).toBe(countBefore + 1);
  });
});
