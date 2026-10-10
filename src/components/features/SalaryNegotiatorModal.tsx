import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { DollarSign, Copy, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface SalaryNegotiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SalaryNegotiatorModal: React.FC<SalaryNegotiatorModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const [offeredSalary, setOfferedSalary] = useState('₹12.0 LPA');
  const [targetSalary, setTargetSalary] = useState('₹15.0 LPA');
  const [copied, setCopied] = useState(false);

  const emailText = `Dear Recruiting Team,

Thank you so much for extending the offer for the ${targetRole?.title || 'Software Engineer'} role at your organization! I am thrilled about the opportunity to contribute to your engineering team.

Based on my technical competencies—including teacher-verified mastery in Data Structures, React, and microservices architecture, as well as an audited placement readiness score of ${studentProfile.placement_readiness_score}%—I would like to respectfully inquire if there is flexibility to adjust the starting compensation towards ${targetSalary}.

I am extremely eager to join and make an immediate impact. Thank you again for your time and consideration!

Best regards,
${user.full_name}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Salary Negotiation & Offer Email Generator" maxWidth="lg">
      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Initial Offered Package</label>
            <input
              type="text"
              value={offeredSalary}
              onChange={e => setOfferedSalary(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">Target Counter Package</label>
            <input
              type="text"
              value={targetSalary}
              onChange={e => setTargetSalary(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-teal-600 dark:text-teal-400 font-bold"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="font-bold text-teal-400">Professional Negotiation Counter-Email</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded bg-teal-500 text-white font-bold hover:bg-teal-600 transition flex items-center gap-1 text-[11px]"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>
          <pre className="font-sans text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
            {emailText}
          </pre>
        </div>
      </div>
    </Modal>
  );
};
