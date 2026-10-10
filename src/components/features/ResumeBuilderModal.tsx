import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { FileText, Download, Printer, Sparkles, CheckCircle2, Edit3, Eye, Layers } from 'lucide-react';

interface ResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeBuilderModal: React.FC<ResumeBuilderModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const studentSkills = dataService.getStudentSkills().filter(s => s.self_level > 2 || s.teacher_verified);
  const submissions = dataService.getProjectSubmissions();
  const verifiedProjects = dataService.getProjects().filter(p => submissions.some(s => s.project_id === p.id));

  const [activeTheme, setActiveTheme] = useState<'modern' | 'executive' | 'minimal'>('modern');
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');

  const [contactInfo, setContactInfo] = useState({
    email: user.email || 'aarav.sharma@chitkara.edu.in',
    phone: '+91 98765 43210',
    github: 'github.com/aaravsharma-dev',
    linkedin: 'linkedin.com/in/aarav-sharma-cse',
    location: 'Chandigarh, Punjab, India'
  });

  const [summary, setSummary] = useState(
    `Motivated B.Tech ${studentProfile.branch.toUpperCase()} student (Semester ${studentProfile.current_semester}) aspiring to excel as a ${targetRole?.title || 'Software Engineer'}. Demonstrates strong core fundamentals in Data Structures, Algorithms, and Full Stack Web Development with an audited placement readiness score of ${studentProfile.placement_readiness_score}%.`
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# ${user.full_name}
**Target Role**: ${targetRole?.title || 'Software Engineer'}
**Email**: ${contactInfo.email} | **Phone**: ${contactInfo.phone}
**GitHub**: ${contactInfo.github} | **LinkedIn**: ${contactInfo.linkedin}

---

## Executive Summary
${summary}

---

## Technical Skills & Proficiencies
${studentSkills.map(s => `- **${s.skill_name}**: ${s.category} (${s.teacher_verified ? 'Teacher Verified' : 'Self Rated ' + s.self_level + '/5'})`).join('\n')}

---

## Featured Projects & Capstones
${verifiedProjects.length > 0 ? verifiedProjects.map(p => `### ${p.title}
- **Role & Stack**: ${p.tech_stack.join(', ')}
- **Problem**: ${p.description}
- **Difficulty**: ${p.difficulty}
`).join('\n') : `- E-Commerce Microservices Engine (React, Node.js, PostgreSQL, Docker)
- AI Placement Readiness Navigator (TypeScript, React, Tailwind CSS)`}

---

## Education & Academic Background
- **Degree**: Bachelor of Technology (B.Tech) in ${studentProfile.branch.toUpperCase()}
- **Semester**: ${studentProfile.current_semester}th Semester
- **Career Readiness Score**: ${studentProfile.placement_readiness_score}% (CareerPilot Verified)
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.full_name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Resume Builder & Exporter" maxWidth="xl">
      <div className="space-y-5">
        {/* Header bar: Theme selector, Print, Download */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'preview' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Live Preview
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'editor' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Content
            </button>
          </div>

          {/* Themes */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">Theme:</span>
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {(['modern', 'executive', 'minimal'] as const).map(theme => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className={`px-2.5 py-1 text-[11px] font-semibold capitalize rounded transition ${
                    activeTheme === theme
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" /> Print / PDF
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow hover:opacity-95 transition"
            >
              <Download className="w-3.5 h-3.5" /> Export Markdown
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'editor' ? (
          <div className="space-y-4 p-4 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-teal-500" /> Customize Resume Fields
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">Email</label>
                <input
                  type="text"
                  value={contactInfo.email}
                  onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={contactInfo.github}
                  onChange={e => setContactInfo({ ...contactInfo, github: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={contactInfo.linkedin}
                  onChange={e => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-xs mb-1">Professional Objective / Summary</label>
              <textarea
                rows={3}
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        ) : (
          /* Printable Paper Preview */
          <div
            id="resume-print-area"
            className={`p-6 sm:p-8 rounded-xl shadow-lg border transition ${
              activeTheme === 'modern'
                ? 'bg-white text-slate-900 border-slate-200'
                : activeTheme === 'executive'
                ? 'bg-slate-900 text-slate-100 border-slate-800'
                : 'bg-stone-50 text-slate-800 border-stone-200 font-serif'
            }`}
          >
            {/* Resume Header */}
            <div className={`pb-4 border-b ${activeTheme === 'executive' ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-bold tracking-tight">{user.full_name}</h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Target: {targetRole?.title || 'Software Engineer'}
                </span>
              </div>
              <p className="text-xs opacity-80 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span>📧 {contactInfo.email}</span>
                <span>📱 {contactInfo.phone}</span>
                <span>🌐 {contactInfo.github}</span>
                <span>💼 {contactInfo.linkedin}</span>
              </p>
            </div>

            {/* Section: Summary */}
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                Executive Profile
              </h3>
              <p className="text-xs leading-relaxed opacity-90">{summary}</p>
            </div>

            {/* Section: Education */}
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                Education & Academic Standing
              </h3>
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-semibold">B.Tech — Computer Science & Engineering ({studentProfile.branch.toUpperCase()})</span>
                  <p className="text-[11px] opacity-75">Chitkara University Institute of Engineering & Tech</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold">Semester {studentProfile.current_semester}</span>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Readiness Score: {studentProfile.placement_readiness_score}%</p>
                </div>
              </div>
            </div>

            {/* Section: Verified Skills */}
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
                Technical Skills & Verified Competencies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {studentSkills.map(skill => (
                  <span
                    key={skill.id}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      skill.teacher_verified
                        ? 'bg-teal-50 text-teal-700 border-teal-200 font-semibold'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {skill.skill_name} {skill.teacher_verified && '✓'}
                  </span>
                ))}
              </div>
            </div>

            {/* Section: Projects */}
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
                Key Capstone & Production Projects
              </h3>
              <div className="space-y-2 text-xs">
                {verifiedProjects.length > 0 ? (
                  verifiedProjects.map(p => (
                    <div key={p.id} className="p-2.5 rounded bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50">
                      <div className="flex items-center justify-between font-bold">
                        <span>{p.title}</span>
                        <span className="text-[10px] text-teal-600 font-mono">{p.tech_stack.join(' • ')}</span>
                      </div>
                      <p className="text-[11px] opacity-80 mt-0.5">{p.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50">
                      <div className="flex items-center justify-between font-bold">
                        <span>Full-Stack Placement Navigator (CareerPilot AI)</span>
                        <span className="text-[10px] text-teal-600 font-mono">React • TypeScript • Tailwind • Supabase</span>
                      </div>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        Architected end-to-end semester-wise career roadmap engine featuring verified skill matrix, ATS scanner, and mentor feedback suite.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50">
                      <div className="flex items-center justify-between font-bold">
                        <span>Microservices E-Commerce Engine</span>
                        <span className="text-[10px] text-teal-600 font-mono">Node.js • PostgreSQL • Docker • Git</span>
                      </div>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        Implemented JWT auth, payment gateway webhook handlers, and load-tested order processing pipeline.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section: Achievements & Certifications */}
            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                Verified Credentials & Achievements
              </h3>
              <ul className="list-disc list-inside text-xs opacity-90 space-y-0.5">
                <li>University Career & Placement Navigator Capstone Excellence Award (CareerPilot AI Platform)</li>
                <li>Data Structures & Algorithms Verified Mastery Badge (CareerPilot Assessment Score: 92%)</li>
                <li>Active Open Source Contributor & Peer Squad Leader</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
