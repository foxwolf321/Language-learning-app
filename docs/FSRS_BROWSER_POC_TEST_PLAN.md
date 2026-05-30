# FSRS_BROWSER_POC_TEST_PLAN.md

Last updated: 2026-05-30

## Status

Phase 1-7A / browser PoC verification plan.

Current result: **PENDING**. This file is a test plan only. It does not mark `ts-fsrs` as adopted.

## File under test

`experiments/ts-fsrs-browser-poc.html`

## Purpose

Verify one small point:

> Can `ts-fsrs` run in a browser through a Scheduler Adapter-like boundary, and can project-shaped progress be saved and reloaded?

This PoC does not prove the production app is ready, does not approve PR #38, and does not allow paid-pack or audio rollout to resume.

## Manual test steps

### 1. Load page

Expected:

- Page title shows `ts-fsrs Browser PoC`.
- Status shows module loaded / ready.
- Initialize button is enabled.

If this fails, the browser import path is not acceptable yet.

### 2. Initialize card

Click `1. Initialize FSRS card`.

Expected:

- A project-shaped progress object appears.
- It contains `engine_family: jft_retention`.
- It contains `scheduler_backend: ts-fsrs`.
- It contains one card state.
- FSRS state is isolated inside `scheduler_state.fsrs_card`.

### 3. Preview four ratings

Click `2. Preview four ratings`.

Expected:

- Four outcomes appear: again, hard, good, easy.
- Each outcome shows due/state information.

### 4. Apply Good

Click `3. Apply Good`.

Expected:

- Card `reviews` becomes 1.
- `last_grade` becomes `good`.
- `last_reviewed_at` is set.
- `due_at` changes.
- `review_log` length becomes 1.

### 5. Save and reload

Click `4. Save + reload JSON`.

Expected:

- Progress reloads from localStorage.
- `review_log` remains.
- `scheduler_state.fsrs_card` remains.

### 6. Console check

Expected:

- No unhandled module import error.
- No runtime exception after each step.

## Pass criteria

The PoC passes only if all are true:

- Browser module import works.
- One FSRS card can be created.
- Four rating outcomes can be previewed.
- `Good` can be applied.
- Project-shaped progress updates correctly.
- Review log is created.
- localStorage save/reload works.
- FSRS internals remain isolated from UI.
- No production app file is modified.

## Fail criteria

The PoC fails if any are true:

- Module import fails.
- Ratings cannot be previewed.
- `Good` cannot be applied.
- JSON save/reload breaks the FSRS card state.
- UI must depend directly on FSRS internals.

## Result file to create after testing

Create or update:

`docs/FSRS_BROWSER_POC_RESULT.md`

It should record:

- tested date
- browser and OS
- commit tested
- PASS / FAIL / PARTIAL
- page load result
- module import result
- initialize result
- preview result
- apply Good result
- save/reload result
- console errors
- decision: proceed, retry import route, or fallback

## Decision rule

If PASS:

- Proceed only to a Scheduler Adapter implementation plan.
- Decide bundled build vs CDN route separately.
- Add third-party license notice plan.

If FAIL:

- Try an alternate import/build route if reasonable.
- If unsuitable, compare against the self-built evidence-based fallback.
- Do not fall back to arbitrary interval tweaking.

## Current decision

`ts-fsrs` remains the primary candidate, but it is not adopted until this PoC is tested and the result is recorded.
