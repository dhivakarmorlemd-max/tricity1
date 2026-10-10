import React, { useState } from 'react';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Building2, Plus, Send, Download, CheckCircle2, Users, Trophy, GraduationCap, RefreshCw, BarChart3 } from 'lucide-react';

interface PlacementOfficerCommandCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CampusDrive {
  id: string;
  company: string;
  role: string;
  ctc: string;
  minCgpa: number;
  minScore: number;
  registeredCount: number;
  status: 'active' | 'upcoming' | 'completed';
}

export const PlacementOfficerCommandCenterModal: React.FC<PlacementOfficerCommandCenterModalProps> = ({ isOpen, onClose }) => {
  const [drives, setDrives] = useState<CampusDrive[]>([
    {
      id: 'drv_201',
      company: 'Google India',
      role: 'Software Development Engineer - Early Career',
      ctc: '₹22.5 LPA',
      minCgpa: 8.0,
      minScore: 80,
      registeredCount: 42,
      status: 'active'
    },
    {
      id: 'drv_202',
      company: 'Amazon AWS',
      role: 'Cloud Systems Associate',
      ctc: '₹20.0 LPA',
      minCgpa: 7.8,
      minScore: 75,
      registeredCount: 68,
      status: 'active'
    },
    {
      id: 'drv_203',
      company: 'Microsoft India',
      role: 'SDE - Cloud & AI',
      ctc: '₹24.0 LPA',
      minCgpa: 8.2,
      minScore: 82,
      registeredCount: 35,
      status: 'upcoming'
    }
  ]);

  // Form State for Adding New Drive
  const [showAddDriveForm, setShowAddDriveForm] = useState<boolean>(false);
  const [newCompany, setNewCompany] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('');
  const [newCtc, setNewCtc] = useState<string>('₹18.0 LPA');
  const [newMinCgpa, setNewMinCgpa] = useState<number>(7.5);
  const [newMinScore, setNewMinScore] = useState<number>(75);

  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(null);

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    const drive: CampusDrive = {
      id: `drv_${Date.now()}`,
      company: newCompany,
      role: newRole,
      ctc: newCtc,
      minCgpa: newMinCgpa,
      minScore: newMinScore,
      registeredCount: 0,
      status: 'active'
    };

    setDrives(prev => [drive, ...prev]);

    // Dispatch broadcast notification to all students
    dataService.addNotification({
      user_id: 'all_students',
      title: `New Placement Drive: ${newCompany}`,
      message: `${newCompany} announced a drive for ${newRole} (${newCtc}). Check your eligibility dashboard to auto-apply!`,
      type: 'recommendation',
      read: false
    });

    setBroadcastMessage(`Successfully created placement drive for ${newCompany} and broadcasted alerts to eligible students.`);
    setShowAddDriveForm(false);
    setNewCompany('');
    setNewRole('');
  };

  const handleBroadcastDriveAlert = (drive: CampusDrive) => {
    dataService.addNotification({
      user_id: 'all_students',
      title: `Reminder: ${drive.company} Placement Drive`,
      message: `Application deadline approaching for ${drive.role} (${drive.ctc}). Ensure your readiness score is updated.`,
      type: 'recommendation',
      read: false
    });

    setBroadcastMessage(`Broadcasted reminder notification for ${drive.company} to all candidates.`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="University Placement Officer (TPO) Command Center" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-cyan-600/10 via-teal-600/10 to-indigo-600/10 dark:from-cyan-900/30 dark:via-teal-900/30 dark:to-indigo-900/30 rounded-xl border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Enterprise Placement Command Portal</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Manage university-wide campus recruitment drives, batch student broadcasts, and placement CTC statistics.
              </p>
            </div>
          </div>
          <Badge variant="success">
            TPO Admin Live
          </Badge>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Active Drives</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400">{drives.length}</span>
              <Building2 className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-[10px] text-slate-400">Tier-1 Corporates</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Total Applicants</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">145</span>
              <Users className="w-4 h-4 text-teal-500" />
            </div>
            <p className="text-[10px] text-slate-400">Verified Candidates</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Avg CTC Offer</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">₹18.4 LPA</span>
              <Trophy className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-[10px] text-slate-400">Highest: ₹24.0 LPA</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Placement %</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">92.4%</span>
              <GraduationCap className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-400">Target: 95%</p>
          </div>
        </div>

        {/* Action Header */}
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
            Campus Placement Drives Directory
          </h5>

          <button
            onClick={() => setShowAddDriveForm(!showAddDriveForm)}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" /> {showAddDriveForm ? 'Close Form' : 'Announce New Drive'}
          </button>
        </div>

        {/* Form drawer */}
        {showAddDriveForm && (
          <form onSubmit={handleCreateDrive} className="p-4 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/30 space-y-3">
            <h6 className="font-bold text-slate-900 dark:text-white text-xs">Announce New Campus Drive</h6>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Swiggy Tech"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Backend SDE"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">CTC Package</label>
                <input
                  type="text"
                  value={newCtc}
                  onChange={e => setNewCtc(e.target.value)}
                  className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Min CGPA ({newMinCgpa})</label>
                <input
                  type="range"
                  min="6.0"
                  max="9.0"
                  step="0.5"
                  value={newMinCgpa}
                  onChange={e => setNewMinCgpa(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Min Readiness Score ({newMinScore}%)</label>
                <input
                  type="range"
                  min="60"
                  max="90"
                  step="5"
                  value={newMinScore}
                  onChange={e => setNewMinScore(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition text-xs shadow-md"
              >
                Publish & Broadcast Drive
              </button>
            </div>
          </form>
        )}

        {broadcastMessage && (
          <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500" /> {broadcastMessage}
          </div>
        )}

        {/* Placement Drives Table */}
        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
          {drives.map(drive => (
            <div
              key={drive.id}
              className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-cyan-500/40 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h6 className="font-bold text-slate-900 dark:text-white text-xs">{drive.company}</h6>
                  <Badge variant={drive.status === 'active' ? 'success' : 'info'}>
                    {drive.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">{drive.role}</p>
                <p className="text-[10px] text-slate-400">
                  CTC: <strong className="text-cyan-600 dark:text-cyan-400">{drive.ctc}</strong> • Min CGPA: {drive.minCgpa} • Registered: {drive.registeredCount} Students
                </p>
              </div>

              <button
                onClick={() => handleBroadcastDriveAlert(drive)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-[11px] transition flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" /> Broadcast Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
