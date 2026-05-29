# STUDY_ENGINE_V1_SPEC.md

Specification name: Migration-safe JFT/SSW SRS Engine v1

Last updated: 2026-05-29

## 1. Engine Purpose

This app is a JFT-Basic / SSW / Work-in-Japan practical Japanese card product. Its goal is not simply to finish a PWA. Its goal is to become a monetizable learning product that can grow from the Stage 1B 60-card validation sample into a paid 400-600 card starter and later a 1,000-1,500 card full core without breaking learner progress.

The study engine is necessary because a random card loop does not solve the real learning problem:

- Learners forget cards at different speeds.
- Some cards are weak even after several reviews.
- Some JFT/SSW situations matter more than generic vocabulary.
- Different card modes have different difficulty: recognition is easier than production, listening, or sign/information search.
- A learner preparing for work in Japan needs practical recall under pressure, not only passive reading.

The engine must therefore manage memory, weakness, review timing, and exam/work-life importance. It should make the product feel more valuable than a static phrase list while staying simple enough to ship and validate.

## 2. Core Philosophy

The v1 engine is based on these learning principles:

- Spaced repetition: cards should return after increasing intervals when recall is successful.
- Active recall: learners should attempt to remember or produce the answer before revealing it.
- Due-date scheduling: each reviewed card should have a `due_at` timestamp that controls when it should return.
- Learner self-rating: each answer should be graded with `Again`, `Hard`, `Good`, or `Easy`.
- Migration safety: progress must survive card additions, settings changes, and future scheduler tuning.

This is an independent implementation. It may use Anki-like learning ideas such as intervals, ease, lapses, and due reviews, but it must not copy Anki code. It must not bundle external FSRS code in v1. Future FSRS evaluation can happen after real user review data exists, but v1 should be useful and durable on its own.

## 3. Learn / Review / Browse Roles

Learn, Review, and Browse must not behave like the same random list with different labels.

| Area | Role | Queue behavior |
|---|---|---|
| Learn | Main study entry for new material and early practice. | New cards first up to the daily cap, learning cards that need reinforcement, and a small number of due cards if needed to keep sessions healthy. |
| Review | Memory maintenance and weakness repair. | Due cards first, then weak cards, then fallback review cards if the learner has no due queue. It should not simply duplicate Learn. |
| Browse | Full content inspection and QA. | Shows all cards with search/filter. Browse does not grade or schedule cards unless a future explicit study-from-browse action is added. |

Learn should answer: "What should I study next?"  
Review should answer: "What is due or weak now?"  
Browse should answer: "What is in this pack?"

## 4. Progress Schema

The v1 progress object should be versioned, card-ID keyed, and engine-family stable.

Recommended local progress shape:

```json
{
  "schema_version": 1,
  "engine_family": "jft_srs",
  "engine_version": "1.0",
  "scheduler_profile": "baseline_jft_srs_v1",
  "settings": {
    "study_pace": "standard",
    "new_cards_per_day": 10,
    "max_reviews_per_day": 80,
    "learning_steps_minutes": [10, 1440],
    "graduating_interval_days": 1,
    "easy_interval_days": 4,
    "review_order": "due_then_priority",
    "exam_priority_strength": "normal"
  },
  "cards": {
    "<card_id>": {
      "status": "new|learning|review|mastered|leeched",
      "last_reviewed_at": null,
      "due_at": null,
      "interval_days": 0,
      "ease": 2.5,
      "difficulty": 1.0,
      "stability_days": 0,
      "lapses": 0,
      "reviews": 0,
      "correct_streak": 0,
      "last_grade": null,
      "exam_weight": 1.0,
      "skill_category": "...",
      "mode": "..."
    }
  },
  "review_log": []
}
```

Field intent:

