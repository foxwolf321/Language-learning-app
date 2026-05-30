# STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md

Last updated: 2026-05-30

## Status

**Phase 1-7A / evidence-based spec foundation**

This document is the first accepted foundation for the JFT/SSW study engine. It is intentionally narrower than a full implementation spec. It fixes the decision posture, architecture boundary, required guarantees, and next verification steps.

It does **not** yet finalize the concrete scheduler implementation. The final choice between an FSRS-family external scheduler and a self-built evidence-based lightweight scheduler remains pending until the checks in this document are completed.

## 1. Product objective

The engine exists to support a revenue-first JFT-Basic / SSW / Work-in-Japan practical Japanese product, initially for Indonesian learners with English fallback.

The engine is not a technical showcase. It must support the product promise:

> Learners can repeatedly practice practical Japanese for exam-adjacent and work/life situations, and the app can honestly explain why review timing is expected to support memory retention.

The engine must therefore serve:

- learner trust
- paid-starter credibility
- mobile daily study
- stable free-to-paid progress migration
- future audio and field-pack expansion
- honest external explanation

## 2. Reliability rule

The project may use an external engine, modify an existing approach, or build its own scheduler.

The deciding question is:

> Can this engine be explained honestly as evidence-informed, legally safe, technically maintainable, and suitable for JFT/SSW card modes?

This means:

- External engine use is allowed if license and integration are suitable.
- Anki/SM-2 style logic is allowed only if the exact use is defensible and not misrepresented.
- Custom scheduling is allowed only if evidence-backed and hypothesis-labelled where needed.
- Changing review intervals is allowed only if the reason is documented.
- No scheduler may be called scientific merely because it resembles Anki or uses spaced-repetition vocabulary.

## 3. Related documents

This spec depends on:

- `docs/ENGINE_EVIDENCE_GATE.md`
- `docs/SRS_EVIDENCE_REVIEW.md`
- `docs/STUDY_ENGINE_DECISION_LOG.md`
- `docs/PRODUCT_UX_ARCHITECTURE_AND_RELEASE_PLAN.md`
- `docs/SCHEMA_V2_AND_DECK_MANIFEST.md`
- `docs/STAGE1B_UI_UX_SPEC.md`
- `docs/EXAM_CONTENT_BLUEPRINT.md`

If this file conflicts with `docs/STUDY_ENGINE_V1_SPEC.md`, this file wins because the older spec is frozen draft material.

## 4. Adopted decisions for v1 foundation

### 4.1 Scheduler Adapter boundary is adopted

The app must not couple UI rendering directly to a specific scheduler algorithm.

Required boundary:

```text
Card data / deck manifest / learner settings
  -> Study session builder
  -> Scheduler Adapter
  -> Algorithm implementation
  -> Progress state + review log
  -> Learn / Review queue
```

Reason:

- It prevents another premature implementation from becoming locked into the product.
- It allows FSRS, a self-built scheduler, or a future tuned engine to be swapped without destroying UI and card data.
- It protects learner progress when the product grows from Stage 1B to paid starter and later full core.

### 4.2 Card identity must be stable

Progress must be keyed by stable card IDs, not array order.

A note may produce multiple skill cards. For example, one Japanese phrase can have separate cards for:

- recognition
- production
- listening-ready
- kanji/sign reading
- information-search mini task

A learner recognizing text does not prove listening or production mastery. Therefore, mode-level card identity is required when the skills differ.

### 4.3 Review log is mandatory

Every review event must be logged in a structure that can later support:

- scheduler audit
- parameter tuning
- migration
- mode-level analysis
- paid-pack improvement
- future FSRS comparison or adoption

A scheduler that only stores a current count or status is insufficient.

### 4.4 JFT/SSW priority is a queue-ordering signal, not a memory override

JFT/SSW importance may influence ordering among cards already eligible for study, especially when multiple due cards compete.

It must not:

- force important cards to appear repeatedly when not due
- override review timing without evidence
- become a disguised frequency list

Allowed priority domains include:

- safety / warning / instructions
- workplace instructions
- health / absence / lateness
- residence / city office / documents
- schedule / shifts / time
- reporting problems
- information search from notices/tables/messages

### 4.5 Marketing claims must be constrained

Allowed if implemented:

> This app uses spaced repetition and active recall principles to help learners review practical Japanese over time.

Allowed if FSRS-family scheduler is actually adopted:

