import { BaseRequest, BaseResponse } from './common';

export interface ListCapabilitiesRequest extends BaseRequest {
  operation: 'list_capabilities';
}

export interface ListCapabilitiesResponse extends BaseResponse {
  capabilities: {
    operation: string;
    description: string;
    supported_languages: string[];
    status: 'declared' | 'implemented' | 'verified' | 'experimental' | 'planned';
  }[];
}

export interface IdentifyLanguageRequest extends BaseRequest {
  operation: 'identify_language';
  text: string;
}

export interface IdentifyLanguageResponse extends BaseResponse {
  language_code: string;
  confidence: number;
}

export interface AnalyzeTextRequest extends BaseRequest {
  operation: 'analyze_text';
  text: string;
}

export interface AnalyzeTextResponse extends BaseResponse {
  analysis: Record<string, any>;
}

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
