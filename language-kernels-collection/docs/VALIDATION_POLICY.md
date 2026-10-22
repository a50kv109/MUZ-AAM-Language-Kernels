# Language Kernels Collection Validation Policy

## 1. Capability Status
Every capability registered in `registry.yaml` MUST have one of the following statuses:
- `declared`: Registered but not verified as implemented.
- `implemented`: Implementation exists but needs verification.
- `verified`: Implementation passed documented checks.
- `experimental`: Implementation with known limitations.
- `planned`: Future capability, not currently available.

## 2. Validation
- Declarations do not imply functionality.
- Capabilities marked `verified` must link to documented test results (e.g., in `/tests/`).
- External consumers must check the status before invoking any capability.
