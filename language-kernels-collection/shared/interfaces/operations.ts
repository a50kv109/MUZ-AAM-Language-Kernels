import { BaseRequest, BaseResponse } from './common';

export type OperationStatus = 'declared' | 'implemented' | 'verified' | 'experimental' | 'planned';

// 1. List Capabilities
export interface ListCapabilitiesRequest extends BaseRequest {
  operation: 'list_capabilities';
}

export interface ListCapabilitiesResponse extends BaseResponse {
  capabilities: {
    operation: string;
    description: string;
    supported_languages: string[];
    status: OperationStatus;
  }[];
}

// 2. Identify Language
export interface IdentifyLanguageRequest extends BaseRequest {
  operation: 'identify_language';
  text: string;
}

export interface IdentifyLanguageResponse extends BaseResponse {
  language_code: string;
  confidence: number;
}

// 3. Translate
export interface TranslateRequest extends BaseRequest {
  operation: 'translate';
  text: string;
}

export interface TranslateResponse extends BaseResponse {
  translated_text: string;
}

// 4. Analyze Text (e.g. Syllables)
export interface AnalyzeTextRequest extends BaseRequest {
  operation: 'analyze_text';
  text: string;
}

export interface AnalyzeTextResponse extends BaseResponse {
  analysis: {
    syllable_count?: number;
    warnings?: string[];
    [key: string]: any;
  };
}

// 5. Analyze Poetry
export interface AnalyzePoetryRequest extends BaseRequest {
  operation: 'analyze_poetry';
  text: string;
}

export interface AnalyzePoetryResponse extends BaseResponse {
  analysis: {
    meter?: string;
    structure?: string;
    metrics?: Record<string, number>;
    lines?: Array<{
      text: string;
      syllable_count?: number;
      stress_pattern?: string;
    }>;
  };
}

// 6. Interpret Music Text
export interface InterpretMusicTextRequest extends BaseRequest {
  operation: 'interpret_music_text';
  text: string;
}

export interface InterpretMusicTextResponse extends BaseResponse {
  interpretation: {
    normalized_term: string;
    definition: string;
    language: string;
  };
}

// 7. Localize UI
export interface LocalizeUIRequest extends BaseRequest {
  operation: 'localize_ui';
  items: {
    key: string;
    text: string;
    context?: string;
    max_length?: number;
  }[];
}

export interface LocalizeUIResponse extends BaseResponse {
  translations: {
    key: string;
    text: string;
    status: 'success' | 'truncated' | 'error';
  }[];
}
