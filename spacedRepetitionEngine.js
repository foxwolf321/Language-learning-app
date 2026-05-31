// Experimental local spaced-repetition engine for app-v34-codex-engine.html.
//
// Status: app integration module only.
// This file is intentionally small and local so the browser app can run without
// a missing module error. It is NOT the final evidence-gate scheduler decision.
// The project-level engine decision remains governed by docs/ENGINE_EVIDENCE_GATE.md
// and docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md.

const DEFAULT_EASE = 2.5;
const DEFAULT_STABILITY = 1.0;
const TARGET_RETENTION = 0.9;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

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

function normalizeCard(card) {
  const now = new Date();
  return {
    id: card?.id || "unknown-card",
    repetitions: Number.isFinite(card?.repetitions) ? card.repetitions : 0,
    interval: Number.isFinite(card?.interval) ? card.interval : 0,
    easeFactor: Number.isFinite(card?.easeFactor) ? card.easeFactor : DEFAULT_EASE,
    stability: Number.isFinite(card?.stability) ? card.stability : DEFAULT_STABILITY,
    targetRetention: Number.isFinite(card?.targetRetention) ? card.targetRetention : TARGET_RETENTION,
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

  let easeFactor = c.easeFactor;
  let repetitions = c.repetitions;
  let interval = c.interval;
  let stability = c.stability;

  if (q < 3) {
    repetitions = 0;
    interval = q <= 1 ? 10 / (24 * 60) : 1 / 24;
    easeFactor = clamp(easeFactor - (q <= 1 ? 0.2 : 0.1), 1.3, 3.0);
    stability = clamp(stability * 0.65, 0.2, 36500);
  } else {
    repetitions += 1;
    const qualityBonus = q === 5 ? 1.35 : q === 4 ? 1.15 : 1.0;
    easeFactor = clamp(easeFactor + (q === 5 ? 0.08 : q === 4 ? 0.02 : -0.02), 1.3, 3.0);

    if (repetitions === 1) {
      interval = q === 5 ? 4 : q === 4 ? 2 : 1;
    } else if (repetitions === 2) {
      interval = q === 5 ? 7 : q === 4 ? 4 : 3;
    } else {
      interval = Math.max(1, Math.round(interval * easeFactor * qualityBonus));
    }

    stability = clamp(Math.max(stability, interval) * qualityBonus, 0.2, 36500);
  }

  return {
    ...c,
    repetitions,
    interval,
    easeFactor,
    stability,
    targetRetention: TARGET_RETENTION,
    due: addDays(now, interval),
    lastReviewed: now,
  };
}
