import { ISyllableStrategy, SyllableCountResult } from '../interfaces/engines';

export class UkOrthographicStrategy implements ISyllableStrategy {
  readonly strategy_id = 'uk_orthographic_v1';
  readonly version = '0.2.0';

  private static readonly UK_VOWELS = new Set('аеєиіїоуюяАЕЄИІЇОУЮЯ');
  private static readonly LATIN_CHARS_REGEX = /[a-zA-Z]/;
  private static readonly PUNCT_OR_SPACE_REGEX = /^[\s\p{P}\p{S}\p{N}]+$/u;

  /**
   * Deterministic orthographic syllable counting for Ukrainian text.
   *
   * Core rule: In standard Ukrainian orthography, each vowel constitutes one syllable nucleus.
   *
   * Documented Assumptions:
   * 1. Orthographic heuristic: count of vowel letters corresponds to syllable count.
   * 2. Apostrophes (', ’, ʼ) and internal hyphens (-) are recognized as intra-word orthographic elements.
   * 3. Non-word tokens (punctuation, pure numbers, whitespace) do not constitute syllables or ambiguous tokens.
   * 4. Tokens containing foreign (Latin) alphabetic characters or vowel-less alphabetic clusters are flagged
   *    in `ambiguous_tokens` for downstream review.
   *
   * Known Limitations:
   * - Does not perform phonetic syllabification (onset/nucleus/coda boundary segmentation).
   * - Does not account for poetic synalepha/elision or hiatus resolution in vocalized song lyrics.
   * - Does not determine lexical stress positions.
   */
  countSyllables(text: string): SyllableCountResult {
    if (!text || text.trim().length === 0) {
      return { total: 0, ambiguous_tokens: [] };
    }

    // Tokenize by whitespace, preserving word strings
    const rawTokens = text.trim().split(/\s+/);
    let totalSyllables = 0;
    const ambiguous: string[] = [];

    for (const rawToken of rawTokens) {
      // Strip leading and trailing punctuation (quotes, commas, periods, exclamation marks, etc.)
      const cleaned = rawToken.replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, '');
      if (cleaned.length === 0) {
        continue;
      }

      // If token is purely numerical or symbolic, skip
      if (UkOrthographicStrategy.PUNCT_OR_SPACE_REGEX.test(cleaned)) {
        continue;
      }

      // Check if token contains Latin characters
      if (UkOrthographicStrategy.LATIN_CHARS_REGEX.test(cleaned)) {
        ambiguous.push(cleaned);
        // Do not guess syllables for unsupported Latin words
        continue;
      }

      // Count Ukrainian vowels
      let tokenVowels = 0;
      for (const char of cleaned) {
        if (UkOrthographicStrategy.UK_VOWELS.has(char)) {
          tokenVowels++;
        }
      }

      if (tokenVowels > 0) {
        totalSyllables += tokenVowels;
      } else {
        // Alphabetic token with no Ukrainian vowels (e.g. consonant abbreviation or foreign Cyrillic)
        ambiguous.push(cleaned);
      }
    }

    return {
      total: totalSyllables,
      ambiguous_tokens: ambiguous
    };
  }
}
