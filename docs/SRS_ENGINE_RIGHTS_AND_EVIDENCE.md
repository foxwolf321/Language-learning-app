# SRS Engine Rights and Evidence

Last updated: 2026-06-04

Status: rights and evidence check for design. This is not legal advice and does not authorize implementation by itself.

## 1. Sources Checked

| Source | URL | Finding |
|---|---|---|
| `open-spaced-repetition/ts-fsrs` repository | https://github.com/open-spaced-repetition/ts-fsrs | TypeScript toolkit for FSRS; scheduler package plus optimizer package. |
| `ts-fsrs` package README | https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/README.md | Exposes `createEmptyCard`, `fsrs`, `generatorParameters`, `Rating`, `repeat`, and `next`; supports custom parameters including retention, maximum interval, fuzz, and steps. |
| `ts-fsrs` package metadata | `vendor/ts-fsrs/package.json`; https://www.jsdelivr.com/package/npm/ts-fsrs | Package `ts-fsrs`, version `5.2.3`, license `MIT`, exports CJS/ESM/UMD, Node `>=18.0.0`. |
| `ts-fsrs` license | `vendor/ts-fsrs/LICENSE`; https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/LICENSE | MIT License. Vendored `5.2.3` license text says copyright Open Spaced Repetition, 2025. |
| `ts-fsrs` constants/source | https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/src/constant.ts | Default request retention `0.9`, default maximum interval `36500`, default fuzz false, default learning steps `["1m","10m"]`, default relearning steps `["10m"]`, FSRS-6 constants. |
| `ts-fsrs` models/source | https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/src/models.ts | Card fields include due, stability, difficulty, scheduled days, reps, lapses, state, and last review; ratings include Again, Hard, Good, Easy. |
| `@open-spaced-repetition/binding` README | https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/binding/README.md | Optimizer/binding package is for parameter optimization and CSV conversion; public beta; Node >=20; browser WASI requires extra setup and cross-origin isolation. |
| `open-spaced-repetition/fsrs-rs` repository | https://github.com/open-spaced-repetition/fsrs-rs | Rust FSRS implementation including scheduler and optimizer. |
| `fsrs-rs` license | https://raw.githubusercontent.com/open-spaced-repetition/fsrs-rs/main/LICENSE | BSD-3-Clause, not MIT. |
| `fsrs-rs` package metadata | https://raw.githubusercontent.com/open-spaced-repetition/fsrs-rs/main/Cargo.toml | Rust crate `fsrs`, version `6.0.0`, license `BSD-3-Clause`. |
| `open-spaced-repetition/fsrs4anki` repository | https://github.com/open-spaced-repetition/fsrs4anki | FSRS scheduler/optimizer project for Anki context. |
| `fsrs4anki` license | https://raw.githubusercontent.com/open-spaced-repetition/fsrs4anki/main/LICENSE | MIT License, copyright open-spaced-repetition. |
| Anki manual, FSRS deck options | https://docs.ankiweb.net/deck-options.html#fsrs | FSRS is an alternative scheduler; desired retention default is 90%; higher retention increases workload; learning/relearning steps should be under one day. |
| Anki FAQ, algorithm explanation | https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html | FSRS uses retrievability, stability, and difficulty; Hard is a successful recall with effort; Again is failed recall/relearning. |
| Anki source license | https://raw.githubusercontent.com/ankitects/anki/main/LICENSE | Anki is AGPL-3.0-or-later with some separately licensed components. |

## 2. Rights Findings

### `ts-fsrs`

Finding: usable candidate, subject to MIT license compliance.

The package metadata identifies `ts-fsrs@5.2.3` as MIT licensed. The license permits use, copying, modification, distribution, sublicensing, and sale, provided the copyright notice and permission notice are included in copies or substantial portions of the software. It also disclaims warranties.

Implication for this project:

- Commercial use appears compatible with the project goal.
- If the package is bundled, vendored, or distributed as part of the app, include the MIT license text and attribution.
- Do not imply that Open Spaced Repetition guarantees this product's learning outcomes.

### `fsrs-rs`

Finding: not the preferred Web/PWA dependency.

