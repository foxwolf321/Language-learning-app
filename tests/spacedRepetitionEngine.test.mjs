import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCard, isDue, reviewCard } from '../spacedRepetitionEngine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const MS_PER_MINUTE = 60 * 1000;

function minutesBetween(a, b) {
  return (new Date(a).getTime() - new Date(b).getTime()) / MS_PER_MINUTE;
}

function testCreateCardReturnsFsrsV2State() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const card = createCard('sample-card', now);

  assert.equal(card.id, 'sample-card');
  assert.equal(card.card_id, 'sample-card');
  assert.equal(card.engine_version, 'fsrs-v2');
  assert.equal(card.engine_name, 'ts-fsrs');
  assert.equal(card.library_version, '5.2.3');
  assert.equal(card.review_count, 0);
  assert.equal(card.lapse_count, 0);
  assert.ok(card.due instanceof Date);
  assert.ok(card.fsrs_card);
  assert.ok(card.engine_state.fsrs_card);
  assert.deepEqual(card.review_log, []);
}

function testIsDueUsesDueDate() {
  const now = new Date('2026-06-04T12:00:00.000Z');

  assert.equal(isDue({ due: new Date(now.getTime() - 1) }, now), true);
  assert.equal(isDue({ due: now }, now), true);
  assert.equal(isDue({ due: new Date(now.getTime() + 1) }, now), false);
}

function testAgainSchedulesShortTerm() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const reviewed = reviewCard(createCard('again-card', now), 'again', now);
  const minutes = minutesBetween(reviewed.due, now);

  assert.equal(reviewed.review_count, 1);
  assert.equal(reviewed.lapse_count, 1);
  assert.equal(reviewed.review_log.at(-1).rating, 'again');
  assert.ok(minutes > 0);
  assert.ok(minutes <= 2);
}

function testHardIsBetweenAgainAndGood() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const base = createCard('rating-order-card', now);
  const again = reviewCard(base, 'again', now);
  const hard = reviewCard(base, 'hard', now);
  const good = reviewCard(base, 'good', now);

  assert.ok(hard.due.getTime() > again.due.getTime());
  assert.ok(hard.due.getTime() < good.due.getTime());
  assert.equal(hard.lapse_count, 0);
}

function testGoodIsStandardSuccess() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const reviewed = reviewCard(createCard('good-card', now), 'good', now);

  assert.equal(reviewed.review_count, 1);
  assert.equal(reviewed.lapse_count, 0);
  assert.equal(reviewed.last_review.getTime(), now.getTime());
  assert.equal(reviewed.review_log.at(-1).rating, 'good');
  assert.ok(reviewed.due.getTime() > now.getTime());
}

function testEasyLongerThanGood() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const base = createCard('easy-card', now);
  const good = reviewCard(base, 'good', now);
  const easy = reviewCard(base, 'easy', now);

  assert.ok(easy.due.getTime() > good.due.getTime());
  assert.equal(easy.lapse_count, 0);
}

function testReviewCountIncrements() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const later = new Date('2026-06-04T00:10:00.000Z');
  const first = reviewCard(createCard('count-card', now), 'good', now);
  const second = reviewCard(first, 'easy', later);

  assert.equal(first.review_count, 1);
  assert.equal(second.review_count, 2);
  assert.equal(second.review_log.length, 2);
}

function testLapseCountIncrementsOnAgain() {
  const now = new Date('2026-06-04T00:00:00.000Z');
  const later = new Date('2026-06-04T00:10:00.000Z');
  const first = reviewCard(createCard('lapse-card', now), 'good', now);
  const second = reviewCard(first, 'again', later);

  assert.equal(first.lapse_count, 0);
  assert.equal(second.lapse_count, 1);
}

function testModuleExportsIsAbsent() {
  const source = readFileSync(join(repoRoot, 'spacedRepetitionEngine.js'), 'utf8');
  assert.equal(source.includes('module.exports'), false);
}

function testV36HasNoFallbackEngine() {
  const source = readFileSync(join(repoRoot, 'app-v36-clean-fsrs.html'), 'utf8');
  assert.equal(/fallbackEngine/i.test(source), false);
}

function testV36DoesNotUseAlternateEngineOnImportFailure() {
  const source = readFileSync(join(repoRoot, 'app-v36-clean-fsrs.html'), 'utf8');
  assert.equal(/SREngine|fallbackEngine|retention-curve/i.test(source), false);
  assert.ok(source.includes('api: null'));
  assert.ok(source.includes('Study controls are disabled'));
}

const tests = [
  testCreateCardReturnsFsrsV2State,
  testIsDueUsesDueDate,
  testAgainSchedulesShortTerm,
  testHardIsBetweenAgainAndGood,
  testGoodIsStandardSuccess,
  testEasyLongerThanGood,
  testReviewCountIncrements,
  testLapseCountIncrementsOnAgain,
  testModuleExportsIsAbsent,
  testV36HasNoFallbackEngine,
  testV36DoesNotUseAlternateEngineOnImportFailure,
];

for (const test of tests) {
  test();
}

console.log(`spacedRepetitionEngine v2/fsrs: ${tests.length} tests passed`);
