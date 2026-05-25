# SCHEMA_V2_AND_DECK_MANIFEST.md

Last updated: 2026-05-25

## Purpose

This document explains `data/content_schema.v2.json` and `data/deck_manifest.json`.

The goal is to create a production-oriented data foundation before converting the Indonesian Stage 1B card drafts into JSON or modifying the PWA.

This step exists to prevent the app from becoming a one-file, one-pack, English-first prototype that is difficult to extend into a paid JFT-Basic / SSW / Work-in-Japan product.

## Scope

This issue creates only data foundation files and documentation:

- `data/content_schema.v2.json`
- `data/deck_manifest.json`
- `docs/SCHEMA_V2_AND_DECK_MANIFEST.md`

It does not:

- modify `index.html`
- modify the PWA
- convert Stage 1B cards into production JSON
- create `data/cards.stage1b.id.sample.json`
- add audio files
- add payment
- add login
- add Google Drive
- add app-store behavior

## Why schema v2 is needed

The current schema is useful for simple cards, but the Indonesian Stage 1B product needs more structure.

Schema v2 supports:

- Indonesian-first learner support with English fallback
- five card modes
- deck / pack / stage / tier metadata
- JFT section and SSW overlay metadata
- skill category and scenario metadata
- future priority scheduling
- future paid starter / full core / field-specific packs
- structured review status
- audio-ready metadata without audio files
- information-search mini cards with prompts and expected answers

## Five card modes

Schema v2 treats card mode as first-class metadata. The app should not render all cards with one generic template.

| Mode | Schema value | UX meaning |
|---|---|---|
| Recognition | `recognition` | Japanese target on front, Indonesian meaning and English fallback on back. |
| Production | `production` | Indonesian situation prompt on front, Japanese answer on back. |
| Kanji / Sign Reading | `kanji_sign_reading` | Sign or kanji on front, reading and meaning on back. |
| Listening-ready | `listening_ready` | Text-only for now, but prepared for future audio. |
| Information-search mini card | `information_search_mini` | Short notice/table plus learner task on front, expected answer on back. |

Production and information-search cards require both `prompt` and `expected_answer`.

## Learner-facing vs internal fields

The app should not expose every metadata field to learners. Some fields are for rendering, filtering, scheduling, packaging, or review.

| Learner-facing or semi-facing | Internal / product-control |
|---|---|
| `target` | `id` |
| `reading` | `deck` |
| `romaji` when enabled | `pack` |
| `meaning.id` | `stage` |
| `meaning.en` as fallback | `tier` |
| `prompt.id` | `exam_alignment` |
| `prompt.en` as fallback | `jft_section` |
| `expected_answer` | `skill_category` |
| `example` | `scenario` |
| `usage_note` | `tags` |
| minimal mode/JFT/scenario badges | `priority_weight` |
| future audio controls | `paid_pack_potential` |
|  | `review_status` |
|  | `source_note` |

The UI may show a small number of badges, such as JFT section or work-life domain, but should not look like a database record.

## Indonesian-first localization

For Stage 1B:

- Indonesian is the main learner-facing support language.
- English is fallback/reference.
- Kana remains important.
- Romaji is optional/fadeable.
- Support-language audio is deferred.
- Other languages are future work, not part of the validation release.

Schema v2 uses `meaning.id`, `example.id`, and `prompt.id` for Indonesian. Here `id` means the Indonesian language code, not the card ID.

## Deck manifest role

The deck manifest prevents the app from hardcoding one card file forever.

Instead of directly loading only `data/cards.sample.json`, the future PWA should read:

```text
 data/deck_manifest.json
```

Then it can find the active pack and load the relevant card file.

The manifest currently defines:

- `stage1b_id_validation` as the planned free Indonesian validation sample
- `paid_starter_id_core` as a future 400-600 card paid starter
- `full_core_id` as a future 1,000-1,500 exposure core
- `field_specific_packs_placeholder` as future SSW field-specific pack space

This does not implement payment or locking. It only gives future paid packs a data structure.

## Commercial tier metadata

Schema v2 and the deck manifest include tier metadata:

- `free_validation`
- `paid_starter`
- `full_core`
- `field_specific`
- `preview`

This prepares the data model for monetization without building payment prematurely.

GitHub Pages is acceptable for the free validation release because the content can be public. It is not a secure final paid-content delivery system. Paid delivery should be decided later after the paid offer is validated.

## Review status

Cards must keep quality status explicit.

Schema v2 uses structured review status for:

- Japanese
- Indonesian
- English fallback
- audio
- overall readiness

This prevents draft Markdown or machine-draft Indonesian from being silently treated as final production content.

## Audio-ready metadata

Schema v2 includes audio metadata:

- `audio.target`
- `audio.example`
- `audio.voice`
- `audio.status`
- `audio.needs_recording`
- `audio.review_status`

For the first validation release these fields can stay empty or `not_added`. The point is to avoid changing card IDs later when audio is added.

## Scheduler readiness

Schema v2 includes fields that will matter later for an exam-priority scheduler:

- `jft_section`
- `mode`
- `skill_category`
- `scenario`
- `priority_weight`
- `tags`

The first PWA implementation should still use a simple review model. Advanced scheduling should come after the card UX and content value are validated.

## Anti-chaos rules for future issues

- Do not put all future packs into one unstructured JSON file.
- Do not hardcode a single card file in the PWA forever.
- Do not remove stable card IDs after release.
- Do not treat tags as decorative only.
- Do not display internal metadata as clutter on the card face.
- Do not convert review drafts into production JSON without review status.
- Do not add audio files before text quality is accepted.
- Do not add payment before the paid offer is validated.
- Do not build all support languages at once.
- Do not copy official JFT, Irodori, textbook, leaked, paid-source, or proprietary workplace material.

## Next recommended issues

1. Convert the Indonesian Stage 1B drafts into `data/cards.stage1b.id.sample.json` using schema v2.
2. Validate the JSON against `data/content_schema.v2.json`.
3. Update the PWA to read `data/deck_manifest.json` and render all five card modes.
4. Run a UI/UX validation pass on mobile.
5. Prepare the free validation release checklist.
