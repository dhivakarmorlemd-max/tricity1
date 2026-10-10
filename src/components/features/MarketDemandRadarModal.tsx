import React from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { TrendingUp, Sparkles, CheckCircle2, BarChart3, Globe } from 'lucide-react';

interface MarketDemandRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketDemandRadarModal: React.FC<MarketDemandRadarModalProps> = ({ isOpen, onClose }) => {
  const studentSkills = dataService.getStudentSkills();

  const marketTrends = [
    { tech: 'React & TypeScript', demandPct: 95, status: 'High Recruiter Demand' },
    { tech: 'Python & Generative AI (LLMs)', demandPct: 92, status: 'Explosive Growth' },
    { tech: 'Node.js Microservices & Docker', demandPct: 88, status: 'Core SDE Requirement' },
    { tech: 'PostgreSQL & Distributed SQL', demandPct: 85, status: 'High Demand' },
    { tech: 'Rust & High-Performance Systems', demandPct: 78, status: 'Emerging Skill' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Tech Skill Market Demand Radar" maxWidth="lg">
      <div className="space-y-4 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-500" />
            <span className="font-bold text-slate-700 dark:text-slate-200">2026 Tech Hiring Index Data</span>
          </div>
          <span className="text-teal-600 dark:text-teal-400 font-bold">Updated Live</span>
        </div>

        <div className="space-y-3">
          {marketTrends.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900 dark:text-white">{item.tech}</span>
                <span className="text-teal-600 dark:text-teal-400">{item.demandPct}% Market Index</span>
              </div>
              <ProgressBar value={item.demandPct} color="teal" showLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
