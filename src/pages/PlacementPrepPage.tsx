import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { JobApplication } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { MockInterviewSimulatorModal } from '../components/features/MockInterviewSimulatorModal';
import { GitHubRepoAnalyzerModal } from '../components/features/GitHubRepoAnalyzerModal';
import {
  Briefcase,
  FileText,
  Github,
  Code2,
  Calculator,
  MessageSquare,
  Plus,
  Building2,
  MapPin,
  Trash2,
  Sparkles
} from 'lucide-react';

export const PlacementPrepPage: React.FC = () => {
  const { user, studentProfile } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>(dataService.getJobApplications());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showRepoAuditModal, setShowRepoAuditModal] = useState(false);

  // New Application Form State
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [appType, setAppType] = useState<'Internship' | 'Full-time'>('Internship');
  const [location, setLocation] = useState('Mohali / Hybrid');
  const [salary, setSalary] = useState('₹35,000 / month');
  const [deadline, setDeadline] = useState('2026-04-15');
  const [notes, setNotes] = useState('');

  // Dynamic Tracks Computed Stats
  const skills = dataService.getStudentSkills(user.id);
  const tasks = dataService.getStudentTaskProgress(user.id);
  const completedTaskCount = Object.values(tasks).filter(t => t.status === 'completed').length;
  const verifiedSkillCount = skills.filter(s => s.teacher_verified).length;

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp = dataService.addJobApplication({
      company_name: companyName,
      role_title: roleTitle,
      type: appType,
      status: 'Applied',
      location,
      stipend_or_salary: salary,
      application_date: new Date().toISOString().split('T')[0],
      deadline,
      notes
    });
    setApplications(dataService.getJobApplications());
    setShowAddModal(false);
    setCompanyName('');
    setRoleTitle('');
  };

  const handleStatusChange = (appId: string, newStatus: JobApplication['status']) => {
    dataService.updateJobApplicationStatus(appId, newStatus);
    setApplications(dataService.getJobApplications());
  };

  const handleDeleteApp = (appId: string) => {
    dataService.deleteJobApplication(appId);
    setApplications(dataService.getJobApplications());
  };

  const dynamicTracks = [
    {
      title: 'Resume ATS Readiness',
      desc: 'ATS formatting & verified project links check.',
      icon: FileText,
      score: `${studentProfile.github_url ? '88%' : '60%'} Ready`
    },
    {
      title: 'GitHub & Portfolio Showcase',
      desc: 'Live repository links & verification badges.',
      icon: Github,
      score: `${verifiedSkillCount} Verified Badges`
    },
    {
      title: 'Coding & Task Completion',
      desc: 'Semester roadmap milestones completed.',
      icon: Code2,
      score: `${completedTaskCount} Tasks Finished`
    },
    {
      title: 'Aptitude & Reasoning',
      desc: 'Quantitative accuracy & logical practice.',
      icon: Calculator,
      score: 'Dynamic Practice'
    },
    {
      title: 'Technical Interview Prep',
      desc: 'System design, OOP, and mentor review.',
      icon: MessageSquare,
      score: `${applications.filter(a => a.status === 'Interviewing').length} Active Interviews`
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-teal-400" />
            <span>Placement & Internship Command Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic application tracker with real-time status progression (Saved → Applied → Interviewing → Offered).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowInterviewModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Launch Mock Interview</span>
          </button>

          <button
            onClick={() => setShowRepoAuditModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>Audit GitHub Repo</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Dynamic Preparation Tracks Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dynamicTracks.map(t => {
          const Icon = t.icon;
          return (
            <Card key={t.title} hoverEffect className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
                  <Icon className="w-5 h-5" />
                </div>
                <Badge variant="info">{t.score}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Dynamic Application Tracking List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Internship & Job Applications ({applications.length})</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {applications.map(app => (
            <Card key={app.id} hoverEffect className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-500" />
                    <span className="font-bold text-slate-900 dark:text-white text-base">{app.company_name}</span>
                    <Badge variant={app.status === 'Offered' ? 'success' : app.status === 'Interviewing' ? 'warning' : 'info'}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{app.role_title} • {app.type}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                    <div className="font-bold text-teal-600 dark:text-teal-400">{app.stipend_or_salary}</div>
                    <div><MapPin className="w-3 h-3 inline mr-1" />{app.location}</div>
                  </div>

                  {/* Dynamic Status Dropdown Selector */}
                  <select
                    value={app.status}
                    onChange={e => handleStatusChange(app.id, e.target.value as any)}
                    className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered 🎉</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => handleDeleteApp(app.id)}
                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition"
                    title="Delete Application"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {app.notes && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-indigo-500">Interview / Stage Notes: </span>
                  {app.notes}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Add Job Application Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Track New Job / Internship Application"
        >
          <form onSubmit={handleAddApp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. TechCorp Systems"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Role Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Software Engineer Intern"
                value={roleTitle}
                onChange={e => setRoleTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Position Type</label>
                <select
                  value={appType}
                  onChange={e => setAppType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full-time">Full-time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Salary / Stipend</label>
                <input
                  type="text"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Interview / Deadline Notes</label>
              <textarea
                rows={3}
                placeholder="Round details, HR contacts, interview tips..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-lg"
            >
              Save Job Application
            </button>
          </form>
        </Modal>
      )}

      {/* Phase 2 Feature Modals */}
      <MockInterviewSimulatorModal isOpen={showInterviewModal} onClose={() => setShowInterviewModal(false)} />
      <GitHubRepoAnalyzerModal isOpen={showRepoAuditModal} onClose={() => setShowRepoAuditModal(false)} />
    </div>
  );
};
