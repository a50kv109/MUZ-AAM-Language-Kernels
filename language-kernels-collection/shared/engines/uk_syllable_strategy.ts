import { ISyllableStrategy, SyllableCountResult } from '../interfaces/engines';

export class UkOrthographicStrategy implements ISyllableStrategy {
  strategy_id = 'uk_orthographic_v1';
  version = '0.1.0';

  // Assumption: Syllable count = Vowel count.
  // Limitation: Does not handle dieresis/synaeresis. Orthographic heuristic only.
  countSyllables(text: string): SyllableCountResult {
    const vowels = 'аеєиіїоуюяАЕЄИІЇОУЮЯ';
    let count = 0;
    for (const char of text) {
      if (vowels.includes(char)) count++;
    }
    return { 
      total: count,
      ambiguous_tokens: count === 0 && text.length > 0 ? [text] : [] 
    };
  }
}