| Field | Purpose |
|---|---|
| `schema_version` | Progress data format version. |
| `engine_family` | Stable engine family. Should remain `jft_srs` across Stage 1B, paid starter, and full core. |
| `engine_version` | Current engine implementation version. Can change with migration. |
| `scheduler_profile` | Tunable profile name. Lets the app adjust settings without pretending progress is a different engine. |
| `settings` | Learner/session settings and scheduler coefficients. |
| `cards` | Card state keyed by stable card ID. |
| `review_log` | Append-only review event log for future analysis and migration. |

## 5. Card-ID Keyed Progress

Progress must be keyed by `card_id`, not by array index or display order.

Rules:

- A card ID must not change after public release.
- Adding new cards must not reset existing progress.
- When a new pack or expanded deck is loaded, `ensureCardStates(cards, progress)` should add missing card IDs as `new`.
- Existing `reviews`, `lapses`, `due_at`, `interval_days`, `ease`, `correct_streak`, and `review_log` must be preserved.
- If a card is retired later, its progress should not be immediately deleted. The engine can mark it inactive or leave it in historical progress.

This is essential for the monetization path. A learner who studies the free 60-card sample should not lose progress when upgrading to a 400-600 card paid starter.

## 6. Review Log

The review log should store enough data to audit and recalculate behavior later.

Each review event should include:

```json
{
  "card_id": "id-stage1b-0001",
  "reviewed_at": "2026-05-29T00:00:00.000Z",
  "grade": "again|hard|good|easy",
  "previous_due_at": null,
  "new_due_at": "2026-05-30T00:00:00.000Z",
  "interval_days": 1,
  "engine_version": "1.0",
  "scheduler_profile": "baseline_jft_srs_v1"
}
```

Purpose:

- Preserve learner history even when scheduler coefficients change.
- Support future analytics by JFT section, mode, skill category, and scenario.
- Make migration safer because old decisions can be inspected.
- Allow future recalculation experiments without deleting user progress.

The log does not need to grow forever in local-only validation builds. A future implementation may compact older logs, but the first v1 implementation should keep review events unless storage becomes a practical issue.

## 7. Settings

The engine should support these settings internally:

| Setting | Purpose | Default |
|---|---|---|
| `study_pace` | Learner-facing pace tier. | `standard` |
| `new_cards_per_day` | Caps daily new cards. | `10` |
| `max_reviews_per_day` | Caps review workload. | `80` |
| `learning_steps_minutes` | Short learning steps before graduation. | `[10, 1440]` |
| `graduating_interval_days` | First normal review interval after learning. | `1` |
| `easy_interval_days` | First easy interval. | `4` |
| `review_order` | Queue ordering style. | `due_then_priority` |
| `exam_priority_strength` | Strength of exam/work-life weighting. | `normal` |

The UI should not expose every numeric parameter at first. A simple three-level UI is enough:

| UI pace | Suggested behavior |
|---|---|
| Light | Fewer new cards, lower daily review cap. |
| Standard | Default daily learning pace. |
| Intensive | More new cards and reviews for motivated learners. |

Implementation should map these UI labels to internal settings. Users should not need to understand SRS math to study.

## 8. Again / Hard / Good / Easy

The v1 engine should use four answer grades.

| Grade | Learner meaning | Scheduling meaning |
|---|---|---|
| Again | I got it wrong or could not recall it. | Add a lapse, reset or shorten interval, schedule soon. |
| Hard | I remembered, but slowly or with uncertainty. | Keep progress, but use a shorter interval than Good. |
| Good | I remembered normally. | Use the standard interval growth. |
| Easy | This was easy and quick. | Use a longer interval and increase confidence. |

Mobile layout:

- If four buttons fit comfortably, show one row: Again / Hard / Good / Easy.
- If space is tight, use two rows: Again / Hard on the first row, Good / Easy on the second row.
- Keep buttons reachable by thumb.
- Do not hide the meaning of the grades behind icons only in v1.

## 9. Scheduling Policy

Baseline queue priority:

1. Due cards first.
2. Weak cards second.
3. New cards third.
4. Maintain section balance.
5. Apply `priority_weight` / `exam_weight` lightly.

Future priority score:

