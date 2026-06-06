import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanApplication } from '../../types/underwriting.ts';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface ApplicationModalProps {
  application: LoanApplication | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: 'auto_approved' | 'auto_rejected', resolutionReason?: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ application, onClose, onUpdateStatus }) => {
  if (!application) return null;

  const { applicant, status, automatedReasons, id } = application;

  const dtiColor = applicant.debtToIncomeRatio <= 35 ? 'text-finance-green' : 'text-finance-amber';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10 flex flex-col"
        >
          {/* Header Panel */}
          <div className="bg-brand-dark text-white p-6 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono tracking-wider text-slate-400">{id}</span>
              <h3 className="text-xl font-bold tracking-tight">{applicant.fullName}</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xl p-1"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {automatedReasons && automatedReasons.length > 0 && (
              <div className={`p-4 rounded-xl border ${
                status === 'auto_rejected' 
                  ? 'bg-red-50/50 border-red-200 text-finance-red' 
                  : 'bg-amber-50/50 border-amber-200 text-finance-amber'
              }`}>
                <div className="flex gap-2 items-start mb-2">
                  {status === 'auto_rejected' ? (
                    <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider font-mono">
                      Systemic Flag Tracker
                    </h5>
                    <p className="text-xs opacity-80 mt-0.5">
                      Underwriting state audit observations:
                    </p>
                  </div>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs font-medium text-slate-700">
                  {automatedReasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Monthly Income</span>
                <p className="text-lg font-bold text-brand-dark mt-1">₦{applicant.monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Requested Capital</span>
                <p className="text-lg font-bold text-brand-dark mt-1">₦{applicant.requestedAmount.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Engine Risk Audit</h4>
              <div className="border border-slate-200/60 rounded-xl divide-y divide-slate-100">
                
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">Bureau Credit Score</p>
                    <p className="text-xs text-slate-400">System requirement verified threshold score</p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-md bg-slate-50 border border-slate-100 ${applicant.creditScore >= 600 ? 'text-finance-green' : 'text-finance-red'}`}>
                    {applicant.creditScore}
                  </span>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">Debt-to-Income Ratio (DTI)</p>
                    <p className="text-xs text-slate-400">System assessment of asset leverage</p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-md bg-slate-50 border border-slate-100 ${dtiColor}`}>
                    {applicant.debtToIncomeRatio}%
                  </span>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">Employment Classification</p>
                    <p className="text-xs text-slate-400">Verified revenue cash flow structure</p>
                  </div>
                  <span className="text-xs font-semibold uppercase px-2 py-1 rounded-md bg-slate-100 text-slate-700">
                    {applicant.employmentStatus.replace('_', ' ')}
                  </span>
                </div>

              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-slate-400">Automation Engine State</span>
                <p className="text-sm font-bold text-brand-dark mt-0.5 uppercase tracking-wide">
                  {status.replace('_', ' ')}
                </p>
              </div>

              {status === 'manual_review' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateStatus(id, 'auto_rejected', 'Manually rejected by Credit Risk Officer.')}
                    className="px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold bg-red-50 text-finance-red hover:bg-red-100/70 transition-all cursor-pointer"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={() => onUpdateStatus(id, 'auto_approved', 'Manually approved by Credit Risk Officer after asset verification.')}
                    className="px-3 py-1.5 rounded-lg bg-finance-green text-white text-xs font-semibold hover:bg-finance-green/90 shadow-xs transition-all cursor-pointer"
                  >
                    Approve Application
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 font-medium uppercase">
                    Execution Concluded
                  </span>
                  <div className={`w-3 h-3 rounded-full ${
                    status === 'auto_approved' 
                      ? 'bg-finance-green' 
                      : 'bg-finance-red'
                  } animate-pulse`} />
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};