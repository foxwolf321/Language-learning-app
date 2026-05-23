# AUDIO_ROLLOUT_AND_COST_GATE.md — Audio as paid differentiator, not early bloat

Last checked: 2026-05-23

## Principle

Audio can become a major differentiator for JFT-Basic / SSW practical Japanese, especially for listening, workplace instructions, and pronunciation.

However, audio should not be fully produced before paid-demand evidence.

The product should treat audio as:

> a staged paid-value layer, not a default early feature.

## Why audio matters

For JFT-Basic / SSW learners, audio can support:

- Listening Comprehension preparation
- recognition of workplace instructions
- pronunciation and rhythm
- faster phrase association
- confidence before working in Japan
- perceived product quality
- paid-pack differentiation

Audio is more important here than in a purely reading-focused deck because JFT-Basic includes listening and SSW work-life Japanese requires hearing real instructions.

## Why audio should be staged

Audio introduces costs and risks:

- voice generation or recording cost
- editing and file management
- quality control
- storage and bandwidth
- app loading/performance
- licensing/usage rights
- later re-recording if text changes
- large multiplication if multiple support languages are voiced

Digital cards can scale cheaply as text, but audio scales less cheaply.

## Recommended rollout

### Stage 1A — technical sample

- No audio required.
- Focus on PWA, card flow, local save, export/import.

### Stage 1B — Indonesian validation sample

- No full audio requirement.
- Optionally include 3-5 high-quality Japanese phrase audio samples as proof of future value.
- Do not add support-language audio.
- Do not use poor robotic audio if it reduces trust.

### Stage 2 — first paid starter

- Add Japanese target phrase audio for selected high-value cards.
- Prioritize:
  - listening-ready cards
  - workplace instructions
  - conversation expressions
  - pronunciation-sensitive phrases
- Example target: 100-200 Japanese audio clips, not every card.

### Stage 3 — full core

- Add Japanese audio broadly across high-value phrases and listening tasks.
- Example target: 500-900 Japanese audio clips depending on card design.
- Keep Japanese audio reusable across all countries/languages.

### Stage 4 — localized premium

- Consider support-language audio only if:
  - a country/language lane has proven paid demand
  - users explicitly request it
  - the cost can be covered by pricing
  - the translation is human-reviewed

## Audio priority order

1. Japanese target phrase audio
2. Japanese example sentence audio
3. Japanese mini-dialogue / instruction audio
4. Support-language explanation audio
5. Support-language prompt audio

Support-language text + English fallback should come before support-language audio.

## Cost gate

Before producing large-scale audio, require at least one of:

- waitlist or signup signal for a paid pack
- learner interviews showing audio is a strong purchase reason
- school/agency/employer pilot interest
- pre-order/payment signal
- clear evidence that audio improves perceived value in sample testing

Do not produce hundreds of clips only because audio sounds attractive.

## Pricing implication

Audio should be tied to paid value:

- Free sample: limited or no audio
- Paid starter: selected Japanese audio
- Full core: broader Japanese audio
- Premium/field pack: role-specific listening practice
- Localized premium: support-language audio only if justified

## File strategy

When audio is added, use a structure that keeps it manageable:

```text
audio/
  ja/
    target/
    example/
    listening/
  id/
    optional_later/
```

Card data should refer to audio paths but allow null values:

```json
{
  "audio": {
    "ja_target": null,
    "ja_example": null,
    "ja_listening": null,
    "support_language_optional": null
  }
}
```

## Quality rule

Bad audio can reduce trust.

For an exam/work-preparation product, learners should feel the Japanese is natural and useful. If audio quality is poor, it is better to delay audio than to include it prematurely.

## Revenue-first recommendation

Text-first is correct for Stage 1B.

But final product planning should assume audio becomes one of the strongest paid differentiators after validation.

Recommended next action:

1. Build exam-aligned Indonesian text sample.
2. Validate learner/institution interest.
3. Test a small set of Japanese phrase audio.
4. If positive, add selected Japanese audio to the first paid starter.
5. Delay support-language audio until a specific language lane proves revenue potential.
