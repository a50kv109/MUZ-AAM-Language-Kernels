# Reuse Assessment: Ukrainian Poetry Studio

## Audit Summary
- **Component**: `MetricVerifier`
- **Reuse Status**: EXTRACT_CORE
- **Decision**: Abstract syllabification and stress rules into `/shared/engines/metric_verifier.ts`.

- **Component**: `AAM_V2_1_Engine`
- **Reuse Status**: ADAPT_FOR_GENERIC
- **Decision**: Generalize prompt templates (e.g., OST categories) to support multiple language kernels.

- **Component**: `UkrainianRhymeModule`
- **Reuse Status**: EXTRACT_CORE
- **Decision**: Extract general rhyme pattern detection into `/shared/engines/rhyme_analyzer.ts`.

- **Component**: `PoeticStyles & Profiles`
- **Reuse Status**: LANGUAGE_KNOWLEDGE
- **Decision**: Extracted into `/languages/ukrainian/poetics/poetic_forms.md` and `/languages/ukrainian/culture/cultural_context.md`.
