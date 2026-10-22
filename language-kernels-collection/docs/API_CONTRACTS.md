# API Contracts

This document formalizes the public operations through which external applications (e.g., Audiveris UI/OCR, MuseScore plugins, DAWs, translation pipelines, or AI agents) interact with the Language Kernels Collection.

All contracts are defined in TypeScript under `/shared/interfaces/operations.ts`.

---

## 1. Operation: `list_capabilities`

Discovers available operations, language kernels, and operational readiness.

### Request
```typescript
interface ListCapabilitiesRequest {
  operation: 'list_capabilities';
  language?: string; // Optional BCP 47 code (e.g. 'it', 'uk')
}
```

### Response
```typescript
interface ListCapabilitiesResponse {
  capabilities: {
    language: string;
    operations: {
      operation: OperationType;
      status: 'declared' | 'implemented' | 'verified' | 'experimental' | 'planned';
      notes?: string;
    }[];
  }[];
}
```

---

## 2. Operation: `identify_language`

Identifies the language and script of input text.

### Request
```typescript
interface IdentifyLanguageRequest {
  operation: 'identify_language';
  text: string;
}
```

### Response
```typescript
interface IdentifyLanguageResponse {
  detected_language: string; // ISO 639-1 code
  confidence: number;         // 0.0 - 1.0
  script?: string;            // e.g., 'Latn', 'Cyrl'
}
```

---

## 3. Operation: `analyze_text`

Performs structural and phonetic/orthographic analysis of text in a designated language.

### Request
```typescript
interface AnalyzeTextRequest {
  operation: 'analyze_text';
  text: string;
  source_language: string; // e.g., 'uk', 'it'
  options?: {
    count_syllables?: boolean;
    flag_ambiguous?: boolean;
    [key: string]: any;
  };
}
```

### Response
```typescript
interface AnalyzeTextResponse {
  status: {
    code: 'success' | 'partial' | 'error';
    message?: string;
  };
  analysis: {
    syllable_count?: number;
    ambiguous_tokens?: string[];
    warnings?: string[];
    [key: string]: any;
  };
}
```

---

## 4. Operation: `interpret_music_text`

Analyzes and standardizes musical text elements (e.g., tempo indications, expression terms, dynamics, articulation) according to historical practice and SMuFL/MusicXML conventions.

### Request
```typescript
interface InterpretMusicTextRequest {
  operation: 'interpret_music_text';
  text: string;
  context?: 'tempo' | 'expression' | 'dynamics' | 'technique' | 'general';
}
```

### Response
```typescript
interface InterpretMusicTextResponse {
  concept_id: string;          // e.g. 'MUS-EXPR-001'
  standard_italian: string;
  category: string;
  tempo_bpm_range?: [number, number];
  musical_meaning: string;
  axis10_mapping?: string;
}
```

---

## 5. Operation: `analyze_poetry`

Analyzes metrical feet, syllable counts, caesuras, rhyme schemes, and stanzaic patterns.

### Request
```typescript
interface AnalyzePoetryRequest {
  operation: 'analyze_poetry';
  text: string;
  language: string;
  form_hint?: string;          // e.g., 'kolomyika', 'sonnet', 'hendecasyllable'
}
```

### Response
```typescript
interface AnalyzePoetryResponse {
  syllable_count: number;
  meter?: string;
  rhyme_scheme?: string;
  stanza_type?: string;
  deviations?: string[];
}
```

---

## 6. Operation: `localize_ui`

Provides localized terminology and musical-notational labels for interface components (e.g. for Audiveris or notation editors).

### Request
```typescript
interface LocalizeUIRequest {
  operation: 'localize_ui';
  bundle: string;
  target_language: string;
}
```

### Response
```typescript
interface LocalizeUIResponse {
  strings: Record<string, string>;
  missing_keys: string[];
}
```

---

## 7. Operation: `translate`

Linguistic translation across domain-specific contexts.

### Request
```typescript
interface TranslateRequest {
  operation: 'translate';
  text: string;
  source_language: string;
  target_language: string;
  domain?: 'music' | 'poetics' | 'general';
}
```

### Response
```typescript
interface TranslateResponse {
  translated_text: string;
  confidence: number;
  source_language: string;
  target_language: string;
  glossary_matches?: {
    source_term: string;
    target_term: string;
    concept_id?: string;
  }[];
}
```

---

## 8. Provider Contract: `ILexicalStressDictionary`

Contract for lexical stress lookup providers. Defined in `/shared/interfaces/lexical_stress.ts`.
This is an interface contract only; it does not implement a dictionary, prediction engine, or scoring algorithm.

### Key Types
```typescript
type StressEvidenceKind = 'dictionary' | 'expert_review' | 'corpus' | 'rule_based' | 'unknown';
type StressLookupStatus = 'found' | 'not_found' | 'ambiguous' | 'unsupported';

interface StressPosition {
  vowelIndex: number; // 0-based vowel index
  characterOffset?: number;
}

interface LexicalStressEntry {
  languageCode: string;
  lemma: string;
  surfaceForm?: string;
  stressPositions: StressPosition[];
  evidenceKind: StressEvidenceKind;
  sourceId?: string;
  sourceReference?: string;
  reviewedBy?: string;
  notes?: string[];
}

interface ILexicalStressDictionary {
  readonly dictionaryId: string;
  readonly version: string;
  lookup(request: LexicalStressLookupRequest): LexicalStressLookupResult;
}
```

---

## 9. Declarative Schema: `MetricalTemplate`

Declarative schema for metrical templates. Defined in `/shared/interfaces/metrical_templates.ts`.
Stores structural pattern information. It is not an executable verifier.

### Key Types
```typescript
type MetricalPositionKind = 'stressed' | 'unstressed' | 'optional' | 'unknown';
type TemplateEvidenceStatus = 'draft' | 'source_documented' | 'expert_reviewed' | 'empirically_validated';

interface MetricalPosition {
  syllablePosition: number; // 1-based syllable position
  expectedStress: MetricalPositionKind;
  note?: string;
}

interface MetricalLinePattern {
  patternId: string;
  syllableCount?: { min: number; max: number };
  positions: MetricalPosition[];
  variants?: string[];
}

interface MetricalTemplate {
  templateId: string;
  languageCode: string;
  name: string;
  traditionOrDomain?: string;
  description: string;
  linePatterns: MetricalLinePattern[];
  evidenceStatus: TemplateEvidenceStatus;
  sourceReferences: string[];
  knownLimitations: string[];
}
```

