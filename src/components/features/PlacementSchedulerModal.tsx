import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Calendar, Clock, Building2, CheckCircle2, Bell, ExternalLink, Plus } from 'lucide-react';

interface PlacementSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EventSchedule {
  id: string;
  company: string;
  type: 'Online Assessment' | 'Technical Interview' | 'HR Discussion' | 'Campus Presentation';
  date: string;
  time: string;
  locationOrUrl: string;
  status: 'upcoming' | 'completed';
}

const mockSchedules: EventSchedule[] = [
  {
    id: 'ev_1',
    company: 'Google',
    type: 'Online Assessment',
    date: '2026-10-15',
    time: '10:00 AM - 12:00 PM',
    locationOrUrl: 'HackerRank Online Portal',
    status: 'upcoming'
  },
  {
    id: 'ev_2',
    company: 'TCS Digital',
    type: 'Technical Interview',
    date: '2026-10-20',
    time: '02:30 PM - 03:30 PM',
    locationOrUrl: 'Campus Placement Cell (Hall B)',
    status: 'upcoming'
  },
  {
    id: 'ev_3',
    company: 'Razorpay',
    type: 'HR Discussion',
    date: '2026-10-25',
    time: '11:00 AM - 11:45 AM',
    locationOrUrl: 'Google Meet',
    status: 'upcoming'
  }
];

export const PlacementSchedulerModal: React.FC<PlacementSchedulerModalProps> = ({ isOpen, onClose }) => {
  const [schedules, setSchedules] = useState<EventSchedule[]>(mockSchedules);
  const [syncedEvents, setSyncedEvents] = useState<string[]>([]);

  const handleSyncCalendar = (id: string) => {
    setSyncedEvents(prev => [...prev, id]);
    dataService.createHelpRequest(
      `Placement Calendar Sync`,
      `Synced placement event item ${id} with student personal study calendar.`
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recruitment Drive Slot Planner & Calendar" maxWidth="lg">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-teal-500" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">Upcoming Recruiter Events</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Never miss a placement assessment or interview round deadline.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20">
            {schedules.filter(s => s.status === 'upcoming').length} Active Events
          </span>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedules.map(item => {
            const isSynced = syncedEvents.includes(item.id);

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-500/20">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{item.company}</h4>
                      <Badge variant={item.type === 'Online Assessment' ? 'info' : 'warning'}>{item.type}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-500" /> {item.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> {item.time}</span>
                    </p>
                    <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium mt-0.5">📍 {item.locationOrUrl}</p>
                  </div>
                </div>

                {isSynced ? (
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed flex items-center justify-center gap-1 self-start sm:self-center"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Synced to Calendar
                  </button>
                ) : (
                  <button
                    onClick={() => handleSyncCalendar(item.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1 self-start sm:self-center"
                  >
                    <Bell className="w-3.5 h-3.5 text-indigo-400" /> Add Reminder
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
