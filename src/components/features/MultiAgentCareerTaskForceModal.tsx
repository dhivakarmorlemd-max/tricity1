import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Bot, Play, CheckCircle2, RefreshCw, Layers, Sparkles, FileText, Code2, Globe, MessageSquare, Download } from 'lucide-react';

interface MultiAgentCareerTaskForceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AgentTask {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  status: 'idle' | 'running' | 'completed';
  progress: number;
  output: string;
}

export const MultiAgentCareerTaskForceModal: React.FC<MultiAgentCareerTaskForceModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();

  const [agents, setAgents] = useState<AgentTask[]>([
    {
      id: 'agent_resume',
      name: 'Resume Optimization Agent',
      role: 'ATS Keyword & Metric Enhancer',
      icon: <FileText className="w-4 h-4 text-teal-500" />,
      status: 'idle',
      progress: 0,
      output: 'Ready to analyze resume bullet points against Fortune 500 ATS schemas.'
    },
    {
      id: 'agent_code',
      name: 'Code Quality & Repo Auditor',
      icon: <Code2 className="w-4 h-4 text-indigo-500" />,
      role: 'DSA & Clean Architecture Scanner',
      status: 'idle',
      progress: 0,
      output: 'Ready to audit GitHub repos for modularity, unit tests, and complexity.'
    },
    {
      id: 'agent_market',
      name: 'Market Opportunity Crawler',
      icon: <Globe className="w-4 h-4 text-amber-500" />,
      role: 'Unicorn Startup & Global Job Board Crawler',
      status: 'idle',
      progress: 0,
      output: 'Ready to crawl 100+ active SDE openings matching student target CTC.'
    },
    {
      id: 'agent_interview',
      name: 'Interview Simulation Bot',
      icon: <MessageSquare className="w-4 h-4 text-purple-500" />,
      role: 'Role-Specific Technical Q&A Generator',
      status: 'idle',
      progress: 0,
      output: 'Ready to compile company-specific system design & coding questions.'
    }
  ]);

  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [taskLogs, setTaskLogs] = useState<string[]>([
    'Multi-Agent System initialized. 4 autonomous agents ready for parallel execution.'
  ]);
  const [unifiedReportGenerated, setUnifiedReportGenerated] = useState<boolean>(false);

  const handleLaunchTaskForce = () => {
    setIsRunningAll(true);
    setUnifiedReportGenerated(false);
    setTaskLogs(prev => [`[${new Date().toLocaleTimeString()}] 🚀 Launching Multi-Agent Career Task Force...`, ...prev]);

    // Step 1: Start Agent 1 & 2
    setAgents(prev => prev.map(a => (a.id === 'agent_resume' || a.id === 'agent_code') ? { ...a, status: 'running', progress: 35 } : a));

    setTimeout(() => {
      setTaskLogs(prev => [`[${new Date().toLocaleTimeString()}] [Resume Agent] Formatted 14 bullet points with quantifiable STAR metrics (+28% ATS boost).`, ...prev]);
      setAgents(prev => prev.map(a => a.id === 'agent_resume' ? { ...a, status: 'completed', progress: 100, output: 'Resume optimized: ATS compatibility score elevated from 78% to 94%.' } : a));
    }, 900);

    setTimeout(() => {
      setTaskLogs(prev => [`[${new Date().toLocaleTimeString()}] [Code Auditor] Audited 6 GitHub repos. Detected 98% clean architecture and zero hardcoded secrets.`, ...prev]);
      setAgents(prev => prev.map(a => a.id === 'agent_code' ? { ...a, status: 'completed', progress: 100, output: 'Codebase audited: Grade A Quality with verified unit test coverage.' } : a));
      
      // Start Agent 3 & 4
      setAgents(prev => prev.map(a => (a.id === 'agent_market' || a.id === 'agent_interview') ? { ...a, status: 'running', progress: 50 } : a));
    }, 1800);

    setTimeout(() => {
      setTaskLogs(prev => [`[${new Date().toLocaleTimeString()}] [Market Crawler] Found 12 high-match placement drives offering ₹18 LPA - ₹25 LPA.`, ...prev]);
      setAgents(prev => prev.map(a => a.id === 'agent_market' ? { ...a, status: 'completed', progress: 100, output: 'Matched 12 active campus & referral placement drives.' } : a));
    }, 2500);

    setTimeout(() => {
      setTaskLogs(prev => [`[${new Date().toLocaleTimeString()}] [Interview Bot] Generated 15 custom System Design & LeetCode Hard questions for target role.`, ...prev]);
      setAgents(prev => prev.map(a => a.id === 'agent_interview' ? { ...a, status: 'completed', progress: 100, output: 'Generated personalized 15-question interview master deck.' } : a));
      setIsRunningAll(false);
      setUnifiedReportGenerated(true);
      setTaskLogs(prev => [`[${new Date().toLocaleTimeString()}] ✅ Multi-Agent Task Force execution finished successfully!`, ...prev]);
    }, 3200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Multi-Agent Career Task Force Simulator" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-teal-600/10 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-teal-900/30 rounded-xl border border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Concurrent AI Agent Swarm</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Deploy 4 specialized sub-agents working in parallel to optimize your career profile and job readiness.
              </p>
            </div>
          </div>

          <button
            onClick={handleLaunchTaskForce}
            disabled={isRunningAll}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition flex items-center gap-2 shadow-md text-xs disabled:opacity-50"
          >
            {isRunningAll ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Agents Executing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Launch Multi-Agent Swarm
              </>
            )}
          </button>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {agents.map(agent => (
            <div
              key={agent.id}
              className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {agent.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">{agent.name}</h5>
                    <p className="text-[10px] text-slate-400">{agent.role}</p>
                  </div>
                </div>

                <Badge variant={agent.status === 'completed' ? 'success' : agent.status === 'running' ? 'info' : 'neutral'}>
                  {agent.status === 'completed' ? 'Done' : agent.status === 'running' ? 'Running' : 'Idle'}
                </Badge>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-navy-950 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                {agent.output}
              </p>

              {agent.status === 'running' && (
                <ProgressBar value={agent.progress} color="indigo" size="sm" showLabel={false} />
              )}
            </div>
          ))}
        </div>

        {/* Generated Unified Report Banner */}
        {unifiedReportGenerated && (
          <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-500" />
              <div>
                <h5 className="font-bold text-teal-950 dark:text-teal-200 text-xs">
                  Unified Candidate Profile Audit Complete
                </h5>
                <p className="text-[10px] text-teal-700 dark:text-teal-400">
                  Calculated placement readiness score: <strong className="text-teal-900 dark:text-white">{studentProfile.placement_readiness_score}%</strong> ({user.full_name})
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Downloaded Unified Multi-Agent Candidate Profile Report PDF!')}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download Agent Dossier (.PDF)
            </button>
          </div>
        )}

        {/* Console Log Audit */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-500" /> Task Force Orchestration Telemetry
          </h5>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-purple-300 space-y-1.5 max-h-[160px] overflow-y-auto border border-slate-800">
            {taskLogs.map((log, idx) => (
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
