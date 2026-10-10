import { StudentProfile, StudentSkill, RoadmapTask, StudentTaskProgress, SmartRecommendation } from '../../types';

export class RecommendationEngine {
  public generateRecommendations(
    profile: StudentProfile,
    skills: StudentSkill[],
    tasks: RoadmapTask[],
    progress: Record<string, StudentTaskProgress>
  ): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // 1. Check Prerequisite Gaps
    const uncompletedTasks = tasks.filter(t => !progress[t.id] || progress[t.id].status !== 'completed');
    
    uncompletedTasks.forEach(task => {
      if (task.prerequisite_skills && task.prerequisite_skills.length > 0) {
        const missingPrereqs = task.prerequisite_skills.filter(pId => !progress[pId] || progress[pId].status !== 'completed');
        
        if (missingPrereqs.length > 0 && progress[task.id]?.status === 'in_progress') {
          const prereqTask = tasks.find(t => t.id === missingPrereqs[0]);
          recommendations.push({
            id: `rec_prereq_${task.id}`,
            title: `Prerequisite Gap: ${task.title}`,
            message: `You started "${task.title}", but haven't completed its foundation "${prereqTask?.title || 'Fundamentals'}". Resolving this gap prevents downstream coding bottlenecks.`,
            type: 'prerequisite_missing',
            target_task_id: prereqTask?.id || task.id,
            action_text: `Switch to Prerequisite`,
            action_link: `/roadmap?task=${prereqTask?.id}`,
            category: 'dsa',
            severity: 'critical',
            impactScore: 8,
            rootCause: `Attempting advanced topic without completing prerequisite "${prereqTask?.title || 'Basics'}".`,
            solutionSteps: [
              `Step 1: Open "${prereqTask?.title || 'Prerequisite'}" and review core Time/Space complexity.`,
              `Step 2: Solve 3 basic implementation patterns in the Live Code Sandbox.`,
              `Step 3: Mark prerequisite complete to unlock higher-tier milestone.`
            ],
            quickFixAction: `Auto-Complete Prerequisite`,
            modalTarget: 'live_sandbox'
          });
        }
      }
    });

    // 2. Skill Gap vs Target Job Role
    const lowScoringSkills = skills.filter(s => s.assessment_score !== null && (s.assessment_score || 0) < 70);
    if (lowScoringSkills.length > 0) {
      const skill = lowScoringSkills[0];
      recommendations.push({
        id: `rec_skill_${skill.id}`,
        title: `Skill Score Deficit: ${skill.skill_name}`,
        message: `Your assessment score in ${skill.skill_name} is currently ${skill.assessment_score}%. Target Tier-1 cutoff is 75%+.`,
        type: 'skill_gap',
        action_text: `Take Revision Quiz`,
        action_link: `/assessments`,
        category: 'dsa',
        severity: 'high',
        impactScore: 10,
        rootCause: `Benchmark assessment identified retention gaps in ${skill.skill_name} core principles.`,
        solutionSteps: [
          `Step 1: Review 15 high-yield revision flashcards for ${skill.skill_name}.`,
          `Step 2: Practice 2 LeetCode Medium problems focusing on weak sub-patterns.`,
          `Step 3: Retake the 5-minute domain quiz to elevate score above 75%.`
        ],
        quickFixAction: `Launch Revision Flashcards`,
        modalTarget: 'flashcards'
      });
    }

    // 3. Weekly Hours vs Semester Load
    if (profile.weekly_hours < 12) {
      recommendations.push({
        id: `rec_hours`,
        title: `Pacing Adjustment Warning: ${profile.weekly_hours}h/week`,
        message: `You allocated ${profile.weekly_hours} hours/week. Semester ${profile.current_semester} requires ~15 hours/week for optimal placement readiness.`,
        type: 'behind_schedule',
        action_text: `Update Profile Hours`,
        action_link: `/settings`,
        category: 'schedule',
        severity: 'medium',
        impactScore: 6,
        rootCause: `Study schedule allocation is below semester pacing threshold, creating milestone lag.`,
        solutionSteps: [
          `Step 1: Launch AI Roadmap Optimizer to re-balance weekly milestone pacing.`,
          `Step 2: Reserve two 1.5-hour evening focus blocks on Monday and Wednesday.`,
          `Step 3: Update target hours in Settings to automatically adjust deadline projections.`
        ],
        quickFixAction: `Re-Balance Hours to 15h`,
        modalTarget: 'roadmap_optimizer'
      });
    }

