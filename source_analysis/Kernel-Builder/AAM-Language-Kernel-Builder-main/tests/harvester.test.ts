import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { KernelHarvester } from '../src/lib/harvester.ts';
import { translations } from '../src/lib/translations.ts';
import { MULTI_KERNEL_SYSTEM_V2_CODE } from '../src/lib/multi_kernel_code.ts';
import { HODGE_INTEGRATION_CODE } from '../src/lib/hodge_integration.ts';
import { PRAGMATIC_INTEGRATION_CODE } from '../src/lib/pragmatic_integration.ts';

describe('Universal Kernel Harvester (AAM-V2.1)', () => {
  test('initializes and runs Ukrainian kernel generation', () => {
    const harvester = new KernelHarvester('Ukrainian', 'A');
    const result = harvester.run();

    assert.ok(result.files, 'Should produce files object');
    assert.ok(result.logs.length > 0, 'Should output logs');
    assert.ok(
      Object.keys(result.files).some(k => k.includes('core/base_kernel.py')),
      'Should generate core base_kernel.py'
    );
  });

  test('generates Georgian OST-9 kernel files', () => {
    const harvester = new KernelHarvester('Georgian', 'A');
    const result = harvester.run();

    assert.ok(
      Object.keys(result.files).some(k => k.includes('core/georgian_core.py')),
      'Should generate georgian_core.py'
    );
    assert.ok(
      Object.keys(result.files).some(k => k.includes('manifest/dharma_manifest.json')),
      'Should generate dharma_manifest.json'
    );
    assert.ok(
      Object.keys(result.files).some(k => k.includes('zic/zic_registry.json')),
      'Should generate zic_registry.json'
    );
  });

  test('generates Panini synthetic core for Method S', () => {
    const harvester = new KernelHarvester('Sanskrit', 'S');
    const result = harvester.run();

    assert.ok(
      Object.keys(result.files).some(k => k.includes('core/panini_core.py')),
      'Should generate panini_core.py'
    );
  });

  test('generates Core/Universal kernel with v3.2.1 expert edition', () => {
    const harvester = new KernelHarvester('Core', 'A');
    const result = harvester.run();

    assert.ok(
      Object.keys(result.files).some(k => k.includes('aam_v1_expert_core_v3_2_1.py')),
      'Should generate aam_v1_expert_core_v3_2_1.py'
    );
    assert.ok(
      Object.keys(result.files).some(k => k.includes('setup.py')),
      'Should generate PyPI setup.py'
    );
  });

  test('handles custom arbitrary language string without crashing', () => {
    const harvester = new KernelHarvester('Avestan', 'B');
    const result = harvester.run();

    assert.ok(result.files, 'Should produce files for custom language');
    assert.ok(
      Object.keys(result.files).some(k => k.includes('Avestan_KERNEL_B/core/base_kernel.py')),
      'Should generate custom language kernel'
    );
  });

  test('translations contain required languages and groups', () => {
    assert.equal(translations.en.languages.Georgian, 'Georgian');
    assert.equal(translations.ru.languages.Georgian, 'Грузинский');
    assert.equal(translations.en.languages.Etruscan, 'Etruscan');
    assert.equal(translations.en.languages.Sanskrit, 'Sanskrit');
    assert.equal(translations.en.kartvelianGroup, 'Kartvelian Group');
    assert.equal(translations.ru.kartvelianGroup, 'Картвельская группа');
  });

  test('exportable Python integration string modules are defined and non-empty', () => {
    assert.ok(MULTI_KERNEL_SYSTEM_V2_CODE.length > 500, 'Multi-kernel code must be populated');
    assert.ok(HODGE_INTEGRATION_CODE.length > 500, 'Hodge code must be populated');
    assert.ok(PRAGMATIC_INTEGRATION_CODE.length > 500, 'Pragmatic code must be populated');
  });
});
