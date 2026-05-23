# SRS_ENGINE_STRATEGY.md — The review engine is the heart of the app

Last checked: 2026-05-24

## Core position

The content is the body of the product. The scheduler/review engine is the heart.

For a JFT-Basic / SSW exam-preparation app, the scheduler should not simply be a generic flashcard loop. It must help learners retain exam-relevant Japanese and prioritize weak, important, and due cards.

## What Anki's heart is

Anki is built around active recall and spaced repetition. Historically its scheduler was derived from the SM-2 / SuperMemo family, using user ratings to update intervals and ease. Newer Anki versions include FSRS, a Free Spaced Repetition Scheduler, which models memory with concepts similar to:

- difficulty
- stability
- retrievability

The key idea is not just "show cards randomly." It is:

> estimate how likely the learner is to remember a card, then show it again before it is forgotten too much.

## Product requirement

This app should have a review engine that handles:

1. memory strength
2. card difficulty
3. exam importance
4. learner weakness
5. JFT section balance
6. card mode balance
7. upcoming exam pressure
8. semantic/interference risk

A pure due-date scheduler is useful, but insufficient for an exam-oriented product.

## Recommended staged design

### Stage 1B — simple but correct

Use a lightweight FSRS-inspired scheduler, not a full complex model.

Store per card:

```json
{
  "status": "new|learning|review|mastered|leeched",
  "last_reviewed_at": null,
  "due_at": null,
  "interval_days": 0,
  "ease": 2.5,
  "lapses": 0,
  "reviews": 0,
  "correct_streak": 0,
  "last_grade": null,
  "section": "script_vocab|conversation_expression|listening|reading",
  "mode": "recognition|production|kanji_sign|listening",
  "exam_weight": 1.0,
  "difficulty_seed": 1.0
}
```

Use four learner buttons:

- Again / Incorrect
- Hard / Hesitated
- Good / Correct
- Easy / Too easy

Initial behavior:

- Again: show again soon in the same session and tomorrow.
- Hard: short interval.
- Good: normal growing interval.
- Easy: longer interval.

This is enough for validation and avoids overengineering.

### Stage 2 — exam-priority scheduler

Add a priority score:

```text
priority = due_score
         × weakness_score
         × exam_weight
         × mode_weight
         × section_balance
         × urgency_before_exam
```

This makes the app more than Anki-like. It can prioritize:

- overdue cards
- repeatedly missed cards
- high-value JFT sections
- listening/reading gaps
- cards close to the learner's exam date
- SSW work-life survival items

### Stage 3 — FSRS or FSRS-compatible upgrade

After real user review data exists, evaluate adopting a real FSRS implementation or calibrating an FSRS-like model.

Do not build full FSRS too early unless it is easy and legally/technically clean. Without review history, complex calibration gives limited benefit.

### Stage 4 — skill-aware / test-aware scheduler

For a mature product, move beyond card-only scheduling.

Track skill weaknesses:

- script/vocabulary
- conversation/expression
- listening
- reading
- production
- kanji/signs
- workplace safety
- city office procedures

Then schedule both individual cards and weak skill clusters.

## Why test prep needs more than memory scheduling

A generic memory scheduler asks:

> When should this card return?

A JFT/SSW scheduler must also ask:

> Does this card matter for the exam?
> Is this learner weak in this JFT section?
> Are they ignoring listening or reading?
> Is the exam date close?
> Are similar phrases being confused?

## Recommended default review mix

For daily review, use roughly:

- 60-70% due cards
- 15-25% weak cards not yet due but high value
- 10-15% new cards
- 5-10% mixed exam-style / section-balancing cards

Adjust if the learner chooses a mode:

- Exam mode: more section balance and weak areas.
- Daily memory mode: more due cards.
- Pre-exam mode: more high-weight and weak cards.
- New lesson mode: more new cards.

## Card mode implications

Different modes should decay differently.

Recognition cards are usually easier.
Production cards are harder.
Listening cards may need shorter early intervals.
Kanji/sign-reading cards may need targeted repetition.

Suggested mode weights:

| Mode | Initial difficulty | Review priority |
|---|---:|---:|
| Recognition | lower | normal |
| Production | higher | higher |
| Listening | higher | higher |
| Kanji/sign reading | medium-high | high for reading section |

## Interference and similar cards

Language learners often confuse similar expressions.

The scheduler should eventually detect or manually tag confusing clusters:

- 見せてください / 書いてください / 出してください
- 行きます / 来ます / 帰ります
- 休みます / 遅れます / 早退します
- 入口 / 出口 / 非常口

Do not show highly similar new cards too close together unless the goal is comparison practice.

## Revenue relevance

A strong review engine is a paid-value feature.

Free sample:
- simple due/weak/new scheduler

Paid starter:
- exam-priority scheduler
- weak-section tracking
- pre-exam mode

Full product:
- FSRS-like memory modeling
- skill-aware scheduling
- listening/reading balance
- analytics by JFT section

## What not to do

Do not:

- show cards purely randomly
- rely only on manual filters
- clone Anki superficially without a product-specific layer
- add complex FSRS before content and validation are ready
- make users configure scheduler parameters
- hide all scheduling value from the learner

## Recommended next implementation task

After the Indonesian card blueprint is ready, implement a simple Stage 1B scheduler:

- due cards first
- weak cards second
- new cards third
- section balance
- four-button grading
- localStorage persistence
- simple progress by JFT section

Then document the path to FSRS-like upgrade.
