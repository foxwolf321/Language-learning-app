# PRODUCT_UX_ARCHITECTURE_AND_RELEASE_PLAN.md

Last updated: 2026-05-25

## 1. Strategic principle

This project should be designed as a revenue-first JFT-Basic / SSW / Work-in-Japan practical Japanese product for Indonesian learners, not as a generic Japanese flashcard app.

The core principle is:

- Build small features first.
- Design the structure for the future paid product from the beginning.
- Use the first release to validate card UX and product positioning.
- Do not build the full paid product before validating whether the learning experience feels valuable.

The first release should answer practical questions:

- Do Indonesian learners understand and trust the card format?
- Do the five card modes feel useful for JFT-Basic / SSW preparation?
- Does Indonesian-first support with English fallback reduce friction?
- Does the app feel focused enough to support a future paid starter pack?

It should not try to answer every future product question at once. Payment, login, Google Drive sync, audio rollout, field-specific packs, and advanced scheduling should remain planned architecture until the free validation sample gives stronger evidence.

## 2. What must be fixed now vs tested in the first release

Some architecture choices should be fixed before converting Stage 1B drafts to production JSON. These choices affect card identity, paid pack readiness, progress migration, and future content expansion.

| Fixed now | Decision needed | Why it matters |
|---|---|---|
| Card IDs | Stable card IDs must not change after release. | Progress, reviews, exports, and future sync depend on stable IDs. |
| Deck / pack / stage structure | Cards should belong to a deck, pack, and stage. | The app must avoid being locked to one sample card file forever. |
| Free / paid / preview metadata | Each pack and card should be able to indicate tier and preview status. | This prepares for a paid starter without implementing payment now. |
| Card mode list | Recognition, Production, Kanji / Sign Reading, Listening-ready, and Information-search mini card should be first-class modes. | Rendering, review UX, and future analytics depend on the mode. |
| Schema v2 requirements | Stage 1B needs fields that current schema v1 does not fully cover. | Production JSON should not be a temporary format that must be rewritten immediately. |
| Deck manifest requirements | A manifest should list available decks/packs and card files. | This avoids hardcoding `data/cards.sample.json` forever. |
| Progress storage format | Progress should be versioned and keyed by deck, pack, and card ID. | Future migration and paid packs need non-destructive progress handling. |
| Audio metadata placeholders | Audio fields should exist even when files do not. | Listening-ready cards can become audio cards later without changing IDs. |
| review_status handling | Draft, human review, native check, and audio status should be explicit. | Review drafts must not be confused with production-ready app data. |
| Tags / JFT / SSW metadata | Exam and scenario metadata should be structured, not decorative. | Future exam-priority scheduling and paid-pack organization depend on it. |

Other choices should be tested in the first release because they are learner-experience questions, not architecture constants.

| Tested in first release | What to observe | Acceptable first-release approach |
|---|---|---|
| Tap-to-flip vs answer button | Which interaction feels faster and clearer on mobile. | Start with a clear Show answer button; test tap-to-flip later if needed. |
| Front/back language layout | Whether learners prefer Japanese first or situation prompt first by mode. | Use mode-specific layouts rather than one generic card template. |
| Font sizes | Whether Japanese, kana, and Indonesian support text are readable on small phones. | Large Japanese target text, compact support text. |
| Spacing | Whether cards feel focused without hiding useful context. | Mobile-first spacing with no decorative clutter. |
| Button placement | Whether Again / Good / Easy are reachable by thumb. | Keep review controls near the bottom. |
| Indonesian-first display | Whether Indonesian support is clearly primary. | Indonesian meaning/prompt should appear before English fallback. |
| English fallback behavior | Whether English helps without making cards noisy. | Show English as secondary/reference text. |
| Romaji visibility | Whether romaji helps beginners or distracts learners. | Include romaji but make it optional/fadeable in UX planning. |
| Card tag visibility | Whether minimal learner-facing tags increase trust. | Show only useful tags such as JFT section or work-life domain. |
| Information-search mini card readability | Whether learners can find the answer from notices/tables on mobile. | Use short blocks and an explicit learner task. |
| Mobile one-hand operation | Whether learning flow is comfortable on a phone. | Keep primary actions reachable and predictable. |

