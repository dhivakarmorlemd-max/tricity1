import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Mic, MicOff, Play, CheckCircle2, AlertTriangle, Sparkles, Volume2, RefreshCw, BarChart2 } from 'lucide-react';

interface SpeechInterviewAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const interviewQuestions = [
  {
    id: 'q1',
    topic: 'System Design',
    question: 'How would you handle database write bottlenecks during a flash sale with 100,000 incoming QPS?',
    modelAnswerKey: 'Implement Kafka write queue buffer, partition PostgreSQL into 8 primary shards, and invalidate Redis cache asynchronously.'
  },
  {
    id: 'q2',
    topic: 'Data Structures & Algorithms',
    question: 'Explain the difference between Dijkstra algorithm and A* Search in pathfinding.',
    modelAnswerKey: 'A* uses a heuristic function h(n) to prioritize nodes closer to the destination, whereas Dijkstra evaluates strictly by distance g(n).'
  },
  {
    id: 'q3',
    topic: 'Full Stack & Web APIs',
    question: 'What is the advantage of HTTP/2 multiplexing over HTTP/1.1 persistent connections?',
    modelAnswerKey: 'HTTP/2 allows multiple request and response messages to be in flight simultaneously over a single TCP connection, eliminating head-of-line blocking.'
  }
];

export const SpeechInterviewAnalyzerModal: React.FC<SpeechInterviewAnalyzerModalProps> = ({ isOpen, onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(interviewQuestions[0]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  
  // Speech Telemetry Metrics
  const [wpm, setWpm] = useState<number>(138);
  const [clarityScore, setClarityScore] = useState<number>(92);
  const [fillerCount, setFillerCount] = useState<number>(2);
  const [confidenceScore, setConfidenceScore] = useState<number>(88);
  const [userTranscript, setUserTranscript] = useState<string>(
    'To handle 100k write QPS, I would place a Kafka message queue in front of our database cluster to decouple client requests from synchronous disk writes. Then, we can shard the database into 8 partitions and use read replicas for non-transactional queries.'
  );

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);

    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      setWpm(142);
      setClarityScore(94);
      setFillerCount(1);
      setConfidenceScore(91);
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Mock Technical Interviewer & Speech Analyzer" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-rose-600/10 via-amber-600/10 to-indigo-600/10 dark:from-rose-900/30 dark:via-amber-900/30 dark:to-indigo-900/30 rounded-xl border border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold shadow-md">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Real-Time Speech Telemetry Engine</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Analyzes spoken answer clarity, Words Per Minute (WPM) cadence, filler word frequency, and technical accuracy.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Voice AI Online
          </Badge>
        </div>

        {/* Question Selector */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
              Select Technical Mock Interview Question
            </span>
            <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
              Topic: {selectedQuestion.topic}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {interviewQuestions.map(q => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestion(q);
                  setHasRecorded(false);
                }}
                className={`p-2.5 rounded-lg text-left transition border ${
                  selectedQuestion.id === q.id
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-slate-900 dark:text-white'
                    : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                }`}
              >
                <span className="font-bold text-[10px] text-rose-500 block mb-0.5">{q.topic}</span>
                <p className="text-[11px] font-semibold line-clamp-2">{q.question}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Question Card & Voice Studio Controls */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-800">
          <div className="space-y-1">
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">AI Technical Interviewer Prompt</span>
            <h5 className="font-bold text-sm text-slate-100">{selectedQuestion.question}</h5>
          </div>

          <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {isRecording ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs animate-pulse border border-rose-500/40">
                  <Volume2 className="w-4 h-4 animate-bounce" /> Recording Spoken Answer...
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Click below to record your 60-second voice response.
                </span>
              )}
            </div>

            <button
              onClick={handleStartRecording}
              disabled={isRecording}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shadow-md text-xs ${
                isRecording
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {isRecording ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Voice...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" /> Record Spoken Answer
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio Telemetry Analysis Dashboard */}
        {hasRecorded && (
          <div className="space-y-3 animate-in fade-in">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-rose-500" /> Speech & Technical Answer Analysis
            </h5>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400">Pacing (WPM)</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">{wpm}</span>
                  <Badge variant="success">Optimal</Badge>
                </div>
                <p className="text-[10px] text-slate-400">Ideal range: 130-150 WPM</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400">Speech Clarity</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">{clarityScore}%</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                </div>
                <p className="text-[10px] text-slate-400">High Phonetic Precision</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400">Filler Words</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">{fillerCount}</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-[10px] text-slate-400">"um", "like" detected</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400">Confidence Score</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{confidenceScore}%</span>
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                </div>
                <p className="text-[10px] text-slate-400">Strong Delivery Tone</p>
              </div>
            </div>

            {/* Transcript & Feedback */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <h6 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Spoken Transcript Output:</h6>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic bg-white dark:bg-navy-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                "{userTranscript}"
              </p>
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 text-[11px] text-teal-800 dark:text-teal-300 font-medium">
                <strong className="text-teal-900 dark:text-teal-200">AI Feedback: </strong> Excellent explanation of Kafka queue buffering! To achieve a 100% technical score, mention monitoring queue lag metrics in Prometheus.
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
