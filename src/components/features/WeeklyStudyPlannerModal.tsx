import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { ProgressBar } from '../ui/ProgressBar';
import { Clock, Calendar, Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface WeeklyStudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyStudyPlannerModal: React.FC<WeeklyStudyPlannerModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useAuth();

  const [dsaHours, setDsaHours] = useState(6);
  const [webDevHours, setWebDevHours] = useState(5);
  const [coreCsHours, setCoreCsHours] = useState(3);
  const [aptitudeHours, setAptitudeHours] = useState(2);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalAllocated = dsaHours + webDevHours + coreCsHours + aptitudeHours;
  const targetCommitment = studentProfile.weekly_hours;

  const handleSavePlanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ weekly_hours: totalAllocated });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Interactive Weekly Study Pacing Planner">
      <form onSubmit={handleSavePlanner} className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Weekly Target Commitment</span>
            <span className="text-xs font-black text-white">{totalAllocated} / {targetCommitment} Hours</span>
          </div>
          <ProgressBar value={Math.min(100, Math.round((totalAllocated / targetCommitment) * 100))} color="teal" showLabel={false} />
          {totalAllocated < targetCommitment && (
            <p className="text-[11px] text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>You have {targetCommitment - totalAllocated} unallocated study hours remaining this week.</span>
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Data Structures & Algorithms (LeetCode / STL)</span>
              <span className="text-teal-500">{dsaHours} Hours/Week</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={dsaHours}
              onChange={e => setDsaHours(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Web & Mobile Development / Project Capstone</span>
              <span className="text-teal-500">{webDevHours} Hours/Week</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={webDevHours}
              onChange={e => setWebDevHours(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Core CS Fundamentals (DBMS, OS, System Design)</span>
              <span className="text-teal-500">{coreCsHours} Hours/Week</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={coreCsHours}
              onChange={e => setCoreCsHours(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Aptitude, Quantitative & Communication Practice</span>
              <span className="text-teal-500">{aptitudeHours} Hours/Week</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={aptitudeHours}
              onChange={e => setAptitudeHours(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Weekly timetable saved and pacing profile updated!</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Weekly Timetable</span>
        </button>
      </form>
    </Modal>
  );
};
