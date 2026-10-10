import React from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { DollarSign, TrendingUp, Award, Sparkles, ShieldCheck } from 'lucide-react';

interface SalaryPredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SalaryPredictorModal: React.FC<SalaryPredictorModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const skills = dataService.getStudentSkills(user.id);
  const submissions = dataService.getProjectSubmissions(user.id);

  const verifiedSkillsCount = skills.filter(s => s.teacher_verified).length;
  const approvedProjectsCount = submissions.filter(s => s.status === 'approved').length;

  // Dynamic CTC Calculation Math
  let minSalary = 6.5 + (studentProfile.placement_readiness_score / 10);
  let maxSalary = 12.0 + (verifiedSkillsCount * 1.5) + (approvedProjectsCount * 2.0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Entry-Level CTC Salary & Skill Value Estimator" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 border border-teal-500/20 text-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Dynamic Market Valuation</span>
            <Badge variant="success">Readiness: {studentProfile.placement_readiness_score}%</Badge>
          </div>

          <div className="text-3xl font-black text-white">
            ₹{minSalary.toFixed(1)} LPA — ₹{maxSalary.toFixed(1)} LPA
          </div>
          <p className="text-xs text-slate-300">
            Estimated entry-level CTC package based on verified skills, capstone projects, and ATS match index.
          </p>
        </div>

        {/* Skill Value Multipliers */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            CTC Impact Multipliers
          </h4>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Mentor Verified Skill Badges ({verifiedSkillsCount})</span>
              <span className="font-bold text-emerald-500">+₹{(verifiedSkillsCount * 1.5).toFixed(1)} LPA</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Approved Full-Stack Capstones ({approvedProjectsCount})</span>
              <span className="font-bold text-emerald-500">+₹{(approvedProjectsCount * 2.0).toFixed(1)} LPA</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
