import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { GraduationCap, Award, FileSpreadsheet, Download, CheckCircle2, TrendingUp, BarChart3, ShieldCheck, RefreshCw } from 'lucide-react';

interface AccreditationAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProgramOutcome {
  code: string;
  title: string;
  attainment: number; // percentage
  target: number;
}

const programOutcomes: ProgramOutcome[] = [
  { code: 'PO1', title: 'Engineering Knowledge & CS Fundamentals', attainment: 96, target: 90 },
  { code: 'PO2', title: 'Problem Analysis & Data Structures (DSA)', attainment: 92, target: 85 },
  { code: 'PO3', title: 'Design & System Architecture Solutions', attainment: 88, target: 85 },
  { code: 'PO4', title: 'Conduct Investigations of Complex Problems', attainment: 89, target: 80 },
  { code: 'PO5', title: 'Modern Tool Usage (Git, Cloud, Docker, CI/CD)', attainment: 94, target: 90 },
  { code: 'PO6', title: 'Professional Ethics & STAR Behavioral Skills', attainment: 95, target: 90 }
];

const departmentStats = [
  { dept: 'Computer Science & Engineering', total: 240, placedPct: 94, higherEdPct: 4, avgPackage: '₹14.2 LPA', topPartner: 'Google, Atlassian, AWS' },
  { dept: 'Artificial Intelligence & Data Science', total: 180, placedPct: 91, higherEdPct: 6, avgPackage: '₹13.8 LPA', topPartner: 'Microsoft, Swiggy, NVIDIA' },
  { dept: 'Information Technology', total: 120, placedPct: 89, higherEdPct: 5, avgPackage: '₹12.5 LPA', topPartner: 'Amazon, Razorpay, TCS Digital' },
  { dept: 'Electronics & Communication', total: 150, placedPct: 84, higherEdPct: 10, avgPackage: '₹10.8 LPA', topPartner: 'Intel, Qualcomm, Cisco' }
];

export const AccreditationAnalyticsModal: React.FC<AccreditationAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const handleExportReport = (reportType: string) => {
    setIsExporting(true);
    setExportSuccess(null);

    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(`Successfully generated and downloaded ${reportType} Audit Report payload.`);
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global University Accreditation & Outcome Analytics (NBA / NAAC)" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-teal-600/10 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-teal-900/30 rounded-xl border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Institutional Compliance & Accreditation Engine</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Automated Outcome-Based Education (OBE) metrics for NBA Self-Assessment Reports and NAAC Criterion 5.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Grade A++ Compliance
          </Badge>
        </div>

        {/* Executive Scorecards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">NBA Outcome Score</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">94.2%</span>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">+3.4% above Tier-1 Target</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">NAAC Criterion 5.2</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">91.8%</span>
              <Award className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-[10px] text-slate-400">Student Progression Benchmark</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Overall Placement Rate</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">90.5%</span>
              <TrendingUp className="w-4 h-4 text-teal-500" />
            </div>
            <p className="text-[10px] text-slate-400">Graduating Batch 2026</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">NIRF Readiness Index</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">Top 25</span>
              <BarChart3 className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-[10px] text-slate-400">National University Rank</p>
          </div>
        </div>

        {/* Program Outcomes Attainment */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 text-xs">
            <span>NBA Program Outcome (PO) Attainment Radar</span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400">Target Attainment: &ge;85%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {programOutcomes.map(po => (
              <div key={po.code} className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {po.code}: {po.title}
                  </span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">{po.attainment}%</span>
                </div>
                <ProgressBar value={po.attainment} color="indigo" size="sm" showLabel={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Departmental Analytics */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
            Departmental Outcomes & Recruiting Tier Summary
          </h5>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-400 font-bold text-[10px] uppercase border-b border-slate-200 dark:border-slate-800">
                  <th className="p-2.5">Department</th>
                  <th className="p-2.5 text-center">Enrolled</th>
                  <th className="p-2.5 text-center">Placed %</th>
                  <th className="p-2.5 text-center">Higher Ed %</th>
                  <th className="p-2.5">Avg Package</th>
                  <th className="p-2.5">Top Recruiters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium text-[11px] text-slate-700 dark:text-slate-300">
                {departmentStats.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-navy-900/50 transition">
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">{row.dept}</td>
                    <td className="p-2.5 text-center">{row.total}</td>
                    <td className="p-2.5 text-center font-bold text-teal-600 dark:text-teal-400">{row.placedPct}%</td>
                    <td className="p-2.5 text-center">{row.higherEdPct}%</td>
                    <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">{row.avgPackage}</td>
                    <td className="p-2.5 text-slate-500">{row.topPartner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Automated Export Actions */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <h5 className="font-bold text-xs flex items-center gap-1.5 text-blue-400">
              <FileSpreadsheet className="w-4 h-4" /> Official Compliance Export Suite
            </h5>
            <p className="text-[10px] text-slate-400">
              Generate one-click accreditation packages formatted for NBA SAR & NAAC portal uploads.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleExportReport('NAAC Criterion 5.2')}
              disabled={isExporting}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition flex items-center gap-1 text-xs disabled:opacity-50"
            >
              {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} NAAC Report (.PDF)
            </button>
            <button
              onClick={() => handleExportReport('NBA Self-Assessment Report')}
              disabled={isExporting}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1 text-xs disabled:opacity-50"
            >
              {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} NBA SAR (.XML)
            </button>
          </div>
        </div>

        {exportSuccess && (
          <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500" /> {exportSuccess}
          </div>
        )}
      </div>
    </Modal>
  );
};
