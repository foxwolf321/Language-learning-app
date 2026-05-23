# NEXT_EXECUTION_PLAN.md — Immediate execution order

Last checked: 2026-05-23

## Primary goal

Move toward monetization by building a JFT-Basic / SSW exam-aligned Indonesian validation product.

Do not drift into generic app building.

## Current strategic position

The current thesis is:

> Start with Indonesian + English fallback because Indonesia has the largest JFT-Basic examinee volume and Indonesian localization is relatively practical for Stage 1B.

The next bottleneck is not app code. It is card content quality.

## Immediate execution order

### Step 1 — Finish exam content blueprint

Use Issue #13:

- `Task 008: Build exam-aligned content blueprint from public sources`

Output:

- `docs/EXAM_CONTENT_BLUEPRINT.md`

Purpose:

- Understand JFT-Basic sections, likely high-value domains, and card-type mapping.
- Prevent the product from becoming a vague practical Japanese app.
- Create the basis for exam-relevant card writing.

Do not create cards yet.

### Step 2 — Draft Indonesian Stage 1B content

Use Issue #14:

- `Task 009: Design Indonesian Stage 1B content matrix and draft original cards`

Output:

- `docs/INDONESIAN_STAGE_1B_CONTENT_MATRIX.md`
- `docs/INDONESIAN_STAGE_1B_CARD_DRAFTS.md`
- optionally `data/cards.stage1b.id.sample.json`

Purpose:

- Create the actual 60-card validation sample.
- Every card must map to JFT/SSW relevance.
- Include Indonesian support and English fallback.
- Mark Indonesian translations as draft / needs human review.

### Step 3 — Human/product review before app implementation

Before changing the PWA, review the 60 draft cards for:

- Japanese naturalness
- exam relevance
- SSW work/life relevance
- card mode clarity
- Indonesian translation risk
- English fallback clarity
- whether the sample feels worth expanding into a paid pack

The owner’s Japanese-native judgment is especially important here.

### Step 4 — Stage 1B PWA implementation

Only after card content is acceptable, create a new implementation task.

Likely output:

- add Indonesian + English fallback support
- hide reading help appropriately
- label the app clearly as JFT-Basic / SSW preparation
- use the Stage 1B sample data
- keep audio absent or limited to a tiny proof sample

Do not add payment, login, Google Drive, or all-language support yet.

### Step 5 — Landing and offer copy

After the Stage 1B product shape is visible, write landing page and outreach copy around:

- JFT-Basic preparation
- SSW / Work-in-Japan practical Japanese
- Indonesian support
- English fallback
- free sample
- paid full pack / waitlist hypothesis

### Step 6 — Validation outreach

Test with:

- Indonesian learners preparing for JFT-Basic / SSW
- Japanese language schools
- sending organizations
- registered support organizations
- employers / facilities if accessible

Collect:

- usage interest
- preferred language support
- willingness to pay
- paid pack interest
- audio interest
- institution pilot interest

## Stop conditions

Stop or pivot if:

- learners do not understand the product positioning
- users say the cards do not feel exam-relevant
- Indonesian support does not increase trust or comprehension
- no reachable channel exists for Indonesian learners/institutions
- the content feels like generic Japanese rather than JFT/SSW preparation

## What to avoid now

Do not:

- make 1,000+ cards before validating 60 strong cards
- add all languages
- add full audio
- polish UI for aesthetics alone
- build payment before offer validation
- copy official or textbook materials
- ignore exam alignment

## Next Codex prompt

Use this first:

```text
Open GitHub repo `foxwolf321/Language-learning-app`.

Read:
- docs/REVENUE_FIRST_OPERATING_RULES.md
- docs/STRATEGIC_CONSULTING_MODE.md
- docs/EXAM_RELEVANCE_GATE.md
- docs/EXAM_ALIGNED_CONTENT_POLICY.md
- docs/CONTENT_SOURCE_STRATEGY.md
- docs/IRODORI_JFT_RELATIONSHIP.md
- docs/TARGET_SEGMENTS.md
- docs/JFT_BASIC_EXAMINEE_DISTRIBUTION.md
- docs/BRIDGE_LANGUAGE_POLICY.md
- docs/CARD_COUNT_STRATEGY.md
- docs/AUDIO_ROLLOUT_AND_COST_GATE.md
- data/cards.sample.json

Then implement Issue #13:
Task 008: Build exam-aligned content blueprint from public sources.

Create:
- docs/EXAM_CONTENT_BLUEPRINT.md

Use current public sources only.
Do not copy official questions, Irodori text, textbooks, recalled questions, or audio scripts.
Do not add cards yet.
Do not modify the PWA.
The goal is to produce the blueprint for Indonesian Stage 1B card writing.
Open a PR when done.
```
