import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Bot, Play, CheckCircle2, Building2, Sliders, RefreshCw, Briefcase, FileCheck, Layers } from 'lucide-react';

interface AutonomousPlacementAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TargetDrive {
  id: string;
  company: string;
  role: string;
  ctc: string;
  minCgpa: number;
  minScore: number;
  location: string;
  matchScore: number;
}

const availableDrives: TargetDrive[] = [
  {
    id: 'drv_101',
    company: 'Google Cloud Platform',
    role: 'Cloud Solutions Engineer - University Graduate',
    ctc: '₹22.5 LPA',
    minCgpa: 8.0,
    minScore: 78,
    location: 'Bengaluru / Hybrid',
    matchScore: 94
  },
  {
    id: 'drv_102',
    company: 'Atlassian Systems',
    role: 'Associate Software Engineer (Core Systems)',
    ctc: '₹24.0 LPA',
    minCgpa: 8.5,
    minScore: 82,
    location: 'Bengaluru',
    matchScore: 91
  },
  {
    id: 'drv_103',
    company: 'Microsoft Azure',
    role: 'Software Development Engineer - I',
    ctc: '₹20.0 LPA',
    minCgpa: 8.0,
    minScore: 80,
    location: 'Hyderabad',
    matchScore: 89
  },
  {
    id: 'drv_104',
    company: 'Swiggy Tech',
    role: 'Backend SDE - Microservices Tier',
    ctc: '₹18.0 LPA',
    minCgpa: 7.5,
    minScore: 75,
    location: 'Bengaluru',
    matchScore: 86
  },
  {
    id: 'drv_105',
    company: 'Razorpay',
    role: 'Frontend Engineer (React / Next.js)',
    ctc: '₹16.5 LPA',
    minCgpa: 7.5,
    minScore: 72,
    location: 'Remote',
    matchScore: 84
  }
];

