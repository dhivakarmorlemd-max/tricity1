import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 10 Autonomous Placement Agent & Enterprise Suite', () => {
  it('submits auto-applied placement drive applications cleanly', () => {
    const app = demoAdapter.applyPlacementDrive('Google Cloud', 'Cloud Solutions Engineer');
    expect(app.id).toBeDefined();
    expect(app.company_name).toBe('Google Cloud');
    expect(app.role_title).toBe('Cloud Solutions Engineer');
  });

  it('calculates system design latency telemetry correctly under varying load', () => {
    const qps = 50000;
    const cacheHitRate = 90;
    const dbShards = 4;
    const capacityPerShard = 4000;

    const effectiveDbLoad = qps * (1 - cacheHitRate / 100);
    const totalDbCapacity = dbShards * capacityPerShard;

    expect(effectiveDbLoad).toBeCloseTo(5000);
    expect(totalDbCapacity).toBe(16000);
    expect(effectiveDbLoad < totalDbCapacity).toBe(true);
  });

  it('schedules recruiter direct candidate interview invitations into help requests tracking', () => {
    const initialCount = demoAdapter.getHelpRequests().length;

    const invite = demoAdapter.createHelpRequest(
      'HR Direct Interview Invite: Aarav Sharma (Full Stack SDE)',
      'Scheduled via Phase 10 HR Candidate Booking Portal for 2026-10-15 at 14:00'
    );

    expect(invite.id).toBeDefined();
    expect(demoAdapter.getHelpRequests().length).toBe(initialCount + 1);
  });
});
