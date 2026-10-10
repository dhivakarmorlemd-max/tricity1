import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Terminal, Play, CheckCircle2, RefreshCw, GitBranch, Layers, ShieldCheck } from 'lucide-react';

interface CICDPipelineSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PipelineStage {
  id: string;
  name: string;
  command: string;
  duration: string;
  status: 'idle' | 'running' | 'passed';
}

export const CICDPipelineSimulatorModal: React.FC<CICDPipelineSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: 'stage_lint', name: '1. ESLint & TypeScript Check', command: 'tsc --noEmit', duration: '0.8s', status: 'idle' },
    { id: 'stage_test', name: '2. Vitest Unit Test Suite', command: 'vitest run --run', duration: '1.4s', status: 'idle' },
    { id: 'stage_sec', name: '3. Snyk Vulnerability Scanner', command: 'snyk test --all-projects', duration: '0.9s', status: 'idle' },
    { id: 'stage_deploy', name: '4. Vercel Preview Deploy', command: 'vercel build --prod', duration: '1.1s', status: 'idle' }
  ]);

  const [isRunningPipeline, setIsRunningPipeline] = useState<boolean>(false);
  const [pipelineProgress, setPipelineProgress] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'CI/CD Pipeline runner initialized. Branch: main • Commit: a8f4e21.'
  ]);
  const [pipelinePassed, setPipelinePassed] = useState<boolean>(false);

  const handleRunPipeline = () => {
    setIsRunningPipeline(true);
    setPipelinePassed(false);
    setPipelineProgress(10);
    setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] 🚀 Triggering Automated CI/CD Pipeline...`, ...prev]);

    // Stage 1
    setStages(prev => prev.map(s => s.id === 'stage_lint' ? { ...s, status: 'running' } : s));

    setTimeout(() => {
      setPipelineProgress(35);
      setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] [Lint] tsc compilation passed. 1,693 modules transformed with 0 errors.`, ...prev]);
      setStages(prev => prev.map(s => s.id === 'stage_lint' ? { ...s, status: 'passed' } : s));
      setStages(prev => prev.map(s => s.id === 'stage_test' ? { ...s, status: 'running' } : s));
    }, 900);

    // Stage 2
    setTimeout(() => {
      setPipelineProgress(65);
      setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] [Vitest] 25 / 25 unit tests passed across 12 test suites.`, ...prev]);
      setStages(prev => prev.map(s => s.id === 'stage_test' ? { ...s, status: 'passed' } : s));
      setStages(prev => prev.map(s => s.id === 'stage_sec' ? { ...s, status: 'running' } : s));
    }, 1800);

    // Stage 3
    setTimeout(() => {
      setPipelineProgress(85);
      setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] [Snyk] 0 vulnerabilities found. License compliance passed.`, ...prev]);
      setStages(prev => prev.map(s => s.id === 'stage_sec' ? { ...s, status: 'passed' } : s));
      setStages(prev => prev.map(s => s.id === 'stage_deploy' ? { ...s, status: 'running' } : s));
    }, 2500);

    // Stage 4
    setTimeout(() => {
      setPipelineProgress(100);
      setTerminalLogs(prev => [
        `[${new Date().toLocaleTimeString()}] [Vercel] Deployment live at https://careerpilot-pr-42.vercel.app`,
        `[${new Date().toLocaleTimeString()}] ✅ Pipeline build succeeded in 4.2s!`,
        ...prev
      ]);
      setStages(prev => prev.map(s => s.id === 'stage_deploy' ? { ...s, status: 'passed' } : s));
      setIsRunningPipeline(false);
      setPipelinePassed(true);
    }, 3200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Automated CI/CD Pipeline & Code Test Suite Simulator" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-teal-600/10 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-teal-900/30 rounded-xl border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Automated CI/CD Verification Engine</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Executes linting, unit test suites, security scans, and cloud deployment previews for student code.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunPipeline}
            disabled={isRunningPipeline}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-2 shadow-md text-xs disabled:opacity-50"
          >
            {isRunningPipeline ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Running Pipeline...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Trigger CI/CD Pipeline
              </>
            )}
          </button>
        </div>

        {/* Pipeline Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stages.map(s => (
            <div
              key={s.id}
              className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <h6 className="font-bold text-slate-900 dark:text-white text-xs">{s.name}</h6>
                <p className="text-[10px] text-slate-400 font-mono">{s.command} ({s.duration})</p>
              </div>

              <Badge variant={s.status === 'passed' ? 'success' : s.status === 'running' ? 'info' : 'neutral'}>
                {s.status === 'passed' ? 'Passed' : s.status === 'running' ? 'Running' : 'Queued'}
              </Badge>
            </div>
          ))}
        </div>

        {isRunningPipeline && <ProgressBar value={pipelineProgress} color="indigo" showLabel size="sm" />}

        {pipelinePassed && (
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 text-teal-800 dark:text-teal-300 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500" /> Pipeline build passed with 100% test coverage and 0 security vulnerabilities.
          </div>
        )}

        {/* Live Terminal Output */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-indigo-500" /> CI/CD Terminal Output Log
          </h5>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-indigo-300 space-y-1.5 max-h-[160px] overflow-y-auto border border-slate-800">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed">
                <span className="text-slate-500">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
