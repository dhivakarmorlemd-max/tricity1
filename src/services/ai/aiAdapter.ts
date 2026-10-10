import { StudentProfile } from '../../types';

export interface AIResponse {
  advice: string;
  suggestedTasks: string[];
  confidence: number;
}

export class AIAdapter {
  public async getSmartCareerAdvice(profile: StudentProfile, promptContext?: string): Promise<AIResponse> {
    await new Promise(res => setTimeout(res, 400)); // smooth async responsiveness

    const query = (promptContext || '').toLowerCase().trim();
    const roleName = (profile.target_role_id || 'software_engineer').replace(/_/g, ' ').toUpperCase();
    const branch = profile.branch ? profile.branch.toUpperCase() : 'CSE';

    // 1. Data Structures & Algorithms Intent
    if (
      query.includes('dsa') ||
      query.includes('coding') ||
      query.includes('leetcode') ||
      query.includes('algo') ||
      query.includes('problem') ||
      query.includes('tree') ||
      query.includes('graph') ||
      query.includes('dp')
    ) {
      return {
        advice: `For your ${roleName} target in Semester ${profile.current_semester} (${branch}), focus on mastering core DSA patterns: 1) Two Pointers & Sliding Window, 2) Fast & Slow Pointers, 3) Tree BFS/DFS, and 4) Dynamic Programming. Solve 2-3 LeetCode Mediums daily to boost your readiness score from ${profile.placement_readiness_score}% to 90%+.`,
        suggestedTasks: [
          `Solve 15 LeetCode Mediums on Two Pointers & Binary Search`,
          `Master Tree BFS/DFS level-order traversal patterns`,
          `Implement Graph Dijkstra & Topological Sort algorithms`
        ],
        confidence: 0.96
      };
    }

    // 2. Projects & Portfolio Intent
    if (
      query.includes('project') ||
      query.includes('build') ||
      query.includes('portfolio') ||
      query.includes('react') ||
      query.includes('fullstack') ||
      query.includes('backend') ||
      query.includes('github')
    ) {
      return {
        advice: `To impress recruiters for ${roleName} roles, build an end-to-end full-stack capstone featuring JWT auth, role-based access control (RLS), relational database normalization, and live deployment on Vercel or Docker. Make sure to audit your GitHub repository using our Codebase Analyzer tool!`,
        suggestedTasks: [
          `Build full-stack App with React 19 + TypeScript + Supabase PostgreSQL`,
          `Configure GitHub Actions CI/CD pipeline for automated testing`,
          `Run GitHub Repo Inspector tool to verify code architecture`
        ],
        confidence: 0.95
      };
    }

    // 3. Interview & Placement Preparation Intent
    if (
      query.includes('interview') ||
      query.includes('placement') ||
      query.includes('resume') ||
      query.includes('ats') ||
      query.includes('company') ||
      query.includes('hr') ||
      query.includes('mock')
    ) {
      return {
        advice: `Placement preparation strategy for ${roleName}: 1) Run our ATS Resume Scanner to ensure 85%+ keyword match, 2) Prepare 3 STAR format project stories for HR behavioral rounds, 3) Take our Placement Benchmark Exam simulator to measure your batch percentile rank.`,
        suggestedTasks: [
          `Run ATS Resume Scanner for target ${roleName} job description`,
          `Draft 3 STAR framework behavioral project stories`,
          `Complete 1 timed Placement Benchmark Mock Exam`
        ],
        confidence: 0.97
      };
    }

    // 4. Schedule, Lag & Pacing Intent
    if (
      query.includes('lag') ||
      query.includes('behind') ||
      query.includes('schedule') ||
      query.includes('hours') ||
      query.includes('time') ||
      query.includes('busy') ||
      query.includes('timetable')
    ) {
      return {
        advice: `You are currently devoting ${profile.weekly_hours} study hours/week in Semester ${profile.current_semester}. If you feel behind, launch our AI Roadmap Gap Re-Optimizer tool to automatically re-balance your weekly milestones and prioritize prerequisite bottleneck skills without losing your progress.`,
        suggestedTasks: [
          `Run AI Roadmap Re-Optimizer to re-balance weekly tasks`,
          `Generate a custom timetable using Weekly Study Planner`,
          `Complete daily 5-minute skill booster challenge for streak XP`
        ],
        confidence: 0.94
      };
    }

    // 5. Default Smart Profile Guidance
    return {
      advice: `As a Semester ${profile.current_semester} ${branch} student targeting ${roleName} with a readiness score of ${profile.placement_readiness_score}%, your highest-ROI focus this week is: 1) Completing your active semester roadmap milestones, 2) Verifying technical skills with Dr. Vikram Sethi, and 3) Practicing mock technical interviews.`,
      suggestedTasks: [
        `Complete Semester ${profile.current_semester} active roadmap tasks`,
        `Submit capstone project for mentor verification`,
        `Practice technical interview with Mock Interview Simulator`
      ],
      confidence: 0.93
    };
  }

  public processUserQuery(query: string, profile: StudentProfile): { advice: string; suggestedActions: string[]; confidence: number } {
    const roleName = (profile.target_role_id || 'software_engineer').replace(/_/g, ' ').toUpperCase();
    const branch = profile.branch ? profile.branch.toUpperCase() : 'CSE';

    return {
      advice: `NLP Diagnostic Analysis for query "${query}": Profile evaluated (${branch} Sem ${profile.current_semester}, Target ${roleName}, Readiness ${profile.placement_readiness_score}%). Recommended path: Focus on cloud microservices, distributed system design, and LeetCode Medium problem solving.`,
      suggestedActions: [
        'Study Cloud Distributed Systems Prerequisite',
        'Complete 15 LeetCode Medium Graphs & DP problems',
        'Verify System Architecture skill badge'
      ],
      confidence: 0.98
    };
  }
}

export const aiAdapter = new AIAdapter();
