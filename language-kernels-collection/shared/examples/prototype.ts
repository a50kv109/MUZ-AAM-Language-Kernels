import { 
  TranslateRequest, 
  AnalyzePoetryRequest, 
  LocalizeUIRequest, 
  InterpretMusicTextRequest 
} from '../interfaces/operations';

// Prototype Examples of Interface Contracts

// 1. Translate
const translateReq: TranslateRequest = {
  operation: 'translate',
  source_language: 'en',
  target_language: 'it',
  text: 'Save project'
};

// 2. Localize UI
const localizeReq: LocalizeUIRequest = {
  operation: 'localize_ui',
  source_language: 'en',
  target_language: 'it',
  items: [{ key: 'save_button', text: 'Save project', context: 'Toolbar', max_length: 20 }]
};

// 3. Interpret Music Text
const musicReq: InterpretMusicTextRequest = {
  operation: 'interpret_music_text',
  source_language: 'it',
  text: 'Allegro con fuoco'
};

console.log('Contract Contracts Initialized:', { translateReq, localizeReq, musicReq });
