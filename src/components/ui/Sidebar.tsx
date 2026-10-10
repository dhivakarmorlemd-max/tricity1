import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContext';
import {
  LayoutDashboard,
  Map,
  CheckSquare2,
  FolderGit2,
  FileCheck2,
  Briefcase,
  UserCheck,
  Users,
  Settings,
  Bell,
  HelpCircle,
  Award,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, user } = useAuth();

  interface NavItem {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const studentNav: NavItem[] = [
    { label: 'Overview Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Year-Wise Roadmap', path: '/roadmap', icon: Map, badge: 'Sem 5' },
    { label: 'Skills & Progress', path: '/skills', icon: CheckSquare2 },
    { label: 'Project Recommendations', path: '/projects', icon: FolderGit2, badge: 'New' },
    { label: 'Assessments & Quizzes', path: '/assessments', icon: FileCheck2 },
    { label: 'Placement & Resume Prep', path: '/placement', icon: Briefcase },
    { label: 'Portfolio Showcase', path: '/portfolio', icon: Award },
    { label: 'Notifications & Guidance', path: '/notifications', icon: Bell },
  ];

  const teacherNav: NavItem[] = [
    { label: 'Teacher Dashboard', path: '/teacher', icon: LayoutDashboard },
    { label: 'Pending Submissions', path: '/teacher/submissions', icon: FolderGit2, badge: '1 Pending' },
    { label: 'Assignments & Tasks', path: '/teacher/assignments', icon: CheckSquare2 },
    { label: 'Student Directory', path: '/teacher/students', icon: Users },
  ];

  const adminNav: NavItem[] = [
    { label: 'Admin Command Center', path: '/admin', icon: LayoutDashboard },
    { label: 'Roadmap Templates', path: '/admin/templates', icon: Map },
    { label: 'Skill & Project Bank', path: '/admin/bank', icon: Layers },
    { label: 'Platform Operational Logs', path: '/admin/logs', icon: Settings },
  ];

  const currentNav = role === 'teacher' ? teacherNav : role === 'admin' ? adminNav : studentNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white/95 dark:bg-[#0c081e]/95 backdrop-blur-xl border-r border-purple-100 dark:border-purple-500/15 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          <div className="space-y-6">
            {/* User Role Badge Header */}
            <div className="px-3 py-2 rounded-xl bg-purple-500/5 dark:bg-[#150f33]/80 border border-purple-200/50 dark:border-purple-500/20 shadow-sm">
              <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Active Workspace</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between mt-0.5">
                <span className="capitalize">{role} Portal</span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-sm shadow-purple-400"></span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-3 pb-2 tracking-wider">
                Main Menu
              </div>
              {currentNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-purple-50/70 dark:hover:bg-purple-950/40 hover:text-purple-900 dark:hover:text-purple-200'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold border border-purple-300/40 dark:border-purple-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Bottom Help & Settings */}
          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                  isActive ? 'bg-slate-100 dark:bg-slate-800 text-teal-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Config</span>
            </NavLink>
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-900/20 to-teal-900/20 border border-teal-500/20 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Hackathon Mode</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                All data syncs locally or to Supabase DB seamlessly.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
