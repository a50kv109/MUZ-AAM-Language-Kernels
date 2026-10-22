import React, { useState, useEffect, useRef } from 'react';
import { KernelHarvester, Methodology } from './lib/harvester';
import { translations, Language } from './lib/translations';
import { Terminal, Folder, FileCode, Download, Play, Cpu, Activity, Database, Music, FileJson, Globe, Layers, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Orchestrator from './components/Orchestrator';
import CLCDashboard from './components/CLCDashboard';

type ViewMode = 'harvester' | 'orchestrator' | 'clc';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('harvester');
  const [uiLanguage, setUiLanguage] = useState<Language>('ru');
  const t = translations[uiLanguage];

  const [language, setLanguage] = useState('Ukrainian');
  const [methodology, setMethodology] = useState<Methodology>('A');
  const [logs, setLogs] = useState<string[]>([]);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [harvester, setHarvester] = useState<KernelHarvester | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const runHarvester = async () => {
    setIsHarvesting(true);
    setLogs([]);
    setFiles({});
    setSelectedFile(null);

    const newHarvester = new KernelHarvester(language, methodology);
    setHarvester(newHarvester);

    // Simulate processing time for effect
    const result = newHarvester.run();
    
    // Animate logs
    for (const log of result.logs) {
      setLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 50));
    }

    setFiles(result.files);
    setIsHarvesting(false);
  };

  const handleDownload = () => {
    if (harvester) {
      harvester.downloadZip();
    }
  };

  const toggleLanguage = () => {
    setUiLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Group files by directory for the explorer
  const fileTree = Object.keys(files).reduce((acc, path) => {
    const parts = path.split('/');
    // Skip the root folder name for the tree view to avoid deep nesting visual
    const root = parts[0];
    const relativePath = parts.slice(1).join('/');
    
    if (!acc[root]) acc[root] = [];
    acc[root].push(relativePath);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <Cpu className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">
                {t.title}
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                {t.architect}
              </p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('harvester')}
              title={t.mode1Tooltip}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                viewMode === 'harvester' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {t.mode1}
            </button>
            <button
              onClick={() => setViewMode('orchestrator')}
              title={t.mode2Tooltip}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                viewMode === 'orchestrator' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {t.mode2}
            </button>
            <button
              onClick={() => setViewMode('clc')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                viewMode === 'clc' 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              CLC-v2.5
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-xs font-medium text-slate-300"
            >
              <Globe className="w-3.5 h-3.5" />
              {uiLanguage === 'en' ? 'EN / RU' : 'RU / EN'}
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Activity className="w-3 h-3" />
              {t.systemActive}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'clc' ? (
          <CLCDashboard />
        ) : viewMode === 'orchestrator' ? (
          <Orchestrator lang={uiLanguage} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Controls & Logs */}
            <div className="lg:col-span-4 space-y-6">
              {/* Configuration Panel */}
              <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  {t.configuration}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      {t.slavicGroup}
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { id: 'Russian', label: t.languages.Russian },
                        { id: 'Ukrainian', label: t.languages.Ukrainian },
                        { id: 'Belarusian', label: t.languages.Belarusian },
                        { id: 'OldSlavic', label: t.languages.OldSlavic },
                        { id: 'Polish', label: t.languages.Polish },
                        { id: 'Core', label: t.languages.Core },
                        { id: 'Linguistic', label: t.languages.Linguistic },
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setLanguage(lang.label)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            language === lang.label
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      {t.classicalGroup}
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { id: 'Sanskrit', label: t.languages.Sanskrit },
                        { id: 'Greek', label: t.languages.Greek },
                        { id: 'Latin', label: t.languages.Latin },
                        { id: 'Etruscan', label: t.languages.Etruscan },
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setLanguage(lang.label)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            language === lang.label
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      {t.semiticGroup}
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { id: 'Hebrew', label: t.languages.Hebrew },
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setLanguage(lang.label)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            language === lang.label
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      {t.kartvelianGroup}
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { id: 'Georgian', label: t.languages.Georgian },
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setLanguage(lang.label)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            language === lang.label
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      System Group
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { id: 'Core', label: 'Core Kernel' },
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setLanguage(lang.label)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            language === lang.label
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      {t.targetLanguage}
                    </label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                      placeholder={t.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">
                      {t.methodology}
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'A', label: t.methods.A, icon: FileCode },
                        { id: 'B', label: t.methods.B, icon: Database },
                        { id: 'C', label: t.methods.C, icon: Music },
                        { id: 'S', label: t.methods.S, icon: Activity },
                        { id: 'Modernized', label: t.methods.Modernized, icon: Cpu },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMethodology(m.id as Methodology)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                            methodology === m.id
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <m.icon className="w-4 h-4 opacity-70" />
                          <span className="text-sm font-medium">{m.id} - {m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={runHarvester}
                    disabled={isHarvesting || !language}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                  >
                    {isHarvesting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Cpu className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                    {isHarvesting ? t.assembling : t.initiate}
                  </button>
                </div>
              </section>

              {/* Terminal Output */}
              <section className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-inner h-[300px] flex flex-col font-mono text-xs overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 bg-slate-900/80 backdrop-blur px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-slate-400">
                  <Terminal className="w-3 h-3" />
                  <span>{t.systemLog}</span>
                </div>
                <div className="mt-8 overflow-y-auto flex-1 space-y-1 p-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${log.includes('ERROR') ? 'text-red-400' : log.includes('SUCCESS') || log.includes('✅') ? 'text-emerald-400' : 'text-slate-400'}`}
                      >
                        <span className="opacity-30 mr-2">{new Date().toLocaleTimeString()}</span>
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={logsEndRef} />
                </div>
              </section>
            </div>

            {/* Right Column: File Explorer & Preview */}
            <div className="lg:col-span-8 space-y-6">
              {Object.keys(files).length > 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[800px]">
                  {/* Toolbar */}
                  <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Folder className="w-4 h-4" />
                      <span className="font-medium">{language}_KERNEL_{methodology}</span>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      {t.downloadZip}
                    </button>
                  </div>

                  <div className="flex flex-1 overflow-hidden">
                    {/* File Tree */}
                    <div className="w-64 bg-slate-950/50 border-r border-slate-800 overflow-y-auto p-2">
                      {Object.entries(fileTree).map(([root, paths]) => (
                        <div key={root}>
                          {paths.map((path) => {
                            const fullPath = `${root}/${path}`;
                            const fileName = path.split('/').pop();
                            const isSelected = selectedFile === fullPath;
                            
                            // Simple indentation based on depth
                            const depth = path.split('/').length - 1;
                            
                            return (
                              <button
                                key={fullPath}
                                onClick={() => setSelectedFile(fullPath)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono mb-1 flex items-center gap-2 transition-colors ${
                                  isSelected 
                                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                                style={{ paddingLeft: `${(depth + 1) * 12}px` }}
                              >
                                {fileName?.endsWith('.json') ? (
                                  <FileJson className="w-3 h-3 shrink-0" />
                                ) : (
                                  <FileCode className="w-3 h-3 shrink-0" />
                                )}
                                <span className="truncate">{fileName}</span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Code Preview */}
                    <div className="flex-1 bg-slate-950 overflow-auto relative">
                      {selectedFile ? (
                        <div className="min-h-full">
                          <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2 text-xs text-slate-400 font-mono flex items-center justify-between">
                            <span>{selectedFile}</span>
                            <span className="opacity-50">{files[selectedFile].length} bytes</span>
                          </div>
                          <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed">
                            <code>{files[selectedFile]}</code>
                          </pre>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600">
                          <FileCode className="w-12 h-12 mb-4 opacity-20" />
                          <p className="text-sm">{t.selectFile}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-indigo-900/10">
                    <Cpu className="w-10 h-10 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-300 mb-2">{t.readyTitle}</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    {t.readyDesc}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
