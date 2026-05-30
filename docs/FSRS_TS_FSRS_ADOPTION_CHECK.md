# FSRS_TS_FSRS_ADOPTION_CHECK.md

Last updated: 2026-05-30

## Status

**Phase 1-7A / small mountain: FSRS-ts-fsrs adoption path check**

This document checks whether `ts-fsrs` is a realistic candidate for the JFT/SSW study engine. It does not yet approve implementation. It narrows the next decision.

Related documents:

- `docs/ENGINE_EVIDENCE_GATE.md`
- `docs/SRS_EVIDENCE_REVIEW.md`
- `docs/STUDY_ENGINE_DECISION_LOG.md`
- `docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md`

## 1. Question

Can this project honestly and safely adopt an FSRS-family scheduler, likely `ts-fsrs`, as the v1 scheduler backend for a mobile-first JFT-Basic / SSW / Work-in-Japan card product?

The decision must consider:

- learning-evidence explanation
- license safety
- browser/PWA integration
- data model fit
- Stage 1B feasibility
- fallback if integration is too heavy
- honest marketing language

## 2. Current finding

`ts-fsrs` is a serious v1 candidate, but not yet an implementation decision.

Current recommendation:

> Keep `ts-fsrs` as the primary backend candidate. Build the app through a Scheduler Adapter so that `ts-fsrs` can be integrated, tested, or replaced without corrupting card progress.

Do not yet merge PR #38 or hard-code any scheduler directly into the UI.

## 3. Source checks

### 3.1 Package purpose

The repository describes `ts-fsrs` as a TypeScript toolkit for building spaced repetition systems with FSRS. The package README describes it as a TypeScript package helping developers build their own spaced repetition system using the Free Spaced Repetition Scheduler algorithm.

Project implication:

- This matches the PWA/JavaScript direction better than Rust-only or Python tooling.
- It can be presented as an external scheduler, not as a hidden custom invention.

Source:

- https://github.com/open-spaced-repetition/ts-fsrs
- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/README.md

### 3.2 License

The repository and package metadata identify `ts-fsrs` as MIT licensed. The MIT license allows use, copy, modify, merge, publish, distribute, sublicense, and sell copies, provided that the copyright notice and permission notice are included in copies or substantial portions of the software.

Project implication:

- Commercial use appears legally compatible in principle.
- The app must include third-party license attribution if bundled/distributed.
- The license disclaims warranty; the product must not imply that the FSRS authors guarantee learning outcomes.

Source:

- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/LICENSE
- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/package.json

### 3.3 Module formats

The package metadata exposes CommonJS, ES module, UMD, default, and type entry points.

Project implication:

- A bundler route should be possible.
- A no-build/static GitHub Pages route may also be possible through UMD, but it must be tested rather than assumed.
- Because this project has been simple static PWA oriented, integration choice matters.

Source:

- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/package.json

### 3.4 Node requirement

The repository currently says current packages require Node.js `>=20.0.0`, and the package metadata also lists `node >=20.0.0`.

Project implication:

- This is likely a build/development requirement, not necessarily a browser runtime requirement, but it must be tested.
- If the project remains buildless static HTML, UMD import must be verified.
- If using Vite/build pipeline, Node >=20 becomes a development environment requirement.

Source:

- https://github.com/open-spaced-repetition/ts-fsrs
- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/package.json

### 3.5 Basic scheduler API

The README shows:

- `createEmptyCard()`
- `fsrs()`
- `Rating`
- `scheduler.repeat(card, now)` to preview outcomes
- `scheduler.next(card, now, Rating.Good)` to apply an answer
- generated result includes a card and a log

Project implication:

- This fits the app’s Show answer -> grade -> update progress flow.
- The scheduler already supports four ratings: Again, Hard, Good, Easy.
- The result log may be mapped into the project’s own `review_log`.

Source:

- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/README.md

### 3.6 Desired/request retention

The README shows `request_retention`, described as the percentage the scheduler tries to have the learner get correct. Higher values increase review load, lower values reduce it.

Project implication:

- This gives a cleaner explanation than arbitrary fixed day intervals.
- v1 can start with a conservative default, likely around 0.90, but that value must be labelled as a product default, not proof of optimality for JFT/SSW learners.
- Paid/free design must monitor review burden because higher retention creates more reviews.

Source:

- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/fsrs/README.md

### 3.7 Training/optimizer package

The repository also contains `@open-spaced-repetition/binding`, which is for parameter optimization from review history, CSV conversion, learning/relearning step recommendation, and WASI-based execution. Its README says the package is in public testing and API may change. It also notes browser/WASI requirements such as cross-origin isolation headers for some in-browser training setups.

Project implication:

- Do **not** use the optimizer in Stage 1B.
- Stage 1B should use scheduler-only `ts-fsrs` and store review logs.
- Parameter optimization is future work after real review data exists.
- Browser-side optimizer use is too heavy and infrastructure-sensitive for the current free validation PWA.

Source:

- https://raw.githubusercontent.com/open-spaced-repetition/ts-fsrs/main/packages/binding/README.md

### 3.8 Anki/FSRS conceptual fit

Anki’s FAQ explains FSRS as using Retrievability, Stability, and Difficulty; each card has its own memory state; FSRS analyzes review history to estimate memory state and parameters. It also says desired retention lets users balance how much they remember with review load.

