# Shared Interfaces

This directory contains the canonical TypeScript contracts for external applications interacting with the **Language Kernels Collection**.

## Usage
External applications should import these interfaces to ensure type safety when communicating with any language kernel.

### Supported Operations
- `list_capabilities`: Discover supported features.
- `identify_language`: Language detection.
- `translate`: Text translation.
- `analyze_text`: General text analysis.
- `interpret_music_text`: Musical terminology interpretation.
- `analyze_poetry`: Poetic and prosodic analysis.
- `localize_ui`: Interface localization.

See `operations.ts` for detailed schema definitions.
