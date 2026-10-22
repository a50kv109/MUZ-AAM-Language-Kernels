export type LanguageCode = string;

export interface Uncertainty {
  level: 'high' | 'medium' | 'low';
  reason: string;
}

export interface Status {
  code: 'success' | 'partial' | 'error';
  warnings?: string[];
  uncertainty?: Uncertainty;
}

export interface BaseRequest {
  operation: string;
  source_language: LanguageCode;
  target_language?: LanguageCode;
  context?: Record<string, any>;
}

export interface BaseResponse {
  status: Status;
  module_id: string;
  version: string;
}
