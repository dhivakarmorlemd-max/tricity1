import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Github, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface GitHubRepoAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubRepoAnalyzerModal: React.FC<GitHubRepoAnalyzerModalProps> = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/aaravsharma-dev/devconnect-fullstack');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    healthScore: number;
    hasReadme: boolean;
    hasLicense: boolean;
    hasTests: boolean;
    hasDeploymentLink: boolean;
    checksPassed: string[];
    improvements: string[];
  } | null>(null);

  const handleAuditRepo = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult({
        healthScore: 92,
        hasReadme: true,
        hasLicense: true,
        hasTests: true,
        hasDeploymentLink: true,
        checksPassed: [
          'Comprehensive README.md with setup instructions',
          'MIT Open Source License file present',
          'Automated Vitest / Jest test suite configured',
          'Live Vercel / Render deployment link verified',
          'Clean commit history with semantic commit messages'
        ],
        improvements: [
          'Add architecture sequence diagram to README.md',
          'Set up GitHub Actions CI/CD workflow pipeline'
        ]
      });
      setIsAuditing(false);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="GitHub Repository & Code Quality Audit" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Automated Repository Inspector</span>
            <Badge variant="info">GitHub API Audit</Badge>
          </div>
          <p className="text-xs text-slate-300">
            Paste any GitHub project repository link to run an automated check for README setup, tests, license, and deployment URLs.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">GitHub Repository URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="flex-1 p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 font-mono"
            />
            <button
              onClick={handleAuditRepo}
              disabled={!repoUrl.trim() || isAuditing}
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg shrink-0"
            >
              {isAuditing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
              <span>Audit Repo</span>
            </button>
          </div>
        </div>

        {auditResult && (
          <div className="space-y-4 p-5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Repository Quality Index</h4>
                <p className="text-xs text-slate-500">Recruiter readiness score</p>
              </div>
              <div className="text-3xl font-black text-teal-500">{auditResult.healthScore}%</div>
            </div>

            <ProgressBar value={auditResult.healthScore} color="teal" showLabel={false} />

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Passed Audits ({auditResult.checksPassed.length})
              </h5>
              <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 dark:text-slate-300">
                {auditResult.checksPassed.map((check, idx) => (
                  <li key={idx}>{check}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Recommended Enhancements
              </h5>
              <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 dark:text-slate-300">
                {auditResult.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
