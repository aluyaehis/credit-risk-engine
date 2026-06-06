import React from 'react';
import { Sliders, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';

export interface EngineRules {
  minCreditScore: number;
  maxDtiRatio: number;
  enableDtiCheck: boolean;
}

interface RuleConfigPanelProps {
  rules: EngineRules;
  onChange: (updatedRules: EngineRules) => void;
}

export const RuleConfigPanel: React.FC<RuleConfigPanelProps> = ({ rules, onChange }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 mb-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
        <Sliders className="w-4 h-4 text-brand-accent" />
        <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">
          Risk Engine Parameter Console
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 block">
            Minimum Credit Score Floor
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={rules.minCreditScore}
              onChange={(e) => onChange({ ...rules, minCreditScore: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-brand-dark focus:outline-hidden focus:border-brand-accent focus:bg-white transition-all"
              min="300"
              max="850"
            />
          </div>
          <p className="text-[10px] text-slate-400">Applications below this value trigger automated rejections.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 block">
            Max Allowed DTI Ratio (%)
          </label>
          <input
            type="number"
            value={rules.maxDtiRatio}
            disabled={!rules.enableDtiCheck}
            onChange={(e) => onChange({ ...rules, maxDtiRatio: Number(e.target.value) })}
            className={`w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-brand-dark focus:outline-hidden focus:border-brand-accent focus:bg-white transition-all ${
              !rules.enableDtiCheck ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            min="0"
            max="100"
          />
          <p className="text-[10px] text-slate-400">Ratios exceeding this value route to manual review lanes.</p>
        </div>

        <div className="flex flex-col justify-between space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 block">
            DTI Evaluation Layer
          </label>
          <button
            onClick={() => onChange({ ...rules, enableDtiCheck: !rules.enableDtiCheck })}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              rules.enableDtiCheck
                ? 'bg-emerald-50/50 border-emerald-200 text-finance-green'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{rules.enableDtiCheck ? 'LAYER ACTIVE' : 'LAYER BYPASSED'}</span>
            </div>
            {rules.enableDtiCheck ? (
              <ToggleRight className="w-6 h-6 text-finance-green" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-slate-400" />
            )}
          </button>
          <p className="text-[10px] text-slate-400">Completely enables or skips asset leverage audits.</p>
        </div>

      </div>
    </div>
  );
};