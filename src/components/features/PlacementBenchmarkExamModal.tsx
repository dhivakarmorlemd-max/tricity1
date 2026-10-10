import React, { useState, useEffect } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Timer, CheckCircle2, AlertCircle, Award, BarChart3, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface PlacementBenchmarkExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  category: 'Aptitude' | 'CS Core' | 'Coding Logic';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const examQuestions: Question[] = [
  {
    id: 1,
    category: 'CS Core',
    prompt: 'What is the worst-case time complexity of QuickSort algorithm when pivot selection is unbalanced?',
    options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(2^N)'],
    correctIndex: 1,
    explanation: 'QuickSort degenerates to O(N^2) worst-case performance when the pivot chosen is consistently the smallest or largest element.'
  },
  {
    id: 2,
    category: 'CS Core',
    prompt: 'In relational database management systems, which ACID property ensures that committed transaction data is never lost even in hardware failure?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctIndex: 3,
    explanation: 'Durability guarantees that once a transaction has been committed, it will remain committed even in the event of a system crash.'
  },
  {
    id: 3,
    category: 'Coding Logic',
    prompt: 'Which data structure is optimal for evaluating infix expressions or implementing function recursion call stacks?',
    options: ['Queue', 'Stack', 'Min-Heap', 'Binary Search Tree'],
    correctIndex: 1,
    explanation: 'A Stack operates on Last-In, First-Out (LIFO) order, making it perfect for function call frames and syntax parsing.'
  },
  {
    id: 4,
    category: 'Aptitude',
    prompt: 'A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?',
    options: ['30 km/h', '36 km/h', '45 km/h', '50 km/h'],
    correctIndex: 1,
    explanation: 'Speed = Distance / Time = 150m / 15s = 10 m/s. In km/h: 10 * (18 / 5) = 36 km/h.'
  }
];

export const PlacementBenchmarkExamModal: React.FC<PlacementBenchmarkExamModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes countdown
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    scorePct: number;
    correctCount: number;
    total: number;
    percentile: number;
  } | null>(null);

  useEffect(() => {
    if (!isOpen || isExamCompleted) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isExamCompleted]);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isExamCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitExam = () => {
    let correct = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const pct = Math.round((correct / examQuestions.length) * 100);
    const percentile = Math.min(99, Math.max(60, Math.round(pct * 0.95 + 10)));

    setScoreResult({
      scorePct: pct,
      correctCount: correct,
      total: examQuestions.length,
      percentile
    });
    setIsExamCompleted(true);

    // Save attempt and update dynamic student readiness score
    dataService.saveAssessmentAttempt('placement_benchmark_2026', pct, ['QuickSort Worst Case', 'ACID Durability']);
    const updatedReadiness = Math.min(99, Math.max(65, Math.round((studentProfile.placement_readiness_score + pct) / 2)));
    updateProfile({ placement_readiness_score: updatedReadiness });
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTimeRemaining(180);
    setIsExamCompleted(false);
    setScoreResult(null);
  };

  const currentQ = examQuestions[currentIdx];
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Campus Placement Benchmark Assessment" maxWidth="lg">
      <div className="space-y-5">
        {!isExamCompleted ? (
          <>
            {/* Top Exam Header */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Question {currentIdx + 1} of {examQuestions.length}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-teal-600 dark:text-teal-400 font-semibold">{currentQ.category}</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                <Timer className="w-4 h-4 animate-pulse" /> Time Remaining: {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Question Box */}
            <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-relaxed">
                {currentQ.prompt}
              </h4>

              <div className="space-y-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-lg text-xs font-medium transition flex items-center justify-between border ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-900 dark:text-teal-100 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < examQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition flex items-center gap-1"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    className="px-5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow hover:opacity-95 transition"
                  >
                    Submit & Grade Assessment
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results Breakdown */
          <div className="space-y-4 p-5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Benchmark Exam Completed!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your performance has been evaluated against campus placement standards.
              </p>
            </div>

            {scoreResult && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center my-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">{scoreResult.scorePct}%</div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Accuracy Score</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{scoreResult.correctCount} / {scoreResult.total}</div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Correct Questions</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{scoreResult.percentile}th</div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Batch Percentile</div>
                </div>
              </div>
            )}

            {/* Answer Explanations */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Detailed Solution Breakdown</h4>
              {examQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">Q{idx + 1}. {q.prompt}</span>
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">Correct ✓</span>
                      ) : (
                        <span className="text-rose-500 font-bold shrink-0">Incorrect ✗</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      <strong className="text-teal-600 dark:text-teal-400">Answer:</strong> {q.options[q.correctIndex]}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
