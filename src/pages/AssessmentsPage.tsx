import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { Assessment, AssessmentQuestion, AssessmentAttempt } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CodeSandboxAssessmentModal } from '../components/features/CodeSandboxAssessmentModal';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  BarChart3,
  Award,
  Sparkles,
  Calculator,
  Code2
} from 'lucide-react';

export const AssessmentsPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const assessments = dataService.getAssessments();
  
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<AssessmentAttempt | null>(null);
  const [showMathModal, setShowMathModal] = useState(false);
  const [showIdeModal, setShowIdeModal] = useState(false);

  const handleStartQuiz = (assessment: Assessment) => {
    setActiveQuiz(assessment);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setAttemptResult(null);
  };

  const handleOptionSelect = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz || !activeQuiz.questions) return;

    let correctCount = 0;
    const weakSkills: string[] = [];

    activeQuiz.questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correct_option_index) {
        correctCount++;
      } else {
        if (!weakSkills.includes(q.skill_id)) {
          weakSkills.push(q.skill_id);
        }
      }
    });

    const scorePercentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const attempt = dataService.saveAssessmentAttempt(activeQuiz.id, scorePercentage, weakSkills);

    setQuizSubmitted(true);
    setAttemptResult(attempt);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-teal-400" />
            <span>Placement Readiness & Skill Assessments</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Topic-wise MCQ evaluation with step-by-step answer explanations and weak-spot diagnostics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowIdeModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg"
          >
            <Code2 className="w-4 h-4" />
            <span>Open Live Coding IDE</span>
          </button>

          <button
            onClick={() => setShowMathModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 text-xs font-bold transition flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Score Math Spec</span>
          </button>
        </div>
      </div>

      {/* Readiness Math Summary Box */}
      <Card className="bg-gradient-to-r from-navy-900 via-slate-900 to-indigo-950 border-teal-500/20 text-white space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Current Transparent Placement Index</span>
          <Badge variant="info">Score: {studentProfile.placement_readiness_score} / 100</Badge>
        </div>
        <ProgressBar value={studentProfile.placement_readiness_score} color="teal" showLabel={false} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-2">
          <div className="p-2 rounded-lg bg-slate-800/60">
            <div className="text-[10px] text-slate-400">Roadmap Tasks (35%)</div>
            <div className="font-bold text-teal-300">Weighted</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/60">
            <div className="text-[10px] text-slate-400">Quiz Scores (25%)</div>
            <div className="font-bold text-teal-300">Active</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/60">
            <div className="text-[10px] text-slate-400">Projects (25%)</div>
            <div className="font-bold text-teal-300">Verified</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/60">
            <div className="text-[10px] text-slate-400">Resume/Portfolio (15%)</div>
            <div className="font-bold text-teal-300">Linked</div>
          </div>
        </div>
      </Card>

      {/* Available Assessments List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Available Skill Quizzes</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map(ass => (
            <Card key={ass.id} hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="info">{ass.category}</Badge>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    ⏱ {ass.duration_minutes} Mins • {ass.total_questions} Qs
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{ass.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tests core understanding of data structures, algorithms, system design & quantitative aptitude.
                </p>
              </div>

              <button
                onClick={() => handleStartQuiz(ass)}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <span>Take Assessment Quiz</span>
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <Modal
          isOpen={Boolean(activeQuiz)}
          onClose={() => setActiveQuiz(null)}
          title={activeQuiz.title}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {!quizSubmitted ? (
              <>
                <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
                  {activeQuiz.questions?.map((q, qIdx) => (
                    <div key={q.id} className="pt-4 first:pt-0 space-y-3">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <span>{q.question_text}</span>
                      </div>

                      <div className="space-y-2 pl-7">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          return (
                            <button
                              type="button"
                              key={optIdx}
                              onClick={() => handleOptionSelect(q.id, optIdx)}
                              className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition ${
                                isSelected
                                  ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-300 font-bold'
                                  : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < (activeQuiz.questions?.length || 0)}
                    className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition shadow-lg"
                  >
                    Submit Answers & See Explanations
                  </button>
                </div>
              </>
            ) : (
              /* Quiz Score & Answer Explanations View */
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 text-white text-center space-y-2">
                  <Badge variant={attemptResult && attemptResult.score_percentage >= 70 ? 'success' : 'warning'}>
                    Score: {attemptResult?.score_percentage}%
                  </Badge>
                  <h3 className="text-xl font-bold">Assessment Results Completed</h3>
                  <p className="text-xs text-slate-400">
                    Your skills matrix and overall placement readiness index have been updated.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Detailed Question Explanations
                  </h4>

                  {activeQuiz.questions?.map((q, idx) => {
                    const selected = selectedAnswers[q.id];
                    const isCorrect = selected === q.correct_option_index;

                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Q{idx + 1}: {q.question_text}</span>
                          {isCorrect ? (
                            <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1 inline" /> Correct</Badge>
                          ) : (
                            <Badge variant="danger"><XCircle className="w-3 h-3 mr-1 inline" /> Incorrect</Badge>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-teal-600 dark:text-teal-400">Correct Answer: </span>
                          {q.options[q.correct_option_index]}
                        </div>

                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 leading-relaxed">
                          <span className="font-bold text-indigo-500">Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Transparent Math Explanation Modal */}
      <Modal
        isOpen={showMathModal}
        onClose={() => setShowMathModal(false)}
        title="Placement Readiness Math Specification"
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            CareerPilot AI calculates placement readiness using objective, empirical indicators across four core pillars:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-900 dark:text-white">Roadmap Milestone Completion (35%):</strong> Percentage of semester learning tasks marked complete.</li>
            <li><strong className="text-slate-900 dark:text-white">Assessment Quiz Average (25%):</strong> Average score achieved across topic assessments.</li>
            <li><strong className="text-slate-900 dark:text-white">Verified Projects & Badges (25%):</strong> Approved capstone projects and mentor-verified skill badges.</li>
            <li><strong className="text-slate-900 dark:text-white">Resume & Online Presence (15%):</strong> Linking GitHub, LinkedIn, portfolio URL, and verified ATS resume score.</li>
          </ul>
        </div>
      </Modal>

      {/* Code Sandbox Modal */}
      <CodeSandboxAssessmentModal isOpen={showIdeModal} onClose={() => setShowIdeModal(false)} />
    </div>
  );
};
