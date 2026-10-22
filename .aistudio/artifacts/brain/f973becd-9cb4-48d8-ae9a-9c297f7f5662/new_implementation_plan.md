# Implementation Plan & Architecture Status: Language Kernels Collection

## 1. Repository Objective
Establish the standalone infrastructure repository, `Language Kernels Collection` (`aam-language-kernels-collection`), designed for modular reuse across music engraving/OCR (Audiveris, MuseScore), poetic analysis, localization, and creative AI agents.

Governed by the **Knowledge Before Implementation** architectural standard:
1. Domain knowledge (poetic structures, acoustic mechanics, music notation) is formalized and verified before computational engines are constructed.
2. Abstract engines (e.g. `MetricVerifier`, `RhymeEngine`, `DRA Gateway`) are not prematurely generalized until multiple language strategies have empirical, test-backed implementations.
3. Rigorous separation is maintained between factual linguistic rules and project-specific heuristics.

---

## 2. Status Snapshot: Phase 1 Stabilization (Completed)

| Component | Status | Verified Metric / Artifact |
| :--- | :--- | :--- |
| **Package Manifest** | Complete | `package.json` (`aam-language-kernels-collection` v0.1.0) with `test` and `typecheck` scripts |
| **Type Checking** | Verified | `tsconfig.json` (ES2022 / Bundler) -> `npm run typecheck` exits with **0 errors** |
| **Unit Test Suite** | Verified | `tests/shared/engines/syllable_analyzer.test.ts` -> **100% passing** (7 test suites, 30+ assertions) |
| **Public API Contracts** | Complete | `shared/interfaces/operations.ts` fully typed (`ListCapabilities`, `AnalyzeText`, `InterpretMusicText`, `Translate`, etc.) |
| **Capability Registry** | Aligned | `registry.yaml` & `shared/registry/capability.ts` aligned to canonical `CapabilityStatus` schema |
| **Italian Knowledge Base** | Complete | 65 verified Music Literacy concepts + 29 verified Poetics & Versification concepts (94 total) |
| **Ukrainian Knowledge Base** | Complete | 5 domain modules (prosody, forms, culture, song) + 1 evidence audit separating facts from OST6/9 heuristics |
| **Computational Engine** | Experimental | `UkOrthographicStrategy` v0.2.0 with boundary punctuation stripping and Latin token detection |
| **Documentation** | Aligned | `README.md`, `API_CONTRACTS.md`, `TESTING_AND_EVIDENCE.md`, `REPOSITORY_STATUS.md`, `ROADMAP.md` |

---

## 3. Engineering Roadmap

### Phase 1: Stabilization & Architectural Continuity (COMPLETED)
- [x] Package manifests, TypeScript configuration, and typecheck verification.
- [x] Resolve audit gaps (imports, phantom files, false `verified` statuses, vocabulary alignment).
- [x] Populate full Italian engineering inventories (65 music literacy, 29 poetics & versification).
- [x] Implement deterministic Ukrainian syllable analyzer with strict edge-case unit assertions.
- [x] Complete architectural documentation and validation policies.

### Phase 2: Lexical Stress & Metrical Modeling (Planned)
- [ ] Interface definition for lexical stress lookup dictionaries (Ukrainian mobile dynamic stress).
- [ ] Formal schema for metrical templates (Kolomyika 14-syllable, Dumy, Italian hendecasyllable).
- [ ] Cross-verification against academic ethnomusicological and versification corpora.

### Phase 3: Music Notation & Text–Music Alignment (Planned)
- [ ] Mapping Italian musical vocabulary to SMuFL glyphs and MusicXML direction types.
- [ ] Text-underlay and melopoetic alignment contracts (`SYN-ALIGN`) for vocal score processing.

### Phase 4: Engine Generalization & Benchmarking (Future)
- [ ] Abstract `MetricVerifier` across Italian and Ukrainian rule sets once empirical dictionaries exist.
- [ ] Phonetic rhyme analysis engine and cross-language benchmarking harness.
