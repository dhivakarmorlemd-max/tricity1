import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  CreditCard,
  Wifi,
  ChevronRight,
  User,
  GitBranch,
  Search,
  Shield,
  Smartphone,
  Accessibility,
  Eye,
  Layers,
  Palette,
  LayoutGrid,
  Type,
  Zap,
  CheckCircle2,
  Code2,
  FileText,
  Building2,
  Award,
  Terminal
} from 'lucide-react';

interface UXDesign2026ShowcaseProps {
  placementScore?: number;
  completedTasksCount?: number;
  totalTasksCount?: number;
  onOpenModal: (target: string) => void;
}

export const UXDesign2026Showcase: React.FC<UXDesign2026ShowcaseProps> = ({
  placementScore = 88,
  completedTasksCount = 12,
  totalTasksCount = 16,
  onOpenModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ui' | 'ux'>('all');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const uiPillars = [
    {
      id: 'ui_typography',
      icon: Type,
      title: 'Bold Typography',
      desc: 'High-contrast, geometric Plus Jakarta Sans headers commanding instant cognitive clarity.',
      tag: 'Aa',
    },
    {
      id: 'ui_gradients',
      icon: Palette,
      title: 'Vibrant Gradients',
      desc: 'Luminous electric violet to radiant indigo linear spectrums with soft ambient lighting.',
      tag: '🟣',
    },
    {
      id: 'ui_layouts',
      icon: LayoutGrid,
      title: 'Clean Layouts',
      desc: 'Airy 24px-32px padding grids with rounded-2xl & rounded-3xl container geometries.',
      tag: '⠿',
    },
    {
      id: 'ui_colors',
      icon: Layers,
      title: 'Modern Colors',
      desc: 'Deep obsidian midnight purple (#090616) paired with high-saturation violet accents.',
      tag: '◐',
    },
    {
      id: 'ui_interactions',
      icon: Sparkles,
      title: 'Micro Interactions',
      desc: 'Tactile hover elevations, pulsing neon readiness badges, and smooth state transitions.',
      tag: '✦',
    },
    {
      id: 'ui_visuals',
      icon: Eye,
      title: 'Consistent Visuals',
      desc: 'Harmonious stroke weights, unified icon containers, and balanced visual weights.',
      tag: '👁',
    },
  ];

  const uxPillars = [
    {
      id: 'ux_user_centric',
      icon: User,
      title: 'User-Centric Design',
      desc: 'Tailored specifically for student academic pacing and Tier-1 placement expectations.',
      tag: '👤',
    },
    {
      id: 'ux_seamless_flows',
      icon: GitBranch,
      title: 'Seamless Flows',
      desc: 'Zero-friction 1-click Quick-Fixes that auto-resolve prerequisite roadblocks instantly.',
      tag: '🔀',
    },
    {
      id: 'ux_contextual',
      icon: Search,
      title: 'Contextual Experiences',
      desc: 'Adaptive recommendations dynamically recalibrating to semester workload & skill gaps.',
      tag: '🔍',
    },
    {
      id: 'ux_trust',
      icon: Shield,
      title: 'Privacy & Trust',
      desc: 'Cryptographically signed faculty verification badges and transparent AI diagnoses.',
      tag: '🛡️',
    },
    {
      id: 'ux_consistency',
      icon: Smartphone,
      title: 'Cross-Device Parity',
      desc: 'Universal experience across mobile, tablet, and desktop with a floating navigation dock.',
      tag: '📱',
    },
    {
      id: 'ux_accessibility',
      icon: Accessibility,
      title: 'Accessibility Default',
      desc: 'WCAG AAA contrast ratios, clear focus rings, and high-legibility typographic hierarchies.',
      tag: '♿',
    },
  ];

  const glassStackCards = [
    {
      id: 'card_sandbox',
      title: 'Live Code Sandbox & Compiler',
      subtitle: 'Instant LeetCode Medium Execution',
      target: 'live_sandbox',
      icon: Terminal,
    },
    {
      id: 'card_ats',
      title: 'ATS Resume Keyword Scanner',
      subtitle: '92% Schema Match with SDE Roles',
      target: 'ats_scanner',
      icon: FileText,
    },
    {
      id: 'card_whiteboard',
      title: 'System Design Architecture Hub',
      subtitle: 'Distributed Systems & Kafka Topologies',
      target: 'whiteboard',
      icon: Code2,
    },
    {
      id: 'card_exam',
      title: 'Placement Benchmark Simulator',
      subtitle: 'Tier-1 Coding & Aptitude Test Engine',
      target: 'placement_exam',
      icon: Award,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#110c2c] via-[#0c081e] to-[#080514] p-5 sm:p-8 text-white shadow-2xl shadow-purple-950/40">
      {/* Background Radial Glow Spheres */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[90px] pointer-events-none" />
      <div className="absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px] pointer-events-none" />

      {/* Header Banner: Exact Title from Pinterest UX reference */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-purple-500/15 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/25">
              UI/UX DESIGN SYSTEM 2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300">
              Pinterest Reference Active
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-heading">
            <span className="text-white">UI/UX DESIGN </span>
            <span className="gradient-text-2026">TRENDS TO WATCH IN 2026</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl leading-relaxed">
            Engineered around dual pillars: high-impact <strong>UI Visual Innovation</strong> (bold typography, vibrant gradients, micro-interactions) and <strong>UX Experience Architecture</strong> (user-centric, seamless flows, contextual accessibility).
          </p>
        </div>

        {/* Filter View Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#19113d]/80 border border-purple-500/30 shrink-0">
          {[
            { id: 'all', label: 'Complete System' },
            { id: 'ui', label: 'UI (Visuals)' },
            { id: 'ux', label: 'UX (Architecture)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'text-purple-300 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column 2026 Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column: UI Pillars (4 cols) */}
        {(activeTab === 'all' || activeTab === 'ui') && (
          <div className={`${activeTab === 'all' ? 'lg:col-span-3' : 'lg:col-span-6'} space-y-3`}>
            <div className="flex items-center justify-between px-2 pb-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                <span className="text-base font-black">UI</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                  Visual Design
                </span>
              </span>
              <span className="text-[11px] text-purple-300/60 font-semibold">6 Pillars</span>
            </div>

            <div className="space-y-2.5">
              {uiPillars.map((pillar) => {
                const Icon = pillar.icon;
                const isSelected = selectedPillar === pillar.id;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setSelectedPillar(isSelected ? null : pillar.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-purple-900/40 border-purple-400 shadow-md shadow-purple-500/20'
                        : 'bg-[#150f38]/60 hover:bg-[#1a1346]/80 border-purple-500/15 hover:border-purple-400/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-300 font-bold group-hover:scale-105 transition-transform shrink-0">
                        <span className="text-xs">{pillar.tag}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-purple-200 transition">
                          {pillar.title}
                        </div>
                        <p className="text-[11px] text-purple-300/70 truncate mt-0.5">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <p className="text-[11px] text-purple-200 mt-2 pt-2 border-t border-purple-500/20 leading-relaxed animate-in fade-in">
                        {pillar.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Centerpiece Column: The Interactive 2026 Mobile & Dashboard Mockup (5 cols) */}
        <div className={`${activeTab === 'all' ? 'lg:col-span-5' : 'lg:col-span-6'} space-y-4`}>
          {/* Outer Phone / Card Frame as shown in the center of the Pinterest reference */}
          <div className="rounded-3xl border border-purple-400/30 bg-[#0e0924]/90 p-4 sm:p-5 shadow-2xl shadow-purple-950/60 relative overflow-hidden backdrop-blur-2xl">
            {/* Top Bar of the Phone Frame */}
            <div className="flex items-center justify-between pb-3.5 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-0.5 p-1 rounded-lg bg-purple-500/20 text-purple-300">
                  <div className="w-1.5 h-1.5 rounded-sm bg-purple-300" />
                  <div className="w-1.5 h-1.5 rounded-sm bg-purple-300" />
                  <div className="w-1.5 h-1.5 rounded-sm bg-purple-300" />
                  <div className="w-1.5 h-1.5 rounded-sm bg-purple-300" />
                </div>
                <span className="text-xs font-extrabold text-white tracking-wide">
                  Student Dashboard
                </span>
              </div>

              {/* User Avatar with Glowing Indicator */}
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white ring-2 ring-purple-400/40">
                  MB
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-950" />
              </div>
            </div>

            {/* Split: Balance & Career SDE Smart Credential */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3.5">
              {/* Card 1: Total Readiness & Sparkline Wave */}
              <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-white text-slate-900 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Placement Readiness Index
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl font-black text-slate-950 tracking-tight">
                      {placementScore}%
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3 text-emerald-700" />
                      +12.5% this month
                    </span>
                  </div>
                </div>

                {/* Smooth SVG Wave Sparkline Chart */}
                <div className="mt-3 h-12 w-full">
                  <svg viewBox="0 0 160 50" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 35 Q 25 15, 50 30 T 100 15 T 160 10 L 160 50 L 0 50 Z"
                      fill="url(#waveGrad)"
                    />
                    <path
                      d="M 0 35 Q 25 15, 50 30 T 100 15 T 160 10"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="160" cy="10" r="3.5" fill="#7C3AED" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Digital Smart SDE Credential (Exact Look from Pinterest Image) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#1b1243] to-[#25185e] border border-purple-400/30 text-white shadow-lg flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/15 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="w-7 h-5 rounded bg-amber-400/80 border border-amber-300/40 flex items-center justify-center">
                    <div className="w-4 h-3 rounded-sm border border-amber-600/50" />
                  </div>
                  <Wifi className="w-4 h-4 text-purple-300 rotate-90" />
                </div>
                <div className="my-2">
                  <div className="text-[10px] text-purple-300 font-mono tracking-widest">
                    CARD • 2026-SDE-AI
                  </div>
                  <div className="text-xs font-black text-white tracking-wide mt-0.5">
                    Bharath M.
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-purple-300/80 pt-1 border-t border-purple-500/20">
                  <span>EXP: SEMESTER 8</span>
                  <span className="text-emerald-400 font-bold">VERIFIED ✓</span>
                </div>
              </div>
            </div>

            {/* Split: Skill Domain Donut & Goals 75% Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {/* Donut Chart: Skill Domain Distribution */}
              <div className="p-3.5 rounded-2xl bg-[#140e34]/80 border border-purple-500/20 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                  Skill Domain Allocation
                </span>
                <div className="flex items-center gap-3 my-2">
                  {/* Circular SVG Donut Chart */}
                  <div className="relative w-14 h-14 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                      {/* Segment 1: CS Systems 45% (Purple) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="4.5"
                        strokeDasharray="45 55"
                        strokeDashoffset="0"
                      />
                      {/* Segment 2: Cloud & DevOps 35% (Indigo) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="4.5"
                        strokeDasharray="35 65"
                        strokeDashoffset="-45"
                      />
                      {/* Segment 3: DSA & Algo 20% (Pink/Lilac) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#C084FC"
                        strokeWidth="4.5"
                        strokeDasharray="20 80"
                        strokeDashoffset="-80"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
                      100%
                    </div>
                  </div>

                  {/* Legend Tags */}
                  <div className="space-y-1 text-[10px]">
                    <div className="flex items-center gap-1.5 text-purple-200">
                      <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                      <span>CS Core: 45%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-indigo-200">
                      <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                      <span>Cloud: 35%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-purple-300">
                      <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
                      <span>DSA: 20%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals: 75% Tracker (Exact Widget from Pinterest mockup) */}
              <div className="p-3.5 rounded-2xl bg-[#140e34]/80 border border-purple-500/20 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                    Milestone Goals
                  </span>
                  <div className="text-xl font-black text-white mt-1">75%</div>
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="w-full h-3 rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-400 shadow-sm"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-purple-300/70">
                    <span>{completedTasksCount} Completed</span>
                    <span>{totalTasksCount} Total Tasks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom App Navigation Dock Mockup from Image */}
            <div className="mt-3.5 pt-3 border-t border-purple-500/20 flex items-center justify-around px-2 text-purple-400">
              <div className="p-1.5 rounded-xl bg-purple-600/30 text-white border border-purple-500/30">
                <span className="w-4 h-4 block">🏠</span>
              </div>
              <div className="p-1.5 hover:text-white transition cursor-pointer">
                <span className="w-4 h-4 block">📊</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full border border-purple-400" />
              <div className="w-2.5 h-2.5 rounded-full border border-purple-400" />
              <div className="w-2.5 h-2.5 rounded-full border border-purple-400" />
            </div>
          </div>
        </div>

        {/* Right Column: UX Architecture Pillars & Dark Glass Stack (4 cols) */}
        {(activeTab === 'all' || activeTab === 'ux') && (
          <div className={`${activeTab === 'all' ? 'lg:col-span-4' : 'lg:col-span-6'} space-y-4`}>
            {/* Dark Glass Stack from the reference image */}
            <div>
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                  <span className="text-base font-black">UX</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                    1-Click Solvers
                  </span>
                </span>
                <span className="text-[11px] text-purple-300/60 font-semibold">Interactive</span>
              </div>

              {/* 4 Sleek Dark Frosted Cards with Chevrons (Directly from Mockup) */}
              <div className="space-y-2">
                {glassStackCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => onOpenModal(card.target)}
                      className="w-full p-3 rounded-2xl bg-[#140e34]/70 hover:bg-[#1f1550]/90 border border-purple-500/20 hover:border-purple-400/50 text-left transition-all duration-200 flex items-center justify-between group shadow-lg shadow-purple-950/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-500/15 text-purple-300 group-hover:scale-110 group-hover:bg-purple-500/25 transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-purple-200 transition">
                            {card.title}
                          </div>
                          <div className="text-[10px] text-purple-300/70">
                            {card.subtitle}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UX Architectural Pillars List */}
            <div className="space-y-2 pt-2 border-t border-purple-500/15">
              <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400 px-1">
                UX Foundations (2026 Standard)
              </div>
              <div className="grid grid-cols-2 gap-2">
                {uxPillars.slice(0, 4).map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.id}
                      className="p-2 rounded-xl bg-[#120b2e]/60 border border-purple-500/10 text-[11px]"
                    >
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{pillar.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
