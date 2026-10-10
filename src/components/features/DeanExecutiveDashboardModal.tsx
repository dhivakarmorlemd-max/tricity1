import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { GraduationCap, TrendingUp, BarChart3, Award, Building2, Download, CheckCircle2, RefreshCw } from 'lucide-react';

interface DeanExecutiveDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ctcTrendData = [
  { year: '2023', avgCtc: '₹8.5 LPA', highestCtc: '₹18.0 LPA', placementRate: 78 },
  { year: '2024', avgCtc: '₹11.2 LPA', highestCtc: '₹21.5 LPA', placementRate: 83 },
  { year: '2025', avgCtc: '₹14.8 LPA', highestCtc: '₹24.0 LPA', placementRate: 88 },
  { year: '2026 (Current)', avgCtc: '₹18.4 LPA', highestCtc: '₹24.0 LPA', placementRate: 92.4 }
];

export const DeanExecutiveDashboardModal: React.FC<DeanExecutiveDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleExportBoardReport = () => {
    setIsExporting(true);
    setExportMessage(null);

    setTimeout(() => {
      setIsExporting(false);
      setExportMessage('Successfully exported Executive Board Briefing & Placement Outcome Report (.PDF).');
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="University Dean & Board Executive Analytics Dashboard" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-amber-600/10 via-orange-600/10 to-indigo-600/10 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-indigo-900/30 rounded-xl border border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">University Board & Chancellor Intelligence</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Multi-year placement growth curves, NIRF rank trajectory, and institutional outcome analytics.
              </p>
            </div>
          </div>
          <Badge variant="warning">
            Dean Executive View
          </Badge>
        </div>

        {/* Executive Scorecards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Avg CTC Package</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">₹18.4 LPA</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">+116% 3-Yr Growth</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">NIRF India Rank</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">Rank #24</span>
              <BarChart3 className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-[10px] text-slate-400">Top Engineering Tier</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">NBA Outcome Score</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">94.2%</span>
              <Award className="w-4 h-4 text-teal-500" />
            </div>
            <p className="text-[10px] text-slate-400">Grade A++ Compliant</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Hiring Corporate Partners</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">120+</span>
              <Building2 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-[10px] text-slate-400">Fortune 500 Recruiters</p>
          </div>
        </div>

        {/* Multi-Year CTC Trend Table */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
            Multi-Year Placement Package Trajectory (2023 - 2026)
          </h5>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-400 font-bold text-[10px] uppercase border-b border-slate-200 dark:border-slate-800">
                  <th className="p-2.5">Academic Year</th>
                  <th className="p-2.5">Average CTC</th>
                  <th className="p-2.5">Highest CTC</th>
                  <th className="p-2.5 text-center">Placement Conversion %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium text-[11px] text-slate-700 dark:text-slate-300">
                {ctcTrendData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-navy-900/50 transition">
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">{row.year}</td>
                    <td className="p-2.5 font-bold text-amber-600 dark:text-amber-400">{row.avgCtc}</td>
                    <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">{row.highestCtc}</td>
                    <td className="p-2.5 text-center font-extrabold text-teal-600 dark:text-teal-400">{row.placementRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Export Box */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 flex flex-col md:flex-row items-center justify-between gap-3 border border-slate-800">
          <div>
            <h5 className="font-bold text-xs flex items-center gap-1.5 text-amber-400">
              <Award className="w-4 h-4" /> Export Chancellor Board Briefing Report
            </h5>
            <p className="text-[10px] text-slate-400">
              Download complete executive presentation dossier formatted for university board meetings.
            </p>
          </div>

          <button
            onClick={handleExportBoardReport}
            disabled={isExporting}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1.5 text-xs shadow-md disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} Export Board Dossier (.PDF)
          </button>
        </div>

        {exportMessage && (
          <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500" /> {exportMessage}
          </div>
        )}
      </div>
    </Modal>
  );
};
