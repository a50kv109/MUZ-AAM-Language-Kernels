"""
Test suite for CORE_GEORGIAN_V1.0 (Georgian OST-9 Linguistic Core)
Architect: Artsybashev Andrey Alekseevich
Identifier: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
"""

import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from python.georgian_core import AAM_Georgian_Core


class TestGeorgianCore(unittest.TestCase):
    def setUp(self):
        self.core = AAM_Georgian_Core()

    def test_invariants(self):
        self.assertEqual(
            self.core.signature, "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS"
        )
        self.assertAlmostEqual(self.core.theta, 0.367879, places=5)
        self.assertAlmostEqual(self.core.phi, 1.61803398875, places=5)
        self.assertAlmostEqual(self.core.v_ref, 0.201, places=3)
        self.assertEqual(self.core.delta_pos, 0.68)

    def test_consonant_clusters(self):
        """Tests cluster calculation up to 8 consonants"""
        # "გვფრცქვნი" has 8 consonants: g-v-p-r-ts-k-v-n
        density = self.core.calculate_consonant_cluster_density("გვფრცქვნი")
        self.assertGreaterEqual(density, 0.8)

        # Simple vowel-balanced word
        simple_density = self.core.calculate_consonant_cluster_density("მამა")
        self.assertLess(simple_density, 0.3)

    def test_ergative_detection(self):
        """Tests agent marker (-მ / -მა / მან) detection in aorist"""
        tokens_with_ergative = ["მან", "დაწერა", "წერილი"]
        clarity = self.core.check_structural_clarity(tokens_with_ergative)
        self.assertEqual(clarity, 1.20)  # Ergative agent clarity factor (reduces TDI by 16.7%)

    def test_ergative_reduces_tdi(self):
        """DEF-09 & DEF-10: Mathematical proof that ergative presence strictly REDUCES TDI"""
        phrase_without_ergative = "მწვრთნელი ნახა"
        phrase_with_ergative = "მან მწვრთნელი ნახა"

        res_without = self.core.analyze_720_sync(phrase_without_ergative)
        res_with = self.core.analyze_720_sync(phrase_with_ergative)

        self.assertLess(
            res_with["tdi"],
            res_without["tdi"],
            "Ergative marker 'მან' must mathematically lower TDI entropy"
        )

    def test_latin_false_positive_immunity(self):
        """DEF-10: Latin words ending in m, ma, man must NOT trigger Georgian ergative"""
        foreign_tokens = ["human", "system", "program", "problem", "schema", "postman", "algorithm"]
        clarity = self.core.check_structural_clarity(foreign_tokens)
        self.assertEqual(
            clarity, 1.00,
            "Common English tokens must have zero false-positive ergative detection"
        )

    def test_georgian_morphology_distinctions(self):
        """DEF-10: Differentiates nominative stem endings from true ergative markers"""
        # მამა is nominative (ends in vowel a) -> should be baseline 1.00
        self.assertEqual(self.core.check_structural_clarity(["მამა"]), 1.00)
        # მამამ is ergative for vowel stem (ends in -m preceded by vowel) -> 1.20
        self.assertEqual(self.core.check_structural_clarity(["მამამ"]), 1.20)
        # კაცი is nominative -> 1.00
        self.assertEqual(self.core.check_structural_clarity(["კაცი"]), 1.00)
        # კაცმა is consonant-stem ergative (-მა preceded by consonant) -> 1.20
        self.assertEqual(self.core.check_structural_clarity(["კაცმა"]), 1.20)

    def test_diagnosis_phrase_1(self):
        """
        Required Audit Test 1: 'მან მწვრთნელი ნახა'
        Validates consonant clusters + ergative agent
        """
        phrase = "მან მწვრთნელი ნახა"
        res = self.core.analyze_720_sync(phrase)
        self.assertEqual(res["status"], "CRYSTALLIZED")
        self.assertEqual(res["identifier"], self.core.signature)
        self.assertIn("OST-1_Phonetic", res["axes_analysis"])
        self.assertIn("OST-5_Ergative_Clarity", res["axes_analysis"])
        self.assertLess(res["tdi"], self.core.theta)
        self.assertGreater(res["coherence"], 0.7)

    def test_diagnosis_phrase_2(self):
        """
        Required Audit Test 2: 'ლხინის სუფრა'
        Validates ZIC register detection for Supra and semantic stabilization
        """
        phrase = "ლხინის სუფრა"
        res = self.core.analyze_720_sync(phrase)
        self.assertEqual(res["status"], "CRYSTALLIZED")
        self.assertIn("სუფრა", res["zic_found"])
        self.assertLess(res["tdi"], self.core.theta)
        self.assertGreater(res["coherence"], 0.70)


if __name__ == "__main__":
    unittest.main()
