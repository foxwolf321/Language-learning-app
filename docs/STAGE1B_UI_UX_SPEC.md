# STAGE1B_UI_UX_SPEC.md

Last updated: 2026-05-26

## 1. Purpose

Stage 1B should validate card UX, not only card content.

The product thesis is a monetization-first practical Japanese card app for JFT-Basic / SSW / Work-in-Japan preparation, initially for Indonesian learners with English fallback. The first release must show whether learners can study the Stage 1B cards comfortably on a phone, understand the five card modes, trust the exam/work-life positioning, and imagine paying for a broader starter pack later.

This specification is documentation only. It does not implement the PWA, change `index.html`, add audio, add payment, add login, add Google Drive, create app-store behavior, or create final background assets.

## 2. Product UX Principle

The app should feel:

- serious enough to trust
- practical enough for Japan life/work
- simple enough for mobile daily study
- warm enough that learners return

The first release should not feel like a generic flashcard demo. It should feel like a focused, early but credible tool for Indonesian learners preparing for JFT-Basic / SSW and practical work/life situations in Japan.

Design implications:

- The learning card is the main product surface.
- The interface should reduce anxiety, not add complexity.
- Indonesian support should feel intentionally designed, not bolted on.
- English fallback should help review and mixed-language support, but should not dominate.
- Metadata should support trust and filtering without making the card feel like a database record.

## 3. First-Release Navigation

The first release should use a small navigation model. It can be implemented as bottom tabs, top tabs, or a compact mobile nav, but the conceptual sections should remain stable.

| Navigation | Required for validation? | First-release role | Minimum acceptable scope |
|---|---|---|---|
| Learn | Required | Main study entry for new cards and broad practice. | Load Stage 1B pack, show one card at a time, render all five modes. |
| Review | Required | Practice cards that have been seen or are due. | Can share the Learn card renderer; should support New / Learning / Review / Mastered states. |
| Browse | Minimal but recommended | QA, learner trust, and content inspection. | Search/filter enough to inspect mode, scenario, and JFT section. |
| Progress | Required | Basic sense of momentum and retention. | Simple counts or a small bar/ring for New / Learning / Review / Mastered. |
| About / Exam Alignment | Minimal but recommended | Explain why this is JFT-Basic / SSW / Work-in-Japan preparation, not a generic deck. | Short positioning, source discipline, Indonesian support, and no guarantee claims. |

Learn and Review are the core validation surfaces. Browse, Progress, and About can be simple, but they should exist because they help learners and reviewers understand the product's focus.

## 4. Primary Study Flow

Recommended first-release flow:

1. Open Learn or Review.
2. See the card front.
3. Press Show answer.
4. See the card back.
5. Press Again, Good, or Easy.
6. Move to the next card.

Prefer a clear Show answer button over tap-to-flip for the first release. A visible button reduces accidental flips, is easier for first-time users to understand, and makes validation feedback cleaner. Tap-to-flip can be tested later after baseline mode rendering is stable.

The flow should be fast. A learner should not need to open menus, interpret too many labels, or scroll past internal metadata to complete one review.

## 5. Mobile-First Interaction Rules

The first release should be designed for one-handed smartphone study.

Rules:

- Put primary review controls near the bottom of the screen.
- Use large touch targets for Show answer, Again, Good, Easy, and Next if Next remains separate.
- Keep navigation predictable across Learn, Review, Browse, and Progress.
- Avoid screen overload; show only the fields needed for the current mode.
- Keep the card area visually stable if possible so answer reveal does not create a disorienting jump.
- Do not rely on hover behavior.
- Avoid tiny badges, dense tables, and long text blocks inside the main card surface.
- Keep information-search mini cards readable without requiring pinch zoom.
- Make the first visible action obvious.

If a card is long, the study surface may scroll, but the main action buttons should remain easy to reach.

## 6. Language Hierarchy

Language hierarchy is part of the product strategy.

| Language / script | UX role | Visibility rule |
|---|---|---|
| Japanese | Primary learning focus. | Largest or most visually important text, except on production prompts where Indonesian prompt leads the front. |
| Kana | Important support for pronunciation and early reading. | Visible and clearly connected to the Japanese target. |
| Indonesian | Primary learner support language. | Meaning, prompts, and task questions should appear before English. |
| English | Fallback / secondary reference. | Smaller or visually secondary. English must not dominate the card. |
| Romaji | Optional / fadeable / setting-controlled. | Smaller than kana, hidden or deemphasized by default if the UI needs more space. |

English must not dominate. Romaji must not be visually dominant by default.

For Stage 1B, Indonesian should feel like the learner-facing support layer. English exists for fallback, reviewer clarity, and learners who benefit from it, but the product should not read as English-first.

## 7. Card Layout By Mode

