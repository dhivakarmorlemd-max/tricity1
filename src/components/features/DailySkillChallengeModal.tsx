import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Flame, Zap, CheckCircle2, XCircle, Award, Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface DailySkillChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChallengeQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpValue: number;
}

const dailyQuestion: ChallengeQuestion = {
  id: 'daily_oct_09',
  topic: 'System Design & Distributed Caching',
  question: 'In a microservices architecture, which caching strategy updates the cache synchronously during a database write operation to prevent stale data reads?',
  options: ['Cache-Aside Strategy', 'Write-Through Strategy', 'Write-Behind (Write-Back) Strategy', 'Read-Through Strategy'],
  correctIndex: 1,
  explanation: 'Write-Through caching writes data to the cache and the underlying database synchronously in a single atomic flow, ensuring high data consistency.',
  xpValue: 50
};

export const DailySkillChallengeModal: React.FC<DailySkillChallengeModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useAuth();
  const [streakDays, setStreakDays] = useState(14);
  const [xpPoints, setXpPoints] = useState(1250);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === dailyQuestion.correctIndex) {
      setStreakDays(prev => prev + 1);
      setXpPoints(prev => prev + dailyQuestion.xpValue);

      // Boost readiness score dynamically
      updateProfile({
        placement_readiness_score: Math.min(99, studentProfile.placement_readiness_score + 1)
      });

      dataService.createHelpRequest(
        `Daily Skill Challenge Completed: ${dailyQuestion.topic}`,
        `Successfully solved daily challenge! Current streak: ${streakDays + 1} days. Earned +${dailyQuestion.xpValue} XP.`
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Micro-Skill & Coding Challenge" maxWidth="lg">
      <div className="space-y-5">
        {/* Streak & XP Banner */}
        <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-teal-500/10 rounded-xl border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <Flame className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{streakDays} Day Active Streak 🔥</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Solve daily challenges to boost placement readiness score & batch standing.</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-base font-black text-amber-500 flex items-center gap-1 justify-end">
              <Zap className="w-4 h-4 fill-current" /> {xpPoints} XP
            </span>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase">Mastery Tier 4</span>
          </div>
        </div>

        {/* Today's Challenge Question */}
        <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20">
              Today's Topic: {dailyQuestion.topic}
            </span>
            <span className="font-bold text-amber-500 flex items-center gap-1">
              + {dailyQuestion.xpValue} XP Reward
            </span>
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-relaxed">
            {dailyQuestion.question}
          </h4>

          <div className="space-y-2">
            {dailyQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === dailyQuestion.correctIndex;

              let btnStyle = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-100 font-bold';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-3 rounded-lg text-xs font-medium transition flex items-center justify-between border ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-xs animate-in fade-in">
              <div className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Solution & Explanation
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {dailyQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