## 3. Product tiers

The product should be structured around a clear paid path, but the first release should remain a validation sample.

| Tier | Purpose | Belongs here | Do not build yet |
|---|---|---|---|
| Free Stage 1B validation sample | Validate positioning, card UX, Indonesian support, and learner trust. | Around 60 reviewed Indonesian Stage 1B cards across the five modes, basic progress, export/import, and clear exam/work-life positioning. | Payment, login, full audio, all languages, advanced scheduler, hundreds of cards. |
| Paid 400-600 card starter | First real monetization offer after validation. | Broader JFT/SSW starter coverage, better sequencing, more review-ready content, clearer exam/work-life tags, possibly limited audio if demand is proven. | Full core scope, every field-specific scenario, expensive audio for all cards before conversion evidence. |
| Later full core | Deeper preparation product. | A fuller 1,000-1,500 exposure core across JFT-Basic domains, practical life in Japan, work instructions, notices, and review modes. | Field-specific depth that belongs in separate paid packs. |
| Field-specific paid packs | Higher willingness-to-pay add-ons for work contexts. | Care worker, food service, manufacturing, building cleaning, accommodation, agriculture, or other SSW-relevant practical language packs. | Building all fields before a starter pack proves demand. |

The free sample should feel credible enough that learners can imagine paying for the starter. It should not give the impression that the entire product is a random phrase list.

## 4. Deck / pack architecture

The current PWA loads one file directly. That is acceptable for an early prototype, but the next production-oriented structure should use a deck manifest so the app can support multiple packs over time.

Recommended deck / pack metadata:

| Field | Level | Purpose |
|---|---|---|
| deck_id | Deck | Stable ID for the broader product, for example a JFT/SSW work-in-Japan deck. |
| pack_id | Pack | Stable ID for a specific release package, such as Stage 1B Indonesian validation. |
| title | Deck or pack | Learner-facing name. |
| target_language | Deck or pack | Target language, initially `ja`. |
| support_language | Deck or pack | Main learner support language, initially `id`. |
| fallback_language | Deck or pack | Secondary support language, initially `en`. |
| stage | Pack or card | Learning stage, such as `stage1b`. |
| tier | Pack or card | `free_validation`, `paid_starter`, `full_core`, or `field_specific`. |
| card_count | Pack | Expected number of cards in the pack. |
| status | Pack | Content lifecycle status, such as `draft`, `review`, `ready`, or `archived`. |
| card_file | Pack | Relative path to the JSON card file. |
| release_status | Pack | App release status, such as `planned`, `preview`, `released`, or `retired`. |
| review_status | Pack | Review state for language/content quality. |

Example manifest shape for a future issue, not to be created in this issue:

```json
{
  "schema_version": 1,
  "decks": [
    {
      "deck_id": "jft_ssw_work_japan",
      "title": "JFT-Basic / SSW Work-in-Japan Japanese",
      "target_language": "ja",
      "support_language": "id",
      "fallback_language": "en",
      "packs": [
        {
          "pack_id": "stage1b_id_validation",
          "stage": "stage1b",
          "tier": "free_validation",
          "card_count": 60,
          "status": "review",
          "card_file": "data/cards.stage1b.id.sample.json",
          "release_status": "planned",
          "review_status": "needs_human_review"
        }
      ]
    }
  ]
}
```

This structure lets the app load a chosen pack from a manifest instead of hardcoding one card file forever. It also gives future paid packs a place to exist without changing the basic card identity model.

## 5. Card schema v2 requirements

The current `data/content_schema.json` is useful for the first 50 sample cards, but it is not enough for the Indonesian Stage 1B product direction.

Current schema v1 supports:

