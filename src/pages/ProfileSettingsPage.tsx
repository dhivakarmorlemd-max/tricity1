import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { appConfig } from '../config/appConfig';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ATSResumeTailorModal } from '../components/features/ATSResumeTailorModal';
import { User, Settings, Sparkles, Check, Save, FileText } from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { user, studentProfile, updateProfile } = useAuth();

  const [bio, setBio] = useState(studentProfile.bio || '');
  const [githubUrl, setGithubUrl] = useState(studentProfile.github_url || '');
  const [linkedinUrl, setLinkedinUrl] = useState(studentProfile.linkedin_url || '');
  const [portfolioUrl, setPortfolioUrl] = useState(studentProfile.portfolio_url || '');
  const [resumeUrl, setResumeUrl] = useState(studentProfile.resume_url || '');
  const [saved, setSaved] = useState(false);
  const [showTailorModal, setShowTailorModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      bio,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      portfolio_url: portfolioUrl,
      resume_url: resumeUrl
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal-400" />
            <span>Profile & App Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal links, portfolio URLs, and review global brand configuration.
          </p>
        </div>

        <button
          onClick={() => setShowTailorModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Generate AI Tailored Resume</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Profile changes saved successfully! Readiness score updated.</span>
        </div>
      )}

      {/* User Profile Links Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-5 h-5 text-teal-500" />
            <span>Student Profile & Placement Links</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Professional Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={e => setLinkedinUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Portfolio Website URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={e => setPortfolioUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Resume Document PDF URL</label>
              <input
                type="url"
                value={resumeUrl}
                onChange={e => setResumeUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </form>
      </Card>

      {/* Global Config Settings Showcase */}
      <Card className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <span>Configurable Branding & Features (appConfig.ts)</span>
        </h3>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs space-y-2">
          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Application Name:</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">{appConfig.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Hackathon Badge:</span>
            <span className="font-bold text-slate-900 dark:text-white">{appConfig.hackathonBadge}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Color System Palette:</span>
            <span className="font-bold text-indigo-500">Deep Navy & Slate / Teal Accents</span>
          </div>
        </div>
      </Card>

      {/* ATS Resume Tailor Modal */}
      <ATSResumeTailorModal isOpen={showTailorModal} onClose={() => setShowTailorModal(false)} />
    </div>
  );
};
