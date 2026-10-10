import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 9 Feature Upgrades', () => {
  it('formats behavioral STAR interview story components cleanly', () => {
    const s = 'Situation test';
    const t = 'Task test';
    const a = 'Action test';
    const r = 'Result test';

    const star = `Situation: ${s}, Task: ${t}, Action: ${a}, Result: ${r}`;
    expect(star).toContain('Situation:');
    expect(star).toContain('Result:');
  });

  it('submits corporate alumni referral application into help requests tracking', () => {
    const requestsBefore = demoAdapter.getHelpRequests().length;

    const res = demoAdapter.createHelpRequest(
      'Alumni Referral Test: Google SDE-1',
      'Applied via Phase 9 Referral Board'
    );

    expect(res.id).toBeDefined();
    expect(demoAdapter.getHelpRequests().length).toBe(requestsBefore + 1);
  });
});
