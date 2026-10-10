import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Sparkles, Lightbulb, Code2, Layers, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface HackathonIdeaGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectIdea {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  techStack: string[];
  complexity: 'Intermediate' | 'Advanced';
}

export const HackathonIdeaGeneratorModal: React.FC<HackathonIdeaGeneratorModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const [selectedDomain, setSelectedDomain] = useState<'AI/ML' | 'Web3/Blockchain' | 'Full Stack Web' | 'DevOps/Cloud'>('Full Stack Web');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[] | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIdeas([
        {
          title: 'CareerPilot AI — Smart Student Placement Navigator',
          tagline: 'Semester-wise learning roadmaps with verified skill matrix and ATS scanner',
          problem: 'B.Tech students lack structured year-by-year placement preparation guidance.',
          solution: 'Centralized platform providing personalized roadmaps, project recommendations, and mentor reviews.',
          techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js'],
          complexity: 'Advanced'
        },
        {
          title: 'CloudPulse — Autonomous Microservices Health Monitor',
          tagline: 'Real-time distributed tracer and serverless telemetry dashboard',
          problem: 'DevOps teams struggle to trace latency spikes across decoupled microservices.',
          solution: 'Lightweight agent streaming eBPF network metrics to an interactive timeline chart.',
          techStack: ['Go', 'Docker', 'Prometheus', 'Grafana', 'React'],
          complexity: 'Advanced'
        },
        {
          title: 'EduShield — Decentralized Credential Verification Protocol',
          tagline: 'Cryptographic proof-of-completion for academic degree certificates',
          problem: 'Resume fraud and fake degree certificates in corporate hiring pipelines.',
          solution: 'Immutable credential ledger issuing tamper-proof QR verification badges.',
          techStack: ['Solidity', 'Ethereum/Polygon', 'Ethers.js', 'React'],
          complexity: 'Intermediate'
        }
      ]);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Hackathon & Project Idea Generator" maxWidth="lg">
      <div className="space-y-5">
        {/* Input bar */}
        <div className="p-4 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-500" /> Select Innovation Category
            </h4>
            <span className="text-slate-400">Target Role: {targetRole?.title || 'Software Developer'}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['Full Stack Web', 'AI/ML', 'Web3/Blockchain', 'DevOps/Cloud'] as const).map(domain => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedDomain === domain
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:opacity-95 text-white font-bold transition flex items-center gap-2 shadow"
            >
              <Lightbulb className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Brainstorming Ideas...' : 'Generate Hackathon Blueprints'}
            </button>
          </div>
        </div>

        {/* Ideas Feed */}
        {ideas && (
          <div className="space-y-3 animate-in fade-in">
            {ideas.map((idea, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{idea.title}</h4>
                    <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">{idea.tagline}</p>
                  </div>
                  <Badge variant={idea.complexity === 'Advanced' ? 'warning' : 'info'}>{idea.complexity}</Badge>
                </div>

                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 space-y-1">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Problem:</strong> {idea.problem}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Solution:</strong> {idea.solution}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-1">
                    {idea.techStack.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] text-indigo-500 font-bold">Hackathon Ready Blueprint ✓</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
