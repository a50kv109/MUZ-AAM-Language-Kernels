# Testing & Evidence Policy

## 1. Validation Status
- `declared`: Registered but unverified.
- `implemented`: Functional, but needs verification.
- `verified`: Passed documented tests.

## 2. Evidence
Every `verified` capability must be backed by tests in `/tests/`.

## 3. Current Test Results
Test: `/tests/shared/engines/syllable_analyzer.test.ts`
Status: **PASSED** (deterministic results, vowel-based heuristic).

## 4. Known Limitations
- Ukrainian syllable heuristic ignores complex phonological rules (e.g., dieresis, synaeresis).
- Stress analysis is currently a placeholder and unsafe for production use.
