# SRS_EVIDENCE_REVIEW.md

Last updated: 2026-05-30

## Status

**Evidence review draft for Phase 1-7A: Engine Evidence Gate**

This document exists to prevent the project from adopting a weak or arbitrary card scheduler. It does not by itself authorize implementation. The accepted study engine must be documented in `docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md` and the decision must be recorded in `docs/STUDY_ENGINE_DECISION_LOG.md`.

## Product context

This project is a revenue-first JFT-Basic / SSW / Work-in-Japan practical Japanese product, initially for Indonesian learners with English fallback. The study engine is not a technical decoration. It is part of the product promise: helping learners remember useful Japanese for exam-adjacent and work/life situations.

Therefore, the project must never claim a scientifically grounded memory-retention engine unless the scheduler choice can be explained honestly.

Acceptable engine paths:

- Use an external free/open scheduler if license and integration are suitable.
- Build an original scheduler if the design is backed by research, data, and a clear validation plan.
- Modify existing intervals only if the change is justified and labelled as evidence-backed or hypothesis-stage.

Unacceptable path:

- Copy an Anki-like shape, alter a few days, and call it original or scientific without evidence.

## Core learning evidence

### 1. Spacing effect / distributed practice

Finding:

Distributed practice is a robust learning principle: spacing reviews over time generally improves long-term retention compared with massed repetition. This supports using a scheduler instead of a random or cram-only card loop.

Primary implication for this app:

- Cards should return after time has passed.
- The system should prefer due review over random review.
- The app should control new-card load because new cards create later review burden.

Important limitation:

Spacing research supports the principle of spaced review, but it does not by itself prove that any particular interval such as 10 minutes, 1 day, 4 days, or 6 days is optimal for this product.

Sources to use in the final spec:

- Cepeda et al., 2008, "Spacing effects in learning: A temporal ridgeline of optimal retention" — https://doi.org/10.1111/j.1467-9280.2008.02209.x
- Dunlosky et al., 2013, "Improving Students' Learning With Effective Learning Techniques" — https://doi.org/10.1177/1529100612453266

### 2. Retrieval practice / testing effect

Finding:

Long-term retention improves when learners actively retrieve information rather than only re-read or re-listen. For this app, the front side of a card must create a recall attempt before the answer is shown.

Primary implication for this app:

- A clear "Show answer" flow is valid because it separates attempt from feedback.
- Listening and production modes must not become passive exposure.
- Audio playback alone is not learning unless the learner is asked to retrieve or understand before checking.

Important limitation:

Retrieval practice supports active recall, but it does not decide the scheduler by itself.

Sources to use in the final spec:

- Roediger & Karpicke, 2006, "Test-enhanced learning: Taking memory tests improves long-term retention" — https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Roediger & Butler, 2011, "The critical role of retrieval practice in long-term retention" — https://doi.org/10.1016/j.tics.2010.09.003

### 3. Adaptive scheduling and item-level memory state

Finding:

Spaced repetition works better as a personalized/adaptive system than as a fixed random loop. Modern systems increasingly track item-level memory state and review history.

Primary implication for this app:

- Progress must be keyed by stable card IDs.
- Review history must be logged.
- Card modes such as recognition, production, listening-ready, kanji/sign reading, and information-search should be tracked separately when they represent different skills.

Important limitation:

Adaptive scheduling can overfit or become too complex before real review data exists. Stage 1B should use a simple but evidence-compatible scheduler and log enough data for later tuning.

Sources to use in the final spec:

- Choffin et al., 2019, "DAS3H: Modeling Student Learning and Forgetting for Optimally Scheduling Distributed Practice of Skills" — https://arxiv.org/abs/1905.06873
- Anki FAQ, "What spaced repetition algorithm does Anki use?" — https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html

## Existing scheduler families

### A. SM-2 / Anki-style scheduling

Summary:

SM-2 is historically important and has been widely reimplemented. It uses grades, repetition count, easiness factor, and review intervals. Anki historically used a modified SM-2 style scheduler, not a literal copy.

Strengths:

- Simple and proven by long practical use.
- Easy to understand.
- Works well enough for flashcard-style learning when implemented honestly.

Risks:

- Directly copying a shape and modifying intervals casually is not an evidence-based original design.
- SM-2-style factors are partly heuristic.
- It is weaker as a product claim than modern FSRS-style scheduling if FSRS integration is feasible.

Status for this project:

**Comparison baseline / fallback only. Not the first recommendation.**

Sources:

- SuperMemo SM-2 description — https://www.super-memory.com/english/ol/sm2.htm
- Anki FAQ — https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html

