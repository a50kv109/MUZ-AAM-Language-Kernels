export type Language = 'en' | 'ru';

export const translations = {
  en: {
    title: "Universal Language Kernel Builder AAM-V2.1",
    architect: "ARCHITECT: ARTSYBASHEV A.A.",
    systemActive: "SYSTEM ACTIVE",
    mode1: "Mode 1: Single Kernel Collection",
    mode2: "Mode 2: Multi-Kernel Combination",
    
    // Mode 1
    configuration: "Configuration",
    slavicGroup: "Slavic Group",
    classicalGroup: "Classical Group",
    semiticGroup: "Semitic Group",
    targetLanguage: "Target Language (Custom)",
    placeholder: "Enter language name...",
    methodology: "Assembly Methodology",
    initiate: "Start Kernel Assembly",
    assembling: "Generating Kernel...",
    systemLog: "System Log",
    downloadZip: "Download ZIP",
    readyTitle: "System Ready",
    readyDesc: "Select a language and methodology on the left to start the kernel generation process.",
    selectFile: "Select a file to view",
    
    // Mode 2
    orchestratorTitle: "Universal Kernel Assembler AAM-V2.1",
    orchestratorSubtitle: "Meaning & Structure Transfer Between Kernels",
    registry: "Available Kernel Registry",
    howItWorks: "Transformation Methodology",
    workspace: "Transformation Workspace",
    manualAssembly: "Manual Mapping",
    manualModeOn: "Manual Mapping: ON",
    forceAssemble: "Force Link",
    calculate: "Calculate Correspondence",
    tdiThreshold: "TDI Threshold (Drift Tolerance)",
    tdiWarning: "Increasing threshold allows looser semantic matches but risks meaning loss.",
    analysisLog: "Transformation Log",
    bellFiberDiagnostics: "Semantic Bridge Diagnostics (Bell Fiber)",
    resonance: "Resonance",
    drift: "Drift (TDI)",
    stable: "ALIGNED",
    broken: "MISALIGNED",
    unifiedBlock: "Semantic Bridge Established",
    collapsePrevented: "Semantic Collapse Prevented",
    successMsg: "Precise semantic and rhythmic correspondence established.",
    failMsg: "Translation Drift Index (TDI) too high. Accurate transfer impossible.",
    coherenceIndex: "Fidelity Index",
    exportResults: "Export Mappings",
    addKernelsPrompt: "Select Source and Target kernels to begin mapping...",
    jsonManifest: "Mapping Manifest",
    pythonModule: "Transformation Module",
    kernelBundle: "Linked Kernel Package",
    
    // Tooltips / Explanations
    mode1Tooltip: "Action: Select language and method. Result: Generated kernel structure. Metrics: Base morphology.",
    mode2Tooltip: "Action: Map 2+ kernels. Result: Semantic bridge for translation. TDI: Accuracy of meaning transfer.",
    
    // How it works details
    hiw1: "Semantic Intersection: Mapping of invariants to ensure precise meaning transfer.",
    hiw2: "Morphological Alignment: Preserving structural and rhythmic patterns.",
    hiw3: "Drift Index (TDI): Deviation from original meaning. Lower is better.",
    hiw4: "Final Rating: Translation fidelity score (0-100%).",

    // Module Goal
    moduleGoalTitle: "MODULE OBJECTIVE",
    moduleGoalText: "Use one language kernel for precise meaning transfer to another, without mixing texts of different languages; each kernel remains individual and connected via Bell Fibers.",

    // Logs
    logConnection: "🔍 CONNECTION DETECTED",
    logHighInvariant: "✅ High invariant intersection (root matrix).",
    logStructDiff: "ℹ️ Minimal structural differences (common Indo-European base).",

    methods: {
      A: "Method A (Basic)",
      B: "Method B (Extended)",
      C: "Method C (Deep)",
      S: "Method S (Sacred)",
      Modernized: "Modernized"
    },
    
    languages: {
      Russian: "Russian",
      Ukrainian: "Ukrainian",
      Belarusian: "Belarusian",
      OldSlavic: "Old Slavic",
      Polish: "Polish",
      Core: "Core Kernel",
      Linguistic: "Linguistic",
      Sanskrit: "Sanskrit",
      Greek: "Greek",
      Latin: "Latin",
      Hebrew: "Hebrew",
      Etruscan: "Etruscan",
      Georgian: "Georgian"
    },
    kartvelianGroup: "Kartvelian Group"
  },
  ru: {
    title: "Универсальный Сборщик Языковых Ядер AAM-V2.1",
    architect: "АРХИТЕКТОР: АРЦЫБАШЕВ А.А.",
    systemActive: "СИСТЕМА АКТИВНА",
    mode1: "Режим 1: Сбор одиночного языкового ядра",
    mode2: "Режим 2: Комбинация и анализ нескольких ядер",

    // Mode 1
    configuration: "Конфигурация",
    slavicGroup: "Славянская группа",
    classicalGroup: "Классическая группа",
    semiticGroup: "Семитская группа",
    kartvelianGroup: "Картвельская группа",
    targetLanguage: "Целевой язык (Ручной ввод)",
    placeholder: "Введите название языка...",
    methodology: "Методология сборки",
    initiate: "Запустить сборку ядра",
    assembling: "Генерация ядра...",
    systemLog: "Системный лог",
    downloadZip: "Скачать ZIP",
    readyTitle: "Система готова к работе",
    readyDesc: "Выберите язык и методологию слева, чтобы начать процесс генерации и сборки языкового ядра.",
    selectFile: "Выберите файл для просмотра",

    // Mode 2
    orchestratorTitle: "Универсальный Сборщик Языковых Ядер AAM-V2.1",
    orchestratorSubtitle: "Трансфер смыслов и структур между ядрами",
    registry: "Реестр доступных ядер",
    howItWorks: "Методология трансформации",
    workspace: "Рабочая область трансформации",
    manualAssembly: "Ручное сопоставление",
    manualModeOn: "Ручное сопоставление: ВКЛ",
    forceAssemble: "Принудительно связать",
    calculate: "Рассчитать соответствие",
    tdiThreshold: "Порог TDI (Допустимый дрейф)",
    tdiWarning: "Увеличение порога позволяет связывать менее близкие смыслы, но повышает риск искажения.",
    analysisLog: "Лог трансформации",
    bellFiberDiagnostics: "Диагностика семантического моста (Bell Fiber)",
    resonance: "Резонанс",
    drift: "Дрейф (TDI)",
    stable: "СИНХРОНИЗИРОВАНО",
    broken: "РАССИНХРОН",
    unifiedBlock: "Семантический мост установлен",
    collapsePrevented: "Предотвращен смысловой коллапс",
    successMsg: "Установлено точное соответствие смыслов и ритмики.",
    failMsg: "Слишком высокий дрейф смысла (TDI). Точный перевод невозможен.",
    coherenceIndex: "Индекс точности",
    exportResults: "Экспорт карты соответствий",
    addKernelsPrompt: "Выберите исходное и целевое ядро для начала сопоставления...",
    jsonManifest: "Манифест соответствий (JSON)",
    pythonModule: "Модуль трансформации (Python)",
    kernelBundle: "Пакет связанных ядер",

    // Tooltips / Explanations
    mode1Tooltip: "Действие: Выбор языка и метода. Результат: Структура ядра. Метрики: Базовая морфология.",
    mode2Tooltip: "Действие: Сопоставление 2+ ядер. Результат: Семантический мост для перевода. TDI: Точность передачи смысла.",

    // How it works details
    hiw1: "Семантическое пересечение: Поиск инвариантов для точной передачи смысла.",
    hiw2: "Морфологическое выравнивание: Сохранение структуры и ритмики оригинала.",
    hiw3: "Индекс дрейфа (TDI): Отклонение от исходного смысла. Чем меньше, тем лучше.",
    hiw4: "Итоговый рейтинг: Оценка точности перевода (0-100%).",

    // Module Goal
    moduleGoalTitle: "ЦЕЛЬ МОДУЛЯ",
    moduleGoalText: "использовать одно языковое ядро для точного переноса смысла в другое, без смешивания текстов разных языков; каждое ядро остаётся индивидуальным и связанным через Белловские волокна.",

    // Logs
    logConnection: "🔍 ОБНАРУЖЕНА СВЯЗЬ",
    logHighInvariant: "✅ Высокий уровень пересечения инвариантов (корневая матрица).",
    logStructDiff: "ℹ️ Структурные различия минимальны (общая индоевропейская база).",

    methods: {
      A: "Метод A (Базовый)",
      B: "Метод B (Расширенный)",
      C: "Метод C (Глубокий)",
      S: "Метод S (Сакральный)",
      Modernized: "Модернизированный"
    },

    languages: {
      Russian: "Русский",
      Ukrainian: "Украинский",
      Belarusian: "Белорусский",
      OldSlavic: "Старославянский",
      Polish: "Польский",
      Core: "Базовое ядро",
      Linguistic: "Лингвистический",
      Sanskrit: "Санскрит",
      Greek: "Греческий",
      Latin: "Латынь",
      Hebrew: "Иврит",
      Etruscan: "Этрусский",
      Georgian: "Грузинский"
    }
  }
};
