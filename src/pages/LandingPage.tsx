import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appConfig } from '../config/appConfig';
import { useAuth } from '../providers/AuthContext';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Map,
  Code2,
  Users,
  Target,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleDemoAccess = (userId: string, redirectPath: string) => {
    switchRole(userId);
    navigate(redirectPath);
  };

  return (
    <div className="min-h-screen bg-[#090616] text-white selection:bg-purple-600 selection:text-white font-sans relative overflow-x-hidden">
      {/* 2026 Ambient Radial Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 px-4 py-2 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-md">
        <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
        <span>{appConfig.hackathonBadge} — 2026 UI/UX & End-to-End AI MVP</span>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-purple-500/15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tight font-heading">{appConfig.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-300 hover:text-white transition px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/onboarding"
            className="text-xs font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-500 hover:brightness-110 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-purple-500/30 transition transform hover:-translate-y-0.5"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>Solving the B.Tech Career & Placement Gap</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight font-heading">
          Navigate Your Engineering Career <br />
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Semester by Semester with AI
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {appConfig.subTagline}
        </p>

        {/* 1-Click Hackathon Role Tester */}
        <div className="mt-10 p-6 rounded-3xl bg-[#120d2e]/85 border border-purple-500/25 max-w-3xl mx-auto backdrop-blur-xl shadow-2xl shadow-purple-950/40">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Hackathon Quick Live Demo — Launch Any User Role Instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleDemoAccess('user_student_1', '/dashboard')}
              className="group p-4 rounded-2xl bg-[#18113b] hover:bg-[#20174e] border border-purple-500/20 hover:border-purple-400/50 text-left transition transform hover:-translate-y-1 shadow-md shadow-purple-950/30"
            >
              <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                <span>Student Persona</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-400" />
              </div>
              <div className="text-sm font-extrabold text-white mt-1">Aarav Sharma</div>
              <div className="text-[11px] text-purple-200/60">CSE • 5th Sem • Full Stack</div>
            </button>

            <button
              onClick={() => handleDemoAccess('user_teacher_1', '/teacher')}
              className="group p-4 rounded-2xl bg-[#18113b] hover:bg-[#20174e] border border-purple-500/20 hover:border-purple-400/50 text-left transition transform hover:-translate-y-1 shadow-md shadow-purple-950/30"
            >
              <div className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                <span>Mentor / Teacher</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-indigo-400" />
              </div>
              <div className="text-sm font-extrabold text-white mt-1">Dr. Vikram Sethi</div>
              <div className="text-[11px] text-indigo-200/60">Senior HOD & Mentor</div>
            </button>

            <button
              onClick={() => handleDemoAccess('user_admin_1', '/admin')}
              className="group p-4 rounded-2xl bg-[#18113b] hover:bg-[#20174e] border border-purple-500/20 hover:border-purple-400/50 text-left transition transform hover:-translate-y-1 shadow-md shadow-purple-950/30"
            >
              <div className="text-xs font-bold text-pink-300 flex items-center justify-between">
                <span>Admin Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-pink-400" />
              </div>
              <div className="text-sm font-extrabold text-white mt-1">Platform Admin</div>
              <div className="text-[11px] text-pink-200/60">Template & Bank Manager</div>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-500/15">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold font-heading">Engineered for B.Tech Excellence</h2>
          <p className="text-slate-400 text-sm mt-3">
            Built from ground up to turn unguided academic years into structured placement success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-[#120d2d]/80 border border-purple-500/20 hover:border-purple-400/40 transition shadow-xl shadow-purple-950/20">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Personalized Year-Wise Roadmaps</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2">
              Step-by-step milestones broken down into months and weeks tailored to your target engineering job role.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#120d2d]/80 border border-purple-500/20 hover:border-purple-400/40 transition shadow-xl shadow-purple-950/20">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/30">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Project Recommendation Engine</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2">
              Curated beginner to advanced projects complete with problem statements, required tech stack, and submission verification.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#120d2d]/80 border border-purple-500/20 hover:border-purple-400/40 transition shadow-xl shadow-purple-950/20">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/15 text-pink-400 flex items-center justify-center mb-4 border border-pink-500/30">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Mentor Feedback & Class Guidance</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2">
              Teachers review student submissions, verify skill badges, assign custom tasks, and support students in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 {appConfig.name} — TriCity Hackathon Master Submission. All rights reserved.</p>
      </footer>
    </div>
  );
};
