import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Code2, Star, ThumbsUp, MessageSquare, Users, Sparkles, Send, Award, GitPullRequest } from 'lucide-react';

interface PeerCodeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CodeReviewItem {
  id: string;
  author: string;
  avatar: string;
  projectTitle: string;
  repoUrl: string;
  techStack: string[];
  stars: number;
  commentsCount: number;
  status: 'open' | 'reviewed';
}

const mockReviews: CodeReviewItem[] = [
  {
    id: 'rev_1',
    author: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    projectTitle: 'AI Resume Classifier & BERT NLP Pipeline',
    repoUrl: 'github.com/priyapatel/resume-bert-nlp',
    techStack: ['Python', 'PyTorch', 'BERT', 'FastAPI'],
    stars: 14,
    commentsCount: 5,
    status: 'open'
  },
  {
    id: 'rev_2',
    author: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    projectTitle: 'High-Performance Redis Clone in Rust',
    repoUrl: 'github.com/rohanverma/mini-redis-rust',
    techStack: ['Rust', 'Tokio', 'TCP Sockets'],
    stars: 22,
    commentsCount: 9,
    status: 'reviewed'
  }
];

export const PeerCodeReviewModal: React.FC<PeerCodeReviewModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<CodeReviewItem[]>(mockReviews);
  const [karmaPoints, setKarmaPoints] = useState(120);

  const [newTitle, setNewTitle] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [newStack, setNewStack] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleUpvote = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, stars: r.stars + 1 } : r))
    );
    setKarmaPoints(prev => prev + 5);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRepo) return;

    const newItem: CodeReviewItem = {
      id: `rev_${Date.now()}`,
      author: user.full_name,
      avatar: user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      projectTitle: newTitle,
      repoUrl: newRepo,
      techStack: newStack ? newStack.split(',').map(s => s.trim()) : ['React', 'TypeScript'],
      stars: 1,
      commentsCount: 0,
      status: 'open'
    };

    setReviews([newItem, ...reviews]);
    setNewTitle('');
    setNewRepo('');
    setNewStack('');
    setShowForm(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Peer Code Review & Collaboration Squad" maxWidth="lg">
      <div className="space-y-5">
        {/* Karma Header */}
        <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl border border-teal-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">Community Peer Karma Score</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Review peer code repositories to earn badges & squad leadership ranks.</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">{karmaPoints} pts</span>
            <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Level 3 Peer Reviewer</div>
          </div>
        </div>

        {/* Action button to create review request */}
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <GitPullRequest className="w-4 h-4 text-indigo-400" /> Active Peer Code Review Requests
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition flex items-center gap-1"
          >
            <Code2 className="w-3.5 h-3.5" /> Request Peer Review
          </button>
        </div>

        {/* New Form */}
        {showForm && (
          <form onSubmit={handleSubmitRequest} className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Project Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Task Queue in Go"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">GitHub Repository Link</label>
                <input
                  type="text"
                  required
                  placeholder="github.com/username/repo"
                  value={newRepo}
                  onChange={e => setNewRepo(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="Go, Docker, Redis"
                  value={newStack}
                  onChange={e => setNewStack(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" /> Submit Code for Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Feed */}
        <div className="space-y-3">
          {reviews.map(item => (
            <div key={item.id} className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30" />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">{item.author}</h5>
                    <a href={`https://${item.repoUrl}`} target="_blank" rel="noreferrer" className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline">
                      {item.repoUrl}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold transition"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" /> {item.stars}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.projectTitle}</h4>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {item.techStack.map(stack => (
                    <span key={stack} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> {item.commentsCount} Peer Feedback Notes
                </span>

                <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" /> Inspect Code & Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
