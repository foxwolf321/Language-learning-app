# STAGE1B_JSON_CONVERSION_VALIDATION.md

Last updated: 2026-05-25

## Purpose

This report documents the conversion of the Indonesian Stage 1B card drafts into schema v2 JSON.

Created file:

- `data/cards.stage1b.id.sample.json`

This is still a validation-sample data file, not a paid product, not audio data, and not a PWA implementation change.

## Source

The JSON was converted from the reviewed Stage 1B card draft fields in:

- `docs/INDONESIAN_STAGE_1B_CARD_DRAFTS.md`

The conversion follows:

- `data/content_schema.v2.json`
- `data/deck_manifest.json`
- `docs/SCHEMA_V2_AND_DECK_MANIFEST.md`
- `docs/PRODUCT_UX_ARCHITECTURE_AND_RELEASE_PLAN.md`

## Scope confirmation

This conversion does not:

- modify `index.html`
- modify the PWA
- add audio files
- add payment
- add login
- add Google Drive
- add app-store behavior
- claim the content is human-reviewed production content

## Validation checks performed

| Check | Result |
|---|---:|
| JSON parses successfully | PASS |
| Total cards | 60 |
| Unique card IDs | 60 |
| Duplicate card IDs | 0 |
| Required schema-v2 structural errors | 0 |
| Production cards with prompt + expected answer | 19 |
| Information-search cards with prompt + expected answer | 10 |
| Listening-ready cards marked as needing recording | 15 |

## JFT / SSW section distribution

| Section | Count |
|---|---:|
| script_vocabulary | 14 |
| conversation_expression | 14 |
| listening_comprehension | 14 |
| reading_comprehension | 12 |
| ssw_workplace_overlay | 6 |

This matches the intended Stage 1B allocation:

- Script and Vocabulary: 14
- Conversation and Expression: 14
- Listening-ready / Listening Comprehension: 14
- Reading / Information Search: 12
- SSW workplace survival overlay: 6

## Card mode distribution

| Mode | Count |
|---|---:|
| recognition | 12 |
| production | 19 |
| kanji_sign_reading | 4 |
| listening_ready | 15 |
| information_search_mini | 10 |

Mode counts are not the same as JFT section counts because some sections include multiple rendering modes, and the six SSW overlay cards keep their own overlay section metadata.

## Review status retained

Every converted card keeps structured review status:

- Japanese: `draft_needs_native_check`
- Indonesian: `machine_draft_needs_human_review`
- English fallback: `draft_needs_review`
- Audio: `not_added`
- Overall: `review`

This prevents the JSON from being mistaken for fully reviewed production content.

## Audio handling

No audio files were added.

Listening-ready cards keep audio metadata with:

- `audio.status`: `not_added`
- `audio.needs_recording`: `true`
- `audio.review_status`: `needs_recording`

Other card modes keep audio metadata as not applicable for now.

## Monetization and future-pack readiness

Every card includes:

- `deck`
- `pack`
- `stage`
- `tier`
- `paid_pack_potential`
- `priority_weight`
- `jft_section`
- `skill_category`
- `scenario`
- `tags`

This keeps the Stage 1B sample compatible with future filtering, scheduling, paid starter planning, and field-specific packs.

## Important caveat

This JSON is suitable for the next PWA vertical-slice implementation, but the content still needs human review before any public production or paid release.

Next recommended issue:

- Update the PWA to read `data/deck_manifest.json`, load `data/cards.stage1b.id.sample.json`, and render all five card modes without adding payment, login, Google Drive, or audio files.
