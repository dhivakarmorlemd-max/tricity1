import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  CheckSquare2,
  FolderGit2,
  Briefcase,
  Bot,
  FileText,
  Sparkles,
  Award
} from 'lucide-react';
import { AICareerChatbotModal } from '../features/AICareerChatbotModal';
import { ATSResumeScannerModal } from '../features/ATSResumeScannerModal';

export const BottomDock2026: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [showATSScanner, setShowATSScanner] = useState(false);

  const dockItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      isAction: false,
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      path: '/roadmap',
      icon: Map,
      isAction: false,
    },
    {
      id: 'skills',
      label: 'Skills',
      path: '/skills',
      icon: CheckSquare2,
      isAction: false,
    },
    {
      id: 'ai_copilot',
      label: 'AI Coach',
      icon: Sparkles,
      isAction: true,
      action: () => setShowAIChatbot(true),
      highlight: true,
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/projects',
      icon: FolderGit2,
      isAction: false,
    },
    {
      id: 'ats',
      label: 'ATS Match',
      icon: FileText,
      isAction: true,
      action: () => setShowATSScanner(true),
    },
    {
      id: 'placement',
      label: 'Placement',
      path: '/placement',
      icon: Briefcase,
      isAction: false,
    },
  ];

  return (
    <>
      {/* 2026 Floating Frosted Glass Dock */}
      <nav
        aria-label="2026 Quick Navigation Dock"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl glass-dock animate-in fade-in slide-in-from-bottom-4 shadow-2xl"
      >
        {/* Glow Accent Dot Behind Center */}
        <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-24 h-4 bg-purple-500/30 blur-md pointer-events-none rounded-full" />

        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isAction && location.pathname === item.path;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`relative group p-2.5 rounded-xl transition-all duration-200 flex flex-col items-center justify-center ${
                  item.highlight
                    ? 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/40 scale-105 hover:scale-110'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                {/* Tooltip */}
                <span className="absolute -top-9 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#140e2d] text-purple-200 border border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.path!}
              className={({ isActive }) =>
                `relative group p-2.5 rounded-xl transition-all duration-200 flex flex-col items-center justify-center ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`
              }
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
              )}
              {/* Tooltip */}
              <span className="absolute -top-9 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#140e2d] text-purple-200 border border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Modals triggered from Dock */}
      <AICareerChatbotModal isOpen={showAIChatbot} onClose={() => setShowAIChatbot(false)} />
      <ATSResumeScannerModal isOpen={showATSScanner} onClose={() => setShowATSScanner(false)} />
    </>
  );
};
