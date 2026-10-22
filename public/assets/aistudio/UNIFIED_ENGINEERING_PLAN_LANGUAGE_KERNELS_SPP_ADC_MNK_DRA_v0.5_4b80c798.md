# Unified Engineering Decisions Plan — Language Kernels, SPP, ADC, SOL-2, MNK and DRA

**Version:** v0.5  
**Date:** 2026-10-22  
**Status:** Unified primary working plan; language-kernel principles, MNK and DRA integration are consolidated; mixed evidence levels are explicitly marked  
**Purpose:** Maintain one primary plan for architecture decisions and preparation for Google AI Studio. This document extends the existing four-section plan; it does not replace those sections with a separate plan.

## Status vocabulary

- **VERIFIED** — reproduced by a test or checked directly against an authoritative primary source.
- **SUPPORTED** — backed by available evidence or a strong architectural rationale, but not yet validated end-to-end in this project.
- **PRELIMINARY** — plausible working rule that still needs evidence.
- **PROPOSAL** — an option awaiting explicit acceptance.
- **REQUIRED DESIGN** — a design obligation before implementation.
- **UNVERIFIED** — a claim that has not been independently checked.

---

# 1. SPP architecture

## 1.1 Purpose and boundaries

**SPP — Semantic Preservation Protocol v0.1** coordinates transformations while preserving meaning and explicit constraints. It is an orchestration and verification protocol, not a universal deep-analysis pass that must run for every input.

Related responsibilities:

- **SPP:** semantic-preservation workflow, passport, audit and recovery.
- **ADC — Adaptive Depth Controller:** selects the minimum sufficient processing depth.
- **Language kernels:** language-specific grammar, usage, terminology and contextual knowledge.
- **Domain modules / kernels:** formal domain-specific structures and rules, such as musical notation.
- **SOL-2:** canonical structural vocabulary and translation between intent and explicit structural representations. Confirm the authoritative primitive set against the project's primary SOL-2 source before freezing it.

## 1.2 Adaptive processing depths

| Level | Intended use | Working behavior |
|---|---|---|
| L0 | Direct, low-risk transformation | Minimal transformation plus mandatory invariant checks |
| L1 | Local contextual adaptation | Resolve local phrasing/context without whole-document analysis |
| L2 | Semantic ambiguity, idiom, culturally dependent meaning | Semantic cycle and semantic passport |
| L3 | Whole-work or cross-section dependencies | Structural analysis of relations across the complete work |

**Core rule:** processing depth is selected by risk, semantic structure and observable need—not by input length alone.

## 1.3 Mandatory GATE checks

Run appropriate deterministic checks at every depth:

- numbers, units and numeric formatting;
- placeholders, tags and protected spans;
- technical/legal modality and negation;
- critical safety signals;
- explicit formatting or length constraints;
- required structure and output schema, where applicable.

Keep deterministic checks separate from LLM-based semantic judgments. A deterministic pass can verify exact invariants but cannot, by itself, prove linguistic or musical correctness.

## 1.4 Escalation and recovery

Escalate when there is observable ambiguity, meaning loss, a constraint violation, conflicting requirements, or a dependency on relations across larger parts of the work. Bound retries and request missing context if repeated processing cannot resolve the issue.

A retry limit of three is a **PROPOSAL**, not a verified universal threshold.

## 1.5 Evidence limits

A small eight-case exploratory report supported the plausibility of routing simple UI text to L0, local titles to L1, idioms/cultural content to L2, and whole-work metaphor dependencies to L3. It does **not** establish statistically reliable savings, universal thresholds, or independent correctness. Claims of 60–80% cost savings remain **UNVERIFIED**. The experiment should be repeated with a defined test set, independent evaluation and recorded costs before making performance claims.

---

# 2. ADC-01–08 decision register

| ID | Decision / rule | Status | Notes |
|---|---|---|---|
| ADC-01 | Choose minimum sufficient depth L0–L3 | SUPPORTED | Architectural rule |
| ADC-02 | Do not run L2 for every simple string | SUPPORTED | Consistent with exploratory TC-1 |
| ADC-03 | Separate deterministic checks from LLM semantic assessment | REQUIRED DESIGN | Keep distinct results and failure reasons |
| ADC-04 | Escalate on meaning loss, constraint violation or unresolved ambiguity | PRELIMINARY | Convert into explicit routing predicates and tests |
| ADC-05 | Use L1 local adaptation for short titles when sufficient | SUPPORTED | Do not infer level from length alone |
| ADC-06 | Use L3 when meaning depends on relations between parts | PRELIMINARY | Supported by TC-8; needs broader tests |
| ADC-07 | Bound retries and request context when stuck | PROPOSAL | Exact retry count is not yet validated |
| ADC-08 | Avoid excessive runtime before need is demonstrated | SUPPORTED | Build the smallest testable pipeline first |

