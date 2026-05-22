# CODEX_INTEGRATION_PLAN.md — ChatGPT × Codex integration plan

## Goal
ChatGPT and Codex should work together as an efficient monetization-first team.

## Current practical architecture

```text
ChatGPT
  ↓ strategy / specs / GitHub Issues
GitHub repo: foxwolf321/Language-learning-app
  ↓ issues / PRs / AGENTS.md / handoff docs
Codex
  ↓ implementation / tests / PRs / fixes
GitHub repo
  ↓ review
ChatGPT + Human
```

## Recommended integration level

### Level 1 — Now: GitHub Issue handoff
ChatGPT creates:
- strategy files
- handoff files
- GitHub Issues
- acceptance criteria

Codex reads the issue and implements.

This is already active.

### Level 2 — Better: Codex GitHub PR workflow
Enable Codex Cloud and GitHub code review for this repository.

Then use PR comments:
- `@codex review`
- `@codex fix the P1 issue`
- `@codex fix the CI failures`

Codex can review pull requests and, where allowed, push fixes back to the branch.

### Level 3 — Stronger: Automatic Codex reviews
Turn on automatic Codex reviews for this repository so every PR receives a Codex review.

### Level 4 — Recurring Codex automations
Use Codex Automations for recurring tasks:
- weekly market validation report
- check open Issues and propose next implementation
- review repo docs for stale TODOs
- check PR status and fix review feedback

Use worktrees when possible to isolate automation changes from local work.

### Level 5 — Later: GitHub Actions / Codex SDK / MCP
For stronger automation, consider:
- GitHub Actions to trigger checks and validation
- Codex SDK for programmatic workflows
- MCP integration if custom tools are needed

Do not start here. Use Level 1–3 first.

## Human setup required
The human owner may need to enable:
- Codex Cloud for `foxwolf321/Language-learning-app`
- Codex code review in Codex settings
- GitHub App permissions for Codex
- Automatic reviews if desired
- Codex Automations in the Codex app

## Operating rule
ChatGPT should not ask Codex to build vague things.
Every task must include:
- objective
- files to read
- files to change
- acceptance criteria
- do-not-do list
- monetization relevance

## Recommended first Codex run
Ask Codex:

```text
Open GitHub repo `foxwolf321/Language-learning-app`.
Read MISSION_CONTROL.md, AGENTS.md, WORKFLOW.md, HANDOFF.md, DECISIONS.md, TODO.md, CHANGELOG.md, CODEX_TASKS.md, and CODEX_INTEGRATION_PLAN.md.
Then implement Issue #1. Do not start Issue #2 until Issue #1 is complete.
After implementation, summarize changed files and remaining risks.
```

## Safety
Do not allow fully unattended destructive changes until the repo has tests and a stable workflow.
Prefer PRs over direct pushes once code exists.
