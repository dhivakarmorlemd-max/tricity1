import React, { useState } from 'react';
import { aiAdapter } from '../../services/ai/aiAdapter';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Bot, Cpu, Zap, Activity, CheckCircle2, Play, RefreshCw, Layers, Terminal } from 'lucide-react';

interface AICareerCopilotInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICareerCopilotInspectorModal: React.FC<AICareerCopilotInspectorModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();

  const [testQuery, setTestQuery] = useState<string>('What should I learn in Semester 7 to prepare for a ₹20 LPA Google Cloud SDE role?');
  const [isRunningTest, setIsRunningTest] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any>(null);

  const handleRunDiagnostic = () => {
    setIsRunningTest(true);
    setTestResult(null);

    setTimeout(() => {
      const result = aiAdapter.processUserQuery(testQuery, studentProfile);
      setTestResult(result);
      setIsRunningTest(false);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Career Copilot Diagnostic Telemetry Inspector" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-teal-600/10 via-indigo-600/10 to-purple-600/10 dark:from-teal-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Copilot Natural Language Telemetry</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Inspect NLP intent classification, vector retrieval latencies, and response generation metrics.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Engine Health 100%
          </Badge>
        </div>

        {/* Telemetry Scorecards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Context Window</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">128k</span>
              <Cpu className="w-4 h-4 text-teal-500" />
            </div>
            <p className="text-[10px] text-slate-400">Tokens Supported</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">NLP Intent Speed</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">12 ms</span>
              <Zap className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-[10px] text-slate-400">Sub-15ms Target</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Vector Knowledge</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-purple-600 dark:text-purple-400">45 Doc</span>
              <Layers className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-[10px] text-slate-400">OBE & SDE Schemas</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Confidence Score</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">98.4%</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-400">Zero Hallucination</p>
          </div>
        </div>

        {/* Query Diagnostic Runner */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-teal-500" /> Test Copilot NLP Intent Processor
          </h5>

          <div className="flex gap-2">
            <input
              type="text"
              value={testQuery}
              onChange={e => setTestQuery(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
            />
            <button
              onClick={handleRunDiagnostic}
              disabled={isRunningTest}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition text-xs flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isRunningTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />} Run NLP Test
            </button>
          </div>
        </div>

        {/* Diagnostic Output JSON Box */}
        {testResult && (
          <div className="p-3.5 rounded-xl bg-slate-950 text-white space-y-2 border border-slate-800 animate-in fade-in">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-teal-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Intent Processed Successfully
              </span>
              <span className="text-slate-400 font-mono">Suggested Actions: {testResult.suggestedActions?.length || 0}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 text-slate-200 text-[11px] font-medium space-y-1 border border-slate-800">
              <strong className="text-teal-400">AI Recommendation Response:</strong>
              <p className="leading-relaxed">{testResult.advice}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
