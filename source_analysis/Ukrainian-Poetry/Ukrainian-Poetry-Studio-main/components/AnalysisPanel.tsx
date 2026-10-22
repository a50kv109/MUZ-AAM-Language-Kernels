
import React from 'react';
import { MetricAnalysis } from '../types';

interface AnalysisPanelProps {
  analysis: MetricAnalysis | null;
  loading: boolean;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-20 bg-slate-100 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="font-medium">Очікуємо на вхідні дані для аналізу</p>
        <p className="text-xs mt-1">Ядро автоматично розпізнає метр та схему рим</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Рима</span>
          <div className="text-2xl font-black text-indigo-600 tracking-tighter">{analysis.rhymeScheme || 'N/A'}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Розмір</span>
          <div className="text-lg font-bold text-slate-800 truncate">{analysis.overallMeter || 'Верлібр'}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Метрика</span>
          <div className="flex items-center gap-2">
             <div className="text-2xl font-black text-emerald-600">{analysis.varianceScore}%</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Семантика</span>
          <div className="text-2xl font-black text-orange-500">{analysis.semanticPreservation || 100}%</div>
        </div>
      </div>

      {/* AAM-V2.1 Metrics Section */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/10 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">AAM-V2.1 Core Metrics</h3>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">CORE_UKRAINIAN_V1.0_MODERNIZED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* EVRID */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">EVRID (Resonance)</span>
                <span className="text-emerald-400">{analysis.evrid_score?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(analysis.evrid_score || 0) * 100}%` }}></div>
              </div>
            </div>

            {/* SOBORNOST */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Sobornost (Coherence)</span>
                <span className="text-blue-400">{analysis.sobornost_index?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(analysis.sobornost_index || 0) * 100}%` }}></div>
              </div>
            </div>

            {/* TDI */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">TDI (Dissonance)</span>
                <span className={`${(analysis.tdi_score || 0) > 0.4 ? 'text-red-400' : 'text-slate-300'}`}>{analysis.tdi_score?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${(analysis.tdi_score || 0) > 0.4 ? 'bg-red-500' : 'bg-slate-500'}`} style={{ width: `${(analysis.tdi_score || 0) * 100}%` }}></div>
              </div>
            </div>
          </div>

          {/* OST Metrics Grid */}
          {analysis.ost_metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analysis.ost_metrics).map(([key, value]) => (
                <div key={key} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <div className="text-[9px] font-black uppercase text-slate-500 mb-1 tracking-wider">
                    {key.replace('ost', 'OST-').replace('_', ' ')}
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-lg font-bold text-white leading-none">{value.toFixed(2)}</div>
                    <div className="flex-1 h-1 bg-slate-700 rounded-full mb-1">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${value * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Порядковий аналіз просодії</span>
          <span className="text-[10px] text-slate-400">0 - ненаголошений, 1 - наголошений</span>
        </div>
        <div className="divide-y divide-slate-100">
          {analysis.lines.map((line, idx) => (
            <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <p className="text-slate-900 font-medium text-lg leading-tight serif">{line.text}</p>
                <div className="flex items-center gap-2">
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${line.error ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {line.syllableCount} СКЛ.
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 items-center">
                <div className="flex gap-0.5 mr-3">
                  {line.meterPattern.split('').map((bit, bidx) => (
                    <div 
                      key={bidx} 
                      className={`w-3 h-5 rounded-sm transition-all ${
                        bit === '1' ? 'bg-indigo-500 shadow-sm shadow-indigo-200' : 'bg-slate-200'
                      }`}
                      title={bit === '1' ? 'Наголошений' : 'Ненаголошений'}
                    />
                  ))}
                </div>
                {line.error && (
                  <span className="text-[11px] font-medium text-red-500 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {line.error}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
