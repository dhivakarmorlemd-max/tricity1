import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { ProjectSubmission } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { FolderGit2, Star, Send, ShieldCheck, ExternalLink, MessageSquare } from 'lucide-react';

interface PeerProjectReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeerProjectReviewModal: React.FC<PeerProjectReviewModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const submissions = dataService.getProjectSubmissions();
  
  const [selectedSub, setSelectedSub] = useState<ProjectSubmission | null>(submissions[0] || null);
  const [peerRating, setPeerRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [submittedComment, setSubmittedComment] = useState(false);

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText) return;
    setSubmittedComment(true);
    setTimeout(() => {
      setSubmittedComment(false);
      setCommentText('');
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Peer Project Showcase & Rating Suite" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold">Classmate Capstone Submissions</h4>
            <p className="text-xs text-slate-400">Review repositories, rate code quality & post constructive feedback</p>
          </div>
          <Badge variant="info">{submissions.length} Submissions</Badge>
        </div>

        {/* Selected Project Card Details */}
        {selectedSub && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{selectedSub.project_title}</h3>
                <p className="text-xs text-slate-500">Submitted by: <strong>{selectedSub.student_name}</strong></p>
              </div>
              <a
                href={selectedSub.github_repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold hover:bg-teal-500/20 transition flex items-center gap-1 shrink-0"
              >
                <span>Explore Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">"{selectedSub.notes}"</p>

            {/* Peer Rating Form */}
            <form onSubmit={handlePostReview} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rate Code Quality & Architecture</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setPeerRating(star)}
                    >
                      <Star className={`w-4 h-4 ${star <= peerRating ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                required
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a constructive peer review comment..."
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />

              {submittedComment && (
                <div className="text-xs text-emerald-400 font-bold">✓ Peer review comment posted successfully!</div>
              )}

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
              >
                Submit Peer Rating
              </button>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};
