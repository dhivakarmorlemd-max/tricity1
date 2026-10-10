import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { appConfig } from '../config/appConfig';
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Code
} from 'lucide-react';

export const StudentOnboardingPage: React.FC = () => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState('cse');
  const [currentSemester, setCurrentSemester] = useState(5);
  const [targetRoleId, setTargetRoleId] = useState('fullstack_dev');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finish Onboarding
      updateProfile({
        branch,
        current_semester: Number(currentSemester),
        target_role_id: targetRoleId,
        skill_level: skillLevel,
        weekly_hours: Number(weeklyHours),
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        onboarded: true
      });
      navigate('/roadmap');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#090616] text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* 2026 Ambient Glows */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-black text-base font-heading">{appConfig.name} Setup Wizard</span>
        </div>
        <div className="text-xs text-purple-300 font-semibold">Step {step} of 4</div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="max-w-2xl mx-auto w-full py-8">
        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm shadow-purple-500/40' : 'bg-purple-950/60'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Academic Branch & Semester */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-teal-400" />
                <span>Academic Profile</span>
              </h2>
              <p className="text-xs text-slate-400">
                Select your engineering discipline and current academic semester to personalize your roadmap.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Engineering Branch</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {appConfig.academic.branches.map(b => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setBranch(b.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                        branch === b.id
                          ? 'bg-teal-950/80 border-teal-500 text-teal-300 font-bold shadow-md shadow-teal-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-white font-bold">{b.name}</div>
                      <div className="text-[10px] text-slate-500">Code: {b.code}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Current Semester</label>
                <select
                  value={currentSemester}
                  onChange={e => setCurrentSemester(Number(e.target.value))}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  {appConfig.academic.semesters.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.year})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Career Goal & Target Job Role */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                <Target className="w-6 h-6 text-teal-400" />
                <span>Target Career Aspirations</span>
              </h2>
              <p className="text-xs text-slate-400">
                Which industry role are you aiming to crack during campus placements?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {appConfig.careerRoles.map(role => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => setTargetRoleId(role.id)}
                  className={`p-4 rounded-xl border text-left transition ${
                    targetRoleId === role.id
                      ? 'bg-teal-950/80 border-teal-500 shadow-md shadow-teal-500/10'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-white">{role.title}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
                      {role.avgSalaryRange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{role.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {role.topSkills.map(sk => (
                      <span key={sk} className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Skill Self-Assessment & Hours */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                <Clock className="w-6 h-6 text-teal-400" />
                <span>Current Knowledge & Time Pacing</span>
              </h2>
              <p className="text-xs text-slate-400">
                Self-evaluate your current programming comfort and available weekly commitment.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Self-Assessed Skill Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as const).map(lvl => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setSkillLevel(lvl)}
                      className={`p-3 rounded-xl border text-center text-xs capitalize font-bold transition ${
                        skillLevel === lvl
                          ? 'bg-teal-950/80 border-teal-500 text-teal-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Available Weekly Study Hours</span>
                  <span className="text-teal-400">{weeklyHours} hours / week</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="1"
                  value={weeklyHours}
                  onChange={e => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">GitHub Profile URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Generate */}
        {step === 4 && (
          <div className="space-y-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-teal-500/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white">Roadmap Generation Ready!</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                We've configured a custom, semester-by-semester career path tailored for your target role.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Branch & Semester:</span>
                <span className="font-bold text-teal-400 uppercase">{branch} • Semester {currentSemester}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Target Role:</span>
                <span className="font-bold text-teal-400">{appConfig.careerRoles.find(r => r.id === targetRoleId)?.title}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Pacing Commitment:</span>
                <span className="font-bold text-white">{weeklyHours} Hours / Week</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-900">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-teal-500/20"
          >
            <span>{step === 4 ? 'Generate & Open Roadmap' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500">
        {appConfig.name} • Personalized Academic Navigator
      </div>
    </div>
  );
};
