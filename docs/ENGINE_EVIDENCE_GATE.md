# ENGINE_EVIDENCE_GATE.md

## Status

**FROZEN / BLOCKING**

The current SRS / study engine design is frozen.

The project must not proceed with SRS implementation merge, paid-pack planning, monetization claims, Play Store monetization, audio rollout as a paid feature, or any "memory retention layer" sales positioning based on the current engine draft until this evidence gate is completed and accepted.

## Why this file exists

This file exists to prevent project-memory loss across ChatGPT threads.

A repeated failure mode in this project is that the assistant sees an existing study-engine spec or implementation PR and incorrectly treats it as accepted. That must not happen.

The previous engine draft risked becoming an Anki-like imitation with lightly adjusted intervals rather than an evidence-based retention engine. The project's monetization thesis depends on being a credible **memory retention layer**, not a random flashcard app or cosmetic SRS clone.

Therefore, the engine must be rebuilt from evidence and product requirements, not from convenience or vague similarity to Anki.

## Current decision

The existing `docs/STUDY_ENGINE_V1_SPEC.md` is preserved only as a draft reference.

It is **not** the accepted engine specification.

Open or draft implementation PRs based on that document are **not** to be merged merely because they implement Again / Hard / Good / Easy, `due_at`, or Learn / Review queues.

## Prohibited until this gate is cleared

Do not:

- Treat `docs/STUDY_ENGINE_V1_SPEC.md` as adopted.
- Merge SRS implementation PRs based only on the current draft.
- Proceed to paid-pack design as if the engine were solved.
- Claim "memory retention" or "forgetting-curve based" as a product value without evidence-backed design.
- Use arbitrary intervals such as 10 minutes, 1 day, 4 days, or similar without evidence and rationale.
- Copy Anki behavior casually.
- Build a scheduler by changing Anki-like intervals slightly and calling it original.
- Let implementation convenience decide learning science.
- Let `priority_weight` or JFT/SSW importance override actual memory timing.
- Advance payment, Play Store, advertising, or audio monetization as the next priority before the engine evidence question is resolved.

## Required research before accepting engine v1

Before engine v1 is adopted, research and summarize at least:

1. Forgetting curve research and its limitations.
2. Spacing effect.
3. Retrieval practice / testing effect.
4. Expanding intervals vs fixed intervals.
5. Desirable difficulty and item difficulty.
6. SM-2 / SuperMemo / Anki scheduling principles.
7. FSRS concepts, strengths, limits, and whether FSRS is appropriate before real user review data exists.
8. Differences between card modes:
   - recognition
   - production
   - listening-ready
   - kanji/sign reading
   - information-search mini cards
9. How audio changes review value and scheduling, especially for listening and production.
10. How JFT/SSW exam/work-life priority should influence queue order without destroying memory scheduling.

## Required output of the evidence gate

The next accepted engine spec must define:

- What evidence supports the interval policy.
- What is borrowed from existing SRS theory.
- What is intentionally not copied.
- What is simplified for v1.
- Which intervals are fixed defaults and why.
- Which intervals are adaptive and why.
- How learner ratings affect scheduling.
- Whether four grades are justified, or whether a simpler learner UI is better.
- How mode difficulty affects scheduling.
- How JFT/SSW priority affects queue order without overriding due cards.
- What review data must be logged for future tuning.
- How free sample progress survives paid-pack expansion.
- How old scheduler drafts and old progress data are migrated safely.

## Evidence-gate deliverables

Before unfreezing implementation, create or update these files:

1. `docs/SRS_EVIDENCE_REVIEW.md`
   - Research summary with sources and product implications.

2. `docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md`
   - New accepted v1 engine spec derived from the evidence review.

3. `docs/STUDY_ENGINE_DECISION_LOG.md`
   - Clear decisions: adopted, rejected, deferred, and why.

4. Optional replacement or revision of `docs/STUDY_ENGINE_V1_SPEC.md`
   - Only after the evidence-based spec is accepted.

## Acceptance criteria

This gate is cleared only when:

- The evidence review is written.
- The new v1 engine spec explicitly cites the evidence review.
- The spec distinguishes evidence-backed decisions from pragmatic simplifications.
- The spec explains why it is not merely Anki imitation.
- The spec is simple enough to implement for Stage 1B validation.
- The spec logs enough data to revise the scheduler later.
- The user explicitly accepts the evidence-based engine direction.

## Project priority while frozen

Current priority:

**Phase 1-7A: Engine Evidence Gate**

Do not continue to:

- paid starter package design
- full audio rollout
- Play Store monetization
- ad strategy
- SRS implementation merge
- large card production

until this gate is cleared.

## Short handoff for future threads

If a future assistant reads this file, the correct project state is:

> The monetization strategy points toward a JFT/SSW/Work-in-Japan memory-retention product, but the study engine is frozen because the previous SRS draft lacked sufficient evidence grounding. Do not treat the old engine spec or PR as accepted. First complete the SRS evidence review, then rebuild the v1 engine spec, then return to paid-pack and monetization design.