```text
priority =
  due_score
  * weakness_score
  * exam_weight
  * mode_weight
  * section_balance
```

Suggested factor meanings:

| Factor | Meaning |
|---|---|
| `due_score` | Overdue cards rise to the top. |
| `weakness_score` | Cards with lapses, low streak, or repeated Hard/Again become more urgent. |
| `exam_weight` | High-value JFT/SSW cards get a modest boost. |
| `mode_weight` | Production, listening-ready, kanji/sign, and information-search can be weighted differently. |
| `section_balance` | Prevents one JFT section from crowding out the others. |

The first implementation can use simple sorting and caps. It should not overfit before real learner data exists.

## 10. JFT/SSW-Specific Elements

The app should use content metadata as scheduler input, not decorative labels.

JFT/SSW-specific rules:

- Use card `priority_weight` as the initial `exam_weight`.
- Cards for city office, workplace instructions, safety, health, lateness, residence card, and reporting problems can receive modest priority boosts.
- Do not ignore `due_at` just because a card is important.
- Do not show only high-priority cards until the learner neglects normal memory review.
- Use `jft_section`, `skill_category`, `scenario`, and `mode` for future analytics and section balance.

Examples of high-value domains:

- Residence card and city office procedures.
- Workplace instructions and supervisor communication.
- Safety warnings and signs.
- Health, absence, lateness, and shift schedule.
- Information search from notices, tables, and short messages.

## 11. migrateProgress Policy

Old progress must not be thrown away.

If an older localStorage format exists:

- Read it with `migrateProgress(raw)`.
- Convert known fields into schema version 1 where possible.
- Preserve card-level state such as `new`, `learning`, `review`, or `mastered`.
- Convert right/wrong counters into `reviews`, `lapses`, and `correct_streak` as best as possible.
- Preserve known timestamps as `last_reviewed_at` and/or `due_at` when available.
- If data is incomplete, initialize missing fields with v1 defaults rather than discarding the card.
- Do not immediately delete the old localStorage value after migration.

Recommended migration safety:

- Save the migrated object under the v1 key.
- Leave the old key untouched for at least the first migration release.
- Optionally write a migration marker inside the v1 progress object.
- Offer export before destructive reset actions.

## 12. localStorage Key

Recommended stable key:

```text
jft-ssw-work-japan-progress-v1
```

The implementation should also know the existing key or keys used by the current app and read them during `migrateProgress()`.

Rules:

- New v1 progress should be written to `jft-ssw-work-japan-progress-v1`.
- Existing keys should be read, migrated, and preserved.
- Do not block future sync. The key should contain versioned, JSON-serializable progress that can later be exported or synced.

## 13. Future Card Additions

The same `engine_family` should cover:

| Product stage | Approximate card count | Engine behavior |
|---|---:|---|
| Stage 1B validation | 60 cards | Initialize or migrate progress; all cards can start as new. |
| Paid starter | 400-600 cards | Preserve the original 60 card states; add only new card IDs as `new`. |
| Full core | 1,000-1,500 cards | Preserve all existing progress; use settings to control daily workload. |

When cards are added:

- Keep existing progress for old card IDs.
- Add missing card IDs with default v1 card state.
- Keep `engine_family` unchanged.
- Adjust `settings` and scheduler coefficients rather than replacing progress.
- Do not reset due dates or review logs.

This protects learner trust. If someone pays for a starter pack, the upgrade should feel additive, not like starting over.

## 14. Prohibited Actions

Do not:

- Reset learning history during normal app updates.
- Change released `card_id` values.
- Copy Anki code.
- Bundle external FSRS code in v1.
- Design as if the engine will be replaced soon.
- Tightly couple UI rendering and scheduler state.
- Modify `app-v34.html` in this documentation-only issue.
- Store progress by card array position.
- Delete old localStorage immediately after migration.
- Let `priority_weight` override all due-date logic.
- Add payment, login, Google Drive, or audio as part of the engine spec issue.

## 15. Candidate Implementation Functions

