# SRS_EVIDENCE_BASE.md

Specification name: Evidence base for Migration-safe JFT/SSW SRS Engine v1

Last updated: 2026-05-30

## 0. Purpose

This document exists because the study engine is the product's core claim. The app must not ship an arbitrary "SRS-like" loop. It must be explainable as a learning system grounded in established evidence, constrained product claims, and review logs that can later validate or falsify its behavior with real learner data.

This document is a gate for implementation PRs such as PR #38. If implementation behavior conflicts with this file, the implementation must be changed or explicitly justified before merge.

## 1. Product Context

The product is a practical Japanese card app for JFT-Basic, SSW, and Work-in-Japan learners. Stage 1B starts with a 60-card validation sample, then should grow into a paid 400-600 card starter and eventually a 1,000-1,500 card core without resetting learner progress.

The learning engine must therefore support:

- memory retention, not random browsing;
- daily workload control, not unlimited new-card pushing;
- active recall before answer reveal;
- card-level progress that survives content expansion;
- review logs that allow later retention and weakness analysis;
- cautious JFT/SSW priority weighting that never destroys due-date scheduling.

## 2. Evidence Sources

The v1 engine is not a direct implementation of any one paper or of Anki. It is a conservative, product-safe implementation based on evidence-supported principles and existing SRS practice.

### 2.1 Distributed practice / spacing effect

Evidence summary:

- Distributed practice and spaced repetition are established learning principles: repeated study or retrieval episodes separated over time generally support longer-term retention better than massed cramming.
- Spaced repetition software operationalizes this by returning harder or less stable material sooner and increasing intervals for successfully recalled material.

Design implications:

- Reviewed cards must have a `due_at` timestamp.
- Successful recall should usually increase `interval_days`.
- Failure should schedule the card soon and may reduce confidence/ease.
- The scheduler must not become a simple random loop.

Primary/supporting references:

- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin.
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology. Psychological Science in the Public Interest.
- Smolen, P., Zhang, Y., & Byrne, J. H. (2016). The right time to learn: mechanisms and optimization of spaced learning. Nature Reviews Neuroscience.
- Reddy, S., Labutov, I., Banerjee, S., & Joachims, T. (2016). Unbounded Human Learning: Optimal Scheduling for Spaced Repetition. https://arxiv.org/abs/1602.07032

### 2.2 Retrieval practice / active recall / testing effect

Evidence summary:

- Retrieval practice/testing effect research supports the value of actively retrieving information from memory, not merely re-reading.
- A card app should therefore require the learner to try to recall meaning, reading, production, listening, or information-search output before answer reveal.

Design implications:

- The card flow must preserve a clear question/answer boundary.
- The learner should answer mentally or physically before tapping `Show Answer`.
- Grades should be applied after answer reveal.
- Passive browse mode must not be counted as a scheduled review unless the user actually grades the card.

Primary/supporting references:

- Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention. Psychological Science.
- Roediger, H. L., & Butler, A. C. (2011). The critical role of retrieval practice in long-term retention. Trends in Cognitive Sciences.
- Dunlosky et al. (2013), above.

### 2.3 Existing SRS operational baseline: Anki

Evidence summary:

- Anki is not the source of our code, but it is a mature operational reference for how SRS concepts are exposed in a product.
- Anki separates cards into New, Learning, and To Review; it uses answer buttons such as Again, Hard, Good, and Easy; and it exposes daily new/review limits.
- Anki's own manual warns that scheduler/deck option changes can reduce effectiveness if misunderstood.

Design implications:

- UI may be simple, but internal card states must remain explicit.
- `Again`, `Hard`, `Good`, and `Easy` must have stable meanings.
- Daily new-card and review limits are part of the engine, not optional decoration.
- Learning/relearning cards are time-sensitive and should be handled by due time.

References:

- Anki Manual, Studying: https://docs.ankiweb.net/studying.html
- Anki Manual, Deck Options: https://docs.ankiweb.net/deck-options.html

### 2.4 New-card load control and review backlog

Evidence summary:

