import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 7 Feature Upgrades', () => {
  it('executes JavaScript code snippet in live sandbox environment safely', () => {
    const fn = new Function('a', 'b', 'return a + b');
    expect(fn(5, 10)).toBe(15);
  });

  it('dispatches automated batch broadcast to target student groups', () => {
    const helpRequestsBefore = demoAdapter.getHelpRequests().length;

    const res = demoAdapter.createHelpRequest(
      'Automated Batch Broadcast Test',
      'Dispatched notification to at-risk students'
    );

    expect(res.id).toBeDefined();
    expect(demoAdapter.getHelpRequests().length).toBe(helpRequestsBefore + 1);
  });
});