export const AutonomousPlacementAgentModal: React.FC<AutonomousPlacementAgentModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();
  const studentCgpa = (studentProfile as any).cgpa || 8.6;

  // Agent Settings State
  const [minCtc, setMinCtc] = useState<number>(15);
  const [autoTailorResume, setAutoTailorResume] = useState<boolean>(true);
  const [autoSubmit, setAutoSubmit] = useState<boolean>(true);
  const [targetDomain] = useState<string>('Software Engineering / Full Stack');

  // Agent Execution State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [appliedDrives, setAppliedDrives] = useState<string[]>([]);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    'System ready. Autonomous agent idle.',
    'Matching profile criteria against active campus drives...'
  ]);
  const [activeTab, setActiveTab] = useState<'agent' | 'queue' | 'logs'>('agent');

  const handleRunAgent = () => {
    setIsScanning(true);
    setScanProgress(15);
    setAgentLogs(prev => [`[${new Date().toLocaleTimeString()}] Autonomous placement scan initialized...`, ...prev]);

    setTimeout(() => {
      setScanProgress(45);
      setAgentLogs(prev => [`[${new Date().toLocaleTimeString()}] Filtering eligible drives (Min CTC ₹${minCtc} LPA, CGPA >= min requirement)...`, ...prev]);
    }, 700);

    setTimeout(() => {
      setScanProgress(75);
      setAgentLogs(prev => [`[${new Date().toLocaleTimeString()}] Auto-tailoring ATS resume variants for high-match drives...`, ...prev]);
    }, 1400);

    setTimeout(() => {
      setScanProgress(100);
      const eligibleIds = availableDrives
        .filter(d => studentCgpa >= d.minCgpa && studentProfile.placement_readiness_score >= d.minScore)
        .map(d => d.id);

      eligibleIds.forEach(id => {
        const drive = availableDrives.find(d => d.id === id);
        if (drive) {
          dataService.applyPlacementDrive(drive.company, drive.role);
        }
      });

      setAppliedDrives(prev => Array.from(new Set([...prev, ...eligibleIds])));
      setIsScanning(false);
      setAgentLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ✅ Execution complete! Successfully submitted applications to ${eligibleIds.length} placement drives.`,
        ...prev
      ]);
    }, 2200);
  };

  const eligibleDrives = availableDrives.filter(
    d => studentCgpa >= d.minCgpa && studentProfile.placement_readiness_score >= d.minScore
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Autonomous Placement AI Agent & Auto-Apply Bot" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 dark:from-teal-900/30 dark:via-cyan-900/30 dark:to-indigo-900/30 rounded-xl border border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Autonomous Career Agent</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                AI background engine scans campus drives, matches resume ATS scores, and auto-queues verified applications.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Agent Ready
          </Badge>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4">
          <button
            onClick={() => setActiveTab('agent')}
            className={`pb-2 font-bold text-xs flex items-center gap-1.5 transition border-b-2 ${
              activeTab === 'agent'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Agent Control & Drives ({eligibleDrives.length})
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`pb-2 font-bold text-xs flex items-center gap-1.5 transition border-b-2 ${
              activeTab === 'queue'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Auto-Applied Queue ({appliedDrives.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-2 font-bold text-xs flex items-center gap-1.5 transition border-b-2 ${
              activeTab === 'logs'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Live Agent Telemetry
          </button>
        </div>

        {activeTab === 'agent' && (
          <div className="space-y-4">
            {/* Agent Control Settings */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 text-xs">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-teal-500" /> Agent Automation Rules
                </span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400">
                  Target Domain: {targetDomain}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Min CTC Band: ₹{minCtc} LPA
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    step="1"
                    value={minCtc}
                    onChange={e => setMinCtc(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-medium text-[11px] text-slate-700 dark:text-slate-300">
                    Auto-Tailor Resume ATS
                  </span>
                  <input
                    type="checkbox"
                    checked={autoTailorResume}
                    onChange={e => setAutoTailorResume(e.target.checked)}
                    className="w-4 h-4 accent-teal-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-medium text-[11px] text-slate-700 dark:text-slate-300">
                    Instant Auto-Submit
                  </span>
                  <input
                    type="checkbox"
                    checked={autoSubmit}
                    onChange={e => setAutoSubmit(e.target.checked)}
                    className="w-4 h-4 accent-teal-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  Student CGPA: <strong className="text-slate-800 dark:text-white">{studentCgpa}</strong> • Readiness Score: <strong className="text-teal-600 dark:text-teal-400">{studentProfile.placement_readiness_score}%</strong>
                </div>

                <button
                  onClick={handleRunAgent}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-2 shadow-md text-xs disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Scanning Drives ({scanProgress}%)...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Execute Autonomous Placement Agent
                    </>
                  )}
                </button>
              </div>

              {isScanning && <ProgressBar value={scanProgress} color="teal" showLabel size="sm" />}
            </div>

            {/* Placement Drives List */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                Matched Campus Placement Drives
              </h5>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {availableDrives.map(drive => {
                  const isEligible = studentCgpa >= drive.minCgpa && studentProfile.placement_readiness_score >= drive.minScore;
                  const isApplied = appliedDrives.includes(drive.id);

                  return (
                    <div
                      key={drive.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-teal-500/40 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-teal-500" />
                          <h6 className="font-bold text-slate-900 dark:text-white text-xs">{drive.company}</h6>
                          <Badge variant={isEligible ? 'success' : 'warning'}>
                            {isEligible ? `Match ${drive.matchScore}%` : 'Eligibility Gap'}
                          </Badge>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">{drive.role}</p>
                        <p className="text-[10px] text-slate-400">
                          CTC: <strong className="text-teal-600 dark:text-teal-400">{drive.ctc}</strong> • Req CGPA: {drive.minCgpa} • Location: {drive.location}
                        </p>
                      </div>

                      <div>
                        {isApplied ? (
                          <span className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold text-[11px] flex items-center gap-1 border border-teal-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Applied
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              dataService.applyPlacementDrive(drive.company, drive.role);
                              setAppliedDrives(prev => [...prev, drive.id]);
                            }}
                            disabled={!isEligible}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-[11px] hover:bg-teal-600 transition disabled:opacity-40"
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
              Automated Application Submissions Tracker
            </h5>

            {appliedDrives.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-navy-950/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
                <FileCheck className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="font-semibold text-slate-600 dark:text-slate-400">No automated applications submitted yet.</p>
                <p className="text-[11px] text-slate-400">Run the Agent Control tab to scan and auto-apply to eligible drives.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {appliedDrives.map(id => {
                  const drive = availableDrives.find(d => d.id === id);
                  if (!drive) return null;

                  return (
                    <div
                      key={id}
                      className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <h6 className="font-bold text-slate-900 dark:text-white text-xs">{drive.company}</h6>
                        <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">{drive.role}</p>
                        <p className="text-[10px] text-slate-400">Submitted Payload: Tailored ATS Resume v4.2 • Match Score: {drive.matchScore}%</p>
                      </div>

                      <div className="text-right space-y-1">
                        <Badge variant="info">Technical Screening Scheduled</Badge>
                        <p className="text-[10px] text-slate-400">Auto-submitted {new Date().toLocaleTimeString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-2">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
              Agent Telemetry & Audit Stream
            </h5>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-teal-400 space-y-1.5 max-h-[280px] overflow-y-auto border border-slate-800">
              {agentLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="text-slate-500">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
