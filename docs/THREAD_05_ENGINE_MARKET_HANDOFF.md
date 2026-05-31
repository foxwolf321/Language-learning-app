# Thread 05 handoff: evidence-based SRS engine and monetization direction

Date saved: 2026-06-01
Source supplied by user: `5⑤の文章.xlsx`
Repository: `foxwolf321/Language-learning-app`

## Why this file exists

The user moved from the previous “語学学習アプリ収益化⑤” thread because long ChatGPT threads were losing continuity. This file preserves the thread-05 direction so future work does not recreate a disconnected prototype.

## Project objective preserved from thread 05

The project is not merely to finish a flashcard app. The objective is to build a monetizable language-learning product, initially for Indonesian learners preparing for JFT-Basic / SSW / Work-in-Japan practical Japanese.

The user specifically wants the card engine to be explainable externally: it should be grounded in memory research, avoid rights/licensing problems, and not be a black box that cannot be defended when selling the product.

## Strategic direction preserved

1. Use a card-based app driven by spaced repetition / forgetting-curve logic, similar in spirit to Anki, but do not copy proprietary SuperMemo algorithms beyond what is clearly allowed or independently implemented.
2. Treat public JFT-Basic / Irodori / JF Can-do / SSW information as domain and task-structure guidance only. Do not copy official questions, textbook text, or near-clone official content.
3. Validate with a practical Stage 1B Indonesian sample first, then consider paid starter packs and later field-specific SSW packs.
4. Keep the app architecture durable: card data, SRS engine, progress state, and UI should be separated enough that UI changes do not destroy the real learning engine.
5. Use durable repo documents as the source of truth instead of relying on ChatGPT conversation memory.

## Evidence claims discussed in thread 05

The thread text mentioned these evidence pillars:

- Ebbinghaus-style forgetting: memory drops quickly after learning, often modeled with exponential decay.
- Spaced / distributed practice: reviews spread over time generally outperform massed practice.
- Retrieval practice / testing effect: actively recalling an answer is more valuable for long-term retention than passive rereading.
- Adaptive scheduling: the next review should depend on learner performance, not just a fixed calendar.
- Modern optimization approaches such as MEMORIZE / temporal point-process scheduling are relevant research references, but are not directly implemented yet.
- Meaningful context, examples, audio, and situational relevance are important for language cards; the engine alone is not the whole product.

## Implementation claims discussed in thread 05

The thread described a new engine integration with these intended properties:

- A separate `spacedRepetitionEngine.js` module should be read by the browser app as an ES module.
- Cards should store an `engine` state including repetition count, interval, ease factor, stability, target retention, due date, and last-reviewed date.
- Review buttons should map to quality grades: `Again`, `Hard`, `Good`, `Easy`.
- The app should update the card engine state via `reviewCard()` and set the next due date.
- The UI may show Anki-like New / Review / Learning numbers, but the UI must not replace or bypass the actual engine.

## Current repository audit as of 2026-06-01

Current files checked:

- `spacedRepetitionEngine.js`
- `app-v34-codex-engine.html`
- `app-v35-unified-study.html`

Important finding:

`spacedRepetitionEngine.js` is an ES module and exports `createCard`, `isDue`, and `reviewCard`. That part matches the browser import requirement.

However, the engine currently labels itself experimental and app-integration-only. It explicitly says it is not the final evidence-gate scheduler. Therefore it must not be marketed as a completed scientifically validated engine.

## Engine audit verdict

### What can honestly be said now

The current engine is a defensible prototype implementation of spaced repetition principles:

- It stores per-card state.
- It distinguishes new / learning / review / mastered states at the app level.
- It uses user response quality to adjust future intervals.
- It uses due dates so cards are not merely random.
- It follows the broad idea of spaced retrieval and adaptive intervals.

### What cannot honestly be said yet

The current engine is not yet a fully evidence-based production scheduler:

- It has `stability` and `targetRetention` fields, but the current interval calculation does not actually compute recall probability from a formula like `R = exp(-t/S)`.
- The constants are hand-tuned heuristics, not fitted from learner data.
- It is closer to a lightweight SM-2-inspired heuristic than to FSRS, MEMORIZE, or a validated DSR/HLR model.
- It has no test suite proving due-date behavior, answer-grade behavior, import/export compatibility, or edge cases.
- It has no calibration or benchmark against real review logs.

## Required correction from the v35 UI bug

The v35 unified UI initially placed all `learning` cards back into the immediate study queue, even when the engine had scheduled them for 10 minutes or 1 hour later. This caused `Again` / `Hard` to appear not to advance to the next card.

Correct rule:

- `Learning` remains a visible count.
- A card should appear in the immediate queue only if it is due according to the engine, or if it is a new card allowed by the new-card limit.
- `Again` / `Hard` should update the engine and then move to the next available card unless no other due/new card exists.

## Product wording that is safe for now

Use wording like:

> This app uses an experimental spaced-repetition scheduler inspired by established memory principles: active recall, spaced practice, and adaptive review intervals. The current version stores per-card review state and schedules future reviews based on response quality. The scheduler is under evidence-gate review and will be calibrated before paid release.

Avoid wording like:

- Scientifically proven engine.
- FSRS-equivalent.
- MEMORIZE implementation.
- Guaranteed retention.
- Based on Anki's engine.

## Next required engineering steps

1. Keep `spacedRepetitionEngine.js` as a small integration module only until a v1 scheduler spec is written.
2. Add tests for `createCard`, `reviewCard`, `isDue`, and app queue behavior.
3. Decide whether v1 should be:
   - SM-2-inspired simple engine with clear attribution and modest claims, or
   - FSRS-like DSR model using open algorithm references, or
   - custom retention-threshold model using `R = exp(-elapsed / stability)`.
4. Add or finalize `docs/STUDY_ENGINE_V1_EVIDENCE_BASED_SPEC.md`.
5. Only after tests and documentation should the app claim an evidence-based scheduler for paid release.

## External evidence sources to verify before final product claims

- Cepeda et al. (2006), distributed practice meta-analysis: https://doi.org/10.1037/0033-2909.132.3.354
- Roediger & Karpicke (2006), test-enhanced learning / retrieval practice: https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Karpicke & Roediger (2008), retrieval for learning: https://doi.org/10.1126/science.1152408
- Tabibian et al., Optimizing Human Learning / MEMORIZE: https://arxiv.org/abs/1712.01856
- FSRS / open spaced repetition references should be evaluated before adopting FSRS-like claims.

## Spreadsheet extraction note

The uploaded spreadsheet contained the thread-05 flow from the initial request for an evidence-backed monetizable language-learning app, through a research report, then into implementation claims about `app-v34-engine.html`, `spacedRepetitionEngine.js`, and finally `app-v34-codex-engine.html`. The most important durable points are summarized above. If full forensic recovery is needed, use the original uploaded spreadsheet as the raw source.
