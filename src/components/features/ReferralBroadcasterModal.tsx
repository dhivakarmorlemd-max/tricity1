import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Send, Users, Building2, CheckCircle2, Award, ExternalLink } from 'lucide-react';

interface ReferralBroadcasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReferralPosting {
  id: string;
  referrerName: string;
  company: string;
  role: string;
  minScore: number;
  location: string;
}

const mockReferrals: ReferralPosting[] = [
  {
    id: 'ref_1',
    referrerName: 'Karan Malhotra (SDE-2)',
    company: 'Google',
    role: 'Software Development Engineer - Early Career',
    minScore: 80,
    location: 'Bengaluru'
  },
  {
    id: 'ref_2',
    referrerName: 'Neha Gupta (AWS SDE)',
    company: 'Amazon',
    role: 'Frontend Engineer (AWS Console)',
    minScore: 75,
    location: 'Hyderabad'
  }
];

export const ReferralBroadcasterModal: React.FC<ReferralBroadcasterModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();
  const [applied, setApplied] = useState<string[]>([]);

  const handleApplyReferral = (item: ReferralPosting) => {
    dataService.createHelpRequest(
      `Referral Request: ${item.company} (${item.role})`,
      `Applied for internal alumni referral via ${item.referrerName}. Verified readiness score: ${studentProfile.placement_readiness_score}%.`
    );
    setApplied(prev => [...prev, item.id]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alumni & Corporate Internal Referral Board" maxWidth="lg">
      <div className="space-y-4 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between font-bold text-slate-700 dark:text-slate-200">
          <span>Verified Alumni Internal Referrals</span>
          <span className="text-teal-600 dark:text-teal-400">Direct Recruiter Routing</span>
        </div>

        <div className="space-y-3">
          {mockReferrals.map(item => {
            const isEligible = studentProfile.placement_readiness_score >= item.minScore;
            const hasApplied = applied.includes(item.id);

            return (
              <div key={item.id} className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.company}</h4>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">{item.role}</p>
                    <p className="text-[11px] text-slate-400">Posted by {item.referrerName} • {item.location}</p>
                  </div>
                  <Badge variant={isEligible ? 'success' : 'warning'}>
                    {isEligible ? 'Eligible' : 'Score Gap'}
                  </Badge>
                </div>

                <div className="pt-2 flex justify-end">
                  {hasApplied ? (
                    <button disabled className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold cursor-not-allowed text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Referral Requested
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyReferral(item)}
                      disabled={!isEligible}
                      className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-1 shadow text-xs disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" /> 1-Click Request Referral
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
