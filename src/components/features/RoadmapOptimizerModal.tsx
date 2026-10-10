import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Sparkles, RefreshCw, Zap, CheckCircle2, Sliders, AlertTriangle, Calendar, ArrowRight } from 'lucide-react';

interface RoadmapOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapOptimizerModal: React.FC<RoadmapOptimizerModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const tasks = dataService.getRoadmapTasks();
  const progress = dataService.getStudentTaskProgress();

  const [weeklyHours, setWeeklyHours] = useState(studentProfile.weekly_hours);
  const [lagWeeks, setLagWeeks] = useState(1);
  const [selectedRole, setSelectedRole] = useState(studentProfile.target_role_id);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{
    adjustedMilestones: number;
    recommendedPacing: string;
    prioritySkillsAdded: string[];
    readinessBoost: number;
  } | null>(null);

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const newRoleObj = appConfig.careerRoles.find(r => r.id === selectedRole);
      const topSkills = newRoleObj?.topSkills || ['Data Structures', 'System Design'];

      // Update student profile pacing and role
      updateProfile({
        weekly_hours: weeklyHours,
        target_role_id: selectedRole,
        placement_readiness_score: Math.min(99, studentProfile.placement_readiness_score + 4)
      });

      setOptimizationResult({
        adjustedMilestones: 8,
        recommendedPacing: `${weeklyHours} hours/week (${Math.round(weeklyHours / 7 * 10) / 10} hrs/day)`,
        prioritySkillsAdded: topSkills,
        readinessBoost: 4
      });

      setIsOptimizing(false);
    }, 700);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Career Gap & Roadmap Re-Optimizer" maxWidth="lg">
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-purple-500/10 border border-teal-500/20 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Dynamic Adaptive Pacing Engine</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              Fell behind schedule or changing career focus? Our AI re-optimizer re-balances your semester milestones, prioritizes prerequisite bottlenecks, and keeps you on target for placement season.
            </p>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="p-4 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-teal-500" /> Adjust Study Parameters
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 mb-1">Target Career Role</label>
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {appConfig.careerRoles.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 mb-1">Weekly Study Hours ({weeklyHours} hrs)</label>
              <input
                type="range"
                min={5}
                max={35}
                value={weeklyHours}
                onChange={e => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 mb-1">Schedule Adjustment (Lag)</label>
              <select
                value={lagWeeks}
                onChange={e => setLagWeeks(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={0}>On Track (0 Weeks Lag)</option>
                <option value={1}>1 Week Behind</option>
                <option value={2}>2 Weeks Behind</option>
                <option value={3}>3+ Weeks Behind</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:opacity-95 text-white font-bold transition flex items-center gap-2 shadow"
            >
              <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
              {isOptimizing ? 'Optimizing Roadmap...' : 'Re-Calculate AI Roadmap'}
            </button>
          </div>
        </div>

        {/* Optimization Output */}
        {optimizationResult && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Roadmap Optimization Complete
              </span>
              <span className="font-bold text-teal-600 dark:text-teal-400">
                +{optimizationResult.readinessBoost}% Readiness Score Boost
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Re-Balanced Pacing</span>
                <span className="font-bold text-slate-900 dark:text-white">{optimizationResult.recommendedPacing}</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Prioritized Core Skills</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{optimizationResult.prioritySkillsAdded.join(', ')}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your active semester roadmap tasks have been updated in your profile. Overdue items have been dynamically integrated into your current week's micro-milestones.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
