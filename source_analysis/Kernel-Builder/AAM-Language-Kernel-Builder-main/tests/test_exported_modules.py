"""
Test suite validating that exported Python code templates
in TypeScript integration files compile AND execute at runtime without errors.
Architect: Artsybashev Andrey Alekseevich
"""

import unittest
import os
import re


class TestExportedModulesCompilationAndExecution(unittest.TestCase):
    def _extract_ts_template_string(self, filepath: str, var_name: str) -> str:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        # Find export const VAR = `...`;
        pattern = re.compile(rf"export\s+const\s+{var_name}\s*=\s*`([\s\S]*?)`;")
        match = pattern.search(content)
        self.assertIsNotNone(match, f"Could not find variable {var_name} in {filepath}")
        raw_code = match.group(1)
        # In TS template literals, \\n evaluates to \n
        raw_code = raw_code.replace("\\\\n", "\\n").replace("\\\\", "\\")
        return raw_code

    def test_multi_kernel_code_compiles_and_executes(self):
        """DEF-01 & DEF-11: Validates multi-kernel template compiles and runs in pure stdlib"""
        root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        ts_path = os.path.join(root, "src", "lib", "multi_kernel_code.ts")
        code = self._extract_ts_template_string(ts_path, "MULTI_KERNEL_SYSTEM_V2_CODE")
        compiled = compile(code, "multi_kernel_code.py", "exec")
        self.assertIsNotNone(compiled)

        namespace = {}
        exec(compiled, namespace)
        self.assertIn("MultiKernelSystem", namespace)
        self.assertIn("BlockBuilder", namespace)
        self.assertIn("SacredMode", namespace)
        self.assertIn("KernelMetadata", namespace)

    def test_hodge_code_compiles_and_executes(self):
        """DEF-11: Validates Hodge Bridge template compiles and runs with dual-mode stdlib/numpy"""
        root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        ts_path = os.path.join(root, "src", "lib", "hodge_integration.ts")
        code = self._extract_ts_template_string(ts_path, "HODGE_INTEGRATION_CODE")
        compiled = compile(code, "hodge_integration.py", "exec")
        self.assertIsNotNone(compiled)

        namespace = {}
        exec(compiled, namespace)
        self.assertIn("DataIngestionPipeline", namespace)
        self.assertIn("BellFiberEngine", namespace)
        self.assertIn("HodgeKernelBridge", namespace)

        pipeline = namespace["DataIngestionPipeline"]()
        kernel = pipeline.create_kernel_from_text(
            "test_core", "Indo-European", "test text sample with divine law", 0.90
        )
        bridge = namespace["HodgeKernelBridge"]()
        hodge_res = bridge.decompose_and_integrate(kernel)
        self.assertIn("status", hodge_res)
        self.assertIn("tdi_topological", hodge_res)

    def test_pragmatic_code_compiles_and_executes(self):
        """DEF-11: Validates Pragmatic pipeline template compiles and runs with dual-mode stdlib/numpy"""
        root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        ts_path = os.path.join(root, "src", "lib", "pragmatic_integration.ts")
        code = self._extract_ts_template_string(ts_path, "PRAGMATIC_INTEGRATION_CODE")
        compiled = compile(code, "pragmatic_integration.py", "exec")
        self.assertIsNotNone(compiled)

        namespace = {}
        exec(compiled, namespace)
        self.assertIn("DataIngestionPipeline", namespace)
        self.assertIn("TopologicalStabilizer", namespace)

        pipeline = namespace["DataIngestionPipeline"]()
        k = pipeline.create_kernel_from_text(
            "test_pragmatic", "Semitic", "concept law order text", 0.88
        )
        stabilizer = namespace["TopologicalStabilizer"]()
        stab_res = stabilizer.decompose_and_integrate(k)
        self.assertIn("topological_tdi", stab_res)


if __name__ == "__main__":
    unittest.main()
