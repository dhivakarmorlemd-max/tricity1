import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Calendar, CheckCircle2, UserCheck, Search, Send } from 'lucide-react';

interface HRCandidateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Candidate {
  id: string;
  name: string;
  branch: string;
  semester: number;
  cgpa: number;
  readinessScore: number;
  badges: string[];
  targetRole: string;
  preferredCtc: string;
}

const mockCandidates: Candidate[] = [
  {
    id: 'cand_1',
    name: 'Aarav Sharma',
    branch: 'Computer Science & Eng',
    semester: 7,
    cgpa: 8.9,
    readinessScore: 94,
    badges: ['DSA Master', 'React & Next.js', 'AWS Solutions'],
    targetRole: 'Full Stack SDE',
    preferredCtc: '₹18 - 24 LPA'
  },
  {
    id: 'cand_2',
    name: 'Ananya Verma',
    branch: 'AI & Data Science',
    semester: 7,
    cgpa: 9.1,
    readinessScore: 91,
    badges: ['PyTorch', 'MLOps', 'System Architecture'],
    targetRole: 'AI/ML Engineer',
    preferredCtc: '₹20 - 26 LPA'
  },
  {
    id: 'cand_3',
    name: 'Rohan Kulkarni',
    branch: 'Information Technology',
    semester: 7,
    cgpa: 8.5,
    readinessScore: 88,
    badges: ['Node.js Microservices', 'Docker / Kubernetes', 'PostgreSQL'],
    targetRole: 'Backend Engineer',
    preferredCtc: '₹16 - 22 LPA'
  },
  {
    id: 'cand_4',
    name: 'Priya Sundaram',
    branch: 'Electronics & Comm',
    semester: 8,
    cgpa: 8.7,
    readinessScore: 86,
    badges: ['Embedded C++', 'Distributed Systems', 'GitOps'],
    targetRole: 'Systems SDE',
    preferredCtc: '₹15 - 20 LPA'
  }
];

export const HRCandidateBookingModal: React.FC<HRCandidateBookingModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minScore, setMinScore] = useState<number>(80);
  const [invitedCandidates, setInvitedCandidates] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Booking Drawer State
  const [interviewType, setInterviewType] = useState<string>('System Architecture & Coding');
  const [bookingDate, setBookingDate] = useState<string>('2026-10-15');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [recruiterNote, setRecruiterNote] = useState<string>('We reviewed your verified readiness score and would love to invite you for an expedited SDE-1 interview.');

  const handleSendInvite = (cand: Candidate) => {
    dataService.createHelpRequest(
      `HR Direct Interview Invite: ${cand.name} (${cand.targetRole})`,
      `Recruiter slot scheduled for ${bookingDate} at ${bookingTime}. Round: ${interviewType}. Note: ${recruiterNote}`
    );
    setInvitedCandidates(prev => [...prev, cand.id]);
    setSelectedCandidate(null);
  };

  // Include current student in candidate list if they match score filter
  const allCandidates: Candidate[] = [
    {
      id: 'cand_user',
      name: `${user.full_name} (You)`,
      branch: studentProfile.branch || 'Computer Science',
      semester: studentProfile.current_semester || 7,
      cgpa: (studentProfile as any).cgpa || 8.6,
      readinessScore: studentProfile.placement_readiness_score || 85,
      badges: ['Core CS', 'DSA', 'Full Stack'],
      targetRole: 'Software Development Engineer',
      preferredCtc: '₹18 - 25 LPA'
    },
    ...mockCandidates
  ];

  const filteredCandidates = allCandidates.filter(
    c => c.readinessScore >= minScore && (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.targetRole.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Corporate HR Direct Candidate Booking & Sponsorship Portal" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-indigo-900/30 rounded-xl border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Enterprise HR Recruiter Portal</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Directly interview verified, high-readiness students based on benchmarked skill analytics and portfolio proof.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Direct Hiring Active
          </Badge>
        </div>

        {/* Filter Controls */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name or role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Min Readiness Score: <span className="font-bold text-emerald-600 dark:text-emerald-400">{minScore}%</span>
            </label>
            <input
              type="range"
              min="70"
              max="95"
              step="5"
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              className="accent-emerald-500 cursor-pointer w-32"
            />
          </div>
        </div>

        {/* Selected Candidate Schedule Modal Drawer */}
        {selectedCandidate && (
          <div className="p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-xs">
                  Schedule Direct Interview with <span className="text-emerald-600 dark:text-emerald-400">{selectedCandidate.name}</span>
                </h5>
                <p className="text-[10px] text-slate-400">Target Role: {selectedCandidate.targetRole} • Readiness: {selectedCandidate.readinessScore}%</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Interview Round
                </label>
                <select
                  value={interviewType}
                  onChange={e => setInterviewType(e.target.value)}
                  className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option>System Architecture & Coding</option>
                  <option>Initial HR & Behavioral Screening</option>
                  <option>Full Stack Live Sandbox Pair Programming</option>
                  <option>Executive Leadership & CTO Final Round</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Interview Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Time Slot (IST)
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={e => setBookingTime(e.target.value)}
                  className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Recruiter Invitation Message
              </label>
              <textarea
                value={recruiterNote}
                onChange={e => setRecruiterNote(e.target.value)}
                rows={2}
                className="w-full p-2 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => handleSendInvite(selectedCandidate)}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition flex items-center gap-1.5 text-xs shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Recruiter Invitation & Sync Calendar
              </button>
            </div>
          </div>
        )}

        {/* Candidate List */}
        <div className="space-y-3">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
            Verified Candidates Ready for Direct Placement ({filteredCandidates.length})
          </h5>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {filteredCandidates.map(cand => {
              const hasInvited = invitedCandidates.includes(cand.id);

              return (
                <div
                  key={cand.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-emerald-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h6 className="font-bold text-slate-900 dark:text-white text-xs">{cand.name}</h6>
                      <Badge variant="success">Readiness {cand.readinessScore}%</Badge>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                      {cand.targetRole} • {cand.branch} (Sem {cand.semester}) • CGPA: {cand.cgpa}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cand.badges.map((b, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px]">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    {hasInvited ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Interview Booked
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Book Interview Slot
                      </button>
                    )}
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
