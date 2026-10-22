# Roadmap

## 1. Implemented & Verified
- Minimal shared interfaces (`shared/interfaces/`).
- Registry structure (`registry.yaml`).
- Deterministic vowel-based syllable analyzer (`shared/engines/uk_syllable_strategy.ts`).

## 2. Implemented & Needs Verification
- Ukrainian kernel knowledge extraction (audit pending).

## 3. Proposed (Unimplemented)
- `MetricVerifier` abstraction for Italian/Ukrainian.
- Full `RhymeEngine` implementation.
- `interpret_music_text` implementation.

## 4. Architectural Decisions Pending
- Strategy for unifying prosodic rules across language kernels.
- Formal schema definition for registry and capability manifests.
