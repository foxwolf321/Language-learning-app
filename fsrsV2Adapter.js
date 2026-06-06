// V37 FSRS/V2 adapter.
// No automatic migration from earlier progress stores.

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
      return "learning";
  }
}

function wrapFsrsCard(cardId, fsrsCard, reviewedAt = null) {
  const cloned = serialize(fsrsCard);
  return {
    engine_version: ENGINE_VERSION,
    engine_name: ENGINE_NAME,
    library_version: LIBRARY_VERSION,
    parameter_profile: PARAMETER_PROFILE,
    card_id: cardId,
    state: projectStateFromFsrsCard(fsrsCard),
    due: iso(fsrsCard.due),
    last_review: fsrsCard.last_review ? iso(fsrsCard.last_review) : reviewedAt,
    elapsed_days: fsrsCard.elapsed_days ?? 0,
    scheduled_days: fsrsCard.scheduled_days ?? 0,
    reps: fsrsCard.reps ?? 0,
    lapses: fsrsCard.lapses ?? 0,
    fsrs_card: cloned,
    engine_state: {
      fsrs_card: cloned,
      parameters: {
        ...FSRS_PARAMETER_INPUT,
        learning_steps: [...FSRS_PARAMETER_INPUT.learning_steps],
        relearning_steps: [...FSRS_PARAMETER_INPUT.relearning_steps],
      },
    },
    updated_at: reviewedAt || new Date().toISOString(),
  };
}

export function createCard(cardId, now = new Date()) {
  const createdAt = asDate(now);
  return wrapFsrsCard(cardId, createEmptyCard(createdAt), createdAt.toISOString());
}

export function isDue(cardState, now = new Date()) {
  if (!cardState) return true;
  const due = isFsrsV2Card(cardState)
    ? fsrsCardFrom(cardState, asDate(now)).due
    : asDate(cardState.due, now);
  return due.getTime() <= asDate(now).getTime();
}

export function reviewCard(cardState, rating, now = new Date()) {
  const normalizedRating = RATING_MAP[rating];
  if (!normalizedRating) {
    throw new TypeError("FSRS/V2 review expects rating to be one of: again, hard, good, easy.");
  }

  const reviewedAt = asDate(now);
  const startingState = cardState || createCard("unknown", reviewedAt);
  const cardId = startingState.card_id || startingState.cardId || startingState.id || "unknown";
  const fsrsCard = fsrsCardFrom(startingState, reviewedAt);
  const result = scheduler.repeat(fsrsCard, reviewedAt);
  const scheduledCard = result[normalizedRating]?.card;

  if (!scheduledCard) {
    throw new Error(`FSRS/V2 scheduler did not return a card for rating: ${rating}`);
  }

  return wrapFsrsCard(cardId, scheduledCard, reviewedAt.toISOString());
}
