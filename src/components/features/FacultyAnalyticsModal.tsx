import React from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { BarChart3, Users, AlertTriangle, Download, CheckCircle2, TrendingUp, ShieldAlert, FileSpreadsheet } from 'lucide-react';

interface FacultyAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacultyAnalyticsModal: React.FC<FacultyAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const allUsers = dataService.getAllUsers().filter(u => u.role === 'student');
  const classAvg = dataService.calculateClassReadinessAverage();
  const helpRequests = dataService.getHelpRequests();

  const skillGaps = [
    { category: 'Data Structures & Algorithms', masteryPct: 78, status: 'On Track' },
    { category: 'System Design & Architecture', masteryPct: 62, status: 'Gap Identified' },
    { category: 'Full Stack Web Development', masteryPct: 84, status: 'High Mastery' },
    { category: 'Aptitude & Technical Reasoning', masteryPct: 71, status: 'On Track' }
  ];

  const handleExportCSV = () => {
    const csvLines = [
      'Student Name,Email,Branch,Readiness Score,Status',
      ...allUsers.map(u => {
        const profile = dataService.getStudentProfile(u.id);
        return `"${u.full_name}","${u.email}","${profile.branch.toUpperCase()}",${profile.placement_readiness_score}%,${profile.placement_readiness_score >= 75 ? 'Placement Ready' : 'Needs Guidance'}`;
      })
    ];

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careerpilot_faculty_batch_report_2026.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Faculty Batch Placement Analytics & Gap Console" maxWidth="lg">
      <div className="space-y-5">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Class Readiness Average</span>
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400">{classAvg}%</div>
            <p className="text-[10px] text-slate-400">Target Benchmark: 75%</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Enrolled Students</span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{allUsers.length} Students</div>
            <p className="text-[10px] text-slate-400">CSE & AI/ML 5th Semester</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Active Mentor Tickets</span>
            <div className="text-2xl font-black text-amber-500">{helpRequests.length} Tickets</div>
            <p className="text-[10px] text-slate-400">Requires Faculty Review</p>
          </div>
        </div>

        {/* Skill Gap Heatmap */}
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-teal-500" /> Batch-Wide Skill Gap Matrix
            </h4>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-1.5 text-xs shadow"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Export Faculty CSV Report
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {skillGaps.map((sg, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-900 dark:text-white">{sg.category}</span>
                  <span className={sg.masteryPct >= 75 ? 'text-teal-600 font-bold' : 'text-amber-500 font-bold'}>
                    {sg.masteryPct}% Mastery ({sg.status})
                  </span>
                </div>
                <ProgressBar value={sg.masteryPct} color={sg.masteryPct >= 75 ? 'teal' : 'amber'} showLabel={false} />
              </div>
            ))}
          </div>
        </div>

        {/* At-Risk Student Flags */}
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-rose-500">
            <ShieldAlert className="w-4 h-4" /> At-Risk Student Interventions
          </h4>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {allUsers.map(student => {
              const prof = dataService.getStudentProfile(student.id);
              const isAtRisk = prof.placement_readiness_score < 75;

              return (
                <div key={student.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={student.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'} alt={student.full_name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{student.full_name}</span>
                      <span className="text-[10px] text-slate-400 block">{prof.branch.toUpperCase()} • Sem {prof.current_semester}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${isAtRisk ? 'text-rose-500' : 'text-teal-600'}`}>
                      Readiness: {prof.placement_readiness_score}%
                    </span>
                    <Badge variant={isAtRisk ? 'warning' : 'success'}>
                      {isAtRisk ? 'Needs Intervention' : 'On Track'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
