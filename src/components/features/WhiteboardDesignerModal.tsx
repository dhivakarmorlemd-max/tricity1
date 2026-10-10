import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Layers, Cpu, Server, Database, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

interface WhiteboardDesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ComponentNode {
  id: string;
  type: string;
  name: string;
  tech: string;
}

export const WhiteboardDesignerModal: React.FC<WhiteboardDesignerModalProps> = ({ isOpen, onClose }) => {
  const [nodes, setNodes] = useState<ComponentNode[]>([
    { id: '1', type: 'Client', name: 'React SPA Client', tech: 'React / TypeScript' },
    { id: '2', type: 'Gateway', name: 'API Gateway & Rate Limiter', tech: 'Node.js / Express' },
    { id: '3', type: 'Cache', name: 'Redis In-Memory Cache', tech: 'Redis 7.0' },
    { id: '4', type: 'Database', name: 'Primary Relational DB', tech: 'PostgreSQL 16' }
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEvaluateArchitecture = () => {
    setFeedback(
      'System Architecture Evaluation: Excellent multi-tier setup! Features decoupled frontend, edge caching with Redis, and relational persistence. Recommendation: Add an asynchronous message broker (RabbitMQ/Kafka) for heavy background worker tasks.'
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Whiteboard & System Architecture Designer" maxWidth="lg">
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-3.5 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-500" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">System Design Canvas</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Design high-scale microservices architecture for senior technical interviews.</p>
            </div>
          </div>
          <button
            onClick={handleEvaluateArchitecture}
            className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-1.5 text-xs shadow"
          >
            <Sparkles className="w-3.5 h-3.5" /> Evaluate Design
          </button>
        </div>

        {/* Nodes Canvas */}
        <div className="p-5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
            <span>Active Architecture Flow Diagram</span>
            <span className="text-teal-400 font-mono">4 Connected Nodes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map(node => (
              <div key={node.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400">{node.name}</span>
                  <Badge variant="info">{node.type}</Badge>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Tech: {node.tech}</p>
              </div>
            ))}
          </div>

          {feedback && (
            <div className="p-3.5 rounded-lg bg-teal-950/60 border border-teal-500/30 text-xs text-teal-200 leading-relaxed animate-in fade-in">
              <strong className="text-white block mb-1">🤖 AI System Design Feedback:</strong>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
