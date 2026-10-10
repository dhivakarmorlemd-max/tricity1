import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ClassAnnouncementsModal } from '../components/features/ClassAnnouncementsModal';
import {
  Users,
  FolderGit2,
  CheckSquare2,
  HelpCircle,
  ShieldCheck,
  Search,
  Megaphone
} from 'lucide-react';

export const TeacherDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const allUsers = dataService.getAllUsers().filter(u => u.role === 'student');
  const submissions = dataService.getProjectSubmissions();
  const helpRequests = dataService.getHelpRequests();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);

  // Dynamic Metrics Calculation
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');
  const openHelp = helpRequests.filter(h => h.status === 'open');
  const classAvg = dataService.calculateClassReadinessAverage();

  const filteredStudents = allUsers.filter(s =>
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Mentor Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold">Teacher & Mentor Command Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor dynamic student progress, review submissions, and manage class assignments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAnnounceModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-lg"
          >
            <Megaphone className="w-4 h-4" />
            <span>Broadcast Announcement</span>
          </button>

          <Link
            to="/teacher/submissions"
            className="px-3.5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Review Pending Submissions ({pendingSubmissions.length})</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{allUsers.length}</div>
          <p className="text-[11px] text-slate-500">Live Active Profiles</p>
        </Card>

        <Card hoverEffect className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Pending Submissions</span>
            <FolderGit2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{pendingSubmissions.length}</div>
          <p className="text-[11px] text-slate-500">Awaiting code review</p>
        </Card>

        <Card hoverEffect className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Open Help Requests</span>
            <HelpCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{openHelp.length}</div>
          <p className="text-[11px] text-slate-500">Guidance requested</p>
        </Card>

        <Card hoverEffect className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Class Readiness Avg</span>
            <CheckSquare2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{classAvg}%</div>
          <p className="text-[11px] text-slate-500">Dynamic Class Mean</p>
        </Card>
      </div>

      {/* Student Progress Overview */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-500" />
            <span>Authorized Student Directory & Progress</span>
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search student name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredStudents.map(student => {
            const profile = dataService.getStudentProfile(student.id);
            return (
              <div key={student.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar_url}
                    alt={student.full_name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/20"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{student.full_name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {profile.branch.toUpperCase()} • Semester {profile.current_semester} • Target: Full Stack
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="text-[10px] font-bold text-slate-400 text-right mb-0.5">Readiness Score</div>
                    <ProgressBar value={profile.placement_readiness_score} size="sm" color="teal" showLabel={false} />
                  </div>

                  <Badge variant={profile.placement_readiness_score >= 70 ? 'success' : 'warning'}>
                    {profile.placement_readiness_score}% Index
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Broadcast Announcement Modal */}
      <ClassAnnouncementsModal isOpen={showAnnounceModal} onClose={() => setShowAnnounceModal(false)} />
    </div>
  );
};