Project implication:

- This supports FSRS as a credible scheduler-family explanation.
- It does not prove this app is better than competitors.
- It does not remove the need for original JFT/SSW content quality and review-log validation.

Source:

- https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html

## 4. Fit to this app

### Strong fit

- TypeScript/JavaScript direction aligns with PWA.
- MIT license appears commercially compatible.
- Four ratings align with SRS convention and the current planned grade model.
- `repeat` and `next` map well to preview/apply behavior.
- The package can return logs, which aligns with the project’s review-log requirement.
- `request_retention` gives a better explanation path than arbitrary intervals.
- Scheduler-only use avoids Stage 1B optimizer complexity.

### Cautions

- Browser/static GitHub Pages usage must be tested.
- Node >=20 may force a build pipeline if UMD static import is not practical.
- The package version and API may continue changing.
- FSRS schedules review; it does not solve content quality, audio design, Indonesian translation quality, or market demand.
- Parameter optimization is not meaningful before sufficient review data exists.
- Marketing must not overclaim.

## 5. Proposed v1 architecture if adopted

```text
app-vXX.html / future app shell
  -> Card renderer by mode
  -> Study session controller
  -> SchedulerAdapter
       -> TsFsrsBackend
       -> maps project CardState <-> ts-fsrs Card
       -> maps project grades <-> Rating
       -> maps result.log -> project review_log
  -> localStorage/export/import progress
```

### 5.1 Backend field mapping

Project card state should keep app-level fields separate from scheduler internals.

```json
{
  "card_id": "...",
  "note_id": "...",
  "mode": "listening_ready",
  "status": "new|learning|review|relearning|mastered|suspended",
  "due_at": null,
  "reviews": 0,
  "lapses": 0,
  "last_grade": null,
  "scheduler_backend": "ts-fsrs",
  "scheduler_state": {
    "fsrs_card": {}
  }
}
```

The UI must not depend on `fsrs_card` structure directly.

### 5.2 Rating mapping

| Project grade | ts-fsrs Rating |
|---|---|
| `again` | `Rating.Again` |
| `hard` | `Rating.Hard` |
| `good` | `Rating.Good` |
| `easy` | `Rating.Easy` |

If Stage 1B UI starts with only three buttons, the adapter must still preserve a path to four internal ratings later.

### 5.3 Mode handling

Do not encode JFT/SSW mode by changing FSRS internals in v1.

Minimum rule:

- Different skills get different card IDs.
- Mode is stored in project metadata and review logs.
- FSRS schedules each card independently.
- JFT/SSW priority affects queue ordering only among eligible cards.

Future possible rule:

- Mode-specific retention/request settings or separate scheduler profiles may be tested after usage data exists.

## 6. Stage 1B implementation recommendation

Recommended for Stage 1B:

1. Use `ts-fsrs` scheduler-only package if browser integration test passes.
2. Do not use `@open-spaced-repetition/binding` optimizer.
3. Use default or conservative generated parameters.
4. Set `request_retention` as a documented product default, likely 0.90, but do not claim it is proven optimal for this audience.
5. Save review logs in project format.
6. Keep all FSRS-specific state inside `scheduler_state`.
7. Keep Scheduler Adapter boundary mandatory.
8. Do not use FSRS adoption as a reason to skip mobile UX validation.

## 7. Fallback plan

If `ts-fsrs` integration fails because of static hosting, bundling, browser runtime, or maintenance concerns:

1. Keep the Scheduler Adapter interface.
2. Implement a self-built evidence-informed fallback scheduler.
3. Label it honestly as a simple spaced-review scheduler, not an optimized FSRS engine.
4. Preserve review logs so future FSRS migration remains possible.
5. Constrain external claims.

Fallback must not become arbitrary Anki-style day tweaking.

## 8. Required proof-of-concept before final adoption

Create a small technical proof-of-concept before modifying the production app:

- One minimal HTML or module test that imports `ts-fsrs`.
- Create one empty card.
- Preview four outcomes.
- Apply `Rating.Good`.
- Save result card/log to a project-shaped object.
- Rehydrate it from JSON.
- Confirm due date, state, and review log survive reload.
- Confirm it can run in the intended hosting path.

Acceptance criteria:

- Works in browser, not only Node.
- Works with the planned build/static strategy.
- No broken dependency or CORS problem.
- Project storage shape remains independent of FSRS internals.
- Third-party license notice plan is written.

## 9. Decision at this point

### Adopted

- `ts-fsrs` remains the primary v1 scheduler candidate.
- Optimizer package is deferred.
- Scheduler Adapter remains mandatory.
- FSRS-specific state must be isolated from UI.
- Review logs remain mandatory.
- Honest claims remain mandatory.

### Not adopted yet

- Direct integration into `app-v34.html`.
- Merging PR #38.
- Using FSRS optimizer.
- Mode-specific retention targets.
- Claiming user-data-based optimization.

### Rejected

- Treating FSRS as a magic proof of product effectiveness.
- Using FSRS to excuse weak card quality.
- Bypassing Stage 1B UX validation.
- Arbitrary interval fallback if integration is inconvenient.

## 10. Next small mountain

Next small mountain:

> Build or specify a minimal `ts-fsrs` browser proof-of-concept through the Scheduler Adapter boundary.

Do not modify the production app until that proof-of-concept passes.
