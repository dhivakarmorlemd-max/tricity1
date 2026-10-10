import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { BookOpen, RotateCcw, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface InterviewFlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Flashcard {
  id: number;
  subject: string;
  question: string;
  answer: string;
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    subject: 'Operating Systems',
    question: 'What is Process Virtual Memory and how does Demand Paging work?',
    answer: 'Demand paging loads pages into RAM only when referenced during execution. A Page Fault is raised when an unmapped page is accessed, triggering OS trap handling to fetch it from disk.'
  },
  {
    id: 2,
    subject: 'DBMS',
    question: 'Explain Database Normalization BCNF vs 3NF.',
    answer: 'A relation is in 3NF if for every non-trivial functional dependency X -> Y, X is a Super Key or Y is a Prime Attribute. BCNF is stricter: X MUST be a Super Key for ALL functional dependencies.'
  },
  {
    id: 3,
    subject: 'Computer Networks',
    question: 'What is the 3-Way TCP Handshake and SYN-ACK sequence?',
    answer: '1. Client sends SYN (Synchronize). 2. Server responds with SYN-ACK. 3. Client replies with ACK (Acknowledge) to establish reliable full-duplex socket connection.'
  }
];

export const InterviewFlashcardsModal: React.FC<InterviewFlashcardsModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = flashcards[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((currentIdx + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((currentIdx - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CS Core Interview Revision Flashcards" maxWidth="lg">
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-200">
          <span>Card {currentIdx + 1} of {flashcards.length}</span>
          <Badge variant="info">{card.subject}</Badge>
        </div>

        {/* Flip Card Area */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="p-8 rounded-2xl bg-white dark:bg-navy-900 border-2 border-teal-500/30 shadow-lg cursor-pointer min-h-52 flex flex-col justify-center items-center text-center space-y-3 transition hover:border-teal-500"
        >
          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            {isFlipped ? 'Answer Key (Click to Flip)' : 'Question Prompt (Click to Reveal Answer)'}
          </span>

          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
            {isFlipped ? card.answer : card.question}
          </h3>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handlePrev}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition flex items-center gap-1 shadow"
          >
            Next Card <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
