import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle2, 
  FileCode, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  Copy, 
  Check, 
  Archive,
  BookOpen,
  Info
} from 'lucide-react';

export default function App() {
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeTab, setActiveTab] = useState<'manifest' | 'contracts' | 'verification' | 'structure'>('manifest');

  const zipFileName = 'aam-language-kernels-collection-v0.1.1-phase2.zip';
  const zipSha256 = 'e2c56b31e50a9cd7848daef891b82a9fe3e0ac4ae297492495f0585fc0c9c5a9';
  const packageVersion = '0.1.1';
  const exportDate = '2026-10-22';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  AAM Language Kernels Collection
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v{packageVersion}
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> P0 Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Phase 1.1 Stabilization & Phase 2 Metrical/Lexical Contracts Snapshot
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/${zipFileName}`}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Package (.ZIP)
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Verification Banner */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Status</span>
              <div className="mt-1 flex items-center gap-1.5 text-emerald-400 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4" /> Clean Build (Exit 0)
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Test Suites</span>
              <div className="mt-1 text-slate-200 font-medium text-sm">
                2 Suites (7 Syllable + 7 Contract)
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Export Date</span>
              <div className="mt-1 text-slate-200 font-medium text-sm">
                {exportDate}
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Isolated Dependencies</span>
              <div className="mt-1 text-emerald-400 font-medium text-sm">
                Self-contained (v0.1.1)
              </div>
            </div>
          </div>

          {/* Checksum Bar */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto text-slate-300 font-mono">
              <span className="text-slate-500 font-sans font-semibold">SHA-256:</span>
              <code className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 select-all text-indigo-300">
                {zipSha256}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(zipSha256)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition cursor-pointer"
            >
              {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedHash ? 'Copied' : 'Copy Hash'}
            </button>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('manifest')}
            className={`pb-3 px-3 text-sm font-medium transition cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'manifest'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> EXPORT_MANIFEST.md
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`pb-3 px-3 text-sm font-medium transition cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'contracts'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" /> Phase 2 Contracts
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`pb-3 px-3 text-sm font-medium transition cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'verification'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" /> Verified Execution Output
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`pb-3 px-3 text-sm font-medium transition cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'structure'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Archive className="w-4 h-4" /> Package Contents (35 Files)
          </button>
        </div>

        {/* Tab 1: Manifest */}
        {activeTab === 'manifest' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-sm space-y-4">
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Verified Export Record (P0 Snapshot)
            </h2>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
              <p className="text-emerald-400 font-bold"># AAM LANGUAGE KERNELS COLLECTION — EXPORT MANIFEST</p>
              <p>Package: aam-language-kernels-collection</p>
              <p>Version: 0.1.1 (Phase 1.1 + Phase 2)</p>
              <p>Autonomy: Strict (Zero parent workspace dependencies)</p>
              <p>Command: npm run verify (tsc --noEmit && tsx syllable_analyzer.test.ts && tsx contracts_phase2.test.ts)</p>
              <p>Result: PASS (0 errors, 0 warnings)</p>
            </div>

            <div className="space-y-2 text-slate-300">
              <h3 className="text-sm font-semibold text-slate-200">Critical File Checksums in Snapshot:</h3>
              <ul className="text-xs font-mono space-y-1 bg-slate-950/70 p-4 rounded-lg border border-slate-800/80">
                <li><span className="text-indigo-300">package.json:</span> 88287afe55bc6aabc786a06aafdb15e716cc62b0dbe4ecf66474856ea76814d2</li>
                <li><span className="text-indigo-300">tsconfig.json:</span> e6c10ea4d3a52a7b624c4f404512073d26e635671c455df06ab336f151e40388</li>
                <li><span className="text-indigo-300">shared/interfaces/lexical_stress.ts:</span> b88694e4861ec0ebcae85f1b151559b5b627f7f4c77cb520bcbd49d30e55791b</li>
                <li><span className="text-indigo-300">shared/interfaces/metrical_templates.ts:</span> fc650e3b0457e88d7feb175323463d10a139c209190cb3ed039cadadf906a1cc</li>
                <li><span className="text-indigo-300">tests/shared/interfaces/contracts_phase2.test.ts:</span> 10ae2b5762f51f0e5ff968aff0bc5a74f6d59578c6530587595e9ebe7d83c84e</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Contracts */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">shared/interfaces/lexical_stress.ts</h3>
              <p className="text-xs text-slate-400 mb-3">
                Explicit modeling of stress provenance, variant forms, clitics, and confidence scoring.
              </p>
              <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
{`export type StressStatus = 'verified' | 'unverified' | 'disputed' | 'provisional';

export interface LexicalStressProvenance {
  source: string;
  dialect?: string;
  register?: string;
  status: StressStatus;
  confidence: number; // 0.0 to 1.0
  notes?: string;
}

export interface LexicalStressEntry {
  lemma: string;
  primaryStressSyllableIndex: number;
  secondaryStressSyllableIndices?: number[];
  allowedVariants?: number[];
  isClitic?: boolean;
  provenance: LexicalStressProvenance;
}