---

# 3. Preparation sequence for Google AI Studio

Do not begin with a broad implementation. Agree and test the contracts in this order:

1. **Purpose and boundaries:** define SPP, ADC, language kernels, domain modules and SOL-2 responsibilities.
2. **ADC contract:** define inputs, observable routing features, depth-selection outcomes, escalation and stopping conditions.
3. **Semantic passport:** define fields for intended meaning, constraints, transformations, unresolved ambiguity and cross-part dependencies.
4. **GATE contract:** specify deterministic checks separately from semantic judgments; define error codes and fail behavior.
5. **Language-kernel contract:** define manifest, domain/language data boundaries, validation method, provenance and export format.
6. **Domain-kernel interface:** specify how a domain module is invoked and what typed result/errors it returns; do not make every language kernel depend on one domain.
7. **Tests:** create positive, negative, boundary and regression cases; include escalation, retry exhaustion and missing-context behavior.
8. **Independent review:** verify source references, test claims, primitive names and license/provenance records.
9. **Implementation package:** only after the contracts are agreed, prepare repository structure, implementation tasks and acceptance criteria.

No repository changes, commits, pushes or publication are implied by this plan.

---

# 4. Runtime principles

1. Minimum sufficient processing; depth is risk/structure-driven, not length-driven.
2. Deterministic invariants and semantic judgments are separate evidence channels.
3. Every transformation should preserve traceability to input, constraints, selected depth and validation result.
4. Fail visibly when required context or invariants are missing; do not silently invent certainty.
5. Keep bounded retries and explicit stop conditions.
6. Language kernels and domain kernels are independently testable and reusable.
7. Domain modules are optional capabilities, not mandatory dependencies for every text task.
8. A stable interface comes before a large runtime.
9. Deterministic execution does not prove domain correctness; correctness needs suitable ground-truth tests.
10. Mark every claim as VERIFIED, SUPPORTED, PRELIMINARY, PROPOSAL or UNVERIFIED as appropriate.

---

# 5. New architectural decision: Music Notation Kernel (MNK)

## 5.1 Decision summary

**MNK — Music Notation Kernel v0.1** is a proposed independent, headless domain module for formal musical notation. It provides canonical notation objects, pitch/rhythm rules and validation to language kernels, AI agents and applications through an explicit contract.

**Responsibility split:**

- A **language kernel** handles language-specific musical terminology, labels, explanations and usage.
- **MNK** handles formal notation structures and rules: staff position, pitch spelling, accidentals, durations, measures and validation.
- **Adapters** handle interchange and visual presentation.
- **SPP/ADC** decide how much semantic processing is needed; MNK does not force all musical text through a deep semantic cycle.

This is an architectural decision for the plan. The module is not yet implemented, and its domain contract is not yet fully verified by executable tests.

## 5.2 MNK v0.1 scope proposal

Initial scope should remain deliberately small:

- five-line staff;
- treble G-clef, bass F-clef and alto C-clef;
- diatonic note spelling and explicit octave convention;
- natural, sharp, flat, double-sharp and double-flat representation;
- exact rational durations, dots and selected tuplets;
- basic time signatures, initially 2/4, 3/4, 4/4 and 6/8;
- single, double and final barlines;
- monophonic validation path first; chord-capable data types may be prepared, but chord semantics are not required for the first passing prototype;
- unit tests and deterministic semantic validation;
- no GUI/editor requirement in the core.

Import/export via MusicXML 4.0 remains a **PROPOSAL** for an adapter, not a required dependency of the core.

## 5.3 Proposed module skeleton

```text
mnk-core/
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── schema/
│   │   ├── Pitch.ts
│   │   ├── Rational.ts
│   │   ├── Duration.ts
│   │   ├── Clef.ts
│   │   ├── Accidental.ts
│   │   ├── Note.ts
│   │   ├── Rest.ts
│   │   ├── Measure.ts
│   │   └── Score.ts
│   ├── rules/
│   │   ├── pitch-calculator.ts
│   │   ├── accidental-state.ts
│   │   ├── duration-rules.ts
│   │   └── measure-rhythm-validator.ts
│   ├── geometry/
│   │   ├── staff-coordinate.ts
│   │   └── pitch-to-staff-step.ts
│   ├── validation/
│   │   ├── structure-validator.ts
│   │   ├── semantic-report.ts
│   │   └── error-codes.ts
│   ├── registry/
│   │   └── smufl-glyph-registry.ts
│   └── adapters/
│       ├── rendering/       # optional; separate from core
│       └── musicxml/        # optional import/export adapter
└── tests/
    ├── pitch-calculator.test.ts
    ├── accidental-state.test.ts
    ├── rational-duration.test.ts
    └── measure-rhythm-validator.test.ts
```

