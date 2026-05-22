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
- docs/MONETIZATION_STRATEGY.md
- docs/VALIDATION_PLAN.md

Current status:
- Issue #1 is implemented on the market validation branch.
- Do not treat `data/market_candidates.csv` scores as real market statistics.
- Do not start a large app build until validation evidence is recorded.

Immediate next task, only after Issue #1 is reviewed or merged:
1. Implement Issue #2: create `data/cards.sample.json` with 50 original sample cards for JFT/SSW practical Japanese.
2. Check or adjust `data/content_schema.json` only if needed for those cards.
3. Keep the app/design simple: PWA first, Anki export later.
4. Do not copy copyrighted textbook or exam-prep content.
5. Keep all card IDs stable.
```