- stable `id`
- `deck`
- numeric `stage`
- Japanese `target`
- `reading`
- optional `romaji`
- multilingual `meaning` and `example` objects
- broad `question_type`
- simple `audio.target` and `audio.example`
- `tags`
- `notes`
- `source_note`

Stage 1B needs additional structure:

| Gap in current schema | Why Stage 1B needs it | Schema v2 direction |
|---|---|---|
| No `pack` field | Paid starter and field-specific packs need separate identity. | Add stable pack metadata. |
| No `tier` field | Free, paid, preview, and field-specific content must be separable. | Add tier at card and/or pack level. |
| No first-class `mode` | Five card modes need different rendering. | Add explicit mode enum. |
| `question_type` is too broad | Mode and task shape are different concepts. | Keep `question_type`, but add mode-specific rendering logic. |
| No `exam_alignment` | Cards must stay connected to JFT/SSW positioning. | Add exam alignment metadata. |
| No `jft_section` | Exam-priority scheduling needs section-level metadata. | Add structured JFT section. |
| No `skill_category` | Card design and analytics need skill grouping. | Add skill category. |
| No `scenario` | Work/life relevance must be visible internally. | Add scenario/domain. |
| No `priority_weight` | Future scheduler needs weighting inputs. | Add numeric or controlled priority. |
| No `paid_pack_potential` | Content strategy needs to classify free vs paid value. | Add field for free validation, paid starter, full core, or field-specific pack. |
| No structured `review_status` | Drafts, human review, and production readiness must be separate. | Add structured review status. |
| Audio metadata too small | Audio rollout needs voice/status/review information. | Expand audio object. |
| Information-search tasks not modeled | Mini notice/table cards need task and expected answer. | Add mode-specific prompt/task fields or a structured task object. |

Required schema v2 fields:

| Field | Learner-facing or internal | Notes |
|---|---|---|
| id | Internal, stable | Never change after release. |
| deck | Internal and optional learner-facing | Groups broad product area. |
| pack | Internal and optional learner-facing | Groups release package. |
| stage | Internal and optional learner-facing | Use a stable string such as `stage1b` rather than only a number. |
| tier | Internal | Supports free validation and future paid packs. |
| target | Learner-facing | Japanese phrase, sentence, word, sign, notice, or task text. |
| reading | Learner-facing | Kana reading remains important. |
| romaji | Learner-facing optional | Useful for early learners, but should be fadeable. |
| meaning.id | Learner-facing | Indonesian support meaning. Clarify that `id` here means Indonesian language code, not card ID. |
| meaning.en | Learner-facing secondary | English fallback/reference. |
| example.ja | Learner-facing | Short original Japanese example when useful. |
| example.reading | Learner-facing | Kana reading for example. |
| example.id | Learner-facing | Indonesian support example. |
| example.en | Learner-facing secondary | English fallback example. |
| mode | Internal and rendering-critical | Recognition, Production, Kanji / Sign Reading, Listening-ready, or Information-search mini card. |
| question_type | Internal and rendering-supportive | More specific task type such as vocab, situation, notice, workplace, or listening-ready. |
| exam_alignment | Internal and optional learner-facing summary | Must indicate why the card supports JFT/SSW preparation. |
| jft_section | Internal and optional learner-facing tag | Script/Vocabulary, Conversation/Expression, Listening, Reading/Information, or SSW overlay. |
| skill_category | Internal | Used for content balance and future scheduler. |
| scenario | Internal and optional learner-facing | City office, shift, safety, dormitory, workplace, transport, etc. |
| tags | Internal and minimal learner-facing | Tags should support filtering and trust, not decoration. |
| priority_weight | Internal | Later scheduler input; should be evidence-informed over time. |
| paid_pack_potential | Internal | Free sample, paid starter, field-specific pack, or later full core. |
| review_status | Internal | Structured quality status across Japanese, Indonesian, English, and audio. |
| audio | Internal and future learner-facing | Placeholder object until audio rollout. |
| source_note | Internal | Originality/source discipline note. |