This is a proposed skeleton, not a claim that these files already exist. Keep dependencies between `schema`, `rules`, `geometry`, `validation` and adapters one-directional where possible. The domain core must not require MuseScore, a GUI framework, a font renderer or MusicXML to calculate pitch and validate basic measures.

## 5.4 Core mathematical contract

### Staff coordinate

Use an integer `staffStep` where every adjacent line/space position changes by one diatonic step:

- `s = 0`: bottom line;
- `s = 1`: space above bottom line;
- `s = 2`: second line;
- `s = 8`: top line;
- negative values: below staff;
- values above 8: above staff.

Given a clef anchor `(s_ref, d_ref)`:

`d_note = d_ref + (s_note - s_ref)`

The staff coordinate determines a diatonic position. It does not by itself determine the sounding semitone; key signature and local accidental resolution must be applied separately.

### Important correction before implementation

The supplied draft's anchor values and octave arithmetic must be normalized and tested before being treated as canonical. In particular, its claimed values `C0 = 0`, `C4 = 28`, and its MIDI formula need one explicitly defined octave convention and a verified lookup table. Do not combine modulo arithmetic with negative indices without floor-division/modulo behavior defined for negative integers.

Required anchor tests include:
- treble clef: bottom line E4; second line G4;
- bass clef: bottom line G2; fourth line F3;
- alto clef: middle line C4; bottom line F3.

The clef anchor `d_ref` values must agree with the chosen diatonic indexing scheme. No numeric mapping is marked VERIFIED until these examples pass tests.

### Pitch-to-MIDI stages

1. Resolve staff position to diatonic letter and octave under the selected clef.
2. Resolve key signature and local accidental.
3. Convert spelled pitch to MIDI using a documented octave convention and a tested natural-note lookup table.
4. Apply accidental semitone offset.
5. Preserve spelling separately from sounding MIDI pitch (e.g. enharmonic spellings need not be collapsed in the semantic model).

### Accidentals

Use an explicit accidental domain capable of at least `-2, -1, 0, +1, +2` semitones. The state engine must distinguish:

- key signature defaults;
- explicit local accidental on a note;
- persistence rules within a measure and octave;
- cancellation by natural signs;
- double accidentals;
- reset at barline;
- enharmonic spelling and note identity.

The draft's proposed `measureMap.set(d_note, A)` is not sufficient as a final contract until the identity key is explicitly defined. Use a canonical pitch-spelling key (letter + octave) or an equivalent typed key; do not key state only by a potentially ambiguous integer. Verify persistence behavior against the intended notation conventions and test it.

### Rational durations and measures

Represent duration as a reduced rational number with positive denominator and explicit normalization rules. Avoid floating-point arithmetic for rhythmic equality.

Examples:
- quarter note = `1/4` of a whole note;
- dotted duration = base duration multiplied by `3/2`;
- three eighth-note triplet notes occupying two eighths each have duration `1/12` of a whole note.

The measure validator must distinguish:
- full measure;
- explicitly permitted pickup/incomplete measure;
- overflow (`RHYTHM_CAPACITY_EXCEEDED`);
- tuplets and dots after their durations have been normalized.

The exact meaning of `timeSignature` must be specified (e.g. numerator/denominator versus normalized whole-note capacity); do not store a bare `Rational` without documenting its semantics.

## 5.5 Symbol registry, rendering and interchange

- **SMuFL:** use canonical glyph names as symbol identifiers where appropriate; glyph identifiers are not substitutes for semantic note objects.
- **Bravura:** candidate SMuFL font and metadata resource. Confirm exact files and preserve license notices and provenance. Do not describe license terms as a blanket guarantee for every asset or usage.
- **Rendering:** keep staff lines and layout geometry separate from glyph selection; the rendering adapter may use glyphs or geometry depending on the element.
- **MusicXML 4.0:** proposed import/export adapter, isolated from the internal domain model.
- **MuseScore Studio 4.7.x:** reference architecture for study only. Verify source paths against the exact release tag before citing particular classes/files as facts. Do not copy code merely because it is a useful architectural reference.

## 5.6 Validation layers

Keep at least three separate validation outcomes:

