import React, { useState } from 'react';
import { 
  Network, 
  Link as LinkIcon, 
  ShieldAlert, 
  CheckCircle, 
  Database,
  Cpu,
  Layers,
  RefreshCw,
  Download
} from 'lucide-react';
import * as fileSaver from 'file-saver';
const saveAs = (fileSaver as any).saveAs || (fileSaver as any).default || fileSaver;
import { HODGE_INTEGRATION_CODE } from '../lib/hodge_integration';
import { PRAGMATIC_INTEGRATION_CODE } from '../lib/pragmatic_integration';
import { translations, Language } from '../lib/translations';

// --- AAM-V1 CONSTANTS ---
const CONSTANTS = {
  PHI: 1.618034,
  ALYOSHA_GATE: 0.3678,
  SACRED_TDI_MAX: 0.15, // Hard threshold for Sacred Mode
  NORMAL_TDI_MAX: 0.45
};

const AVAILABLE_KERNELS = [
  { id: 'san', name: 'Sanskrit Kernel', type: 'Indo-Aryan', ci: 0.95 },
  { id: 'heb', name: 'Hebrew Kernel', type: 'Semitic', ci: 0.92 },
  { id: 'grc', name: 'Greek Kernel', type: 'Hellenic', ci: 0.88 },
  { id: 'chu', name: 'Old Slavonic', type: 'Slavic', ci: 0.85 },
  { id: 'lat', name: 'Latin Kernel', type: 'Italic', ci: 0.95 },
  { id: 'etr', name: 'Etruscan Kernel', type: 'Tyrsenian', ci: 0.99 }
];

interface Kernel {
  id: string;
  name: string;
  type: string;
  ci: number;
}

interface Fiber {
  source: string;
  target: string;
  tdi: number;
  resonance: number;
  status: 'STABLE' | 'BROKEN';
}

interface BlockStatus {
  avgTDI: string;
  score: string;
  isStable: boolean;
  thresholdUsed: number;
}

interface OrchestratorProps {
  lang: Language;
}

