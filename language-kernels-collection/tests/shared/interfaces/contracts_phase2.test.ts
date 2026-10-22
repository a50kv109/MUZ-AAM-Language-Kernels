import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// 1. Verify Imports from individual contract files and barrel index
import {
  StressEvidenceKind,
  StressLookupStatus,
  StressPosition,
  LexicalStressEntry,
  LexicalStressLookupRequest,
  LexicalStressLookupResult,
  ILexicalStressDictionary
} from '../../../shared/interfaces/lexical_stress';

import {
  MetricalPositionKind,
  TemplateEvidenceStatus,
  MetricalPosition,
  MetricalLinePattern,
  MetricalTemplate
} from '../../../shared/interfaces/metrical_templates';

// Also verify barrel export from index
import * as SharedInterfaces from '../../../shared/interfaces/index';

console.log('--- Starting Phase 2 Contracts Test Suite ---');

// 1. Import / Export Integrity
{
  assert.ok(SharedInterfaces, 'Barrel index must export shared interfaces');
  // Confirm that types and symbols exist and compile cleanly
}

// 2. Lexical Stress Contract: Valid Single & Ambiguous Entries
{
  // Single stress entry (dictionary-backed)
  const singleEntry: LexicalStressEntry = {
    languageCode: 'uk',
    lemma: 'вода',
    surfaceForm: 'воду',
    stressPositions: [{ vowelIndex: 0, characterOffset: 1 }], // во́ду (stress on first vowel 'о')
    evidenceKind: 'dictionary',
    sourceId: 'ULIF-VLD-2024',
    sourceReference: 'Словники України on-line (УМІФ НАН України)',
    reviewedBy: 'linguist_team',
    notes: ['Accusative singular feminine']
  };

  assert.equal(singleEntry.languageCode, 'uk');
  assert.equal(singleEntry.stressPositions.length, 1);
  assert.equal(singleEntry.stressPositions[0].vowelIndex, 0, 'First vowel index is 0-based');
  assert.equal(singleEntry.evidenceKind, 'dictionary');

  // Ambiguous entry: Homographs with mobile dynamic stress (e.g., за́мок vs замо́к)
  // Contract invariant: preserve ambiguity; never silently collapse multiple stress entries
  const ambiguousResult: LexicalStressLookupResult = {
    status: 'ambiguous',
    languageCode: 'uk',
    token: 'замок',
    entries: [
      {
        languageCode: 'uk',
        lemma: 'замок',
        surfaceForm: 'замок',
        stressPositions: [{ vowelIndex: 0, characterOffset: 1 }], // за́мок (fortress)
        evidenceKind: 'dictionary',
        sourceId: 'DICT-REF-01',
        notes: ['Stress on penult: fortress/castle']
      },
      {
        languageCode: 'uk',
        lemma: 'замок',
        surfaceForm: 'замок',
        stressPositions: [{ vowelIndex: 1, characterOffset: 3 }], // замо́к (device for locking)
        evidenceKind: 'dictionary',
        sourceId: 'DICT-REF-01',
        notes: ['Stress on ultima: device for locking']
      }
    ],
    warnings: ['Homograph ambiguity detected: 2 valid dictionary stress variants found.']
  };

  assert.equal(ambiguousResult.status, 'ambiguous');
  assert.equal(ambiguousResult.entries.length, 2, 'Must preserve both variant entries');
  assert.notEqual(
    ambiguousResult.entries[0].stressPositions[0].vowelIndex,
    ambiguousResult.entries[1].stressPositions[0].vowelIndex,
    'Different stress positions must be maintained without collapsing'
  );
}

// 3. Evidence Provenance Invariants
{
  const validEvidenceKinds: StressEvidenceKind[] = [
    'dictionary',
    'expert_review',
    'corpus',
    'rule_based',
    'unknown'
  ];

  assert.equal(validEvidenceKinds.length, 5);

  // Invariant: rule_based is NOT dictionary evidence
  const ruleBasedEntry: LexicalStressEntry = {
    languageCode: 'uk',
    lemma: 'невідомеслово',
    stressPositions: [{ vowelIndex: 1 }],
    evidenceKind: 'rule_based',
    notes: ['Estimated by fallback heuristic; unverified']
  };

  assert.equal(ruleBasedEntry.evidenceKind, 'rule_based');
  assert.notEqual(ruleBasedEntry.evidenceKind, 'dictionary', 'Rule-based inference must not equal dictionary evidence');
}

