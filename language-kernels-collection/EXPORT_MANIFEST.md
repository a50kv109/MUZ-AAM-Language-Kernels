# EXPORT MANIFEST — AAM LANGUAGE KERNELS COLLECTION (v0.1.1)

**Package Name:** `aam-language-kernels-collection`  
**Package Version:** `0.1.1`  
**Export Date:** `2026-10-22`  
**Milestone:** Phase 1.1 Stabilization + Phase 2 Contract Integration  
**Verification Command:** `npm run verify` (`npm run typecheck && npm test`)  
**Status:** PASS (Exit Code: 0)

---

## 1. Executive Summary

This manifest verifies that the `aam-language-kernels-collection` package has been stabilized (Phase 1.1) and enhanced with Phase 2 lexical stress and metrical template contracts. All parent workspace dependencies have been eliminated from `package.json` and `tsconfig.json`. The package operates completely autonomously with its own local dependencies and self-contained test execution.

---

## 2. Verification Run Output

### Command:
```bash
npm run verify
```

### Transcript:
```
> aam-language-kernels-collection@0.1.1 verify
> npm run typecheck && npm test

> aam-language-kernels-collection@0.1.1 typecheck
> tsc --noEmit

> aam-language-kernels-collection@0.1.1 test
> tsx tests/shared/engines/syllable_analyzer.test.ts && tsx tests/shared/interfaces/contracts_phase2.test.ts

--- Starting UkOrthographicStrategy Test Suite ---
✓ All 7 test suites passed with strict assertions.
--- Starting Phase 2 Contracts Test Suite ---
✓ All Phase 2 contract tests passed with strict assertions.
```

---

## 3. Scope of Phase 1.1 & Phase 2 Integration

### Phase 1.1 (Stabilization):
1. **Autonomous Package Configuration:**
   - `package.json` updated to version `0.1.1` with local `devDependencies` (`typescript`, `tsx`, `@types/node`).
   - Clean `verify` and `typecheck` scripts.
   - `package-lock.json` generated and tracked locally.
2. **Autonomous TypeScript Configuration:**
   - `tsconfig.json` uses `"moduleResolution": "bundler"` and `"types": ["node"]`.
   - Removed references to `../node_modules/@types`.
3. **Repository Status & Testing Policy:**
   - `docs/REPOSITORY_STATUS.md` reflecting verified status without unproven claims.
   - `docs/TESTING_AND_EVIDENCE.md` defining strict reproducibility and evidence rules.

### Phase 2 (Contracts & Schemas):
1. **Lexical Stress Contracts (`shared/interfaces/lexical_stress.ts`):**
   - Supports stress position ambiguity (single stress, multiple legitimate variants, unstressed clitics).
   - Provenance tracking (`LexicalStressProvenance`: source, confidence, dialectal tags, verification status).
   - Strict `LexicalStressEntry` and `ILexicalStressDictionary` interfaces.
2. **Metrical Template Contracts (`shared/interfaces/metrical_templates.ts`):**
   - Formal schema for poetic meter description (syllabo-tonic, tonic, quantitative, syllabic).
   - Foot structure, line constraints, caesura position, and allowable substitutions.
3. **Barrel Export (`shared/interfaces/index.ts`):**
   - Seamlessly exports `lexical_stress.ts` and `metrical_templates.ts` alongside core engine interfaces.
4. **Phase 2 Contract Test Suite (`tests/shared/interfaces/contracts_phase2.test.ts`):**
   - Validates ambiguity, provenance metadata, meter schemas, and runtime dictionary behavior.
5. **Example Template (`examples/metrical-template.example.json`):**
   - Demonstrates iambic tetrameter with variable pyrrhic/spondee substitutions and caesura definition.
6. **Documentation (`docs/PHASE2_CONTRACTS.md`):**
   - Complete rules, boundaries, and acceptance criteria for Phase 2 contracts.

---

## 4. SHA-256 Checksums of Critical Files

| File | SHA-256 Checksum |
| :--- | :--- |
| `package.json` | `88287afe55bc6aabc786a06aafdb15e716cc62b0dbe4ecf66474856ea76814d2` |
| `package-lock.json` | `64b38f4de181ce3d6ce777728c13915a88c6011d072c9d56c614e29b2c20a92d` |
| `tsconfig.json` | `e6c10ea4d3a52a7b624c4f404512073d26e635671c455df06ab336f151e40388` |
| `registry.yaml` | `634daaa408b2cf1e0bf3f0f7608cac359694b21047d4b0299c732a9f1557cd51` |
| `README.md` | `b6592b44060f7c22064f669acfc4e47ecdc6e160ff76309cea41e35ef45ea55e` |
| `docs/PHASE2_CONTRACTS.md` | `4ac33641ee308e117fa174b57f596a414e8640beb5f8b0a2e2716eeb61e72d36` |
| `docs/REPOSITORY_STATUS.md` | `fb26da7061c75be2f91365b42a26e7f51f2c26de1116308cab7665615a376a7f` |
| `docs/TESTING_AND_EVIDENCE.md` | `354c8888a736614822e8ab9def20f7623d0f5f50130324d4a6d4eec0835f7216` |
| `shared/interfaces/lexical_stress.ts` | `b88694e4861ec0ebcae85f1b151559b5b627f7f4c77cb520bcbd49d30e55791b` |
| `shared/interfaces/metrical_templates.ts` | `fc650e3b0457e88d7feb175323463d10a139c209190cb3ed039cadadf906a1cc` |
| `shared/interfaces/index.ts` | `f6f90e50918697b33bea87a6c4d0142cd977504845ce1c8f5c782803ca61724b` |
| `tests/shared/interfaces/contracts_phase2.test.ts` | `10ae2b5762f51f0e5ff968aff0bc5a74f6d59578c6530587595e9ebe7d83c84e` |
| `tests/shared/engines/syllable_analyzer.test.ts` | `114dd154d5b0e5524d804d82c9a8d587516a871322fe7f1891527058956d60ff` |
| `examples/metrical-template.example.json` | `0eabae4a3c7c01fc3093fb54eac6f6f355ba80229a0cbb2833a89044a115f1cc` |

---

## 5. Export Archive Details

- **Archive File Name:** `aam-language-kernels-collection-v0.1.1-phase2.zip`
- **Location in Web App:** `/aam-language-kernels-collection-v0.1.1-phase2.zip` (served directly via HTTP from Vite `public/`)
- **Direct Workspace Path:** `/language-kernels-collection-v0.1.1-phase2.zip`
- **Exclusions:** `node_modules/`, `.git/`, `.DS_Store`, temporary build caches
- **Total Archived Files:** 35 files (100% autonomous code, tests, docs, contracts, examples, and configs)

---

## 6. How to Verify After Download

1. **Extract Archive:**
   ```bash
   unzip aam-language-kernels-collection-v0.1.1-phase2.zip -d extracted_folder
   cd extracted_folder/language-kernels-collection
   ```
2. **Install Local Dependencies:**
   ```bash
   npm install
   ```
3. **Run Unified Verification:**
   ```bash
   npm run verify
   ```
   *Expected output: Exit code 0, 7 UkOrthographicStrategy tests pass, all Phase 2 contract tests pass.*
