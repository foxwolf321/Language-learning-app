import assert from 'node:assert/strict';
import { createCard, isDue, reviewCard } from '../spacedRepetitionEngine.js';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const TARGET_RETENTION = 0.90;
const EPSILON = 1e-9;

function nearlyEqual(a, b, epsilon = EPSILON) {
  return Math.abs(a - b) <= epsilon;
}

function daysBetween(a, b) {
  return (new Date(a).getTime() - new Date(b).getTime()) / MS_PER_DAY;
}

function testCreateCard() {
  const card = createCard('sample-card');

  assert.equal(card.id, 'sample-card');
  assert.equal(card.repetitions, 0);
  assert.equal(card.interval, 0);
  assert.equal(card.easeFactor, 2.5);
  assert.equal(card.stability, 1);
  assert.equal(card.targetRetention, TARGET_RETENTION);
  assert.ok(card.due instanceof Date);
  assert.equal(card.lastReviewed, null);
}

function testIsDue() {
  const now = new Date('2026-06-01T12:00:00.000Z');

  assert.equal(isDue({ id: 'past', due: new Date(now.getTime() - 1) }, now), true);
  assert.equal(isDue({ id: 'same', due: now }, now), true);
  assert.equal(isDue({ id: 'future', due: new Date(now.getTime() + 1) }, now), false);
}

function testAgainSchedulesSoon() {
  const now = new Date('2026-06-01T12:00:00.000Z');
  const reviewed = reviewCard(
    {
      ...createCard('again-card'),
      repetitions: 3,
      stability: 10,
      interval: 3,
    },
    1,
    now,
  );

  assert.equal(reviewed.repetitions, 0);
  assert.ok(reviewed.stability < 10);
  assert.ok(reviewed.interval > 0);
  assert.ok(reviewed.interval <= 10 / (24 * 60));
  assert.equal(reviewed.lastReviewed.getTime(), now.getTime());
  assert.ok(reviewed.due.getTime() > now.getTime());
}

function testHardIsWeakSuccess() {
  const now = new Date('2026-06-01T12:00:00.000Z');
  const reviewed = reviewCard(
    {
      ...createCard('hard-card'),
      repetitions: 3,
      stability: 10,
      interval: 3,
    },
    2,
    now,
  );

  assert.equal(reviewed.repetitions, 4);
  assert.ok(reviewed.stability > 10);
  assert.ok(reviewed.interval > 0);
}

function testGoodExtendsInterval() {
  const now = new Date('2026-06-01T12:00:00.000Z');
  const before = {
    ...createCard('good-card'),
    repetitions: 1,
    stability: 10,
    interval: 1,
  };
  const reviewed = reviewCard(before, 3, now);

  assert.equal(reviewed.repetitions, 2);
  assert.ok(reviewed.stability > before.stability);
  assert.ok(reviewed.interval > before.interval);
}

function testEasyLongerThanGood() {
  const now = new Date('2026-06-01T12:00:00.000Z');
  const base = {
    ...createCard('easy-card'),
    repetitions: 2,
    stability: 10,
    interval: 1,
  };

  const good = reviewCard(base, 3, now);
  const easy = reviewCard(base, 5, now);

  assert.ok(easy.stability > good.stability);
  assert.ok(easy.interval > good.interval);
}

function testIntervalUsesTargetRetentionAndStability() {
  const now = new Date('2026-06-01T12:00:00.000Z');
  const reviewed = reviewCard(
    {
      ...createCard('formula-card'),
      stability: 10,
      interval: 1,
    },
    3,
    now,
  );

  const expected = -reviewed.stability * Math.log(reviewed.targetRetention);
  assert.ok(nearlyEqual(reviewed.interval, expected));

  const dueDeltaDays = daysBetween(reviewed.due, now);
  assert.ok(nearlyEqual(dueDeltaDays, reviewed.interval));
}

const tests = [
  testCreateCard,
  testIsDue,
  testAgainSchedulesSoon,
  testHardIsWeakSuccess,
  testGoodExtendsInterval,
  testEasyLongerThanGood,
  testIntervalUsesTargetRetentionAndStability,
];

for (const test of tests) {
  test();
}

console.log(`spacedRepetitionEngine: ${tests.length} tests passed`);
