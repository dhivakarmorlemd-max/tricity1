import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Mail, Copy, CheckCircle2, Sparkles, Send, Building2, User, Sliders } from 'lucide-react';

interface ColdEmailGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColdEmailGeneratorModal: React.FC<ColdEmailGeneratorModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();

  const [companyName, setCompanyName] = useState<string>('Stripe India');
  const [recruiterName, setRecruiterName] = useState<string>('Sarah Jenkins (Engineering Director)');
  const [targetRole, setTargetRole] = useState<string>('Software Development Engineer - Early Career');
  const [tone, setTone] = useState<'technical' | 'founder' | 'alumni' | 'formal'>('technical');
  const [copied, setCopied] = useState<boolean>(false);

  const generateEmailText = () => {
    if (tone === 'technical') {
      return {
        subject: `Engineering Inquiry: ${user.full_name} - SDE Candidate for ${companyName}`,
        body: `Hi ${recruiterName.split(' ')[0]},\n\nI hope this email finds you well.\n\nI’ve been following ${companyName}'s work in high-concurrency payment infrastructure with great admiration. As a final-year ${studentProfile.branch.toUpperCase()} student with a verified ${studentProfile.placement_readiness_score}% Placement Readiness Score, I specialize in building distributed microservices, React/TypeScript frontends, and PostgreSQL database sharding.\n\nRecently, I built an end-to-end full-stack platform featuring real-time system design latency telemetry (handling 100k QPS simulation) and passed 20+ automated Vitest verification suites.\n\nI would love the opportunity to contribute to ${companyName}'s engineering team for the ${targetRole} position. Are you open to a brief 10-minute chat next week?\n\nBest regards,\n${user.full_name}\nGitHub: ${studentProfile.github_url || 'https://github.com/student'}\nPortfolio: ${studentProfile.portfolio_url || 'https://careerpilot.ai/portfolio'}`
      };
    } else if (tone === 'founder') {
      return {
        subject: `High-Impact SDE Candidate for ${companyName} - ${user.full_name}`,
        body: `Hey ${recruiterName.split(' ')[0]},\n\nI love what you are building at ${companyName}! As a product-focused engineer who ships clean code fast, I wanted to reach out directly regarding the ${targetRole} opening.\n\nMy background includes building production-ready TypeScript/React applications, implementing Kafka write buffers, and maintaining a ${studentProfile.placement_readiness_score}% readiness rating on CareerPilot AI.\n\nWould love to show you a 2-minute demo of my recent projects. Do you have time for a quick call this Thursday?\n\nCheers,\n${user.full_name}`
      };
    } else if (tone === 'alumni') {
      return {
        subject: `College Alumni Connection - ${targetRole} Opportunity at ${companyName}`,
        body: `Hi ${recruiterName.split(' ')[0]},\n\nI hope you are having a great week! I am a senior at our alma mater pursuing B.Tech in ${studentProfile.branch.toUpperCase()}.\n\nI saw that you are leading engineering efforts at ${companyName} and wanted to reach out. I am currently preparing for ${targetRole} roles with a focus on DSA, System Architecture, and Cloud Technologies.\n\nI would greatly appreciate any advice or guidance on navigating the application process at ${companyName}.\n\nThank you for your time,\n${user.full_name}`
      };
    } else {
      return {
        subject: `Application Inquiry: ${targetRole} - ${user.full_name}`,
        body: `Dear ${recruiterName},\n\nI am writing to express my strong interest in the ${targetRole} position at ${companyName}.\n\nI am a graduating engineering student specializing in ${studentProfile.branch.toUpperCase()} with an academic CGPA of 8.6 and a verified readiness score of ${studentProfile.placement_readiness_score}%. My technical proficiency includes Full Stack Web Development, Cloud Infrastructure, and Data Structures.\n\nAttached is my resume for your review. I look forward to the possibility of discussing how my skills align with ${companyName}'s goals.\n\nSincerely,\n${user.full_name}`
      };
    }
  };

  const email = generateEmailText();

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Technical Resume Tailor & Cold Email Generator" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30 rounded-xl border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Recruiter Outreach & Cold Email Engine</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generate tailored outreach emails with verified project metrics and student readiness proof.
              </p>
            </div>
          </div>
          <Badge variant="success">
            AI Copywriter Active
          </Badge>
        </div>

        {/* Input Controls */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Recruiter Name / Title</label>
              <input
                type="text"
                value={recruiterName}
                onChange={e => setRecruiterName(e.target.value)}
                className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Target Position</label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Outreach Tone Style</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTone('technical')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  tone === 'technical'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                ⚡ Technical SDE (Metric-Heavy)
              </button>
              <button
                onClick={() => setTone('founder')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  tone === 'founder'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                🚀 Startup Founder Casual
              </button>
              <button
                onClick={() => setTone('alumni')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  tone === 'alumni'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                🎓 Alumni Connection
              </button>
              <button
                onClick={() => setTone('formal')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  tone === 'formal'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                💼 Enterprise Formal
              </button>
            </div>
          </div>
        </div>

        {/* Email Preview & Copy Box */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-800">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">Generated Email Subject</span>
              <p className="font-bold text-xs text-blue-400">{email.subject}</p>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy Payload'}
            </button>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-800">
            {email.body}
          </div>
        </div>
      </div>
    </Modal>
  );
};
