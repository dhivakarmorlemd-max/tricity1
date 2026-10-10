import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Cpu, Server, Zap, Activity, ShieldCheck, AlertTriangle, Layers, ArrowRight } from 'lucide-react';

interface SystemDesignSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemDesignSimulatorModal: React.FC<SystemDesignSimulatorModalProps> = ({ isOpen, onClose }) => {
  // Simulator Parameters
  const [qps, setQps] = useState<number>(12000);
  const [cacheHitRate, setCacheHitRate] = useState<number>(85);
  const [dbShards, setDbShards] = useState<number>(4);
  const [lbStrategy, setLbStrategy] = useState<'round_robin' | 'least_conn' | 'ip_hash'>('least_conn');
  const [useKafkaQueue, setUseKafkaQueue] = useState<boolean>(true);
  const [readReplicas, setReadReplicas] = useState<number>(3);

  // Preset Handlers
  const applyPreset = (preset: 'url_shortener' | 'flash_sale' | 'messaging') => {
    if (preset === 'url_shortener') {
      setQps(45000);
      setCacheHitRate(96);
      setDbShards(4);
      setReadReplicas(6);
      setUseKafkaQueue(false);
      setLbStrategy('round_robin');
    } else if (preset === 'flash_sale') {
      setQps(85000);
      setCacheHitRate(70);
      setDbShards(12);
      setReadReplicas(4);
      setUseKafkaQueue(true);
      setLbStrategy('least_conn');
    } else if (preset === 'messaging') {
      setQps(30000);
      setCacheHitRate(90);
      setDbShards(8);
      setReadReplicas(4);
      setUseKafkaQueue(true);
      setLbStrategy('ip_hash');
    }
  };

  // Dynamic Latency & Metrics Computation
  const effectiveDbLoad = qps * (1 - cacheHitRate / 100);
  const capacityPerShard = useKafkaQueue ? 4000 : 2000;
  const totalDbCapacity = dbShards * capacityPerShard;

  // Latency calculation
  const isOverloaded = effectiveDbLoad > totalDbCapacity;
  const loadRatio = effectiveDbLoad / Math.max(1, totalDbCapacity);
  
  const baseLatency = useKafkaQueue ? 12 : 24;
  const p50Latency = Math.round(baseLatency + loadRatio * 15);
  const p99Latency = Math.round(isOverloaded ? 450 + (loadRatio - 1) * 800 : p50Latency * 2.8 + loadRatio * 35);
  
