import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { appConfig } from '../config/appConfig';
import { GraduationCap, ArrowRight, UserCheck, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('aarav.student@edutech.edu');
  const [password, setPassword] = useState('••••••••');
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('teacher')) {
      switchRole('user_teacher_1');
      navigate('/teacher');
    } else if (email.includes('admin')) {
      switchRole('user_admin_1');
      navigate('/admin');
    } else {
      switchRole('user_student_1');
      navigate('/dashboard');
    }
  };

  const handleQuickDemo = (userId: string, targetPath: string) => {
    switchRole(userId);
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#090616] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* 2026 Ambient Glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight font-heading">{appConfig.name}</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight font-heading">Welcome Back</h2>
          <p className="text-xs text-purple-200/70">Sign in to continue your career roadmap & placement prep</p>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="p-6 rounded-3xl bg-[#120d2e]/85 border border-purple-500/25 space-y-4 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">Academic Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-purple-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#0b0819] border border-purple-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-purple-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#0b0819] border border-purple-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-500 hover:brightness-110 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-purple-500/30"
          >
            Sign In to Dashboard
          </button>
        </form>

        {/* Quick Demo Mode Box */}
        <div className="p-4 rounded-2xl bg-[#120d2e]/60 border border-purple-500/20 text-center space-y-3 backdrop-blur-md">
          <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>1-Click Hackathon Demo Login</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemo('user_student_1', '/dashboard')}
              className="px-2 py-2 bg-[#18113b] hover:bg-[#20174e] border border-purple-500/20 hover:border-purple-400/50 rounded-xl text-[11px] font-semibold text-purple-200 transition"
            >
              Student
            </button>
            <button
              onClick={() => handleQuickDemo('user_teacher_1', '/teacher')}
              className="px-2 py-2 bg-[#18113b] hover:bg-[#20174e] border border-purple-500/20 hover:border-indigo-400/50 rounded-xl text-[11px] font-semibold text-indigo-200 transition"
            >
              Teacher
            </button>
            <button
              onClick={() => handleQuickDemo('user_admin_1', '/admin')}
              className="px-2 py-2 bg-[#18113b] hover:bg-[#20174e] border border-purple-500/20 hover:border-pink-400/50 rounded-xl text-[11px] font-semibold text-pink-200 transition"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/onboarding" className="text-teal-400 font-semibold hover:underline">
            Complete Onboarding
          </Link>
        </p>
      </div>
    </div>
  );
};
