// FSRS v2 scheduler adapter for the clean v36 study path.
//
// This module intentionally exposes only the app-facing API:
// createCard(cardId, now?), reviewCard(cardState, rating, now?), isDue(cardState, now?).
// It does not keep the v1 prototype scheduler in the production path.

import {
  Rating,
  State,
  createEmptyCard,
  fsrs,
  generatorParameters,
} from "./vendor/ts-fsrs/index.mjs";

const ENGINE_VERSION = "fsrs-v2";
const ENGINE_NAME = "ts-fsrs";
const LIBRARY_VERSION = "5.2.3";
const PARAMETER_PROFILE = "fsrs-v2-ts-fsrs-5.2.3-default-2026-06";

const FSRS_PARAMETER_INPUT = Object.freeze({
  request_retention: 0.9,
  maximum_interval: 365,
  enable_fuzz: true,
  enable_short_term: true,
  learning_steps: ["1m", "10m"],
  relearning_steps: ["10m"],
});

const FSRS_PARAMETERS = generatorParameters(FSRS_PARAMETER_INPUT);
const scheduler = fsrs(FSRS_PARAMETERS);

const RATING_MAP = Object.freeze({
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
});

function asDate(value, fallback = new Date()) {
  if (value instanceof Date) return value;
  if (typeof value === "number" || typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return fallback instanceof Date ? fallback : new Date(fallback);
}

function iso(value) {
  return asDate(value).toISOString();
}

function serialize(value) {
  return JSON.parse(JSON.stringify(value));
}

function isFsrsV2Card(cardState) {
  return cardState?.engine_version === ENGINE_VERSION &&
    cardState?.engine_name === ENGINE_NAME &&
    (cardState?.fsrs_card || cardState?.engine_state?.fsrs_card);
}

function fsrsCardFrom(cardState, now = new Date()) {
  const source = cardState?.fsrs_card || cardState?.engine_state?.fsrs_card || createEmptyCard(now);
  return {
    ...source,
    due: asDate(source.due, now),
    last_review: source.last_review ? asDate(source.last_review, now) : undefined,
  };
}

function projectStateFromFsrsCard(fsrsCard) {
  switch (fsrsCard.state) {
    case State.New:
      return "new";
    case State.Learning:
      return "learning";
    case State.Review:
      return "review";
    case State.Relearning:
      return "relearning";
    default:
      return "review";
  }
}

function createState(cardId, fsrsCard, options = {}) {
  const cleanFsrsCard = fsrsCardFrom({ fsrs_card: fsrsCard }, fsrsCard?.due || new Date());
  const due = cleanFsrsCard.due;

  return {
    id: cardId,
    card_id: cardId,
    engine_version: ENGINE_VERSION,
    engine_name: ENGINE_NAME,
    library_version: LIBRARY_VERSION,
    parameter_profile: PARAMETER_PROFILE,
    parameter_summary: { ...FSRS_PARAMETER_INPUT },
    due,
    last_review: null,
    review_count: 0,
    lapse_count: 0,
    state: projectStateFromFsrsCard(cleanFsrsCard),
    fsrs_card: cleanFsrsCard,
    engine_state: {
      fsrs_card: cleanFsrsCard,
    },
    review_log: [],
    ...(options.legacy_prototype_reset ? {
      legacy_prototype_reset: true,
      legacy_notice: "V36 uses a clean FSRS/V2 study history. Old prototype SRS state was not migrated.",
    } : {}),
  };
}

function ensureV2State(cardState, now = new Date()) {
  if (isFsrsV2Card(cardState)) {
    const fsrsCard = fsrsCardFrom(cardState, now);
    return {
      ...cardState,
      id: cardState.id || cardState.card_id,
      card_id: cardState.card_id || cardState.id,
      due: asDate(cardState.due || fsrsCard.due, now),
      last_review: cardState.last_review ? asDate(cardState.last_review, now) : null,
      review_count: Number.isFinite(cardState.review_count) ? cardState.review_count : fsrsCard.reps || 0,
      lapse_count: Number.isFinite(cardState.lapse_count) ? cardState.lapse_count : fsrsCard.lapses || 0,
      state: cardState.state || projectStateFromFsrsCard(fsrsCard),
      fsrs_card: fsrsCard,
      engine_state: {
        ...cardState.engine_state,
        fsrs_card: fsrsCard,
      },
      review_log: Array.isArray(cardState.review_log) ? cardState.review_log : [],
    };
  }

  const cardId = cardState?.card_id || cardState?.id || "legacy-prototype-card";
  return createState(cardId, createEmptyCard(now), { legacy_prototype_reset: true });
}

function normalizeRating(rating) {
  if (typeof rating !== "string") {
    throw new TypeError("FSRS v2 reviewCard expects rating to be one of: again, hard, good, easy.");
  }

  const normalized = rating.toLowerCase();
  const fsrsRating = RATING_MAP[normalized];

  if (!fsrsRating) {
    throw new TypeError("Unknown FSRS v2 rating. Expected: again, hard, good, easy.");
  }

  return [normalized, fsrsRating];
}

export function createCard(cardId, now = new Date()) {
  return createState(cardId, createEmptyCard(asDate(now)));
}

export function isDue(cardState, now = new Date()) {
  const due = asDate(cardState?.due || cardState?.fsrs_card?.due || cardState?.engine_state?.fsrs_card?.due, now);
  return due.getTime() <= asDate(now).getTime();
}

export function reviewCard(cardState, rating, now = new Date()) {
  const reviewedAt = asDate(now);
  const [normalizedRating, fsrsRating] = normalizeRating(rating);
  const before = ensureV2State(cardState, reviewedAt);
  const beforeFsrsCard = fsrsCardFrom(before, reviewedAt);
  const result = scheduler.next(beforeFsrsCard, reviewedAt, fsrsRating);
  const nextFsrsCard = fsrsCardFrom({ fsrs_card: result.card }, reviewedAt);
  const reviewLog = Array.isArray(before.review_log) ? before.review_log : [];
  const event = {
    reviewed_at: iso(reviewedAt),
    rating: normalizedRating,
    fsrs_rating: fsrsRating,
    previous_due: iso(before.due || beforeFsrsCard.due),
    due: iso(nextFsrsCard.due),
    state: projectStateFromFsrsCard(nextFsrsCard),
    scheduled_days: nextFsrsCard.scheduled_days,
    fsrs_log: serialize(result.log),
  };

  return {
    ...before,
    engine_version: ENGINE_VERSION,
    engine_name: ENGINE_NAME,
    library_version: LIBRARY_VERSION,
    parameter_profile: PARAMETER_PROFILE,
    parameter_summary: { ...FSRS_PARAMETER_INPUT },
    due: nextFsrsCard.due,
    last_review: reviewedAt,
    review_count: before.review_count + 1,
    lapse_count: before.lapse_count + (normalizedRating === "again" ? 1 : 0),
    state: projectStateFromFsrsCard(nextFsrsCard),
    fsrs_card: nextFsrsCard,
    engine_state: {
      fsrs_card: nextFsrsCard,
    },
    review_log: [...reviewLog, event],
  };
}