### B. FSRS / DSR-family scheduling

Summary:

FSRS uses a memory-state view based on Difficulty, Stability, and Retrievability. The Anki FAQ describes FSRS as a scheduler that learns memory patterns and can target desired retention. This aligns well with the need to explain the engine in a credible way.

Strengths:

- Stronger explanation than arbitrary fixed intervals.
- Tracks item-level memory state.
- Supports desired retention as a user/product-level control.
- Available in Anki and in open-spaced-repetition implementations.
- Better long-term path because review logs can later train or tune parameters.

Risks:

- Requires correct integration.
- Parameter optimization is meaningful only after review logs exist.
- Browser/PWA packaging, bundle size, and license notices must be checked.
- It is still not a guarantee of exam success or language acquisition; it schedules review, not content quality.

Status for this project:

**Primary candidate for v1, through a Scheduler Adapter.**

Sources:

- Anki FAQ — https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html
- ts-fsrs repository — https://github.com/open-spaced-repetition/ts-fsrs
- fsrs-rs repository — https://github.com/open-spaced-repetition/fsrs-rs

### C. Self-built evidence-based lightweight scheduler

Summary:

A self-built scheduler is allowed only if its evidence base and limitations are explicit. It may use spacing, retrieval practice, item difficulty, due dates, and conservative adaptation without claiming more than it can prove.

Strengths:

- Full control over PWA simplicity.
- Can be tailored to JFT/SSW modes and mobile UX.
- Easier to keep small if external dependencies are unsuitable.

Risks:

- Harder to defend as effective.
- Easy to slip into arbitrary interval design.
- Requires a strong decision log separating evidence-backed principles from hypotheses.

Status for this project:

**Acceptable fallback if FSRS integration is unsuitable, but only with stricter explanation and validation requirements.**

Minimum requirements for self-built acceptance:

- Cite the evidence used.
- Explain every interval or coefficient as evidence-backed, inherited, or hypothesis.
- Store all review logs.
- Avoid marketing claims stronger than the evidence supports.
- Provide a migration path to FSRS or later tuned scheduler.

## JFT/SSW-specific implications

The engine must not treat all cards as the same skill.

### Card mode handling

The following modes must be first-class in the scheduler state and logs:

- `recognition`: Japanese to meaning.
- `production`: Indonesian/work-life prompt to Japanese output.
- `listening_ready`: audio or audio-ready spoken Japanese to meaning/action.
- `kanji_sign_reading`: sign/kanji reading and practical meaning.
- `information_search_mini`: find information from a notice/table/message.

The app may use one scheduler family for all modes, but each mode should have separate card IDs and logs. Recognition success must not automatically imply listening or production mastery.

### JFT/SSW priority

JFT/SSW priority should influence queue order only after memory timing is respected.

Allowed:

- If multiple cards are due, prioritize safety, workplace instruction, health, absence/lateness, residence/card office tasks, and information-search tasks.

Forbidden:

- Showing important cards too frequently even when not due.
- Using priority to override the memory model.
- Letting a high-priority tag replace retrieval evidence.

### Audio

Audio should not be treated as decoration.

- Listening-ready cards should require understanding before answer reveal.
- Production cards should use audio feedback after learner attempts output.
- Audio replay count should be logged.
- Passive audio playback should not count as a successful review.

## Candidate recommendation

Current strategic recommendation:

1. Use a **Scheduler Adapter** architecture so the app is not permanently tied to one implementation.
2. Treat **FSRS/ts-fsrs** as the primary v1 candidate because it is explainable, modern, open, and fits a JavaScript/PWA direction.
3. Keep **self-built evidence-based scheduler** as fallback only if FSRS integration, bundle size, or licensing is unsuitable.
4. Treat **SM-2/Anki-style logic** as historical baseline and fallback, not as the project’s default new engine.
5. Keep PR #38 frozen until the evidence-based spec decides whether anything can be reused.

## What may be claimed externally

Allowed external claim after implementation and validation:

> This app uses spaced repetition and active recall principles. Review timing is handled by an evidence-informed scheduler, and learner review history is stored so the system can improve over time.

Allowed if FSRS is adopted:

> This app uses an FSRS-based scheduler for review timing, combined with JFT/SSW-specific card modes and original practical Japanese content.

Forbidden claim at Stage 1B:

> This app scientifically guarantees passing JFT-Basic or SSW.

Forbidden claim unless proven by data:

> This app is more effective than Anki, Kotoba, Irodori Practice, or other apps.

## Next required document

Create `docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md` to define the accepted v1 engine design. It should explicitly say whether v1 uses FSRS adapter, self-built scheduler, or a staged choice.