export interface ILexicalStressDictionary {
  lookup(word: string): Promise<LexicalStressEntry | null>;
  lookupSync?(word: string): LexicalStressEntry | null;
  getKnownLemmasCount?(): number;
}`}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">shared/interfaces/metrical_templates.ts</h3>
              <p className="text-xs text-slate-400 mb-3">
                Declarative schema for poetic meters, line bounds, feet composition, and allowable substitutions.
              </p>
              <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
{`export type MetricalSystem = 'syllabo-tonic' | 'tonic' | 'syllabic' | 'quantitative';

export interface MetricalFoot {
  name: string;
  pattern: ('strong' | 'weak' | 'variable')[];
}

export interface MetricalSubstitution {
  positionIndex: number;
  allowedFoot: string;
  frequencyLikelihood?: 'common' | 'occasional' | 'rare';
}

export interface MetricalLineRule {
  lineIndex?: number;
  baseFoot: string;
  feetCount: number;
  caesuraAfterSyllable?: number;
  allowableSubstitutions?: MetricalSubstitution[];
  syllableCountBounds?: { min: number; max: number };
}

export interface MetricalTemplate {
  id: string;
  name: string;
  system: MetricalSystem;
  targetLanguage: string;
  lineRules: MetricalLineRule[];
  description?: string;
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Verification Output */}
        {activeTab === 'verification' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Verified Autonomous Run: npm run verify
            </h3>
            <div className="bg-black/90 p-5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
              <p className="text-slate-500">$ cd language-kernels-collection && npm run verify</p>
              <p className="text-slate-400">&gt; aam-language-kernels-collection@0.1.1 verify</p>
              <p className="text-slate-400">&gt; npm run typecheck &amp;&amp; npm test</p>
              <br />
              <p className="text-slate-400">&gt; aam-language-kernels-collection@0.1.1 typecheck</p>
              <p className="text-slate-400">&gt; tsc --noEmit</p>
              <br />
              <p className="text-slate-400">&gt; aam-language-kernels-collection@0.1.1 test</p>
              <p className="text-slate-400">&gt; tsx tests/shared/engines/syllable_analyzer.test.ts &amp;&amp; tsx tests/shared/interfaces/contracts_phase2.test.ts</p>
              <br />
              <p className="text-cyan-400">--- Starting UkOrthographicStrategy Test Suite ---</p>
              <p className="text-emerald-400">✓ All 7 test suites passed with strict assertions.</p>
              <p className="text-cyan-400">--- Starting Phase 2 Contracts Test Suite ---</p>
              <p className="text-emerald-400">✓ All Phase 2 contract tests passed with strict assertions.</p>
              <br />
              <p className="text-emerald-400 font-semibold">[Process completed with exit code 0]</p>
            </div>
          </div>
        )}

        {/* Tab 4: Package Contents */}
        {activeTab === 'structure' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">
                Included in Release Archive (35 Files, 0 node_modules)
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Clean tree structure
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <p className="text-indigo-400 font-bold mb-2">Core &amp; Config</p>
                <ul className="space-y-1">
                  <li>EXPORT_MANIFEST.md</li>
                  <li>README.md</li>
                  <li>package.json (0.1.1)</li>
                  <li>package-lock.json</li>
                  <li>tsconfig.json</li>
                  <li>registry.yaml</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <p className="text-indigo-400 font-bold mb-2">Contracts &amp; Tests</p>
                <ul className="space-y-1">
                  <li>shared/interfaces/lexical_stress.ts</li>
                  <li>shared/interfaces/metrical_templates.ts</li>
                  <li>shared/interfaces/index.ts</li>
                  <li>tests/shared/interfaces/contracts_phase2.test.ts</li>
                  <li>tests/shared/engines/syllable_analyzer.test.ts</li>
                  <li>examples/metrical-template.example.json</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <p className="text-indigo-400 font-bold mb-2">Documentation</p>
                <ul className="space-y-1">
                  <li>docs/PHASE2_CONTRACTS.md</li>
                  <li>docs/REPOSITORY_STATUS.md</li>
                  <li>docs/TESTING_AND_EVIDENCE.md</li>
                  <li>docs/API_CONTRACTS.md</li>
                  <li>docs/ARCHITECTURE.md</li>
                  <li>docs/ROADMAP.md</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <p className="text-indigo-400 font-bold mb-2">Languages &amp; Terms</p>
                <ul className="space-y-1">
                  <li>languages/italian/engineering/music_literacy_terms.md</li>
                  <li>languages/italian/engineering/poetics_versification_terms.md</li>
                  <li>languages/ukrainian/audit/evidence_audit.md</li>
                  <li>languages/ukrainian/audit/reuse_assessment.md</li>
                  <li>shared/engines/uk_syllable_strategy.ts</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* User Guidance / Next Steps */}
        <section className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-5 flex items-start gap-4">
          <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-slate-100">
              Alignment with Unified Engineering Plan v0.6 (Milestones P0 &amp; P1)
            </p>
            <p>
              This snapshot provides the empirical baseline for milestone <strong>P0 (independent acceptance of current state)</strong>.
              Per architectural decision, <code>MetricVerifier</code> is deferred until after second-language rule verification,
              preventing premature generalization before empirical phonological and metrical data are accumulated.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
