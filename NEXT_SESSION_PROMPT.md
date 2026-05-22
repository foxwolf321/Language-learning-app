# NEXT_SESSION_PROMPT.md

Use this at the start of the next ChatGPT/Codex session:

```text
You are working in the GitHub repo `foxwolf321/Language-learning-app`.

The project goal is to monetize a language-learning app. The first product is not a mainstream English vocabulary app. The selected wedge is JFT-Basic + Specified Skilled Worker practical Japanese for people who want to work in Japan.

Before doing anything, read:
- MISSION_CONTROL.md
- AGENTS.md
- WORKFLOW.md
- HANDOFF.md
- DECISIONS.md
- TODO.md
- CHANGELOG.md
- CODEX_TASKS.md
- CODEX_INTEGRATION_PLAN.md
- data/content_schema.json
- data/cards.sample.json
- docs/MONETIZATION_STRATEGY.md
- docs/VALIDATION_PLAN.md

Current status:
- Issue #1 is merged: market validation files exist.
- Issue #2 is implemented on the sample-card branch: `data/cards.sample.json` contains 50 original JFT/SSW practical Japanese starter cards.
- `data/content_schema.json` currently defines a single card object. `data/cards.sample.json` is an array of cards; each card follows the schema fields.
- Do not copy copyrighted textbook or exam-prep content.
- Do not claim official endorsement or guarantee exam success.

Immediate next task, only after Issue #2 is reviewed or merged:
1. Implement Issue #3: create a minimal PWA skeleton that loads `data/cards.sample.json`.
2. Keep the app simple: card front/back, Show answer, Again, Good, Easy, Next, and simple progress summary.
3. Save progress to localStorage and allow JSON export/import if included in the issue scope.
4. Do not implement Google Drive yet.
5. Do not build a giant app before validation evidence is recorded.
```
