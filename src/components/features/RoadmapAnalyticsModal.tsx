import React from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { BarChart3, TrendingUp, Award, Target, ShieldCheck } from 'lucide-react';

interface RoadmapAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapAnalyticsModal: React.FC<RoadmapAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const skills = dataService.getStudentSkills(user.id);

  const categories = appConfig.skillCategories;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dynamic Skill Radar & Domain Analytics" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Domain Competency Radar</h4>
              <p className="text-xs text-slate-400">Semester {studentProfile.current_semester} Analytics Breakdown</p>
            </div>
          </div>
          <Badge variant="info">Score: {studentProfile.placement_readiness_score} / 100</Badge>
        </div>

        {/* Category Breakdown Mastery Bars */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Category-Wise Competency Distribution
          </h4>

          <div className="space-y-3">
            {categories.map(cat => {
              const catSkills = skills.filter(s => s.category === cat.name || s.category.includes(cat.name.split(' ')[0]));
              const avgScore = catSkills.length > 0
                ? Math.round((catSkills.reduce((acc, s) => acc + (s.assessment_score || 70), 0) / catSkills.length))
                : 65;

              return (
                <div key={cat.id} className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{cat.name}</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">{avgScore}% Mastery</span>
                  </div>
                  <ProgressBar value={avgScore} size="sm" color={avgScore >= 75 ? 'teal' : 'indigo'} showLabel={false} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
