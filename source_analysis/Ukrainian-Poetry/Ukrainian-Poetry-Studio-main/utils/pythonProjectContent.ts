export const PYTHON_PROJECT_FILES = [
  {
    name: "README.md",
    content: `# Ukrainian Rhyme Studio (Python Backend)

Це бекенд-частина проекту Ukrainian Rhyme Studio, що реалізує модернізоване ядро **CORE_UKRAINIAN_V1.0_MODERNIZED** (AAM-V2.1).

## Методологія AAM-V2.1

Проект використовує розширені протоколи генерації та аналізу:
- **Ontology Compensation**: Глибинна метафора та правило 720°.
- **Social & Emotional Layers**: Захисна іронія (OST6) та Сакральний патріотизм (OST9).
- **Advanced Metrics**: EVRID (Resonance), Sobornost (Coherence), TDI (Dissonance).

## Структура проекту

- \`main_api.py\`: FastAPI додаток.
- \`uk_rhyme_engine.py\`: Рушій генерації (AAM-V2.1).
- \`uk_metric_verifier.py\`: Модуль розрахунку метрик (EVRID, OST, TDI).
- \`uk_poetry_library.py\`: База профілів та патернів.

## Встановлення

\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Запуск

\`\`\`bash
uvicorn main_api:app --reload
\`\`\`
`
  },
  {
    name: "requirements.txt",
    content: `fastapi==0.109.0
uvicorn==0.27.0
pydantic==2.6.0
google-generativeai==0.3.2
python-dotenv==1.0.0
numpy==1.26.3
`
  },
  {
    name: "uk_poetry_library.py",
    content: `from enum import Enum
from typing import List, Dict

class AuthorProfile(Enum):
    SHEVCHENKO = "SHEVCHENKO"
    FRANKO = "FRANKO"
    UKRAINKA = "UKRAINKA"
    STUS = "STUS"
    KOSTENKO = "KOSTENKO"
    ZHADAN = "ZHADAN"

class PoeticStyle(Enum):
    FOLK_8_6 = "FOLK_8_6"
    CLASSICAL = "CLASSICAL"
    URBAN_VERS_LIBRE = "URBAN_VERS_LIBRE"
    FABLE = "FABLE"

PROFILES_DB: Dict[str, Dict] = {
    "SHEVCHENKO": {
        "description": "Кобзарський стиль, біблійні алюзії, архетипи (могила, степ).",
        "preferred_meter": "Kolomyika (4+4+6)",
        "vocabulary_bias": "archaic_romantic",
        "emotional_vector": "liberty_struggle"
    },
    "FRANKO": {
        "description": "Каменярський дух, філософський реалізм, сонетна форма.",
        "preferred_meter": "Iambic Pentameter",
        "vocabulary_bias": "civic_philosophical",
        "emotional_vector": "labor_progress"
    },
    "UKRAINKA": {
        "description": "Неоромантизм, 'Contra spem spero', вольові образи.",
        "preferred_meter": "Dolnik / Classical",
        "vocabulary_bias": "high_romantic",
        "emotional_vector": "willpower_overcoming"
    },
    "STUS": {
        "description": "Екзистенційна напруга, палімпсести, герметичність.",
        "preferred_meter": "Broken Rhythm / Vers Libre",
        "vocabulary_bias": "existential_hermetic",
        "emotional_vector": "stoic_suffering"
    },
    "ZHADAN": {
        "description": "Урбаністика, соціальний драйв, 'алкоголь і віра'.",
        "preferred_meter": "Syllabo-tonic Long Line",
        "vocabulary_bias": "modern_urban_slang",
        "emotional_vector": "social_drive"
    }
}

def get_profile_config(profile_id: str) -> Dict:
    return PROFILES_DB.get(profile_id, PROFILES_DB["SHEVCHENKO"])
`
  },
  {
    name: "uk_metric_verifier.py",
    content: `import re
import random
from typing import List, Dict

class MetricVerifier:
    def __init__(self):
        self.vowels = set("аеєиіїоуюяАЕЄИІЇОУЮЯ")

    def count_syllables(self, text: str) -> int:
        return sum(1 for char in text if char in self.vowels)

    def analyze_stress_pattern(self, line: str) -> str:
        # Placeholder for stress analysis
        return "01010101"

    def calculate_evrid(self, text: str) -> float:
        # Simulation of Evolutionary Resonance ID calculation
        # In real core: Deep etymological analysis
        return round(random.uniform(0.7, 0.99), 2)

    def calculate_sobornost(self, text: str) -> float:
        # Simulation of Syntactic Coherence
        return round(random.uniform(0.8, 0.95), 2)

    def calculate_tdi(self, text: str) -> float:
        # Simulation of Total Dissonance Index
        return round(random.uniform(0.1, 0.35), 2)

    def calculate_ost(self, text: str) -> Dict[str, float]:
        return {
            "ost1_prosody": round(random.uniform(0.8, 1.0), 2),
            "ost6_irony": round(random.uniform(0.4, 0.8), 2),
            "ost8_musicality": round(random.uniform(0.7, 0.95), 2),
            "ost9_sacred": round(random.uniform(0.6, 0.9), 2)
        }

    def verify_line(self, line: str, expected_meter: str) -> Dict:
        syllables = self.count_syllables(line)
        pattern = self.analyze_stress_pattern(line)
        
        is_valid = True
        error = None

        if expected_meter == "Kolomyika (4+4+6)" and not (13 <= syllables <= 14):
            is_valid = False
            error = f"Expected 14 syllables, got {syllables}"

        return {
            "text": line,
            "syllables": syllables,
            "pattern": pattern,
            "valid": is_valid,
            "error": error
        }

    def analyze_poem(self, text: str, profile_meter: str) -> Dict:
        lines = [l.strip() for l in text.split('\\n') if l.strip()]
        analysis = [self.verify_line(l, profile_meter) for l in lines]
        
        valid_lines = sum(1 for l in analysis if l["valid"])
        score = (valid_lines / len(lines)) * 100 if lines else 0
        
        return {
            "score": score,
            "evrid_score": self.calculate_evrid(text),
            "sobornost_index": self.calculate_sobornost(text),
            "tdi_score": self.calculate_tdi(text),
            "ost_metrics": self.calculate_ost(text),
            "lines": analysis
        }
`
  },
  {
    name: "uk_rhyme_engine.py",
    content: `import os
import google.generativeai as genai
from typing import List, Dict
from uk_poetry_library import AuthorProfile, PoeticStyle, get_profile_config
from uk_metric_verifier import MetricVerifier

# Налаштування API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class AAM_V2_1_Engine:
    def __init__(self):
        self.verifier = MetricVerifier()
        self.model = genai.GenerativeModel('gemini-3-pro-preview')

    def _construct_system_prompt(self) -> str:
        return """Ти — "CORE_UKRAINIAN_V1.0_MODERNIZED" (AAM-V2.1).
        
        ПРОТОКОЛИ:
        1. ONTOLOGY COMPENSATION: Глибинна метафора, правило 720°.
        2. SOCIAL LAYERS: Захисна іронія (OST6), Сакральний патріотизм (OST9).
        3. METRICS: EVRID, Sobornost, TDI.
        """

    async def generate_poetry(self, source_text: str, profile: AuthorProfile, styles: List[PoeticStyle]) -> Dict:
        profile_cfg = get_profile_config(profile.value)
        
        prompt = f"""
        АКТИВУВАТИ ЯДРО AAM-V2.1.
        ВХІД: "{source_text}"
        ПРОФІЛЬ: {profile.value}
        СТИЛІ: {', '.join([s.value for s in styles])}
        
        Завдання: Трансформуй текст у вірш. Максимізуй EVRID та Sobornost.
        """
        
        response = self.model.generate_content(
            contents=prompt,
            generation_config={"temperature": 0.7}
        )
        
        generated_text = response.text
        
        # Metric Verification Loop
        analysis = self.verifier.analyze_poem(generated_text, profile_cfg['preferred_meter'])
        
        return {
            "content": generated_text,
            "analysis": analysis,
            "profile_used": profile_cfg
        }
`
  },
  {
    name: "main_api.py",
    content: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from uk_rhyme_engine import AAM_V2_1_Engine
from uk_poetry_library import AuthorProfile, PoeticStyle

app = FastAPI(title="Ukrainian Rhyme Studio API (AAM-V2.1)")
engine = AAM_V2_1_Engine()

class PoetryRequest(BaseModel):
    text: str
    profile: str = "SHEVCHENKO"
    styles: List[str] = ["FOLK_8_6"]

@app.post("/generate")
async def generate_poetry(request: PoetryRequest):
    try:
        profile_enum = AuthorProfile[request.profile]
        styles_enum = [PoeticStyle[s] for s in request.styles]
        
        result = await engine.generate_poetry(request.text, profile_enum, styles_enum)
        return result
    except KeyError:
        raise HTTPException(status_code=400, detail="Invalid profile or style")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "CORE_UKRAINIAN_V1.0_MODERNIZED Online", "version": "2.1.0"}
`
  },
  {
    name: "ukrainian_rhyme_module.py",
    content: `import re
from typing import List, Dict, Any

class UkrainianRhymeModule:
    """
    Модуль римування для українського лінгвістичного ядра
    Інтегрується з CORE_UKRAINIAN_V1.0_MODERNIZED
    """
    
    def __init__(self, core_instance=None):
        self.core = core_instance
        self.rhyme_styles = {}
        self.rhyme_patterns_library = {}
        
    def extract_rhyme_principles(self, style_name: str, text_samples: list):
        """
        Вилучення принципів римування з текстових зразків
        """
        principles = {
            "style": style_name,
            "phonetic_patterns": self._analyze_phonetic_patterns(text_samples),
            "stress_patterns": self._analyze_stress_patterns(text_samples),
            "rhyme_schemes": self._extract_rhyme_schemes(text_samples),
            "vocabulary_clusters": self._cluster_vocabulary(text_samples),
            "ost_activation": self._calculate_ost_activation(text_samples)
        }
        return principles
    
    def _analyze_phonetic_patterns(self, texts):
        """Аналіз фонетичних патернів (OST1)"""
        patterns = []
        for text in texts:
            # Аналіз асонансів, алітерацій
            vowels = re.findall(r'[аеиіоуяюєї]', text)
            consonants = re.findall(r'[бвгґджзйклмнпрстфхцчшщ]', text)
            patterns.append({
                "vowel_pattern": "".join(vowels[:10]),
                "consonant_pattern": "".join(consonants[:10])
            })
        return patterns
    
    def _analyze_stress_patterns(self, texts):
        """Аналіз ритмічних схем"""
        # Placeholder implementation
        return ["010101", "101010"]

    def _cluster_vocabulary(self, texts):
        """Кластеризація лексики"""
        # Placeholder implementation
        return ["воля", "доля", "поле"]

    def _extract_rhyme_schemes(self, texts):
        """Витягнення схем римування (ABAB, AABB тощо)"""
        schemes = []
        for text in texts:
            lines = text.split('\\n')
            if len(lines) >= 4:
                # Визначення схеми за останніми словами
                last_words = [line.split()[-1] if line.split() else "" for line in lines[:4]]
                scheme = self._detect_rhyme_scheme(last_words)
                schemes.append(scheme)
        return list(set(schemes))
    
    def _detect_rhyme_scheme(self, words):
        """Визначення схеми римування для 4 рядків"""
        # Спрощена логіка
        if len(words) < 4:
            return "unknown"
        
        # Перевірка рим (однакові закінчення)
        rhymes = []
        for i, w1 in enumerate(words):
            for j, w2 in enumerate(words[i+1:], i+1):
                if w1 and w2 and w1[-2:] == w2[-2:]:
                    rhymes.append((i, j))
        
        # Визначення схеми
        if (0,2) in rhymes and (1,3) in rhymes:
            return "ABAB"  # перехресна
        elif (0,1) in rhymes and (2,3) in rhymes:
            return "AABB"  # парна
        elif (0,3) in rhymes and (1,2) in rhymes:
            return "ABBA"  # кільцева
        else:
            return "free"
    
    def _calculate_ost_activation(self, texts):
        """Розрахунок активації OST-осей для різних стилів"""
        ost_activation = {f"OST_{i}": 0 for i in range(1, 10)}
        
        for text in texts:
            # Класичний (OST9)
            if any(word in text.lower() for word in ["бог", "свят", "дух", "молитв"]):
                ost_activation["OST_9"] += 0.2
            
            # Емоційний (OST7)
            if any(word in text.lower() for word in ["серц", "любов", "душ"]):
                ost_activation["OST_7"] += 0.2
            
            # Іронічний (OST6)
            if "?" in text or "!" in text or "..." in text:
                ost_activation["OST_6"] += 0.1
                
        return {k: round(v, 2) for k, v in ost_activation.items()}
`
  },
  {
    name: "rhyme_patterns.json",
    content: `{
  "rhyme_styles_analysis": {
    "classical_taras": {
      "name": "Класичний (Тарас Шевченко)",
      "characteristics": {
        "rhyme_types": ["точні", "дієслівні", "іменникові"],
        "meter": ["ямб", "хорей"],
        "line_length": [8, 10, 12],
        "stress_pattern": "регулярний",
        "typical_schemes": ["aBaB", "aaBB", "ABAB"],
        "vocabulary_layer": ["сакральний", "народний"],
        "ost_targets": ["OST9", "OST7"]
      }
    },
    "frank_modernist": {
      "name": "Модерністський (Іван Франко)",
      "characteristics": {
        "rhyme_types": ["асонанси", "складні", "багатоскладові"],
        "meter": ["різноманітний", "дольник"],
        "line_length": [8, 10, 12, 14],
        "stress_pattern": "гібридний",
        "typical_schemes": ["ABBA", "AbbA", "вільні"],
        "vocabulary_layer": ["філософський", "публіцистичний"],
        "ost_targets": ["OST7", "OST5"]
      }
    },
    "folk_kolomyika": {
      "name": "Народний (Коломийка)",
      "characteristics": {
        "rhythm": "6/8",
        "rhyme_types": ["точні", "паралелізми"],
        "line_structure": "14 складів (7+7)",
        "tarantella_compatible": true,
        "stress_pattern": "коломийковий",
        "typical_schemes": ["a+a", "b+b"],
        "vocabulary_layer": ["діалектний", "обрядовий"],
        "ost_targets": ["OST1", "OST8"]
      }
    },
    "contemporary_zhadan": {
      "name": "Сучасний (Сергій Жадан)",
      "characteristics": {
        "rhyme_types": ["верлібр", "сленгові", "урбаністичні"],
        "meter": ["вільний", "акцентний"],
        "rhythm": "розмовний",
        "irony_modifier": -0.7,
        "vocabulary_layer": ["сленг", "урбаністичний", "соціальний"],
        "ost_targets": ["OST4", "OST6"]
      }
    },
    "lyrical_kostenko": {
      "name": "Ліричний (Ліна Костенко)",
      "characteristics": {
        "rhyme_types": ["мелодійні", "філософські"],
        "meter": ["ямб", "амфібрахій"],
        "emotional_spectrum": ["меланхолія", "ніжність"],
        "melancholy_coeff": 0.5,
        "vocabulary_layer": ["філософський", "природний"],
        "ost_targets": ["OST7", "OST9"]
      }
    },
    "urban_explosive": {
      "name": "Урбаністичний (Хіп-хоп)",
      "characteristics": {
        "rhyme_types": ["складні", "багатоскладові", "внутрішні"],
        "rhythm": "біт-орієнтований",
        "stress_pattern": "акцентний",
        "vesuvius_phase": "explosion",
        "explosion_coeff": 2.2,
        "vocabulary_layer": ["сленг", "урбаністичний"],
        "ost_targets": ["OST1", "OST8", "OST6"]
      }
    },
    "explosive_rhyme": {
      "name": "Вибухова рима (Сатира)",
      "characteristics": {
        "rhyme_types": ["гротескні", "саркастичні"],
        "irony_modifier": -0.8,
        "sarcasm_coeff": -0.8,
        "vesuvius_phase": "explosion",
        "target_ost": ["OST6"],
        "vocabulary_layer": ["соціальний", "політичний"]
      }
    }
  }
}`
  }
];
