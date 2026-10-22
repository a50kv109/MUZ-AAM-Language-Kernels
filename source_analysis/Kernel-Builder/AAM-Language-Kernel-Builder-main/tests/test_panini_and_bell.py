"""
Test suite for Panini State Machine and Bell Fiber Engine
Architect: Artsybashev Andrey Alekseevich
Identifier: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
"""

import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from python.panini_core import PaniniStateMachine
from python.bell_fiber import BellFiberEngine


class TestPaniniAndBell(unittest.TestCase):
    def test_panini_sandhi(self):
        engine = PaniniStateMachine()
        self.assertEqual(engine.status, "SYNTHETIC_ACTIVE")
        self.assertEqual(engine.delta_pos, 0.92)

        # a + i -> e
        res = engine.apply_sandhi_reduction("sūrya", "indra")
        self.assertTrue(res["is_optimized"])
        self.assertEqual(res["transformed_crystal"], "sūryendra")

    def test_panini_chanda(self):
        engine = PaniniStateMachine()
        # Anustubh pada has 8 syllables
        valid_8 = "a ā i ī u ū e o"
        res = engine.validate_chanda(valid_8, "Anustubh")
        self.assertEqual(res["status"], "VALID")
        self.assertEqual(res["deviation"], 0)

    def test_bell_fiber_bridge(self):
        bell = BellFiberEngine()
        # Test resonance between Georgian (delta=0.68) and Etruscan (delta=0.74)
        src_invariants = ["SUPRA", "TAMADA", "MAMA", "CLAN"]
        tgt_invariants = ["SUTHINA", "TINIA", "CLAN", "ZICHUCHE"]

        result = bell.compute_resonance(
            source_invariants=src_invariants,
            target_invariants=tgt_invariants,
            source_delta=0.68,
            target_delta=0.74,
        )
        self.assertEqual(result["status"], "ALIGNED")
        self.assertTrue(result["collapse_prevented"])
        self.assertGreater(result["resonance"], 0.7)
        self.assertLessEqual(result["tdi_drift"], bell.drift_tolerance)


if __name__ == "__main__":
    unittest.main()
