import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { GraduationCap, BookOpen, Globe, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface HigherEducationExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CareerTrack {
  id: string;
  title: string;
  category: 'GATE CS Exam' | 'MS Abroad (US/Germany)' | 'MBA / CAT' | 'Direct Industry SDE';
  description: string;
  keyRequirements: string[];
  targetTimeline: string;
}

const tracks: CareerTrack[] = [
  {
    id: 'track_gate',
    title: 'GATE Computer Science & IT 2027',
    category: 'GATE CS Exam',
    description: 'Path for M.Tech admissions at IITs/NITs and PSU recruitment (IOCL, ISRO, BARC).',
    keyRequirements: ['Algorithms & Data Structures', 'Operating Systems', 'Computer Architecture', 'Theory of Computation'],
    targetTimeline: 'Semester 6 & 7 Preparation Window'
  },
  {
    id: 'track_ms',
    title: 'MS in Computer Science / AI (USA & Germany)',
    category: 'MS Abroad (US/Germany)',
    description: 'Global master degree track with focus on research publications, GRE/TOEFL, and LORs.',
    keyRequirements: ['Minimum 8.0 CGPA', 'GRE Score: 315+', 'IELTS/TOEFL', '2 Teacher LORs'],
    targetTimeline: 'Apply in Semester 7 (Fall Intake)'
  },
  {
    id: 'track_sde',
    title: 'Direct Product SDE Placement',
    category: 'Direct Industry SDE',
    description: 'Immediate entry into Tier-1 Tech Product Companies or High-Growth Startups.',
    keyRequirements: ['500+ LeetCode Solved', '2 Production Capstones', 'ATS Resume Match 85%+'],
    targetTimeline: 'Semester 7 Campus Recruitment Drives'
  }
];

export const HigherEducationExplorerModal: React.FC<HigherEducationExplorerModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<string>('track_sde');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Higher Education & Parallel Career Track Explorer" maxWidth="lg">
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-3.5 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-teal-500" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Dual Track Navigator</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Explore GATE CS, MS Abroad, and Direct Placement preparation roadmaps.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20">
            Semester {studentProfile.current_semester} Planner
          </span>
        </div>

        {/* Tracks List */}
        <div className="space-y-3">
          {tracks.map(track => {
            const isSelected = selectedTrack === track.id;

            return (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-teal-50/50 dark:bg-teal-950/30 border-teal-500 shadow-md'
                    : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{track.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{track.description}</p>
                  </div>
                  <Badge variant={isSelected ? 'success' : 'info'}>{track.category}</Badge>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {track.keyRequirements.map(req => (
                      <span key={req} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {req}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                    ⏱️ {track.targetTimeline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
