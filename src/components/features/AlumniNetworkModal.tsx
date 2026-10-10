import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Users, GraduationCap, Building2, MessageSquare, Send, Search, CheckCircle2, Star } from 'lucide-react';

interface AlumniNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AlumniProfile {
  id: string;
  name: string;
  avatar: string;
  company: string;
  role: string;
  batchYear: string;
  branch: string;
  location: string;
  topTip: string;
  availableForReferral: boolean;
}

const mockAlumni: AlumniProfile[] = [
  {
    id: 'alum_1',
    name: 'Karan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    company: 'Google',
    role: 'Software Engineer II',
    batchYear: 'Batch of 2024',
    branch: 'CSE',
    location: 'Bengaluru',
    topTip: 'Focus heavily on Tree & Graph BFS/DFS traversal patterns in Semesters 4 & 5. Do not skip OS concurrency concepts.',
    availableForReferral: true
  },
  {
    id: 'alum_2',
    name: 'Neha Gupta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    company: 'Amazon',
    role: 'SDE-1 (AWS)',
    batchYear: 'Batch of 2023',
    branch: 'CSE',
    location: 'Hyderabad',
    topTip: 'Amazon Leadership Principles matter as much as coding rounds! Prepare 3 STAR format project stories for your capstone.',
    availableForReferral: true
  },
  {
    id: 'alum_3',
    name: 'Siddharth Rao',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    company: 'Microsoft',
    role: 'Frontend Engineer',
    batchYear: 'Batch of 2024',
    branch: 'IT',
    location: 'Noida',
    topTip: 'Build one high-quality production React/TypeScript project with proper state management instead of 5 basic tutorial projects.',
    availableForReferral: false
  }
];

export const AlumniNetworkModal: React.FC<AlumniNetworkModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedAlumni, setRequestedAlumni] = useState<string[]>([]);

  const handleRequestMentorship = (alumni: AlumniProfile) => {
    dataService.createHelpRequest(
      `Alumni Referral & Mentorship Request: ${alumni.name} (${alumni.company})`,
      `Hi ${alumni.name}, I am a B.Tech student using CareerPilot AI. I am aiming for ${alumni.role} roles and would love your guidance or referral.`
    );
    setRequestedAlumni(prev => [...prev, alumni.id]);
  };

  const filteredAlumni = mockAlumni.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="University Alumni Mentorship & Referral Network" maxWidth="lg">
      <div className="space-y-5">
        {/* Search */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search alumni by company or role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <span className="text-xs text-teal-600 dark:text-teal-400 font-bold hidden sm:inline">
            🎓 Verified Chitkara Alumni Network
          </span>
        </div>

        {/* Alumni List */}
        <div className="space-y-3">
          {filteredAlumni.map(alumni => {
            const hasRequested = requestedAlumni.includes(alumni.id);

            return (
              <div
                key={alumni.id}
                className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={alumni.avatar} alt={alumni.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{alumni.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {alumni.batchYear}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                        {alumni.role} @ <strong className="text-slate-900 dark:text-white">{alumni.company}</strong>
                      </p>
                    </div>
                  </div>

                  {hasRequested ? (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed flex items-center gap-1.5 self-start sm:self-center"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Request Sent
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRequestMentorship(alumni)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-teal-500 to-indigo-600 hover:opacity-95 text-white transition flex items-center gap-1.5 shadow self-start sm:self-center"
                    >
                      <Send className="w-3.5 h-3.5" /> Request Referral & Advice
                    </button>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">💡 Alumni Placement Tip:</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{alumni.topTip}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
