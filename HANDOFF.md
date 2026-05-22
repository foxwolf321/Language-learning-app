# HANDOFF.md — Language-learning-app

## Current goal
語学学習アプリで収益化を実現する。

ユーザーは英単語受験対策カードを作ったが、一般英単語・一般受験英語は市場が大きすぎてアプリストアで埋もれる可能性が高い。したがって、ロングテールでありながら目的達成のために購入する層が存在する語学市場を狙う。

## Strategic decision
最初の商用ターゲットは、**JFT-Basic + 特定技能（SSW）で日本に働きに来る外国人向けの実用日本語**。

### Why
- 語学そのものではなく、在留資格・試験・就職・職場配属に直結する。
- 一般JLPTよりも目的が明確。
- 介護・製造・外食など縦割り追加コンテンツに展開しやすい。
- B2Cだけでなく、日本語学校、登録支援機関、送り出し機関、介護施設へのB2B/B2B2C販売が可能。

## Product name candidates
- Japan Work Japanese
- JFT-SSW Japanese Cards
- Tokutei Ginou Japanese
- Work in Japan Japanese
- JFT Basic Practical Japanese

## MVP direction
PWA + Ankiエクスポート可能なカード学習システム。

### MVP modules
1. JFT-Basic core vocabulary
2. Daily life Japanese for Japan arrival
3. Workplace instruction Japanese
4. Listening cards
5. Situation cards
6. Mini mock-test mode
7. Progress tracking
8. JSON export/import
9. Optional Google Drive save

## First paid vertical
**Nursing Care Japanese / 介護日本語**

Why:
- 特定技能と相性が強い。
- 日本語の実務表現が明確。
- 一般JLPTアプリとの差別化がしやすい。
- 施設・学校・支援機関に売りやすい。

## Second paid vertical
**Manufacturing / workplace safety Japanese**

Topics:
- 安全指示
- 危険表示
- 工場内会話
- 報告・連絡・相談
- 作業手順
- 注意喚起

## Later targets
- BJT / business Japanese
- EJU Japanese reading/listening if there is enough demand
- JLPT only as an SEO funnel, not main product

## Content policy
- Do not copy proprietary book lists, examples, mock questions, or paid exam prep material.
- Use official public exam structures only as reference.
- Create original sentences and original audio scripts.
- Keep card IDs stable.

## Repository principle
The repo must prevent AI amnesia.

AI/Codex should never rely only on chat memory. It must read:
- `AGENTS.md`
- `HANDOFF.md`
- `DECISIONS.md`
- `TODO.md`
- `CHANGELOG.md`
- `NEXT_SESSION_PROMPT.md`

## Storage and sync principle
For user progress:
- LocalStorage first
- JSON export/import second
- Google Drive `appDataFolder` optional third
- Version-separated progress filenames

Example:
- `jft-ssw-japanese-progress-v1.json`
- `jft-ssw-japanese-local-v1`

## Immediate next work
1. Build content schema.
2. Create first 50 sample cards.
3. Decide languages for explanations: English first, then Bengali/Nepali/Indonesian/Burmese/Vietnamese.
4. Create PWA skeleton.
5. Create Anki export pipeline.
6. Create landing page and SEO copy.

## Current repo status
Initial repo created by user under:
`foxwolf321/Language-learning-app`

`AGENTS.md` created by assistant after GitHub permission was fixed.
