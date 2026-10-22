import assert from 'node:assert/strict';
import { UkOrthographicStrategy } from '../../../shared/engines/uk_syllable_strategy';

console.log('--- Starting UkOrthographicStrategy Test Suite ---');

const strategy = new UkOrthographicStrategy();

// 1. Empty and Whitespace Handling
{
  const resEmpty = strategy.countSyllables('');
  assert.equal(resEmpty.total, 0, 'Empty string should yield 0 syllables');
  assert.deepEqual(resEmpty.ambiguous_tokens, [], 'Empty string should yield no ambiguous tokens');

  const resWhitespace = strategy.countSyllables('   \t \n  ');
  assert.equal(resWhitespace.total, 0, 'Whitespace string should yield 0 syllables');
  assert.deepEqual(resWhitespace.ambiguous_tokens, [], 'Whitespace should yield no ambiguous tokens');
}

// 2. Standard Ukrainian Vocabulary
{
  const cases: [string, number][] = [
    ['вода', 2],
    ['поле', 2],
    ['Україна', 4],
    ['мова', 2],
    ['соловейко', 4],
    ['пісня', 2],
    ['думка', 2]
  ];

  for (const [word, expected] of cases) {
    const res = strategy.countSyllables(word);
    assert.equal(res.total, expected, `Word "${word}" expected ${expected} syllables, got ${res.total}`);
    assert.deepEqual(res.ambiguous_tokens, [], `Word "${word}" should have no ambiguous tokens`);
  }
}

// 3. Orthographic Modifiers: Apostrophe & Soft Sign
{
  const cases: [string, number][] = [
    ["м'ясо", 2],
    ["п'ять", 1],
    ["з'явитися", 4],
    ["сім'я", 2],
    ['день', 1],
    ['тінь', 1],
    ['ніч', 1],
    ['мальовничий', 4]
  ];

  for (const [word, expected] of cases) {
    const res = strategy.countSyllables(word);
    assert.equal(res.total, expected, `Word with apostrophe/soft-sign "${word}" expected ${expected} syllables, got ${res.total}`);
    assert.deepEqual(res.ambiguous_tokens, [], `Word "${word}" should have no ambiguous tokens`);
  }
}

// 4. Hyphenated Compounds
{
  const res = strategy.countSyllables('будь-ласка');
  assert.equal(res.total, 3, 'Hyphenated word "будь-ласка" should yield 3 syllables (у, а, а)');
  assert.deepEqual(res.ambiguous_tokens, []);
}

// 5. Multi-word Poetic Lines & Punctuation Stripping
{
  // Shevchenko: "Реве та стогне Дніпр широкий,"
  // Ре-ве (2) + та (1) + сто-гне (2) + Дніпр (1) + ши-ро-кий (3) = 9
  const verse1 = 'Реве та стогне Дніпр широкий,';
  const res1 = strategy.countSyllables(verse1);
  assert.equal(res1.total, 9, `Verse "${verse1}" expected 9 syllables, got ${res1.total}`);
  assert.deepEqual(res1.ambiguous_tokens, []);

  // Quotes and brackets: «Думи мої, думи мої!»
  // Ду-ми (2) + мо-ї (2) + ду-ми (2) + мо-ї (2) = 8
  const verse2 = '«Думи мої, думи мої!»';
  const res2 = strategy.countSyllables(verse2);
  assert.equal(res2.total, 8, `Verse "${verse2}" expected 8 syllables, got ${res2.total}`);
  assert.deepEqual(res2.ambiguous_tokens, []);
}

// 6. Non-vocalic tokens: Numbers and Pure Symbols
{
  const resNumbers = strategy.countSyllables('12345 2026');
  assert.equal(resNumbers.total, 0, 'Pure numbers should yield 0 syllables');
  assert.deepEqual(resNumbers.ambiguous_tokens, [], 'Pure numbers should not be treated as ambiguous tokens');

  const resPunct = strategy.countSyllables('... --- !!! ??? ,, ;:');
  assert.equal(resPunct.total, 0, 'Pure punctuation should yield 0 syllables');
  assert.deepEqual(resPunct.ambiguous_tokens, [], 'Pure punctuation should not be ambiguous');

  const resMixedNumWord = strategy.countSyllables('У 2026 році народилася пісня.');
  // У (1) + 2026 (0) + ро-ці (2) + на-ро-ди-ла-ся (5) + піс-ня (2) = 10
  assert.equal(resMixedNumWord.total, 10, 'Mixed numbers and words syllable count mismatch');
  assert.deepEqual(resMixedNumWord.ambiguous_tokens, []);
}

// 7. Foreign Tokens & Ambiguity Handling
{
  const resLatin = strategy.countSyllables('hello world');
  assert.equal(resLatin.total, 0, 'Latin tokens should not count towards Ukrainian vowel count');
  assert.deepEqual(resLatin.ambiguous_tokens, ['hello', 'world'], 'Latin tokens should be recorded as ambiguous');

  const resMixed = strategy.countSyllables('Слово "code" та термін "test"');
  // Сло-во (2) + code (ambiguous) + та (1) + тер-мін (2) + test (ambiguous) = 5
  assert.equal(resMixed.total, 5, 'Mixed Ukrainian and English should calculate Ukrainian vowels');
  assert.deepEqual(resMixed.ambiguous_tokens, ['code', 'test']);

  const resAcronym = strategy.countSyllables('КНР та СРСР');
  // та (1). КНР and СРСР have no Ukrainian vowels -> flagged ambiguous
  assert.equal(resAcronym.total, 1);
  assert.deepEqual(resAcronym.ambiguous_tokens, ['КНР', 'СРСР']);
}

console.log('✓ All 7 test suites passed with strict assertions.');