The next implementation PR should likely introduce or isolate these functions:

| Function | Purpose |
|---|---|
| `initProgress(cards)` | Create a v1 progress object for a card list. |
| `migrateProgress(raw)` | Convert older progress formats to v1. |
| `getCardState(cardId)` | Return the progress state for one card. |
| `ensureCardStates(cards, progress)` | Add missing card states without changing existing progress. |
| `gradeCard(card, grade, now)` | Apply Again / Hard / Good / Easy to one card and update scheduling fields. |
| `appendReviewLog(...)` | Add a review event with previous and new due data. |
| `getDueCards(cards, progress, now)` | Return cards where `due_at <= now`. |
| `getWeakCards(cards, progress)` | Return cards with lapses, low streak, or recent Hard/Again grades. |
| `getNewCards(cards, progress)` | Return cards still marked `new`. |
| `buildLearnQueue(cards, progress, filters)` | Build the Learn queue from new, learning, and limited due cards. |
| `buildReviewQueue(cards, progress, filters)` | Build the Review queue from due and weak cards. |
| `pickNextCard(queue)` | Choose the next card deterministically enough for a stable UX. |

Implementation guidance:

- Keep scheduler functions separate from DOM rendering.
- Make functions testable with plain card/progress objects.
- Avoid hidden global state where possible.
- Keep timestamps in ISO 8601 strings.
- Use the same card metadata fields already present in Stage 1B JSON.

## 16. First-Generation Scheduling Defaults

The exact interval math can be tuned, but v1 should start with predictable behavior.

Suggested first-pass behavior:

| Current status | Again | Hard | Good | Easy |
|---|---|---|---|---|
| `new` | `learning`, due in 10 minutes | `learning`, due in 10 minutes | `learning`, due in 1 day | `review`, due in 4 days |
| `learning` | `learning`, due in 10 minutes, lapse +1 | `learning`, due in 1 day | `review`, due in 1 day | `review`, due in 4 days |
| `review` | `learning`, due in 10 minutes, lapse +1 | `review`, interval grows slowly | `review`, interval grows normally | `review`, interval grows faster |
| `mastered` | `review`, due soon, lapse +1 | `review`, shorter interval | `mastered`, normal interval | `mastered`, longer interval |
| `leeched` | Keep flagged; schedule carefully | Keep flagged; short interval | Allow recovery after streak | Allow recovery after streak |

Possible interval rules:

- Again: set due to `now + learning_steps_minutes[0]`.
- Hard: multiply previous interval by about `1.2`, with a small minimum.
- Good: multiply previous interval by `ease`.
- Easy: multiply previous interval by `ease * 1.3`, or use `easy_interval_days` for early reviews.
- Lapse: reduce `ease` slightly, increment `lapses`, reset `correct_streak`.
- Good/Easy: increment `correct_streak`, increment `reviews`.

These are product defaults, not sacred math. Future tuning should adjust settings or coefficients while keeping existing progress.

## 17. Release Scope Reminder

This document is a specification only. It does not implement the engine.

This issue should create only:

- `docs/STUDY_ENGINE_V1_SPEC.md`

It should not modify:

- `app-v34.html`
- `index.html`
- `app-latest.html`
- `sw.js`
- `manifest.webmanifest`
- `data/cards.stage1b.id.sample.json`
- `data/deck_manifest.json`

## 18. Next Implementation PR Scope

The next implementation PR should be narrow:

1. Add a small scheduler module or isolated scheduler section.
2. Add `jft-ssw-work-japan-progress-v1`.
3. Implement `initProgress`, `migrateProgress`, `ensureCardStates`, and `gradeCard`.
4. Add `Hard` to the review grading model if the UI is ready, or document a temporary mapping if UI remains three-button.
5. Build distinct Learn and Review queues.
6. Preserve existing localStorage progress through migration.
7. Verify that adding cards does not reset old card IDs.
8. Keep UI design changes minimal and separate from engine logic.

Do not combine this with payment, login, Google Drive, audio, or content expansion.
