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

## Phase 2: Lexical Stress & Metrical Foundations (Planned)
- [ ] **Lexical Stress Dictionary Interface**:
  - Design lightweight dictionary lookup interface for mobile dynamic stress in Ukrainian.
  - Distinguish dictionary-verified stress positions from rule-based vowel heuristics.
- [ ] **Metrical Template Modeling**:
  - Formalize Kolomyika (4+4+6 / 14-syllable) and Dumy metrical patterns in machine-readable schema.
  - Formalize Italian hendecasyllable (*endecasillabo*) stress patterns (accents on 4th/10th or 6th/10th syllables).
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
