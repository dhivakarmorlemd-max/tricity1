import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { MessageSquare, Play, CheckCircle2, ChevronRight, Sparkles, HelpCircle, Award } from 'lucide-react';

interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'HR / Behavioral' | 'System Design';
  question: string;
  hint: string;
  sampleAnswer: string;
  keyPoints: string[];
}

const sampleInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq_1',
    category: 'Technical',
    question: 'How do React Hooks handle component state and side effects under the hood?',
    hint: 'Mention Fiber nodes, call order guarantees, and the dependency array comparison algorithm.',
    sampleAnswer: 'React Hooks rely on a linked list attached to the Fiber node. Hooks must be called in the same order during every render. useEffect schedules side effects after DOM mutations using microtasks.',
    keyPoints: ['Fiber architecture linked list', 'Call order consistency', 'Shallow equality comparison in dependencies']
  },
  {
    id: 'iq_2',
    category: 'System Design',
    question: 'How would you design a rate limiter for a REST API handling 100,000 requests/minute?',
    hint: 'Consider Token Bucket vs Leaky Bucket algorithms, Redis distributed memory, and HTTP 429 status code.',
    sampleAnswer: 'Use Redis with the Token Bucket algorithm. Requests decrement tokens from a Redis key with expiration. If tokens reach zero, return HTTP 429 Too Many Requests.',
    keyPoints: ['Token Bucket algorithm', 'Redis in-memory caching', 'HTTP 429 response handling']
  },
  {
    id: 'iq_3',
    category: 'HR / Behavioral',
    question: 'Tell me about a technical conflict you faced during a team project and how you resolved it.',
    hint: 'Use the STAR method: Situation, Task, Action, Result.',
    sampleAnswer: 'During our capstone project, our team disagreed on using SQL vs MongoDB. I set up a quick benchmark comparison comparing query speed and data consistency needs, which convinced the team to adopt PostgreSQL.',
    keyPoints: ['STAR structure', 'Objective benchmarking', 'Data-driven decision making']
  }
];

interface MockInterviewSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockInterviewSimulatorModal: React.FC<MockInterviewSimulatorModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  const currentQ = sampleInterviewQuestions[currentIdx];

  const handleNextQuestion = () => {
    if (currentIdx < sampleInterviewQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowSampleAnswer(false);
      setUserRating(null);
      setCompletedCount(prev => prev + 1);
    } else {
      // Completed interview session
      setCompletedCount(sampleInterviewQuestions.length);
      updateProfile({ placement_readiness_score: Math.min(98, studentProfile.placement_readiness_score + 4) });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Interactive Mock Interview Simulator" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Technical & HR Interview Track</h4>
              <p className="text-xs text-slate-400">Question {currentIdx + 1} of {sampleInterviewQuestions.length}</p>
            </div>
          </div>
          <Badge variant="info">{currentQ.category}</Badge>
        </div>

        {/* Question Box */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Interviewer Question</div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">{currentQ.question}</h3>
          
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
            <strong className="font-bold">Interviewer Hint: </strong>{currentQ.hint}
          </div>
        </div>

        {/* Action Toggle Sample Answer */}
        {!showSampleAnswer ? (
          <button
            onClick={() => setShowSampleAnswer(true)}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Reveal Ideal Answer & Key Discussion Points</span>
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-800">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Ideal Sample Answer</h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{currentQ.sampleAnswer}"</p>

              <div>
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Key Points to Articulate</h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.keyPoints.map((pt, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 font-bold border border-teal-500/20">
                      ✓ {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Self Evaluation Rating */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2 text-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">How well did you articulate your answer?</span>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setUserRating(rating)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      userRating === rating
                        ? 'bg-teal-500 text-slate-950 border-teal-400'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {rating} ★
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{currentIdx < sampleInterviewQuestions.length - 1 ? 'Next Interview Question' : 'Finish Interview Session (+4 Readiness)'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