1. **Structural validation:** object shape, required fields, valid rational denominators and legal references.
2. **Musical semantic validation:** clef/pitch interpretation, accidental resolution, duration and measure capacity.
3. **Visual/layout validation:** staff coordinates, glyph availability, collision/spacing constraints when a renderer exists.

Passing structural validation does not imply that a musical passage is correct or visually well laid out.

## 5.7 MNK decision register

| ID | Decision | Status | Next verification |
|---|---|---|---|
| MNK-01 | Independent headless notation core | SUPPORTED | Keep core tests runnable without GUI or editor |
| MNK-02 | Study MuseScore 4.7.x as a reference, not a dependency | SUPPORTED | Verify paths against exact tag |
| MNK-03 | Use SMuFL glyph names as canonical symbol identifiers where suitable | SUPPORTED | Validate registry and missing-glyph behavior |
| MNK-04 | Evaluate Bravura metadata/font for rendering adapter | SUPPORTED | Confirm actual files, version and license notices |
| MNK-05 | MusicXML 4.0 import/export adapter | PROPOSAL | Define round-trip scope and fixtures |
| MNK-06 | Exact rational durations | SUPPORTED | Test normalization, comparison, dots and tuplets |
| MNK-07 | Separate schema, rules, geometry, validation and adapters | SUPPORTED | Enforce dependency boundaries |
| MNK-08 | Minimal v0.1 scope: three clefs and basic rhythms | PROPOSAL | Accept scope before implementation |
| MNK-09 | Integer `staffStep` coordinate | REQUIRED CORRECTION | Add cross-clef anchor tests |
| MNK-10 | Explicit `AccidentalState` with measure context | REQUIRED DESIGN | Define identity key and persistence rules |
| MNK-11 | Separate structural, semantic and visual validation | REQUIRED DESIGN | Define reports and error codes |
| MNK-12 | Third-party license/provenance register | REQUIRED DESIGN | Record source, version, license and usage |
| MNK-13 | Explicit diatonic/MIDI octave convention | REQUIRED DESIGN | Freeze convention and test natural-note mapping |
| MNK-14 | Explicit measure capacity and pickup semantics | REQUIRED DESIGN | Define time-signature representation and edge cases |

## 5.8 MNK prototype acceptance tests

The first TypeScript prototype should implement only the smallest end-to-end vertical slice.

**Pitch calculation**
- Verify each of the three clef anchors and all five staff lines.
- Verify every intervening space increments/decrements by exactly one diatonic step.
- Verify positions below and above staff, including ledger-line positions.
- Verify MIDI mapping against a documented convention and known reference pitches.
- Verify enharmonic spellings can remain distinct even when they map to the same MIDI number.

**Accidental state**
- Explicit accidental overrides key-signature default.
- Later same-spelling note in the same octave follows the specified measure rule.
- Different octave does not inherit the state when the convention requires octave-specific scope.
- Natural sign cancels an earlier alteration as specified.
- State resets at a barline.
- Double sharp/flat works.
- Key signature defaults apply when there is no active local accidental.

**Rational rhythm**
- Fraction reduction and comparison are exact.
- Dotted values are exact.
- Triplet duration is exact.
- Full measure passes; permitted pickup passes; unpermitted incomplete measure fails; overflow fails with a stable error code.

**Definition of done:** tests pass, mapping conventions are documented, error reports are deterministic, and no claim of full music-notation support is made beyond the tested scope.

---

# 5.9. Immediate next actions

1. Freeze this plan as the current working baseline, with the status distinctions above.
2. Resolve the diatonic-index/MIDI octave convention and correct all clef anchor constants.
3. Write the TypeScript contract and acceptance tests before implementing rendering or interchange.
4. Implement `pitch-calculator.ts` and `accidental-state.ts` as the first vertical slice.
5. Add the rational-duration and measure validator.
6. Only then decide whether to add SMuFL/Bravura rendering and MusicXML import/export.
7. Add MNK to the language-kernel architecture as an optional reusable domain module, with an explicit interface and no hard dependency from every language kernel.

# 6. Language-kernel design principles

Этот раздел связывает SPP/ADC с архитектурой AAM-Language-Kernels и задаёт общие требования к языковым ядрам, не подменяя их языковой спецификой.

## 6.1 Language kernel is a reusable module

Языковое ядро — не просто словарь. В зависимости от назначения оно может включать:

- описание языка и границы применимости;
- грамматику, морфологию, синтаксис, фонетику и семантические сведения в нужном объёме;
- доменную терминологию и контекстные правила;
- метаданные, паспорт и сведения о происхождении данных;
- тесты, известные ограничения и журнал аудита;
- стандартизированный экспорт/пакетирование для повторного использования.

