import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Megaphone, Send, CheckCircle2 } from 'lucide-react';

interface ClassAnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassAnnouncementsModal: React.FC<ClassAnnouncementsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMsg, setAnnouncementMsg] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle || !announcementMsg) return;

    // Broadcast notification to all students
    dataService.addNotification({
      user_id: 'user_student_1',
      title: `ANNOUNCEMENT: ${announcementTitle}`,
      message: `${user.full_name}: "${announcementMsg}"`,
      type: 'recommendation',
      read: false
    });

    dataService.addNotification({
      user_id: 'user_student_2',
      title: `ANNOUNCEMENT: ${announcementTitle}`,
      message: `${user.full_name}: "${announcementMsg}"`,
      type: 'recommendation',
      read: false
    });

    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Broadcast Mentor Announcement">
      <form onSubmit={handlePostAnnouncement} className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold">Broadcast to All Enrolled Students</h4>
            <p className="text-slate-400">Posts instant alert notification across student dashboards.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Announcement Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. TechCorp Campus Drive Registration Open!"
            value={announcementTitle}
            onChange={e => setAnnouncementTitle(e.target.value)}
            className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message Details *</label>
          <textarea
            rows={4}
            required
            placeholder="Describe drive details, deadlines, and required ATS resume score..."
            value={announcementMsg}
            onChange={e => setAnnouncementMsg(e.target.value)}
            className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        {postedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Broadcast announcement published to all student dashboards!</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Announcement</span>
        </button>
      </form>
    </Modal>
  );
};
