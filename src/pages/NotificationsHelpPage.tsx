import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { dataService } from '../services/api/dataService';
import { NotificationItem, HelpRequest } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Bell, HelpCircle, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export const NotificationsHelpPage: React.FC = () => {
  const { user, studentProfile } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>(dataService.getNotifications());
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(dataService.getHelpRequests());

  const [showAskModal, setShowAskModal] = useState(false);
  const [helpTopic, setHelpTopic] = useState('');
  const [helpMsg, setHelpMsg] = useState('');

  const handleMarkRead = (id: string) => {
    dataService.markNotificationRead(id);
    setNotifications(dataService.getNotifications());
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.createHelpRequest(helpTopic, helpMsg);
    setHelpRequests(dataService.getHelpRequests());
    setShowAskModal(false);
    setHelpTopic('');
    setHelpMsg('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Bell className="w-6 h-6 text-teal-400" />
            <span>Notifications & Student Guidance Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stay updated on assignment deadlines, teacher feedback, and request one-on-one mentor guidance.
          </p>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Ask Teacher for Help</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Column */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal-500" />
              <span>In-App Notifications</span>
            </h3>
            <Badge variant="info">{notifications.filter(n => !n.read).length} Unread</Badge>
          </div>

          <div className="space-y-3">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleMarkRead(n.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                  !n.read
                    ? 'bg-teal-50/50 dark:bg-teal-950/30 border-teal-500/30 text-slate-900 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                </div>
                <p className="mt-1 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Guidance Requests Column */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <span>My Guidance & Support Requests</span>
            </h3>
          </div>

          <div className="space-y-3">
            {helpRequests.filter(r => r.student_id === user.id).map(req => (
              <div key={req.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{req.topic}</span>
                  <Badge variant={req.status === 'resolved' ? 'success' : 'warning'}>{req.status}</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{req.message}"</p>

                {req.teacher_reply && (
                  <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-700 dark:text-teal-300">
                    <strong className="block text-[10px] uppercase font-bold text-teal-500">Teacher Reply:</strong>
                    {req.teacher_reply}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Ask Teacher Modal */}
      {showAskModal && (
        <Modal
          isOpen={showAskModal}
          onClose={() => setShowAskModal(false)}
          title="Submit Guidance Request to Mentor"
        >
          <form onSubmit={handleCreateRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Topic / Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Guidance on Dynamic Programming or System Design"
                value={helpTopic}
                onChange={e => setHelpTopic(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message for Dr. Vikram Sethi (Mentor)</label>
              <textarea
                rows={4}
                required
                placeholder="Explain what concept or project bug you need assistance with..."
                value={helpMsg}
                onChange={e => setHelpMsg(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Send Help Request</span>
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