// 4. Metrical Template Contract & Coordinate System Separation
{
  // Coordinate system invariant:
  // MetricalPosition.syllablePosition is 1-based (1, 2, 3...)
  // StressPosition.vowelIndex is 0-based (0, 1, 2...)
  const metricalPos: MetricalPosition = {
    syllablePosition: 1, // 1-based
    expectedStress: 'unstressed'
  };
  const stressPos: StressPosition = {
    vowelIndex: 0 // 0-based
  };

  assert.ok(metricalPos.syllablePosition >= 1, 'Metrical position must be 1-based');
  assert.ok(stressPos.vowelIndex >= 0, 'Stress position vowelIndex must be 0-based');
  assert.notEqual(metricalPos.syllablePosition, stressPos.vowelIndex, 'Initial positions in the two coordinate spaces differ');

  // Verify Template Evidence Status values
  const validTemplateStatuses: TemplateEvidenceStatus[] = [
    'draft',
    'source_documented',
    'expert_reviewed',
    'empirically_validated'
  ];
  assert.equal(validTemplateStatuses.length, 4);
}

// 5. Example JSON Fixture Adherence
{
  const fixturePath = fileURLToPath(new URL('../../../examples/metrical-template.example.json', import.meta.url));
  const rawData = readFileSync(fixturePath, 'utf-8');
  const template = JSON.parse(rawData) as MetricalTemplate;

  assert.equal(template.templateId, 'EXAMPLE-NOT-VALIDATED-001');
  assert.equal(template.languageCode, 'und');
  assert.equal(template.evidenceStatus, 'draft', 'Example must be draft status');
  assert.ok(Array.isArray(template.linePatterns), 'Must contain linePatterns array');
  assert.equal(template.linePatterns.length, 1);

  const pattern = template.linePatterns[0];
  assert.equal(pattern.patternId, 'line-pattern-1');
  assert.deepEqual(pattern.syllableCount, { min: 4, max: 4 });
  assert.equal(pattern.positions.length, 4);

  // Check 1-based indexing for positions in fixture
  for (let i = 0; i < pattern.positions.length; i++) {
    const pos = pattern.positions[i];
    assert.equal(pos.syllablePosition, i + 1, `Position ${i} must have 1-based syllablePosition ${i + 1}`);
    assert.ok(['stressed', 'unstressed', 'optional', 'unknown'].includes(pos.expectedStress));
  }

  assert.ok(template.knownLimitations.length > 0, 'Must have knownLimitations documented');
}