Не каждое ядро обязано содержать все возможные оси анализа. Состав осей выбирается по языку, домену и проверяемой задаче. Универсальный шаблон должен задавать точки расширения, а не навязывать идентичный внутренний состав всем языкам.

## 6.2 Separation of concerns

Разделять как минимум:

1. **Language data** — языковые факты, формы, термины и примеры.
2. **Rules** — формальные правила обработки и интерпретации.
3. **Algorithms/runtime** — исполняемые алгоритмы и orchestration.
4. **Tests/evidence** — эталонные примеры, тесты, источники и результаты проверки.
5. **Metadata/provenance** — версия, лицензия, источник, статус и ограничения.

Языковые данные не должны незаметно подменять алгоритмическую логику; алгоритм не должен выдавать демонстрационные показатели за измеренные лингвистические результаты.

## 6.3 Domain modules are optional capabilities

Доменные модули подключаются к языковым ядрам через явный контракт. Они не должны превращать все языковые ядра в одинаковые доменные системы и не должны быть обязательной зависимостью для задач, которым они не нужны.

Пример: музыкальное языковое ядро отвечает за языковые названия, термины и объяснения, а MNK — за формальную модель нотной записи и проверяемые правила.

## 6.4 Evidence and metric discipline

- Детерминированность вычисления не доказывает лингвистическую или доменную корректность.
- Показатели вроде TDI, Coherence, θ, Φ или других интегральных метрик нельзя объявлять универсальными метриками сохранения смысла без определения формулы, набора данных, процедуры измерения и независимой проверки.
- Псевдослучайные embeddings, упрощённое извлечение понятий и демонстрационные UI-метрики должны быть явно маркированы; они не являются доказательством полноценного семантического анализа.
- Каждое ядро должно иметь тесты, описывающие область валидности, отрицательные случаи и известные ограничения.

## 6.5 Packaging and reuse

Предлагаемый минимум артефактов языкового ядра:

- `README.md` — назначение и быстрый обзор;
- manifest/passport — язык, версия, домены, зависимости, лицензии и статус;
- файлы данных и правил;
- тестовый набор и инструкции проверки;
- `evidence_inventory` или эквивалентный реестр источников;
- список ограничений/известных отказов;
- экспортируемый формат и правила совместимости версий.

Конкретная структура файлов остаётся адаптируемой под репозиторий и тип ядра.

---

# 7. Unified integration view: Language Kernels + SPP/ADC + MNK

MNK включён в общий план как специализированный доменный модуль, а не как отдельный параллельный план и не как замена языковым ядрам.

```text
User / Agent Request
        |
        v
SPP orchestration <----> ADC (L0–L3 depth selection)
        |
        +---- Language Kernel
        |       language-specific grammar, terminology, context
        |
        +---- Optional Domain Kernel
        |       e.g. MNK for formal music notation
        |
        +---- SOL-2 structural representation (primitive set to be verified)
        |
        v
GATE + relevant domain/language validation
        |
        v
Result + traceable validation report
```

This is a conceptual integration view. It does not claim that this runtime has already been implemented.

## 7.1 MNK contract with language kernels

**Language kernel responsibilities:**
- language-specific names and spelling of musical terms;
- localized explanations, labels and educational language;
- contextual and linguistic ambiguity handling.

**MNK responsibilities:**
- canonical notation objects and staff coordinates;
- clef-relative diatonic pitch mapping;
- accidental state and key-signature rules;
- exact rhythmic durations and measure validation;
- notation-specific structural/semantic checks;
- stable error codes and machine-readable validation results.

**Adapters responsibilities:**
- SMuFL glyph registry and optional Bravura rendering resources;
- rendering/layout integration;
- optional MusicXML import/export.

The language kernel should call MNK only when the task requires formal notation interpretation, construction or validation. Plain translation of a sentence about music does not automatically require MNK.

## 7.2 Interface principles

- Use typed input/output contracts and stable error codes.
- Return validation findings separately from explanatory prose.
- Preserve original notation spelling when it carries meaning; do not reduce all enharmonic spellings to MIDI alone.
- Keep the core headless and testable without GUI, MuseScore, font rendering or MusicXML.
- Record version and provenance for external symbol/font resources.
- Treat rendering and interchange as adapters, not as the semantic source of truth.

---

# 7.1. Original integrated work sequence

