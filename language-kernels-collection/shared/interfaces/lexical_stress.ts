/**
 * Contract for lexical stress lookup.
 * This is an interface only: it does not implement a dictionary or infer stress.
 */

export type StressEvidenceKind = 'dictionary' | 'expert_review' | 'corpus' | 'rule_based' | 'unknown';
export type StressLookupStatus = 'found' | 'not_found' | 'ambiguous' | 'unsupported';

/** A zero-based index into the normalized word's vowel sequence. */
export interface StressPosition {
  vowelIndex: number;
  /** Optional character offset in the normalized surface form, when the source provides it. */
  characterOffset?: number;
}

export interface LexicalStressEntry {
  languageCode: string;
  lemma: string;
  /** The exact or normalized form for which the entry applies, if different from lemma. */
  surfaceForm?: string;
  stressPositions: StressPosition[];
  /** Multiple positions may represent genuine ambiguity/variants; do not silently choose one. */
  evidenceKind: StressEvidenceKind;
  sourceId?: string;
  sourceReference?: string;
  reviewedBy?: string;
  notes?: string[];
}

export interface LexicalStressLookupRequest {
  languageCode: string;
  token: string;
  /** Optional context for homographs or inflected forms; not interpreted by this contract. */
  context?: string;
}

export interface LexicalStressLookupResult {
  status: StressLookupStatus;
  languageCode: string;
  token: string;
  entries: LexicalStressEntry[];
  warnings: string[];
}

/** Provider contract. Implementations must preserve ambiguity and evidence provenance. */
export interface ILexicalStressDictionary {
  readonly dictionaryId: string;
  readonly version: string;
  lookup(request: LexicalStressLookupRequest): LexicalStressLookupResult;
}
