import { UkOrthographicStrategy } from '../../../shared/engines/uk_syllable_strategy';

const strategy = new UkOrthographicStrategy();

function test(text: string, expected: number) {
  const result = strategy.countSyllables(text);
  console.log(`Text: "${text}" | Expected: ${expected} | Got: ${result.total} | Valid: ${result.total === expected}`);
}

test('вода', 2);
test('поле', 2);
test('Україна', 4);
test(' ', 0);
test('', 0);
