# WORKFLOW.md — ChatGPT × Codex 役割分担

## Prime objective
最終目的は、語学学習アプリで収益化を実現すること。

このrepoでは、ChatGPTとCodexを以下の役割で分ける。

## Role split

### ChatGPT: Strategy / Product Director
ChatGPTは以下を担当する。

- 市場選定
- 収益化仮説
- ターゲット設定
- 価格・販売導線
- 宣伝・SEO・広告文
- 法務/規約/人間側作業の洗い出し
- Codexに渡す仕様整理
- 作業後のレビュー方針
- GitHub上のHandoff/TODO/Decision更新

### Codex: Builder / Implementation Engineer
Codexは以下を担当する。

- repo内のファイル作成・編集
- PWA実装
- データスキーマ整備
- サンプルカード作成
- UI/UX実装
- JSON export/import
- Anki出力パイプライン
- テスト・静的チェック
- GitHub Issues単位の実装

### Human: Owner / Permission / Real-world execution
ユーザーは以下を担当する。

- GitHub / Google Cloud / Play Console / App Store / 決済サービスの許可
- 法律・税務・商標等の最終確認
- 実際の公開判断
- 現地コミュニティ・学校・法人への問い合わせ
- 支払い・販売者情報・本人確認

## Recommended workflow

1. ChatGPTが市場・収益化仮説を更新する。
2. ChatGPTがCodex用のIssueを作る。
3. CodexはIssueを1つずつ実装する。
4. CodexはPRまたはcommitで変更を残す。
5. ChatGPTが変更をレビューし、収益化目的に合うか判断する。
6. 必要ならChatGPTが方針修正し、次Issueを作る。
7. セッション終了時は必ずHandoff系ファイルを更新する。

## Session start protocol
Every AI/Codex session must read these files first:

1. `MISSION_CONTROL.md`
2. `AGENTS.md`
3. `HANDOFF.md`
4. `DECISIONS.md`
5. `TODO.md`
6. `CHANGELOG.md`
7. `WORKFLOW.md`

## Codex issue protocol
Each Codex task should include:

- Objective
- Files to inspect
- Files to create/change
- Acceptance criteria
- Do-not-do list
- Monetization relevance

## Review principle
A change is good only if it helps at least one of these:

- Faster validation
- Stronger paid demand
- Better retention
- Better conversion
- Better distribution
- Lower maintenance cost
- Lower legal/content risk

A beautiful app that does not improve monetization is not enough.
