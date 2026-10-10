import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Video, Mic, Sparkles, Copy, CheckCircle2, Play, Volume2 } from 'lucide-react';

interface VideoPitchStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPitchStudioModal: React.FC<VideoPitchStudioModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const [copied, setCopied] = useState(false);

  const script = `Hello! My name is ${user.full_name}, a 5th-semester B.Tech ${studentProfile.branch.toUpperCase()} student at Chitkara University, specializing in ${targetRole?.title || 'Software Development'}.

Over the past two years, I have built production-grade full-stack applications, including CareerPilot AI—a semester-wise career navigator—and microservices engines using React, Node.js, and PostgreSQL.

I have an audited placement readiness score of ${studentProfile.placement_readiness_score}%, with teacher-verified mastery in Data Structures and Algorithms. I am passionate about solving high-scale software problems and am excited to contribute as a ${targetRole?.title || 'Software Engineer'}. Thank you!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI 60-Second Video Resume Pitch Studio" maxWidth="lg">
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-purple-500/10 border border-teal-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">Teleprompter Pitch Assistant</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Generate an impactful 60-second elevator pitch script for asynchronous video interview screening.</p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy Script'}
          </button>
        </div>

        {/* Teleprompter Display Box */}
        <div className="p-5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-mono text-[11px] text-teal-400 font-bold flex items-center gap-1">
              <Mic className="w-3.5 h-3.5" /> Teleprompter Pitch Script (Estimated Speech Duration: 55 Seconds)
            </span>
            <span className="text-amber-400 font-bold">Recommended WPM: 130</span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed font-sans text-slate-200 p-2 bg-slate-950/60 rounded-lg border border-slate-800/60">
            {script}
          </p>
        </div>

        {/* Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-teal-600 dark:text-teal-400 block mb-0.5">Lighting & Angle</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Position camera at eye level with bright front lighting.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">Pacing & Clarity</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Maintain steady pace and emphasize capstone project impact.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">Call to Action</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Conclude with confidence and express eagerness to join.</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
