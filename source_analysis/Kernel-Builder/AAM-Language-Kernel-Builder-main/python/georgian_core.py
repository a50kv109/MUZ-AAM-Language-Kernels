"""
🧬 CORE_GEORGIAN_V1.0 - Georgian Linguistic Core (OST-9)
Architect: Artsybashev Andrey Alekseevich (Kharkiv, Ukraine)
Identifier: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
Methodology: Artsybashev's Method (AAM-V1 / AAM-V2.1 UKGS)

Implements 9-axis (OST-9) Kartvelian language ontology:
  OST-1: Phonetic consonant clusters (e.g. gvprtskvni, mts'vrtneli)
  OST-2: Agglutinative morpheme stack
  OST-3: Predicative constructs (Nominative, Ergative, Dative)
  OST-4: Polypersonal verb agreements
  OST-5: Split ergativity (-m / -ma agent marking in aorist)
  OST-6: Lexical semantic roots
  OST-7: Historical diachronic layers
  OST-8: Comparative Indo-European / Slavic differential
  OST-9: Sacred-cultural Supra invariants (Supra, Tamada, Sadghegrdzelo)
"""

import math
import re
import time
from typing import Dict, List, Any


class AAM_Georgian_Core:
    def __init__(self):
        self.signature = "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS"
        self.phi = 1.61803398875
        self.theta = 0.367879
        self.v_ref = 0.201
        self.delta_pos = 0.68  # Position on delta semantic density continuum

        # Georgian vowel phonemes
        self.vowels = set("აეიოუaeiou")

        # ZIC Registry (OST-9 & OST-6 Sacred Invariants)
        self.zic_registry: Dict[str, Dict[str, Any]] = {
            "SUPRA": {
                "word": "სუფრა",
                "meaning": "ritual feast of unity and ontological alignment",
                "effect": -0.07,
            },
            "TAMADA": {
                "word": "თამადა",
                "meaning": "order holder / toastmaster / structural leader",
                "effect": -0.06,
            },
            "MAMA": {
                "word": "მამა",
                "meaning": "father / Creator",
                "effect": -0.05,
            },
            "SADGHEGRDZELO": {
                "word": "სადღეგრძელო",
                "meaning": "sacred toast / verbal architecture",
                "effect": -0.05,
            },
            "TSKHOVREBA": {
                "word": "ცხოვრება",
                "meaning": "life / existence",
                "effect": -0.04,
            },
            "MTSKHERA": {
                "word": "მწერალი",
                "meaning": "scribe / ontological record keeper",
                "effect": -0.03,
            },
        }

        self.memory: List[Dict[str, Any]] = []

    def _kenosis_check(self, tdi: float) -> bool:
        """Check against critical Kenosis threshold"""
        return tdi > self.theta

    def calculate_consonant_cluster_density(self, text: str) -> float:
        """
        OST-1: Consonant cluster density calculation.
        Georgian allows up to 8 consecutive consonants (e.g., გვფრცქვნი - gvprtskvni).
        """
        clean_text = re.sub(r"[^a-zა-ჰ]", "", text.lower())
        if not clean_text:
            return 0.1
        max_cluster = 0
        current_cluster = 0
        for char in clean_text:
            if char not in self.vowels:
                current_cluster += 1
                if current_cluster > max_cluster:
                    max_cluster = current_cluster
            else:
                current_cluster = 0
        return min(max_cluster / 8.0, 1.0)

    def calculate_morphological_density(self, tokens: List[str]) -> float:
        """
        OST-2 & OST-4: Agglutinative stack complexity.
        """
        if not tokens:
            return 0.1
        avg_len = sum(len(t) for t in tokens) / len(tokens)
        return min((avg_len / 10.0), 1.0)

    def check_structural_clarity(self, tokens: List[str]) -> float:
        """
        OST-3 & OST-5: Split ergativity agent marker (-მ / -მა / -მან).
        The presence of clear active agency reduces semantic drift (lowers TDI).

        Returns structural clarity coefficient S >= 1.0:
          - S = 1.00: Baseline (no identifiable ergative or dative marker)
          - S = 1.08: Dative indirect object marker (-ს) detected
          - S = 1.20: Explicit ergative agent marker (-მა / -მ / მან) detected

        Script isolation and morphology:
          - Mkhedruli script (U+10D0..U+10FF) separated from Latin transliteration.
          - Consonant-stem ergative (-მა) validated: preceded by consonant (e.g. კაც-მა).
          - Vowel-stem ergative (-მ) validated: preceded by vowel (e.g. დედა-მ, მამა-მ).
          - Autonomous pronoun 'მან' matched as an independent token.
          - Non-Georgian Latin false positives ('human', 'system', 'program') rejected.
        """
        import unicodedata

        georgian_char_regex = re.compile(r"[\u10D0-\u10FF]")
        vowels_georgian = set("აეიოუ")
        latin_false_positives = {
            "human", "system", "program", "problem", "schema",
            "dilemma", "cinema", "enigma", "postman", "gentleman",
            "chairman", "woman", "policeman", "spokesman", "fireman",
            "term", "item", "algorithm", "diagram", "paradigm", "random", "form"
        }

        has_ergative = False
        has_dative = False

        for raw_token in tokens:
            token = unicodedata.normalize("NFC", raw_token.strip(".,!?:;«»\"'()[]{}—–")).lower()
            if not token:
                continue

            # Case 1: Mkhedruli Georgian script
            if georgian_char_regex.search(token):
                if token == "მან":
                    has_ergative = True
                    break
                # Consonant stem + -მა (e.g. კაც-მა, მწვრთნელ-მა)
                if len(token) >= 4 and token.endswith("მა") and token[-3] not in vowels_georgian:
                    has_ergative = True
                    break
                # Vowel stem + -მ (e.g. დედა-მ, მამა-მ)
                if len(token) >= 4 and token.endswith("მ") and token[-2] in vowels_georgian:
                    has_ergative = True
                    break
                # Dative case -ს (e.g. კაც-ს)
                if len(token) >= 3 and token.endswith("ს"):
                    has_dative = True

            # Case 2: Latin transliteration (guarded against false positives)
            elif token not in latin_false_positives:
                if token == "man":
                    has_ergative = True
                    break
                if len(token) >= 5 and token.endswith("ma") and token[-3] not in set("aeiou"):
                    has_ergative = True
                    break

        if has_ergative:
            return 1.20  # Ergative agent lowers TDI by 16.7%
        elif has_dative:
            return 1.08  # Dative marker lowers TDI by 7.4%
        return 1.00      # Baseline clarity

    def calculate_georgian_tdi(self, text: str, tokens: List[str]) -> float:
        """
        Specific Georgian TDI model:
        TDI = (phonetic_complexity * morph_density * K_KART) / structural_clarity + zic_effects

        Where:
          - phonetic_complexity in [0.1, 1.0]: consonant cluster density (OST-1)
          - morph_density in [0.1, 1.0]: agglutinative token length density (OST-2)
          - K_KART = 0.70: Kartvelian Phonotactic Normalization Factor.
            Normalizes Georgian harmonic consonant clusters (up to 8 consecutive consonants)
            to prevent false Kenosis rejections on grammatically valid Kartvelian phrases.
          - structural_clarity in [1.0, 1.20]: syntactical stability divisor (OST-5).
            Higher clarity (presence of agentive ergative marker) strictly REDUCES TDI.
          - zic_effects: ontological stabilizers from sacred registry.
        """
        if not tokens:
            return 1.0
        phonetic_complexity = self.calculate_consonant_cluster_density(text)
        morph_density = self.calculate_morphological_density(tokens)
        structural_clarity = self.check_structural_clarity(tokens)

        # Kartvelian phonotactic normalization constant
        k_kart = 0.70
        raw_tdi = (phonetic_complexity * morph_density * k_kart) / structural_clarity

        # Apply ZIC stabilizers
        text_upper = text.upper()
        zic_effect = 0.0
        for key, zic in self.zic_registry.items():
            if key in text_upper or zic["word"] in text:
                zic_effect += zic["effect"]

        return min(max(raw_tdi + zic_effect, 0.0), 1.0)

    def analyze_720_sync(self, text: str) -> Dict[str, Any]:
        """
        720° Double-turn analysis for Georgian texts.
        """
        tokens = text.split()
        local_tdi = self.calculate_georgian_tdi(text, tokens)

        if self._kenosis_check(local_tdi):
            return {
                "identifier": self.signature,
                "status": "KENOSIS_TRIGGERED",
                "tdi": round(local_tdi, 4),
                "threshold": self.theta,
                "msg": f"Chaos exceeded Kenosis threshold {self.theta:.4f}",
            }

        coherence = 1.0 - (abs(local_tdi - self.v_ref) * self.phi)
        zic_found = [
            z["word"]
            for k, z in self.zic_registry.items()
            if k in text.upper() or z["word"] in text
        ]

        result = {
            "identifier": self.signature,
            "status": "CRYSTALLIZED",
            "language_core": "Georgian (Kartvelian)",
            "delta_density": self.delta_pos,
            "coherence": round(max(0.0, coherence), 4),
            "tdi": round(local_tdi, 4),
            "zic_found": zic_found,
            "axes_analysis": {
                "OST-1_Phonetic": round(self.calculate_consonant_cluster_density(text), 3),
                "OST-2_Morphological": round(self.calculate_morphological_density(tokens), 3),
                "OST-5_Ergative_Clarity": round(self.check_structural_clarity(tokens), 3),
            },
            "sync_720": True,
        }
        self.memory.append({"text": text[:50], "tdi": local_tdi, "time": time.time()})
        return result


class GeorgianCore(AAM_Georgian_Core):
    """Alias for backwards compatibility"""
    pass
