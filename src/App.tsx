// src/App.tsx
import { PipelineBoard } from './components/pipeline/PipelineBoard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Banking Header Navigation Bar */}
      <header className="bg-brand-dark text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center font-black text-white tracking-tighter">
            Æ
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">ApexRisk Engine</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Automated Credit Core v1.0</p>
          </div>
        </div>
        <div className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-md font-mono">
          System Status: Operational
        </div>
      </header>

      {/* Main Board Viewport Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto">
        <PipelineBoard />
      </main>
    </div>
  );
}

export default App;