import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Mic, Volume2, Sparkles, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface SoftSkillsAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoftSkillsAnalyzerModal: React.FC<SoftSkillsAnalyzerModalProps> = ({ isOpen, onClose }) => {
  const [speechText, setSpeechText] = useState(
    "Um, in my capstone project, I like built the backend using Node.js and Express. Um, we used PostgreSQL for data storage and like optimized queries with indexes. It was really good."
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    clarityScore: number;
    fillerWordsCount: number;
    confidenceRating: string;
    detectedFillers: string[];
    improvements: string[];
  } | null>(null);

  const handleAnalyzeSpeech = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const textLower = speechText.toLowerCase();
      const fillers = ['um', 'like', 'you know', 'basically', 'actually'];
      const foundFillers: string[] = [];
      let count = 0;

      fillers.forEach(f => {
        const matches = textLower.match(new RegExp(`\\b${f}\\b`, 'g'));
        if (matches) {
          count += matches.length;
          foundFillers.push(`${f} (${matches.length}x)`);
        }
      });

      const clarity = Math.max(50, 100 - count * 10);
      setAnalysisResult({
        clarityScore: clarity,
        fillerWordsCount: count,
        confidenceRating: count < 2 ? 'High' : count < 4 ? 'Moderate' : 'Needs Polish',
        detectedFillers: foundFillers,
        improvements: [
          'Replace filler words like "um" and "like" with deliberate 1-second pauses.',
          'Quantify technical metrics (e.g. "reduced latency by 35%").',
          'Use the STAR framework: Situation, Task, Action, Result.'
        ]
      });
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Interview Speech & Soft Skills Analyzer" maxWidth="lg">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Oral Articulation & Speech Coach</h4>
              <p className="text-xs text-slate-400">Filler word detection & HR speaking clarity analysis</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Spoken Response Text / Transcription</label>
          <textarea
            rows={4}
            value={speechText}
            onChange={e => setSpeechText(e.target.value)}
            placeholder="Type or record your oral interview response..."
            className="w-full p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 font-sans"
          />
        </div>

        <button
          onClick={handleAnalyzeSpeech}
          disabled={!speechText.trim() || isAnalyzing}
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Speech Cadence...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>Analyze Oral Presentation Clarity</span>
            </>
          )}
        </button>

        {analysisResult && (
          <div className="space-y-4 p-5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Articulation Clarity Score</h4>
                <p className="text-xs text-slate-500">Confidence: <strong className="text-teal-500">{analysisResult.confidenceRating}</strong></p>
              </div>
              <div className="text-3xl font-black text-teal-500">{analysisResult.clarityScore}%</div>
            </div>

            <ProgressBar value={analysisResult.clarityScore} color="teal" showLabel={false} />

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Detected Filler Words ({analysisResult.fillerWordsCount})
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.detectedFillers.map((f, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">Speech Improvement Tips</h5>
              <ul className="space-y-1 pl-5 list-disc text-xs text-slate-600 dark:text-slate-300">
                {analysisResult.improvements.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