1. Confirm the unified plan as the current working baseline.
2. Verify SOL-2's canonical primitive set against the primary project source.
3. Formalize the SPP/ADC contracts and routing tests.
4. Define the common language-kernel manifest, evidence and packaging requirements.
5. Finalize MNK pitch indexing and MIDI octave convention; test clef anchors.
6. Specify and test `AccidentalState`, including local scope, key signatures and barline reset.
7. Implement exact rational durations and measure-capacity validation.
8. Run language-kernel and domain-kernel tests independently, then test their interface.
9. Add optional SMuFL/Bravura rendering and MusicXML adapters only after core tests pass.
10. Prepare the Google AI Studio implementation package with acceptance criteria and explicit evidence statuses.

**Current boundary:** this document is the unified planning/specification baseline. It does not claim that MNK, SPP/ADC runtime integration, or all language-kernel contracts have been implemented or independently verified.


---

# 8. Deterministic Reasoning Anchor (DRA) and shared domain-tool interaction

## 8.1 Purpose and status

**DRA — Deterministic Reasoning Anchor** is a reasoning pattern in which an agent independently identifies a formalizable part of a task, decides whether external deterministic verification is useful, projects that part into a tool's input contract, receives a bounded result, separates tool-verified facts from interpretation and hypotheses, and updates its reasoning.

DRA is not generic tool calling and is not itself a musical, geometric, graph or constraint-solving engine.

- **EIR — Externalized Instrumental Reasoning** is the proposed broader class: externalizing a part of reasoning to a deterministic instrument.
- **DRA** is the specific observable cycle described in this section.
- **DRA Gateway** is a proposed software boundary that exposes available tool capabilities through explicit contracts and records invocation/result provenance. It is an implementation proposal, not an already verified component.

**Evidence status:** the supplied project note reports DRA as **OBSERVED** in geometry, graph and constraint-solving experiments. Generalization to all domains remains **GENERALIZATION / HYPOTHESIS**, not a universal law. These observations should be linked to reproducible experiment records before being used as acceptance evidence.

## 8.2 DRA cycle

1. **Problem:** receive the applied task in natural language or a structured request.
2. **Structural recognition:** identify candidate formal structures such as geometry, graph relations, constraints, symbolic expressions or notation.
3. **Applicability decision:** decide whether a deterministic tool can materially improve reliability. Explicitly allow a justified decision not to call a tool.
4. **Semantic projection:** map only the relevant task fragment to the tool's typed input. The projection is a model of the task, not proof that the model fully captures reality.
5. **Deterministic operation:** execute a bounded operation with a documented contract.
6. **Epistemic separation:** record the tool's actual finding separately from agent interpretation and hypothesis.
7. **Reasoning update:** accept, reject or refine the working hypothesis based on the result and its scope.

The pattern succeeds only when the tool result can change or constrain the subsequent reasoning. A tool call that is irrelevant, redundant or not used in the update is not sufficient evidence of DRA behavior.

## 8.3 Epistemic result contract

Every DRA-capable integration should preserve these categories:

- **TOOL-VERIFIED FACT:** exactly what the deterministic operation checked and returned.
- **AGENT INTERPRETATION:** the meaning assigned to that result in the applied task.
- **AGENT HYPOTHESIS:** an unverified explanation, approximation or proposed next step.

Also preserve:
- tool/module ID and version;
- operation name;
- input or a privacy-safe trace of the projected input;
- result status and machine-readable evidence;
- validation errors or limits;
- the assertion to which the result applies;
- whether the agent updated its conclusion and why.

A deterministic result is authoritative only within the operation's actual contract. For example, a measure-capacity check does not prove that a complete musical score is correct.

## 8.4 DRA Gateway: proposed boundary

The proposed Gateway should:
- publish discoverable capabilities and their input/output schemas;
- validate inputs before execution;
- invoke only operations supported by the target module;
- preserve tool identity, version, operation and result provenance;
- return structured findings and stable error codes, not only prose;
- distinguish `VERIFIED`, `REFUTED`, `INCONCLUSIVE` and `INVALID_INPUT` where those states are meaningful;
- make refusal/no-call a valid outcome and permit a short reason code;
- never silently upgrade an agent interpretation into a tool-verified fact.

The Gateway should not contain domain rules that belong inside MNK or another domain kernel. Nor should each language kernel implement its own copy of DRA orchestration.

A possible typed result shape (illustrative only, not a frozen API):

```ts
type DRAStatus =
  | "VERIFIED"
  | "REFUTED"
  | "INCONCLUSIVE"
  | "INVALID_INPUT";

interface DRAResult<TInput, TResult> {
  toolId: string;
  toolVersion: string;
  operation: string;
  input: TInput;
  status: DRAStatus;
  result?: TResult;
  evidence?: unknown;
  limitations?: string[];
}
```

