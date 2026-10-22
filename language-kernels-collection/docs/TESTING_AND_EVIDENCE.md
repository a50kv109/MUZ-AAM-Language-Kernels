# Testing & Evidence Policy

## 1. Core principle

A claim is only as strong as its evidence. `Knowledge Before Implementation` applies both to knowledge records and executable code.

- **Knowledge record present** means a concept has been entered in an inventory. It does not prove the concept or its cited source has been independently reviewed.
- **Source reviewed** means a reviewer has checked the source and recorded what it supports.
- **Implemented** means executable behavior exists.
- **Tested** means the relevant automated assertions ran successfully in a named environment.
- **Verified** is reserved for a narrowly defined claim whose required evidence is recorded and reproducible.

Do not mark a whole knowledge inventory `verified` merely because its entries contain a `Source` field. Do not mark an operation `verified` merely because an interface or registry entry exists.

## 2. Capability status vocabulary

| Status | Meaning | Minimum evidence |
| --- | --- | --- |
| `planned` | Intended future work; not available | Roadmap entry |
| `declared` | Contract or capability is registered, but implementation is not established | Interface or registry declaration |
| `implemented` | Executable implementation exists; validation is incomplete | Source file and implementation reference |
| `experimental` | Executable behavior exists with documented heuristics or known limits | Source, limitations, and at least basic tests |
| `verified` | A specific implementation claim passed its defined reproducible checks | Test command, environment, assertions, and result recorded |

`verified` is claim-specific. Passing the current syllable analyzer tests does not verify translation, poetic meter, stress detection, musical interpretation, or the Italian knowledge inventory.

## 3. Reproducible package checks

Run from this directory:

```sh
npm install
npm run typecheck
npm test
# or run both checks in sequence
npm run verify
```

A check is recorded as passed only after the command has actually run and exited successfully. If dependency installation or execution is blocked by the environment, record the exact error and mark the check `NOT RUN` or `BLOCKED`; do not infer success from configuration or a prior report.

The package declares its direct development dependencies in its own `package.json`. The package must not rely on a parent workspace's `node_modules` or type definitions for these checks.

## 4. Syllable analyzer evidence scope

`UkOrthographicStrategy` counts Ukrainian vowel letters as an orthographic heuristic. It does not implement phonetic syllabification, lexical stress detection, poetic meter classification, or sung-text alignment.

Its tests can support only the exact input/output behaviors asserted by the test suite. Test counts and successful execution do not establish linguistic completeness. Any unsupported or mixed-script token handling must remain explicit in the output and documentation.

## 5. Knowledge inventory evidence

The Italian inventories currently contain 65 Music Literacy records and 29 Poetics & Versification records. These are inventory counts, not counts of independently verified facts.

A source field is a provenance lead, not proof that the cited source was opened or that it supports the exact wording. Until each record has a traceable review record, avoid describing all 94 records as independently audited or verified. Preserve existing content while marking the evidence status honestly; do not fabricate citations or claim source checks that did not occur.

## 6. Reporting template

For each verification run, record:

- Date and environment (runtime and package manager versions where available).
- Exact command.
- Exit status and relevant output.
- Scope of the claim supported by the result.
- Known limitations and checks not run.
