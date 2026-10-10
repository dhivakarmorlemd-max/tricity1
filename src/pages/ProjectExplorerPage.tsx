import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { Project, ProjectSubmission } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PeerProjectReviewModal } from '../components/features/PeerProjectReviewModal';
import {
  FolderGit2,
  Code2,
  CheckCircle2,
  Github,
  Send,
  Plus,
  ShieldCheck,
  Star
} from 'lucide-react';

export const ProjectExplorerPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(dataService.getProjects());
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(dataService.getProjectSubmissions(user.id));
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [showPeerReviewModal, setShowPeerReviewModal] = useState(false);

  // Form inputs for submission
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  // Add Project Template Form State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Full Stack');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDesc, setNewDesc] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newWhy, setNewWhy] = useState('');
  const [newTechStack, setNewTechStack] = useState('React, Node.js, PostgreSQL');

  const filteredProjects = selectedDifficulty === 'All'
    ? projects
    : projects.filter(p => p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

  const handleOpenSubmission = (project: Project) => {
    setActiveProjectModal(project);
    const existing = submissions.find(s => s.project_id === project.id);
    if (existing) {
      setRepoUrl(existing.github_repo_url);
      setDemoUrl(existing.live_demo_url || '');
      setSubmissionNotes(existing.notes || '');
    } else {
      setRepoUrl('');
      setDemoUrl('');
      setSubmissionNotes('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProjectModal || !repoUrl) return;

    dataService.submitProject(activeProjectModal.id, repoUrl, demoUrl, submissionNotes);
    setSubmissions(dataService.getProjectSubmissions(user.id));
    setActiveProjectModal(null);
  };

  const handleAddProjectTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj = dataService.addCustomProjectTemplate({
      title: newTitle,
      category: newCategory,
      target_role_id: 'fullstack_dev',
      difficulty: newDifficulty,
      description: newDesc,
      problem_statement: newProblem,
      why_useful: newWhy,
      required_skills: ['JavaScript/TypeScript', 'React'],
      tech_stack: newTechStack.split(',').map(s => s.trim()),
      implementation_milestones: [
        'Set up repository and initialize folder architecture',
        'Build core frontend components and backend API',
        'Connect persistent database storage and deploy live demo'
      ],
      expected_outcome: 'Fully working deployable web product',
      testing_checklist: [
        'Form inputs validate correctly',
        'Database connections persist upon restart',
        'Code passes build without linter errors'
      ]
    });
    setProjects(dataService.getProjects());
    setShowAddProjectModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-teal-400" />
            <span>Capstone & Project Recommendation Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build industry-grade projects with structured problem statements, milestones, testing checklists, and mentor review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPeerReviewModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>Peer Code Reviews</span>
          </button>

          {/* Difficulty Filters */}
          <div className="flex gap-1 bg-slate-800 p-1 rounded-xl">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedDifficulty === diff
                    ? 'bg-teal-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddProjectModal(true)}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Template</span>
          </button>
        </div>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(proj => {
          const sub = submissions.find(s => s.project_id === proj.id);
          return (
            <Card key={proj.id} hoverEffect className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <Badge variant={proj.difficulty === 'Beginner' ? 'info' : proj.difficulty === 'Intermediate' ? 'warning' : 'danger'}>
                      {proj.difficulty}
                    </Badge>
                    {proj.custom && <Badge variant="neutral" size="sm">User Custom</Badge>}
                  </div>
                  {sub && (
                    <Badge variant={sub.status === 'approved' ? 'success' : 'warning'}>
                      {sub.status}
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech_stack.map(st => (
                      <span key={st} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleOpenSubmission(proj)}
                  className="w-full py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4" />
                  <span>{sub ? 'View / Update Submission' : 'View Spec & Submit'}</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Project Spec & Submission Modal */}
      {activeProjectModal && (
        <Modal
          isOpen={Boolean(activeProjectModal)}
          onClose={() => setActiveProjectModal(null)}
          title={`Project Spec: ${activeProjectModal.title}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Problem Statement</h4>
                <p className="text-xs text-slate-800 dark:text-slate-200 mt-1">{activeProjectModal.problem_statement}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Why This Project Is Useful</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">{activeProjectModal.why_useful}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Implementation Milestones</h4>
              <ul className="space-y-1.5">
                {activeProjectModal.implementation_milestones.map((m, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Testing & Quality Checklist</h4>
              <ul className="space-y-1.5">
                {activeProjectModal.testing_checklist.map((chk, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-slate-900 text-white space-y-4 border border-slate-800">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <Github className="w-4 h-4" />
                <span>Submit / Link Project Repository</span>
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">GitHub Repository URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project-repo"
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Live Demo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://my-app.vercel.app"
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Submission Notes for Mentor Review</label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe your implementation architecture and setup instructions..."
                  value={submissionNotes}
                  onChange={e => setSubmissionNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Submit for Mentor Verification</span>
              </button>
            </form>
          </div>
        </Modal>
      )}

      {/* Add Custom Project Template Modal */}
      {showAddProjectModal && (
        <Modal
          isOpen={showAddProjectModal}
          onClose={() => setShowAddProjectModal(false)}
          title="Add Custom Project Template"
        >
          <form onSubmit={handleAddProjectTemplate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. AI-Powered Resume Parser API"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={e => setNewDifficulty(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
              <textarea
                rows={2}
                required
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Problem Statement</label>
              <textarea
                rows={2}
                value={newProblem}
                onChange={e => setNewProblem(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={newTechStack}
                onChange={e => setNewTechStack(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-lg"
            >
              Add Project Template
            </button>
          </form>
        </Modal>
      )}

      {/* Peer Review Modal */}
      <PeerProjectReviewModal isOpen={showPeerReviewModal} onClose={() => setShowPeerReviewModal(false)} />
    </div>
  );
};
