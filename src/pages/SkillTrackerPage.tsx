import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { appConfig } from '../config/appConfig';
import { dataService } from '../services/api/dataService';
import { StudentSkill } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { CheckSquare2, Award, ShieldCheck, Star, Plus, Check } from 'lucide-react';

export const SkillTrackerPage: React.FC = () => {
  const { user, role } = useAuth();
  const [skills, setSkills] = useState<StudentSkill[]>(dataService.getStudentSkills(user.id));

  // Add Custom Skill Modal
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState(appConfig.skillCategories[0].name);

  const handleSelfLevelChange = (skillId: string, level: number) => {
    const updated = dataService.updateStudentSkill(skillId, level);
    setSkills(updated);
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;
    dataService.addCustomSkill(newSkillName, newSkillCategory);
    setSkills(dataService.getStudentSkills(user.id));
    setShowAddSkillModal(false);
    setNewSkillName('');
  };

  const handleToggleTeacherVerify = (skillId: string) => {
    dataService.verifySkillByTeacher(user.id, skillId, user.role === 'teacher' ? user.full_name : 'Dr. Vikram Sethi');
    setSkills(dataService.getStudentSkills(user.id));
  };

  const categories = appConfig.skillCategories;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Page Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <CheckSquare2 className="w-6 h-6 text-teal-400" />
            <span>Dynamic Verified Skill Matrix</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add custom technical skills, adjust self-rating levels dynamically, and request mentor verification badges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddSkillModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Skill</span>
          </button>
        </div>
      </div>

      {/* Stats Header Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Tracked</div>
          <div className="text-xl font-black text-teal-400">{skills.length} Skills</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
          <div className="text-[10px] uppercase font-bold text-slate-400">Mentor Verified</div>
          <div className="text-xl font-black text-emerald-400">
            {skills.filter(s => s.teacher_verified).length} Badges
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
          <div className="text-[10px] uppercase font-bold text-slate-400">Avg Self Level</div>
          <div className="text-xl font-black text-amber-400">
            {skills.length > 0 ? (skills.reduce((acc, s) => acc + s.self_level, 0) / skills.length).toFixed(1) : 0} / 5
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
          <div className="text-[10px] uppercase font-bold text-slate-400">Quiz Exam Avg</div>
          <div className="text-xl font-black text-indigo-400">
            {skills.filter(s => s.assessment_score !== null).length > 0
              ? Math.round(skills.filter(s => s.assessment_score !== null).reduce((acc, s) => acc + (s.assessment_score || 0), 0) / skills.filter(s => s.assessment_score !== null).length)
              : 0}%
          </div>
        </div>
      </div>

      {/* Categories Matrix Grid */}
      <div className="space-y-6">
        {categories.map(cat => {
          const categorySkills = skills.filter(s => s.category === cat.name || s.category.includes(cat.name.split(' ')[0]));
          if (categorySkills.length === 0) return null;

          return (
            <Card key={cat.id} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{cat.description}</p>
                </div>
                <Badge variant="info">{categorySkills.length} Skills</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categorySkills.map(sk => (
                  <div
                    key={sk.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{sk.skill_name}</span>
                      
                      <div className="flex items-center gap-2">
                        {sk.teacher_verified ? (
                          <Badge variant="success" size="sm">
                            <ShieldCheck className="w-3 h-3 mr-1 inline" /> Verified
                          </Badge>
                        ) : (
                          <Badge variant="neutral" size="sm">Self-Reported</Badge>
                        )}

                        {(role === 'teacher' || role === 'admin') && (
                          <button
                            onClick={() => handleToggleTeacherVerify(sk.id)}
                            className="text-[10px] font-bold px-2 py-1 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                          >
                            {sk.teacher_verified ? 'Unverify' : 'Verify Skill'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Self-Assessed Level:</span>
                        <span className="font-bold text-teal-500">Level {sk.self_level} / 5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => handleSelfLevelChange(sk.id, star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-4 h-4 transition ${
                                star <= sk.self_level
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <Modal
          isOpen={showAddSkillModal}
          onClose={() => setShowAddSkillModal(false)}
          title="Add Custom Skill to Matrix"
        >
          <form onSubmit={handleAddCustomSkill} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Skill Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. GraphQL, Docker, Rust, Kafka"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Skill Category</label>
              <select
                value={newSkillCategory}
                onChange={e => setNewSkillCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              >
                {appConfig.skillCategories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-lg"
            >
              Add Skill to Matrix
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