- Spaced repetition systems face a trade-off between introducing new material and reviewing old material.
- Reddy et al. model this as a scheduling/load problem and show that increasing new-item introduction rate can produce a sharp degradation in outcomes.
- Anki documentation also warns that studying many new cards can create overwhelming future review load and recommends stopping new cards when review backlog is high.

Design implications:

- `new_cards_per_day` is mandatory.
- New cards must not be introduced without limit.
- Due reviews must not be pushed away by new cards.
- A future paid 400-600 card deck must remain controlled by workload settings, not by dumping all cards into Study at once.

References:

- Reddy et al. (2016). https://arxiv.org/abs/1602.07032
- Anki Manual, Deck Options: https://docs.ankiweb.net/deck-options.html

### 2.5 Delay since last review and prior reinforcement

Evidence summary:

- Memory models used in spaced repetition commonly depend on delay since last exposure/review and reinforcement history.
- The scheduler therefore must record enough history to know whether a card is new, recently failed, repeatedly successful, or overdue.

Design implications:

- Each card state requires `last_reviewed_at`, `due_at`, `interval_days`, `reviews`, `lapses`, `correct_streak`, and `last_grade`.
- Each review log event should record both the previous and new scheduling state.
- The engine must not store only aggregate correct/wrong counts.

References:

- Reddy et al. (2016). https://arxiv.org/abs/1602.07032
- Tabibian, B., Upadhyay, U., De, A., Zarezade, A., Schölkopf, B., & Gomez-Rodriguez, M. (2017/2019). Optimizing/Enhancing Human Learning via Spaced Repetition Optimization. https://arxiv.org/abs/1712.01856

### 2.6 Skill/mode-tagged learning data

Evidence summary:

- JFT/SSW learning is not only isolated word memorization. It includes recognition, reading, production, listening readiness, workplace situations, notices, and information search.
- Learning analytics models such as DAS3H explicitly consider item-skill relationships and time-distributed practice history for modeling student learning and forgetting.

Design implications:

- Review logs should include `mode`, `skill_category`, `jft_section`, and scenario metadata when available.
- v1 does not need to implement a complex knowledge-tracing model, but it must preserve data that would make future skill/mode analysis possible.
- Production or listening-like modes may later receive different difficulty/interval coefficients, but only after logs support it.

References:

- Choffin, B., Popineau, F., Bourda, Y., & Vie, J.-J. (2019). DAS3H: Modeling Student Learning and Forgetting for Optimally Scheduling Distributed Practice of Skills. https://arxiv.org/abs/1905.06873

## 3. Evidence-to-Design Mapping

| Evidence area | What it supports | Required design rule | Required fields | Required tests | What not to claim |
|---|---|---|---|---|---|
| Spacing effect / distributed practice | Spaced returns help long-term retention more than massed repetition in many contexts. | Use `due_at`; successful reviews increase interval; failures schedule sooner. | `due_at`, `interval_days`, `last_reviewed_at`, `reviews`, `lapses`. | After `Good`, due moves into the future; after `Again`, due is soon. | Do not claim guaranteed exam success. |
| Retrieval practice / testing effect | Active recall is more valuable than passive re-reading for retention. | Keep question before answer; only graded answer counts as review. | `grade`, `response_time_ms`, `mode`. | Browse does not mutate SRS state; graded cards append review log. | Do not claim passive viewing equals study. |
| Anki operational model | Mature SRS products separate New/Learning/Review and use stable answer buttons. | Preserve internal states even if UI has one Study tab. | `status`, `last_grade`, `due_at`. | New, Learning, Review counts are computed separately. | Do not claim the app is Anki or uses Anki code. |
| New-card load / review backlog | Unlimited new items can overload future reviews and degrade outcomes. | Cap new cards; due reviews have priority over new cards. | `settings.new_cards_per_day`, `settings.max_reviews_per_day`. | New queue never exceeds cap; due cards remain visible. | Do not claim more new cards is always better. |
| Delay and reinforcement | Recall probability depends on elapsed time and prior reinforcement. | Store previous and new due/interval/status in event log. | `review_log`, `previous_due_at`, `new_due_at`, `previous_interval_days`, `new_interval_days`. | Log records before/after state for each graded review. | Do not claim the first version has optimized memory modeling. |
| Skill/mode tagging | Different skills and card modes may have different difficulty/retention. | Preserve metadata for later analytics; do not overfit before data. | `mode`, `skill_category`, `jft_section`, `scenario`. | Logs contain metadata for card mode/skill/section analysis. | Do not claim validated skill-specific personalization before data. |

