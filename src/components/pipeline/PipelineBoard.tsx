import React from 'react';
import { motion } from 'framer-motion';
import { LoanApplication, ApplicationStage } from '../../types/underwriting.ts';
import { mockApplications } from '../../data/mockData.ts';
import { ApplicationModal } from './ApplicationModal.tsx';

const STAGES: { id: ApplicationStage; label: string }[] = [
  { id: 'verification', label: '1. KYC & Verification' },
  { id: 'credit_check', label: '2. Credit Check' },
  { id: 'risk_assessment', label: '3. Risk Assessment' },
  { id: 'decision', label: '4. Final Decision' },
];

export const PipelineBoard: React.FC = () => {
  const [applications, setApplications] = React.useState<LoanApplication[]>(mockApplications);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState<LoanApplication | null>(null);

  const runAutomationEngine = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setApplications((prev) =>
      prev.map((app) => (app.id === 'APP-2026-001' ? { ...app, stage: 'credit_check' } : app))
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setApplications((prev) =>
      prev.map((app) => (app.id === 'APP-2026-001' ? { ...app, stage: 'risk_assessment' } : app))
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setApplications((prev) =>
      prev.map((app) =>
        app.id === 'APP-2026-001'
          ? { ...app, stage: 'decision', status: 'auto_approved' }
          : app
      )
    );

    setIsProcessing(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-dark">Automated Underwriting Pipeline</h2>
          <p className="text-sm text-slate-500">Monitor real-time automated credit risk evaluations.</p>
        </div>
        <button
          onClick={runAutomationEngine}
          disabled={isProcessing}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm shadow-xs transition-all cursor-pointer ${
            isProcessing
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-brand-accent text-white hover:bg-brand-accent/90'
          }`}
        >
          {isProcessing ? 'Engine Executing Processes...' : 'Run Underwriting Engine'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {STAGES.map((stage) => {
          const stageApps = applications.filter((app) => app.stage === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-slate-100/80 rounded-xl p-4 border border-slate-200/60 min-h-[500px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                <span className="font-semibold text-sm text-brand-dark">{stage.label}</span>
                <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageApps.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-8 border border-dashed border-slate-300 rounded-lg">
                    No applications in queue
                  </div>
                ) : (
                  stageApps.map((app) => (
                    /* MODIFICATION 1: Added onClick={() => setSelectedApp(app)} right here */
                    <motion.div
                      key={app.id}
                      layoutId={app.id}
                      onClick={() => setSelectedApp(app)}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:border-brand-accent transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400">{app.id}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                            app.status === 'auto_approved'
                              ? 'bg-emerald-50 text-finance-green border-emerald-200'
                              : 'bg-amber-50 text-finance-amber border-amber-200'
                          }`}
                        >
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-brand-dark">{app.applicant.fullName}</h4>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Requested:</span>
                          <span className="font-medium text-brand-dark">
                            ₦{app.applicant.requestedAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Score:</span>
                          <span className="font-bold text-finance-green">
                            {app.applicant.creditScore}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODIFICATION 2: Added the physical Modal component injection at the base right here */}
      <ApplicationModal 
        application={selectedApp} 
        onClose={() => setSelectedApp(null)} 
      />
    </div>
  );
};