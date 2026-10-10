import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, Award, Zap, Layers } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: string[];
  badge: string;
}

const pitchDeckSlides: Slide[] = [
  {
    id: 1,
    title: "Core Problem Statement",
    subtitle: "Fragmented B.Tech Career Guidance & Unguided Semesters",
    content: [
      "B.Tech engineering students lack semester-by-semester technical direction.",
      "Uncertainty regarding which programming languages, DSA topics, and capstones to build.",
      "Mentors lack a centralized dashboard to track class skill gaps and verify code submissions."
    ],
    badge: "Problem Definition"
  },
  {
    id: 2,
    title: "CareerPilot AI Solution",
    subtitle: "Centralized Year-Wise Student Placement Platform",
    content: [
      "Guided 4-Step Student Setup Wizard collecting branch, semester, and target job role.",
      "Year-Wise & Semester Roadmap with prerequisite task dependencies.",
      "Verified Skill Matrix distinguishing self-ratings, quiz scores, and mentor verification badges."
    ],
    badge: "Solution Architecture"
  },
  {
    id: 3,
    title: "Full-Stack System Architecture",
    subtitle: "React 18 + TypeScript + Vite + Supabase PostgreSQL RLS",
    content: [
      "Frontend: React 18, TypeScript, Tailwind CSS, Lucide icons, glassmorphism UI.",
      "Backend & DB: PostgreSQL with Row Level Security (RLS) policies and safe seed data.",
      "Dual-Mode Persistence: Runs offline via DemoAdapter or online connected to Supabase."
    ],
    badge: "Tech Stack"
  },
  {
    id: 4,
    title: "Empirical Key Differentiators",
    subtitle: "Transparent Math & AI Extension Adapter",
    content: [
      "No Fake Scores: Placement Readiness Index calculated transparently (35% tasks + 25% quizzes + 25% projects + 15% resume).",
      "Rule Engine + GenAI Extension Adapter for safe AI advice without exposing keys.",
      "1-Click Role Switcher (Student, Mentor, Admin) for live hackathon judge testing."
    ],
    badge: "Innovation & Integrity"
  }
];

interface HackathonPresentationDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonPresentationDeckModal: React.FC<HackathonPresentationDeckModalProps> = ({ isOpen, onClose }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = pitchDeckSlides[slideIdx];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="TriCity Hackathon Master Pitch Deck" maxWidth="lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="info">{slide.badge}</Badge>
          <span className="text-xs font-bold text-slate-400">Slide {slideIdx + 1} of {pitchDeckSlides.length}</span>
        </div>

        {/* Slide Card Content */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-900 via-slate-900 to-teal-950 text-white space-y-4 border border-teal-500/20 shadow-xl min-h-[240px] flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-white">{slide.title}</h3>
            <p className="text-xs font-semibold text-teal-400">{slide.subtitle}</p>
          </div>

          <ul className="space-y-2 text-xs text-slate-200">
            {slide.content.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setSlideIdx(Math.max(0, slideIdx - 1))}
            disabled={slideIdx === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          <div className="flex gap-1.5">
            {pitchDeckSlides.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === slideIdx ? 'bg-teal-500 w-5' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setSlideIdx(Math.min(pitchDeckSlides.length - 1, slideIdx + 1))}
            disabled={slideIdx === pitchDeckSlides.length - 1}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center gap-1 shadow-md"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
