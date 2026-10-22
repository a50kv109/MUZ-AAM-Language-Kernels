# 📝 Changelog

All notable changes to the **LangCore Builder (AAM-V2.1 / CLC-v2.5)** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.0] - 2026-10-21

### 🚀 Added
- **Georgian OST-9 Linguistic Core (`CORE_GEORGIAN_V1.0`)**:
  - Implemented 9-axis (OST-9) linguistic matrix in `python/georgian_core.py` and `src/lib/harvester.ts`.
  - Consonant cluster density calculation supporting up to 8 consecutive consonants (`გვფრცქვნი`).
  - Split ergativity agent detection (`-მ`, `-მა`, `-მан`).
  - Sacred Supra ritual invariant registry (`SUPRA`, `TAMADA`, `SADGHEGRDZELO`).
  - Added Georgian to $\delta$-semantic density axis ($\delta = 0.68$) in `CLCDashboard.tsx`.
- **Standalone Executable Python Core (`/python/`)**:
  - `aam_core.py`: Universal Linguistic Module v3.2.1 Expert Edition (720° Sync, Kenosis Guard, Etruscan phonetic stops filter, Voynich `q+o` EVA topology).
  - `georgian_core.py`: Georgian OST-9 linguistic engine.
  - `panini_core.py`: Panini Vedic state machine with Sandhi reduction and Chanda metric validation.
  - `bell_fiber.py`: Bell Fiber cross-kernel bridge for invariant transfer.
- **Automated Quality & Test Suite (`/tests/`)**:
  - 17 Python unit tests (`test_aam_core.py`, `test_georgian_core.py`, `test_panini_and_bell.py`, `test_exported_modules.py`).
  - 7 TypeScript unit tests (`harvester.test.ts`).
  - Added `npm test`, `npm run test:python`, and `npm run test:all` scripts in `package.json`.
- **GitHub Release & Compliance Documentation**:
  - Created `docs/PROJECT_INVENTORY.md`, `docs/ARCHITECTURE_AUDIT.md`, `docs/QUALITY_AUDIT.md`, `docs/TEST_REPORT.md`, `docs/SECURITY_AUDIT.md`, `docs/REPAIR_LOG.md`, `docs/KNOWN_LIMITATIONS.md`, `docs/GITHUB_RELEASE_CHECKLIST.md`.
  - Added `.github/workflows/ci.yml` (multi-step GitHub Actions pipeline for Node 22 + Python 3.10).
  - Added `.github/ISSUE_TEMPLATE/` (`bug_report.md`, `feature_request.md`) and `.github/PULL_REQUEST_TEMPLATE.md`.
  - Added MIT License (`LICENSE`) with Artsybashev Andrey Alekseevich attribution and `CITATION.cff` for Zenodo citation.

### 🔧 Fixed
- **DEF-01**: Fixed unescaped `\n` in `src/lib/multi_kernel_code.ts` that caused `SyntaxError: unterminated string literal` during Python compilation.
- **DEF-02**: Fixed `import { saveAs } from 'file-saver'` in `harvester.ts` and `Orchestrator.tsx` to ensure compatibility across both Node.js ESM test runners and Vite browser bundles.
- **DEF-03**: Updated Georgian ergative regex to identify demonstrative pronominal agent marker forms ending in `-მан` (e.g. `მан`).
- **DEF-04**: Calibrated Georgian consonant cluster TDI multiplier to match the documented passport target `TDI_avg = 0.28`.
- **DEF-05**: Fixed missing closing brace on `lucide-react` import in `src/components/Orchestrator.tsx`.
- **DEF-06**: Updated `.gitignore` to comprehensively ignore Python bytecode caches (`__pycache__/`, `*.pyc`) and OS-specific files.
- **DEF-07**: Synchronized `<title>` and Open Graph meta tags in `index.html` with `metadata.json`.

---

## [2.0.0] - 2026-03-08
- Initial release of Combinatorial Language Core CLC-v2.5 (Harvester Edition).
- Harvester Engine supporting Methodologies A (Structural), B (Mixed/Corpus), and C (Acoustic).
- Integration of AAM-V1 hardware invariants ($\theta = 0.3678$, $\Phi = 1.618$, $V_{ref} = 0.201$).
- $\delta$-Semantic Density Continuum visualization.
- Multi-Kernel Bell Fiber Orchestrator.
