import React, { useState } from 'react';
import { appConfig } from '../config/appConfig';
import { dataService } from '../services/api/dataService';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import {
  ShieldAlert,
  Map,
  Layers,
  Users,
  Settings,
  Plus,
  CheckCircle2,
  Database,
  BarChart3,
  Edit3
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const users = dataService.getAllUsers();
  const tasks = dataService.getRoadmapTasks();
  const projects = dataService.getProjects();
  const assessments = dataService.getAssessments();

  const [activeTab, setActiveTab] = useState<'templates' | 'skills' | 'users' | 'analytics'>('templates');

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>System Administrator Console</span>
          </div>
          <h1 className="text-2xl font-extrabold">CareerPilot AI System Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure roadmap templates, skill banks, project categories, and system operational rules.
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4">
        {[
          { id: 'templates', label: 'Roadmap Templates', icon: Map },
          { id: 'skills', label: 'Skill & Project Bank', icon: Layers },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'analytics', label: 'Platform Operational Logs', icon: BarChart3 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-1 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
                isActive
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Roadmap Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active System Roadmap Tasks ({tasks.length})</h3>
            <Badge variant="info">Global Master Config</Badge>
          </div>

          <div className="space-y-3">
            {tasks.map(t => (
              <Card key={t.id} hoverEffect className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{t.title}</span>
                    <Badge variant="neutral" size="sm">Year {t.year} • Sem {t.semester}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{t.estimated_hours} Hours</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Skill & Project Bank */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Configurable Skill Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {appConfig.skillCategories.map(cat => (
                <div key={cat.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{cat.name}</div>
                  <div className="text-[11px] text-slate-500">{cat.description}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Configured Project Templates ({projects.length})</h3>
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{p.title}</div>
                    <div className="text-[11px] text-slate-500">{p.tech_stack.join(', ')}</div>
                  </div>
                  <Badge variant="info">{p.difficulty}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: User Directory */}
      {activeTab === 'users' && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Platform Registered Users ({users.length})</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map(u => (
              <div key={u.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={u.avatar_url} alt={u.full_name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{u.full_name}</div>
                    <div className="text-[10px] text-slate-500">{u.email}</div>
                  </div>
                </div>
                <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'teacher' ? 'warning' : 'info'}>
                  {u.role.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: Analytics & Operational Logs */}
      {activeTab === 'analytics' && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">System Operational Status</h3>
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span>Database Engine:</span>
              <span className="font-bold text-teal-400">PostgreSQL / Supabase (Demo Fallback Ready)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span>Row Level Security (RLS):</span>
              <span className="font-bold text-emerald-400">Active & Enforced</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Recommendation Engine:</span>
              <span className="font-bold text-teal-400">Modular Rule Engine + GenAI Adapter</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
