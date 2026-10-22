# Матриця істинності (Ground Truth Matrix): UA:08

## 🎯 СЕМАНТИЧНЕ ЗІСТАВЛЕННЯ AXIS-10 (SOL-TAGS)

| Тег SOL | Термін (UA) | Термін (EN) | Визначення |
| :--- | :--- | :--- | :--- |
| `[S-001]` | **Система** | System | Набір компонентів, що взаємодіють. |
| `[S-002]` | **Ядро** | Kernel | Центральна керуюча частина. |
| `[C-001]` | **Інваріантність** | Invariance | Властивість незмінності при вимірюваннях. |
| `[D-001]` | **Відхилення** | Deviation | Різниця між спостережуваним та еталоном. |
| `SOL_ENG_08_001` | **Тех. системи** | Technical Systems | Складні інженерні вузли та збірки. |
| `SOL_MED_09_001` | **Мед. техніка** | Medical Equipment | Обладнання для діагностики та лікування. |
| `SOL_SPE_10_001` | **Автоматизація** | Automation | Системи автономного керування. |

---
*Примітка: Всі леми синхронізовані з англійським еталоном (Golden Standard).*

## 🛡 CONSENSUS_PROTOCOL
```yaml
CONSENSUS_PROTOCOL:
  ON_CONFLICT: "LOG_EVENT_AND_REPORT"
  LOG_FORMAT: 
    STATUS: "CONFLICT_DETECTED"
    CANDIDATES: ["TAG_A", "TAG_B"]
    ACTION: "WAITING_FOR_ARCHITECT_REVIEW"
```
