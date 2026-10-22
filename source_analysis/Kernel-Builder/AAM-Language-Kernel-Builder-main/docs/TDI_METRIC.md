# Topological Density Index (TDI) — Technical Specification & Research Hypothesis

**Document Version:** v3.2.1  
**Author:** Artsybashev Andrey Alekseevich  
**Status:** Experimental Research Heuristic  

---

## 1. Overview

The **Topological Density Index (TDI)** is a quantitative metric implemented within the AAM-V1 / AAM-V2.1 Universal Language Kernel Harvester (LangCore Builder). It measures the ratio of phonological and morphological density against structural clarity within a given text stream.

---

## 2. Mathematical Definition

In both Python (`python/georgian_core.py`) and TypeScript (`src/lib/harvester.ts`), the TDI is computed as follows:

$$\text{raw\_tdi} = \frac{C \cdot M \cdot K_{\text{KART}}}{S} + \text{ZIC}$$

$$\text{TDI} = \min(\max(\text{raw\_tdi}, 0.0), 1.0)$$

---

## 3. Parameter Definitions, Ranges, and Units

| Parameter | Symbol | Range / Value | Description & Operational Units |
| :--- | :--- | :--- | :--- |
| **Phonetic Complexity** | $C$ | $[0.1, 1.0]$ | Consonant cluster density (OST-1). Measures consonantal load per token. |
| **Morphological Density** | $M$ | $[0.1, 1.0]$ | Agglutinative token length and affix suffix density (OST-2). |
| **Kartvelian Factor** | $K_{\text{KART}}$ | $0.70$ (Constant) | Phonotactic normalization multiplier for Kartvelian harmonic clusters (up to 8 consecutive consonants). |
| **Structural Clarity** | $S$ | $[1.0, 1.20]$ | Syntactical stability divisor (OST-5). Higher clarity (case marker presence) divides the numerator. |
| **ZIC Registry Effect** | $\text{ZIC}$ | $[-0.10, 0.10]$ | Ontological stability modifier derived from sacred lexicon registry matching. |
| **Final Bounded TDI** | $\text{TDI}$ | $[0.0, 1.0]$ | Dimensionless normalized index of topological strain. |

---

## 4. Experimental Nature of Linguistic Hypotheses

### 4.1. Heuristic vs. Validated Scientific Law
TDI is **not** an established universal law of historical linguistics or theoretical phonology. It is an **authorial research heuristic** designed to explore structural invariants across diverse language families (Indo-European, Kartvelian, Semitic, etc.).

### 4.2. Kenosis Thresholds
- **$\text{TDI} \le 0.3678$**: Considered structurally stable / crystallized.
- **$\text{TDI} > 0.3678$** (or $0.45$ in specific pipeline profiles): Triggers a **Kenosis** warning or semantic strain alert, indicating high topological divergence from the reference kernel.

---

## 5. Georgian Ergative Marker Effect (Documented Heuristic)

In Georgian Aorist (Series III) constructions, the presence of agentive ergative markers (`-მა`, `-m`, or pronoun `მან`) increases structural disambiguation.

### 5.1. Mechanism
- When an ergative marker is detected, the Structural Clarity divisor $S$ is set to **$1.20$** (compared to $1.00$ for nominative/intransitive constructions).
- Because $S$ resides in the denominator, an increase in $S$ **strictly decreases** the resulting TDI score.

### 5.2. Concrete Test Results
- **Without Ergative** (`"მწვრთნელი ნახა"` / *The coach saw...*):
  - $S = 1.00$
  - $\text{TDI} = \mathbf{0.3412}$
- **With Ergative** (`"მან მწვრთნელი ნახა"` / *He saw the coach*):
  - $S = 1.20$
  - $\text{TDI} = \mathbf{0.2722}$

This demonstrates that the heuristic correctly models reduced topological strain in explicitly marked ergative clauses.
