import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { ProjectSubmission, HelpRequest } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import {
  FolderGit2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  MessageSquare,
  Send,
  Plus
} from 'lucide-react';

export const TeacherReviewPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(dataService.getProjectSubmissions());
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(dataService.getHelpRequests());

  const [activeReviewModal, setActiveReviewModal] = useState<ProjectSubmission | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  
  const [activeHelpModal, setActiveHelpModal] = useState<HelpRequest | null>(null);
  const [replyText, setReplyText] = useState('');

  // Create Assignment Modal State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignStudentId, setAssignStudentId] = useState('user_student_1');
  const [assignTitle, setAssignTitle] = useState('');
  const [assignDesc, setAssignDesc] = useState('');
  const [assignDueDate, setAssignDueDate] = useState('2026-04-10');

  const handleReviewAction = (status: 'approved' | 'changes_requested') => {
    if (!activeReviewModal) return;
    dataService.reviewSubmission(activeReviewModal.id, status, feedbackText);
    setSubmissions(dataService.getProjectSubmissions());
    setActiveReviewModal(null);
    setFeedbackText('');
  };

  const handleReplyHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeHelpModal) return;
    dataService.replyToHelpRequest(activeHelpModal.id, replyText);
    setHelpRequests(dataService.getHelpRequests());
    setActiveHelpModal(null);
    setReplyText('');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.createTeacherAssignment(assignStudentId, assignTitle, assignDesc, assignDueDate);
    setShowAssignModal(false);
    setAssignTitle('');
    setAssignDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-teal-400" />
            <span>Submission Review & Mentorship Suite</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review student project code repositories, approve verified badges, and reply to student guidance requests.
          </p>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Assign Task / Assignment</span>
        </button>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Submissions Pending Verification</h3>

        <div className="grid grid-cols-1 gap-4">
          {submissions.map(sub => (
            <Card key={sub.id} hoverEffect className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-base">{sub.project_title}</span>
                    <Badge variant={sub.status === 'approved' ? 'success' : sub.status === 'changes_requested' ? 'danger' : 'warning'}>
                      {sub.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Submitted by: <strong className="text-slate-700 dark:text-slate-200">{sub.student_name}</strong> • {new Date(sub.submitted_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={sub.github_repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1"
                  >
                    <span>View GitHub Repo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      setActiveReviewModal(sub);
                      setFeedbackText(sub.teacher_feedback || '');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 text-xs font-bold hover:bg-teal-400 transition"
                  >
                    Review & Grade
                  </button>
                </div>
              </div>

              {sub.notes && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-teal-600 dark:text-teal-400">Student Notes: </span>
                  {sub.notes}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Student Guidance Requests Section */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Help & Guidance Inbox</h3>

        <div className="grid grid-cols-1 gap-4">
          {helpRequests.map(req => (
            <Card key={req.id} hoverEffect className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{req.topic}</h4>
                  <p className="text-xs text-slate-500">From {req.student_name} ({req.branch.toUpperCase()} • Sem {req.semester})</p>
                </div>
                <Badge variant={req.status === 'resolved' ? 'success' : 'warning'}>{req.status}</Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-navy-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                "{req.message}"
              </p>

              {req.teacher_reply ? (
                <div className="text-xs text-teal-600 dark:text-teal-400 font-medium pl-3 border-l-2 border-teal-500">
                  <strong>Your Reply: </strong> {req.teacher_reply}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveHelpModal(req);
                    setReplyText('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold hover:bg-indigo-500/20 transition inline-block"
                >
                  Reply to Guidance Request
                </button>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Review & Grade Submission Modal */}
      {activeReviewModal && (
        <Modal
          isOpen={Boolean(activeReviewModal)}
          onClose={() => setActiveReviewModal(null)}
          title={`Review Submission: ${activeReviewModal.project_title}`}
        >
          <div className="space-y-4">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Student: <strong className="text-slate-900 dark:text-white">{activeReviewModal.student_name}</strong>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mentor Feedback & Suggestions</label>
              <textarea
                rows={3}
                required
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="Provide constructive feedback on repository code architecture, RLS security, or styling..."
                className="w-full p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleReviewAction('approved')}
                className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Verify Badge</span>
              </button>
              <button
                onClick={() => handleReviewAction('changes_requested')}
                className="py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Request Revisions</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Guidance Reply Modal */}
      {activeHelpModal && (
        <Modal
          isOpen={Boolean(activeHelpModal)}
          onClose={() => setActiveHelpModal(null)}
          title={`Reply to ${activeHelpModal.student_name}`}
        >
          <form onSubmit={handleReplyHelp} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              "{activeHelpModal.message}"
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Guidance Reply</label>
              <textarea
                rows={3}
                required
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write your response or schedule lab meeting time..."
                className="w-full p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
            >
              Send Reply
            </button>
          </form>
        </Modal>
      )}

      {/* Create Assignment Modal */}
      {showAssignModal && (
        <Modal
          isOpen={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          title="Create Student Assignment"
        >
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Student</label>
              <select
                value={assignStudentId}
                onChange={e => setAssignStudentId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              >
                <option value="user_student_1">Aarav Sharma (CSE Sem 5)</option>
                <option value="user_student_2">Priya Patel (AI/ML Sem 6)</option>
                <option value="user_student_3">Rohan Gupta (ECE Sem 4)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Assignment Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Solve 10 Graph BFS/DFS Problems"
                value={assignTitle}
                onChange={e => setAssignTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Instructions / Description</label>
              <textarea
                rows={3}
                required
                placeholder="Provide task requirements and submission repository expectations..."
                value={assignDesc}
                onChange={e => setAssignDesc(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                required
                value={assignDueDate}
                onChange={e => setAssignDueDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-lg"
            >
              Assign to Student
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
