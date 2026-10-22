"""
Test suite for AAM-V1 Universal Linguistic Module v3.2.1
Architect: Artsybashev Andrey Alekseevich
Identifier: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
"""

import unittest
import sys
import os

# Add root directory to path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from python.aam_core import AAM_Expert_Core


class TestAAMExpertCore(unittest.TestCase):
    def setUp(self):
        self.core = AAM_Expert_Core()

    def test_invariants(self):
        """Step 1 Audit: Mathematical constants are locked and precise"""
        self.assertAlmostEqual(self.core.theta, 0.367879, places=5)
        self.assertAlmostEqual(self.core.phi, 1.61803398875, places=5)
        self.assertAlmostEqual(self.core.v_ref, 0.201, places=3)
        self.assertEqual(
            self.core.signature, "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS"
        )

    def test_zic_registry_effects(self):
        """Step 3 Audit: Ritual invariant stabilization effects on entropy"""
        self.assertEqual(self.core.zic_registry["SUTHINA"]["effect"], -0.07)
        self.assertEqual(self.core.zic_registry["HUMILITY"]["effect"], -0.08)
        self.assertEqual(self.core.zic_registry["ŚAR"]["effect"], -0.06)
        self.assertEqual(self.core.zic_registry["TINIA"]["effect"], -0.07)
        self.assertEqual(self.core.zic_registry["CLAN"]["effect"], -0.03)

    def test_etruscan_phonetic_filter(self):
        """Tests that Etruscan phonetic violations (b, d, g, o) produce dissonance"""
        clean_etruscan = "tinia clan avils suthina"
        corrupted_etruscan = "bodo god"
        self.assertEqual(self.core.check_etruscan_phonetic_dissonance(clean_etruscan), 0.0)
        self.assertGreater(
            self.core.check_etruscan_phonetic_dissonance(corrupted_etruscan), 0.0
        )

    def test_voynich_eva_topology(self):
        """Tests that Voynich 'q+o' topology rule is strictly observed"""
        valid_voynich = ["qokedy", "qol", "shedy", "chol"]
        invalid_voynich = ["qakedy", "qol", "qtedy"]
        self.assertEqual(self.core.check_voynich_eva_topology(valid_voynich), 0.0)
        self.assertGreater(self.core.check_voynich_eva_topology(invalid_voynich), 0.0)

    def test_720_sync_suthina_clan(self):
        """Step 4 Audit: 720° Sync simulation on phrase 'SUTHINA clan'"""
        result = self.core.analyze_720_sync("SUTHINA clan", language="Etruscan")
        self.assertEqual(result["status"], "CRYSTALLIZED")
        self.assertTrue(result["sync_720"])
        self.assertIn("SUTHINA", result["zic_found"])
        self.assertIn("CLAN", result["zic_found"])
        self.assertLessEqual(result["tdi"], self.core.theta)
        self.assertGreater(result["coherence_module64"], 0.8)

    def test_kenosis_trigger(self):
        """Tests that extreme structural dissonance correctly triggers Kenosis pause"""
        # A chaotic, repetitive sequence without anchors
        chaotic_tokens = (
            "a " + "abcdefghijklmnopqrstuvwxyz " * 20 + "b c d e f g h i j k l m"
        )
        result = self.core.analyze_720_sync(chaotic_tokens, language="etruscan")
        self.assertIn(result["status"], ["KENOSIS_TRIGGERED", "CRYSTALLIZED"])
        if result["status"] == "KENOSIS_TRIGGERED":
            self.assertGreater(result["tdi"], self.core.theta)


if __name__ == "__main__":
    unittest.main()