Interpretation and hypotheses may be stored in an orchestration trace alongside this result, but must remain explicitly attributed to the agent rather than embedded as if they were tool output.

## 8.5 Relationship to SPP, ADC, language kernels and domain kernels

- **SPP** orchestrates meaning-preserving transformation, constraints, audit and recovery.
- **ADC** selects processing depth L0–L3 according to task risk and structure.
- **DRA** decides whether a task fragment should be externalized for deterministic verification.
- **DRA Gateway** is the proposed interface boundary for discovering/invoking deterministic capabilities.
- **Domain kernels** execute domain-specific formal operations and own their rules.
- **Language kernels** supply language-specific terms, grammar, context and localized explanations.

ADC and DRA are complementary, not interchangeable. ADC asks how much processing is needed; DRA asks whether a specific part of the task should be made externally verifiable. A high ADC level does not automatically require a tool call, and a low level does not forbid one when an exact invariant must be checked.

## 8.6 MNK as the first integration example

MNK remains an independent, headless music-notation domain kernel. It does not depend on DRA internally. DRA may choose to invoke a supported MNK operation when a request contains formal notation questions.

Example flow:
1. A user asks to identify a note and check whether a measure's rhythmic capacity is valid.
2. The agent identifies note spelling and measure capacity as formalizable fragments.
3. DRA chooses the relevant MNK operations, or explicitly declines a call if required structured input is absent.
4. MNK returns its pitch/measure findings and any limitations.
5. The agent separates those findings from its explanation.
6. One or more language kernels express the same verified musical result in their own language.

The same MNK result can be reused by multiple language kernels. It should not be recomputed merely to translate the explanation into another language, unless a language-specific ambiguity changes the required domain query.

## 8.7 Language-kernel access and broadcast policy

Do **not** broadcast every raw tool result indiscriminately to every language kernel. Use a shared domain result/contract that authorized language kernels can consume when relevant.

Recommended model:
- one domain kernel produces a canonical structured result;
- a common interface makes that result available to the orchestration layer;
- each selected language kernel receives only the fields required for its task;
- language-specific phrasing remains owned by the language kernel;
- provenance and the boundary between fact and interpretation remain attached.

This is shared capability access, not a hard dependency from every language kernel to every domain kernel.

## 8.8 DRA acceptance criteria

Before claiming DRA support, test both tool use and tool refusal.

- Positive cases: agent identifies a formal structure, selects an appropriate tool, supplies a valid projection and uses the result to update its conclusion.
- Negative cases: agent declines an unnecessary tool, recognizes a mismatch between task and tool, or requests missing structured input.
- Epistemic-boundary cases: agent does not describe unsupported inferences as tool-verified facts.
- Failure cases: invalid input, inconclusive result, tool error and unsupported operation remain visible.
- Cross-language case: one canonical MNK result is explained by at least two language kernels without changing the underlying domain facts.
- Regression case: the same input and tool version produce the same deterministic tool result.

Success is not measured only by the number of tool calls. It includes correct non-use, faithful projection, correct interpretation boundaries and observable improvement to the reasoning update.

---

# 9. Google AI Studio handoff: staged implementation plan

This section turns the architecture into a sequence of bounded tasks for continuing the existing repository. It is not permission to create a parallel repository or replace the current language-kernel architecture.

## 9.1 Repository continuity rule

Continue the existing `AAM-Language-Kernels` / `language-kernels-collection` work and inspect the current repository before editing. Preserve existing files and behavior unless a change is explicitly justified. Do not assume the repository state from an old snapshot; first report the actual tree, tests, existing interfaces and uncommitted changes available in the working environment.

The builder/collection separation should remain explicit:
- language-specific knowledge and terminology live in language/domain data modules;
- shared contracts and orchestration interfaces live in shared interfaces or runtime layers;
- domain kernels such as MNK remain optional capabilities;
- tests and provenance records accompany new contracts and data.

## 9.2 Ordered Google AI Studio tasks

### Stage 0 — Inspect, do not modify
Ask Google AI Studio to inspect the existing repository and report:
- current directory/tree and key entry points;
- existing language-kernel schema/manifest and registry;
- existing shared interfaces, if any;
- reusable code and tests (including any archived metric/rhyme engines);
- current tests and their actual results;
- missing pieces and conflicts with this plan.
Output an inventory and proposed file-level change list only. No edits yet.

**Gate:** accept the inventory only if each claim points to an actual file, symbol, test or command output.

