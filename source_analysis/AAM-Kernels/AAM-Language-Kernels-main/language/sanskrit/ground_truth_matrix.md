# Ground Truth Matrix: Sanskrit Kernel (SA:16)

## 32 Dhatu Primitives (Canonical Mapping)

| Dhatu | Canonical Meaning | SOL-Tag | Axis | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `√man` | MEASURE | `[S-001]` | 2 | Measurement primitive |
| `√tula` | COMPARE | `[C-001]` | 2 | Comparison/balance |
| `√ganana` | COUNT | `[S-003]` | 2 | Cardinality |
| `√yuj` | COMPOSE | `[S-004]` | 2 | Composition/product |
| `√bhaj` | DIVIDE | `[S-005]` | 2 | Partition/ratio |
| `√kri` | TRANSFORM | `[S-006]` | 2 | State transform |
| `√hri` | LIMIT | `[C-002]` | 2 | Clamp/limit |
| `√kamp` | DAMP | `[D-001]` | 2 | Damping/noise reduction |
| `√samya` | BALANCE | `[C-003]` | 2 | Equilibrium |
| `√shas` | CONTROL | `[C-004]` | 2 | Governance/control |
| `√drishti` | OBSERVE | `[S-007]` | 2 | Observation |
| `√linga` | INFER | `[S-008]` | 2 | Symbolic inference |
| `√anukarana` | ADAPT | `[S-009]` | 2 | Adaptation |
| `√saha-bhara` | DISTRIBUTE_LOAD | `[C-005]` | 2 | Shared load |
| `√gati-jnana` | MOTION_AWARENESS | `[S-010]` | 2 | Dynamics awareness |
| `√dik-jnana` | DIRECTION_AWARENESS | `[S-011]` | 2 | Directional context |
| `√sthiti` | STATE | `[S-012]` | 2 | State descriptor |
| `√vicara` | PROBE | `[S-013]` | 2 | Investigative probe |
| `√smriti` | MEMORY | `[S-014]` | 2 | Recall/store |
| `√pariksha` | VALIDATE | `[C-006]` | 2 | Diagnostic validation |
| `√shanka` | DOUBT_INDEX | `[D-002]` | 2 | Uncertainty metric |
| `√srota` | LIQUID_FLOW | `[S-015]` | 8 | Fluid flow primitive |
| `√vidyut` | ELECTRIC_FLOW | `[S-016]` | 8 | Electrical flow |
| `√tapa` | HEAT_FLOW | `[S-017]` | 8 | Thermal flow |
| `√vata` | GAS_FLOW | `[S-018]` | 8 | Gas flow |
| `√stambha` | SUPPORT | `[C-007]` | 8 | Structural support |
| `√bhitti` | BOUNDARY | `[C-008]` | 8 | Boundary/wall |
| `√pranali` | CHANNEL | `[S-019]` | 8 | Channel/conduit |
| `√vastu` | SITE_MODEL | `[S-020]` | 8 | Site/layout model |
| `√sutra` | ALGORITHM | `[S-021]` | 4/10 | Procedural rule-set |
| `√pramana` | STANDARD_CHECK | `[C-009]` | 8 | Norm/standard check |
| `√sthapana` | DEPLOY | `[S-022]` | 10 | Deployment/installation |

## Consensus Protocol
```yaml
CONSENSUS_PROTOCOL:
  ON_CONFLICT: "LOG_EVENT_AND_REPORT"
  LOG_FORMAT:
    STATUS: "CONFLICT_DETECTED"
    CANDIDATES: ["TAG_A", "TAG_B"]
    ACTION: "WAITING_FOR_ARCHITECT_REVIEW"
```