export default function Orchestrator({ lang }: OrchestratorProps) {
  const t = translations[lang];
  const [activeKernels, setActiveKernels] = useState<Kernel[]>([]);
  const [sacredMode, setSacredMode] = useState(false);
  const [isWeaving, setIsWeaving] = useState(false);
  const [blockStatus, setBlockStatus] = useState<BlockStatus | null>(null);
  const [fibers, setFibers] = useState<Fiber[]>([]);
  const [manualMode, setManualMode] = useState(false);
  const [manualTdiThreshold, setManualTdiThreshold] = useState(0.4);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);

  const toggleKernel = (kernel: Kernel) => {
    if (activeKernels.find(k => k.id === kernel.id)) {
      setActiveKernels(activeKernels.filter(k => k.id !== kernel.id));
      setBlockStatus(null);
      setFibers([]);
      setAnalysisLogs([]);
    } else {
      if (activeKernels.length < 5) { // Increased limit for manual mode
        setActiveKernels([...activeKernels, kernel]);
        setBlockStatus(null);
        setFibers([]);
        setAnalysisLogs([]);
      }
    }
  };

  const calculateCompatibility = () => {
    setIsWeaving(true);
    setBlockStatus(null);
    setFibers([]);
    setAnalysisLogs([]);

    setTimeout(() => {
      if (activeKernels.length < 2) {
        setIsWeaving(false);
        return;
      }

      const newFibers: Fiber[] = [];
      let totalTDI = 0;
      let totalResonance = 0;
      const newLogs: string[] = [];

      // Check for Slavic + Sanskrit connection
      const hasSlavic = activeKernels.some(k => k.type === 'Slavic');
      const hasSanskrit = activeKernels.some(k => k.id === 'san');

      if (hasSlavic && hasSanskrit) {
        newLogs.push(t.logConnection + ": " + t.slavicGroup + " + " + t.languages.Sanskrit);
        newLogs.push(t.logHighInvariant);
        newLogs.push(t.logStructDiff);
      }

      // Simulate Bell Fiber connections (all-to-all)
      for (let i = 0; i < activeKernels.length; i++) {
        for (let j = i + 1; j < activeKernels.length; j++) {
          const k1 = activeKernels[i];
          const k2 = activeKernels[j];
          
          // Calculate TDI (Translation Drift)
          const drift = Math.abs(k1.ci - k2.ci) + (Math.random() * 0.2);
          const tdi = parseFloat(drift.toFixed(3));
          
          // Calculate Resonance
          const resonance = parseFloat((1 - tdi + (k1.ci * k2.ci * 0.5)).toFixed(3));

          totalTDI += tdi;
          totalResonance += resonance;

          const threshold = manualMode ? manualTdiThreshold : (sacredMode ? CONSTANTS.SACRED_TDI_MAX : CONSTANTS.NORMAL_TDI_MAX);

          newFibers.push({
            source: k1.name,
            target: k2.name,
            tdi: tdi,
            resonance: resonance,
            status: tdi > threshold ? 'BROKEN' : 'STABLE'
          });
        }
      }

      const avgTDI = totalTDI / newFibers.length;
      const tdiThreshold = manualMode ? manualTdiThreshold : (sacredMode ? CONSTANTS.SACRED_TDI_MAX : CONSTANTS.NORMAL_TDI_MAX);

      setFibers(newFibers);
      setAnalysisLogs(newLogs);
      setBlockStatus({
        avgTDI: avgTDI.toFixed(3),
        score: (totalResonance / newFibers.length * 100).toFixed(1),
        isStable: avgTDI <= tdiThreshold,
        thresholdUsed: tdiThreshold
      });
      setIsWeaving(false);
    }, 1500);
  };

  const handleDownloadSystem = () => {
    const blob = new Blob([HODGE_INTEGRATION_CODE], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'aam_v3_multi_kernel_hodge_bridge.py');
  };

  const handleDownloadPragmatic = () => {
    const blob = new Blob([PRAGMATIC_INTEGRATION_CODE], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'pragmatic_kernel_pipeline.py');
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900 p-6 rounded-lg border border-slate-800">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-indigo-600 p-3 rounded-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-slate-100">{t.orchestratorTitle}</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t.orchestratorSubtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownloadPragmatic}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            {lang === 'ru' ? 'Скачать систему (Pragmatic)' : 'Pragmatic System (.py)'}
          </button>

          <button
            onClick={handleDownloadSystem}
            className="flex items-center gap-2 px-3 py-2 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-300 text-xs font-medium rounded-lg border border-emerald-700/50 transition-colors"
          >
            <Download className="w-4 h-4" />
            {lang === 'ru' ? 'Скачать систему V2.1 (Sacred)' : 'Sacred System V2.1 (.py)'}
          </button>

          <div className="flex items-center gap-4 bg-slate-950 p-2 rounded border border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={sacredMode} 
                onChange={(e) => { setSacredMode(e.target.checked); setBlockStatus(null); setFibers([]); }}
                className="sr-only"
              />
              <div className={`w-10 h-5 rounded-full transition-colors ${sacredMode ? 'bg-amber-600' : 'bg-slate-700'} relative`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${sacredMode ? 'translate-x-5' : 'translate-x-1'}`}></div>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${sacredMode ? 'text-amber-500' : 'text-slate-500'}`}>
                {t.methods.S}
              </span>
            </label>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* MODULE GOAL */}
          <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-6">
            <h2 className="text-xs font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase">
              <ShieldAlert className="w-4 h-4" /> {t.moduleGoalTitle}
            </h2>
            <p className="text-[11px] text-amber-200/70 leading-relaxed">
              {t.moduleGoalText}
            </p>
          </div>

          {/* KERNEL REGISTRY */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase">
              <Database className="w-4 h-4" /> {t.registry}
            </h2>
            <div className="space-y-3">
              {AVAILABLE_KERNELS.map(kernel => {
                const isActive = activeKernels.find(k => k.id === kernel.id);
                return (
                  <button
                    key={kernel.id}
                    onClick={() => toggleKernel(kernel)}
                    className={`w-full text-left p-3 rounded border transition-all flex justify-between items-center ${
                      isActive 
                        ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold">{kernel.name}</p>
                      <p className="text-[10px] opacity-70 uppercase">{kernel.type} | CI: {kernel.ci}</p>
                    </div>
                    {isActive && <CheckCircle className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase">
              <Layers className="w-4 h-4" /> {t.howItWorks}
            </h2>
            <ul className="space-y-3 text-[11px] text-slate-400">
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">1.</span>
                <span>
                  <strong className="text-slate-300">{t.hiw1.split(':')[0]}:</strong> {t.hiw1.split(':')[1]}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">2.</span>
                <span>
                  <strong className="text-slate-300">{t.hiw2.split(':')[0]}:</strong> {t.hiw2.split(':')[1]}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">3.</span>
                <span>
                  <strong className="text-slate-300">{t.hiw3.split(':')[0]}:</strong> {t.hiw3.split(':')[1]}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">4.</span>
                <span>
                  <strong className="text-slate-300">{t.hiw4.split(':')[0]}:</strong> {t.hiw4.split(':')[1]}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BLOCK BUILDER CANVAS */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase">
              <Layers className="w-4 h-4" /> {t.workspace}
            </h2>
            <div className="flex gap-2">
               <button
                onClick={() => setManualMode(!manualMode)}
                className={`px-3 py-2 rounded text-xs font-bold uppercase transition-all border ${
                  manualMode 
                    ? 'bg-amber-900/30 border-amber-600 text-amber-500' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {manualMode ? t.manualModeOn : t.manualAssembly}
              </button>
              <button
                onClick={calculateCompatibility}
                disabled={activeKernels.length < 2 || isWeaving}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-4 py-2 rounded text-xs font-bold uppercase transition-all flex items-center gap-2"
              >
                {isWeaving ? <RefreshCw className="w-3 h-3 animate-spin" /> : <LinkIcon className="w-3 h-3" />}
                {manualMode ? t.forceAssemble : t.calculate}
              </button>
            </div>
          </div>

          {manualMode && (
            <div className="mb-6 p-4 bg-amber-950/20 border border-amber-900/30 rounded-lg">
              <label className="block text-xs font-bold text-amber-500 mb-2 uppercase">
                {t.tdiThreshold}: {manualTdiThreshold}
              </label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05"
                value={manualTdiThreshold}
                onChange={(e) => setManualTdiThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="text-[10px] text-amber-400/70 mt-2">
                {t.tdiWarning}
              </p>
            </div>
          )}

          {/* Visualization of Kernels */}
          <div className="flex-1 min-h-[250px] border-2 border-dashed border-slate-800 rounded-lg p-6 flex items-center justify-center relative">
            {activeKernels.length === 0 ? (
              <p className="text-slate-600 text-sm italic">{t.addKernelsPrompt}</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 relative z-10">
                {activeKernels.map((k) => (
                  <div key={k.id} className="bg-slate-950 border border-indigo-500/50 p-4 rounded-xl shadow-lg shadow-indigo-900/20 flex flex-col items-center w-36 relative z-20">
                    <Cpu className="w-8 h-8 text-indigo-400 mb-2" />
                    <p className="text-xs font-bold text-center">{k.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Bell Fiber Lines (Abstract Visualization) */}
            {fibers.length > 0 && (
              <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                 <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
              </div>
            )}
          </div>

          {/* BELL FIBER METRICS */}
          {fibers.length > 0 && blockStatus && (
            <div className="mt-6 border-t border-slate-800 pt-6 animate-in fade-in slide-in-from-bottom-4">
              
              {/* ANALYSIS LOGS */}
              {analysisLogs.length > 0 && (
                <div className="mb-6 bg-slate-950 p-4 rounded border border-slate-800 font-mono text-xs">
                  <h3 className="text-[10px] font-bold text-slate-500 mb-2 uppercase">{t.analysisLog}</h3>
                  {analysisLogs.map((log, i) => (
                    <p key={i} className="text-slate-300 mb-1">{log}</p>
                  ))}
                </div>
              )}

              <h3 className="text-[10px] font-bold text-slate-500 mb-3 uppercase">{t.bellFiberDiagnostics}</h3>
              <div className="space-y-2 mb-6">
                {fibers.map((fiber, idx) => (
                  <div key={idx} className={`p-2 rounded border text-xs flex justify-between items-center ${
                    fiber.status === 'STABLE' ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400' : 'bg-red-950/30 border-red-900/50 text-red-400'
                  }`}>
                    <span>{fiber.source} ↔ {fiber.target}</span>
                    <div className="flex gap-4">
                      <span>{t.resonance}: {fiber.resonance}</span>
                      <span>{t.drift}: {fiber.tdi}</span>
                      <span className="font-bold">[{fiber.status === 'STABLE' ? t.stable : t.broken}]</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* FINAL BLOCK EVALUATION */}
              <div className={`p-4 rounded-lg border flex items-center justify-between ${
                blockStatus.isStable ? 'bg-indigo-950/50 border-indigo-500/50' : 'bg-red-950/50 border-red-500/50'
              }`}>
                <div className="flex items-center gap-3">
                  {blockStatus.isStable ? <CheckCircle className="w-6 h-6 text-indigo-400" /> : <ShieldAlert className="w-6 h-6 text-red-400" />}
                  <div>
                    <h4 className="font-bold text-sm uppercase">
                      {blockStatus.isStable ? t.unifiedBlock : t.collapsePrevented}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {blockStatus.isStable 
                        ? t.successMsg 
                        : `${t.failMsg} (${blockStatus.thresholdUsed}).`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase">{t.coherenceIndex}</p>
                  <p className={`text-2xl font-bold ${blockStatus.isStable ? 'text-indigo-400' : 'text-red-400'}`}>
                    {blockStatus.score}%
                  </p>
                </div>
              </div>

              {/* EXPORT SECTION */}
              {blockStatus.isStable && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="text-[10px] font-bold text-slate-500 mb-3 uppercase">{t.exportResults}</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition-colors flex items-center justify-center gap-2">
                      <Database className="w-3 h-3" />
                      {t.jsonManifest}
                    </button>
                    <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition-colors flex items-center justify-center gap-2">
                      <Cpu className="w-3 h-3" />
                      {t.pythonModule}
                    </button>
                    <button className="flex-1 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-300 text-xs font-medium rounded border border-indigo-700/50 transition-colors flex items-center justify-center gap-2">
                      <Layers className="w-3 h-3" />
                      {t.kernelBundle}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
