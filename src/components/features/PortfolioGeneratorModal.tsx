import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Globe, Download, Eye, Sparkles, Copy, CheckCircle2, Code2, ExternalLink } from 'lucide-react';

interface PortfolioGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioGeneratorModal: React.FC<PortfolioGeneratorModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const skills = dataService.getStudentSkills().filter(s => s.teacher_verified || s.self_level >= 3);
  const projects = dataService.getProjects();

  const [copied, setCopied] = useState(false);

  const portfolioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${user.full_name} — ${targetRole?.title || 'Software Engineer'} Portfolio</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 40px; }
    .container { max-width: 900px; margin: 0 auto; }
    .header { border-bottom: 1px solid #334155; padding-bottom: 24px; }
    h1 { font-size: 32px; color: #38bdf8; margin: 0 0 8px 0; }
    .tag { display: inline-block; background: rgba(56, 189, 248, 0.1); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.2); padding: 4px 12px; rounded-radius: 9999px; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 24px; }
    .card { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 12px; }
    .badge { background: #0f172a; color: #22d3ee; padding: 4px 8px; border-radius: 6px; font-size: 12px; margin-right: 6px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${user.full_name}</h1>
      <span class="tag">B.Tech ${studentProfile.branch.toUpperCase()} • ${targetRole?.title || 'Software Developer'}</span>
      <p>Career Readiness Score: ${studentProfile.placement_readiness_score}% (CareerPilot Verified)</p>
    </div>

    <h2>Technical Skills</h2>
    <div>
      ${skills.map(s => `<span class="badge">${s.skill_name} ${s.teacher_verified ? '✓' : ''}</span>`).join('')}
    </div>

    <h2>Featured Capstone Projects</h2>
    <div class="grid">
      ${projects.slice(0, 3).map(p => `
        <div class="card">
          <h3 style="color: #f8fafc; margin-top:0;">${p.title}</h3>
          <p style="color: #94a3b8; font-size:14px;">${p.description}</p>
          <div>${p.tech_stack.map(t => `<span class="badge">${t}</span>`).join('')}</div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(portfolioHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([portfolioHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.full_name.toLowerCase().replace(/\s+/g, '_')}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Autonomous Web Portfolio Generator" maxWidth="lg">
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-purple-500/10 border border-teal-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">Instant Portfolio Site Exporter</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Generates a responsive single-page developer portfolio from your verified platform achievements.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-indigo-400" /> {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" /> Download .html Site
            </button>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-mono text-[11px]">portfolio_preview.html — Live Rendering</span>
            <span className="text-teal-400 font-bold">100% Responsive HTML5 / CSS3</span>
          </div>

          <iframe
            srcDoc={portfolioHtml}
            title="Portfolio Live Preview"
            className="w-full h-80 rounded-lg border border-slate-800 bg-slate-950"
          />
        </div>
      </div>
    </Modal>
  );
};