> This app uses an FSRS-based review scheduler, combined with JFT/SSW-specific card modes and original practical Japanese content.

Allowed if self-built evidence-based scheduler is adopted:

> This app uses an evidence-informed review scheduler based on spaced practice, active recall, due reviews, and learner review history. Some product-specific settings are treated as hypotheses and will be improved from review data.

Forbidden:

- guaranteed JFT-Basic or SSW success
- scientifically proven superiority over other apps without comparative data
- "forgetting-curve based" if the implementation is just arbitrary fixed intervals
- "AI optimized" unless a real optimization process exists
- "original scientific scheduler" unless the design is genuinely documented and validated

## 5. Candidate engine paths

### Path A: FSRS-family external scheduler

Current status: **primary candidate, pending verification**

Why it is attractive:

- Stronger explanation path than arbitrary fixed intervals.
- Existing ecosystem and documentation.
- Item-level memory-state concept aligns with per-card review history.
- Potentially suitable for JavaScript/PWA through `ts-fsrs`.

Required checks before adoption:

1. Confirm license and attribution obligations.
2. Confirm browser/PWA integration method.
3. Confirm bundle size and build implications.
4. Define how Stage 1B handles limited/no review-history parameter optimization.
5. Define desired retention policy.
6. Define how JFT/SSW modes are represented around the scheduler.
7. Define export/import and migration format.
8. Define fallback if FSRS integration fails.

What not to claim:

- Do not claim this app itself is proven superior just because it uses FSRS.
- Do not claim customized JFT/SSW optimization before real product data exists.

### Path B: self-built evidence-based lightweight scheduler

Current status: **allowed fallback, stricter burden of proof**

Why it may be useful:

- Small PWA footprint.
- Full control over data model and UX.
- Easier to implement without build complexity.

Required checks before adoption:

1. Explicitly cite the evidence principles used.
2. Label every interval or coefficient as evidence-backed, inherited, or hypothesis.
3. Store review history for future evaluation.
4. Explain why it is not just an Anki-like clone.
5. Define migration path to FSRS or later tuned scheduler.
6. Constrain marketing language.

What not to claim:

- Do not claim scientific optimality.
- Do not claim independent proof of effectiveness without user data.

### Path C: SM-2 / Anki-style scheduler

Current status: **historical baseline / fallback only**

Why it remains relevant:

- Simple.
- Well-known in flashcard practice.
- Easier to implement than FSRS.

Why it is not first choice:

- Weaker explanation than modern FSRS-family scheduling.
- Easy to misuse by copying the shape and changing arbitrary days.
- Not strong enough as a revenue-first differentiation claim unless carefully positioned.

### Path D: current PR #38 implementation

Current status: **frozen, not accepted**

Possible future use:

- Some UI or migration code may be reusable after review.

Forbidden use:

- Do not merge it as the accepted SRS engine.
- Do not treat passing static tests as proof of product validity.

## 6. Required adapter interface

The v1 implementation should expose a scheduler adapter with functions equivalent to the following. Names can change, but responsibilities must remain.

```text
initProgress(deckManifest, cards, options)
ensureCardStates(progress, cards)
buildLearnQueue(progress, cards, now, filters)
buildReviewQueue(progress, cards, now, filters)
gradeCard(progress, cardId, grade, context)
estimateCardStatus(progress, cardId, now)
appendReviewLog(progress, reviewEvent)
exportProgress(progress)
importProgress(raw)
migrateProgress(raw)
```

The adapter must isolate:

- card rendering from scheduling
- deck/pack metadata from algorithm internals
- UI button labels from internal grades
- JFT/SSW priority from memory timing
- audio playback from successful review grading

## 7. Required progress state

At minimum, progress must include:

```json
{
  "schema_version": 1,
  "engine_family": "jft_retention",
  "engine_adapter_version": "1.0.0",
  "scheduler_backend": "pending_fsrs_or_custom",
  "deck_id": "jft_ssw_work_japan",
  "pack_states": {},
  "cards": {},
  "review_log": []
}
```

Each card state must include at minimum:

```json
{
  "card_id": "...",
  "note_id": "...",
  "mode": "recognition|production|listening_ready|kanji_sign_reading|information_search_mini",
  "status": "new|learning|review|relearning|mastered|suspended",
  "last_reviewed_at": null,
  "due_at": null,
  "reviews": 0,
  "lapses": 0,
  "correct_streak": 0,
  "last_grade": null,
  "scheduler_state": {}
}
```