Schema v2 defines five modes:

- `recognition`
- `production`
- `kanji_sign_reading`
- `listening_ready`
- `information_search_mini`

The PWA should render these as distinct learning tasks. Do not force all modes into one vocabulary-card template.

### Recognition

| Area | Fields / behavior |
|---|---|
| Front fields | `target` as large Japanese text; `reading`; optional `romaji`; subtle JFT/scenario badge. |
| Back fields | `meaning.id` first; `meaning.en` second; `example.ja`; optional example support; `usage_note` if short. |
| Visual emphasis | Japanese target on front; Indonesian meaning on back. |
| Optional fields | Romaji, small mode badge, short scenario badge. |
| Hidden/internal fields | `priority_weight`, `paid_pack_potential`, `review_status`, `source_note`, detailed tags. |
| Learner task | Recognize the Japanese and recall the Indonesian/English meaning. |

### Production

| Area | Fields / behavior |
|---|---|
| Front fields | `prompt.id` as the main situation prompt; `prompt.en` as smaller fallback; optional scenario badge. |
| Back fields | `expected_answer.ja` or `target`; `reading`; `meaning.id`; `meaning.en`; short `usage_note`. |
| Visual emphasis | The Indonesian situation prompt first, then the Japanese answer after Show answer. |
| Optional fields | Romaji, `example.ja`, compact mode badge. |
| Hidden/internal fields | Internal tags, priority, paid-pack metadata, source note, review status. |
| Learner task | Produce or mentally rehearse the Japanese phrase for the situation. |

Production cards should feel like practical workplace/life output practice, not abstract grammar drills.

### Kanji / Sign Reading

| Area | Fields / behavior |
|---|---|
| Front fields | `target` as sign/kanji text, large and centered or strongly emphasized. |
| Back fields | `reading`; `meaning.id`; `meaning.en`; `example.ja`; short usage note. |
| Visual emphasis | Fast visual recognition of the sign or kanji. |
| Optional fields | Romaji if enabled, small scenario badge such as safety, public place, or workplace. |
| Hidden/internal fields | Detailed source notes, paid-pack potential, priority weight, long tags. |
| Learner task | Read the sign/kanji and understand what action or meaning it implies. |

These cards should feel closer to sign literacy than normal word cards.

### Listening-Ready

| Area | Fields / behavior |
|---|---|
| Front fields | For now, show the Japanese listening-ready text or a simple listening-task label; later place audio control at the top. |
| Back fields | Japanese text if hidden initially; `reading`; `meaning.id`; `meaning.en`; usage note. |
| Visual emphasis | This mode is prepared for audio, but no broken or fake audio control should appear. |
| Optional fields | Romaji if enabled, scenario badge, future audio status if useful for QA only. |
| Hidden/internal fields | Audio file paths when null, `audio.needs_recording`, review status, internal tags. |
| Learner task | Practice understanding a short spoken-style sentence or instruction; later listen first, then check text/meaning. |

For the first release, Listening-ready cards are text-only. The UI should make them feel audio-ready without pretending audio exists.

### Information-Search Mini

Information-search mini cards need a distinct layout. Do not treat them like normal vocabulary cards.

| Area | Fields / behavior |
|---|---|
| Front fields | Notice/table/message area using `target`; learner question area using `prompt.id`; English fallback task using `prompt.en` smaller. |
| Back fields | Expected answer area using `expected_answer`; relevant meaning/support; short usage note. |
| Visual emphasis | The learner question and the expected answer. The notice/table should be readable but not decorative. |
| Optional fields | Reading, romaji only if enabled, small Reading/Information badge. |
| Hidden/internal fields | Priority, paid-pack potential, review status, source note, full tag list. |
| Learner task | Find a specific answer from a short notice/table/message. |

Recommended structure:

| Surface | Block | Purpose |
|---|---|---|
| Front | Notice/table/message area | Shows the information source. |
| Front | Learner question area | Tells the learner exactly what to find in Indonesian. |
| Front | English fallback question | Helps as secondary reference only. |
| Back | Expected answer area | Shows the answer clearly. |
| Back | Short usage note | Explains why this reading task matters. |

These cards are especially important for JFT reading and real-life notices. Their layout should be tested carefully on small screens.

## 8. UI Component Inventory

The next implementation issue should expect these components or equivalent sections:

| Component | Purpose |
|---|---|
| App shell | Overall mobile-first page structure and safe spacing. |
| Header | Product title, short positioning, current pack indicator. |
| Navigation/tabs | Learn, Review, Browse, Progress, About / Exam Alignment. |
| Card shell | Stable study surface around front/back content. |
| Front face | Mode-specific prompt or Japanese target. |
| Back face | Answer, meaning, support text, example, and note. |
| Show answer button | Explicit answer reveal action. |
| Again / Good / Easy buttons | Review grading controls. |
| Language support block | Indonesian primary support with English fallback secondary. |
| Badge block | Minimal JFT section, scenario, and/or mode badges. |
| Progress summary | New / Learning / Review / Mastered counts or visual summary. |
| Settings entry | Compact access to display preferences. |
| Theme selector | Select among approved visual themes. |
| Browse list row | Inspect card ID, mode, scenario, JFT section, and short target/prompt. |