Recommended separation:

| Learner-facing fields | Internal fields |
|---|---|
| target, reading, romaji, meaning.id, meaning.en, example.ja, example.reading, example.id, example.en, mode-specific prompt/task, expected answer when relevant, available audio controls | id, deck, pack, stage, tier, question_type, exam_alignment, jft_section, skill_category, scenario, tags, priority_weight, paid_pack_potential, review_status, audio.status, source_note |

Internal metadata can still support learner trust, but it should be surfaced selectively. A card should not look like a database record.

## 6. Card mode rendering plan

The app should not render all card types as the same front/back template. Mode-specific rendering is one of the main UX validation goals.

| Mode | Front fields | Back fields | Optional fields | Future audio placement | Visual emphasis | Hidden or secondary |
|---|---|---|---|---|---|---|
| Recognition | Japanese `target`, reading if needed, minimal mode tag. | Indonesian meaning first, English fallback second, example, usage note. | Romaji, tags, scenario. | Target audio near Japanese text when available. | Large Japanese target and clear Indonesian answer. | Internal metadata, long tag lists, paid-pack metadata. |
| Production | Indonesian situation prompt first, English fallback prompt second. | Japanese target, reading, Indonesian/English meaning, usage note. | Romaji, example. | Target audio on answer side; later prompt audio only if justified. | Situation prompt and practical Japanese output. | Exam metadata except one small tag if useful. |
| Kanji / Sign Reading | Kanji/sign/notice text as the main object. | Reading, Indonesian meaning, English fallback, practical use note. | Romaji, example, scenario tag. | Target audio optional; not required for every sign. | Reading and meaning of the visible sign/kanji. | Internal weighting and paid-pack fields. |
| Listening-ready | Audio control in the future; for now audio-ready Japanese text or prompt as a temporary validation display. | Text, reading, Indonesian meaning, English fallback, short note. | Romaji and example. | Audio button belongs at top of the front once audio exists. | The listening task should feel distinct from normal recognition. | Audio file paths when not available; do not show broken controls. |
| Information-search mini card | Short notice/table/message plus Indonesian learner task; English fallback task secondary. | Expected answer, relevant Japanese text, reading/meaning support, short usage note. | Romaji only if useful, minimal tags. | Audio generally not first priority. | The learner task and expected answer. | Decorative translations of every word; large metadata blocks. |

Information-search mini cards need special care. The front should ask the learner to find something, not merely read a short notice. The back should show the expected answer and the reason it is useful.

## 7. UI/UX principles for the first release

The first release should be smartphone-first and validation-focused.

Principles:

- Use large Japanese target text.
- Make Indonesian the main learner-facing support language.
- Keep English fallback secondary and clearly less prominent.
- Keep kana visible because it supports early learners and pronunciation.
- Keep romaji optional/fadeable because it helps some beginners but can become a crutch.
- Put primary buttons where they are reachable by thumb.
- Make the answer/review flow fast: see front, show answer, grade, move on.
- Show tags minimally, such as mode, JFT section, or work-life scenario.
- Do not let internal metadata clutter the card.
- Make Information-search mini cards readable on small screens.
- Keep the design serious enough for an exam/work preparation product.

The first release can be visually simple, but it should not feel disposable. A learner should believe the product could become a paid JFT/SSW preparation tool.

## 8. Suggested app navigation

Recommended first-release navigation:

| Navigation item | Validation need | First-release depth |
|---|---|---|
| Learn | Required. Main new-card experience. | Full enough to handle all five modes. |
| Review | Required. Due/review flow and repeated practice. | Can share much of the Learn UI at first. |
| Browse | Useful for QA and learner trust. | Minimal searchable/filterable list by mode or scenario. |
| Progress | Required. Shows New / Learning / Review / Mastered and basic completion. | Simple summary only. |
| About / Exam Alignment | Useful for positioning. | Short explanation of JFT/SSW focus, originality, and Indonesian support. |

