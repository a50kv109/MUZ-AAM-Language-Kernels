export interface SyllableCountResult {
  total: number;
  segmentation?: string[];
  ambiguous_tokens?: string[];
}

export interface ISyllableStrategy {
  strategy_id: string;
  version: string;
  countSyllables(text: string): SyllableCountResult;
}
