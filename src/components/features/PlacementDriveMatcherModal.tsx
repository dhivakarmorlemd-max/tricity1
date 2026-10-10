import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { dataService } from '../../services/api/dataService';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Building2, CheckCircle2, XCircle, Calendar, DollarSign, Send, Search, Filter, ShieldCheck } from 'lucide-react';

interface PlacementDriveMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyDrive {
  id: string;
  company: string;
  logo: string;
  role: string;
  package: string;
  location: string;
  driveDate: string;
  minCgpa: number;
  minReadinessScore: number;
  eligibleBranches: string[];
  requiredSkills: string[];
}

const mockDrives: CompanyDrive[] = [
  {
    id: 'drive_google',
    company: 'Google',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=120',
    role: 'Software Development Engineer (SDE-1)',
    package: '₹24 - ₹32 LPA',
    location: 'Bengaluru / Hyderabad',
    driveDate: '2026-11-15',
    minCgpa: 8.0,
    minReadinessScore: 80,
    eligibleBranches: ['cse', 'ece', 'it'],
    requiredSkills: ['Data Structures & Algorithms', 'C++', 'System Design', 'Git & GitHub']
  },
  {
    id: 'drive_tcs_digital',
    company: 'TCS Digital',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    role: 'Digital Software Developer',
    package: '₹7.0 - ₹9.0 LPA',
    location: 'Pan-India',
    driveDate: '2026-10-28',
    minCgpa: 7.0,
    minReadinessScore: 65,
    eligibleBranches: ['cse', 'ece', 'me', 'ee', 'ce', 'it'],
    requiredSkills: ['Data Structures & Algorithms', 'Java/Python', 'SQL & Databases']
  },
  {
    id: 'drive_microsoft',
    company: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1642132652075-2b87222c1dd9?auto=format&fit=crop&q=80&w=120',
    role: 'Software Engineer',
    package: '₹22 - ₹28 LPA',
    location: 'Noida / Hyderabad',
    driveDate: '2026-11-20',
    minCgpa: 8.0,
    minReadinessScore: 78,
    eligibleBranches: ['cse', 'ece', 'it'],
    requiredSkills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Web Technologies']
  },
  {
    id: 'drive_razorpay',
    company: 'Razorpay',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67e06a382d?auto=format&fit=crop&q=80&w=120',
    role: 'Frontend Engineer (React/TS)',
    package: '₹14 - ₹18 LPA',
    location: 'Bengaluru (Hybrid)',
    driveDate: '2026-11-05',
    minCgpa: 7.5,
    minReadinessScore: 72,
    eligibleBranches: ['cse', 'it', 'ece'],
    requiredSkills: ['React & Web Dev', 'JavaScript / TypeScript', 'Web Technologies']
  },
  {
    id: 'drive_zomato',
    company: 'Zomato',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=120',
    role: 'Full Stack Web Developer',
    package: '₹16 - ₹20 LPA',
    location: 'Gurugram',
    driveDate: '2026-11-08',
    minCgpa: 7.0,
    minReadinessScore: 70,
    eligibleBranches: ['cse', 'it', 'ece'],
    requiredSkills: ['React & Web Dev', 'Node.js & Express', 'SQL & Databases']
  }
];

export const PlacementDriveMatcherModal: React.FC<PlacementDriveMatcherModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEligibleOnly, setFilterEligibleOnly] = useState(false);

  const existingApps = dataService.getJobApplications();

  const checkEligibility = (drive: CompanyDrive) => {
    const isBranchEligible = drive.eligibleBranches.includes(studentProfile.branch.toLowerCase());
    const isScoreEligible = studentProfile.placement_readiness_score >= drive.minReadinessScore;
    const isCgpaEligible = 8.2 >= drive.minCgpa; // Default demo student CGPA is 8.2

    return {
      eligible: isBranchEligible && isScoreEligible && isCgpaEligible,
      isBranchEligible,
      isScoreEligible,
      isCgpaEligible
    };
  };

  const handleApply = (drive: CompanyDrive) => {
    dataService.addJobApplication({
      company_name: drive.company,
      role_title: drive.role,
      type: 'Full-time',
      status: 'Applied',
      location: drive.location,
      stipend_or_salary: drive.package,
      deadline: drive.driveDate,
      application_date: new Date().toISOString().split('T')[0],
      notes: `Applied via CareerPilot Placement Drive Matrix. Required readiness: ${drive.minReadinessScore}%, Student readiness: ${studentProfile.placement_readiness_score}%.`
    });

    dataService.createHelpRequest(
      `Placement Drive Application: ${drive.company}`,
      `Registered for upcoming campus drive ${drive.company} (${drive.role}). Verified readiness score: ${studentProfile.placement_readiness_score}%.`
    );
  };

  const filteredDrives = mockDrives.filter(d => {
    const matchesSearch = d.company.toLowerCase().includes(searchQuery.toLowerCase()) || d.role.toLowerCase().includes(searchQuery.toLowerCase());
    const { eligible } = checkEligibility(d);
    if (filterEligibleOnly && !eligible) return false;
    return matchesSearch;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Company Placement Drive & Eligibility Matrix" maxWidth="xl">
      <div className="space-y-5">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-navy-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-between">
            <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={filterEligibleOnly}
                onChange={e => setFilterEligibleOnly(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              Show 100% Eligible Drives Only
            </label>

            <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20">
              Student Readiness: {studentProfile.placement_readiness_score}%
            </span>
          </div>
        </div>

        {/* Drives List */}
        <div className="space-y-3">
          {filteredDrives.map(drive => {
            const eligibility = checkEligibility(drive);
            const alreadyApplied = existingApps.some(a => a.company_name.toLowerCase() === drive.company.toLowerCase());

            return (
              <div
                key={drive.id}
                className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Left: Company & Role */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white text-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                    <Building2 className="w-6 h-6 text-teal-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{drive.company}</h4>
                      {eligibility.eligible ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Eligible
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <XCircle className="w-3 h-3" /> Gaps Found
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">{drive.role}</p>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-500" /> {drive.package}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-400" /> Drive: {drive.driveDate}
                      </span>
                      <span>📍 {drive.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Requirements breakdown & One-click Apply */}
                <div className="flex flex-col items-end gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-right space-y-0.5">
                    <div className={eligibility.isScoreEligible ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-rose-500 font-medium'}>
                      Min Readiness Score: {drive.minReadinessScore}% {eligibility.isScoreEligible ? '✓' : '(Your score: ' + studentProfile.placement_readiness_score + '%)'}
                    </div>
                    <div className={eligibility.isBranchEligible ? 'text-slate-600 dark:text-slate-400' : 'text-rose-500'}>
                      Branches: {drive.eligibleBranches.join(', ').toUpperCase()}
                    </div>
                  </div>

                  {alreadyApplied ? (
                    <button
                      disabled
                      className="w-full md:w-auto px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-teal-500" /> Applied & Tracked
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(drive)}
                      disabled={!eligibility.eligible}
                      className={`w-full md:w-auto px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow ${
                        eligibility.eligible
                          ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white hover:opacity-95'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" /> 1-Click Apply
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
