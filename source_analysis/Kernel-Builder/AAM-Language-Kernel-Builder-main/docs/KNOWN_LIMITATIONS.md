# ⚠️ Known Limitations: LangCore Builder (AAM-V2.1 / CLC-v2.5)

**Audit Date:** October 21, 2026  
**Auditor:** Software Architect & Technical Writer  
**Status:** DISCLOSED & DOCUMENTED FOR PUBLIC RELEASE

---

## 1. Client-Side Simulation vs Deterministic Computation

The LangCore Builder repository contains two distinct categories of code that users must understand:

### 1.1. Deterministic Computational Algorithms (Real)
- **Location**: `/python/` (`aam_core.py`, `georgian_core.py`, `panini_core.py`, `bell_fiber.py`) and `/src/lib/harvester.ts`.
- **Reality**: 100% real, deterministic mathematical implementations. Given the same text input, all metrics (TDI, Coherence, Sandhi output, Jaccard overlap, Kenosis triggering) are exact and reproducible.
- **Evidence**: 24 automated unit tests running in continuous integration.

### 1.2. Interactive Demonstration Gauges (Simulated)
- **Location**: `src/components/CLCDashboard.tsx` (CLC-v2.5 Dashboard).
- **Reality**: The live gauge readouts (`Module-64: 0.721`, `TDI Pulse: 0.34`, `Resonance: 0.79`) oscillate via `setInterval` using `Math.random()` to visually demonstrate how a telemetry dashboard would appear in an active hardware operating system.
- **Location**: `src/components/Orchestrator.tsx`.
- **Reality**: The "Calculate Correspondence" button introduces a visual noise jitter (`Math.random() * 0.2`) to simulate fiber fluctuation. For deterministic mathematical correspondence, use the Python `BellFiberEngine` directly.

---

## 2. In-Memory Assembly & Storage Limits

- The Harvester operates entirely within client browser memory.
- When generating language kernels for very large custom corpora (exceeding tens of megabytes), browser tab heap memory limitations apply.
- The web app does not connect to an external persistent database by default. All exported packages are downloaded as standalone `.zip` archives.

---

## 3. Linguistic Depth by Language

Not all languages possess the same depth of specialized custom rules:
- **Fully Custom Specialized Ontologies**:
  - **Georgian**: Full 9-axis (OST-9) matrix, 8-consonant cluster parser, split ergativity agent detection, Supra ZIC registry.
  - **Sanskrit**: Panini generative state machine, Sandhi reduction rules, Chanda metric integrity.
  - **Etruscan & Voynich**: Forbidden phonetic stops filter, EVA `q+o` structural rule.
  - **Latin**: 5-layer conceptual bridge.
- **Generic Fallback**:
  - Languages without specialized rule files (e.g. Avestan, Finnish) generate a clean, calibrated `BaseLanguageKernel` template conforming to AAM-V2.1 structural methodology.

---

## 4. Dependencies Footprint

- Four packages in `package.json` (`@google/genai`, `better-sqlite3`, `dotenv`, `express`) are currently unused legacy entries. They do not affect the client build output (`dist/`), but produce transitive vulnerability warnings in `npm audit`.
- The standalone Python modules require **zero** external pip packages (relying solely on Python's standard library).

---

## 5. Local Git Repository History

- This development workspace operates within an ephemeral container where `.git` was not pre-initialized.
- Initializing Git (`git init`) and creating the initial commit is required before pushing to a remote GitHub repository.
