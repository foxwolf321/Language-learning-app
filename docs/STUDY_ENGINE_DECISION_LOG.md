# STUDY_ENGINE_DECISION_LOG.md

Last updated: 2026-05-30

## Status

**Draft decision log for Phase 1-7A: Engine Evidence Gate**

This file records what is adopted, rejected, deferred, or frozen for the JFT/SSW study engine. It exists to stop future threads or implementation agents from treating convenience-based scheduler work as accepted product strategy.

## First principle

The project may use an external scheduler, modify an existing scheduler, or build an original scheduler. The deciding factor is not originality.

The deciding factor is:

> Can the app honestly explain why this engine is expected to support memory retention, and can the design be defended with research, implementation evidence, license safety, and logged validation data?

## Current phase

Current phase:

**Phase 1-7A: Engine Evidence Gate**

Do not return to paid-pack design, audio monetization, Play Store monetization, or large card production until this gate is cleared.

## Decisions

### D1. The current SRS v1 draft is not accepted

Status: **Adopted decision**

`docs/STUDY_ENGINE_V1_SPEC.md` is preserved as a useful draft, but it is not the accepted engine specification.

Reason:

- It correctly identifies that random card looping is insufficient.
- It correctly emphasizes stable card IDs, due dates, review logs, migration safety, and future paid-pack expansion.
- However, its interval policy and scheduler logic were not sufficiently evidence-grounded.

Consequence:

- The document may be mined for architecture ideas.
- It must not be used as the final scheduler design.

### D2. PR #38 must remain frozen

Status: **Adopted decision**

PR #38 (`Implement SRS v1 in Stage 1B app`) must not be merged as the accepted study engine.

Reason:

- The PR implements the frozen draft direction.
- The issue is not only runtime correctness; the deeper issue is scheduler evidence.

Consequence:

- It can be reviewed later for reusable code structure.
- It cannot be treated as product-ready SRS.

### D3. Anki-like interval tweaking is rejected

Status: **Rejected**

The project rejects any scheduler that is basically "Anki-like intervals with slightly changed days" unless the specific design is justified by evidence or openly labelled as a limited hypothesis.

Reason:

- It would be misleading to sell as a memory-retention engine.
- It would not be a serious strategic response to Anki/FSRS competition.

### D4. External engines are allowed

Status: **Adopted decision**

The project may use an external free/open scheduler if licensing, implementation, and explanation are suitable.

Reason:

- The project goal is revenue-first learning value, not inventing an algorithm for its own sake.
- A credible external engine may be more honest and stronger than a weak custom clone.

Required before adoption:

- Confirm license and attribution requirements.
- Confirm browser/PWA integration path.
- Explain limitations honestly.
- Preserve card IDs and review logs.

### D5. Self-built engine is allowed only with stricter evidence discipline

Status: **Adopted decision**

A custom scheduler is acceptable if it is explicitly evidence-based or honestly hypothesis-labelled.

Required:

- Cite research principles.
- Explain interval choices.
- Separate evidence-backed rules from product hypotheses.
- Log review data for later validation.
- Avoid claims stronger than the evidence.

### D6. FSRS / ts-fsrs is the primary candidate, not yet final

Status: **Primary candidate / not final**

`ts-fsrs` or another FSRS-family implementation is the current first candidate because it offers a stronger explanation path than arbitrary fixed intervals and fits the JavaScript/PWA direction.

Reason:

- FSRS uses item-level memory-state concepts.
- It is already known in the spaced-repetition ecosystem.
- It supports an honest external explanation if implemented correctly.

Still required:

- License confirmation.
- Bundle/integration check.
- Desired-retention configuration decision.
- Handling of low initial review data.
- Scheduler adapter design.

### D7. Scheduler Adapter architecture is adopted

Status: **Adopted decision**

The app should use a Scheduler Adapter boundary instead of coupling UI directly to a specific algorithm.

Reason:

- Protects the product if FSRS integration fails.
- Allows future tuning or migration.
- Keeps UI, card rendering, and scheduler logic separate.
- Prevents a repeat of implementing a convenient scheduler before evidence review.

Required adapter responsibilities:

- initialize progress state
- grade a card
- return due cards
- build Learn queue
- build Review queue
- append review log
- preserve card IDs
- export/import progress

### D8. JFT/SSW priority must not override memory timing

Status: **Adopted decision**

JFT/SSW importance may influence queue order among due or otherwise eligible cards. It must not override the memory model.

Reason:

- Over-showing important cards breaks spaced repetition.
- Priority is a product/content signal, not a replacement for memory timing.

### D9. Card modes must be tracked separately

Status: **Adopted decision**

Recognition, production, listening-ready, kanji/sign reading, and information-search mini cards should be treated as distinct card modes and, when they test different skills, distinct card IDs.

Reason:

- Seeing a word and recognizing meaning is not the same as hearing it.
- Producing a phrase is not the same as recognizing it.
- Reading a sign/notice is not the same as vocabulary recognition.

### D10. Marketing claims must be constrained

Status: **Adopted decision**

The app may claim spaced repetition and active recall principles if implemented. It may claim FSRS-based scheduling if FSRS is actually used and disclosed correctly.

The app must not claim:

- guaranteed exam success
- superiority over competitors without data
- scientific proof of this specific app before validation
- forgetting-curve-based scheduling if the implementation is merely arbitrary fixed intervals

## Deferred decisions

- Final selection: FSRS external engine vs custom evidence-based engine.
- Exact package and import method for PWA.
- desired retention value.
- Whether mode-specific retention targets are used in v1.
- Whether Stage 1B UI shows 3 or 4 rating buttons.
- Whether PR #38 can be partly reused.
- Whether audio cards use separate scheduler settings in v1 or only separate card IDs.

## Next required step

Create `docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md`.

That spec should choose a concrete v1 direction from the evidence review and this decision log.
