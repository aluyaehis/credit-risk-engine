// src/components/pipeline/ApplicationModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanApplication } from '../../types/underwriting.ts';

interface ApplicationModalProps {
  application: LoanApplication | null;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ application, onClose }) => {
  if (!application) return null;

  const { applicant, status, riskScore, id } = application;

  // Calculate debt-to-income health color indicator
  const dtiColor = applicant.debtToIncomeRatio <= 35 ? 'text-finance-green' : 'text-finance-amber';

  return (
    /* AnimatePresence allows components to animate out smoothly when removed from the DOM */
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop overlay fade-in background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* The Modal Container Window Sheet */}
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

          {/* Audit Metrics Breakdown Body */}
          <div className="p-6 space-y-6">
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

            {/* Core Automation Audit Rules Section */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Engine Risk Audit</h4>
              <div className="border border-slate-200/60 rounded-xl divide-y divide-slate-100">
                
                {/* Metric Line 1: Credit Score */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">Bureau Credit Score</p>
                    <p className="text-xs text-slate-400">System requirement: Min 600 score threshold</p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-md bg-slate-50 border border-slate-100 ${applicant.creditScore >= 600 ? 'text-finance-green' : 'text-finance-red'}`}>
                    {applicant.creditScore}
                  </span>
                </div>

                {/* Metric Line 2: Debt to Income */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">Debt-to-Income Ratio (DTI)</p>
                    <p className="text-xs text-slate-400">System warning: Flags above 45% debt loads</p>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-md bg-slate-50 border border-slate-100 ${dtiColor}`}>
                    {applicant.debtToIncomeRatio}%
                  </span>
                </div>

                {/* Metric Line 3: Employment status */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">Employment Classification</p>
                    <p className="text-xs text-slate-400">Verified primary revenue structure</p>
                  </div>
                  <span className="text-xs font-semibold uppercase px-2 py-1 rounded-md bg-slate-100 text-slate-700">
                    {applicant.employmentStatus.replace('_', ' ')}
                  </span>
                </div>

              </div>
            </div>

            {/* Final Execution Decision Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400">Automation Engine State</span>
                <p className="text-sm font-bold text-brand-dark mt-0.5 uppercase tracking-wide">
                  {status.replace('_', ' ')}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${status === 'auto_approved' ? 'bg-finance-green animate-pulse' : 'bg-finance-amber animate-pulse-slow'}`} />
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};