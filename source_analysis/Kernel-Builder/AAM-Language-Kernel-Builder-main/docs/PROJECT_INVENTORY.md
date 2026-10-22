# 📋 Project Inventory: LangCore Builder (AAM-V2.1 / CLC-v2.5)

**Audit Date:** October 21, 2026  
**Auditor:** Independent Engineering Verification Team (Senior SWE, Software Architect, QA Lead, Security Specialist, Tech Writer, Release Engineer)  
**Standard Identifier:** `AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS`  
**Application ID:** `82278ab0-d058-414f-a548-0ab153aac474`

---

## 1. Actual Purpose of the Application

The **Universal Language Kernel Harvester & Combinatorial Language Core (CLC-v2.5)** is a specialized dual-system application:
1. **Interactive Web Workspace (React 19 / Vite / Tailwind CSS 4)**: An educational and industrial dashboard providing UI controls to assemble, inspect, and export modular language kernel structures across multiple linguistic families and assembly methodologies.
2. **Deterministic Computational Kernels (Python 3)**: Standalone algorithmic modules implementing non-probabilistic, invariant-anchored linguistic metrics (Topological Dissonance Index — TDI, Kenosis Guard, 720° Double-Turn Sync, OST-9 phonetics, and Bell Fiber cross-kernel resonance).

---

## 2. Problem It Solves

Conventional statistical language models (LLMs) operate on probabilistic token prediction. When applied to ancient, highly inflected, or sacred texts, statistical sampling causes:
- Semantic drift across translation layers;
- Grammatical distortion of non-Indo-European syntaxes (e.g., split ergativity in Kartvelian);
- Unbounded hallucinations due to lack of thermodynamic or topological entropy thresholds.

LangCore Builder provides **Dry Code** modules where linguistic features, consonant clusters, ritual invariants, and grammatical cases act as hardware-level stabilizers.

---

## 3. What is a "Language Kernel"?

In this project, a **Language Kernel** is a structured, exportable software package containing:
- A base Python class (`base_kernel.py`, `georgian_core.py`, or `panini_core.py`) with calibrated morphological and phonetic scoring methods.
- Structural metadata (`metadata.json`, `dharma_manifest.json`) declaring stability index, historical era, script, and language family.
- ZIC Registry (`zic_registry.json`): A catalog of Zero-Entropy Invariant Codes providing entropy suppression values.
- Automated testing files (`test_kernel.py`) and Google Colab deployment scripts (`notebook.ipynb`).
- Phonetic frequency models and liturgical analyzers (where applicable).

---

## 4. Input Data

1. **User Selection**:
   - Source language (Ukrainian, Russian, Belarusian, Polish, Old Slavic, Sanskrit, Greek, Latin, Hebrew, Etruscan, Georgian, Core/Universal, or custom user-typed string).
   - Assembly methodology:
     - **Method A (Structural)**: Invariant morphology and syntax grammar.
     - **Method B (Mixed/Corpus)**: Empirical corpora alignment.
     - **Method C (Acoustic)**: Spectral resonance and formant frequencies.
     - **Method S (Sacred/Synthetic)**: Panini generative state machine.
     - **Modernized**: 5-layer conceptual bridge.
2. **Text Vectors & Inscriptions**:
   - Arbitrary text strings passed to Python's `analyze_720_sync(text)`.
   - Token lists for consonant cluster and ergative agent analysis.
   - Conceptual invariant lists for Bell Fiber resonance mapping.

---

## 5. Kernel Assembly Pipeline

```
[User Selects Language & Methodology]
                 │
                 ▼
     [Instantiate KernelHarvester]
                 │
                 ▼
       [_createStructure()]
     Creates directory virtual tree
                 │
                 ▼
       [_generateCoreFiles()]
     Branches to specialized code:
     - Method S ──▶ PaniniStateMachine
     - Core/Universal ──▶ AAM_Expert_Core (Etruscan/Voynich)
     - Georgian ──▶ AAM_Georgian_Core (OST-9)
     - Latin Modernized ──▶ 5-Layer Bridge
     - Standard ──▶ BaseLanguageKernel
                 │
                 ▼
  [_generateMetadata() & _generateTests()]
  Creates manifest.json, tests, README.md, Colab notebook
                 │
                 ▼
     [In-Memory File Registry]
  Displayed in code viewer or exported as .zip via JSZip
```

---

## 6. Output Artifacts

- **ZIP Package (`<Language>_KERNEL_<Method>.zip`)**: Full directory archive containing:
  - `core/`: Base engine modules.
  - `phonetics/` or `liturgical/`: Domain analyzers.
  - `data/` or `zic/`: Registries.
  - `tests/`: Automated validation scripts.
  - `metadata.json` / `dharma_manifest.json`: Configuration and metrics.
  - `notebook.ipynb`: Google Colab executable environment.
