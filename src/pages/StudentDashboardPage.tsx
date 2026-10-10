import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { appConfig } from '../config/appConfig';
import { dataService } from '../services/api/dataService';
import { recommendationEngine } from '../services/recommendations/recommendationEngine';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { AICareerChatbotModal } from '../components/features/AICareerChatbotModal';
import { ATSResumeScannerModal } from '../components/features/ATSResumeScannerModal';
import { WeeklyStudyPlannerModal } from '../components/features/WeeklyStudyPlannerModal';
import { PeerLeaderboardModal } from '../components/features/PeerLeaderboardModal';
import { ResumeBuilderModal } from '../components/features/ResumeBuilderModal';
import { PlacementDriveMatcherModal } from '../components/features/PlacementDriveMatcherModal';
import { PeerCodeReviewModal } from '../components/features/PeerCodeReviewModal';
import { PlacementBenchmarkExamModal } from '../components/features/PlacementBenchmarkExamModal';
import { RoadmapOptimizerModal } from '../components/features/RoadmapOptimizerModal';
import { AlumniNetworkModal } from '../components/features/AlumniNetworkModal';
import { DailySkillChallengeModal } from '../components/features/DailySkillChallengeModal';
import { FacultyAnalyticsModal } from '../components/features/FacultyAnalyticsModal';
import { PortfolioGeneratorModal } from '../components/features/PortfolioGeneratorModal';
import { PlacementSchedulerModal } from '../components/features/PlacementSchedulerModal';
import { HackathonIdeaGeneratorModal } from '../components/features/HackathonIdeaGeneratorModal';
import { CredentialVerifierModal } from '../components/features/CredentialVerifierModal';
import { LiveCodeSandboxModal } from '../components/features/LiveCodeSandboxModal';
import { VideoPitchStudioModal } from '../components/features/VideoPitchStudioModal';
import { BatchNotificationAutomatorModal } from '../components/features/BatchNotificationAutomatorModal';
import { HigherEducationExplorerModal } from '../components/features/HigherEducationExplorerModal';
import { WhiteboardDesignerModal } from '../components/features/WhiteboardDesignerModal';
import { LinkedInOptimizerModal } from '../components/features/LinkedInOptimizerModal';
import { InterviewFlashcardsModal } from '../components/features/InterviewFlashcardsModal';
import { HackathonJudgePanelModal } from '../components/features/HackathonJudgePanelModal';
import { STARStoryBuilderModal } from '../components/features/STARStoryBuilderModal';
import { SalaryNegotiatorModal } from '../components/features/SalaryNegotiatorModal';
import { MarketDemandRadarModal } from '../components/features/MarketDemandRadarModal';
import { ReferralBroadcasterModal } from '../components/features/ReferralBroadcasterModal';
import { AutonomousPlacementAgentModal } from '../components/features/AutonomousPlacementAgentModal';
import { SystemDesignSimulatorModal } from '../components/features/SystemDesignSimulatorModal';
import { HRCandidateBookingModal } from '../components/features/HRCandidateBookingModal';
import { AccreditationAnalyticsModal } from '../components/features/AccreditationAnalyticsModal';
import { MultiAgentCareerTaskForceModal } from '../components/features/MultiAgentCareerTaskForceModal';
import { SpeechInterviewAnalyzerModal } from '../components/features/SpeechInterviewAnalyzerModal';
import { PlacementOfficerCommandCenterModal } from '../components/features/PlacementOfficerCommandCenterModal';
import { HackathonPitchStudioModal } from '../components/features/HackathonPitchStudioModal';
import { ColdEmailGeneratorModal } from '../components/features/ColdEmailGeneratorModal';
import { GlobalVisaExplorerModal } from '../components/features/GlobalVisaExplorerModal';
import { PeerInterviewNetworkModal } from '../components/features/PeerInterviewNetworkModal';
import { AICareerCopilotInspectorModal } from '../components/features/AICareerCopilotInspectorModal';
import { CampusTenantSwitcherModal } from '../components/features/CampusTenantSwitcherModal';
import { SecurityAuditConsoleModal } from '../components/features/SecurityAuditConsoleModal';
import { CICDPipelineSimulatorModal } from '../components/features/CICDPipelineSimulatorModal';
import { DeanExecutiveDashboardModal } from '../components/features/DeanExecutiveDashboardModal';
import { UXDesign2026Showcase } from '../components/features/UXDesign2026Showcase';
import {
  Sparkles,
  Map,
  CheckSquare2,
  FolderGit2,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  MessageSquare,
  Bot,
  FileText,
  Clock,
  Trophy,
  Building2,
  Code2,
  Briefcase,
  GraduationCap,
  Flame,
  RefreshCw,
  BarChart3,
  Globe,
  Calendar,
  Lightbulb,
  ShieldCheck,
  Terminal,
  Video,
  Send,
  Layers,
  Share2,
  DollarSign,
  Cpu,
  UserCheck,
  Mic,
  Mail,
  Users,
  GitBranch,
  CheckCircle2,
  Zap
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const { user, studentProfile } = useAuth();

  // Modals state for Phase 1 & Phase 4 Upgrades
  const [showChatbot, setShowChatbot] = useState(false);
  const [showATSScanner, setShowATSScanner] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Phase 4 Modals State
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [showPlacementDrives, setShowPlacementDrives] = useState(false);
  const [showPeerReview, setShowPeerReview] = useState(false);
  const [showBenchmarkExam, setShowBenchmarkExam] = useState(false);

  // Phase 5 Modals State
  const [showRoadmapOptimizer, setShowRoadmapOptimizer] = useState(false);
  const [showAlumniNetwork, setShowAlumniNetwork] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [showFacultyAnalytics, setShowFacultyAnalytics] = useState(false);

  // Phase 6 Modals State
  const [showPortfolioGen, setShowPortfolioGen] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showHackathonIdeas, setShowHackathonIdeas] = useState(false);
  const [showCredentialVerifier, setShowCredentialVerifier] = useState(false);

  // Phase 7 Modals State
  const [showCodeSandbox, setShowCodeSandbox] = useState(false);
  const [showVideoPitch, setShowVideoPitch] = useState(false);
  const [showBatchBroadcast, setShowBatchBroadcast] = useState(false);
  const [showHigherEdu, setShowHigherEdu] = useState(false);

  // Phase 8 Modals State
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showLinkedInOpt, setShowLinkedInOpt] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showJudgePanel, setShowJudgePanel] = useState(false);

  // Phase 9 Modals State
  const [showSTARBuilder, setShowSTARBuilder] = useState(false);
  const [showSalaryNegotiator, setShowSalaryNegotiator] = useState(false);
  const [showMarketDemand, setShowMarketDemand] = useState(false);
  const [showReferralBoard, setShowReferralBoard] = useState(false);

  // Phase 10 Modals State
  const [showAutonomousAgent, setShowAutonomousAgent] = useState(false);
  const [showSystemDesignSim, setShowSystemDesignSim] = useState(false);
  const [showHRCandidateBooking, setShowHRCandidateBooking] = useState(false);
  const [showAccreditationAnalytics, setShowAccreditationAnalytics] = useState(false);

  // Phase 11 Modals State
  const [showTaskForce, setShowTaskForce] = useState(false);
  const [showSpeechInterview, setShowSpeechInterview] = useState(false);
  const [showPlacementOfficer, setShowPlacementOfficer] = useState(false);
  const [showPitchStudio, setShowPitchStudio] = useState(false);

  // Phase 12 Modals State
  const [showColdEmail, setShowColdEmail] = useState(false);
  const [showGlobalVisa, setShowGlobalVisa] = useState(false);
  const [showPeerNetwork, setShowPeerNetwork] = useState(false);
  const [showCopilotInspector, setShowCopilotInspector] = useState(false);

  // Phase 13 Modals State
  const [showCampusTenant, setShowCampusTenant] = useState(false);
  const [showSecurityAudit, setShowSecurityAudit] = useState(false);
  const [showCICDPipeline, setShowCICDPipeline] = useState(false);
  const [showDeanExecutive, setShowDeanExecutive] = useState(false);

  // Career Problem Resolution Center State
  const [resolvedProblems, setResolvedProblems] = useState<string[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [quickFixToast, setQuickFixToast] = useState<string | null>(null);

  const handleApplyQuickFix = (rec: any) => {
    setResolvedProblems(prev => Array.from(new Set([...prev, rec.id])));
    if (rec.id === 'rec_hours') {
      dataService.updateStudentProfile({ weekly_hours: 15 });
    } else if (rec.type === 'prerequisite_missing' && rec.target_task_id) {
      dataService.updateTaskStatus(rec.target_task_id, 'completed', 'Auto-resolved foundation prerequisite via AI Quick-Fix');
    }
    setQuickFixToast(`✅ Successfully applied fix for "${rec.title}"! (+${rec.impactScore || 8} points readiness boost applied)`);
    setTimeout(() => setQuickFixToast(null), 4000);
  };

  const handleOpenSolverModal = (modalTarget?: string) => {
    if (modalTarget === 'live_sandbox') setShowCodeSandbox(true);
    else if (modalTarget === 'flashcards') setShowFlashcards(true);
    else if (modalTarget === 'roadmap_optimizer') setShowRoadmapOptimizer(true);
    else if (modalTarget === 'whiteboard') setShowWhiteboard(true);
    else if (modalTarget === 'ats_scanner') setShowATSScanner(true);
    else if (modalTarget === 'placement_exam') setShowBenchmarkExam(true);
    else if (modalTarget === 'star_builder') setShowSTARBuilder(true);
    else if (modalTarget === 'placement_agent') setShowAutonomousAgent(true);
    else setShowChatbot(true);
  };

  const tasks = dataService.getRoadmapTasks();
  const progress = dataService.getStudentTaskProgress();
  const skills = dataService.getStudentSkills();
  const submissions = dataService.getProjectSubmissions(user.id);
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  
  const recommendations = recommendationEngine.generateRecommendations(
    studentProfile,
    skills,
    tasks,
    progress
  );

  const filteredRecommendations = recommendations.filter(rec => {
    if (selectedCategoryFilter === 'all') return true;
    if (selectedCategoryFilter === 'dsa') return rec.category === 'dsa';
    if (selectedCategoryFilter === 'resume') return rec.category === 'resume';
    if (selectedCategoryFilter === 'project') return rec.category === 'project';
    if (selectedCategoryFilter === 'schedule') return rec.category === 'schedule';
    if (selectedCategoryFilter === 'placement') return rec.category === 'placement' || rec.category === 'interview';
    return true;
  });

  const completedCount = Object.values(progress).filter(p => p.status === 'completed').length;
  const inProgressCount = Object.values(progress).filter(p => p.status === 'in_progress').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Welcome Hero Banner (2026 Obsidian-Violet Edition) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#170e3b] via-[#100a2b] to-[#1e104b] border border-purple-500/25 p-6 sm:p-8 shadow-xl shadow-purple-950/40 backdrop-blur-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/15 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Target Role: {targetRole?.title || 'Software Developer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
              Welcome Back, {user.full_name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl leading-relaxed">
              Semester {studentProfile.current_semester} • {studentProfile.branch.toUpperCase()} Engineering • {studentProfile.weekly_hours} Hours/Week Pacing
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowChatbot(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-500 hover:brightness-110 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-purple-500/30"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Career Coach</span>
            </button>
            <button
              onClick={() => setShowATSScanner(true)}
              className="px-4 py-2.5 rounded-xl bg-[#1d1445]/80 hover:bg-[#281c5f] text-purple-200 border border-purple-400/30 font-bold text-xs transition flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4 text-purple-300" />
              <span>ATS Resume Scanner</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2026 UI/UX DESIGN SYSTEM CENTERPIECE (Pinterest Reference Showcase) */}
      <UXDesign2026Showcase
        placementScore={studentProfile.placement_readiness_score}
        completedTasksCount={completedCount}
        totalTasksCount={tasks.length}
        onOpenModal={handleOpenSolverModal}
      />

      {/* PHASE 1 NEW UPGRADE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowChatbot(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">AI Career Coach</div>
            <div className="text-[10px] text-slate-400">Personalized Advice</div>
          </div>
        </button>

        <button
          onClick={() => setShowATSScanner(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">ATS Resume Match</div>
            <div className="text-[10px] text-slate-400">Keyword Gap Scanner</div>
          </div>
        </button>

        <button
          onClick={() => setShowPlanner(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Study Timetable</div>
            <div className="text-[10px] text-slate-400">Interactive Pacing</div>
          </div>
        </button>

        <button
          onClick={() => setShowLeaderboard(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Peer Standings</div>
            <div className="text-[10px] text-slate-400">Class Leaderboard</div>
          </div>
        </button>
      </div>

      {/* PHASE 4 NEW ENTERPRISE SUITE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowResumeBuilder(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">AI Resume Builder</div>
            <div className="text-[10px] text-slate-400">Live Preview & PDF</div>
          </div>
        </button>

        <button
          onClick={() => setShowPlacementDrives(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Placement Drives</div>
            <div className="text-[10px] text-slate-400">Eligibility Matrix</div>
          </div>
        </button>

        <button
          onClick={() => setShowPeerReview(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Peer Code Review</div>
            <div className="text-[10px] text-slate-400">Karma Squad Points</div>
          </div>
        </button>

        <button
          onClick={() => setShowBenchmarkExam(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Placement Exam</div>
            <div className="text-[10px] text-slate-400">Benchmark Simulator</div>
          </div>
        </button>
      </div>

      {/* PHASE 5 NEW ECOSYSTEM INTELLIGENCE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowRoadmapOptimizer(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">AI Roadmap Optimizer</div>
            <div className="text-[10px] text-slate-400">Adaptive Re-Pacing</div>
          </div>
        </button>

        <button
          onClick={() => setShowAlumniNetwork(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Alumni Referral Hub</div>
            <div className="text-[10px] text-slate-400">Mentorship Network</div>
          </div>
        </button>

        <button
          onClick={() => setShowDailyChallenge(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Daily Coding Streak</div>
            <div className="text-[10px] text-slate-400">Micro-Skill Challenges</div>
          </div>
        </button>

        <button
          onClick={() => setShowFacultyAnalytics(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Faculty Gap Matrix</div>
            <div className="text-[10px] text-slate-400">Batch Analytics & Export</div>
          </div>
        </button>
      </div>

      {/* PHASE 6 GLOBAL CAREER ECOSYSTEM TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowPortfolioGen(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Portfolio Generator</div>
            <div className="text-[10px] text-slate-400">1-Click HTML Site</div>
          </div>
        </button>

        <button
          onClick={() => setShowScheduler(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Drive Slot Planner</div>
            <div className="text-[10px] text-slate-400">Recruiter Calendar</div>
          </div>
        </button>

        <button
          onClick={() => setShowHackathonIdeas(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Hackathon Ideas</div>
            <div className="text-[10px] text-slate-400">Project Blueprints</div>
          </div>
        </button>

        <button
          onClick={() => setShowCredentialVerifier(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Digital Credential</div>
            <div className="text-[10px] text-slate-400">Verified Certificate</div>
          </div>
        </button>
      </div>

      {/* PHASE 7 INSTITUTIONAL EXCELLENCE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowCodeSandbox(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Live Code Sandbox</div>
            <div className="text-[10px] text-slate-400">Pair Programmer</div>
          </div>
        </button>

        <button
          onClick={() => setShowVideoPitch(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Video Pitch Studio</div>
            <div className="text-[10px] text-slate-400">Teleprompter Assistant</div>
          </div>
        </button>

        <button
          onClick={() => setShowBatchBroadcast(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Batch Broadcaster</div>
            <div className="text-[10px] text-slate-400">Automated Messaging</div>
          </div>
        </button>

        <button
          onClick={() => setShowHigherEdu(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Higher Education</div>
            <div className="text-[10px] text-slate-400">GATE & MS Explorer</div>
          </div>
        </button>
      </div>

      {/* PHASE 8 ULTIMATE HACKATHON MASTERPIECE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowWhiteboard(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">AI Whiteboard</div>
            <div className="text-[10px] text-slate-400">System Designer</div>
          </div>
        </button>

        <button
          onClick={() => setShowLinkedInOpt(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">LinkedIn Optimizer</div>
            <div className="text-[10px] text-slate-400">Recruiter Headline</div>
          </div>
        </button>

        <button
          onClick={() => setShowFlashcards(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">CS Flashcards</div>
            <div className="text-[10px] text-slate-400">Revision Deck</div>
          </div>
        </button>

        <button
          onClick={() => setShowJudgePanel(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">System Audit Panel</div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">Production Metrics</div>
          </div>
        </button>
      </div>

      {/* PHASE 9 GLOBAL ECOSYSTEM INTELLIGENCE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowSTARBuilder(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">STAR Story Builder</div>
            <div className="text-[10px] text-slate-400">Behavioral HR Wizard</div>
          </div>
        </button>

        <button
          onClick={() => setShowSalaryNegotiator(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Salary Negotiator</div>
            <div className="text-[10px] text-slate-400">Offer Counter-Email</div>
          </div>
        </button>

        <button
          onClick={() => setShowMarketDemand(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Market Skill Radar</div>
            <div className="text-[10px] text-slate-400">Tech Hiring Index</div>
          </div>
        </button>

        <button
          onClick={() => setShowReferralBoard(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Referral Board</div>
            <div className="text-[10px] text-slate-400">Internal Job Routing</div>
          </div>
        </button>
      </div>

      {/* PHASE 10 AUTONOMOUS PLACEMENT AGENT & ENTERPRISE INTEGRATION TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowAutonomousAgent(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Autonomous Agent</div>
            <div className="text-[10px] text-slate-400">Auto-Apply Bot Engine</div>
          </div>
        </button>

        <button
          onClick={() => setShowSystemDesignSim(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">System Design Sim</div>
            <div className="text-[10px] text-slate-400">p99 & Load Balancer</div>
          </div>
        </button>

        <button
          onClick={() => setShowHRCandidateBooking(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">HR Booking Portal</div>
            <div className="text-[10px] text-slate-400">Direct Recruiter Hiring</div>
          </div>
        </button>

        <button
          onClick={() => setShowAccreditationAnalytics(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">NBA / NAAC OBE</div>
            <div className="text-[10px] text-slate-400">Accreditation Analytics</div>
          </div>
        </button>
      </div>

      {/* PHASE 11 ULTIMATE HACKATHON GRAND FINALE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowTaskForce(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Agent Task Force</div>
            <div className="text-[10px] text-slate-400">4-Agent Swarm</div>
          </div>
        </button>

        <button
          onClick={() => setShowSpeechInterview(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Speech Analyzer</div>
            <div className="text-[10px] text-slate-400">Voice Mock AI</div>
          </div>
        </button>

        <button
          onClick={() => setShowPlacementOfficer(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">TPO Command Center</div>
            <div className="text-[10px] text-slate-400">Placement Officer Portal</div>
          </div>
        </button>

        <button
          onClick={() => setShowPitchStudio(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Hackathon Pitch Studio</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Grand Finale Deck</div>
          </div>
        </button>
      </div>

      {/* PHASE 12 NEXT-GEN CAREER COPILOT & GLOBAL SCALE TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowColdEmail(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">AI Cold Emailer</div>
            <div className="text-[10px] text-slate-400">Recruiter Outreach</div>
          </div>
        </button>

        <button
          onClick={() => setShowGlobalVisa(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Global Visa Explorer</div>
            <div className="text-[10px] text-slate-400">International Tech Mobility</div>
          </div>
        </button>

        <button
          onClick={() => setShowPeerNetwork(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Peer Mock Network</div>
            <div className="text-[10px] text-slate-400">Inter-College Match</div>
          </div>
        </button>

        <button
          onClick={() => setShowCopilotInspector(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Copilot Inspector</div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">NLP Diagnostic Telemetry</div>
          </div>
        </button>
      </div>

      {/* PHASE 13 ENTERPRISE MULTI-TENANT CAMPUS OS TOOLBAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowCampusTenant(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Campus Tenant OS</div>
            <div className="text-[10px] text-slate-400">White-Label Branding</div>
          </div>
        </button>

        <button
          onClick={() => setShowSecurityAudit(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">SOC-2 Security Audit</div>
            <div className="text-[10px] text-slate-400">RLS & RBAC Telemetry</div>
          </div>
        </button>

        <button
          onClick={() => setShowCICDPipeline(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">CI/CD Code Pipeline</div>
            <div className="text-[10px] text-slate-400">Automated Vitest & Snyk</div>
          </div>
        </button>

        <button
          onClick={() => setShowDeanExecutive(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 text-left transition flex items-center gap-3 group shadow-sm"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Dean Executive View</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Board Briefing & NIRF</div>
          </div>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => setShowBenchmarkExam(true)} className="cursor-pointer group">
          <Card hoverEffect className="space-y-3 group-hover:border-teal-500/50 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Placement Readiness</span>
              <TrendingUp className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {studentProfile.placement_readiness_score}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <ProgressBar value={studentProfile.placement_readiness_score} color="teal" showLabel={false} />
            <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold group-hover:underline flex items-center justify-between">
              <span>Based on tasks & exam.</span>
              <span>Launch Exam →</span>
            </p>
          </Card>
        </div>

        <div onClick={() => setShowRoadmapOptimizer(true)} className="cursor-pointer group">
          <Card hoverEffect className="space-y-3 group-hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Completed Milestones</span>
              <CheckSquare2 className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {completedCount}
              </span>
              <span className="text-xs text-slate-400">/ {tasks.length} Tasks</span>
            </div>
            <ProgressBar value={Math.round((completedCount / tasks.length) * 100)} color="emerald" showLabel={false} />
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline flex items-center justify-between">
              <span>{inProgressCount} in progress.</span>
              <span>Re-Optimize →</span>
            </p>
          </Card>
        </div>

        <div onClick={() => setShowPortfolioGen(true)} className="cursor-pointer group">
          <Card hoverEffect className="space-y-3 group-hover:border-indigo-500/50 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Verified Projects</span>
              <FolderGit2 className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {submissions.filter(s => s.status === 'approved').length}
              </span>
              <span className="text-xs text-slate-400">Approved</span>
            </div>
            <div className="flex gap-1">
              {submissions.map((_, i) => (
                <span key={i} className="h-2 flex-1 rounded bg-indigo-500"></span>
              ))}
            </div>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline flex items-center justify-between">
              <span>Mentor verified.</span>
              <span>View Site →</span>
            </p>
          </Card>
        </div>

        <div onClick={() => setShowCredentialVerifier(true)} className="cursor-pointer group">
          <Card hoverEffect className="space-y-3 group-hover:border-amber-500/50 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Verified Skills</span>
              <Award className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {skills.filter(s => s.teacher_verified).length}
              </span>
              <span className="text-xs text-slate-400">/ {skills.length} Badges</span>
            </div>
            <ProgressBar value={Math.round((skills.filter(s => s.teacher_verified).length / skills.length) * 100)} color="amber" showLabel={false} />
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold group-hover:underline flex items-center justify-between">
              <span>Dr. Vikram Sethi verified.</span>
              <span>View Badge →</span>
            </p>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-teal-500/20 shadow-md">
            {/* Header with Title and Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Career Obstacle Diagnosis & Step-by-Step Resolution Center
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      AI Diagnostics Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pinpointing academic & placement blockers with actionable 3-step practical roadmaps
                  </p>
                </div>
              </div>

              {/* Resolution Stats Counter */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resolved Obstacles</div>
                  <div className="text-xs font-extrabold text-teal-600 dark:text-teal-400">
                    {resolvedProblems.length} / {recommendations.length} Solved
                  </div>
                </div>
                <div className="w-16">
                  <ProgressBar
                    value={Math.round((resolvedProblems.length / Math.max(1, recommendations.length)) * 100)}
                    color="teal"
                    showLabel={false}
                  />
                </div>
              </div>
            </div>

            {/* Quick-Fix Feedback Toast Alert */}
            {quickFixToast && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{quickFixToast}</span>
                </div>
                <button
                  onClick={() => setQuickFixToast(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Interactive Domain Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mt-4 pb-2 border-b border-slate-100 dark:border-slate-800/60">
              {[
                { id: 'all', label: 'All Obstacles', count: recommendations.length },
                { id: 'dsa', label: 'DSA & Coding Gaps', count: recommendations.filter(r => r.category === 'dsa').length },
                { id: 'resume', label: 'Resume & ATS', count: recommendations.filter(r => r.category === 'resume').length },
                { id: 'project', label: 'Capstone Projects', count: recommendations.filter(r => r.category === 'project').length },
                { id: 'schedule', label: 'Study Pacing', count: recommendations.filter(r => r.category === 'schedule').length },
                { id: 'placement', label: 'Placement & HR', count: recommendations.filter(r => r.category === 'placement' || r.category === 'interview').length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedCategoryFilter === tab.id
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    selectedCategoryFilter === tab.id ? 'bg-teal-600/40 text-slate-950 font-extrabold' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Structured Problem Resolution Cards */}
            <div className="space-y-4 mt-4">
              {filteredRecommendations.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No obstacles found in this category!</p>
                  <p className="text-xs text-slate-400 mt-1">You are on track with your milestone targets.</p>
                </div>
              ) : (
                filteredRecommendations.map(rec => {
                  const isResolved = resolvedProblems.includes(rec.id);
                  const severityBadge = rec.severity === 'critical' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      CRITICAL BLOCKER
                    </span>
                  ) : rec.severity === 'high' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      HIGH PRIORITY
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      OPTIMIZATION
                    </span>
                  );

                  return (
                    <div
                      key={rec.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition ${
                        isResolved
                          ? 'bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/30'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:border-teal-500/40'
                      }`}
                    >
                      {/* Top Badges & Title */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {severityBadge}
                          {rec.impactScore && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                              +{rec.impactScore}% Readiness Potential
                            </span>
                          )}
                          {isResolved && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              RESOLVED
                            </span>
                          )}
                        </div>

                        {rec.category && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            Domain: {rec.category}
                          </span>
                        )}
                      </div>

                      {/* Problem Header */}
                      <div className="mt-1 space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <AlertCircle className={`w-4 h-4 shrink-0 ${isResolved ? 'text-emerald-500' : 'text-teal-500'}`} />
                          <span>{rec.title}</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {rec.message}
                        </p>
                      </div>

                      {/* Root Cause Diagnosis */}
                      {rec.rootCause && (
                        <div className="mt-3 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/50">
                          <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <span>🔍 Root Cause Diagnosis:</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                            {rec.rootCause}
                          </p>
                        </div>
                      )}

                      {/* 3-Step Practical Solution Plan */}
                      {rec.solutionSteps && rec.solutionSteps.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" />
                            <span>Structured 3-Step Resolution Plan:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {rec.solutionSteps.map((step, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex flex-col justify-between"
                              >
                                <span className="font-semibold">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dual Interactive Resolution Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* 1-Click AI Quick-Fix Button */}
                          <button
                            onClick={() => handleApplyQuickFix(rec)}
                            disabled={isResolved}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                              isResolved
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-default'
                                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>
                              {isResolved ? 'Quick-Fix Applied ✓' : `1-Click AI Fix: ${rec.quickFixAction || 'Resolve Roadblock'}`}
                            </span>
                          </button>

                          {/* Dedicated Solver Tool Launcher */}
                          <button
                            onClick={() => handleOpenSolverModal(rec.modalTarget)}
                            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                            <span>Launch Dedicated Solver Tool</span>
                          </button>
                        </div>

                        {/* Standard Navigation Link */}
                        {rec.action_link && (
                          <Link
                            to={rec.action_link}
                            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                          >
                            <span>{rec.action_text}</span>
                            <span>→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-teal-500" />
                <span>Semester 5 Active Milestones</span>
              </h3>
              <Link to="/roadmap" className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
                Open Full Roadmap
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {tasks.filter(t => t.semester === 5).map(task => {
                const p = progress[task.id];
                const status = p?.status || 'not_started';
                return (
                  <div key={task.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{task.title}</span>
                        <Badge variant={status === 'completed' ? 'success' : status === 'in_progress' ? 'info' : 'neutral'}>
                          {status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{task.description}</p>
                    </div>
                    <Link
                      to="/roadmap"
                      className="text-xs font-semibold text-slate-400 hover:text-teal-500 transition"
                    >
                      Update
                    </Link>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <span>Mentor Feedback</span>
            </h3>

            <div className="mt-4 space-y-4">
              {submissions.map(sub => (
                <div key={sub.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{sub.project_title}</span>
                    <Badge variant={sub.status === 'approved' ? 'success' : 'warning'}>{sub.status}</Badge>
                  </div>
                  {sub.teacher_feedback && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white dark:bg-navy-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      "{sub.teacher_feedback}"
                    </p>
                  )}
                  <div className="text-[10px] text-slate-400 text-right">Dr. Vikram Sethi • Senior HOD</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="text-center space-y-3 bg-gradient-to-br from-teal-900/10 to-indigo-900/10 border-teal-500/20">
            <BookOpen className="w-8 h-8 text-teal-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Need Mentor Support?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Stuck on a roadmap prerequisite or project bug? Request one-on-one guidance.
            </p>
            <Link
              to="/notifications"
              className="inline-block w-full py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
            >
              Ask Teacher for Help
            </Link>
          </Card>
        </div>
      </div>

      {/* ALL FEATURE UPGRADE MODALS (PHASE 1 THROUGH PHASE 9) */}
      <AICareerChatbotModal isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
      <ATSResumeScannerModal isOpen={showATSScanner} onClose={() => setShowATSScanner(false)} />
      <WeeklyStudyPlannerModal isOpen={showPlanner} onClose={() => setShowPlanner(false)} />
      <PeerLeaderboardModal isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
      <ResumeBuilderModal isOpen={showResumeBuilder} onClose={() => setShowResumeBuilder(false)} />
      <PlacementDriveMatcherModal isOpen={showPlacementDrives} onClose={() => setShowPlacementDrives(false)} />
      <PeerCodeReviewModal isOpen={showPeerReview} onClose={() => setShowPeerReview(false)} />
      <PlacementBenchmarkExamModal isOpen={showBenchmarkExam} onClose={() => setShowBenchmarkExam(false)} />
      <RoadmapOptimizerModal isOpen={showRoadmapOptimizer} onClose={() => setShowRoadmapOptimizer(false)} />
      <AlumniNetworkModal isOpen={showAlumniNetwork} onClose={() => setShowAlumniNetwork(false)} />
      <DailySkillChallengeModal isOpen={showDailyChallenge} onClose={() => setShowDailyChallenge(false)} />
      <FacultyAnalyticsModal isOpen={showFacultyAnalytics} onClose={() => setShowFacultyAnalytics(false)} />
      <PortfolioGeneratorModal isOpen={showPortfolioGen} onClose={() => setShowPortfolioGen(false)} />
      <PlacementSchedulerModal isOpen={showScheduler} onClose={() => setShowScheduler(false)} />
      <HackathonIdeaGeneratorModal isOpen={showHackathonIdeas} onClose={() => setShowHackathonIdeas(false)} />
      <CredentialVerifierModal isOpen={showCredentialVerifier} onClose={() => setShowCredentialVerifier(false)} />
      <LiveCodeSandboxModal isOpen={showCodeSandbox} onClose={() => setShowCodeSandbox(false)} />
      <VideoPitchStudioModal isOpen={showVideoPitch} onClose={() => setShowVideoPitch(false)} />
      <BatchNotificationAutomatorModal isOpen={showBatchBroadcast} onClose={() => setShowBatchBroadcast(false)} />
      <HigherEducationExplorerModal isOpen={showHigherEdu} onClose={() => setShowHigherEdu(false)} />
      <WhiteboardDesignerModal isOpen={showWhiteboard} onClose={() => setShowWhiteboard(false)} />
      <LinkedInOptimizerModal isOpen={showLinkedInOpt} onClose={() => setShowLinkedInOpt(false)} />
      <InterviewFlashcardsModal isOpen={showFlashcards} onClose={() => setShowFlashcards(false)} />
      <HackathonJudgePanelModal isOpen={showJudgePanel} onClose={() => setShowJudgePanel(false)} />
      <STARStoryBuilderModal isOpen={showSTARBuilder} onClose={() => setShowSTARBuilder(false)} />
      <SalaryNegotiatorModal isOpen={showSalaryNegotiator} onClose={() => setShowSalaryNegotiator(false)} />
      <MarketDemandRadarModal isOpen={showMarketDemand} onClose={() => setShowMarketDemand(false)} />
      <ReferralBroadcasterModal isOpen={showReferralBoard} onClose={() => setShowReferralBoard(false)} />
      <AutonomousPlacementAgentModal isOpen={showAutonomousAgent} onClose={() => setShowAutonomousAgent(false)} />
      <SystemDesignSimulatorModal isOpen={showSystemDesignSim} onClose={() => setShowSystemDesignSim(false)} />
      <HRCandidateBookingModal isOpen={showHRCandidateBooking} onClose={() => setShowHRCandidateBooking(false)} />
      <AccreditationAnalyticsModal isOpen={showAccreditationAnalytics} onClose={() => setShowAccreditationAnalytics(false)} />
      <MultiAgentCareerTaskForceModal isOpen={showTaskForce} onClose={() => setShowTaskForce(false)} />
      <SpeechInterviewAnalyzerModal isOpen={showSpeechInterview} onClose={() => setShowSpeechInterview(false)} />
      <PlacementOfficerCommandCenterModal isOpen={showPlacementOfficer} onClose={() => setShowPlacementOfficer(false)} />
      <HackathonPitchStudioModal isOpen={showPitchStudio} onClose={() => setShowPitchStudio(false)} />
      <ColdEmailGeneratorModal isOpen={showColdEmail} onClose={() => setShowColdEmail(false)} />
      <GlobalVisaExplorerModal isOpen={showGlobalVisa} onClose={() => setShowGlobalVisa(false)} />
      <PeerInterviewNetworkModal isOpen={showPeerNetwork} onClose={() => setShowPeerNetwork(false)} />
      <AICareerCopilotInspectorModal isOpen={showCopilotInspector} onClose={() => setShowCopilotInspector(false)} />
      <CampusTenantSwitcherModal isOpen={showCampusTenant} onClose={() => setShowCampusTenant(false)} />
      <SecurityAuditConsoleModal isOpen={showSecurityAudit} onClose={() => setShowSecurityAudit(false)} />
      <CICDPipelineSimulatorModal isOpen={showCICDPipeline} onClose={() => setShowCICDPipeline(false)} />
      <DeanExecutiveDashboardModal isOpen={showDeanExecutive} onClose={() => setShowDeanExecutive(false)} />
    </div>
  );
};
