# Card Master 2500 Handoff

Last updated: 2026-06-03

This file explains how the 2,500-card master should be designed and handed off across threads, agents, and future repository work.

## Core decision

Build one coherent master table of 2,500 cards first:

- `master_cards_2500.tsv`

Do not build separate free, starter, standard, and complete card sets by adding content later. Release tiers must be slices from the master table.

## Why this changed

The older approach was useful for early strategy discussion, but it risks structural collapse when scaled:

- Later additions create duplicate vocabulary and grammar.
- Later additions create repeated scenes and near-identical cards.
- Difficulty balance drifts.
- IDs become harder to preserve.
- Release tiers become arbitrary instead of intentionally designed.
- Product value becomes hard to explain.

The new approach is master-first, tier-slice-second.

## Required master-card outputs

The master-card work should produce these files:

1. `master_cards_2500.tsv`
2. `word_index_master.tsv`
3. `grammar_expression_index_master.tsv`
4. `release_plan.tsv`
5. `source_evidence_map.tsv`
6. `duplicate_check_report.tsv`
7. `human_review_needed.tsv`

These files should be treated as a connected package. A card without index/evidence/review tracking is not complete.

## Suggested `master_cards_2500.tsv` columns

The exact schema can evolve, but it should preserve these concepts:

| Column | Purpose |
| --- | --- |
| `card_id` | Stable ID. Never reuse an ID for a different card. |
| `tier_min` | Earliest tier where the card appears: `free_validation`, `starter_paid`, `standard_paid`, or `complete_paid`. |
| `jft_section` | JFT-Basic four-section mapping where applicable. |
| `ssw_domain` | 特定技能 / Work-in-Japan domain or workplace scene. |
| `life_domain` | Daily life scene such as housing, hospital, shopping, transport, city office, school, emergency. |
| `difficulty_band` | Controlled progression band. |
| `skill_focus` | Reading, listening, vocabulary, grammar, workplace phrase, sign/form recognition, etc. |
| `jp_front` | Main Japanese prompt/card front. |
| `jp_back` | Japanese answer/explanation if needed. |
| `jp_example` | Practical example sentence or usage context. |
| `furigana` | Reading support. |
| `id_translation` | Indonesian translation. |
| `en_translation` | English fallback translation. |
| `audio_text` | Text to be recorded/generated for audio. |
| `source_evidence_id` | Link to `source_evidence_map.tsv`. |
| `duplicate_group` | Duplicate/near-duplicate tracking. |
| `review_status` | `draft`, `needs_human_review`, `approved`, `rejected`, etc. |
| `notes` | Internal notes. |

## Product tier logic

### `free_validation` — 260 cards

This is a mini product, not a token sample.

It must include:

- JFT-Basic four-section experience
- Daily life cards
- Workplace / 特定技能 cards
- Indonesian-first explanations
- English fallback
- Audio-ready text
- Enough breadth to show the learning loop and practical value

### `starter_paid` — about 800 cards

A broader paid tier for learners who want serious preparation but may not buy the full product yet.

### `standard_paid` — about 1,500 cards

The likely main paid product. It should feel complete enough for exam/life/work preparation.

### `complete_paid` — 2,500 cards

The full master product.

## Evidence policy

The project may use public structures and official domains to design coverage, but it must not copy protected content.

Safe use:

- Official exam structure
- Publicly described JFT/SSW domains
- Irodori-style Can-do/domain mapping as a structural reference
- Original examples created for this product
- Original translations created for this product

Do not use:

- Copied official exam questions
- Reconstructed past questions
- Copied textbook text
- Copied Irodori sentences or dialogues
- Unattributed scraped content

## Duplicate-control policy

Before finalizing the master table:

- Check repeated vocabulary concentration.
- Check repeated grammar patterns.
- Check near-identical Japanese examples.
- Check repeated Indonesian translations.
- Check scene duplication.
- Check whether cards across tiers create a clean progression.

Results should be written to:

- `duplicate_check_report.tsv`

Cards requiring judgment should be written to:

- `human_review_needed.tsv`

## Human review policy

Human review is expected for:

- Naturalness of Japanese
- Indonesian translation quality
- Work/life cultural appropriateness
- JFT/SSW relevance
- Safety-critical scenes such as hospital, emergency, workplace injury, contracts, money, and city-office procedures
- Any card generated from uncertain evidence

## App integration caution

Do not prematurely reshape the app around the 2,500-card plan until the master schema and release slicing are stable.

Current app files to avoid moving casually:

- `app-v35-unified-study.html`
- `spacedRepetitionEngine.js`
- `data/`

The app can continue as a shell/prototype while content architecture is stabilized.

## Handoff instruction for future threads

When continuing this project in a new thread, paste or reference the following summary:

> This project is a monetization-first JFT-Basic / SSW / Work-in-Japan Japanese card app for Indonesian speakers. The current source of truth is `docs/CURRENT_PROJECT_STATE.md` and `docs/CARD_MASTER_2500_HANDOFF.md`. Older 60-card / 400-600-card / 1,000-1,500-card docs are historical unless reconciled. The current content strategy is to create `master_cards_2500.tsv` first, with all 2,500 cards fully drafted in Japanese, furigana, Indonesian, and English, then slice free/starter/standard/complete tiers from that master. Do not casually move `app-v35-unified-study.html`, `spacedRepetitionEngine.js`, or `data/`.
