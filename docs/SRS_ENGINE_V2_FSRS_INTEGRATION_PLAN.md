# SRS Engine v2: FSRS Integration Plan

Last updated: 2026-06-04

Status: design proposal only. Do not implement from this file without human approval.

## 1. Purpose

Replace the current custom retention model in `spacedRepetitionEngine.js` with an FSRS-family scheduler while preserving the existing external module API:

```js
export function createCard(id) {}
export function reviewCard(card, quality, reviewedAt = new Date()) {}
export function isDue(card, now = new Date()) {}
```

The first implementation candidate is `ts-fsrs`, because it is the Web/PWA-friendly TypeScript implementation in the Open Spaced Repetition ecosystem and exposes scheduler APIs directly usable from JavaScript.

This plan does not touch:

- `app-v34-codex-engine.html`
- `app-v35-unified-study.html`
- any HTML `fallbackEngine`
- production scheduling code

## 2. Candidate Decision

### Primary candidate: `ts-fsrs`

Use `ts-fsrs` scheduler-only APIs:

```js
import { createEmptyCard, fsrs, generatorParameters, Rating } from "ts-fsrs";
```

Planned usage pattern:

1. Build complete parameters with `generatorParameters()`.
2. Create a scheduler with `fsrs(params)`.
3. Convert the existing card object into a project-owned v2 card state.
4. Map app quality values to `Rating.Again`, `Rating.Hard`, `Rating.Good`, or `Rating.Easy`.
5. Call `scheduler.next(fsrsCard, reviewedAt, rating)`.
6. Return the same app-facing card shape, with v2 metadata added.

### Not primary: `fsrs-rs`

`fsrs-rs` is useful as a reference implementation and evidence source, but it is Rust-first. It also includes optimizer functionality. For this static Web/PWA app, it adds more integration complexity than `ts-fsrs`.

### Not used directly: `fsrs4anki`

`fsrs4anki` is useful for historical and conceptual context, but this app should not copy Anki custom scheduling code or old Anki integration patterns.

### Not used: Anki application code

Anki's own code is AGPL-3.0-or-later. This project must not copy Anki source code into the app. Anki documentation can be cited for conceptual explanation and user-facing wording.

## 3. Non-Goals

- No parameter optimization in the initial product.
- No custom FSRS weights or internal coefficients.
- No invented multipliers such as `1.2`, `1.7`, or `2.5`.
- No changes to existing HTML files in this task.
- No attempt to solve content quality, exam relevance, audio quality, or monetization with scheduler changes alone.
- No claim that this product has user-specific optimization before enough review history exists.

## 4. Fixed Parameter Policy

The v2 scheduler must use `ts-fsrs` standard parameter generation:

```js
const params = generatorParameters({
  request_retention: 0.90,
  maximum_interval: 365,
  enable_fuzz: true,
  enable_short_term: true,
  learning_steps: ["1m", "10m"],
  relearning_steps: ["10m"],
});

const scheduler = fsrs(params);
```

Production and test must differ only where deterministic tests require it:

| Setting | Production initial candidate | Test value | Reason |
|---|---:|---:|---|
| `request_retention` | `0.90` | `0.90` | Aligns with common FSRS default and balances retention/workload. |
| `maximum_interval` | `365` | `365` | First product should not schedule beyond one year. |
| `enable_fuzz` | `true` | `false` | Production can spread review load; tests need deterministic due dates. |
| `enable_short_term` | `true` | `true` | Needed for learning/relearning steps. |
| `relearning_steps` | `["10m"]` | `["10m"]` | Failed review should come back soon. |

### Learning steps comparison

Two options should be evaluated before implementation:

| Option | Candidate | Pros | Cons | Recommendation |
|---|---|---|---|---|
| A | `["1m", "10m"]` | Matches `ts-fsrs` default short-term learning behavior. Gives a very fast first retry for new material. | More same-session interruptions and more UI pressure on mobile learners. | Safer default for first FSRS adoption because it stays closest to package defaults. |
| B | `["10m"]` | Simpler, less interruption-heavy, easier to explain in a lightweight mobile app. | Less faithful to default short-term progression; may under-support brand-new cards. | Keep as a product experiment candidate only after Option A is tested. |

Initial recommendation: use `["1m", "10m"]` unless manual browser testing shows the first-minute step damages the session flow. Do not invent an intermediate schedule.

## 5. Public API Compatibility

`spacedRepetitionEngine.js` must continue exporting exactly:

- `createCard(id)`
- `reviewCard(card, quality, reviewedAt = new Date())`
- `isDue(card, now = new Date())`

It must remain an ES module. Do not add `module.exports`.

Existing app code should be able to import the module without HTML changes. The module may internally import `ts-fsrs` after the project has a validated bundling or browser import route.

## 6. Rating Mapping

Preserve existing app quality values:

