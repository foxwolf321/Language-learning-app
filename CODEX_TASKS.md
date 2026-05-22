# CODEX_TASKS.md

This file lists implementation tasks intended for Codex.

## Task 001 — Create market validation data files

### Objective
Create structured market validation files so the project can compare monetization opportunities without relying on chat memory.

### Files to inspect
- `MISSION_CONTROL.md`
- `docs/MONETIZATION_STRATEGY.md`
- `HANDOFF.md`

### Files to create
- `data/market_candidates.csv`
- `data/competitor_research_template.csv`
- `docs/VALIDATION_PLAN.md`

### Requirements
`data/market_candidates.csv` should include columns:
- id
- market
- target_user
- payer
- urgency
- reach_channel
- monetization_model
- competition_level
- build_cost
- legal_risk
- expansion_potential
- score
- notes

Include at least these candidates:
- JFT-Basic + SSW practical Japanese
- Nursing Care Japanese for SSW
- Manufacturing / safety Japanese
- BJT business Japanese
- EJU Japanese for foreign students
- JLPT niche addon, not general JLPT
- Japanese for IT engineers in Japan
- Japanese interview prep for foreign workers

### Acceptance criteria
- CSV is valid UTF-8.
- Each row has a short monetization note.
- `docs/VALIDATION_PLAN.md` explains how to test demand before building a full app.
- Do not invent fake statistics.

### Monetization relevance
This task decides what to build first and prevents wasting time on crowded markets.

---

## Task 002 — Create first 50 sample cards

### Objective
Create original sample cards for the first product wedge: JFT-Basic + SSW practical Japanese.

### Files to inspect
- `data/content_schema.json`
- `MISSION_CONTROL.md`
- `HANDOFF.md`

### Files to create
- `data/cards.sample.json`

### Requirements
Create 50 original cards covering:
- daily life in Japan
- workplace instructions
- safety phrases
- reporting problems
- polite requests
- time/schedule
- basic listening/situation style prompts

Each card must include:
- stable id: `jft-ssw-0001` etc.
- deck
- stage
- target
- reading
- romaji
- meaning.en
- example.ja
- example.reading
- example.en
- question_type
- tags

### Do not do
- Do not copy textbook/example-book sentences.
- Do not copy official exam questions.
- Do not overcomplicate grammar explanations.

### Acceptance criteria
- JSON validates against `data/content_schema.json` or is close enough that schema can be adjusted intentionally.
- All IDs are stable and sequential.
- Content is original.

### Monetization relevance
This becomes the free starter sample and product proof.

---

## Task 003 — Create PWA skeleton

### Objective
Create a minimal PWA that can display cards and track simple progress.

### Files to create
- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `assets/` if needed

### Requirements
- Load `data/cards.sample.json`.
- Show card front/back.
- Buttons: Show answer, Again, Good, Easy, Next.
- Progress summary: New / Review / Mastered.
- Save progress to localStorage.
- Export/import progress JSON.
- Mobile-first layout.
- No heavy framework unless justified.

### Do not do
- Do not implement Google Drive yet.
- Do not build a giant app.
- Do not change strategic documents unless needed.

### Monetization relevance
This is the MVP proof for landing page and user testing.

---

## Task 004 — Create landing page copy

### Objective
Create landing page content for market validation.

### Files to create
- `docs/landing/JFT_SSW_LANDING_COPY.md`
- `docs/landing/NURSING_CARE_JAPANESE_COPY.md`
- `docs/landing/AD_COPY.md`

### Requirements
Include:
- headline
- subheadline
- target user
- problem
- promise without guarantee
- free starter CTA
- paid pack hypothesis
- FAQ
- ad variants for Facebook/YouTube Shorts/TikTok

### Do not do
- Do not claim official endorsement.
- Do not guarantee passing exams.

### Monetization relevance
Tests demand before overbuilding.
