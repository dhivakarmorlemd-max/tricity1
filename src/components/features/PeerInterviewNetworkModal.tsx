import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Users, Calendar, CheckCircle2, Send, Code2, Award, Clock, Star } from 'lucide-react';

interface PeerInterviewNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PeerPartner {
  id: string;
  name: string;
  college: string;
  targetRole: string;
  readinessScore: number;
  completedMocks: number;
  availableSlot: string;
  badge: string;
}

const mockPeers: PeerPartner[] = [
  {
    id: 'peer_1',
    name: 'Devansh Roy',
    college: 'IIT Delhi (CS)',
    targetRole: 'SDE-1 (Algorithms)',
    readinessScore: 92,
    completedMocks: 18,
    availableSlot: 'Today 6:00 PM',
    badge: 'DSA 500+ Solved'
  },
  {
    id: 'peer_2',
    name: 'Meera Nambiar',
    college: 'BITS Pilani (ECE)',
    targetRole: 'Backend Engineer',
    readinessScore: 89,
    completedMocks: 14,
    availableSlot: 'Tomorrow 4:00 PM',
    badge: 'System Design Pro'
  },
  {
    id: 'peer_3',
    name: 'Kabir Mehta',
    college: 'NIT Trichy (IT)',
    targetRole: 'Full Stack Engineer',
    readinessScore: 87,
    completedMocks: 21,
    availableSlot: 'Saturday 11:00 AM',
    badge: 'React / Node Squad'
  }
];

export const PeerInterviewNetworkModal: React.FC<PeerInterviewNetworkModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();

  const [selectedPeer, setSelectedPeer] = useState<PeerPartner | null>(null);
  const [topic, setTopic] = useState<string>('LeetCode Medium (Graphs & Dynamic Programming)');
  const [scheduledSlots, setScheduledSlots] = useState<string[]>([]);

  const handleBookPeerMock = (peer: PeerPartner) => {
    dataService.createHelpRequest(
      `Peer Mock Interview Booked: ${peer.name} (${peer.college})`,
      `Scheduled peer-to-peer live mock interview for ${peer.availableSlot}. Topic: ${topic}.`
    );

    setScheduledSlots(prev => [...prev, peer.id]);
    setSelectedPeer(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Peer Mock Interview & Pair Programming Matchmaker Network" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-teal-600/10 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-teal-900/30 rounded-xl border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Inter-College Peer Mock Exchange</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Practice 1-on-1 live pair programming and mock technical interviews with peers from top engineering institutes.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Peer Match Active
          </Badge>
        </div>

        {/* Selected Peer Scheduling Drawer */}
        {selectedPeer && (
          <div className="p-4 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/30 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-xs">
                  Confirm Peer Mock with <span className="text-indigo-600 dark:text-indigo-400">{selectedPeer.name}</span> ({selectedPeer.college})
                </h5>
                <p className="text-[10px] text-slate-400">Slot: {selectedPeer.availableSlot} • Readiness: {selectedPeer.readinessScore}%</p>
              </div>
              <button
                onClick={() => setSelectedPeer(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Select Interview Topic
              </label>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full p-1.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              >
                <option>LeetCode Medium (Graphs & Dynamic Programming)</option>
                <option>System Architecture & Microservices Design</option>
                <option>Full Stack Sandbox Live Pair Coding</option>
                <option>STAR Behavioral & Behavioral Leadership</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => handleBookPeerMock(selectedPeer)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 text-xs shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Book Peer Mock Session & Send Invite
              </button>
            </div>
          </div>
        )}

        {/* Peer Partners Grid */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
            Available Verified Peer Interview Partners
          </h5>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {mockPeers.map(peer => {
              const isBooked = scheduledSlots.includes(peer.id);

              return (
                <div
                  key={peer.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-indigo-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h6 className="font-bold text-slate-900 dark:text-white text-xs">{peer.name}</h6>
                      <Badge variant="success">{peer.college}</Badge>
                      <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500" /> {peer.completedMocks} Mocks Completed
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                      Target: {peer.targetRole} • Readiness Score: <strong className="text-indigo-600 dark:text-indigo-400">{peer.readinessScore}%</strong>
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>✓ {peer.badge}</span>
                      <span>• Available: <strong className="text-slate-700 dark:text-slate-200">{peer.availableSlot}</strong></span>
                    </div>
                  </div>

                  <div>
                    {isBooked ? (
                      <span className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] flex items-center gap-1 border border-indigo-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Booked
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedPeer(peer)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Schedule Peer Mock
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