- **Standalone Python Modules (`/python/`)**:
  - `aam_core.py`: Universal Linguistic Module v3.2.1.
  - `georgian_core.py`: Georgian OST-9 Core.
  - `panini_core.py`: Panini Vedic State Machine.
  - `bell_fiber.py`: Bell Fiber Multi-Kernel Bridge.

---

## 7. Supported Languages & Algorithmic Families

| Language | Family | Script | Primary Algorithms / Features |
|:---|:---|:---|:---|
| **Ukrainian** | East Slavic | Cyrillic | Fluid morphology, root invariants, baseline TDI. |
| **Georgian** | Kartvelian | Mkhedruli | OST-9 9-axis matrix, consonant cluster density (up to 8 consonants), split ergativity agent markers (`-მ`, `-მა`, `-მан`), Supra ZIC registry. |
| **Sanskrit** | Indo-Aryan | Devanagari / IAST | Panini State Machine (Ashtadhyayi rules), Sandhi boundary reduction ($a+i \to e$), Chanda metric validation (Anustubh, Gayatri). |
| **Etruscan** | Tyrsenian | Etruscan / Latin translit. | Phonetic filter against `/b, d, g, o/`, *Etrusca Disciplina* spatial coherence, *SUTHINA* ritual invariants. |
| **Voynich** | EVA script | Latin translit. | Rigid `q+o` topological prefix rule, morphological variance penalty. |
| **Latin** | Italic | Latin | 5-Layer conceptual bridge (Philosophia, Medicina, Ius, Scientia, Liturgia). |
| **Hebrew** | Semitic | Hebrew | Root consonant tri-radicals, liturgical vowel points. |
| **Old Church Slavonic** | South Slavic | Cyrillic / Glagolitic | Early liturgical syntax, nasal vowels. |
| **Greek** | Hellenic | Greek | Dialectal morphology, philosophical invariants. |
| **Polish** | West Slavic | Latin | Consonant cluster tracking, nasal vowels. |
| **Russian & Belarusian** | East Slavic | Cyrillic | Slavic case grammar, comparative differential. |

---

## 8. Dependencies & External Integrations

### Frontend Stack (Node.js)
- `react` (v19.0.0), `react-dom` (v19.0.0)
- `vite` (v6.2.0), `@vitejs/plugin-react` (v5.0.4)
- `tailwindcss` (v4.1.14), `@tailwindcss/vite` (v4.1.14)
- `lucide-react` (v0.546.0)
- `motion` (v12.23.24)
- `jszip` (v3.10.1), `file-saver` (v2.0.5)
- `tsx` (v4.21.0), `typescript` (~v5.8.2)

### Unused Legacy Packages (Found in package.json)
- `@google/genai` (v1.29.0) — Not imported in application code.
- `better-sqlite3` (v12.4.1) — Not imported in application code.
- `express` (v4.21.2) — Not imported in application code.
- `dotenv` (v17.2.3) — Not imported in application code.

### Python Stack
- Python 3.8+ standard library: `math`, `re`, `json`, `time`, `typing`, `collections`, `unittest`, `dataclasses`, `enum`, `hashlib`. No mandatory third-party pip dependencies required to execute the core analysis and tests.

---

## 9. Component Status (Finished vs Experimental vs Simulated)

| Component | Status | Reality Assessment |
|:---|:---|:---|
| **Python Core Modules (`python/*.py`)** | **VERIFIED** | Real, deterministic Python classes with mathematical algorithms. |
| **Unit Test Suite (`tests/*.py`, `tests/*.ts`)** | **VERIFIED** | Real automated test suites executing via Node `--test` and Python `unittest`. |
| **Harvester Engine (`src/lib/harvester.ts`)** | **VERIFIED** | Real virtual file generation; ZIP download functional via JSZip and FileSaver. |
| **Multi-Kernel Code Export (`src/lib/*.ts`)** | **VERIFIED** | Real Python code strings; syntax validated via `py_compile`. |
| **Orchestrator Workspace (`Orchestrator.tsx`)** | **PARTIALLY VERIFIED** | UI controls and downloads work; however, drift calculation includes pseudo-random noise (`Math.random()`). |
| **CLC-v2.5 Dashboard (`CLCDashboard.tsx`)** | **SIMULATED** | Metrics (`Module-64`, `TDI Pulse`) and harvest progress operate via `setInterval` and `setTimeout` demo animations. |

---

## 10. Entry Points & Project Map

- **Web Entry**: `/index.html` $\to$ `/src/main.tsx` $\to$ `/src/App.tsx`.
- **Python Entry**: `/python/aam_core.py`, `/python/georgian_core.py`, `/python/panini_core.py`, `/python/bell_fiber.py`.
- **Test Entry**: `npm test` (`tests/harvester.test.ts`), `npm run test:python` (`python3 -m unittest discover tests`).
- **Configuration**: `package.json`, `tsconfig.json`, `vite.config.ts`, `.env.example`, `metadata.json`.
