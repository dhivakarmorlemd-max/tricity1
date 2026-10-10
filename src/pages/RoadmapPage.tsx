import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { appConfig } from '../config/appConfig';
import { dataService } from '../services/api/dataService';
import { RoadmapTask, StudentTaskProgress } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { RoadmapAnalyticsModal } from '../components/features/RoadmapAnalyticsModal';
import {
  Map,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  PlayCircle,
  PauseCircle,
  Plus,
  Edit3,
  BarChart3
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<number>(studentProfile.current_semester);
  const [tasks, setTasks] = useState<RoadmapTask[]>(dataService.getRoadmapTasks());
  const [progressMap, setProgressMap] = useState<Record<string, StudentTaskProgress>>(dataService.getStudentTaskProgress());

  // Task Update Modal
  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(null);
  const [taskNotes, setTaskNotes] = useState('');
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  // Add Custom Task Modal State
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Web & Mobile Development');
  const [newHours, setNewHours] = useState(15);
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newResourceUrl, setNewResourceUrl] = useState('');

  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const filteredTasks = tasks.filter(t => t.semester === selectedSemester);

  const handleStatusUpdate = (taskId: string, newStatus: StudentTaskProgress['status']) => {
    dataService.updateTaskStatus(taskId, newStatus, taskNotes);
    setProgressMap(dataService.getStudentTaskProgress());
    setSelectedTask(null);
    setTaskNotes('');
  };

  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = dataService.addCustomRoadmapTask({
      year: Math.ceil(selectedSemester / 2),
      semester: selectedSemester,
      month: (selectedSemester - 1) * 6 + 1,
      week: (selectedSemester - 1) * 24 + 1,
      title: newTitle,
      description: newDesc,
      estimated_hours: Number(newHours),
      difficulty: newDifficulty,
      prerequisite_skills: [],
      learning_resource_url: newResourceUrl,
      category: newCategory,
      target_role_id: studentProfile.target_role_id
    });
    setTasks(dataService.getRoadmapTasks());
    setShowAddTaskModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
            <Map className="w-4 h-4" />
            <span>Target Role: {targetRole?.title}</span>
          </div>
          <h1 className="text-2xl font-extrabold">Dynamic Year-Wise Engineering Roadmap</h1>
          <p className="text-xs text-slate-400">
            Customize tasks, add personal semester milestones, and update real-time progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAnalyticsModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Skill Radar Analytics</span>
          </button>

          <button
            onClick={() => setShowAddTaskModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Milestone</span>
          </button>
        </div>
      </div>

      {/* Semester Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {appConfig.academic.semesters.map(sem => {
          const isCurrent = sem.id === studentProfile.current_semester;
          const isSelected = sem.id === selectedSemester;
          return (
            <button
              key={sem.id}
              onClick={() => setSelectedSemester(sem.id)}
              className={`shrink-0 px-4 py-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-0.5 ${
                isSelected
                  ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal-500/50'
              }`}
            >
              <span>{sem.name}</span>
              <span className={`text-[10px] ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                {sem.year} {isCurrent ? '• (Current)' : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Dynamic Milestones for Semester {selectedSemester}</span>
            <span className="text-xs font-normal text-slate-400">({filteredTasks.length} Tasks)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map(task => {
            const p = progressMap[task.id];
            const status = p?.status || 'not_started';

            return (
              <Card key={task.id} hoverEffect className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{task.title}</h4>
                      {task.custom && <Badge variant="warning" size="sm">User Custom</Badge>}
                      <Badge
                        variant={
                          status === 'completed'
                            ? 'success'
                            : status === 'in_progress'
                            ? 'info'
                            : status === 'postponed'
                            ? 'warning'
                            : 'neutral'
                        }
                      >
                        {status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="info" size="sm">{task.difficulty}</Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{task.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setTaskNotes(p?.notes || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Status</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      Est. {task.estimated_hours} Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      {task.category}
                    </span>
                  </div>

                  {task.learning_resource_url && (
                    <a
                      href={task.learning_resource_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Learning Resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Update Task Status Modal */}
      {selectedTask && (
        <Modal
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          title={`Update Task: ${selectedTask.title}`}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">{selectedTask.description}</p>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Select Completion Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleStatusUpdate(selectedTask.id, 'completed')}
                  className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex flex-col items-center gap-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress')}
                  className="p-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 font-bold text-xs flex flex-col items-center gap-1"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>In Progress</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedTask.id, 'postponed')}
                  className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold text-xs flex flex-col items-center gap-1"
                >
                  <PauseCircle className="w-4 h-4" />
                  <span>Postpone</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedTask.id, 'not_started')}
                  className="p-3 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-slate-600 dark:text-slate-400 border border-slate-500/30 font-bold text-xs flex flex-col items-center gap-1"
                >
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Personal Study Notes / Repository Link</label>
              <textarea
                rows={3}
                value={taskNotes}
                onChange={e => setTaskNotes(e.target.value)}
                placeholder="Log your learning notes or github repository link..."
                className="w-full p-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Add Custom Task Modal */}
      {showAddTaskModal && (
        <Modal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
          title={`Add Milestone Task to Semester ${selectedSemester}`}
        >
          <form onSubmit={handleAddCustomTask} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Milestone Task Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Master Microservice Security & OAuth2"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                placeholder="Key concepts to cover, project output, and learning outcomes..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Est. Duration (Hours)</label>
                <input
                  type="number"
                  min="2"
                  max="60"
                  value={newHours}
                  onChange={e => setNewHours(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={e => setNewDifficulty(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Learning Resource URL (Optional)</label>
              <input
                type="url"
                placeholder="https://documentation-or-course.com"
                value={newResourceUrl}
                onChange={e => setNewResourceUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-lg"
            >
              Add Milestone to Roadmap
            </button>
          </form>
        </Modal>
      )}

      {/* Analytics Modal */}
      <RoadmapAnalyticsModal isOpen={showAnalyticsModal} onClose={() => setShowAnalyticsModal(false)} />
    </div>
  );
};
