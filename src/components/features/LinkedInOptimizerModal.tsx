import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Share2, Sparkles, Copy, CheckCircle2, Award, ExternalLink } from 'lucide-react';

interface LinkedInOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkedInOptimizerModal: React.FC<LinkedInOptimizerModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const headline = `B.Tech ${studentProfile.branch.toUpperCase()} @ Chitkara University | Aspiring ${targetRole?.title || 'Software Developer'} | React • Node.js • DSA (Placement Readiness: ${studentProfile.placement_readiness_score}%)`;

  const aboutText = `I am a driven 5th-semester Computer Science Engineering student passionate about building scalable web applications and high-performance algorithms.

🚀 Key Highlights:
• Developed CareerPilot AI—an interactive career navigator platform for B.Tech engineering students.
• Teacher-verified mastery in Data Structures & Algorithms and Full Stack Web Development.
• Audited placement readiness score: ${studentProfile.placement_readiness_score}%.

Actively seeking software engineering internship and full-time placement opportunities!`;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="LinkedIn Recruiter Profile Optimizer" maxWidth="lg">
      <div className="space-y-4">
        {/* Headline Section */}
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Optimized Recruiter Headline</span>
            <button
              onClick={() => handleCopy(headline, 'headline')}
              className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> {copiedField === 'headline' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] text-slate-700 dark:text-slate-200">
            {headline}
          </p>
        </div>

        {/* About Section */}
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">High-Converting About Summary</span>
            <button
              onClick={() => handleCopy(aboutText, 'about')}
              className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> {copiedField === 'about' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-sans text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
            {aboutText}
          </pre>
        </div>
      </div>
    </Modal>
  );
};