// 6. Runtime Validation vs Type Assertion Distinction
// Pure TypeScript types evaporate at runtime. We demonstrate and test a runtime validator
// that enforces the structural invariants and rejects invalid input that would pass an unchecked type assertion.
{
  interface ValidationResult {
    valid: boolean;
    errors: string[];
  }

  function validateMetricalTemplate(input: unknown): ValidationResult {
    const errors: string[] = [];
    if (!input || typeof input !== 'object') {
      return { valid: false, errors: ['Input must be a non-null object'] };
    }
    const t = input as Record<string, unknown>;

    if (typeof t.templateId !== 'string' || !t.templateId.trim()) errors.push('Missing or empty templateId');
    if (typeof t.languageCode !== 'string' || !t.languageCode.trim()) errors.push('Missing or empty languageCode');
    if (typeof t.name !== 'string') errors.push('Missing name');
    if (typeof t.description !== 'string') errors.push('Missing description');

    const validStatuses: TemplateEvidenceStatus[] = ['draft', 'source_documented', 'expert_reviewed', 'empirically_validated'];
    if (!validStatuses.includes(t.evidenceStatus as TemplateEvidenceStatus)) {
      errors.push(`Invalid evidenceStatus: ${t.evidenceStatus}`);
    }

    if (!Array.isArray(t.linePatterns) || t.linePatterns.length === 0) {
      errors.push('linePatterns must be a non-empty array');
    } else {
      t.linePatterns.forEach((pat: unknown, pIdx: number) => {
        if (!pat || typeof pat !== 'object') {
          errors.push(`linePatterns[${pIdx}] must be an object`);
          return;
        }
        const p = pat as Record<string, unknown>;
        if (typeof p.patternId !== 'string') errors.push(`linePatterns[${pIdx}].patternId must be a string`);
        if (!Array.isArray(p.positions)) {
          errors.push(`linePatterns[${pIdx}].positions must be an array`);
        } else {
          p.positions.forEach((pos: unknown, posIdx: number) => {
            if (!pos || typeof pos !== 'object') {
              errors.push(`positions[${posIdx}] must be an object`);
              return;
            }
            const posObj = pos as Record<string, unknown>;
            if (typeof posObj.syllablePosition !== 'number' || posObj.syllablePosition < 1) {
              errors.push(`positions[${posIdx}].syllablePosition must be an integer >= 1 (1-based)`);
            }
            const validKinds: MetricalPositionKind[] = ['stressed', 'unstressed', 'optional', 'unknown'];
            if (!validKinds.includes(posObj.expectedStress as MetricalPositionKind)) {
              errors.push(`positions[${posIdx}].expectedStress invalid: ${posObj.expectedStress}`);
            }
          });
        }
      });
    }

    if (!Array.isArray(t.sourceReferences)) errors.push('sourceReferences must be an array');
    if (!Array.isArray(t.knownLimitations)) errors.push('knownLimitations must be an array');

    return { valid: errors.length === 0, errors };
  }

  function validateLexicalStressEntry(input: unknown): ValidationResult {
    const errors: string[] = [];
    if (!input || typeof input !== 'object') {
      return { valid: false, errors: ['Input must be a non-null object'] };
    }
    const e = input as Record<string, unknown>;

    if (typeof e.languageCode !== 'string' || !e.languageCode.trim()) errors.push('Missing languageCode');
    if (typeof e.lemma !== 'string' || !e.lemma.trim()) errors.push('Missing lemma');

    const validEvidence: StressEvidenceKind[] = ['dictionary', 'expert_review', 'corpus', 'rule_based', 'unknown'];
    if (!validEvidence.includes(e.evidenceKind as StressEvidenceKind)) {
      errors.push(`Invalid evidenceKind: ${e.evidenceKind}`);
    }

    if (!Array.isArray(e.stressPositions)) {
      errors.push('stressPositions must be an array');
    } else {
      e.stressPositions.forEach((pos: unknown, idx: number) => {
        if (!pos || typeof pos !== 'object') {
          errors.push(`stressPositions[${idx}] must be an object`);
          return;
        }
        const p = pos as Record<string, unknown>;
        if (typeof p.vowelIndex !== 'number' || p.vowelIndex < 0) {
          errors.push(`stressPositions[${idx}].vowelIndex must be a non-negative integer >= 0 (0-based)`);
        }
        if (p.characterOffset !== undefined && (typeof p.characterOffset !== 'number' || p.characterOffset < 0)) {
          errors.push(`stressPositions[${idx}].characterOffset must be >= 0 when provided`);
        }
      });
    }

    return { valid: errors.length === 0, errors };
  }

  // A. Valid objects pass runtime validation
  const validTemplate = {
    templateId: 'TEST-01',
    languageCode: 'uk',
    name: 'Test meter',
    description: 'Testing validation',
    evidenceStatus: 'draft',
    linePatterns: [
      {
        patternId: 'p1',
        positions: [
          { syllablePosition: 1, expectedStress: 'unstressed' },
          { syllablePosition: 2, expectedStress: 'stressed' }
        ]
      }
    ],
    sourceReferences: ['Test Ref'],
    knownLimitations: ['Draft only']
  };
  const valRes = validateMetricalTemplate(validTemplate);
  assert.equal(valRes.valid, true, `Expected valid template, got errors: ${valRes.errors.join(', ')}`);

  // B. Invalid objects fail runtime validation (even though type assertion might bypass compiler)
  const invalidTemplate = {
    templateId: '',
    evidenceStatus: 'unverified_hallucination', // invalid status
    linePatterns: [
      {
        patternId: 'p1',
        positions: [
          { syllablePosition: 0, expectedStress: 'mega_stressed' } // 0 is invalid (must be 1-based), expectedStress is invalid
        ]
      }
    ]
  };
  const invalidRes = validateMetricalTemplate(invalidTemplate);
  assert.equal(invalidRes.valid, false, 'Invalid template should fail runtime validation');
  assert.ok(invalidRes.errors.some(e => e.includes('Missing or empty templateId')));
  assert.ok(invalidRes.errors.some(e => e.includes('Invalid evidenceStatus')));
  assert.ok(invalidRes.errors.some(e => e.includes('syllablePosition must be an integer >= 1')));
  assert.ok(invalidRes.errors.some(e => e.includes('expectedStress invalid')));

  // C. Invalid stress entry fails runtime validation
  const invalidStressEntry = {
    languageCode: 'uk',
    lemma: '',
    evidenceKind: 'unsupported_magic',
    stressPositions: [{ vowelIndex: -1, characterOffset: -5 }]
  };
  const invalidStressRes = validateLexicalStressEntry(invalidStressEntry);
  assert.equal(invalidStressRes.valid, false);
  assert.ok(invalidStressRes.errors.some(e => e.includes('Missing lemma')));
  assert.ok(invalidStressRes.errors.some(e => e.includes('Invalid evidenceKind')));
  assert.ok(invalidStressRes.errors.some(e => e.includes('vowelIndex must be a non-negative integer >= 0')));
  assert.ok(invalidStressRes.errors.some(e => e.includes('characterOffset must be >= 0')));
}

