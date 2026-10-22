# Testing & Evidence Policy

## 1. Core Principle: Evidence-Backed Claims

In accordance with the **Knowledge Before Implementation** architectural standard, no module or engine within the `Language Kernels Collection` may be marked as `verified` without verifiable, reproducible evidence:
1. **Knowledge Claims**: Must cite authoritative academic or standard sources (e.g., Open Music Theory v2, Treccani, Beltrami, Shevchenko Institute of Literature).
2. **Computational Engines**: Must be backed by automated test suites in `/tests/` with strict assertions (no non-asserted console logs).
3. **Experimental Heuristics**: Must explicitly document their assumptions, algorithmic bounds, and edge cases.

---

## 2. Validation Status Tiers

| Tier | Status | Verification Criteria |
| :--- | :--- | :--- |
| **0** | `planned` | Proposed feature or module in roadmap; no implementation or data yet. |
| **1** | `declared` | Interface or vocabulary entry registered in specifications; implementation not yet verified. |
| **2** | `experimental` | Usable implementation functioning under documented constraints or heuristics. |
| **3** | `implemented` | Concrete implementation completed; undergoing formal assertion testing. |
| **4** | `verified` | Concrete implementation passes 100% of automated unit tests and schema validations. |

---

## 3. Test Suites Snapshot

### Suite: `tests/shared/engines/syllable_analyzer.test.ts`
- **Target**: `shared/engines/uk_syllable_strategy.ts` (`UkOrthographicStrategy` v0.2.0)
- **Framework**: Node.js strict assertion library (`node:assert/strict`)
- **Status**: **PASSED** (7 sub-suites, 30+ assertions)

#### Coverage Matrix:
1. **Empty & Whitespace Inputs**:
   - `""` -> `0` syllables, `[]` ambiguous tokens.
   - `"   \t \n  "` -> `0` syllables, `[]` ambiguous tokens.
2. **Standard Ukrainian Lexicon**:
   - Monosyllabic, disyllabic, and polysyllabic words (`вода`, `поле`, `Україна`, `соловейко`, `пісня`, `думка`).
3. **Orthographic Modifiers**:
   - Apostrophe separation (`м'ясо`, `п'ять`, `з'явитися`, `сім'я`).
   - Soft sign / palatalization markers (`день`, `тінь`, `ніч`, `мальовничий`).
4. **Hyphenated Compounds**:
   - Multi-stem words (`будь-ласка`).
5. **Multi-Word Poetic Verses & Punctuation**:
   - Shevchenko's line: *"Реве та стогне Дніпр широкий,"* -> exact count `9` syllables.
   - Quoted verse: *«Думи мої, думи мої!»* -> exact count `8` syllables.
6. **Non-Vocalic Tokens (Numbers & Punctuation)**:
   - Pure digits (`12345 2026`) -> ignored (0 syllables, not ambiguous).
   - Pure punctuation (`... --- !!! ??? ,, ;:`) -> ignored.
   - Embedded numbers: *"У 2026 році народилася пісня."* -> exact count `10` syllables.
7. **Foreign Tokens & Ambiguity Detection**:
   - Pure Latin strings (`hello world`) -> `0` Ukrainian syllables, flagged in `ambiguous_tokens: ["hello", "world"]`.
   - Mixed scripts: *Слово "code" та термін "test"* -> `5` syllables, flagged: `["code", "test"]`.
   - Vowel-less acronyms (`КНР та СРСР`) -> `1` syllable, flagged: `["КНР", "СРСР"]`.

---

## 4. Italian Domain Evidence Inventory

The Italian kernel contains two fully audited and populated terminology inventories:
1. **Music Literacy** (`languages/italian/engineering/music_literacy_terms.md`):
   - **65 concepts** across 5 categories: Physical Acoustics (10), Musical Notation & Theory (20), Rhythm & Meter (10), Expression & Dynamics (15), Form & Structure (10).
   - Sourced from *Open Music Theory v2*, *Understanding Basic Music Theory*, and Italian conservatory pedagogical standards.
   - Mapped provisionally to `AXIS-01` through `AXIS-08`.
2. **Poetics & Versification** (`languages/italian/engineering/poetics_versification_terms.md`):
   - **29 concepts** across 5 categories: Poetic Syllabification & Prosody (5), Metrical Line Types (6), Rhyme & Phonic Devices (6), Fixed Stanzaic Forms (6), Text–Music Synthesis (6).
   - Sourced from Pietro G. Beltrami (*La metrica italiana*), Treccani, and Lorenzo Bianconi.

---

## 5. Separation of Cultural Categories from Facts (Ukrainian Kernel)

The evidence audit (`languages/ukrainian/audit/evidence_audit.md`) strictly segregates:
- **Linguistic Facts**: Phonological inventory, 10 Ukrainian vowel graphemes (`а, е, є, и, і, ї, о, у, ю, я`), open syllable tendency, mobile dynamic stress.
- **Project Heuristics**: Project-specific design heuristics (OST6, OST9) used in melodic generation models are documented as heuristic assumptions, preventing false generalization as universal Ukrainian cultural truths.