For validation, Learn and Review are the most important. Browse and About can remain small, but they help prove that the app is organized around JFT/SSW work-life preparation rather than random phrases.

## 9. Review and scheduling architecture

Do not implement the advanced scheduler yet. The first release needs a simple structure that can evolve.

First-stage review states:

| State | Meaning |
|---|---|
| New | The card has not been reviewed yet. |
| Learning | The learner has seen the card but has not shown stable recall. |
| Review | The card is due for normal review. |
| Mastered | The learner has repeatedly answered well enough for the first-stage product. |

Review buttons:

| Button | First-stage meaning | Future scheduler meaning |
|---|---|---|
| Again | Learner missed it or wants to repeat soon. | Increment `wrong_count`, shorten interval, keep or move to Learning. |
| Good | Learner answered acceptably. | Increment `right_count`, schedule normal next review. |
| Easy | Learner answered quickly and confidently. | Increment `right_count`, lengthen interval, possible Mastered after thresholds. |

Future scheduler inputs:

- wrong_count
- right_count
- last_reviewed_at
- next_due_at
- jft_section
- mode
- skill_category
- scenario
- priority_weight

The scheduler can later prioritize exam-relevant weak areas, but the first implementation should keep the state model clean and exportable.

## 10. Progress storage and migration

Progress should be versioned from the next production-oriented PWA iteration. It should support multiple decks/packs even if the first release only ships one free validation pack.

Recommended progress shape for a future issue:

```json
{
  "schema_version": 2,
  "deck_id": "jft_ssw_work_japan",
  "support_language": "id",
  "fallback_language": "en",
  "packs": {
    "stage1b_id_validation": {
      "pack_id": "stage1b_id_validation",
      "cards": {
        "id-stage1b-0001": {
          "card_id": "id-stage1b-0001",
          "state": "new",
          "wrong_count": 0,
          "right_count": 0,
          "last_reviewed_at": null,
          "next_due_at": null,
          "history": []
        }
      }
    }
  },
  "migrations": []
}
```

Required progress fields:

- schema_version
- deck_id
- pack_id
- card_id
- state
- wrong_count
- right_count
- last_reviewed_at
- next_due_at
- history
- future migration

Migration rules:

- Never break existing progress without a migration path.
- Key learner progress by stable card IDs, not array position.
- Store deck and pack IDs so future packs do not collide.
- Keep export/import human-inspectable while the product is in validation.
- Do not implement Google Drive now, but keep IDs, timestamps, and versioning compatible with future sync.

## 11. Audio-ready design

Do not add audio files yet. Audio should be prepared structurally, not operationally.

Future audio metadata:

| Field | Purpose |
|---|---|
| audio.target | Audio file path or asset ID for the Japanese target. |
| audio.example | Audio file path or asset ID for the Japanese example. |
| audio.voice | Voice/source label, such as human speaker or approved generated voice. |
| audio.status | `not_added`, `planned`, `recorded`, `reviewed`, or `released`. |
| audio.needs_recording | Boolean flag for production planning. |
| audio.review_status | Audio quality/review state. |

Listening-ready cards should be written so they can become audio cards later without changing card IDs. The text, mode, scenario, and expected response should already be correct. Audio then becomes an added asset, not a reason to rewrite the card identity.

## 12. Localization design

Stage 1B should be Indonesian-first.

Localization principles:

- Indonesian is the learner-facing support language for Stage 1B.
- English is fallback/reference, not the primary learner language.
- Kana remains important for pronunciation and early reading support.
- Romaji is optional/fadeable.
- Support-language audio is deferred.
- Multilingual expansion is later, not now.

The data model should not lock the product into English-only cards. At the same time, the first release should not attempt a full multilingual system. The immediate goal is a coherent Indonesian validation sample with English fallback.

## 13. Paid version readiness

Do not implement payment now. The architecture should still prepare for future monetization.

Future paid-readiness needs:

