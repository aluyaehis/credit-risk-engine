import React from 'react';
import { LoanApplication } from '../../types/underwriting.ts';
import { DollarSign, Files, Cpu, Activity } from 'lucide-react';

interface PipelineMetricsProps {
  applications: LoanApplication[];
}

export const PipelineMetrics: React.FC<PipelineMetricsProps> = ({ applications }) => {
  const totalApplications = applications.length;
  
  const totalVolume = applications.reduce((sum, app) => sum + app.applicant.requestedAmount, 0);
  
  const autoApprovedCount = applications.filter(app => app.status === 'auto_approved').length;
  const processingCount = applications.filter(app => app.status === 'processing').length;
  
  const approvalRate = totalApplications > 0 
    ? Math.round((autoApprovedCount / totalApplications) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pipeline Exposure</span>
          <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-500">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-brand-dark">
            ₦{totalVolume.toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">Total active capital under evaluation</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Applications</span>
          <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-500">
            <Files className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-brand-dark">{totalApplications}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">Active files inside pipeline lanes</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Automation Yield</span>
          <div className={`p-1.5 border rounded-lg transition-colors ${
            approvalRate > 0 
              ? 'bg-emerald-50 border-emerald-100 text-finance-green' 
              : 'bg-slate-50 border-slate-100 text-slate-500'
          }`}>
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className={`text-2xl font-bold tracking-tight transition-colors ${
            approvalRate > 0 ? 'text-finance-green' : 'text-brand-dark'
          }`}>{approvalRate}%</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">Percentage of instantly approved clear capital</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In-Flight Processing</span>
          <div className={`p-1.5 border rounded-lg ${
            processingCount > 0 
              ? 'bg-amber-50 border-amber-100 text-finance-amber' 
              : 'bg-slate-50 border-slate-100 text-slate-500'
          }`}>
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className={`text-2xl font-bold tracking-tight ${
            processingCount > 0 ? 'text-finance-amber' : 'text-brand-dark'
          }`}>{processingCount}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">Files running active risk iterations</p>
      </div>

    </div>
  );
};