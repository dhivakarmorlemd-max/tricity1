import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { dataService } from '../../services/api/dataService';
import { NotificationItem } from '../../types';
import { HackathonPresentationDeckModal } from '../features/HackathonPresentationDeckModal';
import {
  GraduationCap,
  Bell,
  Sun,
  Moon,
  UserCheck,
  Sparkles,
  ChevronDown,
  Menu,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, role, switchRole } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showPitchDeckModal, setShowPitchDeckModal] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(dataService.getNotifications());
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleRoleChange = (userId: string) => {
    switchRole(userId);
    setShowRoleMenu(false);
    setNotifications(dataService.getNotifications());
    if (userId.includes('teacher')) {
      navigate('/teacher');
    } else if (userId.includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleMarkNotificationRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dataService.markNotificationRead(id);
    setNotifications(dataService.getNotifications());
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-100 dark:border-purple-500/15 bg-white/85 dark:bg-[#0b0819]/85 backdrop-blur-xl transition-colors">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Sidebar Toggle & App Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-lg md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                {appConfig.name}
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
                  2026 AI
                </span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {appConfig.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Production Platform Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{appConfig.hackathonBadge}</span>
          </div>
        </div>

        {/* Right: Actions, Dynamic Role Switcher, Dark Mode, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
              title="Switch Hackathon User Role"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-500" />
              <span className="capitalize hidden sm:inline">Role: {role}</span>
              <span className="capitalize sm:hidden">{role}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Account
                </div>
                <button
                  onClick={() => handleRoleChange('user_student_1')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${user.id === 'user_student_1' ? 'text-teal-600 font-bold dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/30' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  <div>
                    <div>Aarav Sharma (Student)</div>
                    <div className="text-[10px] text-slate-400">CSE, 5th Sem • Full Stack</div>
                  </div>
                  {user.id === 'user_student_1' && <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                </button>
                <button
                  onClick={() => handleRoleChange('user_student_2')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${user.id === 'user_student_2' ? 'text-teal-600 font-bold dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/30' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  <div>
                    <div>Priya Patel (Student)</div>
                    <div className="text-[10px] text-slate-400">AI/ML, 6th Sem</div>
                  </div>
                  {user.id === 'user_student_2' && <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                </button>
                <button
                  onClick={() => handleRoleChange('user_teacher_1')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${user.role === 'teacher' ? 'text-indigo-600 font-bold dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  <div>
                    <div>Dr. Vikram Sethi (Teacher)</div>
                    <div className="text-[10px] text-slate-400">HOD & Senior Mentor</div>
                  </div>
                  {user.role === 'teacher' && <span className="w-2 h-2 rounded-full bg-indigo-500"></span>}
                </button>
                <button
                  onClick={() => handleRoleChange('user_admin_1')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 ${user.role === 'admin' ? 'text-rose-600 font-bold dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  <div>
                    <div>Platform Admin</div>
                    <div className="text-[10px] text-slate-400">Full System Control</div>
                  </div>
                  {user.role === 'admin' && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Dynamic Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowRoleMenu(false);
                setNotifications(dataService.getNotifications());
              }}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Notifications</h4>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">{unreadCount} unread</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto my-2">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={(e) => handleMarkNotificationRead(n.id, e)}
                      className={`py-2.5 text-xs px-2 rounded transition cursor-pointer flex items-start justify-between gap-2 ${
                        !n.read
                          ? 'bg-teal-50/60 dark:bg-teal-950/40 font-semibold text-slate-900 dark:text-white'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1">
                          <span>{n.title}</span>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-normal">{n.message}</p>
                      </div>
                      {!n.read && (
                        <button
                          onClick={(e) => handleMarkNotificationRead(n.id, e)}
                          className="text-[10px] text-teal-500 hover:text-teal-400 font-bold shrink-0"
                          title="Mark read"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="block text-center text-[11px] font-semibold text-teal-600 dark:text-teal-400 pt-2 border-t border-slate-100 dark:border-slate-800 hover:underline"
                >
                  View All Notifications
                </Link>
              </div>
            )}
          </div>

          {/* User Profile Avatar Link */}
          <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user.full_name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30"
            />
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user.full_name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{user.role}</div>
            </div>
          </Link>
        </div>
      </div>
      <HackathonPresentationDeckModal isOpen={showPitchDeckModal} onClose={() => setShowPitchDeckModal(false)} />
    </header>
  );
};
