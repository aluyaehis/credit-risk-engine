import React from 'react';
import { LoanApplication, ApplicationStage } from '../../types/underwriting.ts';
import { mockApplications } from '../../data/mockData';

const STAGES: { id: ApplicationStage; label: string }[] = [
  { id: 'verification', label: '1. KYC & Verification' },
  { id: 'credit_check', label: '2. Credit Check' },
  { id: 'risk_assessment', label: '3. Risk Assessment' },
  { id: 'decision', label: '4. Final Decision' },
];

export const PipelineBoard: React.FC = () => {
  const [applications] = React.useState<LoanApplication[]>(mockApplications);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-brand-dark">Automated Underwriting Pipeline</h2>
        <p className="text-sm text-slate-500">Monitor real-time automated credit risk evaluations.</p>
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
                    <div 
                      key={app.id} 
                      className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:border-brand-accent transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400">{app.id}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-finance-amber border border-amber-200 uppercase tracking-wider">
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
                          <span className={`font-bold ${app.applicant.creditScore >= 600 ? 'text-finance-green' : 'text-finance-red'}`}>
                            {app.applicant.creditScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};