import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Code2, Play, RefreshCw, CheckCircle2, Sparkles, Terminal, Copy } from 'lucide-react';

interface LiveCodeSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveCodeSandboxModal: React.FC<LiveCodeSandboxModalProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState(
    `// JavaScript / TypeScript Live Sandbox
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test Run
console.log("Input: nums = [2, 7, 11, 15], target = 9");
console.log("Output:", twoSum([2, 7, 11, 15], 9));`
  );

  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '))
        };

        const runFn = new Function('console', code);
        runFn(customConsole);

        setOutput(logs.join('\n') || 'Code executed successfully with zero output.');
      } catch (err: any) {
        setOutput(`Runtime Error: ${err.message}`);
      }
      setIsRunning(false);
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Live Code Sandbox & Pair Programmer" maxWidth="lg">
      <div className="space-y-4">
        {/* Editor Bar */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-slate-700 dark:text-slate-200">
            <Code2 className="w-4 h-4 text-teal-500" />
            <span>solution.js</span>
            <span className="text-slate-400 font-sans">• JavaScript / Node.js Engine</span>
          </div>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-1.5 shadow text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Code Input */}
        <div className="relative">
          <textarea
            rows={10}
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 text-teal-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-800 leading-relaxed shadow-inner"
          />
        </div>

        {/* Console Output */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-300">
              <Terminal className="w-4 h-4 text-teal-400" /> Execution Terminal Console
            </span>
            {output && <span className="text-[10px] text-emerald-400 font-mono">Status: 200 OK</span>}
          </div>

          <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap min-h-16 max-h-40 overflow-y-auto">
            {output || '// Click "Run Code" to execute snippet in browser sandbox...'}
          </pre>
        </div>
      </div>
    </Modal>
  );
};
