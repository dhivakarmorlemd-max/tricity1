import React from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Trophy, Award, ShieldCheck, Users } from 'lucide-react';

interface PeerLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeerLeaderboardModal: React.FC<PeerLeaderboardModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const allUsers = dataService.getAllUsers().filter(u => u.role === 'student');

  // Compute live student ranks
  const rankedStudents = allUsers.map(student => {
    const profile = dataService.getStudentProfile(student.id);
    const skills = dataService.getStudentSkills(student.id);
    const submissions = dataService.getProjectSubmissions(student.id);
    return {
      user: student,
      profile,
      verifiedCount: skills.filter(s => s.teacher_verified).length,
      approvedProjects: submissions.filter(s => s.status === 'approved').length,
      score: profile.placement_readiness_score
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Class Placement Readiness Leaderboard" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Class Peer Benchmarking</h4>
              <p className="text-xs text-slate-400">Semester 5 Computer Science & IT Standings</p>
            </div>
          </div>
          <Badge variant="info">{rankedStudents.length} Students Active</Badge>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          {rankedStudents.map((item, idx) => {
            const isMe = item.user.id === user.id;
            return (
              <div
                key={item.user.id}
                className={`p-4 flex items-center justify-between gap-4 transition ${
                  isMe
                    ? 'bg-teal-50/60 dark:bg-teal-950/40 font-semibold'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    idx === 0
                      ? 'bg-amber-400 text-slate-950'
                      : idx === 1
                      ? 'bg-slate-300 text-slate-950'
                      : idx === 2
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>

                  <img
                    src={item.user.avatar_url}
                    alt={item.user.full_name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-500/20"
                  />

                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{item.user.full_name}</span>
                      {isMe && <Badge variant="info" size="sm">You</Badge>}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {item.profile.branch.toUpperCase()} • Sem {item.profile.current_semester}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="hidden sm:block text-right">
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {item.verifiedCount} Badges • {item.approvedProjects} Projects
                    </div>
                  </div>

                  <Badge variant={item.score >= 75 ? 'success' : 'warning'}>
                    {item.score}% Readiness
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