This inventory does not require a component framework. It is a product structure checklist for the next PWA implementation.

## 9. Typography And Spacing Policy

No exact CSS is required in this document, but the implementation should follow this hierarchy:

- Japanese target is largest.
- Kana is medium and close to the Japanese text it supports.
- Indonesian is clearly readable and primary on answer/support blocks.
- English is smaller or secondary.
- Romaji is smaller than kana and should not compete with Japanese.
- Avoid text walls.
- Keep enough padding and line spacing for phone reading.
- Use stable spacing between front content, answer content, and review buttons.
- Keep information-search notice/table text compact but readable.
- Avoid font sizes that require learners to zoom.

For production cards, the Indonesian prompt can be the largest front-side text because the task begins from the learner's situation. The Japanese answer should become visually dominant on the back.

## 10. Badge / Tag Visibility Policy

Learners may benefit from a small amount of metadata because it reinforces exam/work-life positioning. Too much metadata will make the app feel unfinished.

Metadata that may be shown:

- small JFT section badge
- small scenario/domain badge
- mode badge, mainly in Browse or subtle on card

Keep internal metadata hidden:

- `priority_weight`
- `paid_pack_potential`
- `review_status`
- `source_note`
- detailed internal tags
- raw audio status, except possibly in internal QA views

Badge text should be short and human-readable. For example, `Reading`, `Workplace`, `Safety`, or `Production` is better than raw snake_case on the learner card.

## 11. Review Controls

First-release controls:

| Control | Learner meaning | First-release behavior |
|---|---|---|
| Show answer | Reveal the back of the current card. | Shows answer/support fields and enables grading. |
| Again | I missed this or want to see it again soon. | Move or keep the card in Learning/Review; increment wrong count in future scheduler. |
| Good | I got this well enough. | Move toward Review; increment right count in future scheduler. |
| Easy | This felt easy. | Move toward Mastered after simple threshold logic; longer interval later. |

The labels can remain English for the first implementation if the app UI language has not been localized yet, but the product should eventually consider Indonesian UI labels or bilingual tooltips if feedback shows friction.

## 12. Browse And Progress

### Browse

Browse should be searchable/filterable enough for QA and learner trust.

Minimum useful filters/checks:

- mode
- scenario/domain
- JFT section
- card ID
- text search across Japanese, Indonesian, and English fallback if feasible

Browse does not need to be a full deck editor. It should help reviewers see that the pack covers JFT/SSW domains and help learners find cards they remember.

### Progress

Progress should show:

- New
- Learning
- Review
- Mastered

Simple counts are enough for the first release. A simple bar or ring is acceptable if it does not distract from study. Progress should reinforce habit and confidence, not become a complex analytics dashboard.

## 13. Settings / Toggles

First-release settings should be minimal:

- show/hide romaji
- theme selection
- maybe show/hide English fallback
- maybe compact/normal display

Do not overbuild settings. The first release should validate the study surface, not become a preferences project.

Recommended defaults:

| Setting | Default | Reason |
|---|---|---|
| Romaji | On or lightly visible for validation, with easy hide option. | Early learners may need it; feedback can decide if it should fade earlier. |
| English fallback | On but visually secondary. | Helps QA and learners who benefit from English, but should not dominate. |
| Theme | Japan Daily Life. | Supports practical life-in-Japan positioning. |
| Display density | Normal. | Better readability for first-time mobile validation. |

## 14. UX Validation Checklist

Use this checklist during the Stage 1B vertical-slice review:

- Is Japanese readable on a phone?
- Is kana clearly connected to the Japanese target?
- Is Indonesian support clear and primary?
- Is English fallback useful but not noisy?
- Is romaji helpful without dominating?
- Are Show answer, Again, Good, and Easy reachable by thumb?
- Is the study flow fast?
- Do production cards feel useful for real work/life situations?
- Are information-search mini cards readable and clearly task-based?
- Can a reviewer inspect mode, scenario, and JFT section in Browse?
- Does Progress make the learner feel oriented without clutter?
- Does the app feel like a serious practical-Japanese tool for JFT-Basic / SSW / Work-in-Japan preparation?
- Would this free sample make a learner or organization more likely to consider a paid starter pack?

If the answer to the last two questions is weak, UI polish should be tied back to positioning and monetization instead of becoming generic visual decoration.
