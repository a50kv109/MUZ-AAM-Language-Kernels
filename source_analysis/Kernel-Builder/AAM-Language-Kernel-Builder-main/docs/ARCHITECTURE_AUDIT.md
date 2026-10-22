# 🏛️ Architecture Audit: LangCore Builder (AAM-V2.1 / CLC-v2.5)

**Audit Date:** October 21, 2026  
**Auditor:** Independent Software Architect & Systems Engineer  
**Status:** AUDITED (Identified Findings & Architectural Boundaries)

---

## 1. Executive Summary

The architecture of LangCore Builder represents a hybrid paradigm:
1. A **declarative React/Vite client** that acts as an IDE-like interface (generating and browsing virtual files in browser memory, initiating downloads).
2. A **functional/object-oriented Python core** implementing mathematical models of linguistic entropy and topological coherence.

The system succeeds in formalizing non-probabilistic invariants ($\theta, \Phi, V_{ref}$), but exhibits certain architectural couplings between code templates and UI components that require disclosure and targeted stabilization.

---

## 2. Separation of Architectural Layers

We examined the degree of separation across the 6 key architectural layers:

| Layer | Implementation in Project | Separation Level | Assessment |
|:---|:---|:---|:---|
| **1. Language Description** | Metadata manifests (`metadata.json`, `dharma_manifest.json`), language family names. | **High** | Well isolated in JSON manifests and dataclasses. |
| **2. Linguistic Data** | ZIC registries (`zic_registry.json`), phonemic character sets, root lists. | **Moderate** | Partially stored in JSON, partially embedded in Python class constants. |
| **3. Processing Algorithms** | `analyze_720_sync`, `calculate_consonant_cluster_density`, `apply_sandhi_reduction`. | **High** | Encapsulated in standalone classes with pure deterministic methods. |
| **4. Build Configuration** | `KernelHarvester._createStructure()`, `Methodology` enums. | **Moderate** | TypeScript class `KernelHarvester` mixes build orchestration with Python source generation. |
| **5. Resulting Language Kernel** | Generated file dictionary (`Record<string, string>`) and standalone Python scripts. | **High** | Artifacts are cleanly packaged as independent directory trees. |
| **6. Evaluation & Verification** | Python `unittest` test suite and Node.js `--test` suites. | **High** | Isolated in `/tests/` with independent execution runners. |

---

## 3. Data Flow & Boundary Analysis

### 3.1. Web Assembly Flow
- **Boundary**: Strict client-side execution. The application does not require a remote server to generate or download language packages. All files are constructed in memory as JavaScript strings and packaged using `JSZip` into browser `Blob` objects.
- **Strengths**: Zero server latency, no server-side credential leakage, full offline capability.
- **Limitation**: Large corpus ingestion is constrained by client-side browser memory.

### 3.2. Python Core Analysis Flow
- **Deterministic 720° Loop**:
  - `clean_text` tokenization $\to$ `local_tdi` computation.
  - `_kenosis_check(local_tdi)` conditional guard.
  - ZIC invariant deduction $\to$ `coherence` calculation.
- **Deterministic**: Given identical text and kernel parameters, the output metrics (TDI, Coherence, status) are 100% reproducible.

### 3.3. Orchestrator Simulation Flow
- **Finding**: In `src/components/Orchestrator.tsx`, the drift calculation between two kernels includes:
  `const drift = Math.abs(k1.ci - k2.ci) + (Math.random() * 0.2);`
- **Architectural Note**: This introduces non-deterministic jitter into the UI calculation for visual variation, whereas the corresponding Python `BellFiberEngine.compute_resonance()` uses a deterministic formula:
  `tdi_drift = (delta_distance * 0.5) + (1.0 - overlap) * 0.2;`
- **Recommendation**: Disclose this distinction in `KNOWN_LIMITATIONS.md`.

---

## 4. Input Validation & Error Handling

| Scenario | Behavior in Code | Audit Status | Evidence |
|:---|:---|:---|:---|
| **Empty Text Input** | Returns safe defaults (`TDI = 1.0` or `0.1` density). | **VERIFIED** | Handled by guard clauses `if not tokens: return 1.0`. |
| **Unknown Language Input** | Generates standard `BaseKernel` fallback without crashing. | **VERIFIED** | Tested via `Avestan_KERNEL_B` in `harvester.test.ts`. |
| **Extreme Semantic Chaos** | Triggers `KENOSIS_TRIGGERED` and halts execution. | **VERIFIED** | Verified in `test_kenosis_trigger()` in `test_aam_core.py`. |
| **Non-Latin Scripts (Georgian, Cyrillic, Hebrew)** | Fully supported via Python Unicode regex (`[a-zა-ჰ]`, `re.UNICODE`). | **VERIFIED** | Verified on Georgian Mkhedruli text `"მან მწვრთნელი ნახა"`. |
| **Missing Optional Parameters** | Default keyword arguments used (`visual_anchors=0`, `text_density=1.0`). | **VERIFIED** | Handled in method signatures. |

---

## 5. State Management & Side Effects

- **Web UI (`App.tsx`, `Orchestrator.tsx`, `CLCDashboard.tsx`)**:
  - Standard React local state (`useState`).
  - No hidden global state pollution.
  - `useEffect` intervals in `CLCDashboard.tsx` are correctly cleaned up with `clearInterval()`.
- **Python Core**:
  - Instances maintain an internal history list `self.memory`.
  - Methods do not mutate module-level globals.

---

## 6. Dependencies & Coupling Assessment

- **Coupling**: The Python templates inside `src/lib/harvester.ts`, `multi_kernel_code.ts`, and `hodge_integration.ts` are stored as template string constants in TypeScript.
  - *Risk*: A syntax error in a string template does not get caught by TypeScript's compiler (`tsc`).
  - *Mitigation*: We created `tests/test_exported_modules.py` which dynamically extracts and compiles each template string via Python's `compile()` during CI.
- **Unused Packages**: `@google/genai`, `better-sqlite3`, `dotenv`, and `express` in `package.json` are inactive. They should be documented as legacy/dormant.
