# API Contracts

External applications interact with kernels via the following operations defined in `/shared/interfaces/operations.ts`.

## 1. `analyze_text` (Operation)
**Purpose**: General text analysis, including syllabification.

### Request
```typescript
interface AnalyzeTextRequest {
  operation: 'analyze_text';
  text: string;
  source_language: string; // e.g., 'uk'
}
```

### Response
```typescript
interface AnalyzeTextResponse {
  status: { code: 'success' | 'partial' | 'error' };
  analysis: {
    syllable_count: number;
    warnings?: string[];
  };
}
```

## 2. Capability Discovery
`list_capabilities` returns the available operations per kernel and their status (`declared`, `implemented`, `verified`).
