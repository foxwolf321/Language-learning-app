# SRS Engine v1 to v2 Migration Plan

Last updated: 2026-06-04

Status: migration design only. Do not implement until the FSRS integration plan and rights review are approved.

## 1. Migration Goals

- Existing saved card data must continue to load.
- Missing `engine_version` means legacy v1 data.
- `createCard`, `reviewCard`, and `isDue` must keep working.
- The app-facing `due` date must remain trustworthy.
- v1 fields must not be deleted during migration.
- FSRS internals must be isolated under `scheduler_state`.
- HTML files must not be modified for migration.

## 2. Current v1 Card Shape

Current `spacedRepetitionEngine.js` creates cards similar to:

```json
{
  "id": "card-id",
  "repetitions": 0,
  "interval": 0,
  "easeFactor": 2.5,
  "stability": 1,
  "targetRetention": 0.9,
  "due": "2026-06-02T00:00:00.000Z",
  "lastReviewed": null
}
```

v1 has no `engine_version` and no `scheduler_state`.

## 3. Proposed v2 Card Shape

Add v2 fields without deleting v1 compatibility fields:

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
    "migrated_from": "srs-retention-v1",
    "migration_strategy": "lazy-v1-due-preserved"
  }
}
```

## 4. Engine Version Rules

| Condition | Meaning | Action |
|---|---|---|
| `engine_version` missing | v1 custom retention card | Normalize and lazily migrate. |
| `engine_version === "srs-retention-v1"` | explicit v1 card, if added later | Lazily migrate. |
| `engine_version === "srs-fsrs-v2"` and valid `scheduler_state.fsrs_card` | v2 card | Use directly. |
| unknown `engine_version` | future/invalid card | Preserve data, use due-only fallback, and avoid destructive rewrite. |

## 5. Recommended Migration Strategy

Use lazy migration inside `spacedRepetitionEngine.js`.

Lazy migration means:

1. `normalizeCard()` detects legacy v1 data.
2. It returns a v2-compatible object in memory.
3. `isDue()` can operate immediately without forcing storage rewrites.
4. `reviewCard()` writes back a v2 card only after an actual review.

Why lazy migration:

- It avoids a risky one-time bulk rewrite.
- It preserves existing localStorage/imported progress.
- It lets users keep due dates even if some cards are never reviewed again.
- It keeps the HTML unchanged.

## 6. Due-Date Preservation

For v1 cards, `due` remains the source of truth until the first successful v2 review writes a new FSRS-derived due date.

Rules:

- If v1 `due` is in the past or equal to `now`, `isDue()` returns true.
- If v1 `due` is in the future, `isDue()` returns false.
- Migration must not pull future-due v1 cards into the queue early.
- Migration must not push overdue v1 cards out without a user review.

## 7. FSRS State Bootstrap

Initial recommendation: do not fabricate optimized FSRS history.

For a legacy v1 card with no review log:

1. Create an internal FSRS card with `createEmptyCard()`.
2. Preserve the app-facing v1 `due` date.
3. Mark the card as migrated from v1.
4. Let the first v2 `reviewCard()` call establish FSRS state using the learner's next actual answer.

Reason:

- v1 has `stability`, `interval`, and `easeFactor`, but not a real FSRS difficulty/history state.
- Mapping v1 fields directly into FSRS difficulty would be an invented heuristic.
- The safest first migration protects data and avoids false precision.

Tradeoff:

- Some older cards may temporarily behave like newly initialized FSRS cards after their first v2 review.
- This may create shorter intervals for previously mature v1 cards.
- If that is unacceptable, a separate human-approved bridge heuristic is needed before implementation.

Rejected for initial v2:

- Use `fsrs-rs` `memory_state_from_sm2()` during Web/PWA migration. v1 is not true SM-2 data, and Rust integration is outside this task.
- Reconstruct review history when no reliable review log exists.
- Invent a default difficulty value and pretend it is learner-specific.

## 8. Review Migration Flow

For `reviewCard(card, quality, reviewedAt)`:

```text
input card
  -> normalize dates
  -> detect v1/v2
  -> if v1, attach v2 metadata and empty FSRS card
  -> map quality to FSRS Rating
  -> run scheduler.next(...)
  -> copy FSRS result back to project card
  -> update compatibility mirrors
  -> return card with engine_version = "srs-fsrs-v2"
```

Compatibility mirrors after review:

- `due`: derived from FSRS result card due.
- `lastReviewed`: reviewedAt.
- `repetitions`: derived from FSRS `reps` where available.
- `interval`: derived from FSRS `scheduled_days` where available.
- `stability`: derived from FSRS `stability` where available.
- `targetRetention`: kept as `0.90` unless a future profile changes it.
- `easeFactor`: preserved only for compatibility, not used by v2 scheduling.

## 9. Quality Mapping

| v1 quality input | v2 rating | Migration note |
|---:|---|---|
| `0` or `1` | Again | Short-term relearning. |
| `2` | Hard | Weak success, not failure. |
| `3` or `4` | Good | Standard success. |
| `5` | Easy | Strong success, longer than Good when fuzz disabled. |

## 10. Parameter Profile

The first v2 migration profile should be named:

```text
default-v2-2026-06
```

Profile settings:

```json
{
  "request_retention": 0.9,
  "maximum_interval": 365,
  "enable_fuzz": true,
  "enable_short_term": true,
  "learning_steps": ["1m", "10m"],
  "relearning_steps": ["10m"]
}
```

Test profile:

```json
{
  "request_retention": 0.9,
  "maximum_interval": 365,
  "enable_fuzz": false,
  "enable_short_term": true,
  "learning_steps": ["1m", "10m"],
  "relearning_steps": ["10m"]
}
```

Do not store custom FSRS weights unless `generatorParameters()` produced them.

## 11. Backward Compatibility Tests

Required test cases:

1. A v1 card with no `engine_version` and past `due` is due.
2. A v1 card with no `engine_version` and future `due` is not due.
3. A v1 card can be reviewed with Again and returns `engine_version: "srs-fsrs-v2"`.
4. A v1 card can be reviewed with Hard and does not reset as a failure.
5. A v1 card can be reviewed with Good and gets a future due date.
6. A v1 card can be reviewed with Easy and gets a due date later than Good when fuzz is disabled.
7. A v2 card can be reviewed repeatedly without losing `scheduler_state.fsrs_card`.
8. Unknown extra fields on cards survive review.
9. `module.exports` is absent.
10. `app-v34-codex-engine.html` and `app-v35-unified-study.html` are unchanged.

## 12. Rollback Plan

If v2 implementation fails after partial testing:

- Do not delete v1 fields.
- Keep `engine_version` and `scheduler_state` as additive data only.
- The old due-date fields should still allow a fallback scheduler or manual recovery.
- If necessary, a future rollback can ignore `scheduler_state` and continue using v1 compatibility fields.

## 13. Human Confirmation Needed

- Accept the lazy migration tradeoff for mature v1 cards, or request a separate bridge heuristic.
- Decide whether migrated cards should be written back on load or only after review.
- Confirm whether `scheduler_state.fsrs_card` is stored per card or in a separate progress map.
- Confirm exact target `ts-fsrs` version and package import route.
- Confirm that v1 review logs are unavailable or insufficient for replay.
- Confirm no HTML fallback engine migration belongs in this task.