`fsrs-rs` is BSD-3-Clause, not MIT. It is useful as a reference and future optimizer/scheduler comparison, but adopting it directly would create Rust/WASM or server-side complexity. If used in the future, BSD-3-Clause notice conditions must be followed, including non-endorsement wording.

### `fsrs4anki`

Finding: useful background, not the implementation dependency.

`fsrs4anki` is MIT licensed, but it is Anki-oriented. It should be treated as conceptual and historical context. Do not copy code into this project unless a separate review confirms the exact files and license path.

### Anki code

Finding: do not use.

Anki source code is AGPL-3.0-or-later. This project should cite Anki documentation where useful, but must not copy Anki scheduling source code into the app.

## 3. Evidence Findings

### FSRS model evidence

Anki's FAQ explains FSRS using three memory-state components:

- Retrievability: probability of successful recall at a moment.
- Stability: time in days for retrievability to drop from 100% to 90%.
- Difficulty: how hard the information is to retain.

Project implication: FSRS provides a more defensible memory-state model than the current v1 custom multipliers.

### Desired retention

Anki's manual describes desired retention as the chance of remembering cards when reviewed. It identifies 90% as the default and warns that higher retention increases workload.

Project implication: `request_retention: 0.90` is a reasonable initial product default, but it must be described as an initial setting, not a proven optimum for this app.

### Answer semantics

Anki's FAQ states that in FSRS:

- Again places a review card into relearning and lowers stability.
- Hard means recalled with effort; it is not a failed recall.
- Good increases stability.
- Easy increases stability more strongly.

Project implication: the app's rating labels must teach learners not to press Hard when they forgot the answer.

### Optimizer deferral

`@open-spaced-repetition/binding` is designed for parameter optimization and CSV conversion, but it is public beta and adds Node/WASI/browser infrastructure complexity.

Project implication: do not use optimizer in initial v2. Store review logs so optimization can be reconsidered only after enough real learner history exists.

## 4. Required License / Notice Additions

Before bundling or vendoring `ts-fsrs`, add third-party attribution in all relevant distribution locations.

Implemented additions for the v36 clean FSRS adapter:

1. Root `THIRD_PARTY_NOTICES.md`

Records the package, version, source, local vendor path, license, and copyright notice.

2. Vendor license file

`vendor/ts-fsrs/LICENSE` stores the MIT license text from the `ts-fsrs@5.2.3` package.

Recommended future distribution review:

1. Root `NOTICE` or `THIRD_PARTY_NOTICES.md`

```text
This product includes ts-fsrs by Open Spaced Repetition.
Project: https://github.com/open-spaced-repetition/ts-fsrs
License: MIT
Copyright: Copyright (c) 2025 Open Spaced Repetition
```

2. Root `LICENSE` or `LICENSES/ts-fsrs-MIT.txt`

Include the full MIT license text from the checked `ts-fsrs` license file.

3. Documentation

Add a short dependency note in the engine documentation:

```text
The SRS engine uses ts-fsrs, an MIT-licensed implementation of the Free Spaced Repetition Scheduler algorithm by Open Spaced Repetition.
```

4. Build artifact review

If a bundler inlines third-party code, confirm the generated distribution still preserves required notices, or include a visible third-party notices file in the shipped app.

## 5. Claims Allowed and Not Allowed

Allowed after implementation and attribution:

- "Uses an FSRS-based scheduler via `ts-fsrs`."
- "Targets 90% requested retention by default."
- "Uses Again, Hard, Good, Easy review feedback."
- "Stores review history for possible future optimization."

Not allowed:

- "Uses Anki's scheduler code."
- "Optimized for this learner" before optimizer use and sufficient review history.
- "Scientifically guarantees retention."
- "Proven to improve JFT/SSW exam outcomes" before project-specific evidence exists.

## 6. Open Rights Questions Before Implementation

- Confirm exact `ts-fsrs` package version before any future upgrade.
- Re-check license at the target version tag, not only the current `main` branch.
- Confirm whether transitive dependencies require separate notices after bundling.
- Confirm where third-party notices appear in the PWA distribution.
- Confirm whether repository root license should remain project-only with third-party notices separated, or include third-party license text under `LICENSES/`.
