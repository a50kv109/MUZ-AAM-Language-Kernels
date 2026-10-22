# Language Kernels Collection

A standalone, modular repository infrastructure for structured language knowledge, specialized linguistic capabilities, and computational interfaces for creative, musical, and engineering systems.

## 1. Overview & Architectural Role

The **Language Kernels Collection** (`aam-language-kernels-collection`) serves as an independent, pluggable linguistic substrate for external applications (e.g., Audiveris music OCR, MuseScore plugins, poetic analysis workbenches, localization pipelines, and AI agents).

It separates domain knowledge from computational code following strict **Knowledge Before Implementation** discipline:
- Linguistic knowledge, poetic structures, and musical terminologies are formalized and auditable before engines are built.
- Computational engines are introduced only with deterministic, assertion-backed verification.
- Semantic governance aligns with the **AXIS-10** framework, ensuring uniform conceptual indexing across languages.

## 2. Repository Layout

```
language-kernels-collection/
├── docs/                                # Architectural standards & governance
│   ├── API_CONTRACTS.md                 # External application request/response schemas
│   ├── ARCHITECTURE.md                  # Layered architecture & dependency boundaries
│   ├── DOMAIN_MODEL.md                  # Conceptual model and entity definitions
│   ├── REPOSITORY_STATUS.md             # Verified status snapshot & audit history
│   ├── ROADMAP.md                       # Phased development milestones
│   ├── TESTING_AND_EVIDENCE.md          # Verification tiers, test matrix & limitations
│   └── VALIDATION_POLICY.md             # Strict evidence policies for knowledge claims
├── languages/                           # Language-specific knowledge kernels
│   ├── italian/
│   │   └── engineering/
│   │       ├── music_literacy_terms.md         # 65 verified music literacy concept records
│   │       └── poetics_versification_terms.md  # 29 verified poetics & synthesis records
│   └── ukrainian/
│       ├── audit/                              # Evidence audits & reuse assessments
│       ├── culture/                            # Cultural context heuristics (OST6/OST9)
│       ├── linguistics/                        # Prosody and orthographic organization
│       ├── poetics/                            # Metrical forms (Kolomyika, Dumy)
│       └── song/                               # Rhythmic and melopoetic patterns
├── shared/                              # Language-agnostic interfaces & engines
│   ├── engines/
│   │   └── uk_syllable_strategy.ts             # Ukrainian orthographic syllable counter (v0.2.0)
│   ├── examples/
│   │   └── prototype.ts                        # End-to-end integration sample
│   ├── interfaces/
│   │   ├── engines.ts                          # Engine interfaces (ISyllableStrategy)
│   │   ├── kernel.ts                           # LanguageKernelInterface
│   │   └── operations.ts                       # External operation schemas & request/response
│   └── registry/
│       └── capability.ts                       # Capability registry & status definitions
├── tests/                               # Verification test suites
│   └── shared/
│       └── engines/
│           └── syllable_analyzer.test.ts       # Strict assertion suite for syllable strategy
├── package.json                         # Package manifest & npm scripts
├── registry.yaml                        # Machine-readable kernel & module registry
└── tsconfig.json                        # TypeScript configuration (ES2022 / Bundler)
```

## 3. Capability Status Tiers

Every operation and module is tracked under one of five canonical statuses:

| Status | Meaning | Current Examples |
| :--- | :--- | :--- |
| `declared` | Registered in contract specification; implementation unverified | `translate` (Italian) |
| `implemented` | Concrete code exists; undergoing formal verification | — |
| `verified` | Concrete implementation backed by automated assertions | Italian Terminology Inventories (65 + 29 terms) |
| `experimental` | Usable implementation with documented heuristics & known limitations | `UkOrthographicStrategy` (`analyze_text` in Ukrainian) |
| `planned` | Scoped for future roadmap phases | `interpret_music_text`, `analyze_poetry` |

## 4. Getting Started & Verification

### Prerequisites
- Node.js (v18+)
- npm

### Running Verification

```bash
# Run strict assertion test suites
npm test

# Run TypeScript compiler verification (must exit with 0 errors)
npm run typecheck
```