`scheduler_state` is intentionally opaque to the UI. If FSRS is used, FSRS-specific state belongs there. If a custom scheduler is used, custom fields belong there.

## 8. Required review event

Each review event must include at minimum:

```json
{
  "event_id": "...",
  "session_id": "...",
  "reviewed_at": "2026-05-30T00:00:00.000Z",
  "card_id": "...",
  "note_id": "...",
  "mode": "...",
  "grade": "again|hard|good|easy",
  "response_ms": null,
  "audio_played_before_answer": false,
  "audio_replay_count": 0,
  "previous_due_at": null,
  "new_due_at": null,
  "previous_status": "new",
  "new_status": "learning",
  "scheduler_backend": "...",
  "scheduler_profile": "..."
}
```

Important:

- Passive audio replay is not the same as successful recall.
- The answer must be revealed before a graded review is accepted.
- If a learner exits before grading, the event should not be logged as success.

## 9. Learner grading model

The internal model should support four grades:

- `again`
- `hard`
- `good`
- `easy`

Reason:

- It gives enough signal to distinguish failure, effortful success, normal success, and easy success.
- It aligns with common SRS conventions and FSRS-style implementations.

UI decision remains pending:

- Stage 1B may show three or four buttons depending on mobile usability.
- If the UI starts with three buttons, the internal design should still allow `hard` or `easy` later without migration pain.

## 10. Mode-specific handling

The scheduler backend may be shared across all modes, but mode must be available to the adapter and review log.

Minimum v1 handling:

- Recognition: normal review card.
- Production: separate card ID from recognition; no automatic mastery from recognition.
- Listening-ready: separate card ID; audio state logged when audio exists.
- Kanji/sign reading: separate card ID when the task is visual reading.
- Information-search mini: separate task card; review should not be reduced to word recognition.

Mode-specific interval tuning is not adopted yet. It is a candidate for later after either evidence review or user data.

## 11. Queue policy

The queue builder should follow this priority order:

1. Due review cards.
2. Learning/relearning cards that need immediate reinforcement.
3. Weak cards eligible for review.
4. New cards up to the daily cap.
5. Optional browse/manual study cards only if explicitly requested.

Within due or eligible groups, JFT/SSW priority may lightly sort cards.

The queue must avoid:

- pure random selection as the main study engine
- showing only high-priority cards
- hiding overdue cards behind new content
- increasing new-card load without regard for future reviews

## 12. Migration requirements

The engine must protect learner trust during expansion.

Required:

- Free Stage 1B progress survives paid starter expansion.
- Existing card states are preserved when new cards are added.
- Old progress keys are not destructively deleted during first migration.
- Export/import remains possible.
- Scheduler backend changes do not require losing review history.

## 13. Acceptance criteria for final v1 engine decision

The final engine decision is accepted only when all are true:

1. The selected backend is named.
2. License and attribution status are documented.
3. The implementation path is realistic for the PWA.
4. The explanation to learners is honest.
5. Evidence-backed parts and hypothesis parts are separated.
6. Progress and review log shape are stable.
7. Five card modes are handled without collapsing them into one generic vocabulary card.
8. JFT/SSW priority does not override memory timing.
9. PR #38 is explicitly reused, rewritten, or abandoned.
10. The user accepts the direction.

## 14. Current decision summary

Adopted now:

- Evidence and explanation are mandatory.
- Scheduler Adapter boundary is mandatory.
- Stable card IDs are mandatory.
- Review logs are mandatory.
- Mode-separated card identity is mandatory where skills differ.
- JFT/SSW priority cannot override memory timing.
- Marketing claims must be constrained.

Primary candidate:

- FSRS-family external scheduler, likely `ts-fsrs`, pending verification.

Allowed fallback:

- Self-built evidence-based lightweight scheduler, with stricter documentation burden.

Rejected:

- Anki-like day tweaking without evidence.
- Treating PR #38 as accepted.
- Claiming scientific memory retention without implementation evidence and honest limits.

## 15. Next small mountain

Next work should not try to complete the whole product.

Next small mountain:

> Verify the FSRS/ts-fsrs adoption path: license, PWA integration, bundle approach, browser feasibility, data model mapping, and fallback plan.

After that, compare against the self-built fallback and decide the backend.
