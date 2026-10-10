import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Send, Bell, Users, CheckCircle2, Mail, MessageSquare, ShieldAlert } from 'lucide-react';

interface BatchNotificationAutomatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BatchNotificationAutomatorModal: React.FC<BatchNotificationAutomatorModalProps> = ({ isOpen, onClose }) => {
  const [targetGroup, setTargetGroup] = useState<'all' | 'at_risk' | 'cse' | 'aiml'>('at_risk');
  const [subject, setSubject] = useState('Urgent Placement Readiness Reminder — Semester 5');
  const [message, setMessage] = useState(
    'Dear Student, your current placement readiness score is below the 75% benchmark. Please complete your active semester roadmap milestones and schedule a mentor review.'
  );
  const [sentCount, setSentCount] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      const allStudents = dataService.getAllUsers().filter(u => u.role === 'student');
      let recipientsCount = allStudents.length;

      if (targetGroup === 'at_risk') {
        recipientsCount = allStudents.filter(s => dataService.getStudentProfile(s.id).placement_readiness_score < 75).length;
      }

      dataService.createHelpRequest(
        `Automated Batch Broadcast: ${subject}`,
        `Sent automated notification to ${recipientsCount} students in category '${targetGroup}'. Message: ${message}`
      );

      setSentCount(recipientsCount);
      setIsSending(false);
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Faculty Automated Batch Notification Engine" maxWidth="lg">
      <div className="space-y-5">
        {/* Banner */}
        <div className="p-3.5 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-500" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Broadcaster Console</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Push real-time alerts to student notification hubs & email digests.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20">
            System Admin Tool
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleBroadcast} className="p-4 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Recipient Student Group</label>
            <select
              value={targetGroup}
              onChange={e => setTargetGroup(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="at_risk">At-Risk Students (Readiness Score &lt; 75%)</option>
              <option value="all">All Enrolled B.Tech Students</option>
              <option value="cse">CSE Branch Only</option>
              <option value="aiml">AI/ML Branch Only</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Notification Subject Header</label>
            <input
              type="text"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">Message Content</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {sentCount !== null ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Dispatched to {sentCount} Students!
              </span>
            ) : <div />}

            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:opacity-95 text-white font-bold transition flex items-center gap-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              {isSending ? 'Dispatching...' : 'Dispatch Automated Broadcast'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
