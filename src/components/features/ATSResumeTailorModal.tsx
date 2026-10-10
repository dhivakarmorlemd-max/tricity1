import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Sparkles, Copy, CheckCircle2, FileText, Download } from 'lucide-react';

interface ATSResumeTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ATSResumeTailorModal: React.FC<ATSResumeTailorModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile, updateProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);

  const [copied, setCopied] = useState(false);
  const [tailoredResume, setTailoredResume] = useState(
    `# ${user.full_name.toUpperCase()} — SOFTWARE ENGINEER
Email: ${user.email} | Portfolio: https://aaravsharma.dev | GitHub: https://github.com/aaravsharma-dev

## TECHNICAL SUMMARY
- ${studentProfile.branch.toUpperCase()} 3rd Year Student (Semester ${studentProfile.current_semester}) specializing in ${targetRole?.title || 'Full Stack Engineering'}.
- Core Stack: React.js, TypeScript, Node.js, Express APIs, PostgreSQL, Data Structures & Algorithms, C++, Git.

## KEY CAPSTONE PROJECTS
### DevConnect — Developer Portfolio & Peer Review Platform
- Designed and deployed full-stack web product using React, Supabase PostgreSQL, and RLS security policies.
- Optimized database queries using relational JOIN indexing, reducing API response times by 35%.
- Integrated JWT authentication and automated peer rating components.

### Smart Task & Study Tracker Web App
- Engineered responsive React single-page app with local storage persistence and state management.

## EDUCATION & COMPETENCIES
- B.Tech Computer Science & Engineering (Semester ${studentProfile.current_semester}) — 8.4 CGPA.
- Verified Skill Badges: Data Structures & Algorithms, React, Node.js, PostgreSQL (Verified by Mentor Dr. Vikram Sethi).`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(tailoredResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Resume Auto-Tailor & ATS Polisher" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Auto-Tailored for {targetRole?.title}</h4>
              <p className="text-xs text-slate-400">ATS Keyword Insertion & Quantified Action Verbs</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown'}</span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Generated Resume Markdown</label>
          <textarea
            rows={12}
            value={tailoredResume}
            onChange={e => setTailoredResume(e.target.value)}
            className="w-full p-4 bg-slate-900 text-teal-300 border border-slate-800 rounded-xl text-xs focus:outline-none font-mono leading-relaxed"
          />
        </div>
      </div>
    </Modal>
  );
};