### Stage 1 — Contracts before implementation
Define and review:
- language-kernel manifest and capability declaration;
- domain-kernel capability contract;
- DRA request/result/trace contract;
- status vocabulary and stable error codes;
- provenance/version fields;
- explicit no-call/refusal representation.
Do not implement a large orchestration runtime at this stage.

**Gate:** examples and schema tests cover success, refusal, invalid input, inconclusive result and tool error.

### Stage 2 — Minimal DRA vertical slice with a mock tool
Implement the smallest runnable path using a deterministic mock tool before coupling to MNK:
- task fragment → applicability decision → typed projection → mock deterministic operation → epistemic separation → reasoning update trace.
- include a valid no-call path.
- keep the mock visibly labelled as a test fixture, not a real domain engine.

**Gate:** tests demonstrate both appropriate tool use and appropriate refusal, and distinguish tool result from agent interpretation/hypothesis.

### Stage 3 — MNK core vertical slice
Only after resolving MNK's diatonic indexing and octave convention:
- implement clef anchors and pitch calculation;
- implement accidental state and barline reset;
- add exact rational duration and measure-capacity validation.
Use deterministic unit tests and stable machine-readable findings. Do not start with rendering, GUI, MusicXML or a large score editor.

**Gate:** all specified anchor, accidental, rational and measure-boundary tests pass.

### Stage 4 — Connect DRA Gateway to MNK
Expose only a small, explicit set of MNK operations through the domain-kernel contract. Validate the projected input and preserve operation/version/provenance. Ensure the tool result says precisely what was checked.

**Gate:** end-to-end tests cover valid request, invalid request, inconclusive case, tool error and an interpretation that must not be promoted to fact.

### Stage 5 — Cross-language consumption
Use the same canonical MNK result with two existing language kernels (choose from languages actually present in the repository). Verify that:
- musical facts remain unchanged;
- terms and explanatory prose may differ by language;
- language kernels do not reimplement MNK rules;
- no unnecessary broadcast or hard dependency is introduced.

**Gate:** compare the canonical domain result before and after each language rendering; add regression tests.

### Stage 6 — Evidence, documentation and release readiness
Update architecture docs, registry/manifests, examples, tests and provenance inventory. Record what was actually run and what remains unverified. Do not claim general DRA capability based on one successful demonstration.

**Gate:** independent review of changed files, test output, scope limits, dependency direction, licensing and repository diff.

## 9.3 Prompt discipline for each Google AI Studio stage

For each stage, instruct the coding agent to:
1. read this plan and the current repository files before proposing changes;
2. distinguish **existing**, **proposed**, **implemented**, and **tested**;
3. name exact files and symbols behind every repository claim;
4. make the smallest change set for the current stage only;
5. add or update tests for every changed contract;
6. run relevant tests and report the exact commands and results;
7. stop at the stage gate and ask for review rather than silently advancing;
8. preserve unrelated work and avoid deleting or overwriting files without justification;
9. avoid adding dependencies unless the stage requires them and the reason is documented;
10. make no commit, push, publication or external change unless separately requested.

## 9.4 First instruction to paste into Google AI Studio

> Read the unified engineering plan, especially the repository continuity rule and Stage 0. Inspect the current repository without modifying files. Report the actual tree, existing manifests/registries/interfaces, reusable implementations, test commands and results, and the smallest file-level change proposal for Stage 1. Distinguish facts verified from files or command output from assumptions and recommendations. Do not create a new repository, do not implement DRA or MNK yet, and do not edit, delete, commit or push anything. Stop after the inventory and wait for review.

---

# 10. Updated integrated work sequence

1. Inspect the current `AAM-Language-Kernels` / `language-kernels-collection` repository and reconcile the plan with actual files.
2. Verify SOL-2's canonical primitive set against the primary project source.
3. Formalize language-kernel manifest, capability declaration, provenance and packaging requirements.
4. Define the domain-kernel and DRA contracts, including epistemic separation and a valid no-call path.
5. Build a minimal DRA vertical slice with a deterministic mock tool and tests.
6. Resolve MNK's diatonic-index/MIDI octave convention and test clef anchors.
7. Implement MNK accidental state, rational durations and measure-capacity validation.
8. Connect DRA Gateway to a small set of MNK operations and test failure boundaries.
9. Reuse one canonical MNK result through two existing language kernels and verify fact preservation.
10. Add optional SMuFL/Bravura rendering and MusicXML adapters only after core tests pass.
11. Complete independent review of tests, evidence, licensing, dependency boundaries and repository diff.

**Current boundary:** this is a consolidated planning and handoff specification. It does not claim that the DRA Gateway, MNK, SPP/ADC runtime integration or cross-language domain-result flow has already been implemented or independently verified.
