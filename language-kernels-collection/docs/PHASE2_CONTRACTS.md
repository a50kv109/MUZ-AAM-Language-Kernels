# Phase 2 — Lexical Stress and Metrical Foundations

## Purpose
This phase defines data contracts needed before any generalized metrical verification engine is considered. It does not implement stress prediction, metrical scoring, or poetry classification.

## Lexical stress contract
`ILexicalStressDictionary` provides lookup only. Each result includes:
- explicit status (`found`, `not_found`, `ambiguous`, `unsupported`);
- one or more entries, preserving variants rather than silently selecting one;
- evidence provenance (`dictionary`, `expert_review`, `corpus`, `rule_based`, `unknown`);
- warnings for unresolved conditions.

Stress positions are indexed against the vowel sequence, starting at zero. Character offsets are optional because orthography and normalization can vary. An implementation must document its normalization rules before using offsets.

A `rule_based` result is not equivalent to a dictionary-confirmed result. `unknown` evidence must not be promoted to verified evidence by the caller.

## Metrical template contract
`MetricalTemplate` stores declarative pattern information. It is not an executable verifier. Each template must include an evidence status, source references, and known limitations. A template with `draft` status must not be represented as academically or empirically validated.

Syllable positions in templates are one-based. Stress dictionary vowel indices are zero-based. These are intentionally different coordinate systems and must not be mixed without an explicit conversion step.

## Required invariants for future implementations
1. Preserve ambiguity; never silently collapse multiple stress entries to one.
2. Missing dictionary data is not proof that a word has no stress pattern.
3. Rule-based inference and dictionary evidence remain distinguishable in output.
4. A metrical template is descriptive data; it does not prove that a line conforms to it.
5. Source references must be real and traceable. Do not invent citations.
6. Unknown or unsupported values must be reported explicitly.
7. Language-specific normalization and linguistic rules belong in language-specific modules, not in this shared contract.

## Scope boundary
Do not add `MetricVerifier`, `RhymeEngine`, automatic lexical stress inference, or cross-language accuracy claims in this phase. The next implementation decision depends on evidence quality and tests for the language-specific rule sets.

## Acceptance criteria
- New interfaces compile under the repository's TypeScript configuration.
- Existing operations and tests remain unchanged unless a concrete compatibility issue requires a minimal adjustment.
- No runtime behavior is claimed merely because these interfaces exist.
- Documentation identifies the contracts as definitions, not implementations.
