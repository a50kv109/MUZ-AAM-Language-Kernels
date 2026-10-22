
import React, { useState } from 'react';
import { 
  PoeticStyle, 
  AuthorProfile, 
  PoetryVariant
} from './types';
import { 
  STYLES_CONFIG, 
  PROFILES_CONFIG 
} from './constants';
import { 
  transformProseToPoetry
} from './services/geminiService';
import { PYTHON_PROJECT_FILES } from './utils/pythonProjectContent';
import AnalysisPanel from './components/AnalysisPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transform' | 'editor' | 'batch' | 'code'>('transform');
  const [sourceText, setSourceText] = useState('');
  const [currentPoem, setCurrentPoem] = useState('');
  const [variants, setVariants] = useState<PoetryVariant[]>([]);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  
  const [selectedStyles, setSelectedStyles] = useState<PoeticStyle[]>([PoeticStyle.FOLK_8_6]);
  const [selectedProfile, setSelectedProfile] = useState<AuthorProfile>(AuthorProfile.SHEVCHENKO);
  
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(PYTHON_PROJECT_FILES[0]);

  const handleTransform = async () => {
    if (!sourceText || selectedStyles.length === 0) return;
    setLoading(true);
    try {
      const results = await transformProseToPoetry(sourceText, selectedStyles, selectedProfile);
      setVariants(results);
      setActiveVariantIndex(0);
      if (results.length > 0) setCurrentPoem(results[0].content);
    } catch (error) {
      console.error(error);
      alert("Помилка генерації.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Очистити всю сцену? Всі поточні напрацювання будуть видалені.")) {
      setSourceText('');
      setCurrentPoem('');
      setVariants([]);
      setActiveVariantIndex(0);
    }
  };

  const handleExportTxt = () => {
    if (!currentPoem) return;
    const blob = new Blob([currentPoem], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.href = url;
    a.download = `poem_${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const variant = variants[activeVariantIndex];
    if (!variant) return;

    const exportData = {
      project: "Ukrainian Poetry Studio",
      export_timestamp: new Date().toISOString(),
      metadata: {
        source_language: variant.sourceLanguage,
        meaning_transfer: variant.translatedMeaning,
        applied_style_profile: variant.profileApplied,
        original_config: {
          profile: selectedProfile,
          styles: selectedStyles
        }
      },
      content: variant.content,
      metrics: {
        rhyme_scheme: variant.analysis.rhymeScheme,
        meter: variant.analysis.overallMeter,
        variance_score: variant.analysis.varianceScore,
        semantic_preservation: variant.analysis.semanticPreservation,
        line_by_line_analysis: variant.analysis.lines
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    
    a.href = url;
    a.download = `poetry_studio_report_${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleStyle = (style: PoeticStyle) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const activeVariant = variants[activeVariantIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl font-black serif tracking-tight">Ukrainian Poetry Studio</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClear} 
              className="group flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" 
              title="Очистити сцену"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline">Очистити сцену</span>
            </button>
            <nav className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {['transform', 'editor', 'batch', 'code'].map(t => (
                <button 
                  key={t} onClick={() => setActiveTab(t as any)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === t ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                >
                  {t === 'transform' ? 'Міст' : t === 'editor' ? 'Фрістайл' : t === 'batch' ? 'Пакет' : 'Код проекту'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">Стилі (Mix Mode)</label>
              <div className="space-y-2">
                {STYLES_CONFIG.map(s => (
                  <button 
                    key={s.id} onClick={() => toggleStyle(s.id as PoeticStyle)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${selectedStyles.includes(s.id as PoeticStyle) ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/5' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedStyles.includes(s.id as PoeticStyle) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'}`}>
                      {selectedStyles.includes(s.id as PoeticStyle) && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{s.id}</div>
                      <div className="text-[9px] text-slate-400 leading-tight">{s.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">Профіль автора</label>
              <div className="grid grid-cols-2 gap-2">
                {PROFILES_CONFIG.map(p => (
                  <button 
                    key={p.id} onClick={() => setSelectedProfile(p.id as AuthorProfile)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${selectedProfile === p.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200'}`}
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleTransform} disabled={loading || !sourceText}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
            >
              {loading ? 'Обробка...' : 'Римувати'}
            </button>
          </div>
        </aside>

        <section className="lg:col-span-8 space-y-8">
          {activeTab === 'code' ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-[600px] flex flex-col">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Експорт Python Проекту</h3>
                <button 
                  onClick={() => {
                    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = selectedFile.name;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg"
                >
                  Завантажити {selectedFile.name}
                </button>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 border-r border-slate-100 bg-slate-50/50 overflow-y-auto p-2 space-y-1">
                  {PYTHON_PROJECT_FILES.map(f => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFile(f)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedFile.name === f.name ? 'bg-white shadow text-indigo-600 ring-1 ring-indigo-100' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
                <div className="w-2/3 overflow-y-auto bg-slate-900 text-slate-300 p-4 font-mono text-xs leading-relaxed">
                  <pre>{selectedFile.content}</pre>
                </div>
              </div>
            </div>
          ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Вхідний текст</span>
              <button onClick={() => setSourceText('')} className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">Очистити ввід</button>
            </div>
            <textarea 
              value={sourceText} onChange={e => setSourceText(e.target.value)}
              placeholder="Вставте текст будь-якою мовою для трансформації..."
              className="w-full p-8 min-h-[200px] border-none focus:ring-0 text-lg leading-relaxed text-slate-700 placeholder:text-slate-300 italic"
            />
          </div>
          )}

          {activeTab !== 'code' && variants.length > 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-2">
                  {variants.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setActiveVariantIndex(i); setCurrentPoem(variants[i].content); }} 
                      className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${activeVariantIndex === i ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-300'}`}
                    >
                      {i+1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleExportTxt} 
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Експорт TXT
                  </button>
                  <button 
                    onClick={handleDownloadJson} 
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    JSON Звіт
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-indigo-100 shadow-2xl shadow-indigo-100/50 overflow-hidden">
                <div className="px-10 py-6 bg-slate-50/50 border-b border-indigo-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Оригінал</span>
                    <span className="text-xs font-bold text-slate-700">{activeVariant?.sourceLanguage}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Трансфер Сенсу</span>
                    <span className="text-xs font-medium text-slate-600 line-clamp-1 italic">{activeVariant?.translatedMeaning}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Стиль</span>
                    <span className="text-xs font-bold text-slate-900">{activeVariant?.profileApplied}</span>
                  </div>
                </div>
                <div className="p-12 relative text-center">
                  <div className="absolute top-6 right-8 opacity-5">
                    <svg className="w-32 h-32 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H21.017C22.1216 3 23.017 3.89543 23.017 5V15C23.017 17.2091 21.2261 19 19.017 19H17.517C16.9647 19 16.517 19.4477 16.517 20V21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H8C9.10457 3 10 3.89543 10 5V15C10 17.2091 8.20914 19 6 19H4.5C3.94772 19 3.5 19.4477 3.5 20V21H1ZM14.017 21" />
                    </svg>
                  </div>
                  <pre className="whitespace-pre-wrap text-2xl serif leading-[1.8] text-slate-800 tracking-tight relative z-10">{currentPoem}</pre>
                </div>
              </div>

              <AnalysisPanel analysis={activeVariant?.analysis || null} loading={false} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
