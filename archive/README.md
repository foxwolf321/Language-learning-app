# Archive

Last updated: 2026-06-03

This directory is for historical project files that should not guide current work unless explicitly restored.

## Purpose

The repository contains older strategy documents and prototype app files from earlier phases. They may still be useful for history, but they can mislead future work because the project direction has changed.

Current source-of-truth files:

- `docs/CURRENT_PROJECT_STATE.md`
- `docs/CARD_MASTER_2500_HANDOFF.md`

Read those before relying on any archived material.

## Current archive rule

Do not delete old files immediately.

Use this process:

1. Identify files that appear outdated.
2. Confirm they do not contain current source-of-truth information.
3. Move them into `archive/` with their path or context preserved where practical.
4. Leave a short note in this README or an archive manifest explaining why each file was archived.
5. Do not move current app/runtime files casually.

## Files that must not be moved casually

Do not archive or relocate these without a specific app-maintenance decision:

- `app-v35-unified-study.html`
- `spacedRepetitionEngine.js`
- `data/`
- `index.html`
- `app-latest.html`
- `sw.js`

## Archive candidates to review

The following categories should be reviewed before moving anything:

### Older strategy documents

Potentially outdated documents include those centered on:

- 60-card validation as the main product plan
- 400-600 card starter as the main product plan
- 1,000-1,500 card full-core as the main product plan
- app-completion-first thinking rather than monetization-validation-first thinking

These should be archived only after checking whether any still-current policy has been migrated into `docs/CURRENT_PROJECT_STATE.md` or `docs/CARD_MASTER_2500_HANDOFF.md`.

### Older prototype app files

Potential candidates include older app versions before v35, especially files that are no longer linked as the current UI. However, old app files may still be useful for rollback or design comparison, so move them only after listing them in an archive plan.

### Old SRS documents / PR references

SRS v1 and PR #38-related material should be treated as historical/frozen unless deliberately reopened.

Current safe wording:

- `spacedRepetitionEngine.js` is a retention-model v1 prototype under evidence-gate review.
- FSRS / `ts-fsrs` is a leading candidate, not a confirmed final engine.
- Do not describe any V2 learning engine as formally adopted until the repository says so.

## Proposed archive migration plan

Before moving files, create a review list with columns like:

```tsv
path	category	current_status	reason_to_archive	risk_if_moved	recommended_destination	human_decision
```

Recommended statuses:

- `keep_current`
- `archive_candidate`
- `historical_reference`
- `do_not_move_runtime`
- `needs_human_decision`

Recommended destinations:

- `archive/docs/`
- `archive/prototypes/`
- `archive/srs/`
- `archive/old-data/`

## Important caution

Archiving is for reducing confusion, not erasing history. If a file is moved, keep its content recoverable in Git history and document why it moved.
