// Retention-curve spaced-repetition engine for the unified study app.
//
// Status: v1 prototype under evidence-gate review.
// This is a small ES module used by app-v35-unified-study.html. It intentionally
// keeps the public exports createCard, reviewCard, and isDue so the browser UI,
// card loading, and local progress saving can continue to work.
//
// The scheduler uses a transparent exponential retention model:
//   R = exp(-elapsedDays / stabilityDays)
//   nextIntervalDays = -stabilityDays * ln(targetRetention)
// See docs/STUDY_ENGINE_V1_RETENTION_SPEC.md for the rationale and safe wording.

const DEFAULT_EASE = 2.5;
const DEFAULT_STABILITY = 1.0;
const TARGET_RETENTION = 0.9;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MIN_STABILITY = 1.0;
const MAX_STABILITY = 36500;
const AGAIN_INTERVAL_DAYS = 10 / (24 * 60);

const HARD_STABILITY_MULTIPLIER = 1.2;
const GOOD_STABILITY_MULTIPLIER = 1.7;
const EASY_STABILITY_MULTIPLIER = 2.5;

function asDate(value) {
  if (value instanceof Date) return value;
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function addDays(baseDate, days) {
  return new Date(asDate(baseDate).getTime() + days * MS_PER_DAY);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function validTargetRetention(value) {
  return Number.isFinite(value) && value > 0 && value < 1;
}

function nextIntervalFromRetention(stabilityDays, targetRetention) {
  return -stabilityDays * Math.log(targetRetention);
}

function normalizeCard(card) {
  const now = new Date();
  const targetRetention = validTargetRetention(card?.targetRetention)
    ? card.targetRetention
    : TARGET_RETENTION;

  return {
    id: card?.id || "unknown-card",
    repetitions: Number.isFinite(card?.repetitions) ? card.repetitions : 0,
    interval: Number.isFinite(card?.interval) ? card.interval : 0,
    easeFactor: Number.isFinite(card?.easeFactor) ? card.easeFactor : DEFAULT_EASE,
    stability: Number.isFinite(card?.stability) ? Math.max(card.stability, MIN_STABILITY) : DEFAULT_STABILITY,
    targetRetention,
    due: asDate(card?.due || now),
    lastReviewed: card?.lastReviewed ? asDate(card.lastReviewed) : null,
  };
}

export function createCard(id) {
  const now = new Date();
  return {
    id,
    repetitions: 0,
    interval: 0,
    easeFactor: DEFAULT_EASE,
    stability: DEFAULT_STABILITY,
    targetRetention: TARGET_RETENTION,
    due: now,
    lastReviewed: null,
  };
}

export function isDue(card, now = new Date()) {
  const c = normalizeCard(card);
  return asDate(c.due).getTime() <= asDate(now).getTime();
}

export function reviewCard(card, quality, reviewedAt = new Date()) {
  const c = normalizeCard(card);
  const q = clamp(Number(quality) || 0, 0, 5);
  const now = asDate(reviewedAt);

  let repetitions = c.repetitions;
  let interval = c.interval;
  let stability = c.stability;

  if (q <= 1) {
    // Again = failure. Short relearning interval, not a long review interval.
    repetitions = 0;
    stability = clamp(stability * 0.5, MIN_STABILITY, MAX_STABILITY);
    interval = AGAIN_INTERVAL_DAYS;
  } else {
    // Hard/Good/Easy are all successful retrievals. Hard is weak success and
    // must not reset repetitions.
    repetitions += 1;

    const stabilityMultiplier = q === 2
      ? HARD_STABILITY_MULTIPLIER
      : q === 3 || q === 4
        ? GOOD_STABILITY_MULTIPLIER
        : EASY_STABILITY_MULTIPLIER;

    stability = clamp(stability * stabilityMultiplier, MIN_STABILITY, MAX_STABILITY);
    interval = nextIntervalFromRetention(stability, c.targetRetention);
  }

  return {
    ...c,
    repetitions,
    interval,
    easeFactor: c.easeFactor,
    stability,
    targetRetention: c.targetRetention,
    due: addDays(now, interval),
    lastReviewed: now,
  };
}
