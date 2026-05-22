# AGENTS.md — 語学学習アプリ収益化プロジェクト

## Mission
このrepoの目的は、語学学習アプリで収益化を実現すること。
最初の商用ターゲットは、一般英単語や一般JLPTではなく、**JFT-Basic + 特定技能（SSW）で日本に働きに来る人向けの実用日本語**。

## Mandatory startup procedure
Every AI/Codex session MUST read these files first:

1. `AGENTS.md`
2. `HANDOFF.md`
3. `DECISIONS.md`
4. `TODO.md`
5. `CHANGELOG.md`
6. `NEXT_SESSION_PROMPT.md`

Do not start coding before reading them.

## Source of truth
- Master content: CSV / JSON / templates / media_manifest
- Generated output: `.apkg`, `build/`, `dist/`, packaged app files
- Do not treat generated `.apkg` as the source of truth.

## Non-negotiable rules
1. Do not redesign UI from memory.
2. If a button/layout regresses, restore from Git history/tag/snapshot first.
3. Do not guess the old state. Inspect the old file or restore the known baseline.
4. Keep progress backup separate per app/version.
5. Use Google Drive `appDataFolder` for app progress JSON if Drive sync is implemented.
6. Keep all card IDs stable.
7. Do not copy copyrighted exam/book content. Create original examples and cite official public structures only.
8. The monetization goal is not optional; product decisions must be judged against paid demand.

## Product wedge
Lead product:

**Japan Work Japanese / JFT-SSW 日本語カード**

Initial segments:
- JFT-Basic starter
- SSW practical Japanese
- First paid vertical: Nursing Care Japanese
- Second paid vertical: Manufacturing / workplace safety Japanese
- Later: BJT / business Japanese, EJU if justified

## End-of-session procedure
Before stopping, update:
- `HANDOFF.md`
- `TODO.md`
- `CHANGELOG.md`
- `NEXT_SESSION_PROMPT.md`
