import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Sparkles, MessageSquare, CheckCircle2, Copy, Edit3, Award } from 'lucide-react';

interface STARStoryBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const STARStoryBuilderModal: React.FC<STARStoryBuilderModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const [situation, setSituation] = useState('During the 5th semester capstone development of CareerPilot AI, our team faced a tight 48-hour deadline.');
  const [task, setTask] = useState('I was tasked with architecting the real-time verified skill matrix and local storage persistence engine.');
  const [action, setAction] = useState('I designed a dual adapter pattern delegating requests to Supabase PostgreSQL or offline localStorage CRUD fallback.');
  const [result, setResult] = useState('The platform passed 15/15 unit test suites with 0 compilation errors and achieved a 98% user satisfaction score.');
  const [copied, setCopied] = useState(false);

  const starStory = `**Situation**: ${situation}\n**Task**: ${task}\n**Action**: ${action}\n**Result**: ${result}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(starStory);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Behavioral Interview STAR Story Architect" maxWidth="lg">
      <div className="space-y-4 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="font-bold text-slate-700 dark:text-slate-200">STAR Technique Framework</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-1 shadow"
          >
            <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy STAR Story'}
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">1. Situation (Background Context)</label>
            <textarea
              rows={2}
              value={situation}
              onChange={e => setSituation(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">2. Task (Your Responsibility)</label>
            <textarea
              rows={2}
              value={task}
              onChange={e => setTask(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">3. Action (Steps You Took)</label>
            <textarea
              rows={2}
              value={action}
              onChange={e => setAction(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">4. Result (Measurable Outcome)</label>
            <textarea
              rows={2}
              value={result}
              onChange={e => setResult(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