## 4. Fixed SRS Rules for v1

These rules are fixed for the first commercial-grade v1 engine. UI changes must not break them.

### 4.1 Internal states

The engine must preserve these internal states:

- `new`: card has not yet entered scheduled learning.
- `learning`: card is in early learning steps after first exposure or early failure.
- `review`: card has graduated into spaced review.
- `relearning`: review card was forgotten and is temporarily back in short-step learning.
- Optional future states such as `mastered`, `leeched`, or `suspended` may exist, but v1 must not require them to function.

Do not collapse these states just because the UI is simplified.

### 4.2 Study queue priority

The main Study queue must be built in this order:

1. `learning` / `relearning` cards with `due_at <= now`.
2. `review` cards with `due_at <= now`.
3. `new` cards up to `settings.new_cards_per_day` and only if daily review pressure allows it.

Priority weighting may sort within a bucket, but it must not override due status.

### 4.3 Answer grade meanings

| Grade | Learner meaning | Scheduling meaning |
|---|---|---|
| `Again` | Incorrect, could not recall, or would fail in a real context. | Failure. Schedule soon, increment lapse if appropriate, reset/shorten streak. |
| `Hard` | Correct, but slow or uncertain. | Successful recall but weak. Use shorter interval than Good. Do not count as failure. |
| `Good` | Correct with normal effort. | Successful recall. Standard interval growth. |
| `Easy` | Correct with little/no effort. | Strong recall. Longer interval or easier graduation. |

Hard must never be treated as a failure. Again must never be treated as a success.

### 4.4 JFT/SSW priority weighting

`priority_weight`, `exam_weight`, `skill_category`, and `jft_section` are allowed as scheduler inputs, but only as controlled modifiers.

Allowed:

- Sort due cards with equal urgency by exam/work relevance.
- Prefer important scenarios when choosing among new cards.
- Track weak skills by JFT/SSW domain for future analytics.

Prohibited:

- Showing important new cards while due review backlog is ignored.
- Letting one high-priority domain crowd out all other due review.
- Claiming exam optimization without outcome data.

## 5. Required Progress Fields

Minimum v1 card state:

```json
{
  "status": "new|learning|review|relearning|mastered|leeched",
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
  "mode": "...",
  "jft_section": "..."
}
```

Progress must be keyed by stable `card_id`, not array index.

## 6. Required Review Log Fields

Minimum review event for validation-grade analytics:

```json
{
  "card_id": "id-stage1b-0001",
  "reviewed_at": "2026-05-30T00:00:00.000Z",
  "grade": "again|hard|good|easy",
  "previous_status": "new|learning|review|relearning",
  "new_status": "learning|review|relearning",
  "previous_due_at": null,
  "new_due_at": "2026-05-31T00:00:00.000Z",
  "previous_interval_days": 0,
  "new_interval_days": 1,
  "response_time_ms": 4200,
  "mode": "meaning|reading|production|listening|info_search",
  "skill_category": "city_office",
  "jft_section": "life_in_japan",
  "scenario": "city_office_residence_card",
  "scheduler_profile": "baseline_jft_srs_v1",
  "engine_version": "1.0"
}
```

If some metadata is unavailable in Stage 1B, store `null` or a stable placeholder rather than omitting the field from the schema contract.

## 7. Validation Metrics

The app must be able to compute or export the data required for these checks.

### 7.1 Scheduler correctness metrics

- New cards introduced per day versus `new_cards_per_day`.
- Due review count and overdue review count.
- Learning/relearning cards due now.
- Whether Study queue order respects due learning -> due review -> new.
- Whether `Again`, `Hard`, `Good`, `Easy` produce expected status/due changes.

