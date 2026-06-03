# Current Project State

Last updated: 2026-06-03

This file is the first source of truth for the project. Read this before using older planning documents in this repository.

## Repository

- Repository: `foxwolf321/Language-learning-app`
- Current public app direction: JFT-Basic / 特定技能 / Work-in-Japan Japanese learning cards
- Main audience: Indonesian speakers who need practical Japanese for exam preparation and work/life in Japan
- English: fallback language, not the primary market
- Primary objective: monetization validation, not merely completing an app

## Current correct strategy

The project is no longer only a 60-card validation app, a 400-600 card starter app, or a 1,000-1,500 card full-core app.

The current strategy is to create one stable 2,500-card master dataset first, then cut product tiers from that master.

Reason:

- Adding card text later creates vocabulary duplication.
- Adding card text later creates grammar and scene duplication.
- Adding card text later destabilizes the ID system.
- Adding card text later makes release tiers and difficulty balance harder to control.
- The master dataset should therefore be designed as one coherent product map before tier extraction.

## Card master policy

Create `master_cards_2500.tsv` first.

All 2,500 cards must include, at minimum:

- Japanese card text
- Japanese example sentence or practical usage context
- Furigana / reading support
- Indonesian translation
- English fallback translation
- Stable card ID
- Difficulty / tier information
- JFT / SSW / Work-in-Japan domain tagging
- Source/evidence category tagging
- Human review status

The free, starter, standard, and complete products are not separate content projects. They are release slices from the 2,500-card master.

## Product tiers

| Tier | Approx. cards | Meaning |
| --- | ---: | --- |
| `free_validation` | 260 | Mini product that lets learners feel the app's usefulness. It should include JFT four-section coverage, life scenes, workplace scenes, and audio experience. |
| `starter_paid` | ~800 | Paid starter product cut from the master. |
| `standard_paid` | ~1,500 | Standard paid product cut from the master. |
| `complete_paid` | 2,500 | Full product. |

## Free validation tier

The 260-card free tier is not a tiny sample.

It should function as a small but complete experience:

- JFT-Basic four-section balance
- Daily life situations
- Work-in-Japan / 特定技能 workplace situations
- Listening/audio experience assumption
- A clear feeling that repeated card review improves practical recognition
- Enough breadth to judge whether users will pay for the larger product

## Required deliverables

The current content-production deliverables are:

- `master_cards_2500.tsv`
- `word_index_master.tsv`
- `grammar_expression_index_master.tsv`
- `release_plan.tsv`
- `source_evidence_map.tsv`
- `duplicate_check_report.tsv`
- `human_review_needed.tsv`

## Current app state

The current UI file is:

- `app-v35-unified-study.html`

Routing/cache state as of this update:

- `index.html` redirects to `app-v35-unified-study.html`.
- `app-latest.html` redirects to `app-v35-unified-study.html`.
- `sw.js` includes `app-v35-unified-study.html` in the app shell and uses it as the network-first fallback for HTML navigation.
- Old display on a device may be caused by browser/service-worker/device cache.

Do not move or rewrite these files during archive cleanup unless there is a specific app-change task:

- `app-v35-unified-study.html`
- `spacedRepetitionEngine.js`
- `data/`
- `index.html`
- `app-latest.html`
- `sw.js`

## Engine state

The currently visible study engine file is:

- `spacedRepetitionEngine.js`

Current safe wording:

- The current implementation is still the retention-model v1 prototype under evidence-gate review.
- It is used by `app-v35-unified-study.html`.
- It should not be described as the final V2 engine.
- The strategic decision is to stop trying to beat established spaced-repetition engines with original tweaks.
- The V2 direction is to use an already distributed and maintained FSRS-family engine, with `ts-fsrs` as the first candidate because it is suitable for Web/PWA integration.
- `ts-fsrs` is the adoption direction, not merely an equal option among many; however, it is not yet implemented or verified in the production app.
- Before implementation, the project still needs rights confirmation, license/notice placement, integration design, migration design, and tests.
- Existing public exports must remain stable: `createCard`, `reviewCard`, and `isDue`.
- Do not touch `app-v34-codex-engine.html`, `app-v35-unified-study.html`, or HTML fallback engines as part of the engine-design step.
- Parameter optimization is not part of the first V2 implementation. Use fixed parameters first, then consider optimization only after enough review history exists.
- PR #38 / SRS v1 should be treated as frozen historical work unless reopened deliberately.

## Old documents warning

Git contains older strategy documents and prototypes. Some of them may still be useful historically, but they can pull the project back toward obsolete assumptions:

- 60-card validation as the main scope
- 400-600 card starter as the main scope
- 1,000-1,500 card full-core as the main scope
- app-completion-first thinking instead of monetization-validation-first thinking
- SRS v1 as if it were the final learning engine

Do not use an older document as the project source of truth unless it is explicitly reconciled against this file.

## Immediate operating rule

Before broad repo cleanup or large content generation:

1. Read this file.
2. Read `docs/CARD_MASTER_2500_HANDOFF.md`.
3. Treat older docs as historical unless confirmed current.
4. Do not delete old files immediately.
5. Create or follow an archive migration plan first.
6. Do not move `app-v35-unified-study.html`, `spacedRepetitionEngine.js`, or `data/` casually.