// 7. Mock Provider Conformance
{
  class MockDictionary implements ILexicalStressDictionary {
    readonly dictionaryId = 'MOCK-UK-DICT-01';
    readonly version = '1.0.0';

    lookup(request: LexicalStressLookupRequest): LexicalStressLookupResult {
      if (request.languageCode !== 'uk') {
        return {
          status: 'unsupported',
          languageCode: request.languageCode,
          token: request.token,
          entries: [],
          warnings: [`Language '${request.languageCode}' is unsupported by this dictionary`]
        };
      }

      if (request.token === 'невідомо') {
        return {
          status: 'not_found',
          languageCode: 'uk',
          token: request.token,
          entries: [],
          warnings: ['Token not found in dictionary']
        };
      }

      return {
        status: 'found',
        languageCode: 'uk',
        token: request.token,
        entries: [
          {
            languageCode: 'uk',
            lemma: request.token,
            stressPositions: [{ vowelIndex: 0 }],
            evidenceKind: 'dictionary',
            sourceId: this.dictionaryId
          }
        ],
        warnings: []
      };
    }
  }

  const dict = new MockDictionary();
  assert.equal(dict.dictionaryId, 'MOCK-UK-DICT-01');
  assert.equal(dict.version, '1.0.0');

  const resFound = dict.lookup({ languageCode: 'uk', token: 'пісня' });
  assert.equal(resFound.status, 'found');
  assert.equal(resFound.entries[0].stressPositions[0].vowelIndex, 0);
  assert.equal(resFound.entries[0].evidenceKind, 'dictionary');

  const resNotFound = dict.lookup({ languageCode: 'uk', token: 'невідомо' });
  assert.equal(resNotFound.status, 'not_found');
  assert.equal(resNotFound.entries.length, 0);

  const resUnsupported = dict.lookup({ languageCode: 'it', token: 'canto' });
  assert.equal(resUnsupported.status, 'unsupported');
  assert.equal(resUnsupported.entries.length, 0);
}

console.log('✓ All Phase 2 contract tests passed with strict assertions.');
