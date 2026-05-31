# Language-learning-app

## Evidence-inspired scheduling

This project contains a card-based study app for JFT-Basic / SSW / Work-in-Japan practical Japanese.

The current scheduler is an **experimental spaced-repetition scheduler** inspired by established memory principles: active recall, spaced practice, and adaptive review intervals. It stores per-card review state and schedules future reviews based on response quality.

The current v1 engine uses a transparent retention-curve model:

```text
R = exp(-elapsedDays / stabilityDays)
targetRetention = 0.90
nextIntervalDays = -stabilityDays * ln(targetRetention)
```

This is a prototype under evidence-gate review. It should be calibrated with real learner review data before paid release.

Safe product wording:

> This app uses an experimental spaced-repetition scheduler inspired by established memory principles. It adapts review intervals based on how well you remember each card. The current version is a prototype and will be calibrated with real learner data before commercial release.

Avoid claims such as:

- Scientifically proven engine.
- FSRS-equivalent.
- MEMORIZE implementation.
- Guaranteed retention.
- Based on Anki's engine.

See `docs/STUDY_ENGINE_V1_RETENTION_SPEC.md` for the current retention model.
