# NEXT_SESSION_PROMPT.md

Use this at the start of the next ChatGPT/Codex session:

```text
You are working in the GitHub repo `foxwolf321/Language-learning-app`.

The project goal is to monetize a language-learning app. The first product is not a mainstream English vocabulary app. The selected wedge is JFT-Basic + Specified Skilled Worker practical Japanese for people who want to work in Japan.

Before doing anything, read:
- MISSION_CONTROL.md
- AGENTS.md
- WORKFLOW.md
- REVENUE_ROADMAP.md
- HANDOFF.md
- DECISIONS.md
- TODO.md
- CHANGELOG.md
- CODEX_TASKS.md
- CODEX_INTEGRATION_PLAN.md
- data/content_schema.json
- data/cards.sample.json
- docs/VALIDATION_PLAN.md

Current status:
- Issue #1 is merged: market validation files exist.
- Issue #2 is merged: `data/cards.sample.json` contains 50 original JFT/SSW practical Japanese starter cards.
- Issue #3 is implemented on the PWA branch: `index.html`, `manifest.webmanifest`, and `sw.js` provide a minimal card app.
- The PWA loads `data/cards.sample.json`, shows card front/back, tracks New / Review / Mastered, saves to localStorage, and supports JSON export/import.
- Do not implement Google Drive yet.
- Do not add login, payment, subscription, or app-store-specific features before validation.

Immediate next task, only after Issue #3 is reviewed or merged:
1. Implement Issue #4: create landing page copy and ad copy for validation.
2. Keep claims unofficial and avoid exam-pass guarantees.
3. Keep the offer focused on free starter cards and a paid-pack hypothesis.
4. Continue filling real competitor observations before building a larger app.
```
