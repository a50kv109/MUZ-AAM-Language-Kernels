# Engineering Roadmap

This roadmap governs the incremental evolution of the `Language Kernels Collection`. To prevent premature abstraction, each phase requires verified empirical data before generalized engines are implemented.

---

## Phase 1: Stabilization & Architectural Continuity (COMPLETED)
- [x] Establish independent package configuration (`package.json`, `tsconfig.json`).
- [x] Align shared operation contracts (`AnalyzeTextRequest`, `ListCapabilitiesResponse`, etc.).
- [x] Standardize capability status taxonomy (`declared`, `implemented`, `verified`, `experimental`, `planned`).
- [x] Restore complete Italian terminology inventories (65 Music Literacy + 29 Poetics & Versification concepts).
- [x] Harden Ukrainian orthographic syllable strategy (v0.2.0) with edge-case handling and foreign token detection.
- [x] Build reproducible strict-assertion unit test suite.
- [x] Achieve clean TypeScript typechecking (`tsc --noEmit`).

---

## Phase 2: Lexical Stress & Metrical Foundations (In Progress — Contracts Integrated)
- [x] **Lexical Stress Dictionary Interface Contract**:
  - Integrated `ILexicalStressDictionary` interface (`shared/interfaces/lexical_stress.ts`).
  - Formalized provenance tracking (`dictionary`, `expert_review`, `corpus`, `rule_based`, `unknown`), ambiguity preservation, and zero-based vowel indexing.
- [x] **Metrical Template Schema Contract**:
  - Integrated `MetricalTemplate` declarative contract (`shared/interfaces/metrical_templates.ts`).
  - One-based syllable position schema with `draft` / `source_documented` / `expert_reviewed` / `empirically_validated` evidence levels.
  - Added illustrative unvalidated schema example (`examples/metrical-template.example.json`).
- [ ] **Empirical Dictionaries & Culture-Specific Templates** (Pending):
  - Ingestion of verified dictionary entries for Ukrainian mobile dynamic stress.
  - Formalization of specific tradition templates (Kolomyika 14-syllable, Dumy, Italian hendecasyllable) backed by traceable academic sources.
- [ ] **Knowledge Verification**:
  - Independent validation of Ukrainian song rhythmic models against academic ethnomusicological corpora.


---

## Phase 3: Music Notation & Text–Music Alignment (Planned)
- [ ] **SMuFL / MusicXML Alignment**:
  - Map Italian expression, dynamic, and tempo terms to SMuFL glyphs and MusicXML direction types.
  - Provide machine-readable lookup for Audiveris OCR and MuseScore plugins.
- [ ] **Melopoetic Alignment Rules**:
  - Formalize text-underlay rules (syllable-to-note binding, melisma detection, synalepha in singing).
  - Draft `SYN-ALIGN` computational contract based on Italian and Ukrainian vocal conventions.

---

## Phase 4: Engine Generalization & Cross-Language Benchmarking (Future)
- [ ] **Abstract `MetricVerifier`**:
  - Extract multi-language metrical verification engine only after both Italian and Ukrainian rule sets have independent test suites.
- [ ] **Rhyme Analysis Engine**:
  - Formulate phonetic rhyming engine (accounting for Ukrainian assonances and Italian rime baciata/alternate).
- [ ] **Cross-Language Test Harness**:
  - Automated benchmark measuring accuracy across multilingual corpora.