  const throughput = Math.min(qps, Math.round(qps / Math.max(1, loadRatio > 1.2 ? loadRatio * 0.9 : 1)));
  const errorRate = isOverloaded ? Math.min(45, Number(((loadRatio - 1) * 30).toFixed(1))) : 0.01;
  const monthlyCost = Math.round((dbShards * 180) + (readReplicas * 90) + (useKafkaQueue ? 350 : 0) + (cacheHitRate > 80 ? 250 : 120));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Interactive System Design Architecture Simulator" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl border border-slate-800 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Distributed Architecture Telemetry</h4>
              <p className="text-[11px] text-slate-300">
                Simulate high-concurrency microservices, p99 latency spikes, cache hit optimization, and database sharding.
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => applyPreset('url_shortener')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-[10px] transition border border-slate-700"
            >
              URL Shortener
            </button>
            <button
              onClick={() => applyPreset('flash_sale')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-[10px] transition border border-slate-700"
            >
              Flash Sale
            </button>
            <button
              onClick={() => applyPreset('messaging')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold text-[10px] transition border border-slate-700"
            >
              Chat System
            </button>
          </div>
        </div>

        {/* Dynamic Metric Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">p99 Latency</p>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-extrabold ${p99Latency > 200 ? 'text-red-500' : 'text-teal-600 dark:text-teal-400'}`}>
                {p99Latency} ms
              </span>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[10px] text-slate-400">p50: {p50Latency}ms</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Throughput</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                {throughput.toLocaleString()} <span className="text-xs font-normal">req/s</span>
              </span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-[10px] text-slate-400">Target QPS: {qps.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Error Rate</p>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-extrabold ${errorRate > 1 ? 'text-red-500' : 'text-teal-600 dark:text-teal-400'}`}>
                {errorRate}%
              </span>
              {errorRate > 1 ? <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" /> : <ShieldCheck className="w-4 h-4 text-teal-500" />}
            </div>
            <p className="text-[10px] text-slate-400">{isOverloaded ? 'DB Write Bottleneck' : 'Healthy Operation'}</p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-semibold text-slate-400">Est. Cloud Cost</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                ${monthlyCost} <span className="text-xs font-normal">/mo</span>
              </span>
              <Server className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-[10px] text-slate-400">{dbShards} Shards • {readReplicas} Replicas</p>
          </div>
        </div>

        {/* Live System Controls & Topology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Controls */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" /> System Architecture Parameters
            </h5>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <span>Traffic Load (QPS)</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{qps.toLocaleString()} req/s</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={qps}
                  onChange={e => setQps(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <span>Redis Cache Hit Rate</span>
                  <span className="text-teal-600 dark:text-teal-400 font-bold">{cacheHitRate}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="99"
                  step="1"
                  value={cacheHitRate}
                  onChange={e => setCacheHitRate(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    DB Shards ({dbShards})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    step="1"
                    value={dbShards}
                    onChange={e => setDbShards(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Read Replicas ({readReplicas})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={readReplicas}
                    onChange={e => setReadReplicas(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                  Kafka Async Write Queue Buffer
                </span>
                <input
                  type="checkbox"
                  checked={useKafkaQueue}
                  onChange={e => setUseKafkaQueue(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interactive Topology Graph Visualizer */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white space-y-3 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-indigo-400" /> Active Topology Flow
              </span>
              <Badge variant={isOverloaded ? 'danger' : 'success'}>
                {isOverloaded ? 'Bottleneck Detected' : 'Optimal Capacity'}
              </Badge>
            </div>

            {/* Topology Diagram Nodes */}
            <div className="space-y-2 py-2">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-bold">1. Client Request Ingress</span>
                <span className="text-indigo-400 font-mono">{qps.toLocaleString()} QPS</span>
              </div>

              <div className="flex justify-center text-slate-600">
                <ArrowRight className="w-3.5 h-3.5 rotate-90" />
              </div>

              <div className="p-2 rounded bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-between text-[11px]">
                <span className="text-indigo-200 font-bold">2. NGINX Load Balancer</span>
                <span className="text-indigo-400 font-mono">Alg: {lbStrategy}</span>
              </div>

              <div className="flex justify-center text-slate-600">
                <ArrowRight className="w-3.5 h-3.5 rotate-90" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-teal-950/80 border border-teal-500/40 text-[10px]">
                  <p className="font-bold text-teal-300">Redis Cache ({cacheHitRate}%)</p>
                  <p className="text-slate-400 font-mono">{Math.round(qps * (cacheHitRate / 100)).toLocaleString()} QPS Served</p>
                </div>
                <div className={`p-2 rounded border text-[10px] ${useKafkaQueue ? 'bg-amber-950/80 border-amber-500/40' : 'bg-slate-900 border-slate-800'}`}>
                  <p className="font-bold text-amber-300">Async Kafka Queue</p>
                  <p className="text-slate-400 font-mono">{useKafkaQueue ? 'Active (Buffered)' : 'Bypassed'}</p>
                </div>
              </div>

              <div className="flex justify-center text-slate-600">
                <ArrowRight className="w-3.5 h-3.5 rotate-90" />
              </div>

              <div className={`p-2.5 rounded border text-[11px] flex items-center justify-between ${isOverloaded ? 'bg-red-950/80 border-red-500/50' : 'bg-slate-900 border-slate-800'}`}>
                <div>
                  <span className="font-bold text-slate-200">3. PostgreSQL Sharded Storage</span>
                  <p className="text-[10px] text-slate-400">{dbShards} Primary Shards • {readReplicas} Read Replicas</p>
                </div>
                <span className="font-mono text-slate-300">{Math.round(effectiveDbLoad).toLocaleString()} W-QPS</span>
              </div>
            </div>

            {/* Diagnostic Advice */}
            <div className="p-2 rounded bg-slate-900/90 text-[10px] text-slate-300 border border-slate-800">
              <strong className="text-indigo-400">Architect Diagnostic: </strong>
              {isOverloaded
                ? 'Warning: Database write QPS exceeds cluster capacity! Enable Kafka Queue or increase Shard count to under 100ms p99.'
                : 'Architecture is highly resilient. Current configuration easily accommodates peak throughput with low latency.'}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
