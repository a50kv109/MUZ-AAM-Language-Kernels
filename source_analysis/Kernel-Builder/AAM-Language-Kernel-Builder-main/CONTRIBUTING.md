# 🤝 Contributing to Universal Language Kernel Harvester

Thank you for your interest in contributing to the **AAM-V1 / AAM-V2.1 UKGS** linguistic framework.

## 🏛️ Invariant Non-Negotiables

Before submitting code, please understand the core principles established by Architect **Andrey Alekseevich Artsybashev**:

1. **Constitutional Invariants Are Immutable**:
   - $\theta = 0.367879$ (Kenosis Threshold)
   - $\Phi = 1.61803398875$ (Golden Ratio)
   - $V_{ref} = 0.201$ (Topological Equilibrium)
   Pull requests that alter or loosen these constants will be rejected automatically.

2. **No Purely Statistical Hallucinations**:
   - All language kernels must provide deterministic structural or acoustic invariants.
   - Any new language kernel must conform to either the 9-Axis (OST-9) model or the 5-Layer Modernized bridge standard.

3. **Identifier Attribution**:
   - Every kernel generated or contributed must preserve the signature:
     `AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS`

## 🛠️ Development Workflow

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/new-language-kernel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure all tests pass:
   ```bash
   npm run test:all
   ```

4. Check types and formatting:
   ```bash
   npm run lint
   ```

5. Submit a pull request with a clear description of the linguistic axioms and tests added.