    // 4. Project Readiness Milestone
    const completedTaskCount = Object.values(progress).filter(p => p.status === 'completed').length;
    if (completedTaskCount >= 4) {
      recommendations.push({
        id: `rec_project_ready`,
        title: `Ready for Full-Stack Capstone Building!`,
        message: `Great milestone! You've completed core foundational tasks. You are ready to build and submit your next Full-Stack Capstone Project.`,
        type: 'project_ready',
        action_text: `Explore Projects`,
        action_link: `/projects`,
        category: 'project',
        severity: 'medium',
        impactScore: 15,
        rootCause: `Core foundational curriculum completed; real-world architecture deployment needed.`,
        solutionSteps: [
          `Step 1: Choose a Full-Stack Capstone (e.g. Distributed Task Scheduler with Kafka).`,
          `Step 2: Draft system architecture using the AI Whiteboard Designer.`,
          `Step 3: Deploy to Vercel/Docker and submit GitHub repo for faculty review.`
        ],
        quickFixAction: `Open Architecture Whiteboard`,
        modalTarget: 'whiteboard'
      });
    }

    // 5. ATS Resume Keyword Gap Solution
    recommendations.push({
      id: `rec_ats_gap`,
      title: `ATS Resume Keyword Optimization Gap`,
      message: `Your resume currently matches 78% of Fortune 500 SDE schemas. Adding microservices and cloud keywords can boost match to 92%+.`,
      type: 'placement_tip',
      action_text: `Scan Resume ATS`,
      action_link: `/placement`,
      category: 'resume',
      severity: 'high',
      impactScore: 12,
      rootCause: `Resume bullet points lack quantifiable STAR impact metrics and target recruiter keywords.`,
      solutionSteps: [
        `Step 1: Scan current resume using ATS Resume Scanner to detect missing keywords.`,
        `Step 2: Insert 4 verified keywords (PostgreSQL, Docker, Kafka, System Design).`,
        `Step 3: Export ATS-compliant v4.2 PDF from AI Resume Builder.`
      ],
      quickFixAction: `Auto-Scan Resume Keywords`,
      modalTarget: 'ats_scanner'
    });

    // 6. Placement Preparation & Eligibility Boost
    if (profile.placement_readiness_score < 80) {
      recommendations.push({
        id: `rec_placement_tip`,
        title: `Placement Drive Cutoff Gap (${profile.placement_readiness_score}% / 80%)`,
        message: `Tier-1 drives from Google, Atlassian, and Swiggy require an 80%+ readiness score. You are currently ${80 - profile.placement_readiness_score}% points away.`,
        type: 'placement_tip',
        action_text: `Go to Placement Tracker`,
        action_link: `/placement`,
        category: 'placement',
        severity: 'high',
        impactScore: 14,
        rootCause: `Readiness score is below corporate partner direct application threshold.`,
        solutionSteps: [
          `Step 1: Take Placement Benchmark Exam to identify specific weak question domains.`,
          `Step 2: Request faculty skill verification for verified capstone projects.`,
          `Step 3: Activate Autonomous Placement Agent to auto-apply once 80% threshold is reached.`
        ],
        quickFixAction: `Take Benchmark Exam`,
        modalTarget: 'placement_exam'
      });
    }

    // 7. Behavioral HR & Leadership Interview Readiness
    recommendations.push({
      id: `rec_star_prep`,
      title: `Behavioral HR & STAR Interview Preparation`,
      message: `Technical rounds assess code, but hiring manager rounds filter on STAR behavioral stories (Situation, Task, Action, Result).`,
      type: 'placement_tip',
      action_text: `Build STAR Stories`,
      action_link: `/placement`,
      category: 'interview',
      severity: 'medium',
      impactScore: 9,
      rootCause: `Students often fail final HR rounds due to unpracticed behavioral storytelling.`,
      solutionSteps: [
        `Step 1: Select common prompt: "Tell me about a difficult bug you resolved".`,
        `Step 2: Use STAR Story Builder to structure your response with measurable outcomes.`,
        `Step 3: Practice answering in the AI Speech Analyzer to calibrate WPM and clarity.`
      ],
      quickFixAction: `Launch STAR Story Builder`,
      modalTarget: 'star_builder'
    });

    return recommendations;
  }
}

export const recommendationEngine = new RecommendationEngine();
