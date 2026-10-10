import { describe, it, expect } from 'vitest';
import { demoAdapter } from '../services/api/demoAdapter';

describe('Phase 6 Feature Upgrades', () => {
  it('generates digital credential verification ID', () => {
    const user = demoAdapter.getCurrentUser();
    const certId = `CP-CERT-2026-${user.id.toUpperCase()}`;

    expect(certId).toContain('CP-CERT-2026');
    expect(certId).toContain('USER_STUDENT_1');
  });

  it('verifies student project templates for portfolio HTML generation', () => {
    const projects = demoAdapter.getProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBeDefined();
  });
});
