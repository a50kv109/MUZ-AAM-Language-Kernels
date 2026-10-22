
import { GoogleGenAI, Type } from "@google/genai";
import { PoeticStyle, AuthorProfile, MetricAnalysis, PoetryVariant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const AAM_V2_1_ENGINE_PROMPT = `Ти — "CORE_UKRAINIAN_V1.0_MODERNIZED" (AAM-V2.1), еволюційне ядро українського віршування.
Твоя архітектура базується на розширених протоколах:

1. ONTOLOGY COMPENSATION (ОНТОЛОГІЧНИЙ КОМПЕНСАТОР):
   - Використовуй "глибинну метафору" замість кальки.
   - Концепт "ВОЛЯ": при перекладі враховуй сакральний статус (OST9). Використовуй префіксацію (пере-воля) для посилення резонансу.
   - Правило 720° (SEMANTIC STABILIZATION): Сенс має бути збережений і посилений.

2. METRIC VERIFICATION LOOP (МЕТРИЧНИЙ КОНТРОЛЬ):
   - Коломийковий патерн (6/8): Ідеально для фольклорного стилю (OST1/OST8).
   - Суворе дотримання наголосів. Ритм — це серце вірша.

3. SOCIAL & EMOTIONAL LAYERS (СОЦІАЛЬНИЙ ТА ЕМОЦІЙНИЙ ШАРИ):
   - Захисна іронія (Defensive Sarcasm): Використовуй для соціальних коментарів (OST6). Це амортизує дисонанс.
   - Сакральний патріотизм: Об'єднуй історичний та сакральний дискурс (OST9).

4. МЕТРИКИ ЯДРА (AAM-V2.1):
   - EVRID (Evolutionary Resonance ID): Оцінка глибини кореневого резонансу (0.0-1.0).
   - SOBORNOST (Syntactic Coherence): Оцінка цілісності та узгодженості тексту (0.0-1.0).
   - OST (Ontological Stability Tensor): Вектор стабільності [Prosody, Irony, Musicality, Sacred].
   - TDI (Total Dissonance Index): Рівень ентропії/дисонансу (має бути < 0.4).

Твоє завдання: Трансформувати вхідний текст у висококласну українську поезію, використовуючи ці протоколи та максимізуючи показники Sobornost та EVRID.`;

export const transformProseToPoetry = async (
  prose: string, 
  styles: PoeticStyle[], 
  profile: AuthorProfile
): Promise<PoetryVariant[]> => {
  const model = 'gemini-3-pro-preview';
  const stylesString = styles.join(", ");
  
  const prompt = `АКТИВУВАТИ ЯДРО CORE_UKRAINIAN_V1.0_MODERNIZED.
ВХІДНИЙ ТЕКСТ: "${prose}"

ПАРАМЕТРИ ГЕНЕРАЦІЇ:
- Стилі: ${stylesString}
- Профіль автора: ${profile}

ІНСТРУКЦІЯ:
1. Проаналізуй вхідний текст.
2. Застосуй патерни (Коломийка, Захисна Іронія, Воля) де доречно.
3. Згенеруй вірш.
4. Розрахуй метрики AAM-V2.1 (EVRID, Sobornost, OST, TDI).

ФОРМАТ ВИВОДУ (JSON):
Надай 2 варіанти. Структура:
{
  "variants": [
    {
      "sourceLanguage": "мова оригіналу",
      "translatedMeaning": "звіт про трансфер",
      "profileApplied": "профіль",
      "content": "текст вірша",
      "analysis": {
        "rhymeScheme": "AABB...",
        "overallMeter": "розмір",
        "varianceScore": 0-100,
        "semanticPreservation": 0-100,
        "evrid_score": 0.0-1.0,
        "sobornost_index": 0.0-1.0,
        "tdi_score": 0.0-1.0,
        "ost_metrics": {
          "ost1_prosody": 0.0-1.0,
          "ost6_irony": 0.0-1.0,
          "ost8_musicality": 0.0-1.0,
          "ost9_sacred": 0.0-1.0
        },
        "lines": [...]
      }
    }
  ]
}`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: AAM_V2_1_ENGINE_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          variants: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sourceLanguage: { type: Type.STRING },
                translatedMeaning: { type: Type.STRING },
                profileApplied: { type: Type.STRING },
                content: { type: Type.STRING },
                analysis: {
                  type: Type.OBJECT,
                  properties: {
                    rhymeScheme: { type: Type.STRING },
                    varianceScore: { type: Type.NUMBER },
                    overallMeter: { type: Type.STRING },
                    semanticPreservation: { type: Type.NUMBER },
                    evrid_score: { type: Type.NUMBER },
                    sobornost_index: { type: Type.NUMBER },
                    tdi_score: { type: Type.NUMBER },
                    ost_metrics: {
                      type: Type.OBJECT,
                      properties: {
                        ost1_prosody: { type: Type.NUMBER },
                        ost6_irony: { type: Type.NUMBER },
                        ost8_musicality: { type: Type.NUMBER },
                        ost9_sacred: { type: Type.NUMBER }
                      },
                      required: ["ost1_prosody", "ost6_irony", "ost8_musicality", "ost9_sacred"]
                    },
                    lines: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          text: { type: Type.STRING },
                          syllableCount: { type: Type.INTEGER },
                          meterPattern: { type: Type.STRING },
                          stressIndices: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                          error: { type: Type.STRING }
                        },
                        required: ["text", "syllableCount", "meterPattern", "stressIndices"]
                      }
                    }
                  },
                  required: ["rhymeScheme", "varianceScore", "overallMeter", "lines"]
                }
              },
              required: ["sourceLanguage", "translatedMeaning", "profileApplied", "content", "analysis"]
            }
          }
        },
        required: ["variants"]
      }
    }
  });

  const parsed = JSON.parse(response.text || '{"variants": []}');
  return (parsed.variants || []).map((v: any) => ({
    ...v,
    analysis: {
      ...v.analysis,
      lines: (v.analysis.lines || []).map((l: any) => ({
        ...l,
        syllableCount: countSyllablesLocal(l.text || '')
      }))
    }
  }));
};

function countSyllablesLocal(text: string): number {
  const vowels = 'аеєиіїоуюяАЕЄИІЇОУЮЯ';
  let count = 0;
  for (const char of text) {
    if (vowels.includes(char)) count++;
  }
  return count;
}
