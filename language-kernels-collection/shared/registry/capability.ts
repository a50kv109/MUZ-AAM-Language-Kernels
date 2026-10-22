export interface CapabilitySchema {
  operation: string;
  input_schema: object;
  output_schema: object;
  supported_languages: string[];
  maturity: 'draft' | 'verified' | 'experimental';
}

export const CapabilityRegistry: Record<string, CapabilitySchema> = {
  translate: {
    operation: 'translate',
    input_schema: { type: 'object', required: ['text', 'target_language'] },
    output_schema: { type: 'object', required: ['translated_text'] },
    supported_languages: ['it', 'uk', 'en'],
    maturity: 'verified'
  },
  analyze_poetry: {
    operation: 'analyze_poetry',
    input_schema: { type: 'object', required: ['text'] },
    output_schema: { type: 'object', required: ['analysis'] },
    supported_languages: ['it', 'uk'],
    maturity: 'draft'
  }
};
