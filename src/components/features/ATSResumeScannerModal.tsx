import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { FileText, CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';

interface ATSResumeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ATSResumeScannerModal: React.FC<ATSResumeScannerModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);

  const [resumeText, setResumeText] = useState(
    `Aarav Sharma — Computer Science Student. Skilled in React, TypeScript, C++, Data Structures & Algorithms, Node.js, SQL databases, Git version control, and web development capstone projects.`
  );

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    matchPercentage: number;
    foundKeywords: string[];
    missingKeywords: string[];
    actionVerbScore: number;
  } | null>(null);

  const handleScanResume = () => {
    setIsScanning(true);
    setTimeout(() => {
      const requiredKeywords = targetRole?.topSkills || ["React", "Node.js", "TypeScript", "SQL/PostgreSQL", "Data Structures"];
      const extraKeywords = ["System Design", "Docker", "REST API", "Git", "Linux"];
      const allTarget = [...requiredKeywords, ...extraKeywords];

      const found: string[] = [];
      const missing: string[] = [];

      allTarget.forEach(kw => {
        const cleanKw = kw.toLowerCase().split('/')[0];
        if (resumeText.toLowerCase().includes(cleanKw)) {
          found.push(kw);
        } else {
          missing.push(kw);
        }
      });

      const matchPct = Math.round((found.length / allTarget.length) * 100);
      setScanResult({
        matchPercentage: matchPct,
        foundKeywords: found,
        missingKeywords: missing,
        actionVerbScore: 88
      });

      // Dynamically update readiness score
      updateProfile({ placement_readiness_score: Math.min(98, Math.max(70, matchPct)) });
      setIsScanning(false);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Automated ATS Resume & Skill Scanner" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Target Job Role Profile</span>
            <Badge variant="info">{targetRole?.title}</Badge>
          </div>
          <p className="text-xs text-slate-300">
            Paste your raw resume text below to analyze keyword density, formatting, and ATS placement match score.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Resume Content / Paste Resume Text</label>
          <textarea
            rows={5}
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder="Paste your resume sections (Education, Skills, Experience, Projects)..."
            className="w-full p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 font-mono"
          />
        </div>

        <button
          onClick={handleScanResume}
          disabled={!resumeText.trim() || isScanning}
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Resume ATS Match...</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>Run Automated ATS Scanner</span>
            </>
          )}
        </button>

        {scanResult && (
          <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">ATS Placement Match Score</h4>
                <p className="text-xs text-slate-500">Based on industry parser guidelines</p>
              </div>
              <div className="text-2xl font-black text-teal-500">{scanResult.matchPercentage}%</div>
            </div>

            <ProgressBar value={scanResult.matchPercentage} color={scanResult.matchPercentage >= 75 ? 'emerald' : 'amber'} showLabel={false} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Found Keywords ({scanResult.foundKeywords.length})
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.foundKeywords.map(kw => (
                    <span key={kw} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Recommended Additions ({scanResult.missingKeywords.length})
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.missingKeywords.map(kw => (
                    <span key={kw} className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
