/** Declarative metrical template contracts. No verifier or scoring algorithm is defined here. */

export type MetricalPositionKind = 'stressed' | 'unstressed' | 'optional' | 'unknown';
export type TemplateEvidenceStatus = 'draft' | 'source_documented' | 'expert_reviewed' | 'empirically_validated';

export interface MetricalPosition {
  /** One-based syllable position in a line, when applicable. */
  syllablePosition: number;
  expectedStress: MetricalPositionKind;
  /** Human-readable note; never a substitute for structured fields. */
  note?: string;
}

export interface MetricalLinePattern {
  patternId: string;
  /** Inclusive minimum and maximum syllable count; omit only if not established. */
  syllableCount?: { min: number; max: number };
  positions: MetricalPosition[];
  /** Allows a template to describe a family of patterns without asserting one universal form. */
  variants?: string[];
}

export interface MetricalTemplate {
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
