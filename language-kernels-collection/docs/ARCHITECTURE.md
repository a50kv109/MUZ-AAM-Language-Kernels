# Architecture: Language Kernels Collection

## Core Design Principles
1. **Knowledge Before Implementation**: Represent facts, rules, and structures clearly.
2. **Modular Extensibility**: Add languages/domains without breaking core infrastructure.
3. **Task-Specific Interfaces**: Distinguish between tasks (e.g., UI localization vs. poetry analysis).
4. **Verified Provenance**: Document authority of knowledge.
5. **Standalone Independence**: No runtime dependency on other repositories.

## Structure
- `/shared`: Interfaces and Engines (abstract classes/contracts).
- `/languages/<lang>/`: Kernel data and rules.
- `/languages/<lang>/<domain>/`: Specialized modules (e.g., music_literacy).

## Registry
`registry.yaml` in root manages active kernels and modules.