| Need | Architecture preparation |
|---|---|
| Locked packs | Pack metadata should include tier and release status. |
| Preview cards | Cards or packs should be able to mark preview availability. |
| Paid starter | 400-600 card starter should be a pack, not a separate app. |
| Full core | Later full core should share the same deck and schema family. |
| Field-specific packs | Field packs should use pack IDs, scenario metadata, and tier metadata. |

GitHub Pages is suitable for the free validation release because the content can be public and easy to test. It is not a secure final paid-content delivery system. Paid content delivery will eventually need a separate access-control and distribution plan after the paid offer is validated.

## 14. Implementation roadmap

| Phase | Goal | Likely files changed | What not to do yet | Success criteria |
|---|---|---|---|---|
| Phase 0: Current documentation and content drafts | Keep strategic docs and Stage 1B drafts organized. | `docs/*`, review CSVs, draft files. | Do not ship draft cards as production app data. | Stage 1B direction is clear and reviewable. |
| Phase 1: Product UX architecture | Define the product, schema, UX, and release architecture before implementation. | `docs/PRODUCT_UX_ARCHITECTURE_AND_RELEASE_PLAN.md`. | Do not modify the PWA or create production JSON. | Future issues have a clear architecture target. |
| Phase 2: schema v2 and deck manifest | Define production card schema and manifest format. | `data/content_schema.v2.json`, deck manifest docs or files, validation scripts if needed. | Do not convert all cards before schema is accepted. | Schema supports all five modes and future packs. |
| Phase 3: Stage 1B JSON conversion | Convert reviewed Stage 1B cards into production JSON. | `data/cards.stage1b.id.sample.json`, possibly validation tooling. | Do not add PWA feature expansion beyond loading valid data. | JSON validates and preserves stable IDs/review metadata. |
| Phase 4: PWA vertical slice for all five card modes | Render all modes correctly in the app. | `index.html`, CSS/JS files if split, service worker only if needed. | Do not add payment/login/audio/Google Drive. | Each mode has a usable mobile front/back flow. |
| Phase 5: UI/UX validation release | Polish first free release and test learner experience. | PWA UI files, release checklist, minimal copy. | Do not build the paid product prematurely. | Learners can complete sessions and provide useful feedback. |
| Phase 6: basic scheduler improvement | Improve due logic while keeping it understandable. | PWA logic and progress migration code. | Do not overbuild advanced exam scoring. | New/Learning/Review/Mastered behaves consistently. |
| Phase 7: paid starter planning | Define the first paid offer and content scope. | Revenue docs, paid starter matrix, pack plan. | Do not implement payment before offer validation. | 400-600 card starter scope is credible and priced/testable. |
| Phase 8: audio rollout | Add audio only after text/card UX has evidence. | Audio metadata, selected assets, audio QA docs. | Do not record every card before demand is proven. | Audio improves learning without breaking card IDs. |
| Phase 9: advanced exam-priority scheduler | Use metadata and user results to prioritize exam/work-life weak spots. | Scheduler logic, analytics model, progress migration. | Do not claim guaranteed exam outcomes. | Scheduler uses JFT section, mode, scenario, and performance signals. |

## 15. Anti-chaos rules

- Do not hardcode a single card file forever.
- Do not mix review drafts and production JSON.
- Do not make tags decorative only.
- Do not add audio before text review quality is accepted.
- Do not add payment before the paid offer is validated.
- Do not build all languages at once.
- Do not break progress without migration.
- Do not copy official JFT, Irodori, textbook, leaked, or paid-source content.
- Do not bury card mode logic inside unrelated UI code.
- Do not make the first release visually disposable.

These rules are meant to keep the project commercially focused while still allowing small, fast validation releases.

## 16. Next recommended issues

- Issue #16: Define schema v2 and deck manifest
- Issue #17: Convert Indonesian Stage 1B cards to JSON
- Issue #18: Build PWA vertical slice for five card modes
- Issue #19: UI/UX validation pass
- Issue #20: Free validation release checklist