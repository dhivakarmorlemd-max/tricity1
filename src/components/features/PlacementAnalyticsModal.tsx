import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { TrendingUp, Building2, Award, DollarSign } from 'lucide-react';

interface PlacementAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlacementAnalyticsModal: React.FC<PlacementAnalyticsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Campus Placement & Salary Offer Analytics" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">2026 Batch Placement Report</h4>
              <p className="text-xs text-slate-400">Campus Drives & Offer Statistics</p>
            </div>
          </div>
          <Badge variant="success">91% Overall Placed</Badge>
        </div>

        {/* Branch Placement Distribution */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Branch Placement Percentiles</h4>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>Computer Science & Engineering (CSE)</span>
                <span className="text-teal-500">94% Placed • Avg ₹12.5 LPA</span>
              </div>
              <ProgressBar value={94} size="sm" color="teal" showLabel={false} />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>Artificial Intelligence & Machine Learning</span>
                <span className="text-indigo-500">96% Placed • Avg ₹14.8 LPA</span>
              </div>
              <ProgressBar value={96} size="sm" color="indigo" showLabel={false} />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>Information Technology (IT)</span>
                <span className="text-emerald-500">89% Placed • Avg ₹10.2 LPA</span>
              </div>
              <ProgressBar value={89} size="sm" color="emerald" showLabel={false} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
