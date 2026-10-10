import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Building2, CheckCircle2, Globe, ShieldCheck, Palette, GraduationCap, RefreshCw, Sliders } from 'lucide-react';

interface CampusTenantSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CampusTenant {
  id: string;
  name: string;
  code: string;
  grade: string;
  color: string;
  themeClass: string;
  studentCount: number;
  placementsPct: number;
  avgCtc: string;
  logoBadge: string;
}

const campusTenants: CampusTenant[] = [
  {
    id: 'cu',
    name: 'Chandigarh University',
    code: 'CU-MAIN',
    grade: 'NAAC A++',
    color: '#0d9488',
    themeClass: 'from-teal-600 to-indigo-600',
    studentCount: 14500,
    placementsPct: 92.4,
    avgCtc: '₹18.4 LPA',
    logoBadge: '🏛️ CU'
  },
  {
    id: 'iitb',
    name: 'IIT Bombay',
    code: 'IITB-CS',
    grade: 'Institute of Eminence',
    color: '#4f46e5',
    themeClass: 'from-indigo-600 to-purple-600',
    studentCount: 8200,
    placementsPct: 98.1,
    avgCtc: '₹24.5 LPA',
    logoBadge: '🎓 IITB'
  },
  {
    id: 'bits',
    name: 'BITS Pilani',
    code: 'BITS-PILANI',
    grade: 'Tier-1 Deemed',
    color: '#0284c7',
    themeClass: 'from-sky-600 to-blue-600',
    studentCount: 9500,
    placementsPct: 95.8,
    avgCtc: '₹21.8 LPA',
    logoBadge: '⚡ BITS'
  },
  {
    id: 'dtu',
    name: 'Delhi Technological University',
    code: 'DTU-DELHI',
    grade: 'NAAC A+',
    color: '#e11d48',
    themeClass: 'from-rose-600 to-amber-600',
    studentCount: 11000,
    placementsPct: 91.2,
    avgCtc: '₹17.9 LPA',
    logoBadge: '🔬 DTU'
  }
];

export const CampusTenantSwitcherModal: React.FC<CampusTenantSwitcherModalProps> = ({ isOpen, onClose }) => {
  const [activeTenant, setActiveTenant] = useState<CampusTenant>(campusTenants[0]);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [switchSuccess, setSwitchSuccess] = useState<string | null>(null);

  const handleSelectTenant = (tenant: CampusTenant) => {
    setIsSwitching(true);
    setSwitchSuccess(null);

    setTimeout(() => {
      setActiveTenant(tenant);
      setIsSwitching(false);
      setSwitchSuccess(`Successfully switched active institution tenant to ${tenant.name} (${tenant.code}). Dashboard branding updated!`);
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Multi-Tenant Campus Institution & White-Label Configurator" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-teal-600/10 via-indigo-600/10 to-purple-600/10 dark:from-teal-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Multi-Tenant Campus Architecture</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Switch university tenant contexts to isolate student databases, white-label branding, and academic grading schemas.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Multi-Tenant Active
          </Badge>
        </div>

        {/* Campus Tenants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {campusTenants.map(tenant => {
            const isSelected = activeTenant.id === tenant.id;

            return (
              <div
                key={tenant.id}
                onClick={() => handleSelectTenant(tenant)}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 shadow-md'
                    : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold">{tenant.logoBadge}</span>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-xs">{tenant.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">{tenant.code}</span>
                    </div>
                  </div>

                  <Badge variant={isSelected ? 'success' : 'neutral'}>
                    {isSelected ? 'Active Tenant' : tenant.grade}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800 text-[10px]">
                  <div>
                    <span className="text-slate-400 block">Students</span>
                    <strong className="text-slate-800 dark:text-slate-200">{tenant.studentCount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Placement %</span>
                    <strong className="text-teal-600 dark:text-teal-400">{tenant.placementsPct}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Avg Package</span>
                    <strong className="text-indigo-600 dark:text-indigo-400">{tenant.avgCtc}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Switch Feedback */}
        {isSwitching && (
          <div className="p-3 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Updating multi-tenant database & branding schemas...
          </div>
        )}

        {switchSuccess && (
          <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500" /> {switchSuccess}
          </div>
        )}
      </div>
    </Modal>
  );
};
