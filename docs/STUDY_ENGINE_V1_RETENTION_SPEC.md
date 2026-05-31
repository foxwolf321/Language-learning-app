# Study Engine v1: Retention-Curve Scheduler Specification

This document defines the first version of a retention-curve based scheduler for the **JFT/SSW Work-in-Japan** card product. Its purpose is to provide a small, transparent scheduling model that can be explained publicly and audited during early product validation.

This is not a claim that the scheduler is scientifically proven. It is a transparent v1 model inspired by established memory-learning principles and intended for testing before any paid release.

## 1. Core retention model

The scheduler uses a simple exponential retention model:

```text
R = exp(-elapsedDays / stabilityDays)
```

Where:

- `R` is the estimated probability of recall.
- `elapsedDays` is the number of days since the last review.
- `stabilityDays` is the card-specific estimate of how long the memory remains stable.

The v1 target retention is:

```text
targetRetention = 0.90
```

The next interval is calculated from the stability and target retention:

```text
nextIntervalDays = -stabilityDays * ln(targetRetention)
```

Because `-ln(0.90)` is about `0.10536`, the next interval is about 10.5% of the card's current stability. As successful reviews increase stability, future intervals grow.

## 2. Card state

Each card keeps a small scheduling state:

```json
{
  "id": "card-id",
  "repetitions": 0,
  "interval": 0,
  "easeFactor": 2.5,
  "stability": 1,
  "targetRetention": 0.9,
  "due": "2026-06-01T00:00:00.000Z",
  "lastReviewed": null
}
```

Notes:

- `easeFactor` is preserved for compatibility with older progress data, but v1 interval calculation is based on `stability` and `targetRetention`.
- `due` controls whether a card is immediately eligible for review.
- `lastReviewed` is updated on every review.

## 3. Answer grades

The UI has four answer buttons. Their meaning must remain consistent across the engine and app UI.

| Button | Quality value | Learner meaning | Engine meaning |
|---|---:|---|---|
| Again | 1 | I could not recall it. | Failure. Schedule a short relearning interval. |
| Hard | 2 | I recalled it, but slowly or uncertainly. | Weak success. Do not reset repetitions. |
| Good | 3 | I recalled it normally. | Normal success. Increase stability. |
| Easy | 5 | I recalled it quickly and confidently. | Strong success. Increase stability more than Good. |

## 4. Scheduling rules

### Again

Again is a failure. It means the learner did not successfully retrieve the answer.

Rules:

- Reset `repetitions` to `0`.
- Reduce `stability`, but keep it at or above the minimum stability.
- Schedule a short interval so the card appears again soon.
- In v1, the short relearning interval is about 10 minutes.

### Hard

Hard is **not** a failure. It is a weak success.

Rules:

- Increase `repetitions` by `1`.
- Increase `stability` slightly.
- Calculate the next interval from the updated stability and `targetRetention`.
- Do not reset the card back to new.

### Good

Good is a normal successful recall.

Rules:

- Increase `repetitions` by `1`.
- Increase `stability` more than Hard.
- Calculate the next interval from the updated stability and `targetRetention`.

### Easy

Easy is a strong successful recall.

Rules:

- Increase `repetitions` by `1`.
- Increase `stability` more than Good.
- Calculate the next interval from the updated stability and `targetRetention`.

## 5. v1 default tuning

The first implementation uses simple constants so that behavior can be tested and explained:

| Grade | Stability effect | Interval rule |
|---|---:|---|
| Again | `stability * 0.5`, minimum 1 day | short relearning interval |
| Hard | `stability * 1.2` | `-stability * ln(0.90)` |
| Good | `stability * 1.7` | `-stability * ln(0.90)` |
| Easy | `stability * 2.5` | `-stability * ln(0.90)` |

These numbers are v1 defaults, not proven universal constants. They should be reviewed after real learner logs are available.

## 6. App integration requirements

The app must keep the existing ES module interface:

```js
export function createCard(id) {}
export function isDue(card, now = new Date()) {}
export function reviewCard(card, quality, reviewedAt = new Date()) {}
```

The implementation must not use `module.exports`.

The v35 UI mapping must be:

```text
Again = failure
Hard = weak success
Good = normal success
Easy = strong success
```

The app must continue to load cards from `data/deck_manifest.json` and `data/cards.stage1b.id.sample.json`, and it must not turn `app-v35-unified-study.html` into a separate hard-coded prototype.

## 7. Safe wording for product or README

Use wording like:

> This app uses an experimental spaced-repetition scheduler inspired by established memory principles: active recall, spaced practice, and adaptive review intervals. The current version stores per-card review state and schedules future reviews based on response quality. The scheduler is under evidence-gate review and will be calibrated before paid release.

Avoid wording like:

- Scientifically proven engine.
- FSRS-equivalent.
- MEMORIZE implementation.
- Guaranteed retention.
- Based on Anki's engine.

## 8. Deferred work

The following are not part of this v1 implementation:

- Claiming FSRS or MEMORIZE compatibility.
- Fitting parameters from learner data.
- Optimizing by JFT section or SSW job category.
- Syncing review logs to a backend.
- Replacing the existing v35 UI.