| Existing quality | Meaning | FSRS rating |
|---:|---|---|
| `0` or `1` | Again / failed recall | `Rating.Again` |
| `2` | Hard / weak success | `Rating.Hard` |
| `3` or `4` | Good / standard success | `Rating.Good` |
| `5` | Easy / strong success | `Rating.Easy` |

Important behavior:

- Again must produce a short-term reappearance.
- Hard is not failure. It means recalled with effort.
- Good is the standard successful answer.
- Easy must schedule longer than Good for the same card state, subject to FSRS state and fuzz.

## 7. Proposed v2 Card Shape

Keep old fields to avoid breaking saved progress:

```json
{
  "id": "card-id",
  "repetitions": 0,
  "interval": 0,
  "easeFactor": 2.5,
  "stability": 1,
  "targetRetention": 0.9,
  "due": "2026-06-02T00:00:00.000Z",
  "lastReviewed": null,
  "engine_version": "srs-fsrs-v2",
  "scheduler_backend": "ts-fsrs",
  "scheduler_backend_version": "ts-fsrs@5.2.3",
  "scheduler_state": {
    "fsrs_card": {},
    "params_profile": "default-v2-2026-06",
    "migrated_from": null
  }
}
```

Notes:

- The UI must not depend on `scheduler_state.fsrs_card` internals.
- `due` remains the app-facing due date for compatibility.
- `interval`, `stability`, and `repetitions` remain compatibility mirrors derived from the FSRS card after review where possible.
- `engine_version` distinguishes missing/old v1 cards from v2 cards.

## 8. Internal Integration Boundary

Keep the implementation inside `spacedRepetitionEngine.js` small and adapter-like:

```text
createCard(id)
  -> create project card
  -> create ts-fsrs empty card internally
  -> attach scheduler_state

reviewCard(card, quality, reviewedAt)
  -> normalize/migrate card
  -> map quality to FSRS rating
  -> scheduler.next(...)
  -> map FSRS result back to project card
  -> preserve old compatibility fields

isDue(card, now)
  -> normalize/migrate card
  -> compare project-facing due date
```

Avoid exposing `ts-fsrs` directly to HTML.

## 9. Test Plan

Add or update tests for these requirements before production adoption:

- `Again` schedules a short-term reappearance.
- `Hard` is weak success and does not reset the card as failed.
- `Good` is standard success.
- `Easy` produces a later due date than `Good` for the same base card when `enable_fuzz` is false.
- `isDue()` returns true for past/same due dates and false for future due dates.
- A v1 card without `engine_version` loads without throwing.
- A v1 card keeps its app-facing `due` date through migration.
- A migrated v1 card can be reviewed and returns a v2 card.
- `spacedRepetitionEngine.js` does not use `module.exports`.
- `app-v34-codex-engine.html` is unchanged.
- `app-v35-unified-study.html` is unchanged.
- HTML `fallbackEngine` is unchanged.

Testing mode must use:

```js
generatorParameters({
  request_retention: 0.90,
  maximum_interval: 365,
  enable_fuzz: false,
  enable_short_term: true,
  learning_steps: ["1m", "10m"],
  relearning_steps: ["10m"],
});
```

## 10. Rollout Plan

1. Human approves this plan and rights document.
2. Decide install/import route for `ts-fsrs`: bundled dependency is preferred over CDN for production PWA reliability.
3. Add third-party license notice files before bundling or vendoring.
4. Add deterministic tests with `enable_fuzz: false`.
5. Implement v2 behind the existing ES module exports only.
6. Run tests and confirm HTML files are unchanged.
7. Run browser/PWA smoke test if a local static server or bundled build is introduced.
8. Record final implementation decision in the engine decision log.

## 11. Benefits Over v1

- Replaces hand-picked multipliers with a maintained FSRS scheduler.
- Uses standard FSRS answer semantics: Again, Hard, Good, Easy.
- Adds card-level memory state instead of only custom stability growth.
- Supports short-term learning/relearning behavior through package parameters.
- Provides a clearer future path to review-log-based optimization.
- Gives more honest product wording: "FSRS-based scheduler" if actually integrated and attributed.

## 12. What v2 Does Not Improve

- It does not optimize parameters before enough real review history exists.
- It does not prove better exam outcomes for JFT/SSW learners.
- It does not fix weak cards, bad translations, missing audio, or poor UI flow.
- It does not remove the need for review logs and product validation.
- It does not make Anki code usable.

## 13. Human Confirmation Needed Before Implementation

- Confirm `ts-fsrs` version before any future upgrade. The v36 clean FSRS adapter uses vendored `ts-fsrs@5.2.3`.
- Confirm dependency strategy: npm/bundled build vs browser UMD route.
- Confirm whether first release uses `["1m", "10m"]` or `["10m"]`.
- Confirm `maximum_interval: 365` for the initial paid/free product.
- Confirm where third-party license text will live: root `LICENSE`, `NOTICE`, and docs.
- Confirm whether old v1 cards should be lazily migrated on load or only on first review.
- Confirm that no HTML fallback engine work belongs in this task.
