import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Trophy, Sparkles, Play, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, Terminal, Award, Monitor } from 'lucide-react';

interface HackathonPitchStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PitchSlide {
  id: number;
  title: string;
  subtitle: string;
  highlights: string[];
  metrics: { label: string; val: string }[];
}

const slides: PitchSlide[] = [
  {
    id: 1,
    title: '1. The Problem: Academic & Placement Disconnect',
    subtitle: 'Over 80% of engineering graduates face skill mismatches with modern SDE hiring demands.',
    highlights: [
      'Students lack real-time feedback on ATS resume gaps & semester pacing lag.',
      'Universities struggle with NBA/NAAC Outcome-Based Education (OBE) data tracking.',
      'Enterprise recruiters waste hundreds of hours manually screening unqualified applications.'
    ],
    metrics: [
      { label: 'Graduates Affected', val: '1.5M / yr' },
      { label: 'Skill Gap', val: '68%' },
      { label: 'Avg Screen Time', val: '45 mins' }
    ]
  },
  {
    id: 2,
    title: '2. The Solution: CareerPilot AI Navigation Platform',
    subtitle: 'Full-stack B.Tech career & placement platform powered by dual persistence and autonomous multi-agents.',
    highlights: [
      '36 Integrated Feature Modals across 10 specialized functional phases.',
      'Personalized year-wise semester roadmaps with adaptive AI gap re-optimizers.',
      'Dual Supabase PostgreSQL & Offline LocalStorage fallback for 100% demo uptime.'
    ],
    metrics: [
      { label: 'Feature Modals', val: '36' },
      { label: 'Routed Screens', val: '15' },
      { label: 'Unit Test Pass', val: '100%' }
    ]
  },
  {
    id: 3,
    title: '3. Autonomous Agents & Latency Telemetry',
    subtitle: 'Deploying autonomous auto-apply bots and distributed system design simulators.',
    highlights: [
      'Autonomous Placement Agent auto-matches drives and queues verified ATS resumes.',
      'Interactive System Design Latency Telemetry calculates p99 & QPS bottleneck advice.',
      'Corporate HR Direct Candidate Booking portal dispatches instant calendar invitations.'
    ],
    metrics: [
      { label: 'QPS Capacity', val: '100k req/s' },
      { label: 'ATS Match Boost', val: '+34%' },
      { label: 'Booking Speed', val: '< 2 mins' }
    ]
  },
  {
    id: 4,
    title: '4. Institutional OBE & Judge Panel Verification',
    subtitle: 'Enterprise NBA/NAAC accreditation dashboard and full-stack production health inspection.',
    highlights: [
      'Generates automated NAAC Criterion 5.2 PDF and NBA SAR XML audit reports.',
      'Includes Hackathon System Audit Panel with live response latency metrics.',
      'Verified with 20/20 Vitest unit test suites and 0 build errors.'
    ],
    metrics: [
      { label: 'NAAC OBE Score', val: '94.2%' },
      { label: 'Vitest Unit Tests', val: '20 / 20' },
      { label: 'Build Status', val: 'Clean' }
    ]
  }
];

export const HackathonPitchStudioModal: React.FC<HackathonPitchStudioModalProps> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const slide = slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="TriCity Hackathon Pitch Studio & Live Presentation Viewport" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-teal-500/10 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-teal-900/30 rounded-xl border border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">TriCity Hackathon Grand Finale Deck</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Interactive pitch mode showing problem statement, system architecture, multi-agents, and empirical proofs.
              </p>
            </div>
          </div>
          <Badge variant="warning">
            Hackathon Winner Ready
          </Badge>
        </div>

        {/* Viewport Card */}
        <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4 shadow-2xl relative min-h-[300px] flex flex-col justify-between">
          {/* Slide Header */}
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                Slide {slide.id} of {slides.length}
              </span>
              <h3 className="text-base font-extrabold text-white mt-0.5">{slide.title}</h3>
              <p className="text-xs text-slate-400 font-medium">{slide.subtitle}</p>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] border border-amber-500/30">
                Phase 11 Pitch
              </span>
            </div>
          </div>

          {/* Highlights & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
            <div className="md:col-span-2 space-y-2">
              <h5 className="text-[11px] font-bold text-slate-300">Core Breakthroughs & Innovations:</h5>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {slide.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-bold text-slate-300">Empirical Proof Metrics:</h5>
              <div className="space-y-2">
                {slide.metrics.map((m, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">{m.label}</span>
                    <span className="font-extrabold text-amber-400">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    currentSlideIndex === i ? 'bg-amber-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold transition flex items-center gap-1 border border-slate-800 text-xs"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1 text-xs shadow-md"
              >
                Next Slide <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
