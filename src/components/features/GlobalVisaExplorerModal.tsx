import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Globe, DollarSign, Building2, CheckCircle2, ShieldCheck, ExternalLink, Compass } from 'lucide-react';

interface GlobalVisaExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CountryVisaOption {
  id: string;
  country: string;
  flag: string;
  visaType: string;
  avgSalary: string;
  costOfLiving: string;
  keySponsors: string[];
  eligibility: string;
  requirements: string[];
}

const visaData: CountryVisaOption[] = [
  {
    id: 'us',
    country: 'United States',
    flag: '🇺🇸',
    visaType: 'H-1B / STEM OPT Extension',
    avgSalary: '$125,000 - $185,000 / yr',
    costOfLiving: 'High',
    keySponsors: ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft'],
    eligibility: 'High (B.Tech Degree + STEM OPT 3-yr work authorization)',
    requirements: ['Accredited B.Tech CS Degree', 'Employer Sponsorship Lottery', 'L-1 Intra-company Transfer Fallback']
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    visaType: 'High Potential Individual (HPI) / Skilled Worker',
    avgSalary: '£65,000 - £95,000 / yr',
    costOfLiving: 'Moderate - High',
    keySponsors: ['DeepMind', 'Bloomberg', 'Revolut', 'Arm', 'Monzo'],
    eligibility: 'Eligible (2-Year Unsponsored Work Visa for Top Universities)',
    requirements: ['Points-Based Immigration System', 'Minimum £38,700 Threshold', 'English Proficiency Exemption']
  },
  {
    id: 'de',
    country: 'Germany / European Union',
    flag: '🇩🇪',
    visaType: 'EU Blue Card / Opportunity Card (Chancenkarte)',
    avgSalary: '€70,000 - €105,000 / yr',
    costOfLiving: 'Moderate',
    keySponsors: ['SAP', 'Zalando', 'Delivery Hero', 'BMW Tech', 'Siemens'],
    eligibility: 'High (Fast-Track Permanent Residence in 21 Months)',
    requirements: ['Recognized University Degree', 'Minimum €45,300 IT Salary Threshold', 'No Priority Test Required']
  },
  {
    id: 'ca',
    country: 'Canada',
    flag: '🇨🇦',
    visaType: 'Global Talent Stream / Express Entry (Category-Based)',
    avgSalary: 'CA$95,000 - CA$140,000 / yr',
    costOfLiving: 'Moderate',
    keySponsors: ['Shopify', 'OpenText', 'Royal Bank of Canada', 'AWS Canada'],
    eligibility: 'High (2-Week Expedited Tech Visa Processing)',
    requirements: ['Comprehensive Ranking System (CRS) Points', 'STEM Draw Targeted Priority', 'PR Pathway in 12 Months']
  }
];

export const GlobalVisaExplorerModal: React.FC<GlobalVisaExplorerModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<CountryVisaOption>(visaData[0]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Career Relocation & Tech Visa Sponsorship Explorer" maxWidth="xl">
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-3.5 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-indigo-600/10 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-indigo-900/30 rounded-xl border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">International Tech Mobility Matrix</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Explore global software engineering work visas, salary benchmarks, and tier-1 sponsoring employers.
              </p>
            </div>
          </div>
          <Badge variant="success">
            Global Hub Active
          </Badge>
        </div>

        {/* Country Picker Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {visaData.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCountry(c)}
              className={`p-2.5 rounded-xl text-left transition border ${
                selectedCountry.id === c.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-slate-900 dark:text-white font-bold'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
              }`}
            >
              <div className="text-sm mb-0.5">{c.flag}</div>
              <p className="text-[11px] font-bold">{c.country}</p>
              <p className="text-[9px] text-slate-400 truncate">{c.visaType}</p>
            </button>
          ))}
        </div>

        {/* Selected Country Details Card */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-4 border border-slate-800">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedCountry.flag}</span>
                <h4 className="font-extrabold text-sm text-white">{selectedCountry.country}</h4>
                <Badge variant="info">{selectedCountry.visaType}</Badge>
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                Avg SDE Package: {selectedCountry.avgSalary}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Cost of Living</span>
              <span className="font-bold text-xs text-amber-400">{selectedCountry.costOfLiving}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> University Candidate Eligibility
              </h5>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-emerald-300 font-medium">
                {selectedCountry.eligibility}
              </div>

              <h6 className="font-bold text-[11px] text-slate-300 pt-1">Key Visa Prereqs:</h6>
              <ul className="space-y-1 text-[11px] text-slate-400">
                {selectedCountry.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" /> Top Sponsoring Employers
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedCountry.keySponsors.map((sp, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-bold text-[10px] border border-slate-700">
                    🏢 {sp}
                  </span>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-[10px] text-indigo-300 mt-2">
                <strong>CareerPilot Strategy: </strong> Match your verified readiness score ({studentProfile.placement_readiness_score}%) with multinational companies providing internal intra-company transfer options.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
