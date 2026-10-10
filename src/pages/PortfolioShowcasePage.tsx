import React from 'react';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Award, Github, Linkedin, ExternalLink, ShieldCheck, Mail, BookOpen } from 'lucide-react';

export const PortfolioShowcasePage: React.FC = () => {
  const { user, studentProfile } = useAuth();
  const skills = dataService.getStudentSkills(user.id);
  const submissions = dataService.getProjectSubmissions(user.id).filter(s => s.status === 'approved');

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Portfolio Card Preview */}
      <Card className="space-y-6 p-8 bg-gradient-to-br from-white via-slate-50 to-teal-50/20 dark:from-navy-900 dark:via-slate-900 dark:to-teal-950/20 border-teal-500/20">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={user.avatar_url}
            alt={user.full_name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-teal-500/30 shadow-xl"
          />
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{user.full_name}</h1>
              <Badge variant="success">
                <ShieldCheck className="w-3 h-3 mr-1 inline" /> Verified Student
              </Badge>
            </div>
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
              Semester {studentProfile.current_semester} {studentProfile.branch.toUpperCase()} Student • Target Full Stack Engineer
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {studentProfile.bio || 'Passionate B.Tech engineering student dedicated to mastering software development, data structures, and web application architecture.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              {studentProfile.github_url && (
                <a
                  href={studentProfile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {studentProfile.linkedin_url && (
                <a
                  href={studentProfile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-blue-500 transition"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Verified Skills Showcase */}
      <Card className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Verified Technical Competencies</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>{s.skill_name}</span>
                {s.teacher_verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
              <div className="text-[10px] text-slate-400">Level {s.self_level} / 5 • Quiz: {s.assessment_score}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Approved Capstone Projects Showcase */}
      <Card className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-500" />
          <span>Approved Capstone Projects</span>
        </h3>

        <div className="space-y-3">
          {submissions.map(sub => (
            <div key={sub.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sub.project_title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub.notes}</p>
              </div>
              <a
                href={sub.github_repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold hover:bg-teal-500/20 transition flex items-center gap-1 shrink-0"
              >
                <span>View Code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
