# 🚀 GitHub Release Checklist: LangCore Builder (AAM-V2.1 / CLC-v2.5)

**Audit Date:** October 21, 2026  
**Auditor:** Release Engineer & Technical Writer  
**Target:** Public GitHub Repository Readiness

---

## 1. File Inclusion & Exclusion Matrix

| File / Directory | Include in Git? | Reason | Verification Status |
|:---|:---:|:---|:---:|
| `src/` | **YES** | React 19 / TypeScript source code | **CLEAN** |
| `python/` | **YES** | Python 3 core algorithmic modules | **CLEAN** |
| `tests/` | **YES** | Automated test suite (Python + TS) | **CLEAN** |
| `docs/` | **YES** | Complete engineering audit and specs | **CLEAN** |
| `.github/` | **YES** | CI workflow & issue/PR templates | **CLEAN** |
| `README.md` | **YES** | Main public documentation | **CLEAN** |
| `ARCHITECTURE.md` | **YES** | Deep architectural specification | **CLEAN** |
| `CONTRIBUTING.md` | **YES** | Contributor guidelines | **CLEAN** |
| `LICENSE` | **YES** | MIT License with author attribution | **CLEAN** |
| `SECURITY.md` | **YES** | Security & Kenosis Guard policy | **CLEAN** |
| `CITATION.cff` | **YES** | Academic & Zenodo citation metadata | **CLEAN** |
| `CHANGELOG.md` | **YES** | Version history | **CLEAN** |
| `package.json` | **YES** | Node dependency & scripts manifest | **CLEAN** |
| `tsconfig.json` | **YES** | TypeScript compilation rules | **CLEAN** |
| `vite.config.ts` | **YES** | Vite bundler configuration | **CLEAN** |
| `metadata.json` | **YES** | Application metadata | **CLEAN** |
| `.env.example` | **YES** | Example environment placeholders | **CLEAN** |
| `.gitignore` | **YES** | Excludes temporary & build artifacts | **CLEAN** |
| `dist/` | **NO** | Build output (generated via CI) | Excluded by `.gitignore` |
| `node_modules/` | **NO** | Local dependencies (installed via npm) | Excluded by `.gitignore` |
| `__pycache__/` | **NO** | Python bytecode cache | Excluded by `.gitignore` |
| `*.pyc` | **NO** | Compiled Python files | Excluded by `.gitignore` |
| `.env` / `.env.local` | **NO** | Real secret files | Excluded by `.gitignore` |

---

## 2. Pre-Publish Verification Checklist

- [x] **No Hardcoded Secrets**: Scanned for API keys, tokens, and passwords. Zero found.
- [x] **Cross-Platform Compatibility**: File-saver import refactored for both browser and Node.js ESM.
- [x] **Deterministic Python Unit Tests**: 17 tests running and passing via `python3 -m unittest discover tests`.
- [x] **TypeScript Unit Tests**: 7 tests running and passing via `npx tsx --test tests/harvester.test.ts`.
- [x] **TypeScript Type Checking**: 0 errors under `npm run lint` (`tsc --noEmit`).
- [x] **Production Bundle**: `npm run build` generates clean production bundle in `dist/`.
- [x] **GitHub Actions Workflow**: `.github/workflows/ci.yml` prepared with multi-environment matrix.
- [x] **Attribution & Intellectual Property**: Andrey Alekseevich Artsybashev clearly designated as Architect and Copyright Holder in `LICENSE`, `README.md`, `CITATION.cff`, and all code headers.
- [x] **Known Limitations Disclosed**: Client-side simulation features clearly delineated from mathematical core algorithms in `docs/KNOWN_LIMITATIONS.md`.

---

## 3. Step-by-Step Instructions for Repository Owner Before Publishing

1. **Initialize Git Repository** (if creating a brand new repo):
   ```bash
   git init -b main
   ```
2. **Review Untracked Files**:
   ```bash
   git status
   ```
   Confirm that `node_modules/`, `dist/`, and `__pycache__/` are not tracked.
3. **Stage and Commit**:
   ```bash
   git add .
   git commit -m "feat: initial release of LangCore Builder AAM-V2.1 / CLC-v2.5"
   ```
4. **Link Remote GitHub Repository**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   ```
5. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```
6. **Verify GitHub Actions**:
   Navigate to the **Actions** tab on GitHub and confirm that the CI Pipeline completes with a green checkmark.
