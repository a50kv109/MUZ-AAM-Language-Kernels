# Domain Model

## Core Concepts
1. **Language Kernel**: A collection of language-specific data, rules, and strategies.
2. **Specialized Module**: Domain knowledge (Music, Poetics, Opera) supported by a kernel.
3. **Engine**: Language-agnostic algorithm implementing a capability (e.g., SyllableAnalyzer).
4. **Strategy**: Implementation of an Engine for a specific language (e.g., UkrainianOrthographicStrategy).

## Relationship
- Kernels use Strategies to implement Engines.
- Engines adhere to Interfaces defined in `/shared/`.
- Consumers access Capabilities via the Registry.
