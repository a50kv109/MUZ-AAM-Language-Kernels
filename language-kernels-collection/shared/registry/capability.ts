export type CapabilityStatus = 'declared' | 'implemented' | 'verified' | 'experimental' | 'planned';

export interface CapabilitySchema {
  operation: string;
  description: string;
  input_schema: object;
  output_schema: object;
  supported_languages: string[];
  status: CapabilityStatus;
  verification_evidence?: string;
  known_limitations?: string[];
}

export const CapabilityRegistry: Record<string, CapabilitySchema> = {
  list_capabilities: {
    operation: 'list_capabilities',
    description: 'Discover available operations, supported languages, and maturity statuses across kernels.',
    input_schema: { type: 'object', required: ['operation'] },
    output_schema: { type: 'object', required: ['capabilities'] },
    supported_languages: ['*'],
    status: 'declared'
  },
  translate: {
    operation: 'translate',
    description: 'Transform natural language text between supported language pairs with meaning preservation.',
    input_schema: { type: 'object', required: ['operation', 'source_language', 'target_language', 'text'] },
    output_schema: { type: 'object', required: ['translated_text'] },
    supported_languages: ['it', 'uk', 'en'],
    status: 'declared',
    verification_evidence: 'None. Contract only; implementation not yet realized.',
    known_limitations: ['Runtime engine not implemented.']
  },
  analyze_text: {
    operation: 'analyze_text',
    description: 'Extract orthographic syllable counts and tokens via language-specific strategies.',
    input_schema: { type: 'object', required: ['operation', 'source_language', 'text'] },
    output_schema: { type: 'object', required: ['analysis'] },
    supported_languages: ['uk'],
    status: 'experimental',
    verification_evidence: 'tests/shared/engines/syllable_analyzer.test.ts',
    known_limitations: [
      'Ukrainian strategy uses orthographic vowel-count heuristic.',
      'No phonetic syllabification boundaries, stress assignment, or dieresis handling.'
    ]
  },
  analyze_poetry: {
    operation: 'analyze_poetry',
    description: 'Evaluate poetic meter, line syllable distributions, and stanza forms.',
    input_schema: { type: 'object', required: ['operation', 'source_language', 'text'] },
    output_schema: { type: 'object', required: ['analysis'] },
    supported_languages: ['uk', 'it'],
    status: 'planned',
    verification_evidence: 'None. In roadmap.',
    known_limitations: ['Dependent on reliable stress analysis which is not yet implemented.']
  },
  interpret_music_text: {
    operation: 'interpret_music_text',
    description: 'Parse, normalize and translate performance markings and score annotations.',
    input_schema: { type: 'object', required: ['operation', 'source_language', 'text'] },
    output_schema: { type: 'object', required: ['interpretation'] },
    supported_languages: ['it'],
    status: 'planned',
    verification_evidence: 'None. In roadmap.',
    known_limitations: ['Vocabulary curated in markdown; parser engine not yet implemented.']
  },
  localize_ui: {
    operation: 'localize_ui',
    description: 'Localize application interface labels while preserving keys, formatting, and length limits.',
    input_schema: { type: 'object', required: ['operation', 'source_language', 'target_language', 'items'] },
    output_schema: { type: 'object', required: ['translations'] },
    supported_languages: ['it', 'en'],
    status: 'declared',
    verification_evidence: 'None. Interface prototype only.',
    known_limitations: ['Requires integration with glossary and length constraint validators.']
  }
};
