"""
🧬 AAM-V1 UNIVERSAL LINGUISTIC MODULE v3.2.1 (EXPERT EDITION)
Architect: Artsybashev Andrey Alekseevich (Kharkiv, Ukraine)
Identifier: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
Standard: PyPI Ready / Crystallized / Zenodo Grounded

Universal analyzer of semantic integrity, topological dissonance (TDI),
and ontological invariance across linguistic systems.
"""

import math
import time
import json
from typing import Dict, List, Any, Optional
from collections import defaultdict


class AAM_Expert_Core:
    """
    Universal Linguistic Module (AAM-V1) v3.2.1.
    Operates via 720° Double-Turn Sync and enforces three hardware-level invariants:
      - theta (Kenosis Threshold) = 0.367879 (1/e)
      - phi (Golden Ratio) = 1.61803398875
      - v_ref (Topological Equilibrium) = 0.201
    """

    def __init__(self):
        self.signature = "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS"
        self.phi = 1.61803398875
        self.theta = 0.367879
        self.v_ref = 0.201

        # ZIC Invariant Registry (Axioms & Ritual stabilizers)
        self.zic_registry: Dict[str, Dict[str, Any]] = {
            "ŚAR": {"meaning": "action without ego / completeness", "effect": -0.06},
            "RTA": {"meaning": "cosmic order / dharma", "effect": -0.04},
            "SATYA": {"meaning": "truthfulness / ontological reality", "effect": -0.05},
            "LOVE": {"meaning": "agape / unconditional unity", "effect": -0.05},
            "HUMILITY": {"meaning": "humility / ego suppression", "effect": -0.08},
            "SUTHINA": {"meaning": "for the tomb / transition to eternity", "effect": -0.07},
            "ZICHUCHE": {"meaning": "written / sacred divine law", "effect": -0.06},
            "TINIA": {"meaning": "supreme authority / cosmic master", "effect": -0.07},
            "CLAN": {"meaning": "son / vertical lineage continuity", "effect": -0.03},
        }

        self.memory: List[Dict[str, Any]] = []

    def check_etruscan_phonetic_dissonance(self, text: str) -> float:
        """
        Etruscan Phonetic Filter:
        Classical Etruscan lacks voiced stops /b, d, g/ and the vowel /o/.
        Presence of these characters in supposed Etruscan inscriptions incurs penalty.
        """
        forbidden_chars = {'B', 'D', 'G', 'O'}
        text_upper = text.upper()
        if not text:
            return 0.0
        violation_count = sum(1 for char in text_upper if char in forbidden_chars)
        if violation_count == 0:
            return 0.0
        return min((violation_count / len(text)) * 2.0, 1.0)

    def check_voynich_eva_topology(self, tokens: List[str]) -> float:
        """
        Voynich EVA Topology Filter:
        Validates the strict structural rule where 'q' must precede 'o' (rule of q+o).
        """
        violations = 0
        qo_words = 0
        for token in tokens:
            lower = token.lower()
            if lower.startswith('q'):
                qo_words += 1
                if len(lower) < 2 or lower[1] != 'o':
                    violations += 1
        if qo_words == 0:
            return 0.0
        return violations / qo_words

    def calculate_spatial_coherence(self, text_density: float, visual_anchors_count: int) -> float:
        """
        Etrusca Disciplina spatial harmonic multiplier.
        """
        if visual_anchors_count <= 0:
            return 1.0
        spatial_resonance = (text_density / visual_anchors_count) * self.phi
        return round(math.exp(-abs(spatial_resonance - self.v_ref)), 4)

    def _kenosis_check(self, tdi: float) -> bool:
        """Kenosis threshold verification (Hallucination & Semantic Collapse Guard)"""
        return tdi > self.theta

    def _calculate_local_tdi(self, tokens: List[str], language: str = "unknown") -> float:
        """360° turn: local morphological, syntactic, and semantic chaos calculation"""
        if not tokens:
            return 1.0

        lens = [len(t) for t in tokens]
        avg = sum(lens) / len(lens)
        var = sum((x - avg) ** 2 for x in lens) / len(lens)
        morph_score = min(var * 0.1, 0.5)

        syntax_score = 1.0 - (len(set(tokens)) / len(tokens))

        zic_count = sum(1 for t in tokens if t.upper() in self.zic_registry)
        semantic_score = zic_count / len(tokens)

        lang_lower = language.lower()
        etruscan_penalty = (
            self.check_etruscan_phonetic_dissonance(" ".join(tokens))
            if lang_lower == "etruscan"
            else 0.0
        )
        voynich_penalty = (
            self.check_voynich_eva_topology(tokens)
            if lang_lower == "voynich"
            else 0.0
        )

        tdi = (
            0.3 * morph_score
            + 0.3 * syntax_score
            + 0.2 * semantic_score
            + 0.1 * etruscan_penalty
            + 0.1 * voynich_penalty
        )
        return min(max(tdi, 0.0), 1.0)

    def analyze_720_sync(
        self,
        text: str,
        language: str = "unknown",
        visual_anchors: int = 0,
        text_density: float = 1.0,
    ) -> Dict[str, Any]:
        """
        720° Sync Double-Turn Method:
          - 360°: Local morphological and syntactic dissonance calculation.
          - Kenosis Pause: If TDI > theta (0.3678), abort with KENOSIS_TRIGGERED.
          - 720°: Global ontology stabilization via ZIC-registry invariants.
        """
        clean_text = "".join(
            c.upper() for c in text if c.isalnum() or c.isspace() or c in ["{", "}"]
        )
        tokens = clean_text.split()

        # 360° First turn
        local_tdi = self._calculate_local_tdi(tokens, language)

        # Kenosis Guard
        if self._kenosis_check(local_tdi):
            return {
                "identifier": self.signature,
                "status": "KENOSIS_TRIGGERED",
                "tdi": round(local_tdi, 4),
                "threshold": self.theta,
                "msg": f"Semantic entropy exceeded Kenosis threshold {self.theta:.4f}.",
            }

        # 720° Second turn: ZIC Invariant Stabilization
        spatial_coherence = self.calculate_spatial_coherence(text_density, visual_anchors)

        final_tdi = local_tdi
        zic_found = []
        for word in tokens:
            if word in self.zic_registry:
                final_tdi += self.zic_registry[word]["effect"]
                zic_found.append(word)

        final_tdi = max(0.001, min(final_tdi, 1.0))
        coherence = (1.0 - (abs(final_tdi - self.v_ref) * self.phi)) * spatial_coherence

        result = {
            "identifier": self.signature,
            "status": "CRYSTALLIZED",
            "language_mode": language.upper(),
            "coherence_module64": round(max(0.0, coherence), 4),
            "tdi": round(final_tdi, 4),
            "spatial_resonance": spatial_coherence,
            "zic_found": zic_found,
            "sync_720": True,
        }

        self.memory.append({"text": text[:50], "tdi": final_tdi, "time": time.time()})
        return result