### 7.2 Learning outcome metrics

- First-review grade distribution.
- Second-review retention by card and mode.
- 1-day, 3-day, 7-day retention proxy by grade on due reviews.
- Again rate by card, mode, skill category, JFT section, and scenario.
- Hard rate by card, mode, skill category, JFT section, and scenario.
- Response time distribution by grade/mode.
- Review backlog growth under different `new_cards_per_day` settings.

### 7.3 Product validation metrics

- Completion rate for a daily session.
- Return rate after 1 day, 3 days, 7 days.
- Cards with persistently high Again/Hard rates that require content rewriting.
- Modes that create disproportionate failure burden.
- Whether learners abandon when review backlog grows.

## 8. Product Claim Boundary

### 8.1 Allowed claims before app-specific outcome data

The product may claim:

- It uses a study schedule based on spaced repetition and active recall principles.
- It separates new, learning, and review cards internally rather than showing cards randomly.
- It records review logs so that retention, weak cards, and workload can be analyzed and improved.
- It is designed for JFT/SSW/work-life Japanese domains using original content and metadata.

### 8.2 Claims requiring app-specific data first

Do not claim until logs and validation data support it:

- Users remember X% more.
- The app is more effective than Anki, Duolingo, or other competitors.
- The scheduler is optimized for JFT-Basic outcomes.
- The app guarantees exam success.
- A specific number of days/cards leads to a specific score.

### 8.3 Never claim

- Guaranteed pass.
- Medical/clinical memory improvement.
- Scientifically proven effectiveness of this app before this app has user data.

## 9. PR #38 Audit Checklist

Before PR #38 or any SRS implementation PR is merged, verify:

### 9.1 Scope

- [ ] App code changes are limited to the SRS implementation and necessary UI hooks.
- [ ] No paid content, payment, login, Google Drive, audio, or unrelated redesign is included.
- [ ] Ruby/furigana display fixes are not regressed.

### 9.2 State and migration

- [ ] Progress is keyed by stable `card_id`.
- [ ] `schema_version`, `engine_family`, `engine_version`, and `scheduler_profile` exist.
- [ ] localStorage key remains `jft-ssw-work-japan-progress-v1`.
- [ ] Existing progress is migrated or preserved, not discarded.
- [ ] Adding new cards does not reset old card states.

### 9.3 Scheduler

- [ ] Internal states include at least `new`, `learning`, `review`, and `relearning` or a documented equivalent.
- [ ] Study queue prioritizes due learning/relearning, then due review, then new.
- [ ] `due_at` is not ignored.
- [ ] New cards respect `new_cards_per_day`.
- [ ] Review backlog is not made worse by unlimited new-card introduction.
- [ ] `priority_weight` / `exam_weight` cannot override due review logic.

### 9.4 Grades

- [ ] `Again` is failure and schedules soon.
- [ ] `Hard` is successful but weak recall; it is not failure.
- [ ] `Good` is normal successful recall.
- [ ] `Easy` is strong successful recall.
- [ ] Each grade appends a review log event.

### 9.5 Review log

- [ ] Review log records previous and new status.
- [ ] Review log records previous and new due dates.
- [ ] Review log records previous and new interval days.
- [ ] Review log records mode/skill/JFT metadata when available.
- [ ] Review log can support future retention and weakness analysis.

## 10. Implementation Gate

No SRS implementation PR should be merged unless it satisfies this evidence base or explicitly documents a temporary deviation.

Temporary deviations must include:

- what is missing;
- why it is acceptable for Stage 1B;
- how it will be measured or fixed;
- what user/product claim is prohibited until it is fixed.

## 11. Relationship to STUDY_ENGINE_V1_SPEC.md

`docs/STUDY_ENGINE_V1_SPEC.md` defines the v1 engine shape. This document defines why that shape exists and what evidence/claim boundaries govern it.

If the two documents conflict, do not silently choose one. Open a documentation correction PR before implementation proceeds.
