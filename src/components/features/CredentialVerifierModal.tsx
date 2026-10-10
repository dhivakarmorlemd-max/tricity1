import React from 'react';
import { useAuth } from '../../providers/AuthContext';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { ShieldCheck, Award, Printer, Sparkles, CheckCircle2, QrCode } from 'lucide-react';

interface CredentialVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CredentialVerifierModal: React.FC<CredentialVerifierModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);
  const certId = `CP-CERT-2026-${user.id.toUpperCase()}`;

  const handlePrintCert = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official Career Readiness Digital Credential" maxWidth="lg">
      <div className="space-y-5">
        {/* Certificate Card */}
        <div
          id="cert-print-area"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 text-white border-2 border-amber-500/30 shadow-2xl relative overflow-hidden space-y-6"
        >
          {/* Decorative watermark */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/5 blur-2xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">{appConfig.name}</h3>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">Official Verification Credential</span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
              ID: {certId}
            </span>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-3 py-2">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">This is to certify that</span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">{user.full_name}</h2>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              has successfully completed all required year-wise technical milestones, verified capstone projects, and placement assessments for the job track:
            </p>

            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold">
              {targetRole?.title || 'Software Development Engineer'}
            </div>
          </div>

          {/* Verified Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs border-y border-slate-800 py-4">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Readiness Score</span>
              <span className="text-lg font-black text-emerald-400">{studentProfile.placement_readiness_score}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Academic Branch</span>
              <span className="text-lg font-black text-teal-400">{studentProfile.branch.toUpperCase()}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block font-medium">Verification Status</span>
              <span className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Authenticated
              </span>
            </div>
          </div>

          {/* Footer Seals */}
          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
            <div>
              <span className="block font-bold text-white">Dr. Vikram Sethi</span>
              <span className="text-[10px]">Head of Department & Placement Board</span>
            </div>

            <div className="flex items-center gap-2">
              <QrCode className="w-10 h-10 text-amber-400/80" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={handlePrintCert}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:opacity-95 text-white font-bold transition flex items-center gap-2 shadow"
          >
            <Printer className="w-4 h-4" /> Print / Save Verification PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};
