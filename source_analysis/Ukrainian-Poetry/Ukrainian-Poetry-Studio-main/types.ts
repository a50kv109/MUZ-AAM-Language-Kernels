
export enum PoeticStyle {
  FOLK_8_6 = 'Народний (8+6)',
  CLASSICAL = 'Класичний',
  URBAN_VERS_LIBRE = 'Урбаністичний верлібр',
  FABLE = 'Байка',
  RHYMED_STORY = 'Оповідь з римою',
  HYBRID = 'Гібридний'
}

export enum AuthorProfile {
  SHEVCHENKO = 'Тарас Шевченко',
  FRANKO = 'Іван Франко',
  UKRAINKA = 'Леся Українка',
  STUS = 'Василь Стус',
  KOSTENKO = 'Ліна Костенко',
  ZHADAN = 'Сергій Жадан',
  MIXED = 'Змішаний'
}

export interface LineAnalysis {
  text: string;
  syllableCount: number;
  meterPattern: string; // "010101"
  stressIndices: number[];
  error?: string;
}

export interface MetricAnalysis {
  lines: LineAnalysis[];
  rhymeScheme: string;
  varianceScore: number; 
  overallMeter: string;
  semanticPreservation: number; // 0-100 score
  
  // AAM-V2.1 Modernized Metrics
  evrid_score?: number; // 0.0 - 1.0 (Evolutionary Resonance ID)
  sobornost_index?: number; // 0.0 - 1.0 (Syntactic Coherence)
  ost_metrics?: {
    ost1_prosody: number;
    ost6_irony: number;
    ost8_musicality: number;
    ost9_sacred: number;
  };
  tdi_score?: number; // 0.0 - 1.0 (Total Dissonance Index)
}

export interface PoetryVariant {
  content: string;
  sourceLanguage: string;
  translatedMeaning: string;
  profileApplied: string;
  analysis: MetricAnalysis;
}

export interface PoemVersion {
  id: string;
  timestamp: number;
  sourceText: string;
  variants: PoetryVariant[];
  selectedVariantIndex: number;
  styles: PoeticStyle[];
  profile: AuthorProfile;
}
